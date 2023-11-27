

export default class TranslateLib {
    static translations = {
        "Andrei Vorobei": "Андрей Воробей"
    }

    static getTranslation(phrase) {
       return {ru: this.translations[phrase] || phrase};
    }
}