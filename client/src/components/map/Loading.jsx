import React from 'react'

const Loading = () => {
  return (
    <div style={{height:"70h",display:"flex", justifyContent:"center"}}>
     <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden"></span>
     </div>
     <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden"></span>
     </div>
     <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden"></span>
     </div>
    </div>
    );
};
 
export default Loading;