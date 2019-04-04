import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getQuizzes, filterByTrack } from "../store/actions/quizActions";
import { getTracks } from "../store/actions/trackActions";
import { getCurrentProfile } from "../store/actions/profileActions";
import { addQuizToProfile } from "../store/actions/profileActions";

import Spinner from "../components/common/Spinner";
import QuizCard from "./QuizCard";

class Quizzes extends Component {
  componentDidMount() {
    this.props.getQuizzes();
    this.props.getTracks();
    this.props.getCurrentProfile();
  }

  onFilter(id) {
    this.props.filterByTrack(id);
  }

  onClickQuiz(id) {
    this.props.addQuizToProfile(id, this.props.history);
  }

  render() {
    const { quizzes, loading } = this.props.quizzes;
    const { tracks, loadingTracks } = this.props.tracks;
    const { profile } = this.props.profile;

    let quizzContent, trackNames;
    let spinner;
    let icon = "hovereffect float-right fas fa-plus-circle fa-2x mb-2";

    if (quizzes === null || loading || profile === null) {
      spinner = <Spinner />;
    } else {
      quizzContent = quizzes.map(quiz => {
        let subquizzes = profile.subscribedQuizzes.map(subQuiz => {
          return subQuiz._id;
        });
        if (subquizzes.includes(quiz._id)) {
          icon = "hovereffect float-right fas fa-check fa-2x mb-2";
        } else {
          icon = "hovereffect float-right fas fa-plus-circle fa-2x mb-2";
        }
        return (
          <QuizCard
            key={quiz._id}
            id={quiz._id}
            title={quiz.title}
            description={quiz.description}
            track={quiz.track}
            image={quiz.image}
            click={this.onClickQuiz.bind(this, quiz._id)}
            icon={icon}
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
  getCurrentProfile: PropTypes.func.isRequired,
  addQuizToProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  quizzes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  quizzes: state.quizzes,
  tracks: state.tracks,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getQuizzes, getTracks, filterByTrack, addQuizToProfile, getCurrentProfile }
)(withRouter(Quizzes));
