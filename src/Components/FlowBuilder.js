import ReactFlow, {
  Controls,
  Background,
  Handle,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import React, { useState, useCallback } from "react";
import NodePanel from "./NodePanel";
import "reactflow/dist/style.css";

const initialEdges = [
  { id: "1-2", source: "1", target: "2", type: "step" },
];

function FlowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onDragStart = (event, label) => {
    event.dataTransfer.setData("label", label);
    // Necessary for Firefox to enable dragging
    event.dataTransfer.setData("text/plain", "Anything");
  };

  const onDrop = (event) => {
    event.preventDefault(); // Prevent default behavior to allow drop
    const label = event.dataTransfer.getData("label");
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label },
      position: {
        x: event.clientX - event.target.getBoundingClientRect().left,
        y: event.clientY - event.target.getBoundingClientRect().top,
      },
    };
    setNodes([...nodes, newNode]);
  };

  const onDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow drop
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{ width: "20%", backgroundColor: "#f0f0f0", padding: "10px" }}
      >
        <NodePanel onDragStart={onDragStart} />
        {/* You can add more controls or options for different node types here */}
      </div>
      <div
        style={{
          height: "100vh",
          flex: 1,
          border: "1px dashed #ccc",
          position: "relative",
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowBuilder;
