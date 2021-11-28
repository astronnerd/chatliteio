const socket = io('https://chat-lite-io.herokuapp.com/');

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");
var newUserSound = new Audio('new_user_sound.wav');
var notificationSound = new Audio('notification_sound.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left') {
        notificationSound.play();
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const name = prompt("Enter you name to join");
socket.emit('newUserJoined', name);

socket.on('userJoined', name => {
    append(`${name} joined the chat!`, 'right')
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat.`, 'right');
});