document.addEventListener('DOMContentLoaded', () => {
    const king = document.getElementById('king-img');
    const scene = document.getElementById('scene');
    const winMessage = document.getElementById('win-message');

    // Prevent default context menu on right click to avoid cheating slightly
    scene.addEventListener('contextmenu', (e) => e.preventDefault());

    function randomizeKingPosition() {
        // Wait for background to load to get dimensions if needed, 
        // but container is relative so percentages work well.

        // Random position between 10% and 90% to keep him somewhat inside
        // and not cut off by edges too much.
        const top = Math.random() * 80 + 10;
        const left = Math.random() * 80 + 10;

        king.style.top = `${top}%`;
        king.style.left = `${left}%`;

        // Random rotation for fun
        const rotation = Math.random() * 90 - 45;
        king.style.transform = `rotate(${rotation}deg)`;
    }

    king.addEventListener('click', (e) => {
        // Prevent clicking through to the scene if we had that logic
        e.stopPropagation();
        triggerWin();
    });

    // Optional: click on background plays a "miss" sound or effect
    // const background = document.getElementById('background-img');
    // background.addEventListener('click', () => {
    //    // console.log("Missed!");
    // });

    function triggerWin() {
        winMessage.classList.remove('hidden');
        createConfetti();
        // Make the king jump
        king.style.transition = 'transform 0.5s ease';
        king.style.transform = 'scale(2) rotate(360deg)';
        king.style.zIndex = '1000'; // Bring to front
    }

    function createConfetti() {
        const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '2000';
            document.body.appendChild(confetti);

            const animationDuration = Math.random() * 2 + 1;

            confetti.animate([
                { transform: `translate3d(0, 0, 0) rotateX(0) rotateY(0)` },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)` }
            ], {
                duration: animationDuration * 1000,
                easing: 'linear',
                fill: 'forwards'
            });

            // Cleanup
            setTimeout(() => confetti.remove(), animationDuration * 1000);
        }
    }

    // Set initial position
    randomizeKingPosition();
});
