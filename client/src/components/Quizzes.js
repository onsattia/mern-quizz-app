import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuizzes } from "../store/actions/quizActions";
import Spinner from "../components/common/Spinner";

import QuizCard from "./QuizCard";

class Quizzes extends Component {
  componentDidMount() {
    this.props.getQuizzes();
  }

  render() {
    const { quizzes, loading } = this.props.quizzes;
    let quizzContent;
    let spinner;
    if (quizzes === null || loading) {
      spinner = <Spinner />;
    } else {
      quizzContent = quizzes.map(quiz => {
        return (
          <QuizCard
            key={quiz._id}
            title={quiz.title}
            description={quiz.description}
            track={quiz.track}
            image={quiz.image}
          />
        );
      });
    }

    return (
      <div className="container">
        <nav className="nav justify-content-center nav-pills flex-column flex-md-row">
          <Link to="#" className="btn btn-outline-dark mr-2">
            Algorithme
          </Link>
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
        <div className="row">{quizzContent}</div>
        {spinner}
      </div>
    );
  }
}

Quizzes.propTypes = {
  getQuizzes: PropTypes.func.isRequired,
  quizzes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quizzes: state.quizzes
});

export default connect(
  mapStateToProps,
  { getQuizzes }
)(Quizzes);
