import { Link } from 'react-router-dom'; 
import logo from '../logo.png';
import { dropUser } from '../utils/userSession';
import { dropUserLocally } from '../utils/userLocal';

const NavBar = ({ user, setUser }) => {

    return(
        <nav className="navbar sticky-top bg-body-tertiary">
            <div className="container-fluid">
                <div className='position-relative nav justify-content-start'>
                    <Link className="navbar-brand" to="/Gamebook/">
                        <img src={ logo } alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                        Gamebook
                    </Link>
                    { user === 'guest'
                    ?  <span />
                    : <span className="navbar-brand mt-1 fs-6">Welcome, { user.username }</span> }
                </div>
                <ul className="nav justify-content-end">

                            <li className="nav-item">
                                <Link className="navbar-brand" to='/catalogue'>Games</Link>
                            </li>
                            
                    { user !== 'guest' ?
                        <>
                            <li className="nav-item">
                                <Link className="navbar-brand" to={ `/profile/${user.username}` }>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand" onClick={ () => { setUser('guest'); dropUser(); dropUserLocally(); } } to='/login'>Logout</Link>
                            </li>
                        </>
                    :
                        <>
                            <li className="nav-item">
                                <Link className="navbar-brand" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbar-brand" to='/register'>Register</Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;