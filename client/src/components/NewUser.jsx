import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import styles from "./mystyle.css";
import { Alert } from "react-bootstrap";
const axios = require("axios");

class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      address: "",
      phone: "",
      firstnameText: "",
      lastnameText: "",
      phoneText: "",
      validation: false,
      servererrortext: "",
      serversuccesstext: ""
    };
  }

  handleFirstName = e => {
    this.setState({ firstname: e.target.value }, () => {
      if (this.state.firstname.length > 30) {
        this.setState({ firstnameText: "First Name max 30 characters." });
      } else if (!this.state.firstname) {
        this.setState({ firstnameText: "First Name is required." });
      }
    });
  };

  handleLastName = e => {
    this.setState({ lastname: e.target.value }, () => {
      if (this.state.lastname.length > 30) {
        this.setState({ firstnameText: "Last Name max 30 characters." });
      } else if (!this.state.lastname) {
        this.setState({ lastnameText: "Last Name is required." });
      }
    });
  };

  handlePhone = e => {
    this.setState({ phone: e.target.value }, () => {
      if (this.state.phone.length > 15) {
        this.setState({ phoneText: "Phone number max lenght is 15." });
      } else if (!this.state.phone) {
        this.setState({ phoneText: "Phone is required." });
      }
    });
  };

  onSubmit = () => {
    if (
      this.state.firstname.length > 30 ||
      !this.state.firstname ||
      this.state.lastname.length > 30 ||
      !this.state.lastname ||
      this.state.phone.length > 15 ||
      !this.state.phone
    ) {
      this.setState({ validation: true });
    } else {
      const context = this;
      axios
        .post("/users", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          address: this.state.address,
          phone: this.state.phone
        })
        .then(function(response) {
          console.log("response");
          console.log(response);
          if (response.status === 201) {
            context.setState({
              serversuccesstext: "User successfully created."
            });
          } else {
            context.setState({ servererrortext: response.statusText });
          }
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
          context.setState({ servererrortext: error.statusText });
        });
    }
  };

  render() {
    const ferror = this.state.firstnameText ? true : false;
    const lerror = this.state.lastnameText ? true : false;
    const perror = this.state.phoneText ? true : false;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid xs={12} className="marginTop">
            {this.state.validation ? (
              <Alert key="danger" variant="danger">
                {this.state.serversuccesstext
                  ? this.state.serversuccesstext
                  : "Mandatory fields are required, please enter valid values!"}
              </Alert>
            ) : (
              ""
            )}
            {this.state.serversuccesstext ? (
              <Alert key="success" variant="success">
                {this.state.serversuccesstext}
              </Alert>
            ) : (
              ""
            )}
            <TextField
              id="outlined-basic"
              label="First Name *"
              variant="outlined"
              fullWidth
              value={this.state.firstname}
              onChange={this.handleFirstName}
              error={ferror}
              helperText={this.state.firstnameText}
            />
          </Grid>
          <Grid xs={12} className="marginTop">
            <TextField
              id="outlined-basic"
              label="Last Name *"
              variant="outlined"
              fullWidth
              value={this.state.lastname}
              onChange={this.handleLastName}
              error={lerror}
              helperText={this.state.lastnameText}
            />
          </Grid>
          <Grid xs={12} className="marginTop">
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              fullWidth
              onChange={e => {
                this.setState({ address: e.target.value });
              }}
            />
          </Grid>
          <Grid xs={12} className="marginTop">
            <TextField
              id="outlined-basic"
              label="Phone *"
              variant="outlined"
              fullWidth
              value={this.state.phone}
              onChange={this.handlePhone}
              error={perror}
              helperText={this.state.phoneText}
            />
          </Grid>
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-md-12" style={{ margin: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
                onClick={this.onSubmit}
              >
                Save User
              </Button>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default NewUser;
