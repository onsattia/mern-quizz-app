import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuizCard from "./QuizCard";

class Quizzes extends Component {
  render() {
    return (
      <div className="container">
        <nav className="nav justify-content-center nav-pills flex-column flex-md-row">
          <Link to="#" className="btn btn-outline-dark mr-2">
            Web Development
          </Link>
          <Link to="#" className="btn btn-outline-dark mr-2">
            Mobile Development
          </Link>
          <Link to="#" className="btn btn-outline-dark mr-2">
            Data Science
          </Link>
        </nav>
        <div className="row">
          <QuizCard
            title={"HTML 5"}
            body={
              "excepturi? Doloribus nihil aspernatur voluptate! Perferendis veniammagnam iure nesciunt."
            }
          />
        </div>
      </div>
    );
  }
}

export default Quizzes;
