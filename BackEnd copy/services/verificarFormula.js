const db = require('./db');
const helper = require('../helper');

// Método POST
async function verificar(formula){
    const result = await db.query(
        `SELECT NOMFormula from formulas WHERE NOMFormula = "${formula.NOMFormula}"`
    );
    
    

    var resp = false
    if (result.length >= 1){
        resp = true
    }

    return {resp};
}

module.exports = {
    verificar
}
