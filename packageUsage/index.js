const { createHmac } = require('node:crypto');
const {franc}  = require('franc');
const langs = require('langs')

// Default global package - Crypto
const getHash = (input,secret) =>{
    const hash = createHmac('sha256', secret)
                .update(input)
                .digest('hex');
    console.log('\x1b[31m%s\x1b[0m',`Hash Value : ${hash}`);
}


// Third party packages - franc and langs
const findLanguage = (words)=>{
    const languageCode = franc(words);
    console.log('\x1b[32m%s\x1b[0m',`${words} is ${langs.where(3,languageCode).name}`);
}


getHash("terces","Attack the north-west");
findLanguage("நீனைவோ ஒரு பறவை");