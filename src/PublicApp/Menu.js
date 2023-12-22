import {Link, useLocation} from 'react-router-dom';
import './Menu.css';

export default function Menu () {
    const location = useLocation();
    return (
        <div className='menu'>
            <>
                {location.pathname !== '/' && (<Link to="/">Home</Link>)}
                {location.pathname !== '/admin' && (<Link to="/admin">Admin</Link>)}
            </>
            <button className="btn btn-primary">Click me</button>
        </div>
    )
}