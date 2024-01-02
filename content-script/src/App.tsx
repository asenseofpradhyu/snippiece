/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import Logo from "./Logo";
import "./App.css";
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './components/Tooltip';

function App() {

  const handleSelection = (event: MouseEvent) => {
    console.log("Div Called")
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const tooltipContainer = document.createElement('div');
      document.body.appendChild(tooltipContainer);

      const url = window.location.href;
      const selectedText = selection.toString();

      ReactDOM.render(
        <Tooltip selectedText={selectedText} url={url} />,
        tooltipContainer
      );

      // Position the tooltip based on the selection
      tooltipContainer.style.position = 'absolute';
      tooltipContainer.style.top = `${event.clientY}px`;
      tooltipContainer.style.left = `${event.clientX}px`;

      // Remove the tooltip after some time or when the user clicks outside
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(tooltipContainer);
        tooltipContainer.remove();
      }, 5000);

      // document.addEventListener('click', () => {
      //   ReactDOM.unmountComponentAtNode(tooltipContainer);
      //   tooltipContainer.remove();
      // });
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  // return null; // No need to render anything in the content script


  
  return (
    <></>
    // <div className="App">
    //   <header className="App-header">
    //     <Logo className="App-logo" id="App-logo" title="React logo" />
    //     <p>Hello, World!</p>
    //     <p>I'm a Chrome Extension Content Script!</p>
    //   </header>
    // </div>
  );
  }

export default App;
