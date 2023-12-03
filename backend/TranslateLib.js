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

    static async getAllTranslations() {
        const data = await knexConnection.select().from('translations');
        return data.reduce((acc, curr) => {
            const phrase = curr.phrase;
            const locale = languages[curr.language];
            const translation = curr.translation;
            acc[phrase] = {
            ...(acc[phrase] && acc[phrase]),
             [locale]: translation
            }
            return acc;
        }, {})
    }
}


