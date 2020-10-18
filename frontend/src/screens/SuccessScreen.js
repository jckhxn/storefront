import React, { useState, useEffect } from 'react';
const divStyle = {
   textAlign:"center"
}

function SuccessScreen() {
 
  

  return (
      <div style={divStyle}>
        
          <h1 >Payment Success</h1>
    <h3>For any questions please contact us at the information above.</h3>
        {setTimeout(() => { window.location.href = '/'},3000)}
      </div>
    
  )
}
export default SuccessScreen;
