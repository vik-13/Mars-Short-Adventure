function SawBlock(type, x, y, w, h, d) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;
  this.active = true;
  this.collisionRadius = 35;
  let lastDamage = +new Date();

  const func = [
    () => {
      velocity += acc;
      angle += velocity;

      if (velocity <= -.5) nextFunc();
    },
    () => {
      velocity *= .97;
      angle += velocity;
      const current = original.get().add(this.d.get().mult(shift));
      this.x = current.x;
      this.y = current.y;
      if (shift > 1 || shift < 0) {
        direction *= -1;
        nextFunc();
      }
      shift += (step * direction);
    }
  ];
  const g = [[[19,0,28,11,27,21,13,17,0,28,12,26,20,34,10,39,7,56,16,45,24,46,22,56,36,68,32,56,39,48,48,58,65,56,53,50,49,40,63,43,76,30,62,33,52,27,64,16,54,0,54,12,41,19,33,4],'black','black',1]];
  const gHolder = [[[11,0,0,18,23,20],"#000000",color.black,1],[[10,11,13,11,11,13],"#000000",color.mechanics,1]];
  const speed = 6;
  let angle = 0;
  let acc = -.015;
  let velocity = 0;
  let currentFunc = -1;

  let original = new V(x, y);
  let shift = 0;
  let step = 1 / Math.floor(d.mag() / speed);
  let direction = 1;

  function nextFunc() {
    currentFunc++;
    if (currentFunc === func.length) {
      currentFunc = 0;
    }
  }

  nextFunc();

  this.n = () => {
    func[currentFunc]();

    if (+new Date() - lastDamage >= 1000 && new V(this.x + 15, this.y + 15).distance(character.center()) < 50) {
      character.damage(100);
      lastDamage = +new Date();
    }
  };

  this.r = () => {
    c.save();
    c.translate(this.x + 18, this.y + 18);
    c.scale(1, -1);
    c.rotate(angle);
    draw.r(g, [76, 68]);
    c.restore();

    // Holder 1
    c.save();
    c.translate(original.x + 18, original.y + 18);
    draw.r(gHolder, [23, 20]);
    c.restore();

    // Holder 2
    c.save();
    c.translate(original.x + d.x + 18, original.y + d.y + 18);
    draw.r(gHolder, [23, 20]);
    c.restore()
  };
}

function Block(type, x, y, w, h, d) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.d = d;
  this.isMovable = d.mag() > 0;
  this.active = true;
  this.lastDamage = 0;

  const colors = [color.black, color.grey, color.ice, color.grey];
  const nails = [[[0,8,40,8,35,0,34,6,23,1,21,5,15,7,11,1,8,6,3,1],'black','black',1]];
  const gHolder = [[[11,0,0,18,23,20],"#000000","black",1],[[10,11,13,11,11,13],"#000000","#388e3c",1]];
  const speed = 2;

  let original = new V(x, y);
  let shift = 0;
  let step = this.isMovable ? 1 / Math.floor(d.mag() / speed) : 0;
  let direction = 1;

  this.n = () => {
    if (this.isMovable) {
      const current = original.get().add(this.d.get().mult(shift));
      this.x = current.x;
      this.y = current.y;
      if (shift > 1 || shift < 0) {
        direction *= -1;
      }
      shift += (step * direction);
    }
  };

  this.getVelocity = () => d.get().normalize().mult(speed * direction);

  this.r = () => {
    if (this.isMovable) {
      // Holder 1
      c.save();
      c.translate(original.x + (w / 2), original.y + (h / 2));
      draw.r(gHolder, [23, 20], 1);
      c.restore();

      // Holder 2
      c.save();
      c.translate(original.x + d.x + (w / 2), original.y + d.y + (h / 2));
      draw.r(gHolder, [23, 20]);
      c.restore();

      // Line
      c.save();
      c.strokeStyle = color.mechanics;
      c.moveTo(original.x + (w / 2), original.y + (h / 2));
      c.lineTo(original.x + d.x + (w / 2), original.y + d.y + (h / 2));
      c.stroke();
      c.restore();
    }

    c.save();
    c.translate(this.x, this.y);
    if (this.type === 1) {
      // TOP
      c.save();
      c.scale(1, -1);
      c.translate(-20, -this.h - 4);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8], 1);
      }
      c.restore();
      // BOTTOM
      c.save();
      c.translate(-20, -4);
      for (let i = 0; i < Math.floor(this.w / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8], 1);
      }
      c.restore();
      // RIGHT
      c.save();
      c.rotate(Math.PI / 2);
      c.translate(-20, -this.w - 4);
      for (let i = 0; i < Math.floor(this.h / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8], 1);
      }
      c.restore();
      // LEFT
      c.save();
      c.rotate(-Math.PI / 2);
      c.translate(-this.h - 20, -4);
      for (let i = 0; i < Math.floor(this.h / 40); i++) {
        c.translate(40, 0);
        draw.r(nails, [40, 8], 1);
      }
      c.restore();
      c.fillStyle = color.black;
      c.fillRect(0, 0, this.w, this.h);
    } else {
      bp();
      c.strokeStyle = color.black;
      c.fillStyle = colors[this.type];
      c.rect(0, 0, this.w, this.h);
      c.stroke();
      c.fill();
      cp();
    }
    c.restore();
  }
}
