// src/ExpandableRow.tsx

import React, { useState } from 'react';

interface ExpandableRowProps {
  data: any; // Replace 'any' with the actual data type
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <button onClick={toggleExpand}>{isExpanded ? 'Collapse' : 'Expand'}</button>
      </td>
    </tr>
    
   
  );
};

export default ExpandableRow;
