import React from 'react';
import { useNavigate, Link } from "react-router-dom";

import Auth from '../utils/Auth'

const Home = () => {
    return (
        <main>
            {Auth.loggedIn() ? `logged in` : `not logged in`}
        </main>
    )
}

export default Home;