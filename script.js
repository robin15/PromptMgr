//メニューを登録するコード
chrome.runtime.onInstalled.addListener(function(){
    chrome.contextMenus.create({
        id: "root",
        title: "拡張メニュー",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "wikipedia",
        title: "Wikipediaで開くaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter",
        title: "Twitterで検索する",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter2",
        title: "Twitterで検索する2",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter3",
        title: "Twitterで検索する3",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter4",
        title: "Twitterで検索する4",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter5",
        title: "Twitterで検索する5",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter6",
        title: "Twitterで検索する6",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter7",
        title: "Twitterで検索する7",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter8",
        title: "Twitterで検索する8",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter9",
        title: "Twitterで検索する9",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter10",
        title: "Twitterで検索する10",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter11",
        title: "Twitterで検索する11",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter12",
        title: "Twitterで検索する12",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter13",
        title: "Twitterで検索する13",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter14",
        title: "Twitterで検索する14",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter15",
        title: "Twitterで検索する15",
        contexts: ["all"],
        type: "normal",
    })

    chrome.contextMenus.create({
        parentId: "root",
        id: "twitter",
        title: "Twitterで検索する16",
        contexts: ["all"],
        type: "normal",
    })
})


//メニューがクリックされた時のコード
chrome.contextMenus.onClicked.addListener(function(event) {
    if(event.menuItemId === "wikipedia"){
        const url = "https://ja.wikipedia.org/wiki/" + event.selectionText
        chrome.tabs.create({url})
    }
    else if(event.menuItemId === "twitter"){
        const url = "https://twitter.com/search?f=realtime&src=typd&q=" + event.selectionText + "%20lang%3Aja"
        chrome.tabs.create({url})
    }
})
