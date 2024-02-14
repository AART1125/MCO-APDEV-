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
