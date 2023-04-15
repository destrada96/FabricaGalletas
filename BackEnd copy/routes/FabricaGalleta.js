// Route or Glue between URL and the operations in the file services/fabricaGalletas.js

const express = require('express');
const router = express.Router();
const agregaIngrediente = require('../services/agregaIngrediente');
const agregaFormula = require('../services/agregaFormula');
const agregaINGALM = require('../services/agregarINGALM');
const formulas = require('../services/getFormula')
const eliminarFormula = require('../services/eliminarFormula')
const actualizarFormula = require('../services/actualizarFormula')
const verFormula = require('../services/verificarFormula')
const verIngrediente = require('../services/verificarIngrediente')
const elimIngrediente = require('../services/eliminarINGALM')

/* POST */
router.post('/agregarIngrediente', async function(req, res, next) {
    try {
        res.json(await agregaIngrediente.createIng(req.body));
    } catch (err) {
        console.error(`Error while creating ingredient`, err.message);
        next(err);
    }
});

//POST
router.post('/agregarFormula', async function(req, res, next) {
    try {
        res.json(await agregaFormula.createFor(req.body));
    } catch (err) {
        console.error(`Error while creating formula`, err.message);
        next(err);
    }
});

//POST
router.post('/agregarINGALM', async function(req, res, next) {
    try {
        res.json(await agregaINGALM.createINGALM(req.body));
    } catch (err) {
        console.error(`Error while creating ingredient almacen`, err.message);
        next(err);
    }
});

/* GET FORMULA. */
router.get('/getFormula', async function(req, res, next) {
    try {
        res.json(await formulas.getMultiple());
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

/* DELETE FORMULA */
router.delete('/eliminarFormula/:NOMFormula', async function(req, res, next) {
    try {
        res.json(await eliminarFormula.remove(req.params.NOMFormula));
    } catch (err) {
        console.error(`Error while deleting formula`, err.message);
        next(err);
    }
});

/* PUT ACTUALIZAR FORMULA*/
router.put('/actualizarFormula/:NOMFormula', async function(req, res, next) {
    try {
        res.json(await actualizarFormula.update(req.params.NOMFormula, req.body));
    } catch (err) {
        console.error(`Error while updating formula`, err.message);
        next(err);
    }
});


/* POST VERIFICAR FORMULA. */
router.post('/verFormula', async function(req, res, next) {
    try {
        res.json(await verFormula.verificar(req.body));
    } catch (err) {
        console.error(`Error while verifying`, err.message);
        next(err);
    }
});


/* POST */
router.post('/verIngrediente', async function(req, res, next) {
    try {
        res.json(await verIngrediente.verificar(req.body));
    } catch (err) {
        console.error(`Error while creating ingredient`, err.message);
        next(err);
    }
});

//POST
router.post('/eliminarINGALM', async function(req, res, next) {
    try {
        res.json(await elimIngrediente.removeing(req.body));
    } catch (err) {
        console.error(`Error while creating ingredient almacen`, err.message);
        next(err);
    }
});
module.exports = router;
