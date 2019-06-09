import React, { useRef } from "react";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "../../styles.scss";

export default class SideBar extends React.Component {
  state = {
    page: "dashboard",
    crop: "",
    quantity: 0,
    location: ""
  };
  render() {
    return (
      <div className="side-bar">
        <div className="side-bar-wrapper">
          <h2>Filters: </h2>
          <InputLabel htmlFor="crop">Crop Type</InputLabel>
          <Select
            value={this.state.crop}
            onChange={e => this.setState({ crop: e.target.value })}
            inputProps={{
              name: "crop",
              id: "crop"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="apple">Apple</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="mango">Mango</MenuItem>
          </Select>
          <br /> <br />
          <InputLabel htmlFor="location">Location</InputLabel>
          <Select
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
            inputProps={{
              name: "location",
              id: "location"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Bengaluru">Bengaluru</MenuItem>
            <MenuItem value="Mangalore">Mangalore</MenuItem>
            <MenuItem value="Hubli">Hubli</MenuItem>
          </Select>
          <InputLabel htmlFor="location">Quantity</InputLabel>
          <Select
            value={this.state.quantity}
            onChange={e => this.setState({ quantity: e.target.value })}
            inputProps={{
              name: "quantity",
              id: "quantity"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Bengaluru">Bengaluru</MenuItem>
            <MenuItem value="Mangalore">Mangalore</MenuItem>
            <MenuItem value="Hubli">Hubli</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}
