import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { addQuizToProfile } from "../store/actions/profileActions";
import "./QuizCard.css";

class QuizCard extends Component {
  onClickQuiz(id) {
    this.props.addQuizToProfile(id, this.props.history);
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="col-md-6 col-lg-4 my-4">
        <div className="card shadow-sm">
          <img
            src={this.props.image}
            className="card-img-top img-fluid"
            alt={this.props.title}
            style={{ height: "220px", width: "100%" }}
          />
          <div className="card-body">
            <h3 className="card-title">{this.props.title}</h3>
            <p className="card-text">{this.props.description}</p>
            {isAuthenticated ? (
              <span onClick={this.onClickQuiz.bind(this, this.props.id)}>
                <i className="hovereffect float-right fas fa-play-circle fa-2x mb-2" />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

QuizCard.propTypes = {
  addQuizToProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addQuizToProfile }
)(withRouter(QuizCard));
