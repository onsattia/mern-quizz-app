import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUser, editUser } from "../../store/actions/accountActions";
import { deleteAccount } from "../../store/actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      role: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password
    };
    this.props.editUser(this.state.id, newUser);
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  componentDidMount() {
    const { user } = this.props.user;

    this.props.getUser(user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.accountCredentials) {
      this.setState({
        id: nextProps.accountCredentials._id,
        name: nextProps.accountCredentials.name,
        email: nextProps.accountCredentials.email,
        role: nextProps.accountCredentials.role,
        password: nextProps.accountCredentials.password
      });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Account Settings</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <input
                type="submit"
                value="Update"
                className="btn btn-info btn-block"
              />
            </form>
            <hr />
            <p>
              Do you want to delete this account?
              <button
                type="button"
                onClick={this.onDeleteClick}
                className="btn btn-danger float-right"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  getUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  accountCredentials: state.accountCredentials.accountCredentials,
  user: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser, editUser, deleteAccount }
)(withRouter(Account));
