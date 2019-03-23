import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../../components/common/Spinner";
import QuizCard from "../QuizCard";

class DashboardInfo extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-light">
              <li
                className="breadcrumb-item text-dark active"
                aria-current="page"
              >
                My Quizzes
              </li>
            </ol>
          </nav>
          <div className="card shadow mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={require("../../assets/img/html.png")}
                  className="card-img"
                  alt="..."
                  style={{ height: "100%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">HTML5</h5>
                  <p className="card-text">Learn the basics of HTML5.</p>
                  <p className="card-text">
                    <small className="text-muted">Last visit 3 mins ago</small>
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger mb-2 float-right"
                  >
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-columns" />
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-light">
              <li
                className="breadcrumb-item text-dark active"
                aria-current="page"
              >
                Recommended For You
              </li>
            </ol>
          </nav>
          <div className="card-columns">
            <div className="card shadow-sm">
              <img
                className="card-img-top img-fluid"
                src={require("../../assets/img/javascript.png")}
                alt=""
              />
              <div className="card-body">
                <h4 className="card-title">JavaScript</h4>
                <p className="card-text">
                  This is a longer card with supporting text below as a little
                  bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// DashboardInfo.propTypes = {
//   getQuizzes: PropTypes.func.isRequired,
//   quizzes: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   quizzes: state.quizzes
// });

export default DashboardInfo;
