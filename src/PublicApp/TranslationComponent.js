import {useEffect, useState} from "react";

export default function T({children}) {
    const [translated, setTranslated] = useState(children)
    const userLocale = 'ru';

    useEffect( () => {
            (async () => {
                let response;
                let data;
                let translatedPhrase;
                try {
                    response = await fetch('/translationsCache.json');
                    data = await response.json();
                    translatedPhrase = data?.[children]?.[userLocale];
                } catch (e) {

                }

                if (!data?.[children]?.[userLocale]) {
                    response = await fetch('http://localhost:8000/public/translate', {method: 'POST', body: JSON.stringify({phrase: children})});
                    data = await response.json();
                    translatedPhrase = data?.[userLocale];
                }

                setTranslated(translatedPhrase || children);

            })()}
        , [])

    return <span>{translated}</span>
}