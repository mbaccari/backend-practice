import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

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
      url: 'http://localhost:3080/api/users/signup',
      data: formState
    }).then(res => {
      setCookie('token', res.data)
    })
        
    // clear form values
    // setFormState({
    //   email: '',
    //   password: '',
    // });
  };
  return (
    <>
    <main className="flex-row justify-center mb-4 container">
      <div className="row">

        <div className="col-md-2 col-xs-0"></div>

        <div className="col-md-8 col-xs-12">
          <h4 className="text-dark p-2 text-center display-4 fw-bold">Become a Trainer!</h4>
          <div className="card-body">
            {loggedIn() ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              
              <form onSubmit={handleFormSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example1cg">UserName:</label>
                  <input 
                    type="text"
                    name="username"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.username}
                    onChange={handleChange}
                  />
                  
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label fs-5" htmlFor="form3Example3cg">Email:</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control form-control-lg shadow-sm" 
                    value={formState.email}
                    onChange={handleChange}
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
                  />
                  
                </div>
                <div className="d-flex justify-content-center">
                  <button
                  className="btn btn-block btn-dark bg-danger mt-2 shadow"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  >Start Training!</button>
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