import React from "react";
import "../assets/Home.css";

const Home = props => {
  return (
    <div className="uk-position-medium uk-position-center uk-text-center">
      <h1>Welcome to the Rec League App</h1>
      <div className="padding-bottom">
        <img src="https://shalomaustin.org/image/sports-and-fitness/competitve-Champs.jpg" />
        <h3> An open source app for organizing your Rec League</h3>
      </div>
      <div className="padding-bottom">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/xEew8pSCZCw"
          frameBorder="0"
          allow="autoPlay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="padding-top">
        <p className="padding-top">
          Manage your teams and players all in one app
        </p>
        <p>
          {" "}
          This is an open sourced project, so if you would like to contribute
          please go to my{" "}
          <a
            href="https://github.com/samsonyuwono/rec-league-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Github Page
          </a>
        </p>
        <p>
          Created by{" "}
          <a
            href="https://github.com/samsonyuwono/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Samson Yuwono
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
