import React from "react";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto my-[20px] flex gap-20">
      <NavLink to="login">Log In</NavLink>
      <NavLink to="signup">Sign Up</NavLink>
    </div>
  );
};

export default Home;
