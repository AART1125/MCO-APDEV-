window.onload = async function () {
    document.body.style.zoom = "100%";
    
    function handleReview(review) {
        const reviewId = review.dataset.reviewId;
        const ratings = review.querySelectorAll(".post-rating");
        const likeRating = ratings[0];
        const restoname = document.getElementById("hiddenval").value;

        ratings.forEach(rating => {
            const button = rating.querySelector(".post-rating-button");
            const count = rating.querySelector(".post-rating-count");

            button.addEventListener("click", async () => {
                if (rating.classList.contains("post-rating-selected")) {
                    return;
                }

                count.textContent = Number(count.textContent) + 1;

                ratings.forEach(otherRating => {
                    if (otherRating !== rating && otherRating.classList.contains("post-rating-selected")) {
                        const otherCount = otherRating.querySelector(".post-rating-count");

                        otherCount.textContent = Math.max(0, Number(otherCount.textContent) - 1);
                        otherRating.classList.remove("post-rating-selected");
                    }
                });

                rating.classList.add("post-rating-selected");

                const action = likeRating === rating ? "like" : "dislike";
                try {
                    const response = await fetch(`/restaurant/${restoname}/reviews/${reviewId}/${action}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const { likes, dislikes, action: updatedAction } = await response.json();
                    count.textContent = action === 'like' ? likes : dislikes;
                    localStorage.setItem(`review_${reviewId}`, updatedAction);
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    }

    document.querySelectorAll(".rev1").forEach(handleReview);
};
