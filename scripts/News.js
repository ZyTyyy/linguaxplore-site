const items = document.querySelectorAll('.carousel-item img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.getElementById('modal-close');
const wrapper = document.querySelector('.carousel-item-wrapper');
const rotation = document.querySelector('.carousel-rotation-direction');

items.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modalTitle.textContent = img.dataset.title;
    modalDate.textContent = img.dataset.date;
    modalDesc.textContent = img.dataset.desc;

    // Stop carousel animation
    wrapper.style.animationPlayState = "paused";
    rotation.style.animationPlayState = "paused";

    modal.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  wrapper.style.animationPlayState = "running";
  rotation.style.animationPlayState = "running";
});
