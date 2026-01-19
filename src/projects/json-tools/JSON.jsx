/**
 * JSON Tools Project Component
 * ================================================
 * This Project takes input in JSON format, creates a visual tree structure with
 * collapsible nodes, and provides options to download the JSON data.
 * It also gives options to beautify or minify the JSON data.
 * And also provides a comparison feature to compare two JSON data side by side.
 * 
 * Features:
 * - Visual tree structure with collapsible nodes
 * - Beautify JSON (format with indentation)
 * - Minify JSON (remove whitespace)
 * - Download JSON as file
 * - Copy JSON to clipboard
 * - Compare two JSON objects side by side
 * - Detailed difference reporting
 * 
 * @component
 * @returns {JSX.Element} The JSON Tools application
 */

import React from 'react';
import { Link } from 'react-router';
import JSONTool from './JSONTool';
import './JSON.css';
import Footer from '../../section/Footer';

const JSON = () => {
    return (
        <div className="json-tools-container">
            <Link to="/" className="back-button" title="Back to Portfolio">
                ← Portfolio
            </Link>
            <h1>JSON Tools</h1>
            <JSONTool />
            <Footer />
        </div>
    );
};

export default JSON;