document.addEventListener('DOMContentLoaded', function () {
    var reviewForm = document.querySelector('.text-header form');

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        var recommendationChecked = document.querySelector('input[name="recommendation"]:checked');
        var textReviewValue = document.querySelector('textarea[name="text-review"]').value.trim();
        
        if (!recommendationChecked || textReviewValue === '') {
            alert('Please fill out all required fields.');
            return; 
        }
        
        var formData = new FormData(reviewForm); 
        
        fetch(reviewForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Review submitted successfully');
                window.location.href = '/restaurant/' + encodeURIComponent(formData.get('resto-name')) + '/reviews';
            } else {
                console.error('Failed to submit review');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    var cancelBtn = document.querySelector('.btn.cancel');

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.history.back();
    });
});
