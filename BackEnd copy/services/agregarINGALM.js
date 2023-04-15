const db = require('./db');
const helper = require('../helper');
const agregarIng = require('./agregaIngrediente')
// Método Post
async function createINGALM(ingredienteALM){
    var query11 = await db.query(`SELECT NOMIngrediente FROM ingredientes WHERE NOMIngrediente = "${ingredienteALM.NOMIngrediente}";`)
    if (query11.length == 0){
        agregarIng.createIng(ingredienteALM)
        var query1 = await db.query(
            `SELECT IDIngrediente FROM ingredientes WHERE NOMIngrediente = "${ingredienteALM.NOMIngrediente}";`
        )
    } else{
        var query1 = await db.query(
            `SELECT IDIngrediente FROM ingredientes WHERE NOMIngrediente = "${ingredienteALM.NOMIngrediente}";`
        )
    }

    const data = helper.emptyOrRows(query1);
    
    const queryverify = `SELECT IDingrediente FROM almacen WHERE IDIngrediente = ${data[0].IDIngrediente}`
    
    const query2 = await db.query(queryverify)
    
    if (query2.length >= 1){
        const querycantidad = `SELECT CantidadAlm FROM almacen WHERE IDIngrediente = ${data[0].IDIngrediente}`
        const query3 = await db.query(querycantidad)
        const cantidad_nueva = parseInt(ingredienteALM.CantidadAlm) + parseInt(query3[0].CantidadAlm)
        const queryaumento = `UPDATE almacen SET CantidadAlm = ${cantidad_nueva} WHERE NOMIngrediente="${ingredienteALM.NOMIngrediente}"` 
        var result = await db.query(queryaumento)
    } else {
        var result = await db.query(
            `INSERT INTO almacen 
            (IDIngrediente, NOMIngrediente, CantidadAlm) 
            VALUES 
            ("${data[0].IDIngrediente}", "${ingredienteALM.NOMIngrediente}",${ingredienteALM.CantidadAlm});`
        );
    }

    let message = 'Error in creating ingredient';
    if (result.affectedRows) {
        message = 'Ingredient created successfully';
    }
    return {message};
}

module.exports = {
    createINGALM
}