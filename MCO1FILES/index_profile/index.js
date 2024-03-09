document.addEventListener('DOMContentLoaded', function() {
    const categoryItems1 = document.querySelectorAll('.uno .category-items button');
    const scrollUnoLeft1 = document.getElementById('scroll-uno-left');
    const scrollUnoRight1 = document.getElementById('scroll-uno-right');
    
    let currentIndex1 = 0;
    const maxIndex1 = categoryItems1.length - 4;
    
    function toggleItems1() {
        categoryItems1.forEach(function(item, index) {
            if (index >= currentIndex1 && index < currentIndex1 + 4) {
                item.style.display = 'inline-block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    scrollUnoLeft1.addEventListener('click', function() {
        if (currentIndex1 > 0) {
            currentIndex1--;
            toggleItems1();
        }
    });
    
    scrollUnoRight1.addEventListener('click', function() {
        if (currentIndex1 < maxIndex1) {
            currentIndex1++;
            toggleItems1();
        }
    });
    
    toggleItems1();
});

document.addEventListener('DOMContentLoaded', function() {
    const categoryItems2 = document.querySelectorAll('.dos .category-items-2 button');
    const scrollDosLeft = document.getElementById('scroll-dos-left');
    const scrollDosRight = document.getElementById('scroll-dos-right');
    
    let currentIndex2 = 0;
    const maxIndex2 = categoryItems2.length - 4;
    
    function toggleItems2() {
        categoryItems2.forEach(function(item, index) {
            if (index >= currentIndex2 && index < currentIndex2 + 4) {
                item.style.display = 'inline-block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    scrollDosLeft.addEventListener('click', function() {
        if (currentIndex2 > 0) {
            currentIndex2--;
            toggleItems2();
        }
    });
    
    scrollDosRight.addEventListener('click', function() {
        if (currentIndex2 < maxIndex2) {
            currentIndex2++;
            toggleItems2();
        }
    });
    
    toggleItems2();
});
