window.keys = (() => {
  const list = [
    new Key(25, 20, 30, true),
    new Key(26, 70, 30, true),
    new Key(27, 120, 30, true),
    new Key(28, 170, 30, true)
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
