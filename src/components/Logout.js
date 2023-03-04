import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { logout } from "../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Logout(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DropdownButton variant="secondary" title={props.usr[0].username}>
      <Dropdown.Item eventKey="1">Accout</Dropdown.Item>
      <Dropdown.Item eventKey="2" as={Link} to="/shophistory">
        My Shopping History
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4" onClick={handleLogout}>
        Logout
      </Dropdown.Item>
    </DropdownButton>

    // <Button variant="Secondary" onClick={handleLogout}>
    //   Logout
    // </Button>
  );
}

export default Logout;
