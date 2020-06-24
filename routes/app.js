const express = require('express');
const router = express.Router();
const hashDB = require('../db-models/hashes')

router.get('/', async (req, res) => {
    res.render('test');
})

router.get('/:hash', async (req, res) => {
    const hash = req.params.hash;

    // Check to see if the hash in the DB
    const row = await hashDB.getByHash(hash);
    if (row) {
        res.redirect(row.url)
    }

    // Need a real 404 page, but this will do for now
    res.send('404');
})

module.exports = {router};