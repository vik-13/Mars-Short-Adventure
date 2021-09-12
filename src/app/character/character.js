const MAX_SPEED = [3, 4, 5, 6];
const MAX_STAMINA = [150, 150, 200, 250];
const MAX_HEALTH = [150, 170, 250, 300];

window.character = (() => {
  const MASS = .9;
  const OUT_STAMINA_AT_WALL = 1;
  const JUMP = 12;
  const CLIMBING_SPEED = 2;

  let lastSavedPosition;

  let currentLevel = 0;
  let health = MAX_HEALTH[currentLevel];
  let stamina = MAX_STAMINA[currentLevel];

  let secondJumpAllowed = false;
  let die = {
    isDead: false,
    dying: false
  };
  let levelIsCompleted = false;
  let isGoingBack = false;
  let velocity = new V();
  let position;
  const size = {x: 35, y: 73};
  let jump = {
    first: true,
    second: false,
    done: false
  };
  let inAir = false;
  let isRelaxing = false;
  let isSitting = false;
  let isMirrored = false;

  function collision(position) {
    const collisionInfo = {
      touches: [],
      sides: [],
      isOverFan: false
    };

    map.getMap().doors.forEach((door) => {
      const p = door.getPosition();
      if (door.active && position.x + size.x > p.x && position.x < p.x + door.w && position.y < p.y + door.h && position.y + size.y > p.y) {
        const coords = [
          p.y + door.h,
          p.x + door.w,
          p.y - size.y,
          p.x - size.x
        ];
        const distances = [
          (p.y + door.h) - position.y,
          (p.x + door.w) - position.x,
          (position.y + size.y) - p.y,
          (position.x + size.x) - p.x,
        ];

        const side = distances.indexOf(Math.min(...distances));

        collisionInfo.sides.push(side);
        collisionInfo.touches.push({
          side: side,
          type: door.type,
          intersect: coords[side],
          velocity: new V(),
        });
      }
    });

    map.getMap().keys.forEach((key) => {
      const center = key.getCenter();
      if (key.active && center.distance(position.get().add(new V(size.x / 2, size.y / 2))) < 50) {
        key.active = false;
        keys.add(key.type);
      }
    });

    map.getMap().enemy.forEach((block) => {
      if (block.type === 8) {
        if (position.x + (size.x / 2) > block.x && position.x + (size.x / 2) < block.x + 120 && position.y >= block.y - 10) {
          const distance = position.y - block.y;
          if (distance < (400)) {
            velocity.add(new V(0, 3 * (1 - distance / 400)));
            characterAnimations.to('flying');
          }
          collisionInfo.isOverFan = true;
        }
      } else if (block.type === 3) {
        if (block.active && block.center().distance(position.get().add(new V(size.x / 2, size.y / 2))) < block.collisionRadius + 20) {
          jump.done = false;
          stamina = MAX_STAMINA[currentLevel];
          block.destroy();
        }
      } else {
        if (block.center().distance(position.get().add(new V(size.x / 2, size.y / 2))) < block.collisionRadius + 20) {
          toDie();
        }
      }
    });

    map.getMap().map.forEach((block) => {
      if (block.active && position.x + size.x > block.x && position.x < block.x + block.w && position.y < block.y + block.h && position.y + size.y > block.y) {
        const coords = [
          block.y + block.h,
          block.x + block.w,
          block.y - size.y,
          block.x - size.x
        ];
        const distances = [
          (block.y + block.h) - position.y,
          (block.x + block.w) - position.x,
          (position.y + size.y) - block.y,
          (position.x + size.x) - block.x,
        ];

        const side = distances.indexOf(Math.min(...distances));

        collisionInfo.sides.push(side);
        collisionInfo.touches.push({
          side: side,
          type: block.type,
          intersect: coords[side],
          velocity: block.getVelocity(),
          climbing: true
        });

        if (block.type === 4) {
          block.startFalling();
        }
      }
    });

    return collisionInfo;
  }

  function toDie(falling) {
    if (die.dying) return;
    if (falling) {
      particles.dying(position.get().add(new V(0, size.y)), [color.dying1, color.dying2, color.dying3, color.dying4]);
    } else {
      particles.dying(position, [color.dying1, color.dying2, color.dying3, color.dying4]);
    }
    velocity = new V();
    die.dying = true;
    setTimeout(() => {
      toDead();
    }, 1000);
  }

  function toDead() {
    die.isDead = true;
  }

  return {
    i: () => {
      position = map.getStart().get();
      lastSavedPosition = position.get();
    },
    savePosition: () => {
      lastSavedPosition = position.get();
    },
    reset: () => {
      velocity = new V();
      position = lastSavedPosition.get() || map.getStart().get();
      stamina = MAX_STAMINA[currentLevel];
      characterAnimations.mirror(position.x !== 0);
      die = {
        dying: false,
        isDead: false
      };
      characterAnimations.to('stay');
      inAir = false;
      levelIsCompleted = false;
      isGoingBack = false;
    },
    n: () => {
      if (die.dying) {
        if (velocity.y > 0) velocity.y = 0;
        characterAnimations.to('die', false, true);
        const acc = velocity.get().normalize().mult(-0.017);
        acc.add(gc.gravity.get().mult(MASS / 10));
        velocity.add(acc);
        position.add(velocity);
        return false;
      }

      const acc = velocity.get().normalize().mult(-0.017);
      acc.add(gc.gravity.get().mult(MASS));

      if (control.pressed[3]) {
        acc.add(new V(-1, 0));
        characterAnimations.mirror(true);
        isMirrored = true;
      } else if (control.pressed[1]) {
        acc.add(new V(1, 0));
        characterAnimations.mirror(false);
        isMirrored = false;
      }

      velocity.add(acc);
      velocity.x = Math.abs(velocity.x) < MAX_SPEED[currentLevel] ? velocity.x : ((Math.abs(velocity.x) / velocity.x) * MAX_SPEED[currentLevel]);
      position.add(velocity);

      const collisionResult = collision(position);

      collisionResult.touches.forEach((item) => {
        if (item.type === 1) {
          if (velocity.y > 0) {
            velocity.y = 0;
          }
          toDie();
          return;
        }

        if (item.side === 0 && velocity.y <= 0) {
          stamina += 5;
          if (stamina > MAX_STAMINA[currentLevel]) stamina = MAX_STAMINA[currentLevel];
          position.y = item.intersect;
          velocity.y = 0;
          position.add(item.velocity);

          if (!control.pressed[3] && !control.pressed[1]) {
            if (item.type === 2) {
              velocity.x /= 1.02;
            } else {
              velocity.x /= 2;
            }
          }
          if (Math.abs(velocity.x) > .1) {
            particles.addRunning(position, velocity);
          }
        }

        if (item.side === 1) {
          position.x = item.intersect;
          if (item.climbing) {
            if (control.pressed[3] && stamina > 0 && collisionResult.sides.indexOf(0) === -1 && currentLevel > 1) {
              velocity = item.velocity;

              particles.addWall(position, -1);
              stamina -= OUT_STAMINA_AT_WALL;

              if (control.pressed[0]) {
                velocity = new V(0, CLIMBING_SPEED);
                characterAnimations.to('climb', false);
              } else {
                characterAnimations.to('wall');
              }
            } else if (stamina <= 0) {
              characterAnimations.to('wall');
            }
          }
        }

        if (item.side === 3) {
          position.x = item.intersect;
          if (item.climbing) {
            if (control.pressed[1] && stamina > 0 && collisionResult.sides.indexOf(0) === -1 && currentLevel > 1) {
              velocity = item.velocity;
              particles.addWall(position, 1);
              stamina -= OUT_STAMINA_AT_WALL;

              if (control.pressed[0]) {
                velocity = new V(0, CLIMBING_SPEED);
                characterAnimations.to('climb', false);
              } else {
                characterAnimations.to('wall');
              }
            } else if (stamina <= 0) {
              characterAnimations.to('wall');
            }
          }
        }
        if (item.side === 2) {
          position.y = item.intersect;
          velocity.y = velocity.y >= 0 ? 0 : velocity.y;
        }
      });

      if (collisionResult.sides.indexOf(0) !== -1 && velocity.y <= 0) {
        isSitting = false;
        if (control.pressed[3] || control.pressed[1]) {
          characterAnimations.to('walk');
        } else if (control.pressed[2]) {
          isSitting = true;
          characterAnimations.to('sit');
        } else if (!isRelaxing) {
          characterAnimations.to('stay');
        }

        if (control.pressed[0]) {
          if (jump.first) {
            velocity.add(new V(0, JUMP));
            characterAnimations.to('jump', false, true);
            jump.first = false;
          }
        }

        if (!jump.first && !control.pressed[0]) {
          jump.first = true;
          jump.second = false;
          jump.done = false;
        }

        if (inAir) {
          if (!control.pressed[2]) characterAnimations.to('drop', true);
          particles.addJump(position, velocity.x);
          inAir = false;
        }
      } else {
        inAir = true;
      }

      if ((!collisionResult.sides.length || stamina < 0) && velocity.y < 0) {
        if (!collisionResult.isOverFan) {
          characterAnimations.to('fall');
        }

        if (control.pressed[0] && (jump.second || jump.first) && secondJumpAllowed) {
          velocity.apply(new V(0, JUMP));
          characterAnimations.to('jump', false, true);
          jump.first = false;
          jump.second = false;
          jump.done = true;
        }

        if (!control.pressed[0] && !jump.first && !jump.done && secondJumpAllowed) {
          jump.second = true;
        }
      }

      if (collisionResult.sides.indexOf(2) !== -1 && collisionResult.sides.indexOf(0) !== -1) {
        toDie();
      }
    },
    nSplashScreen: () => {

    },
    upgrade: () => {
      currentLevel++;
      if (currentLevel > 3) currentLevel = 3;
      health = MAX_HEALTH[currentLevel];
      stamina = MAX_STAMINA[currentLevel];
    },
    r: () => {
      c.save();
      characterAnimations.r(position);
      c.restore();
    },
    rSplashScreen: () => {
      c.save();
      characterAnimations.r(new V(320, 350), 6);
      c.restore();
    },
    center: () => {
      return position.get().add(new V(size.x / 2, size.y / 2));
    },
    restore: (amount) => {
      health += amount;
      if (health > MAX_HEALTH[currentLevel]) health = MAX_HEALTH[currentLevel];
    },
    position: () => position,
    isDead: () => die.isDead,
    isSitting: () => isSitting,
    isMirrored: () => isMirrored,
    health: () => health,
    stamina: () => stamina,
    maxHealth: () => MAX_HEALTH[currentLevel],
    maxStamina: () => MAX_STAMINA[currentLevel],
    levelIsCompleted: () => levelIsCompleted,
    isGoingBack: () => isGoingBack
  };
})();
