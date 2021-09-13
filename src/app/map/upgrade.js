function Upgrade(type, x, y) {
  this.active = true;
  let shift = 0;
  let direction = 1;
  const size = [29, 27];

  if (type === 35) gc.starsTotal++;

  function center() {
    return new V(x + (size[0] / 2), y + (size[1] / 2) + shift);
  }

  this.n = function() {
    shift += direction;
    if (shift > 20) {
      direction = -.2;
    } else if (shift < 0) {
      direction = .2;
    }

    if (center().distance(character.center()) < 50) {
      this.active = false;
      if (type === 31) {
        bullets.upgrade();
      } else if (type === 32) {
        character.upgrade();
      } else if (type === 34) {
        character.restore(100);
      } else if (type === 35) {
        gc.stars++;
      }
    }
  }

  this.r = function() {
    c.save();
    c.translate(x + 20, y + shift);
    c.scale(1, -1);
    bp();
    if (type === 31) {
      draw.r([[[29, 21, 0, 22, 0, 27, 11, 27, 16, 24, 28, 24], color.black, color.bonus, 1], [[1, 13, 14, 8, 29, 13, 28, 15, 14, 10, 1, 15], color.black, color.bonus, 1], [[0, 8, 13, 2, 28, 9, 28, 7, 14, 0, 0, 7], color.black, color.bonus, 1]], size, 3);
    } else if (type === 32) {
      draw.r([[[0,6,13,0,26,7,26,8,13,3,0,9],color.black, color.bonus,1],[[0,15,13,9,26,15,26,17,13,11,0,17],color.black, color.bonus,1],[[0,23,13,17,26,23,26,25,13,19,0,25],color.black, color.bonus,1]], size, 3);
    } else if (type === 34) {
      draw.r([[[16,7,9,0,0,5,2,18,16,30,30,19,33,7,25,0],color.black,color.health,1]], size, 3);
    } else if (type === 35) {
      draw.r([[[0,9,13,10,16,0,20,10,32,8,22,15,28,26,18,20,8,27,11,17],color.black, color.bonus,1]], size, 3);
    }
    cp();
    c.restore();
  }
}
