import React, { useEffect, useState } from "react";
import Axios from "axios";
function UsersScreen() {
 

  const [users,setUsers] = useState([]);
  
  useEffect( () => {
    const fetchData = async () => {
    const result = await Axios.get("/api/users/list");
    
    setUsers(result.data.users);
  };
    fetchData();    
  },[]);
  
  
  users.map(user => console.log(user.isAdmin));
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
              <td>{user.coupon}</td>
            </tr>))}
          </tbody>
        </table>
             
    </div>
  );
}
export default UsersScreen;
