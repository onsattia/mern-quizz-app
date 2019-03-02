import React from "react";

function QuizCard(props) {
  return (
    <div className="col-md-6 col-lg-4 my-4">
      <div className="card">
        <img
          src={require("../assets/img/html.png")}
          className="card-img-top img-fluid"
          alt="HTML5"
        />
        <div className="card-body">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-text">{props.body}</p>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
