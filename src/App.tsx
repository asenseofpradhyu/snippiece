/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import {
  ControlledAccordion,
  AccordionItem,
  useAccordionProvider } from '@szhsin/react-accordion';
import { Scrollbars } from 'react-custom-scrollbars-2';
import "./App.css";
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


interface SnippieceTextStructure {
  id:string;
  text: string;
  url: string;
};

function App() {

  const [snippieceUserTextItems, setSnippieceUserTextItems] = useState<SnippieceTextStructure[]>([]);
  

  useEffect(() => {
 
    console.log("123");
      chrome.runtime.onMessage.addListener(async (request: any) => {
        
        if (request.type === 'save-to-server' || request.type === 'load-data-from-server') {
          console.log("Saved Requested");

          fetchAPI();
        } else {
          setSnippieceUserTextItems([]);
        }
      });

  }, []);

  useEffect(() => {
    fetchAPI();
  }, [])
  

const fetchAPI = () => {
  chrome.storage.local.get('userAuthExtension', function (result) {
    console.log("Show userAuthExtension --> ", result.userAuthExtension);

if(result.userAuthExtension){

  fetch(`http://localhost:3100/textsnip/fetchAllTextSnip/${result.userAuthExtension.userID}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + result.userAuthExtension.token,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.data);
      setSnippieceUserTextItems(data.data)
    })
    .catch(error => console.error(error));

} else {
  setSnippieceUserTextItems([]);
}

    
  });
}

  console.log("State ->> ", snippieceUserTextItems);
  const providerValue = useAccordionProvider({
    allowMultiple: false,
    transition: true,
    transitionTimeout: 250,
  });
  // Destructuring `toggle` and `toggleAll` from `providerValue`
  const { toggle, toggleAll } = providerValue;

  function truncateText(text:string, maxLength:number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const onClickPlan = () => {
    console.log("Handling Plan Text");
    
    chrome.storage.local.get('userAuthExtension', function (result) {
      console.log("Show List --> ", result.userAuthExtension);
    });

  }

  const handleOpenTextSource = (selectedTextUrl:string, acc_ItemKey: any) => {
    console.log("Handling Open Text Source");
    // toggle(acc_ItemKey);
    window.open(selectedTextUrl, "_blank");
  }

  const onClickLogin = async () => {
    console.log("Handling Login Click");
    window.open('http://localhost:3000/auth/login', '_blank');
    // toggle(acc_ItemKey);
    // chrome.runtime.sendMessage({ type: 'login' });
    // chrome.runtime.onMessage.addListener(async (request: any) => {
    //     if (request.type === 'saved') {
    //         console.log("Saved Requested");
    //         return true;
    //     }
    // });
  }

  return (
    <div className="bg-222222 snippiece_popup_contianer_main">
      <div className="snippiece_popup_header_main">
        <div className="snippiece_popup_header_content">
          <p className="p-16 text-white"><span className="text-white bold">Snippiece</span> for Chrome</p>
        </div>
      </div>
      <hr/>
      <div className="snippiece_popup_section_main">
        <div className="snippiece_popup_section_main_content">
          {/* <ul className="snippiece_popup_snip_lists">
            <li className="snippiece_popup_snip_list_items">
              <div className="snippiece_popup_snip_content">
                <div className="snippiece_popup_snip_text"><p>Hello this is copied Text</p></div>
                <div className="snippiece_popup_snip_actions">
                  <button className="snippiece-btn-no-style">Copy</button>
                  <button className="snippiece-btn-no-style">Link</button>
                </div>
              </div>
            </li>
          </ul> */}
          
          
          <Scrollbars
            style={{ height: '365px' }}>
            {snippieceUserTextItems.length <= 0 ?
              <div className="snippiece_popup_empty_main">
                <p className="snippiece_popup_empty text-error">Sign in to access your snippiece</p>
              </div> :
          <ControlledAccordion
            providerValue={providerValue}
            className="snippiece_popup_accordion_main"
          >
              {snippieceUserTextItems.map(({ text, url }:SnippieceTextStructure, i) => (
              <AccordionItem  
                itemKey={i}
              header={
                <div className="d-flex align-items-center justify-content-between text-white">
                  <p className="text-white">{truncateText(text, 28)}</p>
                  <div className="icons">
                    
                    <CopyToClipboard text={text}>
                      <div style={{ marginRight: 12 }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-copy text-white" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                        </svg>
                      </div>
                    </CopyToClipboard>
                    <div onClick={() => handleOpenTextSource(url, i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link-45deg text-white" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                      </svg>
                    </div>
                  </div>
                </div>
              } key={i} className="snippiece_popup_accordion_item">
                  {text}
              </AccordionItem>
            ))}
          </ControlledAccordion>
            }
          </Scrollbars>
          
        </div>
      </div>
      <hr />
      <div className="snippiece_popup_footer_main">
        <div className="snippiece_popup_footer">
          <div className="snippiece_popup_user_current_plans">
            {/* <p className="text-EEEEEE p-16" onClick={onClickPlan}>Plan:- <span className="text-00ADB5 bold">Free</span></p> */}
            <button className="snippiece-btn-no-style text-white cursor-pointer" onClick={onClickPlan}>Plan</button>
          </div>
          <div className="snippiece_popup_user_auth">
            <button className="snippiece-btn-no-style text-white cursor-pointer" onClick={onClickLogin}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
