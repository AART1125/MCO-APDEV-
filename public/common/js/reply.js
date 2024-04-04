document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Content Loaded");
    var replyForm = document.getElementById("replyform");

    if (!replyForm) {
        console.error("Reply form element not found");
        return;
    }

    replyForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        var textReplyValue = document.getElementById("reply").value;
        var restoname = document.getElementById("hiddenval").value; 
        var reviewId = document.getElementById("hiddenrev").value; 
        
        if (textReplyValue === '') {
            alert('You cannot submit an empty reply');
            return false; 
        }

        fetch(`/restaurant/${restoname}/post-replies`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reviewId: reviewId,
                restoname: restoname,
                textReply: textReplyValue 
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log('Reply submitted successfully');
                return response.json();
            } else {
                console.error('Failed to submit review');
                return Promise.reject(response)
            }
        }).then(data => {
            window.location.href = '/restaurant/' + document.getElementById("hiddenval").value;
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
