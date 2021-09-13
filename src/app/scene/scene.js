window.scene = (() => {
  let bg;

  function rHealth() {
    c.save();
    bp();
    c.strokeStyle = '#000';
    c.fillStyle = '#fff';
    c.lineWidth = 5;
    c.lineJoin = 'round';
    const maxHealth = character.maxHealth();
    c.rect(20, gc.res.y - 40, maxHealth, 20);
    c.fill();
    c.stroke();
    cp();
    bp();
    c.fillStyle = 'red';
    const health = character.health();
    c.rect(22, gc.res.y - 38, health - 4 < 0 ? 0 : health - 4, 16);
    c.fill();
    cp();
    c.restore();
  }

  function rStamina() {
    c.save();
    bp();
    c.strokeStyle = '#000';
    c.fillStyle = '#fff';
    c.lineWidth = 5;
    c.lineJoin = 'round';
    const maxStamina = character.maxStamina();
    c.rect(gc.res.x - maxStamina - 20, gc.res.y - 40, maxStamina, 20);
    c.fill();
    c.stroke();
    cp();
    bp();
    c.fillStyle = 'green';
    const stamina = character.stamina();
    c.rect(gc.res.x - maxStamina - 18 + (maxStamina - stamina), gc.res.y - 38, stamina - 4 < 0 ? 0 : stamina - 4, 16);
    c.fill();
    cp();
    c.restore();
  }

  function rStars() {
    c.save();
    bp();
    c.globalAlpha = .5;
    c.fillStyle = color.white;
    c.rect(gc.res.x - 175, 20, 150, 40);
    c.fill();
    cp();
    c.restore();
    c.save();
    c.translate(gc.res.x - 150, 40);
    c.scale(1, -1);
    draw.r([[[0,9,13,10,16,0,20,10,32,8,22,15,28,26,18,20,8,27,11,17],"#000000","#388e3c",1]], [32, 27], 3);
    bp();
    c.translate(30, 0);
    c.textBaseline = 'middle';
    c.font = '30px Courier New';
    c.fillText(gc.stars + '/' + gc.starsTotal, 0, 0);
    cp();
    c.restore();
  }

  return {
    i: () => {
      bg = c.createLinearGradient(0, 0, 0, gc.res.y);
      bg.addColorStop(0, 'hsl(37, 30%, 45%)');
      bg.addColorStop(1, 'hsl(37, 30%, 10%)');

      background.i();
      map.i();
      character.i();
      camera.i();
    },
    reset: () => {
      background.reset();
      map.reset();
      character.reset();
      particles.reset();
      camera.reset();
    },
    n: () => {
      if (gc.splashScreen) {
        splashScreen.n();
      } else {
        background.n();
        map.n();
        character.n();
        bullets.n();
        particles.n();
        camera.n();
        enemySpit.n();

        messages.n();
      }
    },
    r: () => {
      c.save();
      c.fillStyle = '#BFAEA4';
      c.fillRect(0, 0, gc.res.x, gc.res.y);
      c.restore();


      c.save();
      camera.r();
      splashScreen.r();
      map.r();
      character.r();
      bullets.r();
      enemySpit.r();
      particles.r();
      c.restore();

      rHealth();
      rStamina();

      c.save()
      keys.r();
      c.restore();

      rStars();

      messages.r();

      // c.save();
      // c.translate(1250, 690);
      // c.scale(.3, .3);
      // if (gc.muted) {
      //   draw.r([[[0,23,0,59,30,59,55,75,55,0,30,24],'','white',1]], [55, 75]);
      // } else {
      //   draw.r([[[0,27,0,64,30,63,55,80,55,4,30,28],'','white',1],[[59,28,60,57,65,57,64,28],'','white',1],[[66,18,67,64,71,64,71,19],'','white',1],[[73,8,75,72,80,72,79,8],'','white',1],[[83,0,84,81,89,81,87,0],'','white',1]], [89, 81]);
      // }
      // c.restore();
    }
  };
})();
