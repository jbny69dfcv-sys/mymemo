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

const editHeaderButton = document.getElementById("editHeaderButton");

const editProfileModal =
    document.getElementById(
        "editProfileModal"
    );
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
 
 
editHeaderButton.addEventListener(
    "click",
    () => {

        const profile =
            profiles[currentAccount] || {};

        editHeaderPreview.src =
            profile.header || "";

        editIconPreview.src =
            profile.icon || "";

        editName.value =
    profile.name ||
    currentAccount;

editId.value =
    profile.id || "";


editBio.value =
    profile.bio || "";
 console.log("プロフィール編集押された");

 tempIcon =
    profile.icon || null;

tempHeader =
    profile.header || null;
        editProfileModal.style.display =
            "block";
    }
);


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

        // ===== 編集 =====
        if (editingPost) {
            editingPost.text = text;

            const files = [...postImageUpload.files];

            // 共通の終了処理（リセット・画面更新）を関数化
            const finalizeEdit = () => {
                // メモリ上のposts配列内にある、編集対象の投稿も最新の状態に更新する
                const postIndex = posts.findIndex(p => p.id === editingPost.id);
                if (postIndex !== -1) {
                    posts[postIndex] = editingPost;
                }

                savePostToDB(editingPost);

                // 画面を再描画して最新の状態を反映させる
                renderTimeline();
                renderProfilePosts();

                // フォームをリセットしてモーダルを閉じる
                modalPostInput.value = "";
                postImageUpload.value = "";
                postImagePreview.src = "";
                document.querySelector(".preview-container").style.display = "none";
                editingPost = null;
                modalPostButton.textContent = "投稿";
                postModal.style.display = "none";
            };

            if (files.length > 0) {
                // ① 新しい画像が選択された場合
                const reader = new FileReader();
                reader.onload = () => {
                    editingPost.image = reader.result;
                    // 画像の読み込みが終わったら共通処理を実行
                    finalizeEdit();
                };
                reader.readAsDataURL(files[0]);
            } else {
                // ② 画像が新しく選択されなかった場合（テキストのみ変更、または既存画像を維持）
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

    localStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
    );
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
accountDiv.addEventListener("click", () => {
    if (currentAccount === account) {
        // 同じアカウントなら何もしない
    } else {
        const targetIndex = accounts.indexOf(account);
        currentAccount = account;
        localStorage.setItem("currentAccount", currentAccount);

        renderAccounts();
        renderTimeline();

        // 1. まず元の処理を呼び出して、いつも通りプロフィール画面を最新に更新する
        showProfile(); 

        // 2. その上で、横並びのステージをスライドさせる！
        const container = document.getElementById("profileContainer");
        if (container && profilePage.style.display !== "none") {
            // X（Twitter）方式でスライド！
            container.style.transform = `translateX(-${targetIndex * 100}%)`;
        }
    }
});
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

    addButton.addEventListener(
        "click",
        () => {

            const name =
                prompt(
                    "アカウント名を入力してください"
                );

            if (!name) return;

            accounts.push(name);

            localStorage.setItem(
                "accounts",
                JSON.stringify(accounts)
            );

            renderAccounts();
        }
    );

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

        if (
            postData.pinned
        ) {

            postData.pinned =
                false;

            savePostToDB(
                postData
            );

        } else {

            posts.forEach(
                post => {

                    if (
                        post.account ===
                        currentAccount
                    ) {

                        post.pinned =
                            false;

                        savePostToDB(
                            post
                        );
                    }
                }
            );

            postData.pinned =
                true;

            savePostToDB(
                postData
            );
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

        openPostDetail(
            postData
        );

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

            if (
                postData.likedBy.includes(
                    currentAccount
                )
            ) {

                postData.likedBy =
                    postData.likedBy.filter(
                        account =>
                            account !==
                            currentAccount
                    );

                postData.likes--;

            } else {

                postData.likedBy.push(
                    currentAccount
                );

                postData.likes++;

            }

            savePostToDB(
                postData
            );

            renderTimeline();

            renderProfilePosts();
        }
    );
} // ← この閉じカッコの下！

if (commentButton) {


}

if (editButton) {

editButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

const profile =
    profiles[currentAccount] || {};

postUserIcon.src =
    profile.icon ||
    "https://via.placeholder.com/60";

editingPost = postData;

modalPostInput.value =
    postData.text;

if (postData.image) {

    postImagePreview.src =
        postData.image;

   document.querySelector(
    ".preview-container"
).style.display =
    "block";
} else {

  document.querySelector(
    ".preview-container"
).style.display =
    "none";
}

editProfileModal.style.display =
    "none";

postModal.style.display =
    "block";

modalPostButton.textContent =
    "保存";

postModal.style.display = "block";

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

            const result =
                confirm(
                    "この投稿を削除しますか？"
                );

            if (!result) return;

            const index =
                posts.indexOf(
                    postData
                );

            if (
                index !== -1
            ) {

              posts.splice(
    index,
    1
);

const transaction =
    db.transaction(
        ["posts"],
        "readwrite"
    );

const store =
    transaction.objectStore(
        "posts"
    );

store.delete(
    postData.id
);

renderTimeline();

renderProfilePosts();
            }
        }
    );

const images =
    post.querySelectorAll(
        ".clickable-image"
    );

images.forEach(
    image => {

        image.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                modalImage.src =
                    image.src;

                imageModal.style.display =
                    "flex";

            }
        );

    }
);

const video =
    post.querySelector(
        ".post-video"
    );

if (video) {

    video.addEventListener(
        "click",
        () => {

            modalVideo.src =
                video.querySelector(
                    "source"
                ).src;

            videoModal.style.display =
                "flex";
        }
    );
}

    container.appendChild(post);
}

function renderTimeline() {

    timeline.innerHTML = "";

   const sortedPosts =
    [...posts]
    .sort(
        (a, b) =>
            b.time - a.time
    );

    for (const post of sortedPosts) {

        addPostToTimeline(
            post,
            timeline
        );
    }
}

function renderProfilePosts() {

    profileTimeline.innerHTML =
        "";

 let targetPosts;

if (
    profileMode === "posts"
) {

    targetPosts =
        posts.filter(
            post =>
                post.account ===
                currentAccount
        );

} else {

    targetPosts =
        posts.filter(
            post =>

                post.likedBy &&

                post.likedBy.includes(
                    currentAccount
                )
        );
}

const sortedPosts =
    [...targetPosts]
        .sort(
            (a, b) => {

                if (
                    (a.pinned || false) !==
                    (b.pinned || false)
                ) {
                    return (
                        (b.pinned || false) -
                        (a.pinned || false)
                    );
                }

                return (
                    b.time -
                    a.time
                );
            }
        );

    for (const post of sortedPosts) {

        addPostToTimeline(
            post,
            profileTimeline
        );
    }
}
function showProfile() {

    const profile =
        profiles[currentAccount] || {};

   profileName.textContent =
    profile.name ||
    currentAccount;
    profileId.textContent =
        "@" +
        (
            profile.id ||
            "userid"
        );

    profileBio.textContent =
        profile.bio ||
        "プロフィール未設定";
const userPosts =
    posts.filter(
        post =>
            post.account ===
            currentAccount
    );

postCount.textContent =
    userPosts.length + " 件の投稿";
    followingCount.textContent =
    "0 フォロー中";

followerCount.textContent =
    "0 フォロワー";

    const count =
        posts.filter(
            post =>
                post.account ===
                currentAccount
        ).length;

    postCount.textContent =
        "投稿数 " + count;

    profileIcon.src =
        profile.icon ||
        "https://via.placeholder.com/100";

    headerImage.src =
        profile.header || "";

    renderProfilePosts();

    timeline.style.display =
        "none";

    profilePage.style.display =
        "block";
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

postModal.style.display =
    "block";

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

        // ===== 編集 =====

if (editingPost) {
            editingPost.text = text;

            const files = [...postImageUpload.files];

            // 共通の終了処理（保存が完全に終わってから画面を動かす）
            const finalizeEdit = () => {
                const transaction = db.transaction(["posts"], "readwrite");
                const store = transaction.objectStore("posts");
                const request = store.put(editingPost);

                request.onsuccess = () => {
                    // 最新データをデータベースから再読み込みして画面を更新
                    loadPosts();

                    // 各種入力欄やモーダルのリセット
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

        // ===== 新規投稿 =====

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

const request =
    indexedDB.open(
        "MyMemoDB",
        1
    );

request.onupgradeneeded =
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

request.onsuccess =
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

    const request =
        store.put(post);

    request.onsuccess =
        () => {
            // 保存が成功したら、最新のデータをデータベースから読み直す
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

    const request =
        store.getAll();

    request.onsuccess =
        () => {
        posts =
            request.result;

        // データベースから読み込みが終わったタイミングで、両方のタイムラインを更新する
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

// コメントの✕ボタン（delete-comment）がクリックされた時の処理
document.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete-comment");
    
    // クリックされたのがコメントの✕ボタン、かつ現在開いている詳細投稿データが存在する場合
    if (deleteButton && currentDetailPost) {
        e.stopPropagation();

        // ボタンの data-index から、何番目のコメントかを取得
        const commentIndex = parseInt(deleteButton.dataset.index);

        if (confirm("このコメントを削除してもよろしいですか？")) {
            const transaction = db.transaction(["posts"], "readwrite");
            const store = transaction.objectStore("posts");
            
            // ① 現在開いている詳細投稿の最新データをIndexedDBから取得
            const getRequest = store.get(currentDetailPost.id);

            getRequest.onsuccess = () => {
                const postData = getRequest.result;
                if (postData && postData.comments) {
                    
                    // ② コメント配列から、クリックされた番号のコメントを削除
                    postData.comments.splice(commentIndex, 1);

                    // ③ データベースへ上書き保存
                    const updateRequest = store.put(postData);

                    // ④ 保存が完全に完了したら画面を更新する
                    updateRequest.onsuccess = () => {
                        // グローバルな変数側のコメントデータも同期させる
                        currentDetailPost.comments = postData.comments;
                        
                        // タイムラインと、詳細画面のコメント一覧を再描画
                        loadPosts(); 
                        renderDetailComments();
                    };
                }
            };
        }
    }
});
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

            // ×を左にしたいので先に追加
            div.appendChild(
                deleteButton
            );

            div.appendChild(
                text
            );

            // 履歴を押したら検索
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

            // ×を押したら削除
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


window.addEventListener(
    "resize",
    setAppHeight
);

setAppHeight();