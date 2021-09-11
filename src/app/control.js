window.control = (() => {
  const pressed = [0, 0, 0, 0]; // [Up, Right, Down, Left, Space]

  return {
    i: () => {
      window.addEventListener('keydown', (event) => {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
          pressed[3] = 1;
        }
        if (event.code === 'KeyW' || event.key === 'ArrowUp') {
          pressed[0] = 1;
        }
        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
          pressed[1] = 1;
        }

        if (event.code === 'KeyS' || event.code === 'ArrowDown') {
          pressed[2] = 1;
        }

        if (event.code === 'Space') {
          pressed[4] = 1;
        }

        if (event.code === 'Digit1') {
          gc.changeQuality(1);
        }
        if (event.code === 'Digit2') {
          gc.changeQuality(.75);
        }
        if (event.code === 'Digit3') {
          gc.changeQuality(.5);
        }
        if (event.code === 'Digit4') {
          gc.changeQuality(.1);
        }
        if (event.code === 'KeyM') {
          gc.muted = !gc.muted;
        }
      });
      window.addEventListener('keyup', (event) => {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
          pressed[3] = 0;
        }
        if (event.code === 'KeyW' || event.code === 'ArrowUp') {
          pressed[0] = 0;
        }
        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
          pressed[1] = 0;
        }
        if (event.code === 'KeyS' || event.code === 'ArrowDown') {
          pressed[2] = 0;
        }
        if (event.code === 'Space') {
          pressed[4] = 0;
        }
      });
    },
    pressed: pressed
  }
})();
