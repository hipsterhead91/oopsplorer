import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {

  return (
    <div className="app__container">

      <Header setCurrentChain={props.setCurrentChain} />

      <main className="app__main">
        <Outlet context={[props.setCurrentChain]} />
      </main>

      <Footer />

    </div>
  );
}

export default Layout;