document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your message!');
});

function toggleMenu() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('active');
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission
      const form = this;
      const thankYouMessage = document.getElementById('thank-you');

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => {
          if (response.ok) {
            thankYouMessage.style.display = 'block';
            form.reset();
          } else {
            alert('There was an issue sending your message. Please try again.');
          }
        })
        .catch(() => alert('There was an issue sending your message. Please try again.'));
    });