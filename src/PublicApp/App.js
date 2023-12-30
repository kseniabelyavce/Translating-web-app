import T from "./TranslationComponent.js";
import Menu from "./Menu.js";
import {LanguageContext} from "./LanguageContext.js";

export default function App () {

    return (
        <>
            <Menu/>
            <div style={{position: "fixed", left: "40%", top: "43%", fontSize: "40px"}}>SIMPLE.</div>
            <div style={{position: "fixed", left: "40%", top: "50%"}}><T>A sense of unity in the digital realm.</T></div>
        </>
    )
}