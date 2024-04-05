document.addEventListener('DOMContentLoaded',async () => {
    const restoname = document.getElementById("hiddenval").value;
    for (const review of document.getElementsByClassName('rev1')){
        console.log(review.id);
        const reviewnum = review.id.match(/\d+$/)[0];
        const likerating = document.getElementById('liked'+reviewnum);
        const dislikerating = document.getElementById('disliked'+reviewnum);
        const liketext = document.getElementById('liketext'+reviewnum);
        const disliketext = document.getElementById('disliketext'+reviewnum);
        const likedbutton = document.getElementById('likebutton'+reviewnum);
        const dislikedbutt = document.getElementById('dislikebutton'+reviewnum);

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
                return;
            } 
            
            if (likerating.classList.contains("post-rating-selected") && !dislikerating.classList.contains("post-rating-selected")){
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
