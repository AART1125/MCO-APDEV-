document.addEventListener('DOMContentLoaded', function () {
    var reviewForm = document.querySelector('form');
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get the textarea value
        var reviewText = document.querySelector('textarea').value;
        // Check if review is not empty
        if (reviewText.trim() === '') { // If empty
            alert('Please provide a review before submitting.');
            return;
        } // If not empty
        alert('Your review is submitted successfully!');
        // Redirect to another webpage if review is submitted successuflly
        window.location.href = 'Establishments.html';
    });
});