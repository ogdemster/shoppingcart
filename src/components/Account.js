import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/reducers/userSlice";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [userDetail, setUserDetail] = useState({
    username: "",
  });

  //depends info styles add handleChange to update user info

  useEffect(() => {
    if (user && user[0]) {
      dispatch(fetchUser({ user_id: user[0].id })).then((response) => {
        setUserDetail(response.payload);
      });
    }
  }, [dispatch, user]);

  return <p>{userDetail.username} salka</p>;
}

export default Account;
