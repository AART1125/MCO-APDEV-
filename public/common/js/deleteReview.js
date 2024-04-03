document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    var deleteForm = document.getElementById('deleteReviewForm');

    if (!deleteForm) {
        console.error("Review form element not found");
        return;
    }

    deleteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var restoname = document.getElementById("hiddenval").value; 
        var reviewId = document.getElementById("hiddenrev").value; 

        var confirmed = window.confirm("Are you sure you want to delete this review?");
        if (confirmed) {
            // Proceed with deletion
            fetch(`/restaurant/${restoname}/delete-reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reviewId: reviewId,
                    restoname: restoname
                })
            })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    window.location.href = '/restaurant/' + restoname;
                } else {
                    console.error('Failed to delete review');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
    var cancelBtn = document.getElementById('cancel');

    if (!cancelBtn) {
        console.error("Cancel button element not found");
        return;
    }

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.history.back();
    });
});
