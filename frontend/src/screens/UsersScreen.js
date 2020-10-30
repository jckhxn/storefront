import React, { useEffect, useState } from "react";
import Axios from "axios";
import {setUserCoupon} from '../actions/userActions';
import { useDispatch ,useSelector} from 'react-redux';
function UsersScreen() {
 
  const [modalVisible, setModalVisible] = useState(false);
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [coupon, setCoupon] = useState('');
  const [users,setUsers] = useState([]);
  const [editUser, setEditUser] = useState('');
  const dispatch = useDispatch();
  useEffect( () => {
    const fetchData = async () => {
    const result = await Axios.get("/api/users/list");
    
    setUsers(result.data.users);
  };
    fetchData();    
  },[]);
  
  const handleEdit = (user) => {
    // Pop model, change coupon, push.
    setModalVisible(true);
    setEditUser(user._id);
    console.log(user._id)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userInfo);
    dispatch(setUserCoupon({userId: editUser, coupon }))
   
    setModalVisible(false)
    window.location.reload();
  };
  // users.map(user => console.log(user.isAdmin));
  return (
    <div>
      <h1>Users and a way to modify them.</h1>
           
      <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Coupon</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map(user => (<tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin?"Yes":"No"}</td>
              {user.coupon? <> <td>{user.coupon} </td> <button onClick={(e)=> handleEdit(user)}>Edit</button></>:"None"}
            </tr>))}
          </tbody>
        </table>
        {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Edit Coupon</h2>
              </li>
           
              <li>
                <label htmlFor="coupon">Coupon</label>
                <input
                  type="text"
                  name="coupon"
                  value={coupon}
                  id="name"
                  onChange={(e) => setCoupon(e.target.value)}
                required></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                 Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
              </ul>
              </form>
              </div>
        )}
            
    </div>
  );
}
export default UsersScreen;
