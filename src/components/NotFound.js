import React from "react";
import { Link } from "react-router-dom";

function NotFound() {

  return (
    <section className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__paragraph">Oops! Seems like something went wrong, or I don't know...</p>
      <p className="not-found__paragraph">Anyway, page not found. Sorry for that.</p>
      <Link to="/" className="not-found__link"><span>&#8249;</span> Return to Homepage</Link>
    </section>
  );
}

export default NotFound;