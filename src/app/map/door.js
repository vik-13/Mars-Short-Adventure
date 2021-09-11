colors = ['red', 'green', 'yellow', 'purple'];

function Door(type, x, y) {
  const color = colors[type - 21];
  const g = [[[1,0,0,80,33,79,33,0],"#000000","black",1],[[10,8,5,25,16,24,18,13],"#000000",color,1],[[24,18,21,39,28,33,29,21],"#000000",color,1],[[5,32,3,77,21,75,12,58,17,27],"#000000",color,1],[[24,53,19,60,29,70,30,50],"#000000",color,1]];
  const a = [[0,[10,2,4,26,18,25,22,9],[24,13,22,39,28,35,29,21],[4,35,2,71,17,70,10,45,14,31],[24,51,17,60,30,72,32,47]],[0,[10,7,7,17,13,16,15,10],[24,15,21,38,29,35,30,18],[4,28,3,69,17,71,11,44,18,23],[22,48,16,59,28,70,30,46]]];
  const anim = new Anim(g, a, 2000);
  this.active = true;
  this.x = x;
  this.y = y;
  this.w = 33;
  this.h = 80;
  this.shift = 0;

  this.getPosition = function() {
    return new V(this.x, this.y + this.shift);
  }

  this.n = () => {
    if (new V(this.x, this.y).distance(character.position()) < 200 && keys.has(type + 4)) {
      this.shift += 2;
    } else {
      this.shift -= 2;
    }
    if (this.shift > 80) this.shift = 80;
    if (this.shift < 0) this.shift = 0;
  }

  this.r = () => {
    c.save();
    c.translate(this.x + (this.w / 2) + 3.5, this.y + (this.h / 2) + this.shift);
    draw.r(anim.n(), [this.w, this.h]);
    c.restore();
  }
}
