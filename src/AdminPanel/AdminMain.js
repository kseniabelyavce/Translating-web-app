import {useEffect, useState} from "react";


export default function AdminMain() {
    const [translations, setTranslations] = useState([])
    const [languages, setLanguages] = useState([])

    useEffect(() => {

        (async () => {
            let locales = await fetch("http://localhost:8000/all_languages");
            locales = await locales.json();
            setLanguages(locales)
            let allTranslations = await fetch("http://localhost:8000/all_translations");
            allTranslations = await allTranslations.json();
            const keys = Object.keys(allTranslations);
            setTranslations(keys.map(key => {
                return {phrase: key, ...allTranslations[key]}
            }))

            // Object.keys(trans).map(key => {
            //     const row = [];
            //     row.push(key);
            //     Object.keys(languages).map(lang => {
            //         row.push(trans[key][lang]);
            //     })
            //     rows.push(row);
            // });
            // setTranslations(rows);
        })()

    }, [])

    console.log(translations, languages)

    return Object.keys(translations).length ? (
        <table>
            <thead>
            <tr>
                <th>Phrase</th>
                {languages.map(label => {
                    return (
                        <th>{label}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody>
            {translations.map(row => {
                return (
                    <tr>
                        <td>{row.phrase}</td>
                        {languages.map(locale => {
                            return (<td>{row?.[locale]}</td>)
                        })}
                    </tr>)
            })}
            </tbody>
        </table>

    ) : null
}