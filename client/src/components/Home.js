import React from "react";
import "../assets/Home.scss";
import court from "../assets/court.jpg";

const Home = props => {
  return (
    <div className="home-container">
      <div className="home-banner">
        <img alt="" className="background-image" src={court} />
        <h1>Welcome to the Rec League App</h1>
        <p>Manage your teams and players all in one app</p>
      </div>
    </div>
  );
};

export default Home;
