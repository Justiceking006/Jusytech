
  function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('hidden');
  }


  function toggleMenu() {
    const menu = document.getElementById("settingsMenu");

    // If menu is hidden, show it. If it's shown, hide it.
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");    // show
    } else {
      menu.classList.add("hidden");       // hide
    }
  }


// Show specific section and highlight corresponding icon
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  const activeSection = document.getElementById(sectionId);
  if (activeSection) activeSection.style.display = 'block';

  // Highlight nav icon
  document.querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('text-green-500'));
  const activeIcon = document.querySelector(`.nav-icon[data-section="${sectionId}"]`);
  if (activeIcon) activeIcon.classList.add('text-green-500');
}



// Modal control
function OpenModal(title, imageSrc, price, farmer) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalSeller').textContent = 'Posted by ' + farmer;
  document.getElementById('productModal').style.display='flex';
}

function closeModal() {
  document.getElementById('productModal').style.display='none';
}

// Cart price updater
function updateCartTotals() {
  let total = 0;
  document.querySelectorAll('.qty-input').forEach(input => {
    const price = parseInt(input.dataset.price, 10);
    const quantity = parseInt(input.value, 10);
    const itemTotal = price * quantity;
    input.closest('div').querySelector('.item-total').textContent = `₦${itemTotal.toLocaleString()}`;
    total += itemTotal;
  });
  document.getElementById('cartTotal').textContent = `₦${total.toLocaleString()}`;
}

document.querySelectorAll('.qty-input').forEach(input => {
  input.addEventListener('input', updateCartTotals);
});

// Fade in effect using IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});


function switchTab(tabId) {
  document.getElementById('projectsTab').classList.add('hidden')
  document.getElementById('aboutTab').classList.add('hidden')
  document.getElementById(tabId).classList.remove('hidden')

  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('text-green-500', 'border-green-500', 'border-b-2')
    tab.classList.add('text-gray-400')
  })

  const activeTab = Array.from(document.querySelectorAll('.tab')).find(tab => tab.textContent.toLowerCase().includes(tabId.includes('about') ? 'about' : 'products'))
  if (activeTab) {
    activeTab.classList.add('text-green-500', 'border-green-500', 'border-b-2')
    activeTab.classList.remove('text-gray-400')
  }
}

//notification
document.querySelectorAll('.notification-item').forEach(item => {
  item.addEventListener('click', () => {
    const fullMsg = item.querySelector('.full-msg');
    const unreadDot = item.querySelector('.unread-dot');
    
    fullMsg.classList.toggle('hidden');
    if (unreadDot) unreadDot.remove();
  });
});



//message
let activeChatUser = '';

function openChat(name) {
  activeChatUser = name;
  document.getElementById('chatTitle').textContent = name;
  document.getElementById('chatList').classList.add('hidden');
  document.getElementById('chatBody').classList.remove('hidden');
  document.getElementById('chatMessages').innerHTML = ''; // Clear old messages
}

function closeChat() {
  document.getElementById('chatBody').classList.add('hidden');
  document.getElementById('chatList').classList.remove('hidden');
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (msg === '') 
    return;

  const chatBox = document.getElementById('chatMessages');
  const msgEl = document.createElement('div');
  msgEl.className = 'bg-green-700 p-2 rounded max-w-[75%] text-sm ml-auto';
  msgEl.textContent = msg;
  chatBox.appendChild(msgEl);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}


function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (message !== '') {
    const chatBox = document.getElementById('chatMessages');

    // Create a new message bubble
    const msgBubble = document.createElement('div');
    msgBubble.className = 'bg-green-600 text-white p-2 rounded-lg text-sm self-end w-fit max-w-xs ml-auto';
    msgBubble.textContent = message;

    // Add it to the chat box
    chatBox.appendChild(msgBubble);

    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    input.value = '';
  }
}



//market section
function goBackToMarket() {
  document.getElementById('productDetail').classList.add('hidden');
  document.getElementById('marketSection').classList.remove('hidden');
}

function openProductDetail() {
  document.getElementById('marketSection').classList.add('hidden');
  document.getElementById('productDetail').classList.remove('hidden');
}



let slideIndex = 0;
const bannerSlider = document.getElementById('bannerSlider');
const totalSlides = bannerSlider.children.length;

function showNextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  bannerSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
}
setInterval(showNextSlide, 3500); // Change every 3.5 seconds


  // Set how long the countdown should be (e.g., 5 minutes from now)
  const duration = 5 * 60 * 1000; // 5 mins in milliseconds
  const endTime = new Date().getTime() + duration;

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      document.getElementById("countdownTimer").textContent = "00:00:00";
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("countdownTimer").textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Call once immediately



// === Live Search Functionality ===

function searchProducts() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const products = document.querySelectorAll('#productSection > div');

  products.forEach(product => {
    const productName = product.querySelector('div').textContent.toLowerCase();
    if (productName.includes(filter)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}


// Show the Post Product Form
function openPostForm() {
  document.getElementById('postProductForm').classList.remove('hidden');
}

// Handle Form Submission
function submitProduct() {
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const description = document.getElementById('productDescription').value;
  const image = document.getElementById('productImage').files[0];

  if (!name || !price || !description || !image) {
    alert('Please fill all fields!');
    return;
  }

  alert('🎉 Product submitted successfully (simulation)');
  document.getElementById('postProductForm').classList.add('hidden');

  // You can add your own logic later to send this data to PHP server side
}


