import React, { useState } from "react";

function SettingsPanel({ selectedNode, updateNodeData }) {
  const [label, setLabel] = useState(selectedNode.data.label);

  const handleChange = (event) => {
    setLabel(event.target.value);
    updateNodeData(selectedNode.id, { label: event.target.value });
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
      <h3 style={{ marginBottom: '10px' }}>Settings Panel</h3>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        Label:
        <input type="text" value={label} onChange={handleChange} style={{ marginLeft: '5px' }} />
      </label>
    </div>
  );
}

export default SettingsPanel;
