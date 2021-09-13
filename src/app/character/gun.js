const BULLETS_TIMES = [500, 550, 650, 800];
const BULLETS_SPEED = [8, 9, 11, 13];
const BULLETS_COUNT = [1, 2, 3, 4];
const BULLETS_DAMAGE = [35, 45, 65, 100];

window.bullets = (() => {
  const INTERVAL = 300;
  let currentLevel = 0;
  let last = +new Date();
  let list = [];

  function add() {
    const direction = new V(characterAnimations.direction() * BULLETS_SPEED[currentLevel], 0);
    const position = character.position().get().add(new V(direction.x < 0 ? -20 : 40, character.isSitting() ? 18 : 36));
    list.push(new Bullet(position, direction, BULLETS_TIMES[currentLevel], currentLevel));
    last = +new Date();
  }

  return {
    upgrade: () => {
      currentLevel++;
      messages.show('Your fun is better now...', 5000);
    },
    n: () => {
      if (control.pressed[4] && list.length < BULLETS_COUNT[currentLevel] && +new Date() - last >= INTERVAL) add();
      for (let i = 0; i < list.length; i++) {
        list[i].n();
      }
      list = list.filter((bullet) => bullet.active);
    },
    r: () => {
      for (let i = 0; i < list.length; i++) {
        list[i].r();
      }
    }
  };
})();

function Bullet(position, direction, time, level) {
  const start = +new Date();
  this.active = true;
  this.position = position;

  this.n = function() {
    this.position.add(direction);
    if (+new Date() - start > time) this.active = false;

    map.getMap().enemy.forEach((item) => {
      if (this.position.distance(item.center()) <= item.radius()) {
        item.damage(BULLETS_DAMAGE[level]);
        this.active = false;
      }
    });
  }

  this.r = function() {
    c.save();
    c.beginPath();
    c.strokeStyle = '#000';
    c.lineWidth = 4;
    c.lineJoin = 'round';
    c.translate(this.position.x, this.position.y);
    c.fillStyle = 'green';
    c.rect(0, 0, 5, 5);
    c.fill();
    c.stroke();
    c.closePath();
    c.restore();
  }
}
