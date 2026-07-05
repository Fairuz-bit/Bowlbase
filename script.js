const wrapper = document.getElementById('sliderWrapper');
const slides = document.querySelectorAll('.slider-slide');
const totalSlides = slides.length;
let currentIndex = 1; // Mulai dari 1 karena indeks 0 akan diisi klon slide terakhir
let isTransitioning = false;

// 1. Duplikasi slide untuk efek infinite loop yang mulus
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

wrapper.appendChild(firstClone); // Tambah klon pertama ke akhir
wrapper.insertBefore(lastClone, wrapper.firstChild); // Tambah klon terakhir ke awal

// 2. Atur posisi awal agar langsung menampilkan slide pertama yang asli
wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

// 3. Fungsi utama untuk geser slider
function updateSlider(withAnimation = true) {
  if (withAnimation) {
    wrapper.style.transition = 'transform 0.5s ease-in-out'; // Sesuaikan durasi di sini
  } else {
    wrapper.style.transition = 'none';
  }
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// 4. Tombol Next
function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateSlider(true);
}

// 5. Tombol Prev
function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateSlider(true);
}

// 6. Tempat keajaiban "Infinite" terjadi tanpa terlihat user
wrapper.addEventListener('transitionend', () => {
  isTransitioning = false;

  // Jika mentok di klon paling akhir (kembali ke slide 1 asli)
  if (currentIndex === totalSlides + 1) {
    currentIndex = 1;
    updateSlider(false); // Lompat instan
  }
  
  // Jika mentok di klon paling awal (kembali ke slide terakhir asli)
  if (currentIndex === 0) {
    currentIndex = totalSlides;
    updateSlider(false); // Lompat instan
  }
});

// 7. Auto Slide & Reset
let autoSlideInterval = setInterval(nextSlide, 5000);

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

// 8. Event Listeners Tombol
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
}