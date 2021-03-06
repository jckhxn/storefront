import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import moment from 'moment';
function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();
  

  
  useEffect(() => {

    
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>NAME</th>
              <th>ID</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{moment.utc(order.createdAt).local().format('MM-DD-YYYY h:mm A') }</td>
              <td>{order.user.name}</td>
              <td>{order._id}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <>
                <Link to={"/order/" + order._id}  className="button secondary" 
                style={{backgroundColor:'#ed5f74',
                color:'white',borderRadius:'6px',
                border:'0',padding:'12px 16px',fontWeight:'600',
                cursor:'pointer',transition:'all 0.2s ease',
                display:'block',width:'50% /2',}}>Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;