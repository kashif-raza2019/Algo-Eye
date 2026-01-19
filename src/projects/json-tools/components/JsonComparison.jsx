import React, { useState } from 'react';
import TreeView from './TreeView';

const JsonComparison = ({ json1, json2, onJson1Change, onJson2Change }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
    onJson1Change(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
    onJson2Change(e.target.value);
  };

  const getDifferences = () => {
    if (!json1 || !json2) return [];

    const differences = [];
    const compareValues = (val1, val2, path = '') => {
      if (typeof val1 !== typeof val2) {
        differences.push({
          path: path || 'root',
          type: 'type-mismatch',
          json1: typeof val1,
          json2: typeof val2,
        });
        return;
      }

      if (typeof val1 === 'object' && val1 !== null && val2 !== null) {
        const keys1 = Object.keys(val1);
        const keys2 = Object.keys(val2);

        // Check for missing keys
        keys1.forEach((key) => {
          if (!keys2.includes(key)) {
            differences.push({
              path: path ? `${path}.${key}` : key,
              type: 'missing-in-json2',
              value: val1[key],
            });
          }
        });

        keys2.forEach((key) => {
          if (!keys1.includes(key)) {
            differences.push({
              path: path ? `${path}.${key}` : key,
              type: 'missing-in-json1',
              value: val2[key],
            });
          }
        });

        // Recursively compare shared keys
        keys1.forEach((key) => {
          if (keys2.includes(key)) {
            compareValues(val1[key], val2[key], path ? `${path}.${key}` : key);
          }
        });
      } else if (val1 !== val2) {
        differences.push({
          path: path || 'root',
          type: 'value-mismatch',
          json1: val1,
          json2: val2,
        });
      }
    };

    compareValues(json1, json2);
    return differences;
  };

  const differences = getDifferences();

  return (
    <div className="json-comparison">
      <div className="comparison-inputs">
        <div className="comparison-column">
          <h3>JSON 1</h3>
          <textarea
            className="json-textarea comparison-textarea"
            value={input1}
            onChange={handleInput1Change}
            placeholder="Paste first JSON here..."
            spellCheck="false"
          />
          {json1 && (
            <div className="tree-container">
              <TreeView data={json1} />
            </div>
          )}
        </div>

        <div className="comparison-column">
          <h3>JSON 2</h3>
          <textarea
            className="json-textarea comparison-textarea"
            value={input2}
            onChange={handleInput2Change}
            placeholder="Paste second JSON here..."
            spellCheck="false"
          />
          {json2 && (
            <div className="tree-container">
              <TreeView data={json2} />
            </div>
          )}
        </div>
      </div>

      {differences.length > 0 && (
        <div className="differences-section">
          <h3>Differences Found: {differences.length}</h3>
          <div className="differences-list">
            {differences.map((diff, index) => (
              <div key={index} className={`difference-item ${diff.type}`}>
                <span className="diff-path">{diff.path}</span>
                <span className="diff-type">{diff.type.replace(/-/g, ' ')}</span>
                {diff.json1 !== undefined && (
                  <span className="diff-value">
                    JSON1: {typeof diff.json1 === 'string' ? `"${diff.json1}"` : String(diff.json1)}
                  </span>
                )}
                {diff.json2 !== undefined && (
                  <span className="diff-value">
                    JSON2: {typeof diff.json2 === 'string' ? `"${diff.json2}"` : String(diff.json2)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {json1 && json2 && differences.length === 0 && (
        <div className="match-message">✅ JSONs are identical!</div>
      )}
    </div>
  );
};

export default JsonComparison;
