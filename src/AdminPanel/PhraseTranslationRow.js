import {Button} from "react-bootstrap";
import {useState} from "react";


export default function PhraseTranslationRow({language, translation, phrase}) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [originalTranslation, setOriginalTranslation] = useState(translation)
    const [editedTranslation, setEditedTranslation] = useState(originalTranslation);

    function onEditPhrase() {
        if (isEditMode) {
            revertChanges()
        }
        setIsEditMode(!isEditMode);
    }

    function revertChanges() {
        setEditedTranslation(originalTranslation);
    }

    async function onSaveTranslation() {
        setIsEditMode(false)
        await fetch("http://localhost:8000/admin/update_phrase",  {method: "POST", body: JSON.stringify({phrase, language, translation: editedTranslation})})

        const response = await fetch("http://localhost:8000/public/phrase_translations",  {method: "POST", body: JSON.stringify({phrase, language})})
        const updatedTranslation = await response.json();

        if (updatedTranslation.length) {
            setOriginalTranslation(updatedTranslation?.[0].translation || translation)
        }
    }

    async function onDeleteTranslation() {
        await fetch("http://localhost:8000/admin/delete_phrase",  {method: "POST", body: JSON.stringify({phrase, language})})
        setOriginalTranslation(null);
    }

    return originalTranslation ?
        (
            <tr>
                <td>{language}</td>
                <td>
                    {isEditMode ? (
                        <textarea style={{width: "100%"}} defaultValue={editedTranslation} onChange={(event) => setEditedTranslation(event.target.value)}/>
                    ) : editedTranslation}
                </td>
                <td style={{display: "flex", justifyContent: "flex-start"}}>
                    <Button onClick={onEditPhrase} style={{width: "20%", marginRight: "10px"}} variant="dark">{
                        isEditMode ? 'Reset' : 'Edit'
                    }</Button>
                    <Button onClick={onSaveTranslation} disabled={!isEditMode} style={{width: "20%", marginRight: "10px"}} variant="dark">Save</Button>
                    <Button onClick={onDeleteTranslation} style={{width: "20%", marginRight: "10px"}} variant="dark">Delete</Button>
                </td>
             </tr>
        )  : null
}
