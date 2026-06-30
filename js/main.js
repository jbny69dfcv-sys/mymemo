// ==========================================
// 1. データ管理と初期化
// ==========================================
let accounts = JSON.parse(localStorage.getItem("accounts")) || ["るか", "日常垢"];
let currentAccount = localStorage.getItem("currentAccount") || accounts[0];

let profiles = JSON.parse(localStorage.getItem("profiles")) || {
    "るか": { name: "るか", id: "ruka_art", bio: "イラストを描いています！", icon: "", header: "" },
    "日常垢": { name: "日常のつぶやき", id: "ruka_life", bio: "のんびり日常", icon: "", header: "" }
};

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// プロフィールの選択中タブ状態（デフォルトは 'posts'）
let profileMode = "posts"; 

// 拡大モーダル用変数
let cropper = null;
let currentCropTarget = null; // "icon" または "header"

// ==========================================
// 2. DOM要素の取得
// ==========================================
const accountsDiv = document.getElementById("accounts");
const timeline = document.getElementById("timeline");
const profilePage = document.getElementById("profilePage");
const profileContainer = document.getElementById("profileContainer");
const postDetailPage = document.getElementById("postDetailPage");
const searchPage = document.getElementById("searchPage");

// ボタン類
const postButton = document.getElementById("postButton");
const searchButton = document.getElementById("searchButton");
const backButton = document.getElementById("backButton");
const backFromDetailButton = document.getElementById("backFromDetailButton");
const backSearchButton = document.getElementById("backSearchButton");

// 投稿モーダル
const postModal = document.getElementById("postModal");
const closeModalButton = document.getElementById("closeModalButton");
const modalPostButton = document.getElementById("modalPostButton");
const modalPostInput = document.getElementById("modalPostInput");
const postImageUpload = document.getElementById("postImageUpload");
const postPreviewContainer = document.getElementById("postPreviewContainer");
const postImagePreview = document.getElementById("postImagePreview");
const removePostImageButton = document.getElementById("removePostImageButton");
const postUserIcon = document.getElementById("postUserIcon");

// プロフィール編集モーダル
const editProfileModal = document.getElementById("editProfileModal");
const cancelProfileButton = document.getElementById("cancelProfileButton");
const saveProfileButton = document.getElementById("saveProfileButton");
const editHeaderPreview = document.getElementById("editHeaderPreview");
const editIconPreview = document.getElementById("editIconPreview");
const editName = document.getElementById("editName");
const editId = document.getElementById("editId");
const editBio = document.getElementById("editBio");
const deleteAccountButton = document.getElementById("deleteAccountButton");
const iconUpload = document.getElementById("iconUpload");
const headerUpload = document.getElementById("headerUpload");

// 画像クロップモーダル
const cropModal = document.getElementById("cropModal");
const cropImage = document.getElementById("cropImage");
const cropConfirmButton = document.getElementById("cropConfirmButton");
const cropCancelButton = document.getElementById("cropCancelButton");

// 投稿詳細＆コメント
const detailPost = document.getElementById("detailPost");
const detailComments = document.getElementById("detailComments");
const detailCommentInput = document.getElementById("detailCommentInput");
const detailCommentButton = document.getElementById("detailCommentButton");
const commentImageUpload = document.getElementById("commentImageUpload");
const commentImagePreviewArea = document.getElementById("commentImagePreviewArea");
const commentImagePreview = document.getElementById("commentImagePreview");
const removeCommentImageButton = document.getElementById("removeCommentImageButton");

// 検索関連
const searchInput = document.getElementById("searchInput");
const searchHistoryDiv = document.getElementById("searchHistory");
const searchResultsDiv = document.getElementById("searchResults");

// 添付画像データの一時保持
let attachedPostImage = "";
let attachedCommentImage = "";

// ==========================================
// 3. アカウント・プロフィール表示の初期化（バグ修正版）
// ==========================================

// 各アカウント専用のプロフィール「ルーム（枠）」をあらかじめ生成する
function initializeProfileRooms() {
    if (!profileContainer) return;
    profileContainer.innerHTML = "";

    accounts.forEach((account) => {
        const room = document.createElement("div");
        room.className = "single-profile";
        room.dataset.account = account;

        // 4タブ構造をHTMLとして埋め込む
        room.innerHTML = `
            <div class="profile-header">
                <img class="header-image" src="">
                <button class="edit-header-button">⚙️</button>
            </div>
            <div class="profile-info">
                <img class="profile-icon" src="">
                <h2 id="profileName"></h2>
                <p id="profileId"></p>
                <p id="profileBio"></p>
                <div id="postCount"></div>
                <div class="profile-tabs">
                    <button class="profile-tab active" data-mode="posts">投稿</button>
                    <button class="profile-tab" data-mode="replies">返信</button>
                    <button class="profile-tab" data-mode="media">メディア</button>
                    <button class="profile-tab" data-mode="likes">スキ</button>
                </div>
            </div>
            <div class="timeline" id="profileTimeline"></div>
        `;

        // タブボタンのクリックイベントを設定（2重スライド対応）
        const tabs = room.querySelectorAll(".profile-tab");
        tabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                tabs.forEach(t => t.classList.remove("active"));
                e.target.classList.add("active");
                profileMode = e.target.dataset.mode;
                showProfile(); // 選択されたモードで再描画
            });
        });

        // ⚙️ボタンで編集モーダルを開く
        const editBtn = room.querySelector(".edit-header-button");
        if (editBtn) {
            editBtn.addEventListener("click", () => openEditProfileModal());
        }

        profileContainer.appendChild(room);
    });
}

// 現在選択されているアカウントに応じてデータを正しく流し込む
function showProfile() {
    const targetIndex = accounts.indexOf(currentAccount);
    const rooms = document.querySelectorAll(".single-profile");
    const currentRoom = rooms[targetIndex];
    
    if (!currentRoom) return;

    const profile = profiles[currentAccount] || {};
    const userPosts = posts.filter(post => post.account === currentAccount);

    // ルーム内の子要素をピンポイントで書き換え（グローバルIDバグの解消）
    const roomHeaderImage = currentRoom.querySelector(".header-image");
    const roomProfileIcon = currentRoom.querySelector(".profile-icon");
    const roomProfileName = currentRoom.querySelector("#profileName");
    const roomProfileId = currentRoom.querySelector("#profileId");
    const roomProfileBio = currentRoom.querySelector("#profileBio");
    const roomPostCount = currentRoom.querySelector("#postCount");
    const roomTimeline = currentRoom.querySelector("#profileTimeline");

    if (roomHeaderImage) roomHeaderImage.src = profile.header || "https://via.placeholder.com/600x150";
    if (roomProfileIcon) roomProfileIcon.src = profile.icon || "https://via.placeholder.com/60";
    if (roomProfileName) roomProfileName.textContent = profile.name || currentAccount;
    if (roomProfileId) roomProfileId.textContent = "@" + (profile.id || "userid");
    if (roomProfileBio) roomProfileBio.textContent = profile.bio || "プロフィール未設定";
    if (roomPostCount) roomPostCount.textContent = "投稿数 " + userPosts.length;

    // 4つのタブモードに応じたタイムライン絞り込み
    if (roomTimeline) {
        roomTimeline.innerHTML = ""; 
        let targetPosts = [];

        if (profileMode === "posts") {
            // 通常の投稿のみ
            targetPosts = userPosts;
        } else if (profileMode === "replies") {
            // 自分がコメント（返信）した元の投稿を抽出
            targetPosts = posts.filter(post => post.comments && post.comments.some(c => c.account === currentAccount));
        } else if (profileMode === "media") {
            // 画像が添付されている自分の投稿
            targetPosts = userPosts.filter(post => post.image && post.image.length > 0);
        } else if (profileMode === "likes") {
            // 自分が「スキ」した投稿
            targetPosts = posts.filter(post => post.likedBy && post.likedBy.includes(currentAccount));
        }

        // 固定ピンを最優先し、それ以外は新しい順にソート
        const sortedPosts = [...targetPosts].sort((a, b) => {
            if ((a.pinned || false) !== (b.pinned || false)) {
                return (b.pinned || false) - (a.pinned || false);
            }
            return b.time - a.time;
        });

        if (sortedPosts.length === 0) {
            roomTimeline.innerHTML = `<div class="no-posts" style="text-align:center; padding:20px; color:#aaa;">該当する投稿はありません</div>`;
        } else {
            sortedPosts.forEach(post => addPostToTimeline(post, roomTimeline));
        }
    }

    // 表示切り替え
    if (timeline) timeline.style.display = "none";
    if (profilePage) profilePage.style.display = "block";
    document.getElementById("timelineFloatingButtons").style.display = "none";

    // スライドアニメーションの適用
    if (profileContainer) {
        profileContainer.style.transform = `translateX(-${targetIndex * 100}%)`;
    }
}

// 上部アカウントリストのレンダリング
function renderAccounts() {
    if (!accountsDiv) return;
    accountsDiv.innerHTML = "";

    accounts.forEach((account) => {
        const profile = profiles[account] || {};
        const div = document.createElement("div");
        div.className = `account ${account === currentAccount ? "selected-account" : ""}`;

        const img = document.createElement("img");
        img.className = "account-icon";
        img.src = profile.icon || "https://via.placeholder.com/60";
        div.appendChild(img);

        div.addEventListener("click", (e) => {
            e.preventDefault();
            currentAccount = account;
            localStorage.setItem("currentAccount", currentAccount);
            renderAccounts();
            renderTimeline();

            // プロフィール画面が開いている場合は、データを更新してスライド
            if (profilePage && profilePage.style.display === "block") {
                showProfile();
            }
        });
        accountsDiv.appendChild(div);
    });

    // 新規アカウント作成ボタン
    const addDiv = document.createElement("div");
    addDiv.className = "account";
    addDiv.innerText = "＋";
    addDiv.addEventListener("click", () => {
        const name = prompt("新しいアカウント名を入力してください：");
        if (name && !accounts.includes(name)) {
            accounts.push(name);
            profiles[name] = { name: name, id: "user_" + Date.now(), bio: "", icon: "", header: "" };
            saveAllData();
            initializeProfileRooms();
            renderAccounts();
        }
    });
    accountsDiv.appendChild(addDiv);
}

// ==========================================
// 4. タイムライン描画処理
// ==========================================
function renderTimeline() {
    if (!timeline) return;
    timeline.innerHTML = "";

    // 全投稿を新着順にソート（タイムライン上ではピン固定は考慮しない、または好みで調整可能）
    const sortedPosts = [...posts].sort((a, b) => b.time - a.time);

    if (sortedPosts.length === 0) {
        timeline.innerHTML = '<div style="text-align:center; padding:50px; color:gray;">投稿がありません。最初の投稿をしてみましょう！</div>';
        return;
    }

    sortedPosts.forEach(post => addPostToTimeline(post, timeline));
}

function addPostToTimeline(post, container) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.dataset.id = post.id;

    const profile = profiles[post.account] || { name: post.account };
    const isMyPost = post.account === currentAccount;

    // 画像グリッドの生成クラス決定
    let imagesHtml = "";
    if (post.image && post.image.length > 0) {
        let gridClass = "one";
        if (post.image.length === 2) gridClass = "two";
        if (post.image.length === 3) gridClass = "three";
        if (post.image.length >= 4) gridClass = "four";

        imagesHtml = `<div class="post-images ${gridClass}">`;
        post.image.slice(0, 4).forEach(imgSrc => {
            imagesHtml += `<img src="${imgSrc}" class="viewable-media">`;
        });
        imagesHtml += `</div>`;
    }

    const isLiked = post.likedBy && post.likedBy.includes(currentAccount);
    const likeCount = post.likedBy ? post.likedBy.length : 0;
    const commentCount = post.comments ? post.comments.length : 0;

    postDiv.innerHTML = `
        <div class="post-header">
            <img class="post-icon" src="${profile.icon || 'https://via.placeholder.com/60'}" style="cursor:pointer;">
            <div class="post-user">
                <div><span style="font-weight:bold;">${profile.name}</span><span class="post-id">@${profile.id || 'id'}</span></div>
                <div class="post-time">${new Date(post.time).toLocaleString()}</div>
            </div>
            <div class="post-buttons">
                ${isMyPost ? `<button class="pin-button">${post.pinned ? "📌" : "📍"}</button>` : ""}
                ${isMyPost ? `<button class="delete-button">🗑️</button>` : ""}
            </div>
        </div>
        <div class="post-body" style="cursor:pointer;">
            <span class="post-text">${escapeHtml(post.text)}</span>
            ${imagesHtml}
            <div class="post-actions">
                <button class="like-button">${isLiked ? "❤️" : "🖤"} ${likeCount}</button>
                <button class="comment-button">💬 ${commentCount}</button>
            </div>
        </div>
    `;

    // イベントリスナーの登録
    const icon = postDiv.querySelector(".post-icon");
    icon.addEventListener("click", (e) => {
        e.stopPropagation();
        currentAccount = post.account;
        localStorage.setItem("currentAccount", currentAccount);
        renderAccounts();
        showProfile();
    });

    const body = postDiv.querySelector(".post-body");
    body.addEventListener("click", () => openPostDetail(post.id));

    // いいね処理
    const likeBtn = postDiv.querySelector(".like-button");
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLike(post.id);
    });

    // コメントボタン処理
    const commentBtn = postDiv.querySelector(".comment-button");
    commentBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openPostDetail(post.id);
    });

    // ピン留め処理
    if (isMyPost) {
        const pinBtn = postDiv.querySelector(".pin-button");
        pinBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            togglePin(post.id);
        });

        const deleteBtn = postDiv.querySelector(".delete-button");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm("この投稿を削除しますか？")) {
                posts = posts.filter(p => p.id !== post.id);
                saveAllData();
                renderTimeline();
                if (profilePage.style.display === "block") showProfile();
            }
        });
    }

    // 添付画像の拡大表示
    const imgs = postDiv.querySelectorAll(".viewable-media");
    imgs.forEach(img => {
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            openImageModal(img.src);
        });
    });

    container.appendChild(postDiv);
}

// ==========================================
// 5. 新規投稿モーダル処理
// ==========================================
postButton.addEventListener("click", () => {
    const profile = profiles[currentAccount] || {};
    postUserIcon.src = profile.icon || "https://via.placeholder.com/60";
    modalPostInput.value = "";
    attachedPostImage = "";
    postPreviewContainer.style.display = "none";
    postImageUpload.value = "";
    postModal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
    postModal.style.display = "none";
});

postImageUpload.addEventListener("change", (e) => {
    const files = e.target.files;
    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            attachedPostImage = event.target.result;
            postImagePreview.src = attachedPostImage;
            postPreviewContainer.style.display = "block";
        };
        reader.readAsDataURL(files[0]);
    }
});

removePostImageButton.addEventListener("click", () => {
    attachedPostImage = "";
    postImagePreview.src = "";
    postPreviewContainer.style.display = "none";
    postImageUpload.value = "";
});

modalPostButton.addEventListener("click", () => {
    const text = modalPostInput.value.trim();
    if (!text && !attachedPostImage) return;

    const newPost = {
        id: "post_" + Date.now(),
        account: currentAccount,
        text: text,
        image: attachedPostImage ? [attachedPostImage] : [],
        time: Date.now(),
        likedBy: [],
        comments: [],
        pinned: false
    };

    posts.push(newPost);
    saveAllData();
    postModal.style.display = "none";
    renderTimeline();
});

// ==========================================
// 6. 投稿詳細 ＆ コメント機能（画像添付対応版）
// ==========================================
let activeDetailPostId = null;

function openPostDetail(postId) {
    activeDetailPostId = postId;
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    timeline.style.display = "none";
    profilePage.style.display = "none";
    document.getElementById("timelineFloatingButtons").style.display = "none";
    postDetailPage.style.display = "block";

    // 詳細部分の描画
    detailPost.innerHTML = "";
    // タイムラインと同じ形式で1件表示
    addPostToTimeline(post, detailPost);
    
    // 詳細内のカードクリックによる無限ループを防ぐためイベント上書き
    const body = detailPost.querySelector(".post-body");
    if(body) {
        body.style.cursor = "default";
        const newBody = body.cloneNode(true);
        body.parentNode.replaceChild(newBody, body);
    }

    renderComments();
}

function renderComments() {
    detailComments.innerHTML = "";
    const post = posts.find(p => p.id === activeDetailPostId);
    if (!post || !post.comments) return;

    post.comments.forEach((comment, index) => {
        const cDiv = document.createElement("div");
        cDiv.className = "post-comment";
        const cProfile = profiles[comment.account] || { name: comment.account };

        let imgHtml = comment.image ? `<img src="${comment.image}" class="comment-image">` : "";

        cDiv.innerHTML = `
            <img class="comment-icon" src="${cProfile.icon || 'https://via.placeholder.com/60'}">
            <div class="comment-body">
                <div class="comment-header">
                    <div>
                        <span class="comment-name">${cProfile.name}</span>
                        <span class="comment-id">@${cProfile.id || 'id'}</span>
                        <span class="comment-time">${new Date(comment.time).toLocaleString()}</span>
                    </div>
                    ${comment.account === currentAccount ? `<button class="comment-delete-btn" data-index="${index}" style="border:none; background:none; cursor:pointer;">🗑️</button>` : ""}
                </div>
                <div class="comment-text">${escapeHtml(comment.text)}</div>
                ${imgHtml}
            </div>
        `;

        // コメント内画像の拡大
        const cImg = cDiv.querySelector(".comment-image");
        if(cImg) {
            cImg.addEventListener("click", () => openImageModal(cImg.src));
        }

        // コメント削除
        const delBtn = cDiv.querySelector(".comment-delete-btn");
        if(delBtn) {
            delBtn.addEventListener("click", () => {
                if(confirm("このコメントを削除しますか？")) {
                    post.comments.splice(index, 1);
                    saveAllData();
                    renderComments();
                    renderTimeline();
                }
            });
        }

        detailComments.appendChild(cDiv);
    });
}

// コメント用カメラボタンによる画像選択
commentImageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            attachedCommentImage = event.target.result;
            commentImagePreview.src = attachedCommentImage;
            commentImagePreviewArea.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// コメント用プレビュー画像の削除（✕ボタン）
removeCommentImageButton.addEventListener("click", () => {
    attachedCommentImage = "";
    commentImagePreview.src = "";
    commentImagePreviewArea.style.display = "none";
    commentImageUpload.value = "";
});

// コメント送信処理
detailCommentButton.addEventListener("click", () => {
    const text = detailCommentInput.value.trim();
    if (!text && !attachedCommentImage) return;

    const post = posts.find(p => p.id === activeDetailPostId);
    if (!post) return;

    if (!post.comments) post.comments = [];
    post.comments.push({
        account: currentAccount,
        text: text,
        image: attachedCommentImage || null,
        time: Date.now()
    });

    saveAllData();
    
    // 入力欄とプレビューの初期化
    detailCommentInput.value = "";
    attachedCommentImage = "";
    commentImagePreview.src = "";
    commentImagePreviewArea.style.display = "none";
    commentImageUpload.value = "";

    renderComments();
    renderTimeline(); // タイムラインのカウント数更新用
});

backFromDetailButton.addEventListener("click", () => {
    postDetailPage.style.display = "none";
    timeline.style.display = "block";
    document.getElementById("timelineFloatingButtons").style.display = "flex";
});

// ==========================================
// 7. プロフィール編集 ＆ クロップ（Cropper.js）
// ==========================================
function openEditProfileModal() {
    const profile = profiles[currentAccount] || {};
    editName.value = profile.name || currentAccount;
    editId.value = profile.id || "";
    editBio.value = profile.bio || "";
    editHeaderPreview.src = profile.header || "https://via.placeholder.com/600x150";
    editIconPreview.src = profile.icon || "https://via.placeholder.com/60";
    editProfileModal.style.display = "block";
}

cancelProfileButton.addEventListener("click", () => {
    editProfileModal.style.display = "none";
});

editIconPreview.addEventListener("click", () => {
    currentCropTarget = "icon";
    iconUpload.click();
});

editHeaderPreview.addEventListener("click", () => {
    currentCropTarget = "header";
    headerUpload.click();
});

[iconUpload, headerUpload].forEach(uploadEl => {
    uploadEl.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                cropImage.src = event.target.result;
                cropModal.style.display = "block";

                if (cropper) cropper.destroy();
                cropper = new Cropper(cropImage, {
                    aspectRatio: currentCropTarget === "icon" ? 1 : 4 / 1,
                    viewMode: 1
                });
            };
            reader.readAsDataURL(file);
        }
    });
});

cropConfirmButton.addEventListener("click", () => {
    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas({
        width: currentCropTarget === "icon" ? 200 : 800,
        height: currentCropTarget === "icon" ? 200 : 200
    });
    const dataUrl = canvas.toDataURL();

    if (currentCropTarget === "icon") {
        editIconPreview.src = dataUrl;
    } else {
        editHeaderPreview.src = dataUrl;
    }

    cropModal.style.display = "none";
    cropper.destroy();
    cropper = null;
});

cropCancelButton.addEventListener("click", () => {
    cropModal.style.display = "none";
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
});

saveProfileButton.addEventListener("click", () => {
    if (!profiles[currentAccount]) profiles[currentAccount] = {};
    
    profiles[currentAccount].name = editName.value.trim();
    profiles[currentAccount].id = editId.value.trim();
    profiles[currentAccount].bio = editBio.value.trim();
    profiles[currentAccount].icon = editIconPreview.src;
    profiles[currentAccount].header = editHeaderPreview.src;

    saveAllData();
    editProfileModal.style.display = "none";
    renderAccounts();
    showProfile();
    renderTimeline();
});

deleteAccountButton.addEventListener("click", () => {
    if (accounts.length <= 1) {
        alert("最後のアカウントは削除できません。");
        return;
    }
    if (confirm(`本当にアカウント「${currentAccount}」を削除しますか？関連する投稿データは残ります。`)) {
        accounts = accounts.filter(a => a !== currentAccount);
        delete profiles[currentAccount];
        currentAccount = accounts[0];
        
        saveAllData();
        editProfileModal.style.display = "none";
        initializeProfileRooms();
        renderAccounts();
        renderTimeline();
    }
});

// ==========================================
// 8. 検索機能
// ==========================================
searchButton.addEventListener("click", () => {
    timeline.style.display = "none";
    profilePage.style.display = "none";
    document.getElementById("timelineFloatingButtons").style.display = "none";
    searchPage.style.display = "block";
    renderSearchHistory();
});

backSearchButton.addEventListener("click", () => {
    searchPage.style.display = "none";
    timeline.style.display = "block";
    document.getElementById("timelineFloatingButtons").style.display = "flex";
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            if (!searchHistory.includes(query)) {
                searchHistory.unshift(query);
                if (searchHistory.length > 5) searchHistory.pop();
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            }
            executeSearch(query);
        }
    }
});

function renderSearchHistory() {
    searchHistoryDiv.innerHTML = "";
    searchHistory.forEach(q => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML = `<span style="flex:1;">🕒 ${escapeHtml(q)}</span><button class="history-delete">×</button>`;
        
        item.querySelector("span").addEventListener("click", () => {
            searchInput.value = q;
            executeSearch(q);
        });
        
        item.querySelector(".history-delete").addEventListener("click", (e) => {
            e.stopPropagation();
            searchHistory = searchHistory.filter(h => h !== q);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            renderSearchHistory();
        });
        searchHistoryDiv.appendChild(item);
    });
}

function executeSearch(query) {
    searchResultsDiv.innerHTML = "";
    const filtered = posts.filter(p => p.text.includes(query));
    
    if (filtered.length === 0) {
        searchResultsDiv.innerHTML = '<div style="padding:20px; color:gray; text-align:center;">見つかりませんでした</div>';
    } else {
        filtered.forEach(post => addPostToTimeline(post, searchResultsDiv));
    }
}

// ==========================================
// 9. その他共通処理・ユーティリティ
// ==========================================
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (!post.likedBy) post.likedBy = [];
    
    if (post.likedBy.includes(currentAccount)) {
        post.likedBy = post.likedBy.filter(a => a !== currentAccount);
    } else {
        post.likedBy.push(currentAccount);
    }
    
    saveAllData();
    // 表示されている適切な画面を更新
    renderTimeline();
    if (profilePage.style.display === "block") showProfile();
    if (postDetailPage.style.display === "block" && activeDetailPostId === postId) openPostDetail(postId);
}

function togglePin(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.pinned = !post.pinned;
    saveAllData();
    if (profilePage.style.display === "block") showProfile();
}

function openImageModal(src) {
    const imgModal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    modalImg.src = src;
    imgModal.style.display = "flex";
}

document.getElementById("imageModal").addEventListener("click", function() {
    this.style.display = "none";
});

function saveAllData() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("currentAccount", currentAccount);
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// タイムラインへ戻るボタン
backButton.addEventListener("click", () => {
    profilePage.style.display = "none";
    timeline.style.display = "block";
    document.getElementById("timelineFloatingButtons").style.display = "flex";
});

// アプリの初期起動処理
initializeProfileRooms();
renderAccounts();
renderTimeline();