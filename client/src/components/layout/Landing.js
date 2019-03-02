import React, { Component } from "react";
import Register from "../auth/Register";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="display-4">Our Mission</h1>
            <div className="border p-2" style={{ height: "300px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              ab sequi error inventore pariatur. Adipisci quos nihil delectus
              molestias qui tenetur cumque distinctio rem aut. Incidunt quam
              corrupti assumenda repellat.
            </div>
          </div>
          <Register />
        </div>
      </div>
    );
  }
}

export default Landing;
