const DURATIONS = [500];

function Spit(type, position, direction) {
  this.active = true;
  this.position = position;
  this.start = +new Date();

  this.n = function() {
    console.log(direction);
    position.add(direction);
  }

  this.r = function() {
    c.save();
    bp();
    c.fillStyle = 'yellow';
    c.fillRect(position.x, position.y, 7, 7);
    cp();
    c.restore();
  }
}

window.enemySpit = (() => {
  let list = [];

  return {
    add: (t, p, d) => {
      list.push(new Spit(t, p, d));
    },
    n: () => {
      list.forEach((item) => {
        item.n();
      });

      list = list.filter((item) => item.active);
    },
    r: () => {
      list.forEach((item) => {
        item.r();
      });
    }
  };
})();
