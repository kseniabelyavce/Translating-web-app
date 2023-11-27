import {useEffect, useState} from "react";

export default function T({children}) {
    const [translated, setTranslated] = useState('children')

    useEffect( () => {
            fetch('http://localhost:8000/translate', {method: "POST", body: JSON.stringify({phrase: children})})
            .then(async response => await response.json())
                .then(data =>  setTranslated(data.ru));
        }
    , []);

    return <span>{translated}</span>
}