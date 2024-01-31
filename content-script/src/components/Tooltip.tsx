// src/components/Tooltip.tsx
// import React from 'react';
 // for default Tippy styles


interface TooltipProps{
    selectedText:string,
    url:string
}

export default function Tooltip({ selectedText, url }: TooltipProps) {
    // console.log("TooltTip: ", selectedText);
    // console.log("TooltTip URL: ", url);
    const handleCopy = async () => {
        console.log("TooltTip Copy: ", selectedText);
        console.log("TooltTip URL: ", url);
        // Retrieve existing data from storage
        // chrome.storage.local.get({ snipPiece_User_Text: [] }, function (result) {
        //     // Get the existing array or create a new one if it doesn't exist
        //     console.log("Get Result from ToolTip: ", result.snipPiece_User_Text);
        //     const dataArray = result.snipPiece_User_Text;

        //     // Add the new key-value pair to the array
        //     dataArray.push({ "selectedText":selectedText, "selectedTextUrl":url });

        //     // Save the updated array back to storage
        //     chrome.storage.local.set({ snipPiece_User_Text: dataArray }, function () {
        //         console.log('Data saved successfully');
        //     });
        // });
        // Logic to copy the selected text and URL
        // You can use the Clipboard API or document.execCommand('copy') here
        
        

        await chrome.storage.local.get('userAuthExtension', function (result) {
            console.log("Show userAuthExtension --> ", result.userAuthExtension);
          
            fetch('http://localhost:3100/textsnip/saveTextSnip', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + result.userAuthExtension.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usersID: result.userAuthExtension.userID, text: selectedText, url: url })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
        });
        chrome.runtime.sendMessage({ type: 'save-to-server' });
        

    };

    const handleSave = () => {
        // Logic to save the selected text and URL
    };

    return (
        <div className="snippiece_bubble_tooltip">
            {/* <span >{selectedText}</span> */}
            <button className="snippiece_bubble_copyButton" onClick={handleCopy}>
                Copy to snippiece
            </button>
        </div>
        
    );
}

// export default Tooltip({ selectedText, url }: TooltipProps);
