document.addEventListener('DOMContentLoaded', function () {
    var reviewForm = document.querySelector('form');
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        alert('Your review is edited successfully!');

        window.history.back();;
    });
});