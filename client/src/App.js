
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Router, Route, Routes, Link, useParams } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Profile from './pages/Profile'



function App() {
  const { id } = useParams()
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
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/users/:userId' element={<Profile/>}/>
          
        </Routes>
      </header>
    </div>
  );
}

export default App;
