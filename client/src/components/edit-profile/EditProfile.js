import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import isEmpty from "../../validation/is-empty";

import {
  createProfile,
  getCurrentProfile
} from "../../store/actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      if (Object.keys(profile).length > 0) {
        // If profile field doesnt exist, make empty string
        profile.website = !isEmpty(profile.website) ? profile.website : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.githubusername = !isEmpty(profile.githubusername)
          ? profile.githubusername
          : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter)
          ? profile.social.twitter
          : "";
        profile.facebook = !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : "";
        profile.linkedin = !isEmpty(profile.social.linkedin)
          ? profile.social.linkedin
          : "";
        profile.youtube = !isEmpty(profile.social.youtube)
          ? profile.social.youtube
          : "";
        profile.instagram = !isEmpty(profile.social.instagram)
          ? profile.social.instagram
          : "";

        // Set component fields state
        this.setState({
          handle: profile.handle,
          website: profile.website,
          location: profile.location,
          status: profile.status,
          githubusername: profile.githubusername,
          bio: profile.bio,
          twitter: profile.twitter,
          facebook: profile.facebook,
          linkedin: profile.linkedin,
          youtube: profile.youtube,
          instagram: profile.instagram
        });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "Select Your Professional Status (Required)", value: 0 },
      { label: "Student/Learner", value: "Student/Learner" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Instructor/Teacher", value: "Instructor/Teacher" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="edit-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Edit Profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile Handle (Required)"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. You can put your full name, nickname..."
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="Website (Optional)"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />

                <TextFieldGroup
                  placeholder="Location (Optional)"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  info="City or City & State"
                />
                <TextFieldGroup
                  placeholder="Github Username (Optional)"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio (Optional)"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>{" "}
                  <span className="text-muted">(Optional)</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Edit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
              <div style={{ marginBottom: "100px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
