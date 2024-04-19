/**
 * 스크롤 시 한 섹션씩 전환되는 로직
 */
const wrap = document.getElementsByClassName("content_wrapper")[0];

const DEFAULT_PAGENUMBER = 4;
const LAST_PAGENUMBER = DEFAULT_PAGENUMBER - 1;
let isAnimating = false;
let page = 0;

const handleScroll = (e) => {
  e.preventDefault();
  if (!isAnimating) {
    if (e.deltaY > 0) {
      page++;
    } else if (e.deltaY < 0) {
      page--;
    }

    if (page < 0) {
      page = 0;
    } else if (page > LAST_PAGENUMBER) {
      page = LAST_PAGENUMBER;
    }
    wrap.style.top = page * -100 + "dvh";
    wrap.style.transition = "top 0.5s ease";
    isAnimating = true;

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
};

window.addEventListener("wheel", handleScroll, { passive: false });

/**
 * 윤기준 JS
 */
let teammateArr = [];
for (let i = 1; i <= 6; i++) {
  teammateArr.push(document.getElementById("teammate" + "0" + i.toString()));
}
const [TEAMMATE01, TEAMMATE02, TEAMMATE03, TEAMMATE04, TEAMMATE05, TEAMMATE06] = teammateArr;

let teammateModalArr = [];
for (let i = 1; i <= 6; i++) {
  teammateModalArr.push(document.getElementById("teammateModal" + "0" + i.toString()));
}
const [TEAMMATE01_MODAL, TEAMMATE02_MODAL, TEAMMATE03_MODAL, TEAMMATE04_MODAL, TEAMMATE05_MODAL, TEAMMATE06_MODAL] =
  teammateModalArr;

let teammateModalExitBtnArr = [];
for (let i = 1; i <= 6; i++) {
  teammateModalExitBtnArr.push(document.getElementById("modalExitBtn" + "0" + i.toString()));
}
const [
  TEAMMATE01_MODAL_EXIT_BTN,
  TEAMMATE02_MODAL_EXIT_BTN,
  TEAMMATE03_MODAL_EXIT_BTN,
  TEAMMATE04_MODAL_EXIT_BTN,
  TEAMMATE05_MODAL_EXIT_BTN,
  TEAMMATE06_MODAL_EXIT_BTN,
] = teammateModalExitBtnArr;

const showProfile01 = () => {
  TEAMMATE01_MODAL.style.display = "block";
  window.removeEventListener("wheel", handleScroll);
};
const showProfile02 = () => {
  TEAMMATE02_MODAL.style.display = "block";
  window.removeEventListener("wheel", handleScroll);
};
const showProfile03 = () => {
  TEAMMATE03_MODAL.style.display = "block";
  window.removeEventListener("wheel", handleScroll);
};
const showProfile04 = () => {
  TEAMMATE04_MODAL.style.display = "block";
  window.removeEventListener("wheel", handleScroll);
};
const showProfile05 = () => {
  TEAMMATE05_MODAL.style.display = "block";
  window.removeEventListener("wheel", handleScroll);
};
const showProfile06 = () => {
  TEAMMATE06_MODAL.style.display = "block";
  window.removeEventListener("wheel", handleScroll);
};

const exitModal01 = (event) => {
  let exitTargetModal = event.target.parentElement.parentElement;
  exitTargetModal.style.display = "none";
  window.addEventListener("wheel", handleScroll, { passive: false });
};
const exitModal02 = (event) => {
  let exitTargetModal = event.target.parentElement.parentElement;
  exitTargetModal.style.display = "none";
  window.addEventListener("wheel", handleScroll, { passive: false });
};
const exitModal03 = (event) => {
  let exitTargetModal = event.target.parentElement.parentElement;
  exitTargetModal.style.display = "none";
  window.addEventListener("wheel", handleScroll, { passive: false });
};
const exitModal04 = (event) => {
  let exitTargetModal = event.target.parentElement.parentElement;
  exitTargetModal.style.display = "none";
  window.addEventListener("wheel", handleScroll, { passive: false });
};
const exitModal05 = (event) => {
  let exitTargetModal = event.target.parentElement.parentElement;
  exitTargetModal.style.display = "none";
  window.addEventListener("wheel", handleScroll, { passive: false });
};
const exitModal06 = (event) => {
  let exitTargetModal = event.target.parentElement.parentElement;
  exitTargetModal.style.display = "none";
  window.addEventListener("wheel", handleScroll, { passive: false });
};

TEAMMATE01.addEventListener("click", showProfile01);
TEAMMATE02.addEventListener("click", showProfile02);
TEAMMATE03.addEventListener("click", showProfile03);
TEAMMATE04.addEventListener("click", showProfile04);
TEAMMATE05.addEventListener("click", showProfile05);
TEAMMATE06.addEventListener("click", showProfile06);

TEAMMATE01_MODAL_EXIT_BTN.addEventListener("click", exitModal01);
TEAMMATE02_MODAL_EXIT_BTN.addEventListener("click", exitModal02);
TEAMMATE03_MODAL_EXIT_BTN.addEventListener("click", exitModal03);
TEAMMATE04_MODAL_EXIT_BTN.addEventListener("click", exitModal04);
TEAMMATE05_MODAL_EXIT_BTN.addEventListener("click", exitModal05);
TEAMMATE06_MODAL_EXIT_BTN.addEventListener("click", exitModal06);

/** Firebase 불러오기, 설정 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC55DiwDHYqn-UDSByfTGIlXOX0wxmKg9w",
  authDomain: "teamproject-bea46.firebaseapp.com",
  projectId: "teamproject-bea46",
  storageBucket: "teamproject-bea46.appspot.com",
  messagingSenderId: "144679276817",
  appId: "1:144679276817:web:6b776b3e6fdffa90eabcb0",
  measurementId: "G-Q4B1JB11YB",
  databaseURL: "https://teamproject-bea46-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/** 응원의 말 Input, button */
const cheerBtn = document.getElementsByClassName("cheerMsgBtn")[0];
let cheerText = document.getElementById("msgInput");
let cheerAuthor = document.getElementById("name");
const logInPage = document.querySelector(".logInPage");

/** Input창 클릭 시, 유저인지 아닌지에 따라 로그인 창 */
cheerText.addEventListener("click", () => {
  if (!auth.currentUser) {
    logInPage.classList.add("active");
  }
});

/** 버튼 클릭 시 파이어 베이스에 등록 */
cheerBtn.addEventListener("click", () => {
  if (cheerText.value == "" || cheerAuthor.value == "") {
    alert("빈칸을 입력하세요.");
  } else {
    addDoc(collection(db, "Cheering message"), {
      name: cheerAuthor.value,
      comment: cheerText.value,
    }).then(() => {
      window.location.href = "cheerMsg.html";
    });
  }
});

/**
 * chatModal Content(Firebase Realtime Database 사용)
 */
const msgInput = document.getElementById("messageInput");
const msgButton = document.getElementById("messageSubmitButton");
let booleanState = false;
const app2 = firebase.initializeApp(firebaseConfig);
let database = firebase.database();

//DB에서 실시간으로 채팅 가져옴
database.ref("messages").on("child_added", (snapshot) => {
  const messageData = snapshot.val();
  const message = messageData.message;

  addMessage(message, booleanState);
  booleanState = !booleanState;
});

// 메세지 쓰기 함수
function writeData(msg) {
  let messageData = firebase.database().ref("messages").push();
  messageData.set({
    message: msg,
  });
}

function addMessage(message, ownMessage) {
  let messageElement = document.createElement("div");
  messageElement.textContent = message;
  if (ownMessage) {
    messageElement.classList.add("myMessage");
  } else {
    messageElement.classList.add("yourMessage");
  }
  if (messageElement.textContent.trim() !== "") {
    chatBoard.appendChild(messageElement);
  }
  chatBoard.scrollTop = chatBoard.scrollHeight;
}

msgInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const message = msgInput.value;
    writeData(message);
    msgInput.value = "";
  }
});

msgButton.addEventListener("click", function (e) {
  const message = msgInput.value;
  writeData(message);
  msgInput.value = "";
});

// chatModal 여닫기
const openChatBtn = document.getElementById("openChatBoard");
const closeBtn = document.getElementById("closeBtn");
const chatModal = document.getElementById("board");
let modalOpened = false;

function toggleModal() {
  chatModal.classList.toggle("active");
}

openChatBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleModal();
  }
});
