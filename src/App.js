import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import { Header } from "./components";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="app-root">
        <Router basename="/">
          <Header />
          <div className="content-wrapper">
            <PageRoutes />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
