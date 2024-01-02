// src/components/Tooltip.tsx
// import React from 'react';

interface TooltipProps{
    selectedText:string,
    url:string
}

export default function Tooltip({ selectedText, url }: TooltipProps) {
    console.log("TooltTip: ", selectedText);
    console.log("TooltTip URL: ", url);
    const handleCopy = () => {
        // Logic to copy the selected text and URL
        // You can use the Clipboard API or document.execCommand('copy') here
    };

    const handleSave = () => {
        // Logic to save the selected text and URL
    };

    return (
        <div className="tooltip">
            <div>{selectedText}</div>
            <div>{url}</div>
            <button onClick={handleCopy}>Copy</button>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

// export default Tooltip({ selectedText, url }: TooltipProps);
