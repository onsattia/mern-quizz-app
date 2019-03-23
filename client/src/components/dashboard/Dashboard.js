import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../store/actions/profileActions";

import ProfileHeader from "../profile/ProfileHeader";
import DashboardInfo from "./DashboardInfo";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="row">
            <div className="col-md-4">
              <ProfileHeader profile={profile} />
            </div>
            <div className="col-md-8">
              <DashboardInfo subscribedQuizzes={profile.subscribedQuizzes} />
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="row">
            <div className="col-md-4">
              <div className="card card-body shadow-sm mb-3">
                <div className="text-center">
                  <h3 className="font-weight-bold text-center">Welcome!</h3>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="alert alert-primary" role="alert">
                <Link to="/create-profile" className="alert-link">
                  Click Here,
                </Link>{" "}
                To Complete Your Profile!
              </div>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
