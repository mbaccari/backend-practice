import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Auth from '../utils/Auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const loggedIn = () => {
    if(!cookies.token) {
      return false;
    } else if(Auth.isTokenExpired(cookies.token)) {
      removeCookie('token',{path:'/'});
      return false;
    } else if(Auth.isToken(cookies.token)) {
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

    const { email, password } = formState;
    axios({
      method: 'post',
      url: '/api/users/login',
      data: {
        email: email,
        password: password
      }
    }).then(res => {
      const regex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      console.log(res.data.match(regex))
      if(res.data.match(regex)) {
        setCookie('token', res.data)
      } else {
        console.log('Incorrect username or password')
      }
      
    })
        
    // clear form values
    setFormState({
      email: email, 
      password: '',
    });
  };
  return (
    <main className="flex-row justify-center mb-4 container">
      <div className="row">

        <div className="col-md-2 col-xs-0"></div>

        <div className="col-md-8 col-xs-12">
          <h4 className="text-dark p-2 text-center display-4 fw-bold">Login</h4>
          <div className="card-body">

          {loggedIn() ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
          <form onSubmit={handleFormSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example1cg">Email:</label>
                  <input 
                    type="text"
                    name="email"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example4cg">Password:</label>
                  <input 
                    type="password"
                    name="password"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                  
                </div>
                <div className="d-flex justify-content-center">
                  <button
                  className="btn btn-block btn-dark bg-danger mt-2 shadow"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  >Login</button>
                </div>
                <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/signup" className="fw-bold text-body">Register Here</Link></p>
              </form>
              
          )}
          </div>
        </div>

        <div className="col-md-2 col-xs-0"></div>

      </div>
    </main>
  );
};

export default Login;