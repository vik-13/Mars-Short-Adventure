function Enemy1(x, y, d) {
  const FIRE_INTERVAL = 2000;
  const size = [81, 37];
  const g = [[[56,37,81,36,71,11],"#000000","black",1],[[73,34,63,11,47,36],"#000000","black",1],[[31,34,50,12,59,36],"#000000","black",1],[[49,33,33,9,18,37],"#000000","black",1],[[33,16,11,0,0,35,30,33],"#000000","black",1],[[13,11,11,15,16,15,16,12],"#000000","red",1]];
  const speed = 1;
  const animList = {
    walk: [[[64,38,88,32,74,10],[74,34,68,10,48,32],[32,33,46,9,59,31],[45,35,34,9,14,32],[26,14,2,1,-4,37,26,32],[7,11,7,16,11,15,11,11]]],
    spit: [[[47,37,72,35,62,10],[65,34,56,11,39,36],[33,34,52,12,61,36],[59,37,48,11,28,35],[53,17,33,0,20,34,50,35],[35,12,33,16,38,17,39,13]]]
  }
  let anim = new Anim(g, animList.walk, 200);

  let original = new V(x, y);
  let shift = 0;
  let step = 1 / Math.floor(d.mag() / speed);
  let direction = 1;
  let inverse = d.x < 0 ? 1 : -1;
  let fire = {
    last: +new Date(),
    started: false,
    start: +new Date()
  };

  function doFire() {
    if (+new Date() - fire.last < FIRE_INTERVAL) return;

    fire.started = true;
    fire.start = +new Date();
    anim = new Anim(g, animList.spit, 200, true);

    enemySpit.add(0, new V(x + size[0] / 2, y + size[1] / 2), new V(-inverse * 5, 0));

    fire.last = +new Date();
  }

  this.center = function() {
    return new V(x + size[0] / 2, y + size[1] / 2);
  }

  this.n = function() {
    if (fire.started) {
      if (+new Date() - fire.start >= 300) {
        fire.started = false;
        anim = new Anim(g, animList.walk, 200);
      }
      return;
    }

    if ((inverse === 1 && character.center().x < x || inverse === -1 && character.center().x > x) && character.center().distance(this.center()) < 200) {
      doFire();
      return;
    }

    const current = original.get().add(d.get().mult(shift));
    x = current.x;
    y = current.y;
    if (shift > 1 || shift < 0) {
      direction *= -1;
      inverse *= -1;
    }
    shift += (step * direction);
  }

  this.r = function() {
    c.save();
    c.translate(x + size[0] / 2, y + size[1] / 2 - 4);
    c.scale(inverse, -1);
    draw.r(anim.n(), size, 1);
    c.restore();
  }
}
