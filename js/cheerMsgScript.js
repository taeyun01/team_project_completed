import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC55DiwDHYqn-UDSByfTGIlXOX0wxmKg9w",
  authDomain: "teamproject-bea46.firebaseapp.com",
  projectId: "teamproject-bea46",
  storageBucket: "teamproject-bea46.appspot.com",
  messagingSenderId: "144679276817",
  appId: "1:144679276817:web:6b776b3e6fdffa90eabcb0",
  measurementId: "G-Q4B1JB11YB",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const reviewRef = collection(db, "Cheering message");
let reviewList = [];

getDocs(reviewRef).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let reviewData = {
      id: doc.id,
      name: doc.data().name,
      comment: doc.data().comment,
    };
    reviewList.push(reviewData);
  });
  displayReviews(reviewList);
});

function displayReviews(reviewList) {
  let order = true;
  reviewList.forEach(function (review) {
    const className = order ? "yours" : "mine";
    const temp_html = `<div class="${className} messages" data-id="${review.id}"> 
              <div class="message last">
                  <h3 class="name">${review.name}</h3>
                  <p class="text">${review.comment}</p>
              </div>
              <div class="buttons">
                  <input type="button" class="editButton btn btn-light btn-sm" value="수정"/> 
                  <input type="button" class="deleteButton btn btn-light btn-sm" value="삭제"/>
              </div>
          </div>`;
    $(".review").append(temp_html);
    order = !order;
  });
}

// 수정 버튼
const editButtonClick = function () {
  const messageDiv = $(this).closest(".messages");
  const textDiv = messageDiv.find(".text");
  const newText = prompt("수정할 내용을 입력하세요", textDiv.text());
  const messageId = messageDiv.data("id");

  if (newText !== null && newText.trim() !== "") {
    textDiv.text(newText);
    const docRef = doc(db, "Cheering message", messageId);
    updateDoc(docRef, {
      comment: newText,
    });
    alert("수정되었습니다.");
  } else {
    alert("내용을 입력하세요.");
  }
};
$(document).on("click", ".editButton", editButtonClick);

// 삭제 버튼
const deleteButtonClick = function () {
  const messageDiv = $(this).closest(".messages");
  const messageId = messageDiv.data("id");

  if (confirm("응원글을 정말 삭제하시겠습니까?")) {
    const docRef = doc(db, "Cheering message", messageId);
    deleteDoc(docRef);
    messageDiv.remove();
    alert("삭제되었습니다.");
  }
};
$(document).on("click", ".deleteButton", deleteButtonClick);
