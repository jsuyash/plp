import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import "./App.scss";
import { Header } from "./components";

class App extends React.Component {
  render() {
    return (
      <div className="app-root">
        <Router>
          <Header />
          <div className="content-wrapper">
            <div className="left-block"></div>
            <div className="right-block">
              <PageRoutes />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
