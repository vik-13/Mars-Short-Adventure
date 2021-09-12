window.map = (() => {
  const scale = 40;
  let currentLevel = 15;
  const global = [[30,36,1,1,1],[0,45,4,22,1],[10,49,5,1,1],[0,0,3,11,14],[0,26,3,1,8],[22,10,1,1,1],[23,26,1,1,1],[24,18,1,1,1],[21,33,1,1,1],[0,18,3,1,7],[0,33,3,1,5],[27,56,6,1,1],[0,0,0,100,1],[33,73,1,1,1],[1,27,5,6,1],[1,19,5,7,1],[1,11,8,7,1],[32,39,3,1,1],[34,43,2,1,1]];
  let backward = false;

  let mapData = {
    map: [],
    enemy: [],
    doors: [],
    keys: [],
    upgrades: [],
    checkpoints: [],
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
      start: new V(),
      end: new V()
    };
    global.forEach((item) => {
      // Blocks
      if (item[0] < 10) {
        mapData.map.push(new Block(
          item[0],
          item[1] * scale,
          item[2] * scale,
          item[3] * scale,
          item[4] * scale,
          (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)
        ));
      //Enemies
      } else if (item[0] < 20) {
        // mapData.enemy.push(new Enemy1(item[0]), item[1] * scale, item[2] * scale);
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
      // if (item[0] === 4) {
      //   mapData.map.push();
      // } else if (item[0] === 5) {
      //   mapData.enemy.push(new SawBlock(item[0], item[1] * scale, item[2] * scale, item[3] * scale, item[4] * scale, (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)));
      // } else if (item[0] === 6) {
      //   mapData.start = new V(item[1] * scale, item[2] * scale);
      // } else if (item[0] === 7) {
      //   mapData.end = new V(item[1] * scale, item[2] * scale);
      // } else if (item[0] === 3) {
      //   mapData.enemy.push(new PowerBlock(item[0], item[1] * scale, item[2] * scale));
      // } else if (item[0] === 8) {
      //   mapData.enemy.push(new FanBlock(item[0], item[1] * scale, item[2] * scale));
      // } else {
      //   mapData.map.push(new Block(item[0], item[1] * scale, item[2] * scale, item[3] * scale, item[4] * scale, (typeof item[5] !== 'undefined' ? new V(item[5], item[6]) : new V()).get().mult(scale)));
      // }
    });
  }

  return {
    i: () => {
      initLevel();
    },
    reset: () => {
      // initLevel();
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
