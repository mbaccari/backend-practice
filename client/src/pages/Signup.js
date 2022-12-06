import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styles from './Signup.module.css'

import Auth from '../utils/Auth';

const Signup = () => {
  const [formState, setFormState] = useState({username:'', email: '', password: '' });

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const loggedIn = () => {
    if(!cookies.token) {
      console.log('no token')
      return false;
    } else if(Auth.isTokenExpired(cookies.token)) {
      console.log('expired token')
      removeCookie('token',{path:'/'});
      return false;
    } else if(Auth.isToken(cookies.token)) {
      console.log('token plus not expired makes me happy boi')
      return true;
    }
  }

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: '/api/users/signup',
      data: formState
    }).then(res => {
      const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      console.log(res.data.match(regex))
      if(res.data.match(regex)) {
        setCookie('token', res.data)
      } else {
        console.log('Please fill out correctly')
      }
    })
        
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <>
    <main className="flex-row justify-center mb-4 container">
      <div className="row">

        <div className="col-md-2 col-xs-0"></div>

        <div className="col-md-8 col-xs-12">
          <h4 style={{fontFamily: 'Times New Roman'}} className="text-dark p-2 text-center display-4 fw-bold">Join BugBook!</h4>
          <div className="card-body">
            {loggedIn() ? (
              <p style={{fontFamily: 'Times New Roman'}}>
                Success! Welcome {formState.username}{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              
              <form id={styles.form} onSubmit={handleFormSubmit}>
                <div id={styles.group} className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example1cg">UserName:</label>
                  <input 
                    id={styles.input}
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                  />
                  
                </div>
                <div id={styles.group} className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example3cg">Email:</label>
                  <input 
                    id={styles.input}
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  
                </div>
                <div id={styles.group} className="form-outline mb-4">
                  <label>Password:</label>
                  <input 
                    id={styles.input}
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  
                </div>
                <div className="d-flex justify-content-center">
                  <button
                  id={styles.submit}
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  >Sign Up</button>
                </div>
                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className="fw-bold text-body">Login Here</Link></p>
              </form>

            )}
          </div>
        </div>

        <div className="col-md-2 col-xs-0"></div>

      </div>
    </main>
    </>
  );
};
export default Signup;