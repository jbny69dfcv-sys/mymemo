let searchHistoryData =
    JSON.parse(
        localStorage.getItem(
            "searchHistory"
        )
    ) || [];

let tempIcon = null;

let tempHeader = null;

let editingPost = null;

let profileMode = "posts";

let currentDetailPost =
    null;

let currentCommentPost =
    null;

const postsTab =
    document.getElementById(
        "postsTab"
    );

const likesTab =
    document.getElementById(
        "likesTab"
    );

const deleteAccountButton =
    document.getElementById(
        "deleteAccountButton"
    );

postsTab.addEventListener(
    "click",
    () => {

        profileMode =
            "posts";

        postsTab.classList.add(
            "active"
        );

        likesTab.classList.remove(
            "active"
        );

        renderProfilePosts();
    }
);

likesTab.addEventListener(
    "click",
    () => {

        profileMode =
            "likes";

        likesTab.classList.add(
            "active"
        );

        postsTab.classList.remove(
            "active"
        );

        renderProfilePosts();
    }
);


const searchInput =
    document.getElementById(
        "searchInput"
    );
const accountsContainer =
    document.getElementById("accounts");

const timeline =
    document.getElementById("timeline");

const postDetailPage =
    document.getElementById(
        "postDetailPage"
    );

const detailPost =
    document.getElementById(
        "detailPost"
    );

const detailComments =
    document.getElementById(
        "detailComments"
    );

const detailCommentInput =
    document.getElementById(
        "detailCommentInput"
    );

const detailCommentButton =
    document.getElementById(
        "detailCommentButton"
    );

const backFromDetailButton =
    document.getElementById(
        "backFromDetailButton"
    );

const profilePage =
    document.getElementById("profilePage");

const profileName =
    document.getElementById("profileName");

    const followingCount =
    document.getElementById(
        "followingCount"
    );

const followerCount =
    document.getElementById(
        "followerCount"
    );

const profileId =
    document.getElementById("profileId");

const profileBio =
    document.getElementById("profileBio");

const profileIcon =
    document.getElementById("profileIcon");

const headerImage =
    document.getElementById("headerImage");

const profileTimeline =
    document.getElementById("profileTimeline");

const postCount =
    document.getElementById("postCount");

const backButton =
    document.getElementById("backButton");



const iconUpload =
    document.getElementById("iconUpload");

const headerUpload =
    document.getElementById("headerUpload");

const editProfileModal = document.getElementById("editProfileModal");
const editHeaderPreview =
    document.getElementById(
        "editHeaderPreview"
    );

const editIconPreview =
    document.getElementById(
        "editIconPreview"
    );

detailCommentButton.addEventListener(
    "click",
    () => {

        if (
            !currentDetailPost
        ) {
            return;
        }

        if (
            detailCommentInput.value.trim() === ""
        ) {
            return;
        }

        if (
            !currentDetailPost.comments
        ) {

            currentDetailPost.comments =
                [];

        }

        currentDetailPost.comments.push({

            account:
                currentAccount,

            text:
                detailCommentInput.value,

            time:
                Date.now()

        });

        savePostToDB(
            currentDetailPost
        );

        detailCommentInput.value =
            "";

        renderDetailComments();

        renderTimeline();

        renderProfilePosts();

    }
);

editHeaderPreview.addEventListener(
    "click",
    () => {

        headerUpload.click();
    }
);

editIconPreview.addEventListener(
    "click",
    () => {

        iconUpload.click();
    }
);

const cancelProfileButton =
    document.getElementById(
        "cancelProfileButton"
    );

const saveProfileButton =
    document.getElementById(
        "saveProfileButton"
    );
console.log("button:", editHeaderButton);

console.log(
    "cancel:",
    cancelProfileButton
);

console.log(
    "modal:",
    editProfileModal
);

cancelProfileButton.addEventListener(
    "click",
    () => {

        editProfileModal.style.display =
            "none";
    }
);
 
 
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-profile-btn") || e.target.id === "editHeaderButton" || e.target.innerText === "✏️") {
        e.stopPropagation();

        const profile = profiles[currentAccount] || {};

        const previewHeader = document.getElementById("editHeaderPreview");
        const previewIcon = document.getElementById("editIconPreview");
        const inputName = document.getElementById("editName");
        const inputId = document.getElementById("editId");
        const inputBio = document.getElementById("editBio");
        const modal = document.getElementById("editProfileModal");

        if (previewHeader) previewHeader.src = profile.header || "";
        if (previewIcon) previewIcon.src = profile.icon || "https://via.placeholder.com/60";
        if (inputName) inputName.value = profile.name || currentAccount;
        if (inputId) inputId.value = profile.id || "";
        if (inputBio) inputBio.value = profile.bio || "";

        console.log("プロフィール編集押された（選択中アカウント:" + currentAccount + "）");

        tempIcon = profile.icon || null;
        tempHeader = profile.header || null;
        
        if (modal) {
            modal.style.display = "block";
        }
    }
});


saveProfileButton.addEventListener(
    "click",
    () => {

        const profile =
            profiles[currentAccount] || {};

        profile.name =
    editName.value;

        profile.id =
            editId.value;

        profile.bio =
            editBio.value;

        profile.icon =
    tempIcon;

profile.header =
    tempHeader;

        profiles[currentAccount] =
            profile;

        saveProfiles();

        showProfile();

        editProfileModal.style.display =
            "none";
    }
);

const searchButton =
    document.getElementById(
        "searchButton"
    );

const searchPage =
    document.getElementById(
        "searchPage"
    );



const backSearchButton =
    document.getElementById(
        "backSearchButton"
    );

const searchHistory =
    document.getElementById(
        "searchHistory"
    );

searchButton.addEventListener(
    "click",
    () => {

        timeline.style.display =
            "none";

        profilePage.style.display =
            "none";

        postDetailPage.style.display =
            "none";

        searchPage.style.display =
            "block";

        searchInput.value = "";

        searchResults.innerHTML =
            "";

        renderSearchHistory();

    }
);

backSearchButton.addEventListener(
    "click",
    () => {

        searchPage.style.display =
            "none";

        timeline.style.display =
            "block";

    }
);

const postButton =
    document.getElementById("postButton");

const headerModal =
    document.getElementById(
        "headerModal"
    );

const headerModalImage =
    document.getElementById(
        "headerModalImage"
    );

const profileHeaderImage =
    document.getElementById(
        "headerImage"
    );

const cropModal =
    document.getElementById(
        "cropModal"
    );

const cropImage =
    document.getElementById(
        "cropImage"
    );

const cropConfirmButton =
    document.getElementById(
        "cropConfirmButton"
    );

const cropCancelButton =
    document.getElementById(
        "cropCancelButton"
    );

let cropper = null;

let cropTarget = null;

console.log(
    "headerImage:",
    profileHeaderImage
);

profileHeaderImage.addEventListener(
    "click",
    () => {

        headerModalImage.src =
            profileHeaderImage.src;

        headerModal.style.display =
            "flex";
    }
);

profileIcon.addEventListener(
    "click",
    () => {

        headerModalImage.src =
            profileIcon.src;

        headerModal.style.display =
            "flex";
    }
);
console.log(
    "headerModal:",
    headerModal
);
headerModal.addEventListener(
    "click",
    () => {

        headerModal.style.display =
            "none";
    }
);
const searchResults =
    document.getElementById(
        "searchResults"
    );

const postModal =
    document.getElementById("postModal");

const modalPostInput =
    document.getElementById(
        "modalPostInput"
    );

const postImageUpload =
    document.getElementById(
        "postImageUpload"
    );


const postImagePreview =
    document.getElementById(
        "postImagePreview"
    );

const removePostImageButton =
    document.getElementById(
        "removePostImageButton"
    );

postImageUpload.addEventListener(
    "change",
    () => {

const file =
    postImageUpload.files[0];

if (!file) return;

        const reader =
            new FileReader();

        reader.onload =
            () => {

                postImagePreview.src =
                    reader.result;

                postImagePreview.style.display =
                    "block";

                removePostImageButton.style.display =
                    "inline-block";
            };

        reader.readAsDataURL(
            file
        );
    }
);

removePostImageButton.addEventListener(
    "click",
    () => {

        postImageUpload.value =
            "";

        postImagePreview.src =
            "";

        postImagePreview.style.display =
            "none";

        removePostImageButton.style.display =
            "none";

        if (editingPost) {
            editingPost.text = text;

            const files = [...postImageUpload.files];

            const finalizeEdit = () => {
                const postIndex = posts.findIndex(p => p.id === editingPost.id);
                if (postIndex !== -1) {
                    posts[postIndex] = editingPost;
                }

                savePostToDB(editingPost);

                renderTimeline();
                renderProfilePosts();

                modalPostInput.value = "";
                postImageUpload.value = "";
                postImagePreview.src = "";
                document.querySelector(".preview-container").style.display = "none";
                editingPost = null;
                modalPostButton.textContent = "投稿";
                postModal.style.display = "none";
            };

            if (files.length > 0) {
                const reader = new FileReader();
                reader.onload = () => {
                    editingPost.image = reader.result;
                    finalizeEdit();
                };
                reader.readAsDataURL(files[0]);
            } else {
                finalizeEdit();
            }

            return;
        }
    }
);

const modalPostButton =
    document.getElementById(
        "modalPostButton"
    );

const closeModalButton =
    document.getElementById(
        "closeModalButton"
    );

const imageModal =
    document.getElementById(
        "imageModal"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );
const videoModal =
    document.getElementById(
        "videoModal"
    );

const modalVideo =
    document.getElementById(
        "modalVideo"
    );

const editName =
    document.getElementById(
        "editName"
    );

const editId =
    document.getElementById(
        "editId"
    );

const editBio =
    document.getElementById(
        "editBio"
    );

const postUserIcon =
    document.getElementById(
        "postUserIcon"
    );

const commentModal =
    document.getElementById(
        "commentModal"
    );

const closeCommentButton =
    document.getElementById(
        "closeCommentButton"
    );

const commentList =
    document.getElementById(
        "commentList"
    );

const commentInput =
    document.getElementById(
        "commentInput"
    );

const sendCommentButton =
    document.getElementById(
        "sendCommentButton"
    );

let accounts =
    JSON.parse(
        localStorage.getItem(
            "accounts"
        )
    ) || [
        "今の垢",
        "他の垢",
        "創作垢"
    ];

let currentAccount =
    localStorage.getItem(
        "currentAccount"
    ) || accounts[0];

let posts = [];
let profiles =
    JSON.parse(
        localStorage.getItem(
            "profiles"
        )
    ) || {};

function savePosts() {

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );
}

function saveProfiles() {
    localStorage.setItem("profiles", JSON.stringify(profiles));
}

function saveProfile() {
    if (!currentAccount) return;

    const name = document.getElementById("editName").value;
    const bio = document.getElementById("editBio").value;
    const header = document.getElementById("editHeader").value;
    const icon = document.getElementById("editIcon").value;

    profiles[currentAccount] = {
        name: name,
        bio: bio,
        header: header,
        icon: icon
    };

    localStorage.setItem("profiles", JSON.stringify(profiles));

    const modal = document.getElementById("profileModal");
    if (modal) modal.style.display = "none";

    showProfile();
    renderAccounts();
    renderTimeline();
}

function saveAccounts() {

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}

function formatTime(time) {

    if (!time) return "";

    const date =
        new Date(time);

    return (
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " " +
        date
            .getHours()
            .toString()
            .padStart(2, "0") +
        ":" +
        date
            .getMinutes()
            .toString()
            .padStart(2, "0")
    );
}

function renderAccounts() {

    accountsContainer.innerHTML = "";

    for (const account of accounts) {

        const accountDiv =
            document.createElement("div");

        accountDiv.className =
            "account";

        if (
            account === currentAccount
        ) {
            accountDiv.classList.add(
                "selected-account"
            );
        }

        const profile =
            profiles[account] || {};

        accountDiv.innerHTML = `
            <img
                class="account-icon"
                src="${
                    profile.icon ||
                    "https://via.placeholder.com/60"
                }"
            >
        `;
// 🛠 タップ処理を共通化する関数を作る
        const handleAccountClick = (e) => {
            e.preventDefault(); // スマホの余計な挙動（300ms遅延など）を防止

            if (account === currentAccount) {
                showProfile();
            } else {
                const targetIndex = accounts.indexOf(account);
                currentAccount = account;
                localStorage.setItem("currentAccount", currentAccount);
                localStorage.setItem("currentAccountIndex", targetIndex);

                renderAccounts();
                renderTimeline();

                const container = document.getElementById("profileContainer");
                if (container) {
                    container.style.transition = "transform 0.3s cubic-bezier(0.35, 0, 0.25, 1)";
                    container.style.transform = `translateX(-${targetIndex * 100}%)`;
                }
            }
        };

        // スマホ用（タッチした瞬間に反応）
        accountDiv.addEventListener("touchstart", handleAccountClick, { passive: false });
        // PC用（クリックに反応）
        accountDiv.addEventListener("click", handleAccountClick);
        accountsContainer.appendChild(
            accountDiv
        );
    }

    const addButton =
        document.createElement("div");

    addButton.className =
        "account";

    addButton.textContent =
        "＋";

    addButton.addEventListener("click", () => {
        const name = prompt("アカウント名を入力してください");
        if (!name) return;

        accounts.push(name);
        localStorage.setItem("accounts", JSON.stringify(accounts));

        initializeProfileRooms();
        renderAccounts();
        showProfile();

        if (window.mySwiper && typeof window.mySwiper.update === 'function') {
            window.mySwiper.update();
        }
    });

    accountsContainer.appendChild(
        addButton
    );
}

function addPostToTimeline(
    postData,
    container
) {

    const post =
        document.createElement("div");

    post.className =
        "post";

    const profile =
        profiles[
            postData.account
        ] || {};

    post.innerHTML = `
        <div class="post-header">
            <img class="post-icon" src="${profile.icon || "https://via.placeholder.com/50"}">
            <div class="post-user">
                <div>
                    ${profile.name || postData.account}
                    <span class="post-id">@${profile.id || "userid"}</span>
                </div>
                <div class="post-time">${formatTime(postData.time)}</div>
            </div>
            <div class="post-buttons">
                <button class="pin-button">${postData.pinned ? "📍" : "📌"}</button>
                <button class="edit-button">✏️</button>
                <button class="delete-button">✕</button>
            </div>
        </div>

        <div class="post-body">
            <div class="post-text">${postData.text}</div>
            
            ${
                postData.images && postData.images.length > 0
                ? `
                <div class="post-images ${
                    postData.images.length === 1 ? "one" : 
                    postData.images.length === 2 ? "two" : 
                    postData.images.length === 3 ? "three" : "four"
                }">
                    ${postData.images.map(image => `<img src="${image}" class="post-image clickable-image">`).join("")}
                </div>
                `
                : postData.image
                ? `<img src="${postData.image}" class="post-image clickable-image">`
                : ""
            }

            <div class="post-actions">
                <button class="like-button">
                    ${postData.likedBy && postData.likedBy.includes(currentAccount) ? "❤️" : "🤍"}
                    ${postData.likes || 0}
                </button>
                <button class="comment-button">
                    💬 ${postData.comments ? postData.comments.length : 0}
                </button>
            </div>
        </div>
    `;

    const pinButton =
        post.querySelector(
            ".pin-button"
        );

    if (pinButton) {
        pinButton.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();

                if (postData.pinned) {
                    postData.pinned = false;
                    savePostToDB(postData);
                } else {
                    posts.forEach(
                        post => {
                            if (post.account === currentAccount) {
                                post.pinned = false;
                                savePostToDB(post);
                            }
                        }
                    );
                    postData.pinned = true;
                    savePostToDB(postData);
                }

                renderTimeline();
                renderProfilePosts();
            }
        );
    }

    const deleteButton =
            post.querySelector(
                ".delete-button"
            );

    const editButton =
        post.querySelector(
            ".edit-button"
        );

    const likeButton =
        post.querySelector(
            ".like-button"
        );

    const commentButton =
        post.querySelector(
            ".comment-button"
        );

    if (commentButton) {
        commentButton.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();
                openPostDetail(postData);
            }
        );
    }

    if (likeButton) {
        likeButton.addEventListener(
            "click",
            () => {
                if (!postData.likedBy) {
                    postData.likedBy = [];
                }

                if (postData.likedBy.includes(currentAccount)) {
                    postData.likedBy = postData.likedBy.filter(account => account !== currentAccount);
                    postData.likes--;
                } else {
                    postData.likedBy.push(currentAccount);
                    postData.likes++;
                }

                savePostToDB(postData);
                renderTimeline();
                renderProfilePosts();
            }
        );
    }

    if (editButton) {
        editButton.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();

                const profile = profiles[currentAccount] || {};
                postUserIcon.src = profile.icon || "https://via.placeholder.com/60";

                editingPost = postData;
                modalPostInput.value = postData.text;

                if (postData.image) {
                    postImagePreview.src = postData.image;
                    document.querySelector(".preview-container").style.display = "block";
                } else {
                    document.querySelector(".preview-container").style.display = "none";
                }

                editProfileModal.style.display = "none";
                postModal.style.display = "block";
                modalPostButton.textContent = "保存";

                requestAnimationFrame(() => {
                    modalPostInput.focus();
                });
            }
        );
    }

    deleteButton.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();

            const result = confirm("この投稿を削除しますか？");
            if (!result) return;

            const index = posts.indexOf(postData);

            if (index !== -1) {
                posts.splice(index, 1);

                const transaction = db.transaction(["posts"], "readwrite");
                const store = transaction.objectStore("posts");
                store.delete(postData.id);

                renderTimeline();
                renderProfilePosts();
            }
        }
    );

    const images = post.querySelectorAll(".clickable-image");
    images.forEach(
        image => {
            image.addEventListener(
                "click",
                event => {
                    event.stopPropagation();
                    modalImage.src = image.src;
                    imageModal.style.display = "flex";
                }
            );
        }
    );

    const video = post.querySelector(".post-video");
    if (video) {
        video.addEventListener(
            "click",
            () => {
                modalVideo.src = video.querySelector("source").src;
                videoModal.style.display = "flex";
            }
        );
    }

    container.appendChild(post);
}

function renderTimeline() {
    timeline.innerHTML = "";

    const sortedPosts = [...posts].sort((a, b) => b.time - a.time);

    for (const post of sortedPosts) {
        addPostToTimeline(post, timeline);
    }
}

function renderProfilePosts() {
    // 1. 現在選択されているアカウントのプロフィール部屋（DOM要素）を正しく取得
    const targetIndex = accounts.indexOf(currentAccount);
    const rooms = document.querySelectorAll(".single-profile");
    const currentRoom = rooms[targetIndex];
    
    if (!currentRoom) return;
    const profileTimeline = currentRoom.querySelector(".timeline") || currentRoom.querySelector("#profileTimeline");
    if (!profileTimeline) return;

    profileTimeline.innerHTML = ""; // タイムラインを一旦クリア

    // 2. 現在のアカウントに関連する投稿、またはスキした投稿を正確にフィルター
    let targetPosts = [];

    if (profileMode === "likes") {
        // 【スキ モード】post.likedBy 配列に自分（currentAccount）が含まれている投稿を絞り込む
        targetPosts = posts.filter(post => post.likedBy && post.likedBy.includes(currentAccount));
    } else {
        // 【投稿 モード】そのアカウントが自分で投稿したものだけを絞り込む
        targetPosts = posts.filter(post => post.account === currentAccount);
    }

    // 3. ピン留め（pinned）を最優先にし、次に時間の新しい順（降順）に並び替える
    const sortedPosts = [...targetPosts].sort((a, b) => {
        if ((a.pinned || false) !== (b.pinned || false)) {
            return (b.pinned || false) - (a.pinned || false);
        }
        return b.time - a.time;
    });

    // 4. 投稿が1件もない場合の表示
    if (sortedPosts.length === 0) {
        profileTimeline.innerHTML = `<div class="no-posts" style="text-align:center; padding:20px; color:#aaa;">${profileMode === "likes" ? "スキした投稿はありません" : "投稿はありません"}</div>`;
        return;
    }

    // 5. 元々定義されている綺麗なタイムラインカード生成関数（addPostToTimeline）を使って安全に描画
    for (const post of sortedPosts) {
        addPostToTimeline(post, profileTimeline);
    }
}

// 🔄 既存の DOMContentLoaded の部分をこれに置き換えてください
document.addEventListener("DOMContentLoaded", () => {
    // 💡 ページ読み込み時に、まずプロフィール部屋を自動で組み立てる
    initializeProfileRooms(); 
    renderAccounts();         

    timeline.style.display = "block";
    profilePage.style.display = "none";
    
    if (postDetailPage) postDetailPage.style.display = "none";
    if (searchPage) searchPage.style.display = "none";

    const savedIndex = localStorage.getItem("currentAccountIndex");
    if (savedIndex !== null) {
        const container = document.getElementById("profileContainer");
        if (container) {
            container.style.transition = "none";
            container.style.transform = `translateX(-${savedIndex * 100}%)`;
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteAccountButton") || e.target.id === "deleteAccountButton") {
        const index = e.target.getAttribute("data-index");
        
        const confirmDelete = confirm("本当にこのアカウントを削除しますか？");
        if (!confirmDelete) return;

        let savedAccounts = JSON.parse(localStorage.getItem("accounts")) || accounts;
        
        if (index !== null && savedAccounts[index]) {
            savedAccounts.splice(index, 1);
            localStorage.setItem("accounts", JSON.stringify(savedAccounts));
            accounts = savedAccounts;

            localStorage.setItem("currentAccountIndex", 0);

            initializeProfileRooms();
            if (typeof renderAccounts === "function") renderAccounts();
            if (typeof showProfile === "function") showProfile();
            
            location.reload(); 
        }
    }
});

function showProfile() {
    const container = document.getElementById("profileContainer");
    if (!container) return;
    
    const rooms = container.getElementsByClassName("single-profile");
    
    // 💡 固定の accounts ではなく、保存されたアカウント一覧を基準にする
    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || accounts;

    savedAccounts.forEach((accountName, index) => {
        const currentRoom = rooms[index];
        if (!currentRoom) return;

        const profile = profiles[accountName] || {};
        const userPosts = posts.filter(post => post.account === accountName);

        const headerEl = currentRoom.querySelector(".header-image");
        if (headerEl) headerEl.src = profile.header || "";

        const iconEl = currentRoom.querySelector(".profile-icon");
        if (iconEl) iconEl.src = profile.icon || "https://via.placeholder.com/60";
        
        const nameEl = currentRoom.querySelector("h2");
        if (nameEl) nameEl.textContent = profile.name || accountName;
        
        const idEl = currentRoom.querySelector("p:nth-of-type(1)");
        if (idEl) idEl.textContent = "@" + (profile.id || "userid");
        
        const bioEl = currentRoom.querySelector("p:nth-of-type(2)");
        if (bioEl) bioEl.textContent = profile.bio || "プロフィール未設定";
        
        const countEl = currentRoom.querySelector("p:nth-of-type(3)");
        if (countEl) countEl.textContent = "投稿数 " + userPosts.length;

        const roomTimeline = currentRoom.querySelector(".timeline") || currentRoom.querySelector("#profileTimeline");
        if (roomTimeline) {
            roomTimeline.innerHTML = ""; 
            
            // 💡 ここも profileMode に応じて正しく表示を分ける
            const targetPosts = profileMode === "posts" 
                ? userPosts 
                : posts.filter(post => post.likedBy && post.likedBy.includes(accountName));

            const sortedPosts = [...targetPosts].sort((a, b) => {
                if ((a.pinned || false) !== (b.pinned || false)) {
                    return (b.pinned || false) - (a.pinned || false);
                }
                return b.time - a.time;
            });

            for (const post of sortedPosts) {
                addPostToTimeline(post, roomTimeline);
            }
        }
    });

    timeline.style.display = "none";
    profilePage.style.display = "block";
}

postButton.addEventListener(
    "click",
    () => {

       const profile =
            profiles[currentAccount] || {};

        postUserIcon.src =
            profile.icon ||
            "https://via.placeholder.com/60";

        modalPostInput.value = "";

        postImageUpload.value = "";

        postImagePreview.src = "";

        document.querySelector(
            ".preview-container"
        ).style.display = "none";

        editingPost = null;

        modalPostButton.textContent =
            "投稿";

        postModal.style.display = "block";

        requestAnimationFrame(() => {
            modalPostInput.focus();
        });
    }
);

closeModalButton.addEventListener(
    "click",
    () => {

        postModal.style.display =
            "none";
    }
);

closeCommentButton.addEventListener(
    "click",
    () => {

        commentModal.style.display =
            "none";

    }
);

sendCommentButton.addEventListener(
    "click",
    () => {

        if (
            !currentCommentPost
        ) {
            return;
        }

        if (
            commentInput.value.trim() === ""
        ) {
            return;
        }

        if (
            !currentCommentPost.comments
        ) {

            currentCommentPost.comments =
                [];

        }

        currentCommentPost.comments.push({

            account:
                currentAccount,

            text:
                commentInput.value,

            time:
                Date.now()

        });

        savePostToDB(
            currentCommentPost
        );

        renderComments();

        commentInput.value =
            "";

        commentModal.style.display =
            "none";

        renderTimeline();
        renderProfilePosts();

    }
);

modalPostButton.addEventListener(
    "click",
    () => {

        const text =
            modalPostInput.value;

        if (
            text.trim() === ""
        ) {
            return;
        }

        if (editingPost) {
            editingPost.text = text;

            const files = [...postImageUpload.files];

            const finalizeEdit = () => {
                const transaction = db.transaction(["posts"], "readwrite");
                const store = transaction.objectStore("posts");
                const request = store.put(editingPost);

                request.onsuccess = () => {
                    loadPosts();

                    modalPostInput.value = "";
                    postImageUpload.value = "";
                    postImagePreview.src = "";
                    document.querySelector(".preview-container").style.display = "none";
                    editingPost = null;
                    modalPostButton.textContent = "投稿";
                    postModal.style.display = "none";
                };
            };

            if (files.length > 0) {
                const reader = new FileReader();
                reader.onload = () => {
                    editingPost.image = reader.result;
                    finalizeEdit();
                };
                reader.readAsDataURL(files[0]);
            } else {
                finalizeEdit();
            }

            return;
        }

        const files =
            [...postImageUpload.files];

        if (
            files.length > 0
        ) {

            const newPost = {

                account:
                    currentAccount,

                text:
                    text,

                images:
                    [],

                time:
                    Date.now(),

                likes:
                    0,

                likedBy:
                    [],

                pinned:
                    false

            };

            let loaded =
                0;

            files.forEach(
                (file, index) => {

                    const reader =
                        new FileReader();

                    reader.onload =
                        () => {

                            newPost.images[index] =
                                reader.result;

                            loaded++;

                            if (
                                loaded ===
                                files.length
                            ) {

                                posts.push(
                                    newPost
                                );

                                savePostToDB(
                                    newPost
                                );

                                modalPostInput.value =
                                    "";

                                postImageUpload.value =
                                    "";

                                document.querySelector(
                                    ".preview-container"
                                ).style.display =
                                    "none";

                                postModal.style.display =
                                    "none";
                            }

                        };

                    reader.readAsDataURL(
                        file
                    );

                }
            );
        } else {

            const newPost = {

                account:
                    currentAccount,

                text:
                    text,

                image:
                    null,

                time:
                    Date.now(),

                likes:
                    0,

                likedBy:
                    [],

                pinned:
                    false

            };

            posts.push(
                newPost
            );

            savePostToDB(
                newPost
            );

            renderTimeline();

            modalPostInput.value =
                "";

            postModal.style.display =
                "none";
        }

    }
);

backButton.addEventListener(
    "click",
    () => {

        profilePage.style.display =
            "none";

        timeline.style.display =
            "block";
    }
);

headerUpload.addEventListener(
    "change",
    () => {

        const file =
            headerUpload.files[0];

        if (!file) return;

        const reader =
            new FileReader();
        console.log("header start");
        reader.onload = () => {

            cropTarget =
                "header";

            cropImage.src =
                reader.result;

            cropModal.style.display =
                "block";

            cropImage.onload = () => {

                if (cropper) {

                    cropper.destroy();
                }

                cropper =
                    new Cropper(
                        cropImage,
                        {
                            aspectRatio: 3,
                            viewMode: 1,

                            dragMode: "move",

                            cropBoxMovable: false,

                            cropBoxResizable: false
                        }
                    );
            };
        };

        reader.readAsDataURL(
            file
        );
    }
);

iconUpload.addEventListener(
    "change",
    () => {

        const file =
            iconUpload.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = () => {

            cropTarget =
                "icon";

            cropImage.src =
                reader.result;

            cropModal.style.display =
                "block";

            cropImage.onload = () => {

                if (cropper) {

                    cropper.destroy();
                }

                cropper =
                    new Cropper(
                        cropImage,
                        {
                            aspectRatio: 1,
                            viewMode: 1,

                            dragMode: "move",

                            cropBoxMovable: false,

                            cropBoxResizable: false
                        }
                    );
            };
        };

        reader.readAsDataURL(
            file
        );
    }
);

cropCancelButton.addEventListener(
    "click",
    () => {

        cropModal.style.display =
            "none";

        if (cropper) {

            cropper.destroy();

            cropper = null;
            cropImage.src = "";
             
        }
        
    }
);

cropConfirmButton.addEventListener(
    "click",
    () => {

        const canvas =
            cropper.getCroppedCanvas();

        const croppedImage =
            canvas.toDataURL(
                "image/png"
            );

        if (
            cropTarget === "icon"
        ) {

            tempIcon =
                croppedImage;

            editIconPreview.src =
                croppedImage;
        }

        if (
            cropTarget === "header"
        ) {

            tempHeader =
                croppedImage;

            editHeaderPreview.src =
                croppedImage;
        }

        cropper.destroy();

        cropModal.style.display =
            "none";
    }
);

imageModal.addEventListener(
    "click",
    () => {

        imageModal.style.display =
            "none";
    }
);

videoModal.addEventListener(
    "click",
    () => {

        modalVideo.pause();

        videoModal.style.display =
            "none";
    }
);

let db;

const indexedDBRequest =
    indexedDB.open(
        "MyMemoDB",
        1
    );

indexedDBRequest.onupgradeneeded =
    event => {

    db =
        event.target.result;

    if (
        !db.objectStoreNames.contains(
            "posts"
        )
    ) {

        db.createObjectStore(
            "posts",
            {
                keyPath: "id",
                autoIncrement: true
            }
        );
    }
};

indexedDBRequest.onsuccess =
    event => {

    db =
        event.target.result;

    loadPosts();
};

function savePostToDB(post) {
    const transaction =
        db.transaction(
            ["posts"],
            "readwrite"
        );

    const store =
        transaction.objectStore(
            "posts"
        );

    const storeRequest =
        store.put(post);

    storeRequest.onsuccess =
        () => {
            loadPosts();
        };
}

function loadPosts() {
    const transaction =
        db.transaction(
            ["posts"],
            "readonly"
        );

    const store =
        transaction.objectStore(
            "posts"
        );

    const storeRequest =
        store.getAll();

    storeRequest.onsuccess =
        () => {
        posts =
            storeRequest.result;

        renderTimeline();
        renderProfilePosts();
    };
}

renderAccounts();

deleteAccountButton.addEventListener(
    "click",
    () => {

        if (
            !confirm(
                "このアカウントを削除しますか？"
            )
        ) {
            return;
        }

        delete profiles[currentAccount];

        accounts =
            accounts.filter(
                account =>
                    account !== currentAccount
            );

        posts.forEach(
            post => {

                if (post.likedBy) {

                    post.likedBy =
                        post.likedBy.filter(
                            account =>
                                account !== currentAccount
                        );

                    post.likes =
                        post.likedBy.length;
                }
            }
        );

        posts =
            posts.filter(
                post =>
                    post.account !== currentAccount
                );

        saveAccounts();
        saveProfiles();
        savePosts();

        localStorage.setItem("currentAccountIndex", 0);

        if (
            accounts.length > 0
        ) {

            currentAccount =
                accounts[0];

            localStorage.setItem(
                "currentAccount",
                currentAccount
            );

            renderAccounts();
            renderTimeline();
            showProfile();

        } else {

            localStorage.removeItem(
                "currentAccount"
            );

            renderAccounts();

            timeline.innerHTML = "";

            profilePage.style.display =
                "none";
        }

    }
);

function renderComments() {

    commentList.innerHTML =
        "";

    if (
        !currentCommentPost.comments
    ) {
        return;
    }

    for (
        const comment of
        currentCommentPost.comments
    ) {

        const commentDiv =
            document.createElement(
                "div"
            );

        const profile =
            profiles[
                comment.account
            ] || {};

        commentDiv.className =
            "comment";

        commentDiv.innerHTML = `
<div class="comment-header">

    <img
        class="comment-icon"
        src="${
            profile.icon ||
            "https://via.placeholder.com/40"
        }"
    >

    <div class="comment-info">

        <div class="comment-top">

            <span class="comment-name">
                ${profile.name || comment.account}
            </span>

            <span class="comment-id">
                @${profile.id || "userid"}
            </span>

            <span class="comment-time">
                ${formatTime(comment.time)}
            </span>

        </div>

        <div class="comment-text">${comment.text}</div>

    </div>

</div>
`;

        commentList.appendChild(
            commentDiv
        );

    }

}

function openPostDetail(
    postData
) {

    currentDetailPost =
        postData;

    timeline.style.display =
        "none";

    profilePage.style.display =
        "none";

    postDetailPage.style.display =
        "block";

    detailPost.innerHTML =
        "";

    addPostToTimeline(
        postData,
        detailPost
    );
    renderDetailComments();
}

backFromDetailButton.addEventListener(
    "click",
    () => {

        postDetailPage.style.display =
            "none";

        timeline.style.display =
            "block";

    }
);

function renderDetailComments() {

    const oldComments =
        detailPost.querySelector(
            ".post-comments"
        );

    if (oldComments) {
        oldComments.remove();
    }

    if (
        !currentDetailPost ||
        !currentDetailPost.comments ||
        currentDetailPost.comments.length === 0
    ) {
        return;
    }

    const postCard =
        detailPost.querySelector(
            ".post"
        );

    if (!postCard) {
        return;
    }

    const commentBox =
        document.createElement(
            "div"
        );

    commentBox.className =
        "post-comments";

    currentDetailPost.comments.forEach(
        (comment, index) => {

            const profile =
                profiles[
                    comment.account
                ] || {};

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "post-comment";

            div.innerHTML =
`
<img
    class="comment-icon"
    src="${profile.icon || "https://via.placeholder.com/40"}"
>

<div class="comment-body">

    <div class="comment-header">

        <div>
            <span class="comment-name">
                ${profile.name || comment.account}
            </span>

            <span class="comment-id">
                @${profile.id || "userid"}
            </span>

            <div class="comment-time">
                ${formatTime(comment.time)}
            </div>
        </div>

        ${
            comment.account === currentAccount
            ? `
            <div class="comment-buttons">
                <button class="edit-comment" data-index="${index}">✏️</button>
                <button class="delete-comment" data-index="${index}">✕</button>
            </div>
            `
            : ""
        }

    </div>

<div class="comment-text">${comment.text}</div>

</div>
`;

            commentBox.appendChild(
                div
            );

        }
    );

    postCard.appendChild(
        commentBox
    );

}

プロフィールを保存しました

function renderSearchHistory() {

    searchHistory.innerHTML =
        "";

    searchHistoryData.forEach(
        word => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "history-item";

            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                word;

            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.textContent =
                "×";

            deleteButton.className =
                "history-delete";

            div.appendChild(
                deleteButton
            );

            div.appendChild(
                text
            );

            div.addEventListener(
                "click",
                () => {

                    searchInput.value =
                        word;

                    searchPosts(
                        word
                    );

                }
            );

            deleteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    searchHistoryData =
                        searchHistoryData.filter(
                            item =>
                                item !== word
                        );

                    localStorage.setItem(
                        "searchHistory",
                        JSON.stringify(
                            searchHistoryData
                        )
                    );

                    renderSearchHistory();

                }
            );

            searchHistory.appendChild(
                div
            );

        }
    );

}

function searchPosts(
    keyword
) {

    searchResults.innerHTML =
        "";

    if (
        keyword.trim() === ""
    ) {

        renderSearchHistory();
        return;

    }


    const result =
        posts.filter(
            post =>
                post.text
                    .toLowerCase()
                    .includes(
                        keyword.toLowerCase()
                    )
        );

    result.forEach(
        post => {

            addPostToTimeline(
                post,
                searchResults
            );

        }
    );

}

searchInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter"
        ) {
            return;
        }

        const keyword =
            searchInput.value.trim();

        if (
            keyword === ""
        ) {
            return;
        }

        searchHistoryData =
            searchHistoryData.filter(
                item =>
                    item !== keyword
            );

        searchHistoryData.unshift(
            keyword
        );

        if (
            searchHistoryData.length > 10
        ) {

            searchHistoryData.pop();

        }

        localStorage.setItem(
            "searchHistory",
            JSON.stringify(
                searchHistoryData
            )
        );

        renderSearchHistory();

        searchPosts(
            keyword
        );

    }
);

searchInput.addEventListener(
    "input",
    () => {

        searchPosts(
            searchInput.value
        );

    }
);

function setAppHeight() {

    document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
    );

}

// ✨ 1. 新しくこの関数をコードの末尾などに追加してください
function initializeProfileRooms() {
    const container = document.getElementById("profileContainer");
    if (!container) return;

    container.innerHTML = "";

    // ローカルストレージから最新のアカウント一覧を取得
    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || accounts;

    savedAccounts.forEach((accName, index) => {
        const newRoom = document.createElement("div");
        newRoom.className = "single-profile";
        
        newRoom.innerHTML = `
            <div class="profile-header">
                <img class="header-image" src="" id="headerImage">
                <button class="edit-profile-btn edit-header-button">✏️</button>
            </div>
            <div class="profile-info">
                <img class="profile-icon" src="https://via.placeholder.com/60" id="profileIcon">
                <h2 id="profileName">${accName}</h2>
                <p id="profileId">@userid</p>
                <p id="profileBio">プロフィール未設定</p>
                <p id="postCount">投稿数 0</p>
                <button class="deleteAccountButton" data-index="${index}">アカウント削除</button>
                <div class="follow-counts">
                    <span id="followingCount">0</span> フォロー
                    <span id="followerCount">0</span> フォロワー
                </div>
            </div>
            <div class="profile-tabs">
                <div class="profile-tab active room-posts-tab">投稿</div>
                <div class="profile-tab room-likes-tab">スキ</div>
            </div>
            <div class="timeline" id="profileTimeline"></div>
        `;

        // 💡 全てのアカウントのタブにクリックイベントを確実に登録
        const pTab = newRoom.querySelector(".room-posts-tab");
        const lTab = newRoom.querySelector(".room-likes-tab");

        if (pTab && lTab) {
            pTab.addEventListener("click", () => {
                profileMode = "posts";
                pTab.classList.add("active");
                lTab.classList.remove("active");
                renderProfilePosts();
            });

            lTab.addEventListener("click", () => {
                profileMode = "likes";
                lTab.classList.add("active");
                pTab.classList.remove("active");
                renderProfilePosts();
            });
        }

        container.appendChild(newRoom);
    });
}

// 🔄 2. 既存の showProfile() をこの内容に丸ごと置き換えてください
function showProfile() {
    const container = document.getElementById("profileContainer");
    if (!container) return;
    
    const rooms = container.getElementsByClassName("single-profile");
    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || accounts;

    savedAccounts.forEach((accountName, index) => {
        const currentRoom = rooms[index];
        if (!currentRoom) return;

        const profile = profiles[accountName] || {};
        const userPosts = posts.filter(post => post.account === accountName);

        const headerEl = currentRoom.querySelector(".header-image");
        if (headerEl) headerEl.src = profile.header || "";

        const iconEl = currentRoom.querySelector(".profile-icon");
        if (iconEl) iconEl.src = profile.icon || "https://via.placeholder.com/60";
        
        const nameEl = currentRoom.querySelector("h2");
        if (nameEl) nameEl.textContent = profile.name || accountName;
        
        const idEl = currentRoom.querySelector("p:nth-of-type(1)");
        if (idEl) idEl.textContent = "@" + (profile.id || "userid");
        
        const bioEl = currentRoom.querySelector("p:nth-of-type(2)");
        if (bioEl) bioEl.textContent = profile.bio || "プロフィール未設定";
        
        const countEl = currentRoom.querySelector("p:nth-of-type(3)");
        if (countEl) countEl.textContent = "投稿数 " + userPosts.length;

        const roomTimeline = currentRoom.querySelector(".timeline") || currentRoom.querySelector("#profileTimeline");
        if (roomTimeline) {
            roomTimeline.innerHTML = ""; 
            
            // モード（投稿 or スキ）に応じて表示する投稿を切り替える
            const targetPosts = profileMode === "posts" 
                ? userPosts 
                : posts.filter(post => post.likedBy && post.likedBy.includes(accountName));

            const sortedPosts = [...targetPosts].sort((a, b) => {
                if ((a.pinned || false) !== (b.pinned || false)) {
                    return (b.pinned || false) - (a.pinned || false);
                }
                return b.time - a.time;
            });

            for (const post of sortedPosts) {
                addPostToTimeline(post, roomTimeline);
            }
        }
    });

    timeline.style.display = "none";
    profilePage.style.display = "block";
}


window.addEventListener(
    "resize",
    setAppHeight
);

setAppHeight();