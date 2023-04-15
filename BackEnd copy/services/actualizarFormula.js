const db = require('./db');
const helper = require('../helper');

// Método PUT
async function update(NOMFormula,formula){

    var queryforcheck = `SELECT NOMFormula from formulas WHERE NOMFormula = "${formula.listareg[0].NOMFormula}"`
    
    const queryformula = await db.query(queryforcheck)

    if (queryformula.length < 1){
        message = 'Formula Inexistente a Actualizar'
        return{message}
    }
    else{
        const queryObtainID = await db.query(
            `SELECT IDFormula FROM formulas WHERE NOMFormula = "${NOMFormula}" LIMIT 1`
        );
        const ObtainID= helper.emptyOrRows(queryObtainID);
    
        const borrarFormula = await db.query(
                `DELETE FROM formulas WHERE NOMFormula="${NOMFormula}"`
        );
    
        var ingrediente = [];
    
        for (let i = 0; i < formula.listareg.length; i++) {
            ingrediente.push(formula.listareg[i].NOMIngrediente)
        }
        var querychekING = `SELECT NOMIngrediente FROM ingredientes WHERE NOMIngrediente IN (`
    
        for (let i = 0; i < ingrediente.length; i++) {
            querychekING += `"${ingrediente[i]}",`;
            if (i >= ingrediente.length -1){
                querychekING = querychekING.slice(0, -1);
            }
        }
    
        querychekING+=`)`
        const querycheck = await db.query(querychekING)
    
        if (querycheck.length != ingrediente.length){
            let listaobj = [];
            const list2Values = querycheck.map(obj => obj.NOMIngrediente.toLowerCase());
            const notInList2 = ingrediente.filter(item => !list2Values.includes(item.toLowerCase()));
            for (let i = 0; i < notInList2.length; i++) {
                listaobj.push({NOMIngrediente:notInList2[i]})
            }
            var queryadd = `INSERT INTO ingredientes (NOMIngrediente) VALUES `
            for (let i = 0; i < listaobj.length; i++) {
                queryadd +=`("${listaobj[i].NOMIngrediente}"),`
                if (i >= listaobj.length -1){
                    queryadd = queryadd.slice(0, -1);
                }
            }
            const querydone = await db.query(queryadd)
        }
    
        
        const ingredienteString = ingrediente.join("','")
    
        const queryIdIngrediente = await db.query(
            `SELECT IDIngrediente FROM ingredientes WHERE NOMIngrediente IN ('${ingredienteString}') ORDER BY FIELD( NOMIngrediente, '${ingredienteString}')`
        )
    
        const IdIngredientes = helper.emptyOrRows(queryIdIngrediente);
    
        const cantidad = formula.listareg.length;
        var queryNuevaFormula = `INSERT INTO formulas (IDFormula, IDIngrediente, Cantidad, NOMFormula, NOMIngrediente) VALUES `;
        for (let i = 0; i < cantidad; i++) {
            queryNuevaFormula += `(${ObtainID[0].IDFormula},${IdIngredientes[i].IDIngrediente},${formula.listareg[i].Cantidad},"${formula.listareg[i].NOMFormula}","${formula.listareg[i].NOMIngrediente}"),`;
            if (i >= cantidad -1){
                queryNuevaFormula = queryNuevaFormula.slice(0, -1);
            }
        }
    
        const result = await db.query(queryNuevaFormula);
    
        let message = 'Error in Formula language';
    
        if (result.affectedRows) {
            message = 'Formula Actualizada';
        }
    
        return {message};
    }
}

module.exports = {
    update
}
