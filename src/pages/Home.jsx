import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import user from './image.jpg';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [postLists, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const postsCollectionRef = collection(db, 'posts');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

    useEffect(() => {
      // Check the value in localStorage
      const success = localStorage.getItem('success');

      // Update the isLoggedIn state based on the value in localStorage
      if (success === 'success') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }, []);

  const getPosts = async () => {
    setLoading(false);

    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <h3>Loading .......</h3>;
  }

  return (
    <>
      <Header />
      <div className='homepage container'>
        {postLists.length > 0 ? (
          postLists.map((post) => {

            return (
              <div
                key={post.id}
                className='card my-4 shadow shadow-sm col-lg-8 col-12 m-auto text-left'
              >
                <img
                  src={post?.picture || ""}
                  alt='banner'
                  className='p-2'
                  height={"300px"}
                  width={"400px"}
                />
                <div className='d-flex justify-content-end'>
                  <button
                    className='btn btn-danger mx-3 my-3'
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    Delete post
                  </button>
                </div>
                <div className='card-body text-left'>
                  <h4 className=' text-left mb-3 fw-bold'>{post.title}</h4>
                  <div className=' d-flex user align-items-center'>
                    <img src={user} />
                    <div>
                      <h6 className='text-uppercase m-0'>{post.author.name}</h6>
                      <small>June 28</small>
                    </div>
                  </div>
                  <p className='card-title mb-2 mt-3'>{post.postTitle}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No Data</h2>
        )}
      </div>
    </>
  );
};

export default Home;
