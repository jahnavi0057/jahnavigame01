// Configuration
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const winnerText = document.getElementById('winner');

// Customizable segments
const segments = [
    { label: "Prize 1", color: "#FF6384" },
    { label: "Prize 2", color: "#36A2EB" },
    { label: "Prize 3", color: "#FFCE56" },
    { label: "Prize 4", color: "#4BC0C0" },
    { label: "Prize 5", color: "#9966FF" },
    { label: "Prize 6", color: "#FF9F40" }
];

let currentRotation = 0;
let isSpinning = false;

// Draw the wheel
function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const arcSize = (2 * Math.PI) / segments.length;

    segments.forEach((segment, index) => {
        const startAngle = index * arcSize - Math.PI / 2; // Start at top (-90deg)
        const endAngle = startAngle + arcSize;

        // Draw Slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.stroke();

        // Draw Text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 24px Arial";
        ctx.fillText(segment.label, radius - 20, 10);
        ctx.restore();
    });
}

// Spin Logic
function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;
    resetBtn.disabled = true;
    winnerText.textContent = "...";

    // Randomize spin: 5 to 10 full rotations + random segment offset
    const randomRotations = Math.floor(Math.random() * 5) + 5; 
    const randomDegree = Math.floor(Math.random() * 360);
    const totalDegrees = (randomRotations * 360) + randomDegree;
    
    // Add to current rotation so it spins forward from where it left off
    currentRotation += totalDegrees;

    // Apply CSS transformation for smooth animation
    canvas.style.transform = `rotate(${currentRotation}deg)`;
}

// Calculate Winner
function calculateWinner() {
    // The actual rotation modulo 360 gives us the final angle relative to 0
    // However, the wheel rotates CLOCKWISE. 
    // The pointer is at the TOP (0 degrees visual, or -90 math).
    // We need to map the rotation to the segment at the top.
    
    const actualDeg = currentRotation % 360;
    
    // The canvas rotates clockwise, so the segment at the top 
    // is effectively moving counter-clockwise relative to the pointer.
    // We reverse the degrees to map to our index 0-5 clockwise structure.
    const virtualRotation = (360 - actualDeg) % 360;
    
    const arcSizeDeg = 360 / segments.length;
    const winningIndex = Math.floor(virtualRotation / arcSizeDeg);
    
    const winner = segments[winningIndex];
    
    winnerText.textContent = winner.label;
    
    // Optional: Play sound here
    // const audio = new Audio('tada.mp3');
    // audio.play().catch(e => console.log('Audio not found'));

    isSpinning = false;
    spinBtn.disabled = true; // Force reset
    resetBtn.disabled = false;
}

// Reset Game
function resetGame() {
    // We don't reset rotation to 0 visually to avoid "rewinding" animation
    // We just re-enable buttons
    winnerText.textContent = "---";
    spinBtn.disabled = false;
    resetBtn.disabled = true;
}

// Event Listeners
spinBtn.addEventListener('click', spinWheel);
resetBtn.addEventListener('click', resetGame);

// Listen for CSS transition end to detect when spin stops
canvas.addEventListener('transitionend', calculateWinner);

// Initialize
drawWheel();
