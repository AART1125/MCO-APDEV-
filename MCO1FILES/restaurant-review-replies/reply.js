window.onload = function () {
    document.body.style.zoom = "100%";
};

document.addEventListener('DOMContentLoaded', function () {
    var replyButton1 = document.getElementById('reply1');
    var cancelButton1 = document.getElementById('cancel-1');
    var sendButton1 = document.getElementById('send-1');
    var textarea1 = document.getElementById('reply-txtarea-1');

    replyButton1.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('reply-pop-up-1').style.display = 'block';

    })

    cancelButton1.addEventListener('click', function(event) {
        event.preventDefault();
        textarea1.value = "";
        document.getElementById('reply-pop-up-1').style.display = 'none';
    })

    sendButton1.addEventListener('click', function(event) {
        event.preventDefault();
        textarea1.value = "";
        document.getElementById('reply-pop-up-1').style.display = 'none';
    })
});

