import React, { Component } from "react";

// Core components
import AdminNavbar from "../components/AdminNavbar";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "whit",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar {...this.props} />
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
