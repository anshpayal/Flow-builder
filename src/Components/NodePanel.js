// NodePanel.js
import React, { useState } from "react";

const NodePanel = ({ onDragStart }) => {
  const [message, setMessage] = useState("");


  const handleDragStart = (event) => {
    onDragStart(event, message || "New Text");
    setMessage(""); // Reset the input field after dragging
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div style={{padding:"10px", textAlign:"center", border: "1px solid #ccc",}}>
      <h3>Text Node</h3>  
      <input
        style={{padding:"10px", border: "1px solid #ccc" , width:"93%"}}
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Text Message"
      />
      <div
        draggable
        onDragStart={handleDragStart}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        Drag Me
      </div>
    </div>
  );
};

export default NodePanel;
