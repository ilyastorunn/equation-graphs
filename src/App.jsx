import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Graph from "./components/Graph";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";

const App = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
    alert("You have been logged out.");
  };

  return (
    <Router>
      <nav className="bg-gray-800 font-roboto-condensed text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/signin" className="hover:underline">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="hover:underline">
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Graph />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
    // <Header />
  );
};

export default App;
