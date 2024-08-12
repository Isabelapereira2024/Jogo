const gameArea = document.getElementById('gameArea');
const playerPaddle = document.getElementById('playerPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');

const gameAreaWidth = gameArea.offsetWidth;
const gameAreaHeight = gameArea.offsetHeight;

const paddleWidth = playerPaddle.offsetWidth;
const paddleHeight = playerPaddle.offsetHeight;

const ballSize = ball.offsetWidth;

let ballX = gameAreaWidth / 2;
let ballY = gameAreaHeight / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

let playerPaddleY = (gameAreaHeight - paddleHeight) / 2;
let computerPaddleY = (gameAreaHeight - paddleHeight) / 2;

document.addEventListener('mousemove', (e) => {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const mouseY = e.clientY - gameAreaRect.top;
    playerPaddleY = Math.max(0, Math.min(gameAreaHeight - paddleHeight, mouseY - paddleHeight / 2));
});

function update() {
    // Atualizar a posição da bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Verificar colisões com o topo e o fundo
    if (ballY <= 0 || ballY + ballSize >= gameAreaHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Verificar colisões com as raquetes
    if (ballX <= paddleWidth && ballY + ballSize >= playerPaddleY && ballY <= playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballSize >= gameAreaWidth - paddleWidth && ballY + ballSize >= computerPaddleY && ballY <= computerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Atualizar a posição da raquete do computador
    const computerPaddleCenter = computerPaddleY + paddleHeight / 2;
    const ballCenterY = ballY + ballSize / 2;

    if (ballSpeedX > 0) {
        if (ballCenterY > computerPaddleCenter) {
            computerPaddleY += 4;
        } else {
            computerPaddleY -= 4;
        }

        // Garantir que a raquete do computador não saia dos limites
        computerPaddleY = Math.max(0, Math.min(gameAreaHeight - paddleHeight, computerPaddleY));
    }

    // Atualizar a posição das raquetes e da bola
    playerPaddle.style.top = `${playerPaddleY}px`;
    computerPaddle.style.top = `${computerPaddleY}px`;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Verificar se a bola saiu do campo
    if (ballX < 0 || ballX > gameAreaWidth) {
        ballX = gameAreaWidth / 2;
        ballY = gameAreaHeight / 2;
        ballSpeedX = -ballSpeedX;
    }

    requestAnimationFrame(update);
}

// Iniciar o jogo
update();
