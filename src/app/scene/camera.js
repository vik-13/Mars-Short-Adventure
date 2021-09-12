window.camera = (() => {
  let position = new V();
  let to = new V();

  return {
    i: () => {
      const characterPosition = character.position();
      position.apply(new V(characterPosition.x - (gc.res.x / 2), characterPosition.y - (gc.res.y / 3)));
    },
    reset: () => {
      const characterPosition = character.position();
      position.apply(new V(characterPosition.x - (gc.res.x / 2), characterPosition.y - (gc.res.y / 3)));
    },
    n: () => {
      const characterPosition = character.position().get();

      to.apply(new V(characterPosition.x - gc.res.x / 2, characterPosition.y - (gc.res.y / (character.isSitting() ? 2 : 3))));
      // to.apply(new V(characterPosition.x - (character.isMirrored() ? (2 * gc.res.x / 3) : (gc.res.x / 3)), characterPosition.y - (gc.res.y / (character.isSitting() ? 2 : 3))));
      position.add(to.get().sub(position).mult(.05));

      if (position.y - characterPosition.y > -100) {
        position.y = characterPosition.y - 100;
      }
    },
    r: () => {
      c.translate(-position.x, -position.y);
    },
    getPosition: () => position
  };
})();
