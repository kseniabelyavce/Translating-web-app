import knexConnection from "./database.js";

const languages = ['en', 'fr', 'de'];

export default class TranslateLib {
    static async getTranslation(phrase, language = 'en') {
        let resultDB = await knexConnection.select().where({phrase: phrase, language}).from('translations');
        if (resultDB && !resultDB.length) {
            await this.createPhrase(phrase);
            return;
        }

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

    static getAllLanguages()  {
        return languages;
    }

    static async createPhrase(phrase){
        const result = await knexConnection.select().where({phrase: phrase, language: 'en'}).from('translations');
        if (!result.length) {
            await knexConnection.insert({phrase, language: 'en', translation: phrase}).into('translations')
        }
    }

    static async updatePhrase(phrase, language, translation) {
            await knexConnection
                .from('translations')
                .where({phrase, language})
                .update({translation});
    }

    static deletePhrase(phrase, language) {
        return knexConnection.where({phrase: phrase, language}).from('translations').del();
    }

    static async getPhraseTranslations(phrase, language) {
        const data = await knexConnection.select().where({phrase: phrase, ...(language && {language})}).from('translations');
        return data;
    }
}


