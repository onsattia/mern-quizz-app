import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getQuizzes, filterByTrack } from "../store/actions/quizActions";
import { getTracks } from "../store/actions/trackActions";

import Spinner from "../components/common/Spinner";
import QuizCard from "./QuizCard";

class Quizzes extends Component {
  componentDidMount() {
    this.props.getQuizzes();
    this.props.getTracks();
  }

  onFilter(id) {
    this.props.filterByTrack(id);
  }

  render() {
    const { quizzes, loading } = this.props.quizzes;
    const { tracks, loadingTracks } = this.props.tracks;

    let quizzContent, trackNames;
    let spinner;
    if (quizzes === null || loading) {
      spinner = <Spinner />;
    } else {
      quizzContent = quizzes.map(quiz => {
        return (
          <QuizCard
            key={quiz._id}
            id={quiz._id}
            title={quiz.title}
            description={quiz.description}
            track={quiz.track}
            image={quiz.image}
          />
        );
      });
    }
    if (tracks === null || loadingTracks) {
      spinner = <Spinner />;
    } else {
      trackNames = tracks.map(track => {
        return (
          <button
            key={track._id}
            className="btn btn-outline-dark m-1"
            onClick={this.onFilter.bind(this, track._id)}
            size="sm"
          >
            {track.name}
          </button>
        );
      });
    }

    return (
      <div className="container">
        <nav className="nav justify-content-center nav-pills flex-column flex-md-row">
          <button
            className="btn btn-outline-dark m-1"
            onClick={this.props.getQuizzes.bind(this)}
            size="sm"
          >
            See All
          </button>
          {trackNames}
        </nav>
        <div className="row">{quizzContent}</div>
        {spinner}
      </div>
    );
  }
}

Quizzes.propTypes = {
  getQuizzes: PropTypes.func.isRequired,
  getTracks: PropTypes.func.isRequired,
  quizzes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quizzes: state.quizzes,
  tracks: state.tracks
});

export default connect(
  mapStateToProps,
  { getQuizzes, getTracks, filterByTrack }
)(Quizzes);
