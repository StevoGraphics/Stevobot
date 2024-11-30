const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVURJZE1yc3M0WVFzaVUzUHErQlkrcDFJOVROSmpSUnVVdUVVKzF2U2Uxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTN5ZmFIMEpQVUxGNDJrbWY5VDZMNWY5MDZSNFEyMjRTVGZIaWcwMU5IQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5S2lUaE52T09Gdi9lRW9lSk5QeDlsTHJjdG95UFVXd1doS0VTRURWdFdrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzakFpb3A5SDBWcXNoeW1QNVVlOGhHc3FXWGlkVTZ4VnlhbWhWSnY1ZFZ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVQa0lTVUVCSklLdUtjaVhPV3UzU2hLdzI3c0ZRL1kxdHMrOWdtTXM3Mkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRjb0IyR0F3TWxESUF2dGlHY2M1Q3lrcDJPeUZ2dmRZL1BYR0t6MHlMeDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktpcUsxS3laN0gxRWZrQmJPSXpuaDhYdWdnenpwMVNtbHVSWXRBeEQwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTlvTml5SDZ6YlAyd2RvZlh3T3lYZGZHNTROdUxQaE0vdmU3cVdZbWt4dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJTK3RqZlY4R1hmWXpBMFdNc0lTREFmaE1xNFVWR1MraXR2ZDBHQ1lZa3JQZFBGOW8rWGhtWEFzT2pnUlNiT0tyL0V5QjJ5d2UzRnVWOXBBOGRFSENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiJIbmVPYzBVb0M3OE42Tk1pQVFycFF3RGRnUzRMSlRqRm1zSmhwRzZvSzVzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJocnRZQmxxeFRfYW90dGdudHVnYU5BIiwicGhvbmVJZCI6IjI4NWNkOWUyLTdhZmEtNDI4YS05NTUzLWFiYzkxNDc5ODcyOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzMkIrOVVMWGd0aU5oUk1KT28zSHVxRk5KTkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUxZZGZJcTA1WkdScTdRZ1dOTU5CaVlUQVNnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhNTDRCSlExIiwibWUiOnsiaWQiOiIyMzQ5MTYyNzk1Mjk5OjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU3Rldm8gR3JhcGhpY3MifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xEcWhKWUZFTU80cWJvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkErL1ZnWktPdi9UY1FJV3c0ZFM0MHJTbW8xemVZVVhONVNIZTdYdkFzSHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZIVjlkcCsvaGJFTjc0aU9EWmUvQWdDbVlrR205RmtVSHhCR0dZS1NQYVM4V1FtaDFlRk45V2dYVEQ0U3I0L1BJaTRtWkduNVdWcVNvVkZVaGxIM0NRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3ODdhakd0b29Ja3pjU1M0dEpqVnRqNG1lZzFSeHluejlPT2dJc2dhVEI4OVpxRHY3SXhXZ2VpdnlUYTIxTFBjRi9UaHk3TFpib1VJcUFDYmNNM3pEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNjI3OTUyOTk6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRUHYxWUdTanIvMDNFQ0ZzT0hVdU5LMHBxTmMzbUZGemVVaDN1MTd3TEI3In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyOTI2NTQ0fQ==',
    PREFIXE: process.env.PREFIX || "~",
    OWNER_NAME: process.env.OWNER_NAME || "Stevo-Graphics",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349162795299",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Stephen',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/YKVlucn.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
