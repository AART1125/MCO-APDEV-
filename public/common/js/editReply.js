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
        var replyId = document.getElementById("hiddenrep").value; 
        
        if (textReplyValue === '') {
            alert('You cannot submit an empty reply');
            return false; 
        }

        fetch(`/restaurant/${restoname}/update-replies`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                replyId: replyId,
                restoname: restoname,
                textReply: textReplyValue 
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log('Reply edited successfully');
                return response.json();
            } else {
                console.error('Failed to edit review');
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
        window.location.href = '/restaurant/' + document.getElementById("hiddenval").value;
    });
});
