// eslint-disable-next-line no-undef
var socket = io.connect('http://localhost:4000');

const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const button = document.querySelector('#theSendButton');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value 
    });
    feedback.innerHTML = '';
});

socket.on('chat', (data) => {
    output.innerHTML += `<p><em>
    ${data.handle}:</em> ${data.message}
    </p>`;
});

handle.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is now typing</em></p>`;
});