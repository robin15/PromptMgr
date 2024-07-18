document.addEventListener("DOMContentLoaded", function() {
    const menuItemsList = document.getElementById("menuItemsList");
  
    // ストレージからカスタムメニュー項目を読み込む
    chrome.storage.sync.get("customMenuItems", (data) => {
      const customMenuItems = data.customMenuItems || [];
      customMenuItems.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.title;
        menuItemsList.appendChild(option);
      });
    });
  
    document.getElementById("removeTextForm").addEventListener("submit", function(event) {
      event.preventDefault();
  
      const selectedId = menuItemsList.value;
  
      // ストレージから選択された項目を削除
      chrome.storage.sync.get("customMenuItems", (data) => {
        let customMenuItems = data.customMenuItems || [];
        customMenuItems = customMenuItems.filter(item => item.id !== selectedId);
        chrome.storage.sync.set({ customMenuItems }, () => {
          // コンテキストメニューから項目を削除
          chrome.contextMenus.remove(selectedId, () => {
            window.close(); // ポップアップを閉じる
          });
        });
      });
    });
  });
  