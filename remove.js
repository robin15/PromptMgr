document.addEventListener('DOMContentLoaded', () => {
  const templateList = document.getElementById('templateList');
  
  // テンプレートのリストを取得して表示
  chrome.storage.sync.get('customMenuItems', (data) => {
    const customMenuItems = data.customMenuItems || [];
    customMenuItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <label>
          <input type="checkbox" name="templatesToRemove" value="${item.id}">
          ${item.title}
        </label>
      `;
      templateList.appendChild(listItem);
    });
  });

  // フォームの送信処理
  document.getElementById('removeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const checkedBoxes = document.querySelectorAll('input[name="templatesToRemove"]:checked');
    const idsToRemove = Array.from(checkedBoxes).map(box => box.value);

    chrome.storage.sync.get('customMenuItems', (data) => {
      const customMenuItems = data.customMenuItems || [];
      const updatedMenuItems = customMenuItems.filter(item => !idsToRemove.includes(item.id));

      chrome.storage.sync.set({ customMenuItems: updatedMenuItems }, () => {
        // メニューを再作成
        chrome.runtime.sendMessage({ action: "createContextMenu" }, () => {
          window.close();
        });
      });
    });
  });
});
