import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const axios = require("axios");
import { Alert } from "react-bootstrap";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      usersuccess: "",
      usererror: "",
      dataflag: false
    };
  }

  componentDidMount() {
    this.dataFetched();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dataflag) {
      console.log("componentDidUpdate call");
      this.dataFetched();
    }
  }

  dataFetched = () => {
    const context = this;
    axios
      .get("/users")
      .then(function(response) {
        console.log("response");
        console.log(response.data);

        context.setState({ dataflag: false });
        context.setState({ rows: response.data });
      })
      .catch(function(err) {
        console.log("err");
        console.log(err);
      });
  };

  onUpdate(userid) {
    alert(userid);
  }

  onDelete(userid) {
    const context = this;
    axios
      .delete("/users", {
        data: {
          userid: userid
        }
      })
      .then(function(response) {
        console.log("response");
        console.log(response.data);
        if (response.status === 200) {
          context.setState({ usersuccess: "User deleted successfully." });
          context.setState({ dataflag: true });
        } else {
          context.setState({
            usererror: response.statusText
          });
        }
      })
      .catch(function(err) {
        console.log("err");
        console.log(err);
        context.setState({
          usererror: err.statusText
        });
      });
  }

  render() {
    return (
      <Paper
        style={{
          root: {
            width: "100%",
            overflowX: "auto"
          }
        }}
      >
        {this.state.usersuccess ? (
          <Alert key="success" variant="success">
            {this.state.usersuccess}
          </Alert>
        ) : (
          ""
        )}

        {this.state.usererror ? (
          <Alert key="danger" variant="danger">
            {this.state.usererror}
          </Alert>
        ) : (
          ""
        )}

        <Table
          style={{
            table: {
              minWidth: 650
            }
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.userid}>
                <TableCell component="th" scope="row">
                  {row.firstname}
                </TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "10px" }}
                    onClick={() => this.onDelete(row.userid)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "10px" }}
                    onClick={() => this.onUpdate(row.userid)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Users;
