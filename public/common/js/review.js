// document.addEventListener('DOMContentLoaded', function () {
//     var reviewForm = document.querySelector('.text-header form');

//     reviewForm.addEventListener('submit', function (event) {
//         event.preventDefault(); 
        
//         var recommendationChecked = document.querySelector('input[name="recommendation"]:checked');
//         var textReviewValue = document.querySelector('textarea[name="text-review"]').value.trim();
        
//         if (!recommendationChecked || textReviewValue === '') {
//             alert('Please fill out all required fields.');
//             return; 
//         }

//         var fileInputs = document.querySelectorAll('.file-input');

//         var files = [];
//         fileInputs.forEach(function(fileInput) {
//             if (fileInput.files.length > 0) {
//                 for (var i = 0; i < fileInput.files.length; i++) {
//                     files.push(fileInput.files[i]);
//                 }
//             }
//         });

//         if (files.length > 2) {
//             alert('You can only upload a maximum of 2 files.');
//             return;
//         }
        
//         var formData = new FormData(reviewForm);

//         files.forEach(function(file, index) {
//             formData.append('file' + (index + 1), file);
//         });
        
//         fetch(reviewForm.action, {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (response.ok) {
//                 console.log('Review submitted successfully');
//                 window.location.href = '/restaurant/' + encodeURIComponent(formData.get('resto-name')) + '/reviews';
//             } else {
//                 console.error('Failed to submit review');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });

//     var cancelBtn = document.querySelector('.btn.cancel');

//     cancelBtn.addEventListener('click', function (event) {
//         event.preventDefault();
//         window.history.back();
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    var reviewForm = document.getElementById("reviewform");

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
        
        if (checked === "" || textReviewValue === '') {
            alert('Please fill out all required fields.' + checked);
            return false; 
        }

        // var fileInputs = document.querySelectorAll('.file-input');

        // var files = [];
        // fileInputs.forEach(function(fileInput) {
        //     if (fileInput.files.length > 0) {
        //         for (var i = 0; i < fileInput.files.length; i++) {
        //             files.push(fileInput.files[i]);
        //         }
        //     }
        // });

        // if (files.length > 2) {
        //     alert('You can only upload a maximum of 2 files.');
        //     return;
        // }
        
        // var formData = new FormData(reviewForm);

        // files.forEach(function(file, index) {
        //     formData.append('file' + (index + 1), file);
        // });

        const formData = new FormData();
        formData.append('isRecommend', checked);
        formData.append('review', textReviewValue);
        formData.append('restoname', document.getElementById("hiddenval").value),
        formData.append('myFile', document.getElementById('myFile').files[0]);
        console.log(document.getElementById('myFile').files[0]);
        fetch('post-reviews', 
        {
            method: 'POST',
            // body: JSON.stringify({
            //     isRecommend   :  checked,
            //     review        :  textReviewValue,
            //     restoname     :  document.getElementById("hiddenval").value
            // })
            body : formData
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                console.log('Review submitted successfully');
                window.location.href = '/restaurant/' + document.getElementById("hiddenval").value;
            } else {
                console.error('Failed to submit review');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    var cancelBtn = document.getElementById('cancel');

    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.history.back();
    });
});

