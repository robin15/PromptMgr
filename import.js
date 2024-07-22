document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const importButton = document.getElementById('importButton');

  if (fileInput && importButton) {
    importButton.addEventListener('click', () => {
      if (fileInput.files.length === 0) {
        alert("CSVファイルを選択してください。");
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== "");
        const newItems = lines.map((line, index) => {
          const [title, content] = line.split(',');
          return { id: `custom_${Date.now()}_${index}`, title: title.trim(), content: content.trim() };
        });

        chrome.storage.sync.get("customMenuItems", (data) => {
          const currentItems = data.customMenuItems || [];
          const updatedItems = currentItems.concat(newItems);
          chrome.storage.sync.set({ customMenuItems: updatedItems }, () => {
            chrome.runtime.sendMessage({ action: "createContextMenu" }, (response) => {
              if (chrome.runtime.lastError) {
                console.error("Runtime error:", chrome.runtime.lastError);
                alert("エラーが発生しました。もう一度お試しください。");
              } else {
                alert("テンプレートがインポートされました！");
                window.close();
              }
            });
          });
        });
      };
      reader.readAsText(file);
    });
  } else {
    console.error('Elements not found');
  }
});
