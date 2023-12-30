import {useEffect, useState} from "react";

export default function T({children}) {
    const [translated, setTranslated] = useState(children)

    useEffect( () => {
            (async () => {
                let response;
                let data;
                let translatedPhrase;
                try {
                    response = await fetch('/translationsCache.json');
                    data = await response.json();
                    translatedPhrase = data?.[children]?.en;
                } catch (e) {}

                if (!data?.[children]?.en) {
                    response = await fetch('http://localhost:8000/public/translate', {method: 'POST', body: JSON.stringify({phrase: children})});
                    data = await response.json();
                    translatedPhrase = data?.en;
                }

                setTranslated(translatedPhrase || children);

            })()}
        , [])

    return <span>{translated}</span>
}