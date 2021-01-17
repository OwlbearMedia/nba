const abilityValues = ['-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
const abilities = ['athletics', 'conceal', 'cover', 'digital_intrusion', 'disguise', 'driving', 'explosive_devices', 'filch', 'hand_to_hand', 'infiltration', 'mechanics', 'medic', 'network', 'piloting', 'preparedness', 'sense_trouble', 'shooting', 'shrink', 'surveillance', 'weapons', 'accounting', 'archaeology', 'architecture', 'art_history', 'criminology', 'diagnosis', 'history', 'human_terrain', 'languages', 'law', 'military_science', 'occult_studies', 'research', 'vampirology', 'bullshit_detector', 'bureaucracy', 'cop_talk', 'flattery', 'flirting', 'high_society', 'interrogation', 'intimidation', 'negotiation', 'reassurance', 'streetwise', 'tradecraft', 'astronomy', 'chemistry', 'cryptography', 'data_recovery', 'electronic_surveillance', 'forensic_pathology', 'forgery', 'notice', 'outdoor_survival', 'pharmacy', 'photography', 'traffic_analysis', 'urban_survival', 'health', 'stability'];
const armors = [
  {
    name: 'None',
    resistance: {
      bullets: '0',
      melee: '0',
      explosives: '0'
    }
  },
  {
    name: 'Ballistic cloth',
    resistance: {
      bullets: '1',
      melee: '1',
      explosives: '0'
    }
  },
  {
    name: 'Police Vest',
    resistance: {
      bullets: '2',
      melee: '2',
      explosives: '0'
    }
  },
  {
    name: 'Military Armor',
    resistance: {
      bullets: '3',
      melee: '3',
      explosives: '3'
    }
  },
  {
    name: 'Other',
    resistance: {
      bullets: '0',
      melee: '0',
      explosives: '0'
    }
  },
];

abilityValues.forEach((value) => {
  abilities.forEach((ability) => {
    on(`clicked:${ability}_pool_${value}`, (eventInfo) => {
      const pool = `${ability}_pool`;
      const payload = {};

      getAttrs([pool, ability], function(values) {
        if (values[pool] === '1' && value === '1') {
          payload[pool] = 0;
        } else if (parseInt(value, 10) > parseInt(values[ability], 10)) {
          payload[pool] = values[pool];
        } else {
          payload[pool] = value;
        }
        setAttrs(payload);
      });
    });
  }); 
});

abilities.forEach((ability) => {
  on(`change:${ability}`, (eventInfo) => {
    const pool = `${ability}_pool`;
    const payload = {};
    
    payload[pool] = eventInfo.newValue;
    setAttrs(payload);
  });
});

on('change:armor_type', (eventInfo) => {
  const armor = armors.find(el => el.name === eventInfo.newValue)

  console.log(armor);

  setAttrs({
    armor_bullets: armor.resistance.bullets,
    armor_melee: armor.resistance.melee,
    armor_explosives: armor.resistance.explosives,
  });
});

for (let value = 1; value <= 5; value++) {
  on(`clicked:repeating_trust:trustlevelpool-${value}`, (eventInfo) => {
    const pool = eventInfo.sourceAttribute.replace(`-${value}`, '');
    const ability = eventInfo.sourceAttribute.replace(`pool-${value}`, '');
    const payload = {};
  
    getAttrs([pool, ability], function(values) {
      if (values[pool] === 1 && value === 1) {
        payload[pool] = 0;
      } else if (parseInt(value, 10) > parseInt(values[ability], 10)) {
        payload[pool] = values[pool];
      } else {
        payload[pool] = value;
      }
      setAttrs(payload);
    });
  }); 
}

// on('change:shooting_pool sheet:opened', (e) => {
on('change:shooting_pool', (e) => {
  getSectionIDs('repeating_shooting-weapons', rowids => {
    const output = {};
    rowids.forEach(id => output[`repeating_shooting-weapons_${id}_shooting-pool`] = e.newValue);
    setAttrs(output);
  });
});

on('change:weapons_pool', (e) => {
  getSectionIDs('repeating_weapons-weapons', rowids => {
    const output = {};
    rowids.forEach(id => output[`repeating_weapons-weapons_${id}_shooting-pool`] = e.newValue);
    setAttrs(output);
  });
});

on('change:hand_to_hand_pool', (e) => {
  getSectionIDs('repeating_hand-to-hand-weapons', rowids => {
    const output = {};
    rowids.forEach(id => output[`repeating_hand-to-hand-weapons_${id}_shooting-pool`] = e.newValue);
    setAttrs(output);
  });
});
