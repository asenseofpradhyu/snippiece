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
    if (request.token)
    //   openUrl(request.openUrlInEditor);
    console.log("Message from Admin --> ", request.token);
  });
