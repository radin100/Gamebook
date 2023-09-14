import 'bootstrap/dist/css/bootstrap.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getUser } from './utils/userSession';
import { getUserLocally } from './utils/userLocal';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Alert from './components/Alert';
import Home from './components/Home';
import Catalogue from './components/Catalogue';
import Profile from './components/Profile';
import Add from './components/Add';
import Details from './components/Details';
import Edit from './components/Edit';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/404';

function App() {
  const [user, setUser] = useState('guest');
  const [err, setErr] = useState(false);

  useEffect(() => {
    const user = getUser() || getUserLocally() || 'guest';
    if(user !== 'guest'){
      setUser(user);
    }
  }, [ setUser, setErr ]);

  return (
      <BrowserRouter>
        <NavBar user={ user } setUser={ setUser } />

        { err 
        ? <Alert err={ err } />
        : <></> }
        
        <Routes>
          <Route path='/Gamebook/' element={ <Home /> }/>
          <Route path='/catalogue' element={ <Catalogue setErr={ setErr } /> }/>
          <Route path='/profile/:username' element={ <Profile user={ user } setErr={ setErr } /> }/>
          <Route path='/create' element={ <Add user={ user } setErr={ setErr } /> }/>
          <Route path='/details/:id' element={ <Details user={ user } setErr={ setErr } /> }/>
          <Route path='/edit/:id' element={ <Edit user={ user } setErr={ setErr } /> }/>
          <Route path='/login' element={ <Login user={ user } setUser={ setUser } setErr={ setErr } /> }/>
          <Route path='/register' element={ <Register user={ user } setUser={ setUser } setErr={ setErr } /> }/>
          <Route path='*' element={ <NotFound /> }/>
        </Routes>

        <Footer />
      </BrowserRouter>
  );
}

export default App;
