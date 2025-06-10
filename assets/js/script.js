document.addEventListener('DOMContentLoaded', () => {
  // Loading Screen Logic (existing)
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
      setTimeout(() => {
          loadingScreen.classList.add('hide');
          // Remove loading screen from DOM after animation
          loadingScreen.addEventListener('transitionend', () => {
              loadingScreen.remove();
          });
      }, 1000); // Adjust time as needed
  }

  // Lucide Icons (existing)
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // Modal Image Viewer (existing)
  const projectThumbnails = document.querySelectorAll('.project-thumbnail');
  const modal = document.getElementById('imageModal'); // Ensure you have this modal in your HTML
  const modalImg = document.getElementById('modalImage'); // Ensure you have this image tag in your modal
  const closeBtn = document.getElementsByClassName('modal-close')[0]; // Ensure you have this close button

  if (modal && modalImg && closeBtn) {
      projectThumbnails.forEach(thumbnail => {
          thumbnail.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent default link behavior if it's a link
              modal.style.display = 'block';
              modalImg.src = this.src || this.style.backgroundImage.slice(5, -2); // Get src from img or url from background-image
              
              // Adjust object-fit for modal image based on specific card type
              if (this.closest('.design-banner-card')) {
                  modalImg.style.objectFit = 'contain'; // Banners should fit fully in modal
              } else if (this.closest('.design-default-card')) {
                  modalImg.style.objectFit = 'contain'; // Default design also fit fully
              } else {
                  modalImg.style.objectFit = 'contain'; // Default behavior for others
              }
          });
      });

      closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
      });

      modal.addEventListener('click', (event) => {
          if (event.target === modal) {
              modal.style.display = 'none';
          }
      });
  }

  // Skills Page Tab Logic (NEW)
  const skillsTabs = document.querySelectorAll('.skills-tab');
  const skillsContents = document.querySelectorAll('.skills-content');

  skillsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
          const targetTab = tab.dataset.tab;

          // Remove 'active' from all tabs and hide all content
          skillsTabs.forEach(t => t.classList.remove('active'));
          skillsContents.forEach(content => content.classList.remove('active'));

          // Add 'active' to the clicked tab
          tab.classList.add('active');

          // Show the corresponding content
          document.getElementById(`${targetTab}-content`).classList.add('active');
      });
  });

  // Sidebar Active Link (existing, slightly adapted for current page)
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.sidebar .nav-link');

  navLinks.forEach(link => {
      const linkHref = link.getAttribute('href').split('/').pop();
      if (currentPath === linkHref) {
          link.classList.add('active');
      } else {
          link.classList.remove('active'); // Ensure others are not active
      }
  });
});