import React, { useState } from 'react';
import TreeView from './components/TreeView';
import JsonInput from './components/JsonInput';
import JsonActions from './components/JsonActions';
import JsonComparison from './components/JsonComparison';
import './JSONTool.css';

const JSONTool = () => {
  const [jsonData, setJsonData] = useState(null);
  const [jsonString, setJsonString] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('viewer'); // 'viewer' or 'comparison'
  const [comparisonData, setComparisonData] = useState({
    json1: null,
    json2: null,
  });

  const handleJsonInput = (input) => {
    setJsonString(input);
    setError('');

    if (input.trim() === '') {
      setJsonData(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setJsonData(parsed);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setJsonData(null);
    }
  };

  const handleBeautify = () => {
    if (!jsonString.trim()) {
      setError('Please enter JSON data first');
      return;
    }

    try {
      const parsed = JSON.parse(jsonString);
      const beautified = JSON.stringify(parsed, null, 2);
      handleJsonInput(beautified);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const handleMinify = () => {
    if (!jsonString.trim()) {
      setError('Please enter JSON data first');
      return;
    }

    try {
      const parsed = JSON.parse(jsonString);
      const minified = JSON.stringify(parsed);
      handleJsonInput(minified);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const handleDownload = () => {
    if (!jsonData) {
      setError('No valid JSON data to download');
      return;
    }

    const jsonStr = JSON.stringify(jsonData, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', 'data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    if (!jsonData) {
      setError('No valid JSON data to copy');
      return;
    }

    const jsonStr = JSON.stringify(jsonData, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setError('JSON copied to clipboard!');
      setTimeout(() => setError(''), 2000);
    });
  };

  const handleComparisonChange = (index, input) => {
    try {
      const parsed = input.trim() ? JSON.parse(input) : null;
      setComparisonData({
        ...comparisonData,
        [`json${index}`]: parsed,
      });
      setError('');
    } catch (err) {
      setError(`Invalid JSON in comparison area ${index}: ${err.message}`);
    }
  };

  return (
    <div className="json-tool">
      {/* Tab Navigation */}
      <div className="json-tabs">
        <button
          className={`tab-button ${activeTab === 'viewer' ? 'active' : ''}`}
          onClick={() => setActiveTab('viewer')}
        >
          Viewer & Editor
        </button>
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          Comparison
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className={`error-message ${error.includes('copied') ? 'success' : 'error'}`}>
          {error}
        </div>
      )}

      {/* Viewer Tab */}
      {activeTab === 'viewer' && (
        <div className="json-viewer-tab">
          <JsonInput value={jsonString} onChange={handleJsonInput} />

          <JsonActions
            onBeautify={handleBeautify}
            onMinify={handleMinify}
            onDownload={handleDownload}
            onCopy={handleCopy}
            hasData={jsonData !== null}
          />

          {jsonData && (
            <div className="tree-container">
              <h3>JSON Tree View</h3>
              <TreeView data={jsonData} />
            </div>
          )}
        </div>
      )}

      {/* Comparison Tab */}
      {activeTab === 'comparison' && (
        <JsonComparison
          json1={comparisonData.json1}
          json2={comparisonData.json2}
          onJson1Change={(val) => handleComparisonChange(1, val)}
          onJson2Change={(val) => handleComparisonChange(2, val)}
        />
      )}
    </div>
  );
};

export default JSONTool;
