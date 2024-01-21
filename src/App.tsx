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
  selectedText: string;
  selectedTextUrl: string;
};

function App() {

  const [snippieceUserTextItems, setSnippieceUserTextItems] = useState<SnippieceTextStructure[]>([]);
  

  useEffect(() => {
    function handleChanges(changes:any, areaName:string) {
      if (areaName === 'local' && changes.snipPiece_User_Text) {
        // const savedData = changes.snipPiece_User_Text.newValue;
        // savedData.forEach((item: any) => console.log("Item --> ", item));
        setSnippieceUserTextItems(changes.snipPiece_User_Text.newValue);
      }
    }

    chrome.storage.onChanged.addListener(handleChanges);

    chrome.storage.local.get({ snipPiece_User_Text: [] }, function (result) {
      // const savedData = result.snipPiece_User_Text;
      // savedData.forEach((item: any) => console.log("Item --> ", item));
      console.log("Show List --> ", result.snipPiece_User_Text);
      setSnippieceUserTextItems(result.snipPiece_User_Text);
    });

    

    return () => {
      chrome.storage.onChanged.removeListener(handleChanges);
    };
  }, []);

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

  const handleCopyText = (selectedText:string, acc_ItemKey:any) => {
    console.log("Handling Copy Text");
    // toggle(acc_ItemKey);
  }

  const handleOpenTextSource = (selectedTextUrl:string, acc_ItemKey: any) => {
    console.log("Handling Open Text Source");
    // toggle(acc_ItemKey);
    window.open(selectedTextUrl, "_blank");
  }

  const onClickLogin = async () => {
    console.log("Handling Login Click");
    // window.open('http://localhost:3000/auth/login', '_blank');
    // toggle(acc_ItemKey);
    chrome.runtime.sendMessage({ type: 'login' });
  }

  return (
    <div className="bg-393E46 snippiece_popup_contianer_main">
      <div className="snippiece_popup_header_main">
        <div className="snippiece_popup_header_content">
          <p className="p-16 text-EEEEEE"><span className="text-00ADB5 bold">Snippiece</span> for Chrome</p>
        </div>
      </div>
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
            style={{ height: 'calc(350px - 75px)' }}>
            {snippieceUserTextItems.length <= 0 ?
              <div className="snippiece_popup_empty_main">
                <p className="snippiece_popup_empty text-EEEEEE">No Snippiece Found</p>
              </div> :
          <ControlledAccordion
            providerValue={providerValue}
            className="snippiece_popup_accordion_main"
          >
              {snippieceUserTextItems.map(({ selectedText, selectedTextUrl }:SnippieceTextStructure, i) => (
              <AccordionItem  
                itemKey={i}
              header={
                <div className="d-flex align-items-center justify-content-between text-EEEEEE">
                  <p className="text-EEEEEE">{truncateText(selectedText, 28)}</p>
                  <div className="icons">
                    
                    <CopyToClipboard text={selectedText}>
                      <div style={{ marginRight: 12 }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-copy text-EEEEEE" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                        </svg>
                      </div>
                    </CopyToClipboard>
                    <div onClick={() => handleOpenTextSource(selectedTextUrl, i)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link-45deg text-EEEEEE" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                      </svg>
                    </div>
                  </div>
                </div>
              } key={i} className="snippiece_popup_accordion_item">
                  {selectedText}
              </AccordionItem>
            ))}
          </ControlledAccordion>
            }
          </Scrollbars>
          
        </div>
      </div>
      <div className="snippiece_popup_footer_main">
        <div className="snippiece_popup_footer">
          <div className="snippiece_popup_user_current_plans">
            <p className="text-EEEEEE p-16">Plan:- <span className="text-00ADB5 bold">Free</span></p>
          </div>
          <div className="snippiece_popup_user_auth">
            <button className="snippiece-btn-no-style text-EEEEEE" onClick={onClickLogin}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
