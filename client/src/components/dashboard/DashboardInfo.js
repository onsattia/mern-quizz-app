import React, { Component } from "react";

class DashboardInfo extends Component {
  render() {
    const { subscribedQuizzes } = this.props;
    const myQuizzes = subscribedQuizzes.map(quiz => (
      <div className="card shadow-sm" key={quiz._id}>
        <img
          className="card-img-top img-fluid"
          src={quiz.image}
          alt=""
          style={{ height: "180px", width: "100%" }}
        />
        <div className="card-body">
          <h4 className="card-title">{quiz.title}</h4>
          <p className="card-text">{quiz.description}</p>
          <button type="button" className="btn btn-danger mb-2 float-right">
            Resume
          </button>
        </div>
      </div>
    ));
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
          <div className="card-columns">{myQuizzes}</div>
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
