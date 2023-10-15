import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import {v4} from "uuid"
// import { initializeApp } from 'firebase/app';// import 'firebase/firestore';
export const firebaseConfig = {
  apiKey: "AIzaSyAKz-6GNuHVRGjuJGT8uw0CsSbRT5VWDN8",
  authDomain: "my-blog-7a4b1.firebaseapp.com",
  projectId: "my-blog-7a4b1",
  storageBucket: "my-blog-7a4b1.appspot.com",
  messagingSenderId: "497076177002",
  appId: "1:497076177002:web:17e29c1cea8142830ae213"
};

export const app = initializeApp(firebaseConfig);//'gs://my-blog-7a4b1.appspot.com'
export const db = getFirestore(app);
export const storage = getStorage(app)



export default function Register() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Declare and initialize variables for address, city, and state
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Declare and initialize variables for validation errors and success flag
  const [fullNameError, setFullNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [gender, setGender] = useState('m');

  // Initialize isSubmitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [base64String, setBase64String] = useState('');
  const [profilePic, setProfilePic] = useState('')
  const navigate = useNavigate()
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setBase64String(result);
        // You can now send the base64String to your API endpoint using fetch or any other suitable method.
        // For demonstration purposes, I am logging the base64 string to the console.
        console.log(result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle error if no file is selected.
      console.error('No file selected.');
    }
  };

  // Validation and submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setFullNameError('');
    setMobileNumberError('');
    setEmailError('');
    setPasswordError('');
    setAddressError('');
    setCityError('');
    setStateError('');

    // Validation logic
    let isValid = true;

    if (!fullName) {
      setFullNameError('Full Name is required');
      isValid = false;
    }

    // Mobile number validation using regex
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumber.match(mobileNumberPattern)) {
      setMobileNumberError('Invalid mobile number');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!address) {
      setAddressError('Address is required');
      isValid = false;
    }

    if (!city) {
      setCityError('City is required');
      isValid = false;
    }

    if (!state) {
      setStateError('State is required');
      isValid = false;
    }

    if (isValid) {
      // Store form field values in localStorage
      // localStorage.setItem('fullName', fullName);
      // localStorage.setItem('mobileNumber', mobileNumber);
      // localStorage.setItem('email', email);
      // localStorage.setItem('password', password);
      // localStorage.setItem('address', address);
      // localStorage.setItem('city', city);
      // localStorage.setItem('state', state);
      let imageName = v4();
      const imageRef = ref(storage, imageName)
      let imguploadRes = await uploadString(imageRef, base64String.split(',')[1], 'base64')
      let downloadUrl = await getDownloadURL(imguploadRes?.ref)

      await addDoc(collection(db, 'users'), {
        name: fullName,
        phone: mobileNumber,
        email: email,
        profilepic: downloadUrl,
        state: state, 
        address: address,
        gender:gender,
        city:city,
        password:password,
        created: Timestamp.now()
      })

      // Reset form fields and set the success flag
      setFullName('');
      setMobileNumber('');
      setEmail('');
      setPassword('');
      setAddress('');
      setCity('');
      setState('');
      setIsSubmitted(true);
      navigate('/')
    }
  };

  return (
    <div className='homepage container'>
      <div className='card my-4 shadow shadow-sm col-lg-6 col-12 m-auto text-left'>
        <form className='p-4' onSubmit={handleSubmit}>
          {isSubmitted && (
            <div className='text-white mb-4 p-3 bg-success rounded'>
              Registration successful!
            </div>
          )}
          <h3 className='text-uppercase mb-4 fw-bold'>Register</h3>

          <div className='mb-2'>
            <label htmlFor='fullName' className='form-label'>
              Full Name
            </label>
            <input
              type='text'
              className='form-control'
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {fullNameError && (
              <div className='text-danger'>{fullNameError}</div>
            )}
          </div>
          <div className='mb-2'>
            <label htmlFor='mobileNumber' className='form-label'>
              Mobile Number
            </label>
            <input
              type='text'
              className='form-control'
              id='mobileNumber'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {mobileNumberError && (
              <div className='text-danger'>{mobileNumberError}</div>
            )}
          </div>
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
          <div className='mb-2'>
            <label htmlFor='address' className='form-label'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && <div className='text-danger'>{addressError}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='city' className='form-label'>
              City
            </label>
            <input
              type='text'
              className='form-control'
              id='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {cityError && <div className='text-danger'>{cityError}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='state' className='form-label'>
              State
            </label>
            <input
              type='text'
              className='form-control'
              id='state'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {stateError && <div className='text-danger'>{stateError}</div>}
          </div>
          <div className='d-flex flex-column mb-2'>
            <label htmlFor='state' className='form-label'>
              Gender
            </label>
            <select onChange={(e) => {
              setGender(e.target.value)
            }} id="dropdown" value={gender}>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>

          </div>

          <div className='mb-2 form-check float-end'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Remember me
            </label>
          </div>

          <div className='mb-2'>
            <label htmlFor='state' className='form-label'>
              Profile Pic
            </label>
            <div>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
              />
              {base64String && (
                <img
                  src={base64String}
                  alt='Uploaded'
                  style={{ width: '300px', height: 'auto' }}
                />
              )}
            </div>
          </div>



          <button
            type='submit'
            className='btn btn-primary px-4 mt-3'
            disabled={isSubmitted}
          >
            Submit
          </button>

          <p className='m-0 text-center mt-3'>
            Already have an account? <Link to='/'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
