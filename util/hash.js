const hashDB = require('../db-models/hashes')

const acceptableCharacters = 'abcdefghjkmnpqrstuvwxyz23456789';
const hashLength = 7;

async function genHash(length, acceptableCharacters) {
    for (;;) {
        console.log('generating hash');

        // Build an array of random characters
        const randomChars = [];
        for (let i = 0; i < length; i++) {
            randomChars.push(acceptableCharacters[randNum(0, acceptableCharacters.length - 1)]);
        }

        // Join the characters together to form the hash
        const hash = randomChars.join('');

        // Check if the hash is in the database
        const matchingRow = await hashDB.getByHash(hash);
        if (!matchingRow) {
            return hash;
        }
    }
}

function randNum(min, max) {
    const dif = max - min;
    return Math.round(Math.random() * dif) + min;
}

exports.genHash = genHash;