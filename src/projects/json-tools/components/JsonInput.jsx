import React from 'react';

const JsonInput = ({ value, onChange }) => {
  return (
    <div className="json-input-section">
      <label htmlFor="json-input">Enter JSON Data:</label>
      <textarea
        id="json-input"
        className="json-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Paste or type your JSON data here... e.g., {"name": "John", "age": 30}'
        spellCheck="false"
      />
    </div>
  );
};

export default JsonInput;
