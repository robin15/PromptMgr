chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {

      chrome.contextMenus.create({
        id: "addText",
        title: "追加",
        contexts: ["all"]
      });

      chrome.contextMenus.create({
        id: "removeText",
        title: "削除",
        contexts: ["editable"]
      });

      chrome.contextMenus.create({
        id: "separator-1",
        type: "separator",
        contexts: ["all"]
      });
  
      // 初期データを設定
      const initialMenuItems = [
        { id: `custom_1`, title: "Initial Item 1", content: "This is the content for item 1" },
        { id: `custom_2`, title: "Initial Item 2", content: "This is the content for item 2" },
        { id: `custom_3`, title: "Initial Item 3", content: "This is the content for item 3" }
      ];
  
      chrome.storage.sync.set({ customMenuItems: initialMenuItems }, () => {
        // 初期データからカスタムメニュー項目を作成
        initialMenuItems.forEach(item => {
          chrome.contextMenus.create({
            id: item.id,
            title: item.title,
            contexts: ["editable"]
          });
        });
      });
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addText") {
      // ポップアップを新しいウィンドウとして表示
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 400,
        height: 300
      });
      return;
    }
  
    if (info.menuItemId === "removeText") {
      // ポップアップを新しいウィンドウとして表示
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
        });
      }
    });
  });
  
  function insertTextIntoFocusedElement(text) {
    const focusedElement = document.activeElement;
    if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
      focusedElement.value += text;
    }
  }
  