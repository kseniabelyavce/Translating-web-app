import {useEffect, useState} from "react";
import Menu from "../PublicApp/Menu.js";
import {Table, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

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
                    <Table  bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Phrase</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {translations.map((row, index) => {
                           return (<tr>
                                <td>{index + 1}</td>
                                <td>{row.phrase}</td>
                               <td>
                                   <Button variant="dark">
                                       <Link style={{textDecoration: "none", color: "white"}} to="/admin/phrase-translations" state={{phrase: row.phrase}}>Translations</Link>
                                   </Button>
                               </td>
                            </tr>)
                        })}

                        </tbody>
                    </Table>
                )
                : null
            }
        </div>)
}
