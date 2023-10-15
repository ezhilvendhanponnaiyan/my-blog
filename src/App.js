import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase-config';
import './App.css';
import About from './pages/About';
import Login1 from './pages/Login1';
import Register from './pages/Register';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  // const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      // navigate('/');
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check the value in localStorage
    const success = localStorage.getItem('success');

    // Update the isLoggedIn state based on the value in localStorage
    if (success === 'success') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // The empty array [] means this effect runs once, similar to componentDidMount

  const handleLogout = () => {
    // Perform your logout logic here
    // For example, clear the success item in localStorage
    localStorage.removeItem('success');

    // Update the isLoggedIn state
    setIsLoggedIn(false);
  };

  return (
    <div className='App'>
      <Router>
        {/* <nav className='navbar navbar-expand-1g justify-content-center navbar-light bg-dark text-center py-4'>
          <Link to='/' className='nav-link text-white mx-2'>
            Home
          </Link>

          {!isAuth ? (
            <Link to='/login' className='nav-link text-white mx-2'>
              Login
            </Link>
          ) : (
            <>
              <Link to='/createpost' className='nav-link text-white mx-2'>
                Create Post{' '}
              </Link>
              <button className='btn btn-primary' onClick={signUserOut}>
                Log Out
              </button>
            </>
          )}
        </nav> */}

        <>
          <Routes>
            <Route path='/dashboard' element={<Home isAuth={isAuth} />} />
            <Route
              path='/post'
              element={<CreatePost isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
            <Route path='/' element={<Login1 setIsAuth={setIsAuth} />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
