window.map = (() => {
  const scale = 40;
  let currentLevel = 15;
  let global = [[0,0,0,35,5],[0,38,0,62,5],[0,38,5,2,3],[0,34,7,4,1],[21,34,5,1,1],[0,35,4,3,1,0,-54],[0,0,-8,35,8],[0,38,-8,62,8],[0,-100,0,100,5],[0,-100,-8,100,8],[0,100,0,100,5],[0,100,-8,100,8],[0,-29,7,21,43],[24,-15,5,1,1],[0,-11,50,3,50],[0,-100,5,12,45],[0,-100,50,12,50],[0,200,0,100,5],[0,200,-8,100,8],[30,23,5,1,1]];
  // const global = [];
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

      mapData.enemy = mapData.enemy.filter((key) => key.active);
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
