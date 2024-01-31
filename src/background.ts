   // src/background.ts
   export {};
//    chrome.cookies.get({ url: 'http://localhost:3000', name: 'session' }, (cookie) => {
//      if (cookie) {
//        const sessionCookie = cookie.value;
//        console.log("Session From extension --> ",sessionCookie);
//        // Now you can use the sessionCookie to make authenticated requests
//      }
//    });

//    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//      if (request.action === 'getCookie') {
//        chrome.cookies.get({ url: 'http://localhost:3000', name: 'session' }, (cookie) => {
//          sendResponse({ cookie: cookie!.value });
//        });
//        return true; // Keep the message channel open for the response
//      }
//    });
// chrome.runtime.onMessage.addListener(async (request: any) => {
//     if (request.type === 'login') {
//         console.log("Login Requested");
//         return true;
//     }
// });

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.token && request.UserID)
    //   openUrl(request.openUrlInEditor);
    console.log("Message from Admin Token--> ", request.token);
    console.log("Message from Admin UserID--> ", request.userID);
    chrome.storage.local.set({ userAuthExtension: {token:request.token, userID:request.userID} }, function () {
                console.log('User Auth saved successfully');  
                chrome.runtime.sendMessage({ type: 'load-data-from-server' });             
    });
  });

  chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.type === 'logout'){
     chrome.storage.local.clear(function () {
    console.log('Local storage cleared');
  });
  }
  });
