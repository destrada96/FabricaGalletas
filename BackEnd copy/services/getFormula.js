const db = require('./db');
const helper = require('../helper');

// Método get
async function getMultiple(){
    const rows = await db.query(
        `SELECT DISTINCT NOMFormula FROM formulas`
    );
    const data = helper.emptyOrRows(rows);
    return {
        data
    }
}


module.exports = {
    getMultiple
}
