// Click user by default
document.getElementById('user').click();


// Adjust height of image
let formHeight = document.getElementById('content-padding').offsetHeight;
let image = document.getElementById('imgLeft');
image.style.height = (formHeight + 100) + 'px';


// If user is clicked
document.getElementById('user').addEventListener('click', () => {
    document.getElementById('user-form').style.display = 'block';
    document.getElementById('owner-form').style.display = 'none';
});

document.getElementById('owner').addEventListener('click', () => {
    document.getElementById('user-form').style.display = 'none';
    document.getElementById('owner-form').style.display = 'block';
    let formHeight = document.getElementById('content-padding').offsetHeight;
let image = document.getElementById('imgLeft');
image.style.height = (formHeight + 100) + 'px';
});
