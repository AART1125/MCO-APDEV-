// window.onload = async function () {
//     document.body.style.zoom = "100%";
    
//     function handleReview(review) {
//         const reviewId = document.getElementById("hiddenrev").value;
//         const ratings = review.querySelectorAll(".post-rating");
//         const likeRating = ratings[0];
//         const restoname = document.getElementById("hiddenval").value;

//         ratings.forEach(rating => {
//             const button = rating.querySelector(".post-rating-button");
//             const count = rating.querySelector(".post-rating-count");

//             button.addEventListener("click", async () => {
//                 if (rating.classList.contains("post-rating-selected")) {
//                     return;
//                 }

//                 count.textContent = Number(count.textContent) + 1;

//                 ratings.forEach(otherRating => {
//                     if (otherRating !== rating && otherRating.classList.contains("post-rating-selected")) {
//                         const otherCount = otherRating.querySelector(".post-rating-count");

//                         otherCount.textContent = Math.max(0, Number(otherCount.textContent) - 1);
//                         otherRating.classList.remove("post-rating-selected");
//                     }
//                 });

//                 rating.classList.add("post-rating-selected");

//                 if(likeRating.id === rating.id){
//                     try {
//                         const response = await fetch(`/restaurant/${restoname}/reviews/${reviewId}/like`, {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             }
//                         });
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         const {action: updatedAction} = await response.json();
//                         count.textContent = action === 'like' ? likes : dislikes;
//                         localStorage.setItem(`review_${reviewId}`, updatedAction);
//                     } catch (error) {
//                         console.error('Error:', error);
//                     }
//                 } else {
//                     try {
//                         const response = await fetch(`/restaurant/${restoname}/reviews/${reviewId}/dislike`, {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             }
//                         });
//                         if (!response.ok) {
//                             throw new Error('Network response was not ok');
//                         }
//                         const {action: updatedAction} = await response.json();
//                         count.textContent = action === 'like' ? likes : dislikes;
//                         localStorage.setItem(`review_${reviewId}`, updatedAction);
//                     } catch (error) {
//                         console.error('Error:', error);
//                     }
//                 }
                
//             });
//         });
//     }

//     document.querySelectorAll(".rev1").forEach(handleReview);
// };

document.addEventListener('DOMContentLoaded',async () => {
    const restoname = document.getElementById("hiddenval").value;
    for (const review of document.getElementsByClassName('rev1')){
        const i = review.id.charAt(review.id.length - 1);

        const reviewnum = document.getElementById('hiddenrev' + i).value;
        const likerating = document.getElementById('liked'+reviewnum);
        const dislikerating = document.getElementById('disliked'+reviewnum);
        const liketext = document.getElementById('liketext'+reviewnum);
        const disliketext = document.getElementById('disliketext'+reviewnum);
        const likedbutton = document.getElementById('likebutton'+reviewnum);
        const dislikedbutt = document.getElementById('dislikebutton'+reviewnum);

        console.log(likedbutton);

        likedbutton.addEventListener('click', async () => {
            if(likerating.classList.contains("post-rating-selected")){
                return;
            } else if (!likerating.classList.contains("post-rating-selected") && dislikerating.classList.contains("post-rating-selected")){
                disliketext.textContent = Number(disliketext.textContent) - 1;
                liketext.textContent = Number(liketext.textContent) + 1;
                dislikerating.classList.remove("post-rating-selected");
                likerating.classList.add("post-rating-selected");

                const response = await fetch(`/restaurant/${restoname}/reviews/${reviewnum}/like`,
                                            {
                                                method: 'POST',
                                                headers: {'Content-Type' : 'application/json'},
                                                body: JSON.stringify({likes : Number(liketext.textContent)})
                                            }).catch();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    console.log(response.json().message)
                }
                const response2 = await fetch(`/restaurant/${restoname}/reviews/${reviewnum}/dislike`,
                                             {
                                                method: 'POST',
                                                headers: {'Content-Type' : 'application/json'},
                                                body: JSON.stringify({dislikes : Number(disliketext.textContent)})
                                             }).catch();
                if(!response2.ok){
                    throw new Error('Network response was not ok');
                } else {
                    console.log(response2.json().message)
                }
            } else if (!likerating.classList.contains("post-rating-selected") && !dislikerating.classList.contains("post-rating-selected")){
                liketext.textContent = Number(liketext.textContent) + 1;
                likerating.classList.add("post-rating-selected");

                console.log(`/restaurant/${restoname}/reviews/${reviewnum}/like`)

                const response = await fetch(`/restaurant/${restoname}/reviews/${reviewnum}/like`,
                                            {
                                                method: 'POST',
                                                headers: {'Content-Type' : 'application/json'},
                                                body: JSON.stringify({likes : Number(liketext.textContent)})
                                            }).catch();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    console.log(response.json().message)
                }
            }
            
        });

        dislikedbutt.addEventListener('click', async () => {
            if(dislikerating.classList.contains("post-rating-selected")){
                console.log("1 dislike");
                return;
            } 
            
            if (likerating.classList.contains("post-rating-selected") && !dislikerating.classList.contains("post-rating-selected")){
                console.log("2 dislike");
                disliketext.textContent = Number(disliketext.textContent) + 1;
                liketext.textContent = Number(liketext.textContent) - 1;
                likerating.classList.remove("post-rating-selected");
                dislikerating.classList.add("post-rating-selected");

                const response = await fetch(`/restaurant/${restoname}/reviews/${reviewnum}/dislike`,
                                            {
                                                method: 'POST',
                                                headers: {'Content-Type' : 'application/json'},
                                                body: JSON.stringify({dislikes : Number(disliketext.textContent)})
                                            }).catch();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    console.log(response.json().message)
                }
                const response2 = await fetch(`/restaurant/${restoname}/reviews/${reviewnum}/like`,
                                             {
                                                method: 'POST',
                                                headers: {'Content-Type' : 'application/json'},
                                                body: JSON.stringify({likes : Number(liketext.textContent)})
                                             }).catch();
                if(!response2.ok){
                    throw new Error('Network response was not ok');
                } else {
                    console.log(response2.json().message)
                }
            } else if(!likerating.classList.contains("post-rating-selected") && !dislikerating.classList.contains("post-rating-selected")){
                disliketext.textContent = Number(disliketext.textContent) + 1;
                dislikerating.classList.add("post-rating-selected");

                const response = await fetch(`/restaurant/${restoname}/reviews/${reviewnum}/dislike`,
                                            {
                                                method: 'POST',
                                                headers: {'Content-Type' : 'application/json'},
                                                body: JSON.stringify({dislikes : Number(disliketext.textContent)})
                                            }).catch();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    console.log(response.json().message)
                }
            }
            
        });
    }
});
