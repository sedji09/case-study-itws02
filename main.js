// Toggle menu for small screen size

const navMenu = document.querySelector('.nav-menu');
const navMenuBtn = document.querySelector('.nav-menu-btn');

navMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Favorite Count in nav bar
let favoriteCount = 0; // Initialize favorite count
const favoriteItems = []; // Array to hold favorite items

// Function to render favorites list inside modal
function renderFavorites() {
    const favoriteList = document.getElementById('favorite-list');
    if (!favoriteList) return;
    
    favoriteList.innerHTML = ''; // Clear previous items

    if (favoriteItems.length === 0) {
        favoriteList.innerHTML = `
            <li class="empty-favorites-container">
                <div class="empty-favorites">
                    <div class="empty-icon-box">
                        <i class="far fa-heart"></i>
                    </div>
                    <h4>No favorites added yet</h4>
                    <p>Click "Add to Favorites" on any coffee drink recommendation to save your top choices here!</p>
                </div>
            </li>
        `;
        return;
    }

    favoriteItems.forEach(function(item, index) {
        const listItem = document.createElement('li');
        listItem.className = 'favorite-list-item';
        listItem.setAttribute('data-name', item.name);
        listItem.setAttribute('title', 'Click to view description on page');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="fav-item-thumb"> 
            <div class="fav-item-details">
                <h4 class="fav-item-name">${item.name}</h4>
                <span class="fav-item-tag"><i class="fas fa-eye"></i> Click to view description</span>
            </div>
            <button type="button" class="delete-btn" data-index="${index}" title="Remove from favorites">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        favoriteList.appendChild(listItem);
    });
}

// Event listener for Add to Favorites button
document.querySelectorAll('.add-to-favorites-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const menuItem = this.closest('.menu-item'); // Get the closest menu item
        const itemInfo = menuItem.querySelector('.item-info h3').innerText; // Get item name
        const itemImageSrc = menuItem.querySelector('.item-image img').src; // Get item image source

        // Check if item is already in favorites
        const isFavorite = favoriteItems.some(item => item.name === itemInfo);

        if (!isFavorite) {
            // Add item to favorites
            favoriteItems.push({ name: itemInfo, image: itemImageSrc });
            favoriteCount = favoriteItems.length; // Update the favorite count
            const countEl = document.getElementById('favorite-count');
            if (countEl) countEl.innerText = favoriteCount; // Update displayed count

            // Change button text to "Added to Favorites" and disable it
            this.innerText = 'Added to Favorites';
            this.disabled = true; // Disable button
            this.classList.add('added-to-favorites'); // Add class for styling
        }
    });
});

// Event listener for favorite icon click (open modal)
const favoriteIconBtn = document.getElementById('favorite-icon');
if (favoriteIconBtn) {
    favoriteIconBtn.addEventListener('click', function() {
        renderFavorites();
        const modal = document.getElementById('favoriteModal');
        if (modal) modal.style.display = 'flex'; // Show modal using flex
    });
}

// Event listener for clicking items or delete button inside modal
document.addEventListener('click', function(event) {
    // 1. Delete button clicked
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        event.stopPropagation();
        const index = parseInt(deleteBtn.getAttribute('data-index'), 10);
        const deletedItem = favoriteItems[index];

        if (deletedItem) {
            // Find the corresponding button on the page for the deleted item and re-enable it
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(function(menuItem) {
                const itemNameEl = menuItem.querySelector('.item-info h3');
                if (itemNameEl && itemNameEl.innerText.trim() === deletedItem.name.trim()) {
                    const addButton = menuItem.querySelector('.add-to-favorites-button');
                    if (addButton) {
                        addButton.innerText = 'Add to Favorites'; // Reset button text
                        addButton.disabled = false; // Re-enable button
                        addButton.classList.remove('added-to-favorites'); // Remove added class
                    }
                }
            });

            favoriteItems.splice(index, 1); // Remove item from array
            favoriteCount = favoriteItems.length;
            const countEl = document.getElementById('favorite-count');
            if (countEl) countEl.innerText = favoriteCount; // Update count
            renderFavorites(); // Re-render modal content
        }
        return;
    }

    // 2. Favorite item card clicked -> Close modal, scroll to card, and open description outside
    const favItemCard = event.target.closest('.favorite-list-item');
    if (favItemCard) {
        const itemName = favItemCard.getAttribute('data-name');
        if (!itemName) return;

        // Close favorite modal
        const modal = document.getElementById('favoriteModal');
        if (modal) modal.style.display = 'none';

        // Find the matching menu item card on the page
        const menuItems = document.querySelectorAll('.menu-item');
        let targetItem = null;

        menuItems.forEach(function(menuItem) {
            const itemNameEl = menuItem.querySelector('.item-info h3');
            if (itemNameEl && itemNameEl.innerText.trim() === itemName.trim()) {
                targetItem = menuItem;
            }
        });

        if (targetItem) {
            // Smoothly scroll the page so the item is in the center of the viewport
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Automatically open / display its description
            const desc = targetItem.querySelector('.description');
            if (desc) {
                desc.style.display = 'block';
            }

            // Add highlight glow effect to grab attention
            targetItem.classList.add('highlight-card');
            setTimeout(() => {
                targetItem.classList.remove('highlight-card');
            }, 2500);
        }
    }
});

// Modal close functionality
const closeBtn = document.querySelector('.close');
const favoriteModal = document.getElementById('favoriteModal');

if (closeBtn && favoriteModal) {
    closeBtn.onclick = function() {
        favoriteModal.style.display = 'none'; // Close modal
    };
}

window.addEventListener('click', function(event) {
    if (favoriteModal && event.target === favoriteModal) {
        favoriteModal.style.display = 'none'; // Close modal if clicked outside on overlay
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && favoriteModal && favoriteModal.style.display === 'flex') {
        favoriteModal.style.display = 'none';
    }
});

    document.querySelectorAll('.overlay-plus-icon').forEach(function(plusIcon) {
        plusIcon.addEventListener('click', function() {
            const itemInfo = this.closest('.menu-item').querySelector('.item-info');
            const description = itemInfo.querySelector('.description');

            if (description.style.display === "none") {
                description.style.display = "block"; // Show description
            } else {
                description.style.display = "none"; // Hide description
            } if (!description) return;

        });
    });
    /* ----- TYPING EFFECT ----- */
    var typingEffect = new Typed(".typedText",{
        strings : ["Choice","Crave","Vibes"],
        loop : true,
        typeSpeed : 70, 
        backSpeed : 100,
        backDelay : 2000
        })

    document.addEventListener('DOMContentLoaded', () => {
        // Swiper Initialization
        const swiper = new Swiper('.slider-wrapper', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    
        // ScrollReveal Initialization
        const srTop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 2000,
            reset: true,
        });
        
        //HOME 
        srTop.reveal('.home-container', {});
        srTop.reveal('.featured-name', { delay: 200 });
        srTop.reveal('.featured-text-info', { delay: 300 });
        srTop.reveal('.menu-button', { delay: 300 });
        srTop.reveal('.home-img', { delay: 400 });
        srTop.reveal('.underline', { delay: 400 });

        // ScrollReveal Initialization
        const srLeft = ScrollReveal({
            origin: 'left',
            distance: '80px',
            duration: 2000,
            reset: true,
        });

        //RECOMMENDED CONTAINER
        srLeft.reveal('.menu-item1',{delay: 100})

        // ScrollReveal Initialization
        const srRight = ScrollReveal({
            origin: 'right',
            distance: '80px',
            duration: 2000,
            reset: true,
        });

        //RECOMMENDED CONTAINER
        srRight.reveal('.menu-item2',{delay: 100})

        // ScrollReveal Initialization
        const srBottom = ScrollReveal({
            origin: 'bottom',
            distance: '80px',
            duration: 2000,
            reset: true,
        });

        //RECOMMENDED CONTAINER
        srBottom.reveal('.coffee-brand',{delay: 100})
    });
    


