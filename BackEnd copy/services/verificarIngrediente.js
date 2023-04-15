const db = require('./db');
const helper = require('../helper');

async function verificar(formula){
    // var formula.cantidad
    const queryIngredientes = await db.query(
        `SELECT IDIngrediente,NOMIngrediente,Cantidad from formulas WHERE NOMFormula = "${formula.NOMFormula}"`
    );
    
    for (let i = 0; i < queryIngredientes.length; i++) {
        let nueva_cantidad = queryIngredientes[i].Cantidad * formula.Cantidad
        queryIngredientes[i].Cantidad = nueva_cantidad
    }

    var queryIngredientesAlm = `SELECT NOMIngrediente, CantidadAlm from almacen WHERE NOMIngrediente IN (`
    for (let i = 0; i < queryIngredientes.length; i++) {
        queryIngredientesAlm += `"${queryIngredientes[i].NOMIngrediente}",`
        if (i >= queryIngredientes.length -1){
            queryIngredientesAlm = queryIngredientesAlm.slice(0, -1);
        }
    }
    queryIngredientesAlm +=`)`
    

    const queryIngredientesAlmacen = await db.query(queryIngredientesAlm);

    if (queryIngredientesAlmacen.length != queryIngredientes.length){
        const listINGALM2Values = queryIngredientesAlmacen.map(obj => obj.NOMIngrediente.toLowerCase());
        const listING2Values = queryIngredientes.map(obj => obj.NOMIngrediente.toLowerCase());
        const notIngInList2 = listING2Values.filter(item => !listINGALM2Values.includes(item));
        var querytoadd = `INSERT INTO almacen (IDIngrediente, NOMIngrediente, CantidadAlm) VALUES `
        for (let i = 0; i < notIngInList2.length; i++) {
            querytoadd += `("${queryIngredientes[i].IDIngrediente}","${queryIngredientes[i].NOMIngrediente}",0),`
            if (i >= notIngInList2.length - 1){
                querytoadd = querytoadd.slice(0, -1);
            }
        }
        const ejectquery = await db.query(querytoadd)
    }

    var queryayuda = `SELECT NOMIngrediente, CantidadAlm from almacen WHERE NOMIngrediente IN (`
    for (let i = 0; i < queryIngredientes.length; i++) {
        queryayuda += `"${queryIngredientes[i].NOMIngrediente}",`
        if (i >= queryIngredientes.length -1){
            queryayuda = queryayuda.slice(0, -1);
        }
    }
    queryayuda +=`)`

    const queryhelp = await db.query(queryayuda);

    var resp = true

    for (let i = 0; i < queryIngredientes.length; i++) {
        if (queryIngredientes[i].Cantidad > queryhelp[i].CantidadAlm){
            resp = false
        }
    }
    if(resp == true){
        let resp1=resp;
        const list2Values = queryIngredientes.map(obj => obj.Cantidad);
        let suma = 0;
        for (let i = 0; i < list2Values.length; i++) {
            suma += parseInt(list2Values[i])
        }
        var Tvalvulas = suma * 4;
        var Tamasado = 60
        var Thorneado = 60
        var Entrega = 60
        if(formula.Cantidad > 20){
            var Tamasado = (formula.Cantidad/20) * 60
            var Thorneado = (formula.Cantidad/20) * 60
            var Entrega = (formula.Cantidad/20) * 60
        }
        resp = {
            check:resp1,
            Tvalvulas:Tvalvulas,
            Tamasado:Tamasado,
            Thorneado:Thorneado,
            Entrega: Entrega
        }
    }
    return {resp};
}

module.exports = {
    verificar
}