import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Nav } from "react-bootstrap";
import NewUser from "./components/NewUser";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link>
                <Link exact strict to="/newuser">
                  New User
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link exact strict to="/users">
                  All Users
                </Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <Switch>
          <Route path="/newuser">
            <NewUser></NewUser>
          </Route>
          <Route path="/users">
            <Users></Users>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
