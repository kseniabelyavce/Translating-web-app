import {Table, Button, Nav} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PhraseTranslationRow from "./PhraseTranslationRow.js";
import Menu from "../PublicApp/Menu.js";

export default function PhraseTranslations() {
    let [translations, setTranslations] = useState([]);
    let { state } = useLocation();

    useEffect(() => {
        (async () => {
            let response = await fetch("http://localhost:8000/public/phrase_translations",  {method: "POST", body: JSON.stringify({phrase: state.phrase})})
            response = await response.json();
            setTranslations(response)
            // console.log({response})
        })();
    }, [])


    return (
        <>
            <Menu/>
            <Table  bordered hover>
                <thead>
                <tr>
                    <th>Language</th>
                    <th>Translation</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {translations.length ? translations.map((row) => {
                    const {language, translation, phrase} = row;
                    return <PhraseTranslationRow key={language} language={language} translation={translation} phrase={phrase}/>
                }) : null}
                </tbody>
            </Table>
            <Button style={{margin: '10px'}} variant="dark">Add translation</Button>
        </>
    )


}