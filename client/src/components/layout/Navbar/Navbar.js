import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../../store/actions/authActions";
import {
  getCurrentProfile,
  clearCurrentProfile
} from "../../../store/actions/profileActions";

import Spinner from "../../common/Spinner";

import "./Navbar.css";

class Navbar extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.user;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <Link to={`/profile/${profile.handle}`} className="dropdown-item">
            My Profile
          </Link>
        );
      } else {
        dashboardContent = <div />;
      }
    }

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/login">
            Log In
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <button
            className="btn btn-link nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            {this.props.user.user.name}{" "}
            <img
              alt=""
              src={this.props.user.user.avatar}
              className="rounded-circle"
              style={{ width: "30px" }}
            />{" "}
          </button>
          <div className="dropdown-menu">
            {dashboardContent}
            <Link to="/account" className="dropdown-item ">
              Account Settings
            </Link>
            <button
              className="dropdown-item"
              onClick={this.onLogout.bind(this)}
            >
              Log Out
            </button>
          </div>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
        <div className="container">
          {isAuthenticated ? (
            <Link className="navbar-brand" to="/dashboard">
              Qx
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              Qx
            </Link>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {isAuthenticated ? (
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                ) : (
                  <></>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quizzes">
                  Quizzes
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, clearCurrentProfile, logoutUser }
)(Navbar);
