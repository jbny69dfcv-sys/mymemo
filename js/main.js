// --- 模擬データベース（ローカルストレージ用初期データ） ---
let posts = JSON.parse(localStorage.getItem("posts")) || [
    {
        id: "post1",
        account: "user1",
        text: "ぬん",
        likes: 0,
        comments: [
            { account: "user2", text: "かわいい！", time: Date.now() - 60000 },
            { account: "user3", text: "おもしろいね", time: Date.now() - 30000 }
        ],
        time: Date.now() - 3600000
    }
];

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
let currentAccount = "user1";
let currentDetailPost = null;

// プロフィールデータ
const profiles = {
    user1: { name: "マイネーム", id: "my_id", icon: "https://via.placeholder.com/40" },
    user2: { name: "ゲストA", id: "guest_a", icon: "https://via.placeholder.com/40" },
    user3: { name: "ゲストB", id: "guest_b", icon: "https://via.placeholder.com/40" }
};

// DOM要素の取得
const timelinePage = document.getElementById("timelinePage");
const postDetailPage = document.getElementById("postDetailPage");
const detailPostArea = document.getElementById("detailPostArea");
const detailComments = document.getElementById("detailComments");
const backFromDetailButton = document.getElementById("backFromDetailButton");
const commentInput = document.getElementById("commentInput");
const sendCommentButton = document.getElementById("sendCommentButton");
const searchHistoryContainer = document.getElementById("searchHistoryContainer");

// データの保存
function saveToDB() {
    localStorage.setItem("posts", JSON.stringify(posts));
}
function saveSearchHistory() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// 時間のフォーマット
function formatTime(timestamp) {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return "今すぐ";
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}分前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}時間前`;
    return new Date(timestamp).toLocaleDateString();
}

// --- 🔎 検索履歴の追加と描画（20件保存・5件分表示スクロール） ---
function addSearchQuery(query) {
    if (!query.trim()) return;
    // 重複を削除して先頭に追加
    searchHistory = searchHistory.filter(h => h !== query);
    searchHistory.unshift(query);
    
    // 【仕様】最大20件まで保存
    if (searchHistory.length > 20) {
        searchHistory.pop();
    }
    saveSearchHistory();
    renderSearchHistory();
}

function renderSearchHistory() {
    if (!searchHistoryContainer) return;
    searchHistoryContainer.innerHTML = "";

    searchHistory.forEach((query) => {
        const item = document.createElement("div");
        item.className = "search-history-item";
        item.innerHTML = `
            <span class="history-text" style="cursor:pointer;">🕒 ${query}</span>
            <button class="delete-history-btn" style="background:none; border:none; cursor:pointer;">✕</button>
        `;

        // 履歴をクリックして再検索
        item.querySelector(".history-text").addEventListener("click", () => {
            alert(`${query} で検索します`);
        });

        // 履歴を個別削除
        item.querySelector(".delete-history-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            searchHistory = searchHistory.filter(h => h !== query);
            saveSearchHistory();
            renderSearchHistory();
        });

        searchHistoryContainer.appendChild(item);
    });
}

// --- タイムラインの描画 ---
function renderTimeline() {
    if (!timelinePage) return;
    timelinePage.innerHTML = "";

    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "post";
        
        postCard.innerHTML = `
            <div style="font-weight:bold;">${profiles[post.account]?.name || post.account}</div>
            <div style="margin: 8px 0;">${post.text}</div>
            <div class="post-footer">
                <button class="action-btn like-btn">💟 ${post.likes}</button>
                <button class="action-btn comment-btn">💬 ${post.comments.length}</button>
            </div>
        `;

        // いいねボタン
        postCard.querySelector(".like-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            post.likes++;
            saveToDB();
            renderTimeline();
        });

        // 💬 コメントマークを押したら詳細画面を開く
        postCard.querySelector(".comment-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            openPostDetail(post);
        });

        timelinePage.appendChild(postCard);
    });
}

// --- 💬 詳細画面を開く処理 ---
function openPostDetail(post) {
    currentDetailPost = post;
    
    // ページ全体を「flex」にして最前面に表示する
    postDetailPage.style.display = "flex";

    // 詳細画面内の投稿本体をセット
    detailPostArea.innerHTML = `
        <div class="post" style="border:none; box-shadow:none;">
            <div style="font-weight:bold;">${profiles[post.account]?.name || post.account}</div>
            <div style="margin: 12px 0; font-size: 18px;">${post.text}</div>
            <div style="color:#657786; font-size:12px;">${formatTime(post.time)}</div>
        </div>
    `;

    // コメント一覧を描画
    renderDetailComments();
}

// --- 💬 詳細画面のコメント一覧を描画 ---
function renderDetailComments() {
    if (!detailComments || !currentDetailPost) return;
    detailComments.innerHTML = "";

    const commentBox = document.createElement("div");
    commentBox.className = "post-comments";

    currentDetailPost.comments.forEach((comment) => {
        const div = document.createElement("div");
        div.className = "post-comment";
        div.innerHTML = `
            <div style="font-weight:bold;">${profiles[comment.account]?.name || comment.account}:</div>
            <div>${comment.text}</div>
        `;
        commentBox.appendChild(div);
    });

    detailComments.appendChild(commentBox);
}

// --- 💬 コメント送信処理 ---
if (sendCommentButton) {
    sendCommentButton.addEventListener("click", () => {
        const text = commentInput.value.trim();
        if (!text || !currentDetailPost) return;

        // コメントデータを追加
        currentDetailPost.comments.push({
            account: currentAccount,
            text: text,
            time: Date.now()
        });

        saveToDB();
        commentInput.value = "";
        renderDetailComments(); // コメント欄を再描画
        renderTimeline();       // タイムラインのコメント件数カウントを更新
    });
}

// --- 🔙 詳細画面から戻る処理 ---
if (backFromDetailButton) {
    backFromDetailButton.addEventListener("click", () => {
        // 詳細画面を完全に非表示（none）にする
        postDetailPage.style.display = "none";
        currentDetailPost = null;
    });
}

// --- 🚀 初期起動時の処理 ---
document.addEventListener("DOMContentLoaded", () => {
    renderTimeline();
    renderSearchHistory();

    // テスト用に検索履歴にダミーを10件追加してスクロールを確認できるようにする（不要なら消してOK）
    if (searchHistory.length === 0) {
        for(let i=1; i<=10; i++) { searchHistory.push(`テスト検索履歴 ${i}`); }
        saveSearchHistory();
        renderSearchHistory();
    }
});