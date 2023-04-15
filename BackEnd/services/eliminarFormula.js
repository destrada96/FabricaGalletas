const db = require('./db');
const helper = require('../helper');

//Metodo DELETE
async function remove(NOMFormula){
    const result = await db.query(
        `DELETE FROM formulas WHERE NOMFormula="${NOMFormula}"`
    );
    let message = 'Error in deleting formula';
    if (result.affectedRows) {
        message = 'Formula deleted successfully';
    }
    return {message};
}

module.exports = {
    remove
}