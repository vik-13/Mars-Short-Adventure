window.keys = (() => {
  const list = [
    new Key(25, 20, 20, true),
    new Key(26, 60, 20, true),
    new Key(27, 100, 20, true),
    new Key(28, 140, 20, true)
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
          c.globalAlpha = .1;
        } else {
          c.globalAlpha = 1;
        }
        key.r();
        cp();
      });
    }
  };
})();
