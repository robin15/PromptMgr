chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

function createContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "addText",
      title: "テンプレート追加",
      contexts: ["all"]
    });

    chrome.contextMenus.create({
      id: "removeText",
      title: "テンプレート削除",
      contexts: ["all"]
    });

    chrome.contextMenus.create({
      id: "separator-1",
      type: "separator",
      contexts: ["editable"]
    });

    chrome.storage.sync.get("customMenuItems", (data) => {
      const customMenuItems = data.customMenuItems || [];
      customMenuItems.forEach(item => {
        chrome.contextMenus.create({
          id: item.id,
          title: item.title,
          contexts: ["editable"]
        });
      });
    });
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addText") {
    chrome.windows.create({
      url: chrome.runtime.getURL("add.html"),
      type: "popup",
      width: 400,
      height: 380
    });
    return;
  }

  if (info.menuItemId === "removeText") {
    chrome.windows.create({
      url: chrome.runtime.getURL("remove.html"),
      type: "popup",
      width: 400,
      height: 300
    });
    return;
  }

  chrome.storage.sync.get("customMenuItems", (data) => {
    const item = data.customMenuItems.find(item => item.id === info.menuItemId);
    if (item) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: insertTextIntoFocusedElement,
        args: [item.content]
      }).catch((error) => {
        console.error("Script execution failed: ", error);
        chrome.tabs.sendMessage(tab.id, { action: "insertText", text: item.content });
      });
    }
  });
});

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
  } else if (request.action === "createContextMenu") {
    createContextMenu();
    sendResponse({ status: "success" });
  }
});
