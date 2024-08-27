import {
  Button,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
  TableContainer,
} from "@mui/material";
import React, { Component } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      EmptyAlert: false,
      isAlert: false,
      UpdateAlert: false,
      DeleteAlert: false,
      DeleteSuccessAlert: false,
      Dialogue: false,
      data: [],
      userDetails: {
        title: "",
        description: "",
      },
      index: "",
      completedTasks: [],
    };
  }
  handleClick() {
    this.setState({ Dialogue: true });
  }
  handleCloseDialog = () => {
    this.setState({ Dialogue: false });
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userDetails: {
        ...prevState.userDetails,
        [name]: value,
      },
    }));
  };
  handleSubmit = () => {
    const { userDetails, data, index } = this.state;
    if (index !== "") {
      const updatedData = [...data];
      updatedData[index] = userDetails;
      this.setState({
        data: updatedData,
        Dialogue: false,
        userDetails: {
          title: "",
          description: "",
        },
        index: "",
        UpdateAlert: true,
      });
      setTimeout(() => {
        this.setState({ UpdateAlert: false });
      }, 3000);
    } else {
      if (userDetails.title === "" && userDetails.description === "") {
        this.setState({ EmptyAlert: true });
        setTimeout(() => {
          this.setState({ EmptyAlert: false });
        }, 3000);
      } else {
        this.setState({
          data: [...data, userDetails],
          Dialogue: false,
          userDetails: {
            title: "",
            description: "",
          },
          index: "",
          isAlert: true,
        });
        setTimeout(() => {
          this.setState({ isAlert: false });
        }, 3000);
      }
    }
  };
  handleUpdate = (index) => {
    const task = this.state.data[index];
    this.setState({
      Dialogue: true,
      userDetails: task,
      index: index,
    });
  };
  handleDelete = (idx) => {
    this.setState({ DeleteAlert: idx + 1 });
  };
  handleAgree = () => {
    const { data } = this.state;
    const updatedData = data.filter((a, i) => i !== this.state.DeleteAlert - 1);
    this.setState({
      data: updatedData,
      DeleteSuccessAlert: true,
      DeleteAlert: false,
    });
    setTimeout(() => {
      this.setState({ DeleteSuccessAlert: false });
    }, 3000);
  };
  handleDisagree = () => {
    this.setState({ DeleteAlert: null });
  };
  completeTask = (taskId) => {
    const { data, completedTasks } = this.state;
    const taskIndex = data.findIndex((task) => task.id === taskId);
    const completedTask = data[taskIndex];
    this.setState({
      data: data.filter((task) => task.id !== taskId),
      completedTasks: [...completedTasks, completedTask],
    });
  };
  render() {
    const { Dialogue, userDetails, data, completedTasks } = this.state;
    return (
      <div>
        <nav>
          <h3>
            <center>To-do List</center>
          </h3>
        </nav>
        <hr />
        <Button
          variant="contained"
          style={{ marginLeft: "1200px" }}
          onClick={() => {
            this.handleClick();
          }}
        >
          + Add
        </Button>
        {Dialogue && (
          <div className="dialog">
            <div className="dialog-content">
              <h3>
                <center>Enter Details</center>
              </h3>
              <center>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={userDetails.title}
                    onChange={this.handleInputChange}
                  />
                </label>
              </center>
              <br />
              <center>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={userDetails.description}
                    onChange={this.handleInputChange}
                  />
                </label>
              </center>
              <br />
              <center>
                <table>
                  <th>
                    <Button variant="contained" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </th>
                  <th>
                    <Button
                      variant="contained"
                      onClick={this.handleCloseDialog}
                    >
                      Cancel
                    </Button>
                  </th>
                </table>
              </center>
            </div>
          </div>
        )}
        {this.state.EmptyAlert && (
          <Stack>
            <Alert severity="error">
              Title and Description should not be empty!.Please enter details.
            </Alert>
          </Stack>
        )}
        {this.state.isAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Added Successfully!</Alert>
          </Stack>
        )}
        {this.state.UpdateAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Updated Successfully!</Alert>
          </Stack>
        )}
        {console.log("qwerty=-======>", this.state)}
        {this.state.DeleteAlert && (
          <Dialog
            open={Boolean(this.state.DeleteAlert)}
            onClose={() => this.handleDisagree()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure,you want to delete the data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleDisagree()}>Disagree</Button>
              <Button onClick={() => this.handleAgree()}>Agree</Button>
            </DialogActions>
          </Dialog>
        )}
        {this.state.DeleteSuccessAlert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Deleted Successfully!</Alert>
          </Stack>
        )}
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h5>Title</h5>
                </TableCell>
                <TableCell>
                  <h5>Description</h5>
                </TableCell>
                <TableCell colSpan="2">
                  <h5>Update/Delete</h5>
                </TableCell>
                <TableCell>
                  <h5>Action</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((a, index) => (
                <TableRow>
                  <TableCell>
                    <h6>{a.title}</h6>
                  </TableCell>
                  <TableCell>
                    <h6>{a.description}</h6>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => this.handleUpdate(index)}
                      variant="outlined"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => this.handleDelete(index)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => this.completeTask(userDetails.id)}
                    >
                      Completed
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h5>Title</h5>
                </TableCell>
                <TableCell>
                  <h5>Description</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedTasks.map((task) => (
                <TableRow>
                  <TableCell>
                    <h6>{task.title}</h6>
                  </TableCell>
                  <TableCell>
                    <h6>{task.description}</h6>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default TodoList;

// {
//   const {data}=this.state
//   const updatedData=data.filter((a,i)=>i !== index )
//   this.setState({
//     data:updatedData,
//     DeleteSuccessAlert:true
//   })
//   setTimeout(() => {
//     this.setState({DeleteSuccessAlert:false})
//   }, 3000);
// }
