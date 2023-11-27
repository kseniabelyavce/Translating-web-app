import knexConnection from "./database.js";

const languages = {
    1: 'en',
    2: 'ru'
}

export default class TranslateLib {
    static translations = {
        "Andrei Vorobei": "Андрей Воробей"
    }

    static async getTranslation(phrase) {
        let resultDB = await knexConnection.select().from('translations');
        return resultDB.reduce((acc, curr) => {
            acc[languages[curr.language]] = curr.translation || curr.phrase;
            return acc;
        }, {});
    }
}


