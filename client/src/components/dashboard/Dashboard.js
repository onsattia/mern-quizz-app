import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../store/actions/profileActions";

import ProfileHeader from "../profile/ProfileHeader";
import DashboardInfo from "./DashboardInfo";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has a profile
      if (Object.keys(profile).length > 0) {
        // console.log(profile.)
        dashboardContent = (
          <div className="row">
            <div className="col-md-4">
              <ProfileHeader profile={profile} />
            </div>
            <div className="col-md-8">
              <DashboardInfo />
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="row">
            <div className="alert alert-primary" role="alert">
              <Link to="/edit-profile" className="alert-link">
                Click Here,
              </Link>
              To Complete Your Profile!
            </div>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">{dashboardContent}</div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
