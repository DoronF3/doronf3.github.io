// Add some interactive terminal-like behavior
document.addEventListener('DOMContentLoaded', function () {
    const terminalBody = document.querySelector('.terminal-body');
    const closeButton = document.querySelector('.button-close');

    // Close button redirects to home
    closeButton.addEventListener('click', function () {
        window.location.href = '/';
    });

    // Simulate cursor blink on click
    terminalBody.addEventListener('click', function () {
        const cursorLine = document.querySelector('.cursor');
        cursorLine.style.animation = 'none';
        setTimeout(() => {
            cursorLine.style.animation = 'blink 1s infinite';
        }, 10);
    });
});
