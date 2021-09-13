function Checkpoint(x, y) {
  const g = [[[1,108,0,74,35,74,35,109],"#000000","red",1],[[0,74,0,37,35,37,35,74],"#000000","black",1],[[1,37,1,1,35,0,35,38],"#000000","red",1],[[35,1,73,1,71,36,35,38],"#000000","black",1],[[73,1,107,1,109,38,72,37],"#000000","red",1],[[71,37,71,73,108,73,108,38],"#000000","black",1],[[71,73,72,109,107,108,107,73],"#000000","red",1]];
  const a = [[[73,37,72,2,107,2,107,37],[72,74,72,37,107,37,107,74],[72,109,72,73,107,72,107,110],[72,38,34,36,36,1,72,0],[0,74,35,73,36,110,-1,109],[-2,37,-2,72,35,73,35,38],[0,1,1,37,36,36,35,1]]];
  let anim = new Anim(g, a, 1500, true);
  const size = [109, 109];
  let lastUpdate = +new Date();

  function center() {
    return new V(x + (size[0] / 2), y + (size[1] / 2));
  }

  this.n = function() {
    if (+new Date() - lastUpdate > 2000 && center().distance(character.center()) < 100) {
      this.active = false;
      anim = new Anim(g, a, 1500, true);
      character.savePosition();
      lastUpdate = +new Date();
      messages.show('CHECKPOINT', 5000);
    }
  }

  this.r = function() {
    c.save();
    c.translate(x, y + 55);
    c.scale(1, -1);
    draw.r(anim.n(), size);
    c.restore();
  }
}
