/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import Logo from "./Logo";
import "./App.css";
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './components/Tooltip';

function App() {

  const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
  let selection = window.getSelection();
  // chrome.storage.local.clear(function () {
  //   console.log('Local storage cleared');
  // });

  const handleSelection = (event: MouseEvent) => {
    // console.log("Div Called");
    // const selection = window.getSelection();

    if (selection && selection.toString().length > 0) {

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const clientRects = range.getClientRects();
      

      const tooltipContainer = document.createElement('div');
      const tooltipContainerMain = document.createElement('div');
      tooltipContainerMain.className ="snippiece_tooltip_container_main";
      tooltipContainerMain.appendChild(tooltipContainer);
      document.body.appendChild(tooltipContainerMain);

      const url = window.location.href;
      const selectedText = selection.toString();
      const tooltipWidth = tooltipContainer.offsetWidth;
      const tooltipHeight = tooltipContainer.offsetHeight;

      // Calculate the center position
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      


      // Position the tooltip based on the selection
      tooltipContainer.className = 'snippiece_tooltip_container';
      tooltipContainer.style.transform = `translate(${clientRects[0].x}px, ${clientRects[0].y}px)`;
      // tooltipContainer.style.position = 'absolute';

      // Adjust the tooltip position to be centered
      // tooltipContainer.style.left = `${centerX - tooltipWidth}px`;
      // tooltipContainer.style.top = `${centerY - tooltipHeight}px`;

      // tooltipContainer.style.top = (rect.top + window.scrollY - tooltipContainer.offsetHeight) - 20 + 'px';
      // tooltipContainer.style.left = rect.left + window.scrollX + rect.width / 2 - tooltipContainer.offsetWidth / 2 + 'px';

      // console.log("Top:- ", (rect.top + window.scrollY - tooltipContainer.offsetHeight) - 20 + 'px');
      // console.log("Left:- ", (rect.left + window.scrollX + rect.width / 2 - tooltipContainer.offsetWidth / 2) - 20 + 'px');

      ReactDOM.render(
        <Tooltip selectedText={selectedText} url={url} />,
        tooltipContainer
      );
      tooltipContainerRef.current = tooltipContainerMain;
   

      // Remove the tooltip after some time or when the user clicks outside
      // setTimeout(() => {
      //   ReactDOM.unmountComponentAtNode(tooltipContainer);
      //   tooltipContainer.remove();
      // }, 5000);
        
     
    } else if (tooltipContainerRef.current && !tooltipContainerRef.current.contains(event.target as Node)) {
      // If outside, remove the tooltip container
      ReactDOM.unmountComponentAtNode(tooltipContainerRef.current);
      tooltipContainerRef.current.remove();
      console.log("Click Outside");
    }
  };

  useEffect(() => {
  
   

    document.addEventListener('mouseup', handleSelection);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return null; // No need to render anything in the content script


  
  // return (
    // <></>
    // <div className="App">
    //   <header className="App-header">
    //     <Logo className="App-logo" id="App-logo" title="React logo" />
    //     <p>Hello, World!</p>
    //     <p>I'm a Chrome Extension Content Script!</p>
    //   </header>
    // </div>
  // );
  }

export default App;
