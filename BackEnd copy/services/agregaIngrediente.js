// File with all the methos 

//Bridge between the route file and the database file

const db = require('./db');
const helper = require('../helper');

// Método Post
async function createIng(ingredient){
    const result = await db.query(
    `INSERT INTO ingredientes 
    (NOMIngrediente) 
    VALUES 
    ("${ingredient.NOMIngrediente}");`
    );
    let message = 'Error in creating ingredient';
    if (result.affectedRows) {
        message = 'Ingredient created successfully';
    }
    return {message};
}

module.exports = {
    createIng
}