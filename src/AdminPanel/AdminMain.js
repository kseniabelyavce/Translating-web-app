import {useEffect, useState} from "react";
import Menu from "../PublicApp/Menu.js";


export default function AdminMain() {
    const [translations, setTranslations] = useState([])
    const [languages, setLanguages] = useState([])
    const updatedPhrases = {};
    // const history = useHistory();

    useEffect(() => {

        (async () => {
            let locales = await fetch("http://localhost:8000/public/all_languages");
            locales = await locales.json();
            setLanguages(locales)
            let allTranslations = await fetch("http://localhost:8000/public/all_translations");
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

    function saveTranslation(phrase) {
       fetch('http://localhost:8000/admin/update_phrase', {
           method: "POST",
           body: JSON.stringify({phrase: phrase, langTranslations: updatedPhrases[phrase]})})
    }

    function deleteTranslation(phrase) {
        fetch('http://localhost:8000/admin/delete_phrase', {
            method: "POST",
            body: JSON.stringify({phrase: phrase})})
    }

    return (
        <div>
            <Menu/>
            { Object.keys(translations).length ? (

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
                                    return (
                                        <td>
                                            <input id={row.phrase} defaultValue={row?.[locale]} onChange={(event) => {
                                                if (!updatedPhrases[row.phrase]) {
                                                    updatedPhrases[row.phrase] = {};
                                                }
                                                updatedPhrases[row.phrase][locale] = event.target.value;
                                            }}
                                            />
                                        </td>)
                                })}
                                <td><button onClick={() => saveTranslation(row.phrase)}>Save</button></td>
                                <td><button onClick={() => deleteTranslation(row.phrase)}>Delete</button></td>
                            </tr>)
                    })}
                    </tbody>
                </table>

            ) : null}
        </div>
    )
}