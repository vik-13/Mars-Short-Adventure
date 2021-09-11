function Upgrade(type, x, y) {
  this.active = true;
  let shift = 0;
  let direction = 1;
  const size = [29, 27];

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
      }
    }
  }

  this.r = function() {
    c.save();
    c.translate(x + 20, y + shift);
    c.scale(1, -1);
    bp();
    if (type === 31) {
      draw.r([[[29, 21, 0, 22, 0, 27, 11, 27, 16, 24, 28, 24], "black", "#388e3c", 1], [[1, 13, 14, 8, 29, 13, 28, 15, 14, 10, 1, 15], "#000000", "#388e3c", 1], [[0, 8, 13, 2, 28, 9, 28, 7, 14, 0, 0, 7], "#000000", "#388e3c", 1]], size);
    } else if (type === 32) {
      draw.r([[[0,6,13,0,26,7,26,8,13,3,0,9],"#000000","#388e3c",1],[[0,15,13,9,26,15,26,17,13,11,0,17],"#000000","#388e3c",1],[[0,23,13,17,26,23,26,25,13,19,0,25],"#000000","#388e3c",1]], size);
    }
    cp();
    c.restore();
  }
}