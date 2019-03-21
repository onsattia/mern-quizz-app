import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/authActions";
import {
  getCurrentProfile,
  clearCurrentProfile
} from "../../../store/actions/profileActions";
import { getUser } from "../../../store/actions/accountActions";

import Spinner from "../../common/Spinner";

import "./Navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      avatar: ""
    };
  }
  componentWillMount() {
    this.props.getCurrentProfile();
    const { user } = this.props.user;
    this.props.getUser(user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accountCredentials) {
      this.setState({
        id: nextProps.accountCredentials._id,
        name: nextProps.accountCredentials.name,
        avatar: nextProps.accountCredentials.avatar
      });
    }
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
            {this.state.name}{" "}
            <img
              alt=""
              src={this.state.avatar}
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
              CdX
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              CdX
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
  accountCredentials: state.accountCredentials.accountCredentials,
  user: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUser, getCurrentProfile, clearCurrentProfile, logoutUser }
)(Navbar);
