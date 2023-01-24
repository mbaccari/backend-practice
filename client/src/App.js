
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Route, Routes, Link } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Profile from './pages/Profile'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Router>
          <Routes>
            <Route
              path='/backend-practice/'
              element={<Home />}
            >
              <Route
                path='login'
                element={<Login />}
              />
              
              <Route
                path='signup'
                element={<Signup />}
              />
              <Route 
                path="users/:userId" 
                element={<Profile />}
              />
            </Route>
          </Routes>
        </Router> */}
        <Routes>
          <Route exact path='/' element={<Home/>}/>
            <Route exact path='/Login' element={<Login/>}/>
            <Route exact path='/Signup' element={<Signup/>}/>
            <Route exact path='/:userId' element={<Profile/>}/>
          
        </Routes>
      </header>
    </div>
  );
}

export default App;
