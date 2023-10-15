import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseConfig } from './Register';
import { initializeApp } from 'firebase/app';
import { and, collection, getDoc, getDocs, getFirestore, query} from 'firebase/firestore/lite';
import { where } from 'firebase/firestore';
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default function Login1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validation for email and password
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      // Check if the provided email and password match the stored values
      // const storedEmail = localStorage.getItem('email');
      // const storedPassword = localStorage.getItem('password');
      // localStorage.setItem('success', 'success');
      // let loginQuery = query(collection(db, "users"),  
      //   and(where('email', '==', email),where('password', '==', password))
      // )
      let loginData = await getDocs(collection(db, "users") );
      let loginFlag = false;
      let userData;
      loginData.forEach((doc) => {
        let data = doc.data()
        if(data?.email === email && data?.password === password){
          loginFlag = true;
          userData={...data, id: doc?.id}
        }
        
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      if(loginFlag){
        localStorage.setItem('success', "success");
        delete userData?.password
        localStorage.setItem('userData', JSON.stringify(userData))
        setEmail('');
        setPassword('');
        navigate('/dashboard');
      }else{
        // if (email !== storedEmail || password !== storedPassword) {
        //   return; // Stop further execution
        // }
  
        setIsLoginFailed(true);// Reset login failure state
        setIsSubmitted(true); // Mark the form as submitted
        return
      }
      setIsLoginFailed(false)


      // Handle successful login (you can redirect to another page here)


    }
  };

  return (
    <div className='homepage container'>
      <div className='card my-4 shadow shadow-sm col-lg-6 col-12 m-auto text-left'>
        <form className='p-4' onSubmit={handleSubmit}>
          {isLoginFailed && (
            <div className='alert alert-danger mb-4' role='alert'>
              Invalid credentials. Please try again.
            </div>
          )}
          {isSubmitted && !isLoginFailed && (
            <div className='alert alert-success mb-4' role='alert'>
              Login successful!
            </div>
          )}
          <h3 className='text-uppercase mb-4 fw-bold'>Login</h3>

          <div className='mb-2'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className='text-danger'>{emailError}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className='text-danger'>{passwordError}</div>
            )}
          </div>
          <button
            type='submit'
            className='btn btn-primary px-4 mt-3'
          >
            Submit
          </button>
          <p className='m-0 text-center mt-3'>
            New User ? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
