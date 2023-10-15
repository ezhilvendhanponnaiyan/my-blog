import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, provider } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getApp } from "firebase/app";

import Header from './Header';
import { storage } from './Register';

const CreatePost = ({ isAuth, setIsAuth }) => {
  const firebaseApp = getApp();
  const [title, setTitle] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [base64String, setBase64String] = useState('')
  let navigate = useNavigate();

  const postsCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    if (title === '' || postTitle === '') {
      alert('Fill the fields');
      return false;
    } else {
      try {
        let userData = JSON.parse(localStorage.getItem('userData'))
        const imageRef = ref(storage, fileName)
        let imguploadRes = await uploadString(imageRef, base64String.split(',')[1], 'base64')
        let downloadUrl = await getDownloadURL(imguploadRes?.ref)
        await addDoc(postsCollectionRef, {
          title,
          postTitle,
          picture: downloadUrl,
          author: {
            name: userData?.name,
            id: userData?.id,
          },
        });
        console.log(auth);
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/dashboard');
    });
  };
  const [fileName, setFileName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imagePath = URL.createObjectURL(file);
    setFileName(file?.name)
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        // const imgRef = ref(storage, )
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

  return (
    <>
      <Header />
      <div className=' homepage container'>
        {!isLoggedIn ? (
          <div className='col-lg-8 col-12  m-auto'>
            <div className='bg-white p-4 text-center'>
              <div>
                <h5>You must be logged in to create a post.</h5>
                <Link to='/login1' style={{ fontSize: '16px' }}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='bg-light p-4 col-md-8 m-auto rounded'>
            <h4 className='mb-3 text-uppercase fw-bold'>Create a post</h4>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Title
              </label>
              <input
                type='text'
                placeholder='Title'
                className='form-control'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='posts' className='form-label'>
                Posts
              </label>
              <textarea
                placeholder='post....'
                className='form-control'
                onChange={(e) => setPostTitle(e.target.value)}
              ></textarea>


            </div>
            <div className='mb-2'>
            <label htmlFor='state' className='form-label'>
              Picture
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

            <button className='btn btn-dark mt-3' onClick={createPost}>
                Submit Post
              </button>
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
