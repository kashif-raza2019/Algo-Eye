import React, { useEffect, useRef } from 'react';
import './AlgorithmCanvas.css';

const AlgorithmCanvas = ({ dataSet, algorithmType, animationState }) => {
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !dataSet || dataSet.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const draw = () => {
            // Use the current array from animation state, or fall back to dataSet
            const currentArray = animationState?.array || dataSet;
            
            const maxValue = Math.max(...currentArray);
            const minHeight = 20;
            const maxHeight = 200;
            const barWidth = canvas.width / currentArray.length;

            // Clear canvas with background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid lines
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 10; i++) {
                const y = 40 + (i * (maxHeight / 10));
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw bars with smooth rendering
            currentArray.forEach((value, index) => {
                const heightPercent = (value / maxValue) * 100;
                const barHeight = (heightPercent / 100) * maxHeight + minHeight;
                const xPos = index * barWidth;
                const yPos = canvas.height - barHeight - 10;

                // Determine bar color based on animation state
                let barColor = '#3b82f6'; // Default blue
                let strokeColor = '#1e40af';

                if (animationState?.sorted?.includes(index)) {
                    barColor = '#10b981'; // Green - sorted
                    strokeColor = '#047857';
                } else if (animationState?.swapping?.includes(index)) {
                    barColor = '#ef4444'; // Red - swapping (animated)
                    strokeColor = '#dc2626';
                } else if (animationState?.comparing?.includes(index)) {
                    barColor = '#f59e0b'; // Orange - comparing
                    strokeColor = '#d97706';
                } else if (animationState?.searching?.includes(index)) {
                    barColor = '#8b5cf6'; // Purple - searching
                    strokeColor = '#7c3aed';
                } else if (Array.isArray(animationState?.found) && animationState.found.includes(index)) {
                    barColor = '#10b981'; // Green - found
                    strokeColor = '#047857';
                } else if (Array.isArray(animationState?.notFound) && animationState.notFound.includes(index)) {
                    barColor = '#ef4444'; // Red - not found
                    strokeColor = '#dc2626';
                }

                // Draw bar with gradient for visual appeal
                const gradient = ctx.createLinearGradient(
                    xPos, yPos,
                    xPos, canvas.height
                );
                gradient.addColorStop(0, barColor);
                gradient.addColorStop(1, adjustBrightness(barColor, -20));

                ctx.fillStyle = gradient;
                ctx.fillRect(xPos + 1, yPos, barWidth - 2, barHeight);

                // Add shadow for depth
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(xPos + 1, canvas.height - 5, barWidth - 2, 5);

                // Bar border with thickness based on state
                const isActive = animationState?.comparing?.includes(index) || 
                                animationState?.swapping?.includes(index);
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = isActive ? 3 : 2;
                ctx.strokeRect(xPos + 1, yPos, barWidth - 2, barHeight);

                // Draw value on top of bar (for smaller datasets)
                if (currentArray.length <= 30) {
                    ctx.fillStyle = '#374151';
                    ctx.font = 'bold 11px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText(value, xPos + barWidth / 2, yPos - 5);
                }
            });

            // Draw title
            ctx.fillStyle = '#6b7280';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('Array Index', canvas.width / 2, canvas.height - 5);
        };

        draw();
        animationFrameRef.current = requestAnimationFrame(draw);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [dataSet, animationState]);

    return (
        <div className="algorithm-canvas-container">
            <div className="canvas-header">
                <div className="header-info">
                    <h2>{algorithmType}</h2>
                    <div className="stats">
                        <span className="stat-item">
                            <span className="stat-label">Comparisons:</span>
                            <span className="stat-value">{animationState?.comparisons || 0}</span>
                        </span>
                        <span className="stat-item">
                            <span className="stat-label">Swaps:</span>
                            <span className="stat-value">{animationState?.swaps || 0}</span>
                        </span>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="canvas" width={1000} height={350} />
            <div className="canvas-legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span>Unsorted</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
                    <span>Comparing</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                    <span>Swapping/Not Found</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
                    <span>Searching</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                    <span>Sorted/Found</span>
                </div>
            </div>
        </div>
    );
};

// Helper function to adjust brightness of colors
function adjustBrightness(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export default AlgorithmCanvas;