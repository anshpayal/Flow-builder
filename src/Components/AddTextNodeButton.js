import React, { useState } from "react";

const AddTextNodeButton = ({ onClick }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddNode = () => {
    onClick(message || "New Text"); // Use the provided message or default to "New Text"
    setMessage(""); // Reset the input field after adding the node
  };
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Enter custom message"
      />
       <button onClick={handleAddNode}>Add Text Node</button>
    </div>
  );
};

export default AddTextNodeButton;
