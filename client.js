const socket = io("https://chatsapp-zq48.onrender.com");


const form = document.getElementById("send-form");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".msg-area");
var style_class1 = [
  "clear-both",
  "bg-slate-300",
  "p-2",
  "my-3",
  "mx-3",
  "border-2",
  "border-solid",
  "border-slate-950",
  "rounded-lg",
];

let msg = new Audio("./public/sounds/msgsend.mp3");
let notify = new Audio("./public/sounds/notification.mp3");
let userJoinLeft = new Audio("./public/sounds/join&left.mp3");

const appendtext = (message, pos) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  if (pos === "left") {
    messageElement.classList.add("float-left");
    messageElement.classList.add(...style_class1);
    messageContainer.append(messageElement);
  }
  if (pos === "right") {
    messageElement.classList.add("float-right");
    messageElement.classList.add(...style_class1);
    messageContainer.append(messageElement);
    
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendtext(`You:${message}`, "right");
  msg.play();
  socket.emit("send", message);
  messageInput.value = "";
});
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  
    appendtext(`${name} joined the chat`, "right");
    userJoinLeft.play();

});

socket.on("receive", (data) => {
  appendtext(`${data.name}: ${data.message}`, "left");
  notify.play();
});


socket.on("left", (name) => {
 
    appendtext(`${name} left the chat`, "left");
    userJoinLeft.play();
  
});

