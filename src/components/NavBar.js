import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/Auth';
import firebase from "../firebaseConfig";

const NavBar = () => {
  const { user } = useContext(AuthContext);
    return (
      <div className="navbar-fixed">
        <nav className="blue-grey darken-4">
          <div className="container nav-wrapper">
           <Link to="/books"><span className="brand-logo">Book Library</span></Link>
            {user !== null ? <ul className="right">
              <li><button className="btn white black-text waves-effect waves-teal" onClick={()=>firebase.auth().signOut()}>Logout</button></li>
            </ul> : null}
          </div>
        </nav>
      </div>
    )
}

export default NavBar;
