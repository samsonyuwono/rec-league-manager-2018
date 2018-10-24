import React from "react";
import "../assets/Home.css";

const Home = props => {
  return (
    <div className="uk-position-medium uk-position-center uk-text-center">
      <h1>Welcome to the Rec League App</h1>
      <div className="padding-bottom">
        <img
          alt=""
          src="https://shalomaustin.org/image/sports-and-fitness/competitve-Champs.jpg"
        />
        <h3> An open source app for organizing your Rec League</h3>
      </div>
      <div className="padding-top">
        <p>Manage your teams and players all in one app</p>
      </div>
    </div>
  );
};

export default Home;
