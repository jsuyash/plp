import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import { Header } from "./components";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <Router basename={window.location.pathname || "/plp"}>
        <div className="app-root">
          <Header />
          <div className="content-wrapper">
            <PageRoutes />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
