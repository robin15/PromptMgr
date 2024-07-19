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
  
      chrome.contextMenus.create({
        id: "fixedLabel",
        title: "テンプレート",
        contexts: ["all"],
        enabled: false
      });

      // 初期データを設定
      const initialMenuItems = [
        { id: `custom_1`, title: "文章品質向上", content: "あなたは、ビジネスコミュニケーションの専門家であり、様々な業界向けにプロフェッショナルな文章を作成する技術を持っています。次の指示に従って、ターゲット業界や目的に合わせて、原文を正式な報告書の形式に編集してください。あなたの編集により、文言は礼儀正しく、簡潔でわかりやすくなる必要があります。また、専門用語を適切に使用し、文脈に即した説得力のある構造を提供して、読者が提供された情報を効果的に理解できるようにしてください。\n\n#原文\n[文章を記載](必須)\n\nターゲット業界を指定してください:\n[ターゲット業界を記載](必須)\n\n文章作成の目的を指定してください:[文章作成の目的を記載](必須)" },
        { id: `custom_2`, title: "ピッチ提案", content: "＃命令\nあなたは優秀なプレゼンテーターです。\n以下の{テーマ}と{紹介したい内容}を基に、短時間で行うプレゼンテーション(ピッチ)を考え上げてください。\n\n＃条件\nそのままピッチ台本として用いれるように、説明などは省き、結果のみを出力してください。\nピッチを作成する際はPAS(Problem-Agitate-Solution)フォーミュラに基づいてください。\n\n＃テーマ\n[ピッチのテーマは何ですか](必須)\n\n＃紹介したい内容\n[紹介したい内容は何ですか](必須)\n\n＃備考\n[備考はありますか](任意)" },
        { id: `custom_3`, title: "課題解決アドバイザー", content: "＃命令\nあなたは課題解決を行う優秀なコンサルタントです。\nユーザーから渡された条件を基に、課題解決に向けてどのようなアプローチを行えばよいか考え、アドバイスを行って下さい。\n\n＃課題\n[現在の課題](必須)\n\n＃背景情報\n[課題に関する背景情報](必須)\n\n＃アドバイス\n\n＃アクション" }
      ];
  
      chrome.storage.sync.set({ customMenuItems: initialMenuItems }, () => {
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
        }).catch((error) => {
          console.error("Script execution failed: ", error);
          // フォールバック: コマンドを送信してテキストを挿入
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
  
  // メッセージリスナーを追加して、バックグラウンドからのメッセージを受信
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertText") {
      insertTextIntoFocusedElement(request.text);
    }
  });
