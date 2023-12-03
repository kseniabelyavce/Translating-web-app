import {useEffect, useState} from "react";

export default function T({children}) {
    const [translated, setTranslated] = useState('No translation')
    const userLocale = 'ru';
    // useEffect( () => {
    //         fetch('/translationsCache.json', {method: "POST", body: JSON.stringify({phrase: children})})
    //         .then(async response => await response.json())
    //             .then(data =>
    //                 setTranslated(data.ru));
    //     }
    // , []);


    useEffect( () => {
            fetch('/translationsCache.json')
                .then(async response => await response.json())
                .then(data => {
                    const translatedPhrase = data?.[children]?.[userLocale];
                    setTranslated(translatedPhrase || children);
                });
        }
        , []);

    return <span>{translated}</span>
}