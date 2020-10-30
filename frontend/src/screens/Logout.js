import React,{history} from 'react';
import { logout, update } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
function Logout(props) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/');
  };
  handleLogout();
  return (
   <div>

   </div>
  )
}
export default Logout;
