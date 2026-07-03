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

const floatingButtons =
    document.querySelector(".floating-buttons");

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

// 💡 タブが存在する場合のみイベントを登録（エラー防止）
if (postsTab) {
    postsTab.addEventListener(
        "click",
        () => {
            profileMode = "posts";
            postsTab.classList.add("active");
            if (likesTab) likesTab.classList.remove("active");
            renderProfilePosts();
        }
    );
}

if (likesTab) {
    likesTab.addEventListener(
        "click",
        () => {
            profileMode = "likes";
            likesTab.classList.add("active");
            if (postsTab) postsTab.classList.remove("active");
            renderProfilePosts();
        }
    );
}

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

if (detailCommentButton) {
    detailCommentButton.addEventListener(
        "click",
        () => {
            if (!currentDetailPost) return;
            if (detailCommentInput.value.trim() === "") return;

            if (!currentDetailPost.comments) {
                currentDetailPost.comments = [];
            }

            currentDetailPost.comments.push({
                account: currentAccount,
                text: detailCommentInput.value,
                time: Date.now()
            });

            savePostToDB(currentDetailPost);
            detailCommentInput.value = "";
            renderDetailComments();
            renderTimeline();
            renderProfilePosts();
        }
    );
}

if (editHeaderPreview) {
    editHeaderPreview.addEventListener(
        "click",
        () => {
            if (headerUpload) headerUpload.click();
        }
    );
}

if (editIconPreview) {
    editIconPreview.addEventListener(
        "click",
        () => {
            if (iconUpload) iconUpload.click();
        }
    );
}



const cancelProfileButton =
    document.getElementById(
        "cancelProfileButton"
    );

const saveProfileButton =
    document.getElementById(
        "saveProfileButton"
    );

// 💡 エラーの原因だった宣言なしのログを修正
console.log("cancel:", cancelProfileButton);
console.log("modal:", editProfileModal);

if (cancelProfileButton) {
    cancelProfileButton.addEventListener(
        "click",
        () => {
            if (editProfileModal) editProfileModal.style.display = "none";
        }
    );
}
 
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-profile-btn") || e.target.classList.contains("edit-header-button") || e.target.id === "editHeaderButton") {
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

if (saveProfileButton) {
    saveProfileButton.addEventListener(
        "click",
        () => {
            const profile = profiles[currentAccount] || {};

            if (editName) profile.name = editName.value;
            if (editId) profile.id = editId.value;
            if (editBio) profile.bio = editBio.value;
            profile.icon = tempIcon;
            profile.header = tempHeader;

            profiles[currentAccount] = profile;

            saveProfiles();
            showProfile();

            if (editProfileModal) editProfileModal.style.display = "none";
        }
    );
}

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

if (searchButton) {
    searchButton.addEventListener(
        "click",
        () => {
            if (timeline) timeline.style.display = "none";
            if (profilePage) profilePage.style.display = "none";
            if (postDetailPage) postDetailPage.style.display = "none";
            if (searchPage) searchPage.style.display = "block";

            if (searchInput) searchInput.value = "";
            if (searchResults) searchResults.innerHTML = "";

            renderSearchHistory();
        }
    );
}

if (backSearchButton) {
    backSearchButton.addEventListener(
        "click",
        () => {
            if (searchPage) searchPage.style.display = "none";
            if (timeline) timeline.style.display = "block";
        }
    );
}

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

if (profileHeaderImage) {
    profileHeaderImage.addEventListener(
        "click",
        () => {
            if (headerModalImage) headerModalImage.src = profileHeaderImage.src;
            if (headerModal) headerModal.style.display = "flex";
        }
    );
}

if (profileIcon) {
    profileIcon.addEventListener(
        "click",
        () => {
            if (headerModalImage) headerModalImage.src = profileIcon.src;
            if (headerModal) headerModal.style.display = "flex";
        }
    );
}

if (headerModal) {
    headerModal.addEventListener(
        "click",
        () => {
            headerModal.style.display = "none";
        }
    );
}

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

if (postImageUpload) {
    postImageUpload.addEventListener(
        "change",
        () => {
            const file = postImageUpload.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                if (postImagePreview) {
                    postImagePreview.src = reader.result;
                    postImagePreview.style.display = "block";
                }
                if (removePostImageButton) removePostImageButton.style.display = "inline-block";
            };
            reader.readAsDataURL(file);
        }
    );
}

if (removePostImageButton) {
    removePostImageButton.addEventListener(
        "click",
        () => {
            if (postImageUpload) postImageUpload.value = "";
            if (postImagePreview) {
                postImagePreview.src = "";
                postImagePreview.style.display = "none";
            }
            removePostImageButton.style.display = "none";

            if (editingPost) {
                editingPost.text = modalPostInput ? modalPostInput.value : "";
                const files = postImageUpload ? [...postImageUpload.files] : [];

                const finalizeEdit = () => {
                    const postIndex = posts.findIndex(p => p.id === editingPost.id);
                    if (postIndex !== -1) {
                        posts[postIndex] = editingPost;
                    }

                    savePostToDB(editingPost);
                    renderTimeline();
                    renderProfilePosts();

                    if (modalPostInput) modalPostInput.value = "";
                    if (postImageUpload) postImageUpload.value = "";
                    if (postImagePreview) postImagePreview.src = "";
                    
                    const previewCont = document.querySelector(".preview-container");
                    if (previewCont) previewCont.style.display = "none";
                    
                    editingPost = null;
                    if (modalPostButton) modalPostButton.textContent = "投稿";
                    if (postModal) postModal.style.display = "none";
                };

                if (files.length > 0) {
                    const reader = new FileReader();
reader.onload = () => {

    editingPost.images = [reader.result];
    delete editingPost.image;

    finalizeEdit();
};
                    reader.readAsDataURL(files[0]);
} else {

    editingPost.images = [];
    delete editingPost.image;

    finalizeEdit();
}
            }
        }
    );
}

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

let detailFrom = "timeline";
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

function saveAccounts() {
    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}

function formatTime(time) {
    if (!time) return "";
    const date = new Date(time);
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
    if (!accountsContainer) return;
    accountsContainer.innerHTML = "";

    for (const account of accounts) {
        const accountDiv = document.createElement("div");
        accountDiv.className = "account";

        if (account === currentAccount) {
            accountDiv.classList.add("selected-account");
        }

        const profile = profiles[account] || {};

        accountDiv.innerHTML = `
            <img
                class="account-icon"
                src="${profile.icon || "https://via.placeholder.com/60"}"
            >
        `;

        const handleAccountClick = (e) => {
            e.preventDefault();
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

        accountDiv.addEventListener("touchstart", handleAccountClick, { passive: false });
        accountDiv.addEventListener("click", handleAccountClick);
        accountsContainer.appendChild(accountDiv);
    }

    const addButton = document.createElement("div");
    addButton.className = "account";
    addButton.textContent = "＋";

    addButton.addEventListener("click", () => {
        const name = prompt("アカウント名を入力してください");
        if (!name) return;

        accounts.push(name);
        localStorage.setItem("accounts", JSON.stringify(accounts));

        initializeProfileRooms();
        renderAccounts();
        showProfile();
    });

    accountsContainer.appendChild(addButton);
}

function addPostToTimeline(postData, container) {
    if (!container) return;
    const post = document.createElement("div");
    post.className = "post";

    const profile = (profiles && profiles[postData.account]) ? profiles[postData.account] : {};

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
           <div class="post-text">
${
(postData.text || "")
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(
 /(https?:\/\/[^\s]+)/g,
 '<a href="$1" target="_blank">$1</a>'
)
.replace(/\n/g,"<br>")
}
</div>
            
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

    const pinButton = post.querySelector(".pin-button");
    if (pinButton) {
        pinButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if (postData.pinned) {
                postData.pinned = false;
                savePostToDB(postData);
            } else {
                posts.forEach(p => {
                    if (p.account === currentAccount) {
                        p.pinned = false;
                        savePostToDB(p);
                    }
                });
                postData.pinned = true;
                savePostToDB(postData);
            }
            renderTimeline();
            renderProfilePosts();
        });
    }

    const deleteButton = post.querySelector(".delete-button");
    const editButton = post.querySelector(".edit-button");
    const likeButton = post.querySelector(".like-button");
    const commentButton = post.querySelector(".comment-button");

    if (commentButton) {
        commentButton.addEventListener("click", (event) => {
            detailFrom = container.id === "profileTimeline"
    ? "profile"
    : "timeline";
            event.stopPropagation();
            openPostDetail(postData);
        });
    }

    if (likeButton) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if (!postData.likedBy) postData.likedBy = [];

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
        });
    }

    if (editButton) {
        editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const prof = profiles[currentAccount] || {};
            if (postUserIcon) postUserIcon.src = prof.icon || "https://via.placeholder.com/60";

            editingPost = postData;
            if (modalPostInput) modalPostInput.value = postData.text;

const prevContainer = document.querySelector(".preview-container");

if (postData.images && postData.images.length > 0) {

    if (postImagePreview) {
        postImagePreview.src = postData.images[0];
        postImagePreview.style.display = "block";
    }

    if (prevContainer) {
        prevContainer.style.display = "block";
    }

    if (removePostImageButton) {
        removePostImageButton.style.display = "inline-block";
    }

} else {

    if (postImagePreview) {
        postImagePreview.src = "";
        postImagePreview.style.display = "none";
    }

    if (prevContainer) {
        prevContainer.style.display = "none";
    }

    if (removePostImageButton) {
        removePostImageButton.style.display = "none";
    }

}

            if (editProfileModal) editProfileModal.style.display = "none";
            if (postModal) postModal.style.display = "block";
            if (modalPostButton) modalPostButton.textContent = "保存";

            requestAnimationFrame(() => {
                if (modalPostInput) modalPostInput.focus();
            });
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if (!confirm("この投稿を削除しますか？")) return;

            const index = posts.indexOf(postData);
            if (index !== -1) {
                posts.splice(index, 1);
                const transaction = db.transaction(["posts"], "readwrite");
                const store = transaction.objectStore("posts");
                store.delete(postData.id);

                renderTimeline();
                renderProfilePosts();
            }
        });
    }

    post.querySelectorAll(".clickable-image").forEach(image => {
        image.addEventListener("click", event => {
            event.stopPropagation();
            if (modalImage) modalImage.src = image.src;
            if (imageModal) imageModal.style.display = "flex";
        });
    });

    container.appendChild(post);
}

function renderTimeline() {
    if (!timeline) return;
    timeline.innerHTML = "";
    const sortedPosts = [...posts].sort((a, b) => b.time - a.time);
    for (const post of sortedPosts) {
        addPostToTimeline(post, timeline);
    }
}

function renderProfilePosts() {
    const targetIndex = accounts.indexOf(currentAccount);
    const rooms = document.querySelectorAll(".single-profile");
    const currentRoom = rooms[targetIndex];
    
    if (!currentRoom) return;
    const profTimeline = currentRoom.querySelector(".timeline") || currentRoom.querySelector("#profileTimeline");
    if (!profTimeline) return;

    profTimeline.innerHTML = "";

let targetPosts = [];

switch (profileMode) {

    case "posts":
        targetPosts = posts.filter(
            post => post.account === currentAccount
        );
        break;

    case "media":
        targetPosts = posts.filter(post =>
            post.account === currentAccount &&
            (
                (post.images && post.images.length > 0) ||
                post.image
            )
        );
        break;

    case "likes":
        targetPosts = posts.filter(post =>
            post.likedBy &&
            post.likedBy.includes(currentAccount)
        );
        break;

    case "replies":
        targetPosts = posts.filter(post =>
            post.comments &&
            post.comments.some(comment =>
                comment.account === currentAccount
            )
        );
        break;

    default:
        targetPosts = posts.filter(
            post => post.account === currentAccount
        );

}

    const sortedPosts = [...targetPosts].sort((a, b) => {
        if ((a.pinned || false) !== (b.pinned || false)) {
            return (b.pinned || false) - (a.pinned || false);
        }
        return b.time - a.time;
    });

    if (sortedPosts.length === 0) {
        profTimeline.innerHTML = `<div class="no-posts" style="text-align:center; padding:20px; color:#aaa;">${profileMode === "likes" ? "スキした投稿はありません" : "投稿はありません"}</div>`;
        return;
    }

    for (const post of sortedPosts) {
        addPostToTimeline(post, profTimeline);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeProfileRooms(); 
    renderAccounts();         

    if (timeline) timeline.style.display = "block";
    if (profilePage) profilePage.style.display = "none";
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

console.log(currentAccount);
console.log(profiles);
console.log(profiles[currentAccount]);

function showProfile() {

    const profile = profiles[currentAccount] || {};
    const userPosts = posts.filter(
        post => post.account === currentAccount
    );

    const container =
        document.getElementById("profileContainer");

    if (!container) return;

    const rooms =
        container.querySelectorAll(".single-profile");

    const currentIndex =
        accounts.indexOf(currentAccount);

    const room =
        rooms[currentIndex];

    if (!room) return;

    const headerImage =
        room.querySelector(".header-image");

    const profileIcon =
        room.querySelector(".profile-icon");

    const profileName =
        room.querySelector("#profileName");

    const profileId =
        room.querySelector("#profileId");

    const profileBio =
        room.querySelector("#profileBio");

    const postCount =
        room.querySelector("#postCount");

    const profileTimeline =
        room.querySelector("#profileTimeline");

    if (headerImage) {
        headerImage.src =
            profile.header || "";
    }

    if (profileIcon) {
        profileIcon.src =
            profile.icon ||
            "https://via.placeholder.com/60";
    }

    if (profileName) {
        profileName.textContent =
            profile.name || currentAccount;
    }

    if (profileId) {
        profileId.textContent =
            "@" + (profile.id || "userid");
    }

    if (profileBio) {
        profileBio.textContent =
            profile.bio || "プロフィール未設定";
    }

    if (postCount) {
        postCount.textContent =
            "投稿数 " + userPosts.length;
    }

    if (profileTimeline) {

        profileTimeline.innerHTML = "";

        const targetPosts =
            profileMode === "posts"

            ? userPosts

            : posts.filter(
                post =>
                    post.likedBy &&
                    post.likedBy.includes(currentAccount)
            );

        const sortedPosts =
            [...targetPosts].sort((a, b) => {

                if (
                    (a.pinned || false) !==
                    (b.pinned || false)
                ) {

                    return (
                        (b.pinned || false) -
                        (a.pinned || false)
                    );

                }

                return b.time - a.time;

            });

        if (sortedPosts.length === 0) {

            profileTimeline.innerHTML = `
                <div
                    class="no-posts"
                    style="
                        text-align:center;
                        padding:20px;
                        color:#aaa;
                    "
                >
                    ${
                        profileMode === "likes"
                        ? "スキした投稿はありません"
                        : "投稿はありません"
                    }
                </div>
            `;

        } else {

sortedPosts.forEach(post => {
    addPostToTimeline(post, profileTimeline);
});

        }

    }

container.style.transform =
    `translateX(-${currentIndex * 100}%)`;



if (timeline) {
    timeline.style.display = "none";
}

if (profilePage) {
    profilePage.style.display = "block";
}

}
if (postButton) {
    postButton.addEventListener(
        "click",
        () => {
            const profile = profiles[currentAccount] || {};
            if (postUserIcon) postUserIcon.src = profile.icon ||"default-icon.png"

            if (modalPostInput) modalPostInput.value = "";
            if (postImageUpload) postImageUpload.value = "";
            if (postImagePreview) postImagePreview.src = "";

            const prevContainer = document.querySelector(".preview-container");
            if (prevContainer) prevContainer.style.display = "none";

            editingPost = null;
            if (modalPostButton) modalPostButton.textContent = "投稿";
            if (postModal) postModal.style.display = "block";

            requestAnimationFrame(() => {
                if (modalPostInput) modalPostInput.focus();
            });
        }
    );
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
        if (postModal) postModal.style.display = "none";
    });
}

if (closeCommentButton) {
    closeCommentButton.addEventListener("click", () => {
        if (commentModal) commentModal.style.display = "none";
    });
}

if (sendCommentButton) {
    sendCommentButton.addEventListener(
        "click",
        () => {
            if (!currentCommentPost) return;
            if (commentInput && commentInput.value.trim() === "") return;

            if (!currentCommentPost.comments) {
                currentCommentPost.comments = [];
            }

            currentCommentPost.comments.push({
                account: currentAccount,
                text: commentInput.value,
                time: Date.now()
            });

            savePostToDB(currentCommentPost);
            renderComments();

            if (commentInput) commentInput.value = "";
            if (commentModal) commentModal.style.display = "none";

            renderTimeline();
            renderProfilePosts();
        }
    );
}

if (modalPostButton) {
    modalPostButton.addEventListener(
        "click",
        () => {
            const text = modalPostInput ? modalPostInput.value : "";
            if (text.trim() === "") return;

            if (editingPost) {
                editingPost.text = text;
                const files = postImageUpload ? [...postImageUpload.files] : [];

                const finalizeEdit = () => {
                    const transaction = db.transaction(["posts"], "readwrite");
                    const store = transaction.objectStore("posts");
                    const request = store.put(editingPost);

                    request.onsuccess = () => {
                        loadPosts();
                        if (modalPostInput) modalPostInput.value = "";
                        if (postImageUpload) postImageUpload.value = "";
                        if (postImagePreview) postImagePreview.src = "";
                        const prevCont = document.querySelector(".preview-container");
                        if (prevCont) prevCont.style.display = "none";
                        editingPost = null;
                        modalPostButton.textContent = "投稿";
                        if (postModal) postModal.style.display = "none";
                    };
                };

                if (files.length > 0) {
                    const reader = new FileReader();
reader.onload = () => {

    // images形式に統一
    editingPost.images = [reader.result];

    // 古いimageは削除
    delete editingPost.image;

    finalizeEdit();
};
                    reader.readAsDataURL(files[0]);
                } else {
                    finalizeEdit();
                }
                return;
            }

            const files = postImageUpload ? [...postImageUpload.files] : [];

            if (files.length > 0) {
                const newPost = {
                    account: currentAccount,
                    text: text,
                    images: [],
                    time: Date.now(),
                    likes: 0,
                    likedBy: [],
                    pinned: false
                };

                let loaded = 0;
                files.forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        newPost.images[index] = reader.result;
                        loaded++;

                        if (loaded === files.length) {
                            posts.push(newPost);
                            savePostToDB(newPost);

                            if (modalPostInput) modalPostInput.value = "";
                            if (postImageUpload) postImageUpload.value = "";
                            const prevCont = document.querySelector(".preview-container");
                            if (prevCont) prevCont.style.display = "none";
                            if (postModal) postModal.style.display = "none";
                        }
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                const newPost = {
                    account: currentAccount,
                    text: text,
                    image: null,
                    time: Date.now(),
                    likes: 0,
                    likedBy: [],
                    pinned: false
                };

                posts.push(newPost);
                savePostToDB(newPost);

                renderTimeline();
                if (modalPostInput) modalPostInput.value = "";
                if (postModal) postModal.style.display = "none";
            }
        }
    );
}

if (backButton) {
    backButton.addEventListener(
        "click",
        () => {
            if (profilePage) profilePage.style.display = "none";
            if (timeline) timeline.style.display = "block";
        }
    );
}

if (headerUpload) {
    headerUpload.addEventListener(
        "change",
        () => {
            const file = headerUpload.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                cropTarget = "header";
                if (cropImage) cropImage.src = reader.result;
                if (cropModal) cropModal.style.display = "block";

                if (cropImage) {
                    cropImage.onload = () => {
                        if (cropper) cropper.destroy();
                        cropper = new Cropper(cropImage, {
                            aspectRatio: 3,
                            viewMode: 1,
                            dragMode: "move",
                            cropBoxMovable: false,
                            cropBoxResizable: false
                        });
                    };
                }
            };
            reader.readAsDataURL(file);
        }
    );
}

if (iconUpload) {
    iconUpload.addEventListener(
        "change",
        () => {
            const file = iconUpload.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                cropTarget = "icon";
                if (cropImage) cropImage.src = reader.result;
                if (cropModal) cropModal.style.display = "block";

                if (cropImage) {
                    cropImage.onload = () => {
                        if (cropper) cropper.destroy();
                        cropper = new Cropper(cropImage, {
                            aspectRatio: 1,
                            viewMode: 1,
                            dragMode: "move",
                            cropBoxMovable: false,
                            cropBoxResizable: false
                        });
                    };
                }
            };
            reader.readAsDataURL(file);
        }
    );
}

if (cropCancelButton) {
    cropCancelButton.addEventListener(
        "click",
        () => {
            if (cropModal) cropModal.style.display = "none";
            if (cropper) {
                cropper.destroy();
                cropper = null;
                if (cropImage) cropImage.src = "";
            }
        }
    );
}

if (cropConfirmButton) {
    cropConfirmButton.addEventListener(
        "click",
        () => {
            if (!cropper) return;
            const canvas = cropper.getCroppedCanvas();
            const croppedImage = canvas.toDataURL("image/png");

            if (cropTarget === "icon") {
                tempIcon = croppedImage;
                if (editIconPreview) editIconPreview.src = croppedImage;
            }

            if (cropTarget === "header") {
                tempHeader = croppedImage;
                if (editHeaderPreview) editHeaderPreview.src = croppedImage;
            }

            cropper.destroy();
            cropper = null;
            if (cropModal) cropModal.style.display = "none";
        }
    );
}

if (imageModal) {
    imageModal.addEventListener("click", () => {
        imageModal.style.display = "none";
    });
}

if (videoModal) {
    videoModal.addEventListener("click", () => {
        if (modalVideo) modalVideo.pause();
        videoModal.style.display = "none";
    });
}

let db;
const indexedDBRequest = indexedDB.open("MyMemoDB", 1);

indexedDBRequest.onupgradeneeded = event => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("posts")) {
        db.createObjectStore("posts", { keyPath: "id", autoIncrement: true });
    }
};

indexedDBRequest.onsuccess = event => {
    db = event.target.result;
    loadPosts();
};

function savePostToDB(post) {
    if (!db) return;
    const transaction = db.transaction(["posts"], "readwrite");
    const store = transaction.objectStore("posts");
    const storeRequest = store.put(post);
    storeRequest.onsuccess = () => {
        loadPosts();
    };
}

function loadPosts() {
    if (!db) return;

    const transaction = db.transaction(["posts"], "readonly");
    const store = transaction.objectStore("posts");
    const storeRequest = store.getAll();

    storeRequest.onsuccess = () => {

        posts = storeRequest.result;

        renderTimeline();

        initializeProfileRooms();

        renderAccounts();

        renderProfilePosts();

        showProfile();

    };
}

if (deleteAccountButton) {
    deleteAccountButton.addEventListener(
        "click",
        () => {
            if (!confirm("このアカウントを削除しますか？")) return;

            delete profiles[currentAccount];
            accounts = accounts.filter(account => account !== currentAccount);

            posts.forEach(post => {
                if (post.likedBy) {
                    post.likedBy = post.likedBy.filter(account => account !== currentAccount);
                    post.likes = post.likedBy.length;
                }
            });

            posts = posts.filter(post => post.account !== currentAccount);

            saveAccounts();
            saveProfiles();
            savePosts();

            localStorage.setItem("currentAccountIndex", 0);

            if (accounts.length > 0) {
                currentAccount = accounts[0];
                localStorage.setItem("currentAccount", currentAccount);
                renderAccounts();
                renderTimeline();
                showProfile();
            } else {
                localStorage.removeItem("currentAccount");
                renderAccounts();
                if (timeline) timeline.innerHTML = "";
                if (profilePage) profilePage.style.display = "none";
            }
        }
    );
}

function renderComments() {
    if (!commentList) return;
    commentList.innerHTML = "";

    if (!currentCommentPost || !currentCommentPost.comments) return;

    for (const comment of currentCommentPost.comments) {
        const commentDiv = document.createElement("div");
        const profile = profiles[comment.account] || {};
        commentDiv.className = "comment";

        commentDiv.innerHTML = `
            <div class="comment-header">
                <img class="comment-icon" src="${profile.icon || "https://via.placeholder.com/40"}">
                <div class="comment-info">
                    <div class="comment-top">
                        <span class="comment-name">${profile.name || comment.account}</span>
                        <span class="comment-id">@${profile.id || "userid"}</span>
                        <span class="comment-time">${formatTime(comment.time)}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            </div>
        `;
        commentList.appendChild(commentDiv);
    }
}

function openPostDetail(postData) {
    currentDetailPost = postData;

    if (timeline) timeline.style.display = "none";
    if (profilePage) profilePage.style.display = "none";
    if (postDetailPage) postDetailPage.style.display = "block";

    if (floatingButtons) {
        floatingButtons.style.display = "none";
    }

    if (detailPost) detailPost.innerHTML = "";

    addPostToTimeline(postData, detailPost);
    renderDetailComments();
}

if (backFromDetailButton) {
    backFromDetailButton.addEventListener("click", () => {

        if (postDetailPage) {
            postDetailPage.style.display = "none";
        }

        if (floatingButtons) {
    floatingButtons.style.display = "flex";
}

        if (detailFrom === "profile") {

            if (profilePage) {
                profilePage.style.display = "block";
            }

            if (timeline) {
                timeline.style.display = "none";
            }

            // 今開いていたプロフィールを再表示
            showProfile();

        } else {

            if (timeline) {
                timeline.style.display = "block";
            }

            if (profilePage) {
                profilePage.style.display = "none";
            }

        }

    });
}

function renderDetailComments() {
    if (!detailPost) return;
    const oldComments = detailPost.querySelector(".post-comments");
    if (oldComments) oldComments.remove();

    if (!currentDetailPost || !currentDetailPost.comments || currentDetailPost.comments.length === 0) return;

    const postCard = detailPost.querySelector(".post");
    if (!postCard) return;

    const commentBox = document.createElement("div");
    commentBox.className = "post-comments";

    currentDetailPost.comments.forEach((comment, index) => {
        const profile = profiles[comment.account] || {};
        const div = document.createElement("div");
        div.className = "post-comment";

        div.innerHTML = `
            <img class="comment-icon" src="${profile.icon || "https://via.placeholder.com/40"}">
            <div class="comment-body">
                <div class="comment-header">
                    <div>
                        <span class="comment-name">${profile.name || comment.account}</span>
                        <span class="comment-id">@${profile.id || "userid"}</span>
                        <div class="comment-time">${formatTime(comment.time)}</div>
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
        commentBox.appendChild(div);
    });

    commentBox.querySelectorAll(".edit-comment").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = btn.getAttribute("data-index");
            const comment = currentDetailPost.comments[index];
            
            const newText = prompt("コメントを編集します:", comment.text);
            if (newText === null || newText.trim() === "") return;
            
            comment.text = newText;
            savePostToDB(currentDetailPost);
            renderDetailComments();
            renderTimeline();
            renderProfilePosts();
        });
    });

    commentBox.querySelectorAll(".delete-comment").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!confirm("このコメントを削除しますか？")) return;
            
            const index = btn.getAttribute("data-index");
            currentDetailPost.comments.splice(index, 1);
            
            savePostToDB(currentDetailPost);
            renderDetailComments();
            renderTimeline();
            renderProfilePosts();
        });
    });

    postCard.appendChild(commentBox);
}

function renderSearchHistory() {
    if (!searchHistory) return;
    searchHistory.innerHTML = "";

    searchHistoryData.forEach(word => {
        const div = document.createElement("div");
        div.className = "history-item";

        const text = document.createElement("span");
        text.textContent = word;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "×";
        deleteButton.className = "history-delete";

        div.appendChild(deleteButton);
        div.appendChild(text);

        div.addEventListener("click", () => {
            if (searchInput) searchInput.value = word;
            searchPosts(word);
        });

        deleteButton.addEventListener("click", event => {
            event.stopPropagation();
            searchHistoryData = searchHistoryData.filter(item => item !== word);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryData));
            renderSearchHistory();
        });

        searchHistory.appendChild(div);
    });
}

// 💡 日付検索機能を組み込んだ最新の searchPosts
function searchPosts(keyword) {
    if (!searchResults) return;
    searchResults.innerHTML = "";

    if (keyword.trim() === "") {
        renderSearchHistory();
        return;
    }

    let result = [];
    const cleanWord = keyword.trim();

    // 💡 カッコ「()」で囲まれているかチェックする（全角の（）にも対応）
    const isDateSearch = (cleanWord.startsWith("(") && cleanWord.endsWith(")")) || 
                         (cleanWord.startsWith("（") && cleanWord.endsWith("）"));

    if (isDateSearch) {
        const dateString = cleanWord.slice(1, -1).trim(); 
        
        result = posts.filter(post => {
            if (!post.time) return false;
            
            const postDate = new Date(post.time);
            const year = postDate.getFullYear();
            const month = String(postDate.getMonth() + 1).padStart(2, "0");
            const day = String(postDate.getDate()).padStart(2, "0");

            const ymd = `${year}/${month}/${day}`; // 例: "2026/06/24"
            const ym = `${year}/${month}`;         // 例: "2026/06"

            return ymd.startsWith(dateString) || ym === dateString;
        });
    } else {
        result = posts.filter(post =>
            post.text && post.text.toLowerCase().includes(cleanWord.toLowerCase())
        );
    }

    if (result.length === 0) {
        searchResults.innerHTML = `<div style="text-align:center; padding:20px; color:#aaa;">該当する投稿はありません</div>`;
        return;
    }

    result.forEach(post => {
        addPostToTimeline(post, searchResults);
    });
}

if (searchInput) {
    searchInput.addEventListener(
        "keydown",
        event => {
            if (event.key !== "Enter") return;

            const keyword = searchInput.value.trim();
            if (keyword === "") return;

            if (!Array.isArray(searchHistoryData)) {
                searchHistoryData = [];
            }

            searchHistoryData = searchHistoryData.filter(item => item !== keyword);
            searchHistoryData.unshift(keyword);

            if (searchHistoryData.length > 10) {
                searchHistoryData.pop();
            }

            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryData));
            renderSearchHistory();
            searchPosts(keyword);
            
            searchInput.blur();
        }
    );

    searchInput.addEventListener(
        "input",
        () => {
            searchPosts(searchInput.value);
        }
    );
}

function setAppHeight() {
    document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
    );
}

function initializeProfileRooms() {
    const container = document.getElementById("profileContainer");
    if (!container) return;

    container.innerHTML = "";
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
    <button class="profile-tab active" data-mode="posts">投稿</button>
    <button class="profile-tab" data-mode="replies">返信</button>
    <button class="profile-tab" data-mode="media">メディア</button>
    <button class="profile-tab" data-mode="likes">スキ</button>
</div>
            <div class="timeline" id="profileTimeline"></div>
        `;

// 4つのタブをそれぞれ取得
        const pTab = newRoom.querySelector(".room-posts-tab") || newRoom.querySelector("[data-mode='posts']");
        const rTab = newRoom.querySelector(".room-replies-tab") || newRoom.querySelector("[data-mode='replies']");
        const mTab = newRoom.querySelector(".room-media-tab") || newRoom.querySelector("[data-mode='media']");
        const lTab = newRoom.querySelector(".room-likes-tab") || newRoom.querySelector("[data-mode='likes']");

        // すべてのタブを配列にまとめて、クリック時の共通処理を作ります
        const allTabs = [pTab, rTab, mTab, lTab];

        allTabs.forEach(tab => {
            if (!tab) return; // ボタンが存在しない場合はスキップ

            tab.addEventListener("click", (e) => {
                // 1. クリックされたボタンに応じてモードを切り替える
                if (tab === pTab) profileMode = "posts";
                if (tab === rTab) profileMode = "replies";
                if (tab === mTab) profileMode = "media";
                if (tab === lTab) profileMode = "likes";

                // 2. すべてのタブから一回 "active" クラスを消す
                allTabs.forEach(t => { if (t) t.classList.remove("active"); });

                // 3. クリックされたタブだけに "active" をつける
                tab.classList.add("active");

                // 4. 再描画する
                if (typeof renderProfilePosts === "function") {
                    renderProfilePosts();// renderProfilePosts();
                }
            });
        });

        const deleteButton = newRoom.querySelector(".deleteAccountButton");

deleteButton.addEventListener("click", () => {

    if (!confirm("このアカウントを削除しますか？")) return;

    delete profiles[currentAccount];
    accounts = accounts.filter(acc => acc !== currentAccount);

    saveAccounts();
    saveProfiles();

    if (accounts.length > 0) {
        currentAccount = accounts[0];
        localStorage.setItem("currentAccount", currentAccount);

        initializeProfileRooms();
        renderAccounts();
        renderTimeline();
        showProfile();
    } else {
        profilePage.style.display = "none";
    }

});

        container.appendChild(newRoom);
    });
}

window.addEventListener("resize", setAppHeight);
setAppHeight();
renderAccounts();