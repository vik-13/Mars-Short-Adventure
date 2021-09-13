window.map = (() => {
  const scale = 40;
  let currentLevel = 15;
  let global = [[0,0,0,35,5],[0,38,0,62,5],[0,38,5,2,3],[0,34,7,4,1],[21,34,5,1,1],[0,0,-8,35,8],[0,38,-8,62,8],[0,-100,0,100,5],[0,-100,-8,100,8],[0,100,0,100,5],[0,100,-8,100,8],[0,-29,7,21,43],[24,-15,5,1,1],[0,-11,50,3,50],[0,-100,5,12,45],[0,-100,50,12,50],[0,200,0,100,5],[0,200,-8,100,8],[0,290,5,10,45],[0,271,50,29,8],[0,63,5,1,3],[0,68,6,12,1],[0,83,8,1,1],[0,88,8,1,2],[0,93,8,1,3],[0,88,13,1,1],[0,83,15,1,1],[0,70,17,10,1],[0,70,21,4,1],[0,70,25,2,1],[0,70,29,1,1],[35,70,31,1,1],[10,104,5,1,1,19,0],[0,111,8,4,1],[0,132,5,6,18],[3,128,8,4,1],[3,128,12,4,1],[3,129,16,3,1],[3,130,20,2,1],[0,142,10,4,1],[0,121,23,4,1,-21,18],[0,92,40,7,1],[35,95,42,1,1],[0,160,5,1,2],[0,171,5,1,2],[1,155,4,5,1],[1,161,4,4,1],[1,166,4,5,1],[34,180,8,1,1],[3,187,8,6,1],[0,204,15,16,1,0,-11],[0,224,5,9,27],[0,200,19,4,1,16,10],[3,219,19,5,1],[3,220,23,4,1],[3,222,27,2,1],[0,206,33,6,13],[35,208,47,1,1],[0,233,8,6,1],[0,233,12,5,1],[0,233,16,3,1,0,13],[10,248,5,1,1,18,0],[11,285,5,1,1,-14,0],[3,287,8,3,1],[3,288,12,2,1],[3,289,16,1,1],[0,270,18,17,1],[0,272,19,5,1],[0,273,20,3,1],[0,274,21,1,1],[34,288,6,1,1],[33,228,32,1,1],[25,274,23,1,1],[0,284,22,6,1],[0,285,26,5,1],[0,286,29,4,1],[0,287,33,3,1],[0,288,37,2,1],[0,289,41,1,1],[32,289,45,1,1],[0,165,5,1,2],[0,154,5,1,2],[0,0,-50,100,1],[0,0,-58,100,8],[0,5,-19,19,7],[0,0,-19,5,11],[31,11,-11,1,1],[35,7,-11,1,1],[0,35,4,3,1,0,-53],[0,-55,-50,55,1],[0,-65,-50,10,42],[0,-65,-58,65,8],[0,24,-47,6,37],[22,25,-49,1,1],[0,49,-26,9,1],[0,61,-24,1,1],[0,65,-23,1,1],[0,69,-22,1,1],[0,73,-21,1,1],[0,76,-19,2,1],[0,81,-17,2,1],[0,86,-15,7,1],[0,87,-14,5,1],[0,88,-13,3,1],[31,89,-11,1,1],[3,45,-46,5,1],[0,52,-46,8,1],[10,52,-45,1,1,6,0],[0,62,-42,7,1],[11,62,-41,1,1,5,0],[1,51,-50,23,1],[0,74,-46,1,1],[0,79,-49,5,13],[0,100,-58,100,8],[0,89,-47,3,30],[35,90,-16,1,1],[3,87,-39,2,1],[3,84,-43,2,1],[3,87,-46,2,1],[3,87,-25,2,1],[33,107,-49,1,1],[0,92,-22,6,1],[0,102,-21,5,1],[0,116,-49,1,4],[0,144,-49,1,4],[10,121,-49,1,1,18,0],[10,126,-49,1,1,10,0],[10,132,-49,1,1,-12,0],[35,129,-47,1,1],[0,154,-47,4,39],[0,166,-49,5,37],[0,100,-50,100,1],[0,158,-46,5,1],[10,158,-45,1,1,3,0],[0,161,-42,5,1],[10,161,-41,1,1,3,0],[3,158,-38,6,1],[0,163,-35,3,1,0,10],[0,158,-21,5,1],[11,158,-20,1,1,3,0],[0,164,-18,2,1],[0,165,-14,1,1],[34,168,-11,1,1],[1,108,-21,3,1],[0,111,-20,1,1],[0,116,-19,4,1],[0,129,-18,11,1],[0,127,-19,15,1],[0,131,-17,7,1],[0,133,-16,3,1],[35,134,-14,1,1],[0,181,-47,6,39],[0,190,-49,10,2],[0,192,-47,8,4],[0,194,-43,6,4],[0,196,-39,4,4],[26,198,-34,1,1],[0,187,-36,5,1],[0,187,-32,3,1],[32,188,-30,1,1],[31,47,-44,1,1],[3,187,-20,2,1],[0,191,-18,1,1],[0,194,-15,1,1],[0,197,-12,1,1],[35,197,-10,1,1],[0,176,-19,5,1],[10,176,-18,1,1,3,0],[0,176,-31,5,1],[11,176,-30,1,1,3,0],[0,171,-14,4,1,0,-31],[0,176,-42,5,1],[11,176,-41,1,1,3,0],[34,179,-28,1,1],[0,158,-30,5,1],[10,158,-29,1,1,3,0],[0,138,7,3,1],[0,138,14,3,1],[0,142,18,3,1],[0,138,22,1,1],[0,62,-46,3,1,8,0],[30,15,5,1,1],[0,200,-58,29,8],[0,200,-50,29,42]];
  //const global = [];
  let backward = false;

  let mapData = {
    map: [],
    enemy: [],
    doors: [],
    keys: [],
    upgrades: [],
    checkpoints: [],
    mechanics: [],
    start: new V(),
    end: new V()
  };

  function initLevel() {
    mapData = {
      map: [],
      enemy: [],
      doors: [],
      keys: [],
      upgrades: [],
      checkpoints: [],
      mechanics: [],
      start: new V(),
      end: new V()
    };
    global.forEach((item) => {
      // Blocks
      if (item[0] === 4) {
        mapData.mechanics.push(new SawBlock(
          item[0],
          item[1] * scale,
          item[2] * scale,
          item[3] * scale,
          item[4] * scale,
          (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)
        ));
      } else if (item[0] < 10) {
        mapData.map.push(new Block(
          item[0],
          item[1] * scale,
          item[2] * scale,
          item[3] * scale,
          item[4] * scale,
          (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)
        ));
      //Enemies
      } else if (item[0] === 10) {
        mapData.enemy.push(new Enemy1(item[1] * scale, item[2] * scale, (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)));
      } else if (item[0] === 11) {
        mapData.enemy.push(new Enemy2(item[1] * scale, item[2] * scale, (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)));
      } else if (item[0] >= 21 && item[0] < 25) {
        mapData.doors.push(new Door(item[0], item[1] * scale, item[2] * scale));
      } else if (item[0] >= 25 && item[0] <= 28) {
        mapData.keys.push(new Key(item[0], item[1] * scale, item[2] * scale));
      } else if (item[0] === 30) {
        mapData.start = new V(item[1] * scale, item[2] * scale);
      } else if (item[0] === 33) {
        mapData.checkpoints.push(new Checkpoint(item[1] * scale, item[2] * scale));
      } else if (item[0] < 40) {
        mapData.upgrades.push(new Upgrade(item[0], item[1] * scale, item[2] * scale));
      }
    });
  }

  return {
    i: () => {
      initLevel();
    },
    reset: () => {
      // initLevel();
    },
    setMap: (map) => {
      global = map;
    },
    n: () => {
      mapData.map.forEach((item) => {
        item.n();
      });

      mapData.enemy.forEach((item) => {
        item.n();
      });

      mapData.doors.forEach((item) => {
        item.n();
      });

      mapData.mechanics.forEach((item) => {
        item.n();
      });

      mapData.keys = mapData.keys.filter((key) => key.active);

      mapData.keys.forEach((key) => {
        key.n();
      });

      mapData.upgrades = mapData.upgrades.filter((upgrade) => upgrade.active);

      mapData.upgrades.forEach((upgrade) => {
        upgrade.n();
      });

      mapData.checkpoints.forEach((checkpoint) => {
        checkpoint.n();
      });
    },
    r: () => {
      mapData.map.forEach((item) => {
        item.r();
      });

      mapData.mechanics.forEach((item) => {
        item.r();
      });

      mapData.enemy.forEach((item) => {
        item.r();
      });
      mapData.doors.forEach((item) => {
        item.r();
      });
      mapData.keys.forEach((item) => {
        item.r();
      });
      mapData.upgrades.forEach((upgrade) => {
        upgrade.r();
      });
      mapData.checkpoints.forEach((checkpoint) => {
        checkpoint.r();
      });
    },
    getMap: () => mapData,
    currentLevel: () => currentLevel,
    nextLevel: (direction) => {
      backward = direction === -1;
      currentLevel += direction;
    },
    getStart: () => mapData.start,
    getCharacterStart: () => (backward ? mapData.end : mapData.start),
    isFirst: () => (currentLevel === 0),
  };
})();
