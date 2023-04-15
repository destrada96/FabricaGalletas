const db = require('./db');
const helper = require('../helper');

//Metodo DELETE
async function removeing(queryING){
    const queryIngredientes = await db.query(
        `SELECT IDIngrediente,NOMIngrediente,Cantidad from formulas WHERE NOMFormula = "${queryING.NOMFormula}"`
    );
    
    for (let i = 0; i < queryIngredientes.length; i++) {
        let nueva_cantidad = queryIngredientes[i].Cantidad * queryING.Cantidad
        queryIngredientes[i].Cantidad = nueva_cantidad
    }

    var ingrediente = [];

    for (let i = 0; i < queryIngredientes.length; i++) {
        ingrediente.push(queryIngredientes[i].NOMIngrediente)
    }

    const ingredienteString = ingrediente.join("','")

    var queryIngredientesAlm = `SELECT NOMIngrediente, CantidadAlm from almacen WHERE NOMIngrediente IN (`
    for (let i = 0; i < queryIngredientes.length; i++) {
        queryIngredientesAlm += `"${queryIngredientes[i].NOMIngrediente}",`
        if (i >= queryIngredientes.length -1){
            queryIngredientesAlm = queryIngredientesAlm.slice(0, -1);
        }
    }
    queryIngredientesAlm +=`) ORDER BY FIELD( NOMIngrediente, '${ingredienteString}')`
    
    const queryIngredientesAlmacen = await db.query(queryIngredientesAlm);

    for (let i = 0; i < queryIngredientesAlmacen.length; i++) {
        queryIngredientesAlmacen[i].CantidadAlm=parseInt(queryIngredientesAlmacen[i].CantidadAlm)-parseInt(queryIngredientes[i].Cantidad)
    }
    let result
    for (let i = 0; i < queryIngredientesAlmacen.length; i++) {
        ultimaquery = `UPDATE almacen SET CantidadAlm = ${queryIngredientesAlmacen[i].CantidadAlm} WHERE NOMIngrediente="${queryIngredientesAlmacen[i].NOMIngrediente}"`;
        result = await db.query(ultimaquery)
    }
    let message = 'Error in deleting formula';
    if (result.affectedRows) {
        message = 'Ingredients deleted successfully';
    }
    return {message};
}

module.exports = {
    removeing
}