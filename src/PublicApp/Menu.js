import { useLocation} from 'react-router-dom';
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useState} from "react";
import Checkmark from "../icons/Checkmark.js";

export default function Menu () {
    const location = useLocation();
    const availableLocales = ['en', 'fr', 'de']
    const [currentLanguage, setCurrentLanguage] = useState('en')

    async function changeLanguage(language) {
        setCurrentLanguage(language);
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
                <Nav className="justify-content-start">
                    {location.pathname !== '/' && <Nav.Link href="/">Home</Nav.Link>}
                    {location.pathname !== '/admin' && <Nav.Link href="/admin">Admin</Nav.Link>}
                </Nav>
                {!location.pathname.includes('admin') && (
                    <NavDropdown title="Language">
                        {availableLocales.map((language) => {
                            return (
                                <NavDropdown.Item onClick={() => changeLanguage(language)}>
                                    <span>{language}</span>
                                    {currentLanguage === language && <Checkmark/>}
                                </NavDropdown.Item>
                            )
                        })}
                    </NavDropdown>
                )}
        </Navbar>
    )
}