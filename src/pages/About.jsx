import React from 'react';
import './About.css';
import user from './image.jpg';
import Header from './Header';

export default function About() {
  return (
    <>
      <Header />
      <section className='About container' style={{ borderRadius: '30px' }}>
        <div className=' row homepage  px-5 justify-content-center align-items-center'>
          <div className='col-md-6 text-center'>
            <img src={user} />
          </div>
          <div className='about-text col-md-6'>
            <h1>About Us</h1>

            <h4>
              Hello <span>Viewers</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium molestiae id, tempora commodi ratione, vero quis est
              sunt quos, laudantium fuga beatae voluptatum necessitatibus et
              tempore reiciendis nulla repudiandae? Quidem?
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
