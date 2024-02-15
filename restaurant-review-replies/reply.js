window.onload = function () {
    document.body.style.zoom = "100%";
};

document.querySelectorAll(".rev1").forEach(review => {
    const reviewId = review.dataset.reviewId; 
    const ratings = review.querySelectorAll(".post-rating");
    const likeRating = ratings[0];

    ratings.forEach(rating => {
        const button = rating.querySelector(".post-rating-button");
        const count = rating.querySelector(".post-rating-count");

        button.addEventListener("click", async () => {
            if (rating.classList.contains("post-rating-selected")) {
                return;
            }

            count.textContent = Number(count.textContent) + 1;

            ratings.forEach(otherRating => {
                if (otherRating.classList.contains("post-rating-selected")) {
                    const count = otherRating.querySelector(".post-rating-count");

                    count.textContent = Math.max(0, Number(count.textContent) - 1);
                    otherRating.classList.remove("post-rating-selected");
                }
            });

            rating.classList.add("post-rating-selected");

            const likeOrDislike = likeRating === rating ? "like" : "dislike";
            const response = await fetch(`/reviews/${reviewId}/${likeOrDislike}`);
            const body = await response.json();
        });
    });
});

document.querySelectorAll(".rev2").forEach(review => {
    const reviewId = review.dataset.reviewId; 
    const ratings = review.querySelectorAll(".post-rating");
    const likeRating = ratings[0];

    ratings.forEach(rating => {
        const button = rating.querySelector(".post-rating-button");
        const count = rating.querySelector(".post-rating-count");

        button.addEventListener("click", async () => {
            if (rating.classList.contains("post-rating-selected")) {
                return;
            }

            count.textContent = Number(count.textContent) + 1;

            ratings.forEach(otherRating => {
                if (otherRating.classList.contains("post-rating-selected")) {
                    const count = otherRating.querySelector(".post-rating-count");

                    count.textContent = Math.max(0, Number(count.textContent) - 1);
                    otherRating.classList.remove("post-rating-selected");
                }
            });

            rating.classList.add("post-rating-selected");

            const likeOrDislike = likeRating === rating ? "like" : "dislike";
            const response = await fetch(`/reviews/${reviewId}/${likeOrDislike}`);
            const body = await response.json();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var replyButton1 = document.getElementById('reply1');
    var replyButton2 = document.getElementById('reply2');
    var cancelButton1 = document.getElementById('cancel-1');
    var cancelButton2 = document.getElementById('cancel-2');
    var sendButton1 = document.getElementById('send-1');
    var sendButton2 = document.getElementById('send-2');
    var textarea1 = document.getElementById('reply-txtarea-1');
    var textarea2 = document.getElementById('reply-txtarea-2');

    replyButton1.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('reply-pop-up-1').style.display = 'block';

    })

    replyButton2.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('reply-pop-up-2').style.display = 'block';

    })

    cancelButton1.addEventListener('click', function(event) {
        event.preventDefault();
        textarea1.value = "";
        document.getElementById('reply-pop-up-1').style.display = 'none';
    })

    cancelButton2.addEventListener('click', function(event) {
        event.preventDefault();
        textarea2.value = "";
        document.getElementById('reply-pop-up-2').style.display = 'none';
    })

    sendButton1.addEventListener('click', function(event) {
        event.preventDefault();
        textarea1.value = "";
        document.getElementById('reply-pop-up-1').style.display = 'none';
    })

    sendButton2.addEventListener('click', function(event) {
        event.preventDefault();
        textarea2.value = "";
        document.getElementById('reply-pop-up-2').style.display = 'none';
    })

    

});

var editLinks = document.getElementsByClassName("edit");

for (var i = 0; i < editLinks.length; i++) {
    editLinks[i].addEventListener("click", function() {
        window.location.href = "editreview.html";
    });
}

