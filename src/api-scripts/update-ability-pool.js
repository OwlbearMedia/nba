// Function to adjust ability pool after spending points on a roll
on('ready', () => {
  on("chat:message", (msg) => {
    if (msg.inlinerolls) {
      // parsing roll result
      const pointSpend = parseInt(msg.content.match(/{points=.+?(?=})/)[0].split('=')[1], 10);
      const ability = msg.content.match(/{ability=.+?(?=})/)[0].split('=')[1].replace('-a', '').replace('^{', '');
      const name = msg.content.match(/{name=.+?(?=})/)[0].split('=')[1];
      // getting character info
      const character = findObjs({ type: 'character', name })[0];
      const characterAbility = findObjs({ type: 'attribute', characterid: character.id, name: `${ability}_pool` })[0];
      const characterAbilityMod = findObjs({ type: 'attribute', characterid: character.id, name: `${ability}_roll` })[0];
      const characterAbilityValue = parseInt(characterAbility.get('current'), 10);

      if (characterAbility) characterAbility.setWithWorker('current',  characterAbilityValue - pointSpend);
      if (characterAbilityMod) characterAbilityMod.setWithWorker('current', 0);
    }
  });
});
