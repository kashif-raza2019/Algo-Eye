import React, { useState } from 'react';

const TreeNode = ({ data, label = null, depth = 0 }) => {
  const [expanded, setExpanded] = useState(depth < 2); // Auto-expand first 2 levels
  const isContainer = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);
  const isEmpty = isArray ? data.length === 0 : Object.keys(data).length === 0;

  if (data === null) {
    return (
      <div className="tree-item">
        <span className="tree-value null-value">null</span>
      </div>
    );
  }

  if (typeof data !== 'object') {
    return (
      <div className="tree-item">
        <span className="tree-value">
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
      </div>
    );
  }

  return (
    <div className="tree-node">
      <div className="tree-item">
        {!isEmpty && (
          <button
            className={`expand-button ${expanded ? 'expanded' : ''}`}
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse' : 'Expand'}
          >
            ▶
          </button>
        )}
        {isEmpty && <span className="expand-button placeholder" />}

        {label && <span className="tree-key">{label}:</span>}

        <span className="tree-bracket">
          {isArray ? '[' : '{'}
        </span>

        {isEmpty && (
          <span className="tree-bracket">
            {isArray ? ']' : '}'}
          </span>
        )}
      </div>

      {expanded && !isEmpty && (
        <div className="tree-children">
          {isArray ? (
            data.map((item, index) => (
              <TreeNode key={index} data={item} label={`${index}`} depth={depth + 1} />
            ))
          ) : (
            Object.entries(data).map(([key, value]) => (
              <TreeNode key={key} data={value} label={key} depth={depth + 1} />
            ))
          )}
          <div className="tree-item">
            <span className="tree-bracket">
              {isArray ? ']' : '}'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data }) => {
  return (
    <div className="tree-view">
        <TreeNode data={data} />
    </div>
  );
};

export default TreeView;
