window.messages = (() => {
  const TIME = 5000;
  this.active = false;
  let message = 'You need a RED key.';
  let start = +new Date();
  let duration = TIME;

  return {
    show: (m, d) => {
      message = m;
      this.active = true;
      start = +new Date();
      duration = d || TIME;
    },
    n: () => {
      if (!this.active) return;
      if (+new Date() - start > duration) this.active = false;
    },
    r: () => {
      if (!this.active) return;

      c.save();
      bp();
      c.globalAlpha = .5;
      c.fillStyle = color.white;
      c.rect(300, 50, gc.res.x - 600, 50);
      c.fill();
      cp();
      bp();
      c.globalAlpha = 1;
      c.translate(gc.res.x / 2, 75);
      c.scale(1, -1);
      c.fillStyle = color.black;
      c.font = '32px serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(message, 0, 0);
      cp();
      c.restore();
    }
  };
})();
