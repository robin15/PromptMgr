document.getElementById("addTextForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const summary = document.getElementById("newMenuItemSummary").value;
    const content = document.getElementById("newMenuItemContent").value;
    const id = `custom_${Date.now()}`;
    
    // ストレージにカスタムメニュー項目を保存
    chrome.storage.sync.get("customMenuItems", (data) => {
      const customMenuItems = data.customMenuItems || [];
      customMenuItems.push({ id, title: summary, content: content });
      chrome.storage.sync.set({ customMenuItems }, () => {
        // コンテキストメニューに項目を追加
        chrome.contextMenus.create({
          id,
          title: summary,
          contexts: ["editable"]
        });
        window.close(); // ポップアップを閉じる
      });
    });
  });
  