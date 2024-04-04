document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    var deleteForm = document.getElementById('deleteReplyForm');

    if (!deleteForm) {
        console.error("Reply form element not found");
        return;
    }

    deleteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var restoname = document.getElementById("hiddenval").value; 
        var replyId = document.getElementById("hiddenrep").value; 

        var confirmed = window.confirm("Are you sure you want to delete this reply?");
        if (confirmed) {
            // Proceed with deletion
            fetch(`/restaurant/${restoname}/delete-replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    replyId: replyId,
                    restoname: restoname
                })
            })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    window.location.href = '/restaurant/' + restoname;
                } else {
                    console.error('Failed to delete reply');
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
