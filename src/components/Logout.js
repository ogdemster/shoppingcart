import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { logout } from "../redux/reducers/authSlice";
import { clearUsers } from "../redux/reducers/userSlice";
import { clearShoppingTracks } from "../redux/reducers/shoppingTracksSlice";
import { clearShoppingItems } from "../redux/reducers/shoppingItemsSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

function Logout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    alertify.confirm(
      "Logout",
      "Do you want to logout?",
      async function () {
        dispatch(logout());
        dispatch(clearUsers());
        dispatch(clearShoppingTracks());
        dispatch(clearShoppingItems());
        navigate("/");
        alertify.success("Successfully logged out");
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };

  return (
    <DropdownButton variant="secondary" title={props.usr[0].username}>
      <Dropdown.Item eventKey="1" as={Link} to={`/account`}>
        Accout
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" as={Link} to="/shophistory">
        My Shopping History
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4" onClick={handleLogout}>
        Logout
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default Logout;
