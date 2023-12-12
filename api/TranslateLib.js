import knexConnection from "./database.js";

const languages = ['en', 'ru'];

export default class TranslateLib {
    static async getTranslation(phrase) {
        let resultDB = await knexConnection.select().where('phrase', '=', phrase).from('translations');
        return resultDB.reduce((acc, curr) => {
            acc[curr.language] = curr.translation || curr.phrase;
            return acc;
        }, {});
    }

    static async getAllTranslations() {
        const data = await knexConnection.select().from('translations');
        return data.reduce((acc, curr) => {
            const phrase = curr.phrase;
            const locale = curr.language;
            const translation = curr.translation;
            acc[phrase] = {
            ...(acc[phrase] && acc[phrase]),
             [locale]: translation
            }
            return acc;
        }, {})
    }

    static async createPhrase(phrase){
        const result = await knexConnection.select().where('phrase', '=', phrase).from('translations');
        if (!result.length) {
            await knexConnection.insert({phrase}).into('translations')
        }
    }

    static async updatePhrase(phrase, langTranslations) {
        Object.keys(langTranslations).map(async (language) => {
            await knexConnection
                .from('translations')
                .where({phrase, language})
                .update({translation: langTranslations[language]})
        });
    }

    static deletePhrase(phrase) {
        return knexConnection.where('phrase', '=', phrase).from('translations').del();
    }

    static getAllLanguages()  {
        return languages;
    }
}


