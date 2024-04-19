const body = document.querySelector("body");

const headerLoginBtn = document.querySelector(".headerLoginBtn"); // 헤더부분 로그인 버튼

const logInPage = document.querySelector(".logInPage"); // 로그인 페이지
const signUpPage = document.querySelector(".signUpPage"); // 회원가입 페이지

const logInModalBox = document.querySelector(".logInModalBox"); // 로그인 모달창
const signUpModalBox = document.querySelector(".signUpModalBox"); // 회원가입 모달창

const logInModalClose = document.querySelector(".logInModalClose"); // 로그인창 닫기
const signUpModalClose = document.querySelector(".signUpModalClose"); // 회원가입창 닫기

const logInPageButton = document.querySelector("#logInPageButton"); // 로그인 하러가기 버튼
const signUpPageButton = document.querySelector("#signUpPageButton"); // 회원가입 하러가기 버튼

const signUpEmaildAlert = document.querySelector(".signUpEmaildAlert"); // 이메일 중복 경고
const signUpPasswordAlert = document.querySelector(".signUpPasswordAlert"); // 패스워드 컨펌 경고
const signUpEmailEmptyAlert = document.querySelector(".signUpEmailEmptyAlert"); // 패스워드 컨펌 경고

const logInEmail = document.getElementById("logInEmail"); // 로그인 이메일
const logInPassword = document.getElementById("logInPassword");

const signUpEmail = document.getElementById("signUpEmail"); // 회원가입 이메일 값
const signUpPassword = document.getElementById("signUpPassword"); // 회원가입 비번 값
const signUpConfirmPassword = document.getElementById("signUpConfirmPassword"); // 회원가입 비번 확인 값

const logOutBox = document.querySelector(".logOutBox"); // 로그아웃 박스
const loginIdPasswordAlert = document.querySelector(".loginIdPasswordAlert"); // 로그인 id,pw 확인 경고

// 로그인 클릭 시 로그인 모달창 열기
headerLoginBtn.addEventListener("click", () => {
  logInPage.classList.add("active");
});

// 회원가입 모달창 닫기
signUpModalClose.addEventListener("click", () => {
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpConfirmPassword.value = "";
  signUpPage.classList.remove("active");
  signUpEmaildAlert.classList.remove("active");
  signUpPasswordAlert.classList.remove("active");
  signUpEmailEmptyAlert.classList.remove("active");
});

// 로그인 모달창 닫기
logInModalClose.addEventListener("click", () => {
  logInEmail.value = "";
  logInPassword.value = "";
  logInPage.classList.remove("active");
  signUpEmaildAlert.classList.remove("active");
  signUpPasswordAlert.classList.remove("active");
  loginIdPasswordAlert.classList.remove("active");
});

// 회원가입 모달창 밖을 눌렀을때도 닫기
signUpPage.addEventListener("mouseup", (e) => {
  // 마우스를 눌렀을때 모달창 요소가 없으면 닫기
  if (!signUpModalBox.contains(e.target)) {
    signUpEmail.value = "";
    signUpPassword.value = "";
    signUpConfirmPassword.value = "";
    signUpPage.classList.remove("active");
    signUpEmaildAlert.classList.remove("active");
    signUpPasswordAlert.classList.remove("active");
    signUpEmailEmptyAlert.classList.remove("active");
  }
});

// 로그인 모달창 밖을 눌렀을때도 닫기
logInPage.addEventListener("mouseup", (e) => {
  if (!logInModalBox.contains(e.target)) {
    logInEmail.value = "";
    logInPassword.value = "";
    logInPage.classList.remove("active");
    signUpEmaildAlert.classList.remove("active");
    signUpPasswordAlert.classList.remove("active");
    loginIdPasswordAlert.classList.remove("active");
  }
});

// 로그인 하러가기 버튼 실행
logInPageButton.addEventListener("click", (e) => {
  e.preventDefault();
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpConfirmPassword.value = "";
  signUpPage.classList.remove("active");
  signUpEmaildAlert.classList.remove("active");
  signUpPasswordAlert.classList.remove("active");
  loginIdPasswordAlert.classList.remove("active");
  signUpEmailEmptyAlert.classList.remove("active");
  logInPage.classList.add("active");
});

// 회원가입 하러가기 버튼 실행
signUpPageButton.addEventListener("click", (e) => {
  e.preventDefault();
  logInEmail.value = "";
  logInPassword.value = "";
  logInPage.classList.remove("active");
  signUpEmaildAlert.classList.remove("active");
  signUpPasswordAlert.classList.remove("active");
  loginIdPasswordAlert.classList.remove("active");
  signUpPage.classList.add("active");
});
