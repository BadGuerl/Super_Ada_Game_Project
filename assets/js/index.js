window.addEventListener('load', () => {
    const game = new Game('game-canvas', "intro");

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event);
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event);
    })

    document.addEventListener('keypress', (event) => {
        game.start(event);
    })
});