import React from 'react';

const JsonActions = ({ onBeautify, onMinify, onDownload, onCopy, hasData }) => {
  return (
    <div className="json-actions">
      <button className="action-button" onClick={onBeautify} title="Format JSON with indentation">
        ✨ Beautify
      </button>
      <button className="action-button" onClick={onMinify} title="Remove all whitespace">
        ⚡ Minify
      </button>
      <button
        className="action-button"
        onClick={onDownload}
        disabled={!hasData}
        title="Download JSON as file"
      >
        ⬇️ Download
      </button>
      <button
        className="action-button"
        onClick={onCopy}
        disabled={!hasData}
        title="Copy JSON to clipboard"
      >
        📋 Copy
      </button>
    </div>
  );
};

export default JsonActions;
