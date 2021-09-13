function Key(type, x, y, staticKey) {
  const keyColors = ['red', 'green', 'yellow', 'purple'];
  const keyColor = keyColors[type - 25];
  const g = [[[0,0,0,24,18,24,18,0],color.black,color.black,1],[[3,2,1,7,5,6,5,3],color.black,keyColor,1],[[10,2,14,8,16,6,16,2],color.black,keyColor,1],[[2,9,1,23,13,22,8,16,6,8],color.black,keyColor,1],[[13,11,8,13,17,19,15,10],color.black,keyColor,1]];
  const a = [[0,[2,2,2,9,6,8,6,3],[8,4,14,12,17,10,17,4],[2,12,5,23,15,20,9,16,5,10],[14,15,12,16,16,18,15,14]],[0,[2,3,7,8,8,3,5,1],[13,2,10,8,13,9,16,7],[2,15,2,22,8,22,5,19,4,14],[14,10,6,10,13,23,17,10]]];
  const anim = new Anim(g, a, 2000);
  this.active = true;
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = 18;
  this.h = 24;
  this.shift = 0;
  this.direction = -.2;

  this.getCenter = function() {
    return new V(this.x + (this.w / 2), this.y + (this.h / 2));
  }

  this.n = () => {
    if (staticKey) return;
    this.shift += this.direction;
    if (this.shift > 20) {
      this.direction = -.2;
    } else if (this.shift < 0) {
      this.direction = .2;
    }
  }

  this.r = () => {
    c.save();
    c.translate(this.x + (this.w / 2) + 10, this.y + (this.h / 2) + this.shift);
    if (staticKey) c.scale(2, -2);
    draw.r(anim.n(), [this.w, this.h], 1);
    c.restore();
  }
}
