function insertTextIntoFocusedElement(text) {
    const focusedElement = document.activeElement;
    if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
      focusedElement.value += text;
    } else if (document.execCommand) {
      document.execCommand('insertText', false, text);
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertText") {
      insertTextIntoFocusedElement(request.text);
    }
  });
  