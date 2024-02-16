document.addEventListener('DOMContentLoaded', function () {
    var reviewForm = document.querySelector('.text-header form');
    var submitBtn = document.querySelector('.btn.submit');
    var cancelBtn = document.querySelector('.btn.cancel');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        var recommendationValue = document.querySelector('input[name="recommendation"]:checked') ? document.querySelector('input[name="recommendation"]:checked').value : '';
        var textReviewValue = document.querySelector('textarea[name="text-review"]').value;

        alert('Your review is submitted successfully!');
        window.history.back();
    });

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.history.back();
    });
});