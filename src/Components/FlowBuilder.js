import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import React, { useState, useCallback } from "react";
import NodePanel from "./NodePanel";
import SettingsPanel from "./SettingPanel";
import "reactflow/dist/style.css";

const initialEdges = [];

function FlowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => {
      // Check if there is already an edge from the source handle
      const sourceHandleHasEdge = edges.some(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
  
      // If there is no edge from the source handle, add the new edge
      if (!sourceHandleHasEdge) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges],
  )

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

  const updateNodeData = useCallback((id, data) => {
    setNodes((ns) =>
      ns.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n))
    );
  }, [])

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{ width: "20%", backgroundColor: "#f0f0f0", padding: "10px" }}
      >
        {selectedNode ? <SettingsPanel selectedNode={selectedNode} updateNodeData={updateNodeData} /> : <NodePanel onDragStart={onDragStart} />}
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
          onConnect={onConnect}
          onSelectionChange={element => setSelectedNode(element && element.type === 'default' ? element : null)}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowBuilder;
