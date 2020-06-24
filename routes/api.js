const express = require('express');
const router = express.Router();
const hashDB = require('../db-models/hashes')

router.get('/hash/:hash', async (req, res) => {
    const hash = req.params.hash;
    console.log(`Getting url from hash ${hash}`);
    const row = await hashDB.getByHash(hash);
    console.log('results:', row)
    res.json(row);
})

router.post('/url/:url', async (req, res) => {
    const url = decodeURIComponent(req.params.url);
    console.log(`Generating hash from URL ${url}`);
    const row = await hashDB.insertURL(url);
    console.log('results:', row)
    res.json(row);
})

router.get('/url/:url', async (req, res) => {
    const url = decodeURIComponent(req.params.url);
    console.log(`Getting hash from URL ${url}`);
    const row = await hashDB.getByURL(url);
    console.log('results:', row)
    res.json(row);
})

module.exports = {router};