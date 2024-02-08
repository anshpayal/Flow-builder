import ReactFlow, { Controls, Background } from "reactflow";
import React, { useState } from "react";
import AddTextNodeButton from "./AddTextNodeButton";
import "reactflow/dist/style.css";

function FlowBuilder() {
  const [nodes, setNodes] = useState([]);

  const addTextNode = (message) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: message },
      position: {
        x: Math.random() * 400, // Adjust the position as needed
        y: Math.random() * 400,
      },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{ width: "15%", backgroundColor: "#f0f0f0", padding: "10px" }}
      >
        <AddTextNodeButton onClick={addTextNode} />
        {/* You can add more controls or options for different node types here */}
      </div>
      <div style={{ height: "100vh", flex: 1 }}>
        <ReactFlow nodes={nodes}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowBuilder;
