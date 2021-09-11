function Spider(type, x, y) {
  const getNext = () => {
    let next = rInt(-300, 300);
    if (this.x + next < 0 || this.x + next > 2000) {
      next = -next;
    }
    return new V(this.x + next, 0);
  };

  const POWER = 30;
  const FREEZE_TIME = 700;
  const WALKING_SPEED = 1.2;
  const FOLLOWING_SPEED = 2.3;
  const gMain = [[[55,0,107,1,108,48,54,49],'','black',1],[[54,48,32,25,14,59,32,32],'','black',1],[[55,45,32,14,0,57,30,23],'','black',1],[[109,47,128,24,146,58,128,30],'','black',1],[[109,46,128,13,160,58,128,22],'','black',1],[[59,9,59,16,69,16,69,8],'','white',1],[[92,10,92,17,102,16,102,10],'','white',1]];
  const gList = {
    stay: [
      gMain,
      [[[55,5,107,6,108,53,54,54],[54,54,33,28,14,59,33,34],[54,52,30,18,0,57,30,25],[108,52,128,27,146,58,128,34],[108,50,128,17,160,58,128,24],[60,14,60,21,70,21,70,12],[92,15,92,22,102,22,102,15]]],
      300
    ],
    walk: [
      gMain,
      [[[55,4,107,4,108,52,54,52],[54,51,33,29,4,57,34,34],[53,50,28,14,6,57,30,22],[109,51,130,29,155,57,130,34],[108,49,126,13,150,58,126,20],[59,12,59,19,69,19,69,10],[92,13,92,20,102,20,102,13]]],
      120
    ],
    die: [
      gMain,
      [[[99,-7,110,44,65,56,51,4],[67,57,26,48,2,59,27,54],[53,63,20,43,-10,65,20,48],[109,47,132,42,164,56,133,47],[112,48,142,38,173,57,140,44],[94,1,86,2,88,12,96,11],[100,30,93,32,96,41,102,40]]],
      200,
      true
    ],
    kick: [
      gMain,
      [[[72,-12,122,0,113,46,61,36],[60,34,38,20,8,44,38,26],[60,31,47,-5,5,-5,44,3],[116,44,135,21,137,59,134,28],[115,44,135,11,143,61,134,20],[74,-2,72,5,82,8,84,0],[104,5,102,12,112,15,114,9]],[[85,-22,133,-2,116,42,66,23],[66,19,44,-9,0,-8,43,-4],[65,21,41,-2,10,33,41,5],[118,40,137,21,127,57,135,27],[118,39,141,12,137,58,140,19],[88,-11,85,-4,94,1,98,-7],[113,0,110,7,120,11,123,5]],[0,0,0,0,0,0,0]],
      120,
      true
    ],
    hit: [
      gMain,
      [[[55,0,107,1,108,48,54,49],[54,48,32,25,50,61,32,32],[55,45,32,14,46,58,30,23],[109,47,128,24,119,58,128,30],[109,46,128,13,120,58,128,22],[60,12,60,16,70,16,70,14],[92,14,92,17,102,16,102,14]]],
      150,
      true
    ]
  };

  const die = {
    active: false,
    started: 0,
    live: 100
  };

  this.type = type;
  this.x = x;
  this.y = y;
  this.active = true;
  this.collisionRadius = 70;
  this.freeze = {
    active: false,
    started: 0,
    direction: 0
  };
  this.following = {
    active: false,
    lastSeen: 0,
    to: getNext(),
  };
  this.hitting = {
    possible: true,
    active: false,
    started: 0,
    next: 0
  };

  let current = new Anim(...gList.walk);

  this.follow = (visible) => {
    if (visible) {
      this.following.active = true;
      this.following.lastSeen = +new Date();
    } else {
      if (+new Date() - this.following.lastSeen > 3000) {
        this.following.active = false;
        this.following.to = getNext();
      }
    }
    if (character.position().get().x - this.x > 125 || character.position().get().x - this.x < -25) {
      if (this.x < character.position().get().x) {
        this.following.to = character.position().get().add(new V(-120, 0));
      } else {
        this.following.to = character.position().get().add(new V(20, 0));
      }
      this.hitting.active = false;
    } else if (!character.isDying() && this.hitting.possible && !this.hitting.active) {
      this.hitting.possible = false;
      this.hitting.active = true;
      this.hitting.started = +new Date();
      this.hitting.next = rInt(100, 600);
    }
  };

  this.contact = (power, isFallen) => {
    if (!die.active) {
      let actualPower = power;
      if (isFallen) {
        actualPower = power * ((300 - this.center().distance(character.position().get().add(new V(character.size().x / 2, character.size().y / 2)))) / 300);
      }
      die.live -= actualPower;
      particles.dying(new V(this.x + 60, this.y + 30), [color.dying1, color.dying2, color.dying3, color.dying4]);
      if (die.live <= 0) {
        this.destroy();
      } else {
        this.freeze.active = true;
        this.freeze.started = +new Date();
        this.freeze.direction = character.position().x < this.x ? .2 : -.2;
        current = new Anim(...gList.hit);
      }
      this.hitting.active = false;
      this.hitting.possible = true;
    }
  };

  this.destroy = () => {
    die.active = true;
    die.started = +new Date();
    current = new Anim(...gList.die);
    particles.dying(new V(this.x + 60, this.y + 10), [color.dying1, color.dying2, color.dying3, color.dying4]);
  };

  this.n = () => {
    if (!this.freeze.active && !die.active) {
      const speed = this.following.active ? FOLLOWING_SPEED : WALKING_SPEED;
      const diff = this.following.to.x - this.x;
      const nextStep = Math.abs(diff) < speed ? Math.abs(diff) : speed;
      this.x += (diff < 0 ? -nextStep : nextStep);

      if (!this.following.active && Math.abs(this.following.to.x - this.x) < 5) {
        this.following.to = getNext();
        current = new Anim(...gList.walk);
      }
    }

    if (this.freeze.active) {
      this.x += this.freeze.direction;
    }

    if (this.hitting.active && +new Date() - this.hitting.started >= this.hitting.next) {
      if (character.position().get().x - this.x < 125 && character.position().get().x - this.x > -25 && Math.abs(this.y - character.position().get().y) <= 100) {
        character.hit(POWER);
        setTimeout(() => { sfx.lowKick(); }, 120);
        current = new Anim(...gList.kick);
        this.hitting.started = +new Date();
      }
      this.hitting.active = false;
    }

    if (!this.hitting.possible && +new Date() - this.hitting.started > 300) {
      this.hitting.possible = true;
      current = new Anim(...gList.walk);
    }

    if (this.freeze.active && +new Date() - this.freeze.started >= FREEZE_TIME) {
      this.freeze.active = false;
      this.following.active = false;
      current = new Anim(...gList.walk);
    }
    if (die.active && +new Date() - die.started > 200) {
      this.active = false;
    }
  };

  this.center = () => new V(this.x + 70, this.y + 25);

  this.r = () => {
    c.save();
    c.translate(this.x + 80, this.y + 30);
    if (this.following.active) {
      c.scale(character.position().get().x - (this.x + 80) > 0 ? -1 : 1, -1);
    } else {
      c.scale(this.following.to.x - this.x > 0 ? -1 : 1, -1);
    }
    draw.r(current.n(), [160, 59]);
    c.restore();
  };
}
