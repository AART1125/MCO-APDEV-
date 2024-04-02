document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Content Loaded");
    var reviewForm = document.getElementById("reviewform");

    if (!reviewForm) {
        console.error("Review form element not found");
        return;
    }

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        var recommendations = document.getElementsByName("recommendation");
        var checked = "";
        for(const reco of recommendations){
            if(reco.checked){
                checked = reco.value === "recommended";
                break;
            }
        }
        var textReviewValue = document.getElementById("review").value;
        var restoname = document.getElementById("hiddenval").value; 
        
        if (checked === "" || textReviewValue === '') {
            alert('Please fill out all required fields.' + checked);
            return false; 
        }

        var reviewId = window.location.pathname.split('/').pop();

        fetch(`/restaurant/${restoname}/editreview/${reviewId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isRecommend: checked,
                review: textReviewValue
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log('Review submitted successfully');
                window.location.href = '/restaurant/' + restoname;
            } else {
                console.error('Failed to submit review');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
