const DURATIONS = [2000];
const DAMAGE = [70, 90];

function Spit(type, position, direction) {
  this.active = true;
  this.position = position;
  this.start = +new Date();

  this.n = function() {
    position.add(direction);

    if (position.distance(character.center()) < 30) {
      character.damage(DAMAGE[type]);
      this.active = false;
    }

    if (+new Date() - this.start > DURATIONS[type]) {
      this.active = false;
    }
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
