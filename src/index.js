import ReactDOM from 'react-dom/client';
import App from './PublicApp/App.js';
import AdminMain from "./AdminPanel/AdminMain.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";
import PhraseTranslations from "./AdminPanel/PhraseTranslations.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/admin" element={<AdminMain />}/>
            <Route path="/admin/phrase-translations" element={<PhraseTranslations/>}/>
        </Routes>
    </BrowserRouter>
);

