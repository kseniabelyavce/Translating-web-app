import ReactDOM from 'react-dom/client';
import App from './PublicApp/App.js';
import AdminMain from "./AdminPanel/AdminMain.js";
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/admin" element={<AdminMain />}/>
        </Routes>
    </BrowserRouter>

);

