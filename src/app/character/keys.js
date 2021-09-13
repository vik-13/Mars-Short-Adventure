window.keys = (() => {
  const list = [
    new Key(25, 40, 40, true),
    new Key(26, 90, 40, true),
    new Key(27, 140, 40, true),
    new Key(28, 190, 40, true)
  ];
  const hash = {};

  return {
    add: (type) => {
      hash[type] = true;
    },
    has: (type) => {
      return hash[type];
    },
    r: () => {
      c.save();
      bp();
      c.globalAlpha = .5;
      c.fillStyle = color.white;
      c.rect(30, 20, 210, 66);
      c.fill();
      cp();
      c.restore();
      list.forEach((key) => {
        bp();
        if (!hash[key.type]) {
          c.globalAlpha = .3;
        } else {
          c.globalAlpha = 1;
        }
        key.r();
        cp();
      });
    }
  };
})();
