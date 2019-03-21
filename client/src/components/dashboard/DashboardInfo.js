import React, { Component } from "react";

class DashboardInfo extends Component {
  render() {
    return (
      <div class="row">
        <div class="col-md-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-light">
              <li class="breadcrumb-item text-dark active" aria-current="page">
                My Quizzes
              </li>
            </ol>
          </nav>
          <div class="card shadow mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src={require("../../assets/img/html.png")}
                  class="card-img"
                  alt="..."
                  style={{ height: "100%" }}
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">HTML5</h5>
                  <p class="card-text">Learn the basics of HTML5.</p>
                  <p class="card-text">
                    <small class="text-muted">Last visit 3 mins ago</small>
                  </p>
                  <button type="button" class="btn btn-danger mb-2 float-right">
                    Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-columns">
            <div class="card shadow-sm">
              <img
                class="card-img-top img-fluid"
                src={require("../../assets/img/css.png")}
                alt=""
              />
              <div class="card-body">
                <h4 class="card-title">CSS3</h4>
                <p class="card-text">
                  This is a longer card with supporting text below as a little
                  bit longer.
                </p>
              </div>
            </div>
          </div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-light">
              <li class="breadcrumb-item text-dark active" aria-current="page">
                Recommended For You
              </li>
            </ol>
          </nav>
          <div class="card-columns">
            <div class="card shadow-sm">
              <img
                class="card-img-top img-fluid"
                src="https://source.unsplash.com/random/100x80"
                alt=""
              />
              <div class="card-body">
                <h4 class="card-title">JavaScript</h4>
                <p class="card-text">
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

export default DashboardInfo;
