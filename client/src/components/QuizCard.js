import React, { Component } from "react";
import { connect } from "react-redux";

import "./QuizCard.css";

class QuizCard extends Component {
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
              <span onClick={this.props.click}>
                <i className={this.props.icon} />
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(QuizCard);
