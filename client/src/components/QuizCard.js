import React from "react";

const QuizCard = props => {
  return (
    <div className="col-md-6 col-lg-4 my-4">
      <div className="card" style={{ height: "350px" }}>
        <img
          src={props.image}
          className="card-img-top img-fluid"
          alt={props.title}
          style={{ height: "200px", width: "315" }}
        />
        <div className="card-body">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
