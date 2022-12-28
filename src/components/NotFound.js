import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

  return (
    <section className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__paragraph"><span>Oops!</span> Seems like URL you are trying to reach is incorrect.</p>
      <Link to="/" className="not-found__link"><span>&#8249;</span> Return to Homepage</Link>
    </section>
  );
}

export default NotFound;