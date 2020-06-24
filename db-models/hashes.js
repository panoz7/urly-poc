const {db, dbAll, dbRunPrepared} = require("../db/db-connection.js")
const {genHash} = require("../util/hash")

// Returns a URL from a hash
const getByHash = async (hash) => {
    const query = `SELECT * FROM url WHERE hash = '${hash}'`;
    const rows = await dbAll(query);
    return rows[0];
}

// Returns a hash from a URL
const getByURL = async (url) => {
    const query = `SELECT * FROM url WHERE url = '${url}'`;
    const rows = await dbAll(query);
    return rows[0];
}

// Inserts a new URL and returns the resulting hash
const insertURL = async function(url) {
    // Check if the URL is already in the DB
    // If it is return the hash immediately 
    console.log('checking if URL is in DB')
    const matchingURL = await getByURL(url);
    if (matchingURL) {
        console.log('URL is in DB')
        return {hash: matchingURL.hash, url: url};
    }

    // Generate a new hash
    console.log('URL is not in DB')
    const acceptableCharacters = 'abcdefghjkmnpqrstuvwxyz23456789';
    const hashLength = 7;
    const hash = await genHash(hashLength, acceptableCharacters);

    // Insert it into the DB
    console.log('adding has to DB')
    const query = `INSERT INTO url ('hash', 'url') VALUES (?,?)`;
    const result = await dbRunPrepared(query, [hash, url]);
    
    // Return it
    return {hash, url};
}

exports.getByHash = getByHash;
exports.getByURL = getByURL;
exports.insertURL = insertURL;