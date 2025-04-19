// Add this to your public/js/app.js
document.querySelectorAll('.view_user').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        fetch("/view_user/${id}")
            .then(response => response.text())
            .then(html => {
                // Show modal with html content
            });
    });
});