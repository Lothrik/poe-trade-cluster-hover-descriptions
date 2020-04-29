// ==UserScript==
// @name         poe-trade-cluster-hover-descriptions
// @namespace    github.com/Lothrik
// @version      2020.04.28.1
// @description  Adds mouseover descriptions to all cluster jewel keystones and notables on pathofexile.com/trade, poe.trade, and poeapp.com.
// @author       Lothrik (MaXiMiUS)#1560 (discordapp.com)
// @license      MIT
// @include      *pathofexile.com/trade*
// @include      *poe.trade*
// @include      *poeapp.com*
// ==/UserScript==

/*
// https://www.pathofexile.com/forum/view-thread/2783927

var keys = Array.prototype.slice.call(document.querySelectorAll('.passive-header'));
var values = Array.prototype.slice.call(document.querySelectorAll('.passive-stats'));
var obj = {};

keys.forEach(function(key, index) {
  obj[key.textContent] = values[index].innerHTML.split('<br>').join('&#10;');
});

console.log(JSON.stringify(obj));
*/

/*
The following changes were manually added to the keystones below:
    None. GGG hasn't modified any cluster jewel keystones as of patch 3.10.1c.
*/
const keystones = {
    "Disciple of Kitava":"Every second, Consume a nearby Corpse to Recover 5% of Life and Mana&#10;10% more Damage taken if you haven't Consumed a Corpse Recently",
    "Lone Messenger":"You can only have one Herald&#10;50% more Effect of Herald Buffs on you&#10;100% more Damage with Hits from Herald Skills&#10;50% more Damage Over Time with Herald Skills&#10;Minions from Herald Skills deal 25% more Damage&#10;Your Aura Skills are Disabled",
    "Nature's Patience":"Gain 2 Grasping Vines each second while stationary&#10;2% chance to deal Double Damage per Grasping Vine&#10;1% less Damage taken per Grasping Vine",
    "Secrets of Suffering":"Cannot Ignite, Chill, Freeze or Shock&#10;Critical Strikes inflict Scorch, Brittle and Sapped",
    "Kineticism":"Attack Projectiles always inflict Bleeding and Maim, and Knock Back Enemies&#10;Projectiles cannot Pierce, Fork or Chain",
    "Veteran's Awareness":"+10% to all Elemental Resistances and maximum Elemental Resistances while affected by a Non-Vaal Guard Skill&#10;20% more Damage taken if a Non-Vaal Guard Buff was lost Recently&#10;20% additional Physical Damage Reduction while affected by a Non-Vaal Guard Skill",
    "Hollow Palm Technique":"You count as Dual Wielding while you are Unencumbered&#10;60% more Attack Speed while you are Unencumbered&#10;14 to 20 Added Attack Physical Damage per 10 Dexterity while you are Unencumbered"
};

/*
The following changes were manually added to the notables below:
    Undocumented:
        Spiked Concoction now only applies to Non-Unique Flasks.
    https://pathofexile.gamepedia.com/Version_3.10.1c:
        Reduced the value of "Auras from your Skills grant 0.2% of Life Regenerated per second to you and Allies" found on the Replenishing Presence notable to 0.1%.
        The Purposeful Harbinger notable now grants "Aura Buffs from Skills have 10% increased Effect on you for each Herald affecting you".
*/
const notables = {
    "Prodigious Defence":"3% Chance to Block Spell Damage&#10;30% increased Attack Damage while holding a Shield&#10;+3% Chance to Block Attack Damage",
    "Advance Guard":"Attack Skills deal 30% increased Damage while holding a Shield&#10;Ignore all Movement Penalties from Armour&#10;5% increased Movement Speed while holding a Shield",
    "Gladiatorial Combat":"2% increased Attack Damage per 75 Armour or Evasion Rating on Shield&#10;+1% to Critical Strike Multiplier per 10 Maximum Energy Shield on Shield",
    "Strike Leader":"Attack Skills deal 30% increased Damage while holding a Shield&#10;+2% Chance to Block Attack Damage&#10;+2 to Melee Strike Range while Holding a Shield",
    "Powerful Ward":"20% chance to gain a Power Charge when you Block&#10;+6% Chance to Block Spell Damage while at Maximum Power Charges",
    "Enduring Ward":"20% chance to gain an Endurance Charge when you Block&#10;+6% Chance to Block Attack Damage while at Maximum Endurance Charges",
    "Gladiator's Fortitude":"Attack Skills deal 25% increased Damage while holding a Shield&#10;5% increased maximum Life",
    "Precise Retaliation":"80% increased Critical Strike Chance if you haven’t Blocked Recently&#10;+40% to Critical Strike Multiplier if you have Blocked Recently",
    "Veteran Defender":"+15 to all Attributes&#10;+15% Elemental Resistances while holding a Shield&#10;60% increased Defences from Equipped Shield",
    "Iron Breaker":"Enemies have -10% to Total Physical Damage Reduction against your Hits&#10;35% increased Physical Damage",
    "Deep Cuts":"15% chance to Impale Enemies on Hit with Attacks&#10;Impales you inflict last 1 additional Hit",
    "Master the Fundamentals":"+10% to all Elemental Resistances&#10;35% reduced Elemental Damage&#10;35% increased Physical Damage",
    "Force Multiplier":"5% chance to deal Double Damage&#10;25% increased Physical Damage",
    "Furious Assault":"8% increased Attack and Cast Speed&#10;25% increased Physical Damage",
    "Vicious Skewering":"Attacks have 10% chance to cause Bleeding&#10;10% chance to Impale Enemies on Hit with Attacks&#10;15% increased Effect of Impales inflicted by Hits that also inflict Bleeding",
    "Grim Oath":"Gain 10% of Physical Damage as Extra Chaos Damage",
    "Battle-Hardened":"30% increased Evasion Rating and Armour&#10;35% increased Physical Damage",
    "Replenishing Presence":"8% increased effect of Non-Curse Auras from your Skills&#10;Auras from your Skills grant 0.1% of Life Regenerated per second to&#10;you and Allies",
    "Master of Command":"50% reduced Mana Reservation of Banner Skills&#10;15% increased Effect of Non-Curse Auras from your Skills on Enemies",
    "First Among Equals":"10% increased effect of Non-Curse Auras from your Skills&#10;Non-Curse Aura Skills have 20% increased Duration",
    "Purposeful Harbinger":"Aura Buffs from Skills have 10% increased Effect on you for each Herald affecting you",
    "Precise Commander":"You and nearby Allies have 50% increased Critical Strike Chance&#10;You and nearby Allies have +15% to Critical Strike Multiplier",
    "Pure Commander":"Purity of Elements has 30% increased Aura Effect&#10;Purity of Fire has 30% increased Aura Effect&#10;Purity of Ice has 30% increased Aura Effect&#10;Purity of Lightning has 30% increased Aura Effect",
    "Stalwart Commander":"Grace has 30% increased Aura Effect&#10;Determination has 30% increased Aura Effect&#10;Discipline has 30% increased Aura Effect",
    "Vengeful Commander":"Anger has 30% increased Aura Effect&#10;Wrath has 30% increased Aura Effect&#10;Hatred has 30% increased Aura Effect",
    "Skullbreaker":"8% reduced Enemy Stun Threshold&#10;+20% to Critical Strike Multiplier",
    "Pressure Points":"Your Critical Strikes have a 5% chance to deal Double Damage&#10;40% increased Critical Strike Chance",
    "Overwhelming Malice":"10% chance to gain Unholy Might for 4 seconds on Critical Strike",
    "Magnifier":"10% increased Area of Effect&#10;10% increased Area Damage&#10;+10% to Critical Strike Multiplier",
    "Savage Response":"+50% to Critical Strike Multiplier if you've taken a Savage Hit Recently&#10;40% increased Critical Strike Chance",
    "Eye of the Storm":"+20% to Damage over Time Multiplier for Ignite from Critical Strikes&#10;20% increased Effect of Chill you inflict with Critical Strikes&#10;20% increased Effect of Shock you inflict with Critical Strikes&#10;40% increased Critical Strike Chance",
    "Basics of Pain":"20% increased Damage&#10;30% increased Critical Strike Chance",
    "Quick Getaway":"5% increased Attack and Cast Speed&#10;5% increased Movement Speed if you've dealt a Critical Strike Recently&#10;25% increased Critical Strike Chance",
    "Assert Dominance":"10% increased Area Damage&#10;15% increased Area of Effect if you've Killed Recently&#10;10% increased Area of Effect if you've Killed at least 5 Enemies Recently",
    "Vast Power":"20% increased Area Damage&#10;3% increased Area of Effect per Power Charge",
    "Powerful Assault":"20% increased Area Damage&#10;Area Skills have 10% chance to Knock Enemies Back on Hit",
    "Intensity":"10% increased Area Damage&#10;Skills supported by Intensify have +1 to maximum Intensity",
    "Titanic Swings":"20% increased Area Damage while wielding a Two Handed Melee Weapon&#10;15% increased Area of Effect while wielding a Two Handed Melee Weapon",
    "Towering Threat":"5% increased maximum Life&#10;10% increased Area of Effect&#10;3% increased Character Size",
    "Ancestral Echo":"20% increased Totem Placement speed&#10;10% increased Attack and Cast Speed if you've summoned a Totem Recently",
    "Ancestral Reach":"25% increased Totem Damage&#10;25% increased Totem Placement speed&#10;25% increased Totem Placement range",
    "Ancestral Might":"20% increased Totem Damage&#10;30% increased Totem Duration&#10;30% increased Totem Damage if you haven't Summoned a Totem in the past 2 seconds",
    "Ancestral Preservation":"30% increased Totem Life&#10;Totems have 10% additional Physical Damage Reduction&#10;Totems gain +40% to Chaos Resistance",
    "Snaring Spirits":"30% increased Totem Damage&#10;Totems Hinder Enemies near them when Summoned, with 25% reduced Movement Speed",
    "Sleepless Sentries":"20% increased Totem Damage&#10;20% increased Totem Duration&#10;Attack Skills have +1 to maximum number of Summoned Ballista Totems",
    "Ancestral Guidance":"30% increased Effect of Buffs granted by your Active Ancestor Totems&#10;Totems' Action Speed cannot be modified to below base value",
    "Ancestral Inspiration":"Gain Arcane Surge when you Summon a Totem&#10;Spells cast by Totems deal 25% increased Damage",
    "Vital Focus":"Channelling Skills deal 30% increased Damage&#10;Regenerate 1.5% of Life per second while Channelling",
    "Rapid Infusion":"50% increased Effect of Infusion&#10;5% increased Movement Speed while you have Infusion",
    "Unwavering Focus":"40% chance to Avoid being Stunned while Channelling&#10;Channelling Skills deal 25% increased Damage&#10;15% reduced Mana Cost of Channelling Skills",
    "Enduring Focus":"Channelling Skills deal 25% increased Damage&#10;25% chance to gain an Endurance Charge each second while Channelling",
    "Precise Focus":"50% increased Critical Strike Chance while Channelling&#10;+30% to Critical Strike Multiplier if you've been Channelling for at least 1 second",
    "Stoic Focus":"+4% Chance to Block Attack Damage while Channelling&#10;+4% Chance to Block Spell Damage while Channelling&#10;Channelling Skills deal 25% increased Damage",
    "Hex Breaker":"8% increased Attack and Cast Speed while Channelling&#10;Immune to Curses while Channelling",
    "Arcane Adept":"5% increased Attack and Cast Speed while Channelling&#10;Channelling Skills deal 20% increased Damage&#10;Gain Arcane Surge after Channelling for 1 second",
    "Distilled Perfection":"25% increased Life Recovery from Flasks&#10;25% increased Mana Recovery from Flasks&#10;20% increased Flask Effect Duration",
    "Spiked Concoction":"Non-Unique Flasks applied to you have 10% increased Effect&#10;5% increased Attack and Cast Speed during any Flask Effect",
    "Fasting":"20% increased Flask Charges gained&#10;20% increased Movement Speed while under no Flask Effects",
    "Mender's Wellspring":"25% increased Life Recovery from Flasks&#10;Life Flasks gain 1 Charge every 3 seconds&#10;Remove Bleeding when you use a Life Flask",
    "Special Reserve":"20% increased Damage during any Flask Effect&#10;Regenerate 2% of Life per second during any Flask Effect",
    "Numbing Elixir":"25% increased Life Recovery from Flasks&#10;25% increased Mana Recovery from Flasks&#10;3% additional Physical Damage Reduction during Effect of any Life or Mana Flask",
    "Mob Mentality":"20% increased Warcry Cooldown Recovery Speed&#10;You and nearby Party members gain 5 Rage when you Warcry",
    "Cry Wolf":"30% increased Warcry Duration&#10;Warcries count as having 10 additional nearby Enemies&#10;30% increased Warcry Buff Effect",
    "Haunting Shout":"20% increased Warcry Cooldown Recovery Speed&#10;Enemies Taunted by your Warcries are Intimidated&#10;Enemies Taunted by your Warcries are Unnerved",
    "Lead By Example":"4% additional Physical Damage Reduction if you've Warcried in the past 8 seconds&#10;4% chance to deal Double Damage if you've Warcried in the past 8 seconds",
    "Provocateur":"40% increased Critical Strike Chance against Taunted Enemies&#10;+15% to Critical Strike Multiplier against Taunted Enemies&#10;15% increased Warcry Buff Effect",
    "Warning Call":"20% increased Warcry Cooldown Recovery Speed&#10;50% increased Melee Critical Strike Chance if you've Warcried Recently&#10;+35% to Melee Critical Strike Multiplier if you've Warcried Recently",
    "Rattling Bellow":"Enemies Taunted by you take 5% increased Damage&#10;Warcry Skills have 40% increased Area of Effect",
    "Bloodscent":"Attacks with Axes or Swords grant 1 Rage on Hit, no more than once every second",
    "Run Through":"Axe or Sword Attacks deal 15% increased Damage with Ailments&#10;10% increased Impale Effect&#10;10% chance to Impale Enemies on Hit with Axes or Swords&#10;15% increased Physical Damage with Axes or Swords",
    "Wound Aggravation":"Axe or Sword Attacks deal 20% increased Damage with Ailments&#10;20% increased Physical Damage with Axes or Swords&#10;+10% to Physical Damage over Time Multiplier while wielding an Axe or Sword",
    "Overlord":"30% increased Damage with Maces, Sceptres or Staves&#10;Gain Fortify for 6 seconds on Melee Hit with a Mace, Sceptre or Staff",
    "Expansive Might":"Mace, Sceptre or Staff Attacks deal 20% increased Damage with Hits and Ailments&#10;While stationary, gain 10% increased Area of Effect every second, up to a maximum of 50%",
    "Weight Advantage":"Mace, Sceptre or Staff Attacks deal 30% increased Damage with Hits and Ailments&#10;4% chance to deal Double Damage while wielding a Mace, Sceptre or Staff&#10;+20 to Strength",
    "Wind-up":"+15% to Critical Strike Multiplier with Claws or Daggers&#10;10% chance to gain a Power Charge on Non-Critical Strike with a Claw or Dagger",
    "Fan of Blades":"Attack Skills fire an additional Projectile while wielding a Claw or Dagger&#10;20% increased Projectile Attack Damage with Claws or Daggers",
    "Disease Vector":"Enemies Poisoned by you cannot Regenerate Life&#10;+10% to Damage over Time Multiplier for Poison while wielding a Claw or Dagger",
    "Arcing Shot":"Arrows gain Critical Strike Chance as they travel farther, up to 100% increased Critical Strike Chance&#10;Arrows gain Damage as they travel farther, dealing up to 50% increased Damage with Hits to targets",
    "Tempered Arrowheads":"Bow Skills have +10% to Damage over Time Multiplier&#10;Bow Skills have 20% increased Skill Effect Duration&#10;10% increased Duration of Ailments inflicted while wielding a Bow",
    "Broadside":"Bow Skills have 25% increased Area of Effect",
    "Explosive Force":"Enemies killed by your Wand Hits have a 10% chance to Explode, dealing a quarter of their Life as Chaos Damage&#10;Gain 10% of Wand Physical Damage as Extra Chaos Damage",
    "Opportunistic Fusilade":"50% increased Critical Strike Chance with Wands&#10;35% increased Damage with Wands if you've dealt a Critical Strike Recently",
    "Storm's Hand":"Gain 10% of Wand Physical Damage as Extra Lightning Damage&#10;25% of Wand Physical Damage converted to Lightning Damage",
    "Battlefield Dominator":"Attacks with Two Handed Weapons deal 25% increased Damage with Hits and Ailments&#10;10% reduced Enemy Stun Threshold&#10;15% increased Area of Effect if you've Stunned an Enemy with a Two Handed Melee Weapon Recently",
    "Martial Mastery":"10% increased Attack Speed with Two Handed Melee Weapons&#10;10% increased Attack Speed if you have at least 600 Strength&#10;+20 to Strength",
    "Surefooted Striker":"40% increased Critical Strike Chance with Two Handed Melee Weapons&#10;8% chance to deal Double Damage if you've dealt a Critical Strike with a Two Handed Melee Weapon Recently",
    "Graceful Execution":"5% increased Attack Speed with Two Handed Melee Weapons&#10;15% increased Accuracy Rating with Two Handed Melee Weapons&#10;25% increased Critical Strike Chance with Two Handed Melee Weapons&#10;+15 to Dexterity and Intelligence",
    "Brutal Infamy":"40% increased Damage with Hits and Ailments against Unique Enemies",
    "Fearsome Warrior":"8% increased Area of Effect&#10;25% chance to Intimidate nearby Enemies for 4 seconds on Melee Kill",
    "Combat Rhythm":"10% increased Attack Speed if you've Hit with your Main Hand Weapon Recently&#10;10% increased Movement Speed if you've Hit with your Off Hand Weapon Recently",
    "Hit and Run":"Attack Skills deal 20% increased Damage while Dual Wielding&#10;4% chance to Dodge Attack or Spell Hits if you've Hit an Enemy Recently",
    "Insatiable Killer":"Attack Skills deal 20% increased Damage while Dual Wielding&#10;5% increased Attack Speed while Dual Wielding&#10;5% chance to gain a Frenzy Charge on Kill while Dual Wielding",
    "Mage Bane":"+5% Chance to Block Spell Damage while Dual Wielding&#10;Attack Skills deal 20% increased Damage while Dual Wielding&#10;20% chance to gain a Power Charge when you Block",
    "Martial Momentum":"8% increased Attack Speed while Dual Wielding&#10;16% increased Accuracy Rating while Dual Wielding&#10;32% increased Damage if you've used a Travel Skill Recently",
    "Deadly Repartee":"+5% Chance to Block Attack Damage while Dual Wielding&#10;Attack Skills deal 25% increased Damage while Dual Wielding&#10;30% increased Attack Critical Strike Chance while Dual Wielding",
    "Quick and Deadly":"60% increased Main Hand Attack Damage while wielding two different Weapon Types&#10;30% increased Off Hand Attack Speed while wielding two different Weapon Types",
    "Smite the Weak":"40% increased Attack Damage against Maimed Enemies&#10;Attacks have 10% chance to Maim on Hit",
    "Heavy Hitter":"30% increased Attack Damage&#10;10% reduced Enemy Stun Threshold&#10;20% chance to double Stun Duration&#10;30% increased Damage with Ailments from Attack Skills",
    "Martial Prowess":"20% increased Attack Damage&#10;6% increased Attack Speed&#10;15% increased Global Accuracy Rating&#10;20% increased Damage with Ailments from Attack Skills",
    "Calamitous":"10% chance to Freeze, Shock and Ignite&#10;30% increased Elemental Damage with Attack Skills&#10;15% increased Effect of Non-Damaging Ailments",
    "Devastator":"20% increased Attack Damage&#10;20% increased Damage with Ailments from Attack Skills&#10;Enemies killed by your Attack Hits have a 15% chance to Explode, dealing a tenth of their maximum Life as Physical Damage",
    "Fuel the Fight":"8% increased Attack Speed&#10;0.4% of Attack Damage Leeched as Mana&#10;20% increased Damage while Leeching",
    "Drive the Destruction":"0.8% of Attack Damage Leeched as Life&#10;20% increased Maximum total Recovery per second from Life Leech&#10;20% increased total Recovery per second from Life Leech",
    "Feed the Fury":"0.4% of Attack Damage Leeched as Life&#10;30% increased Damage while Leeching&#10;15% increased Attack Speed while Leeching",
    "Seal Mender":"Skills Supported by Unleash have 30% increased Seal gain frequency",
    "Conjured Wall":"25% increased Spell Damage&#10;+6% Chance to Block Spell Damage if you've Cast a Spell Recently",
    "Arcane Heroism":"30% increased Effect of Arcane Surge on you&#10;10% chance to gain Arcane Surge when you Hit a Unique enemy",
    "Practiced Caster":"20% increased Spell Damage&#10;5% increased Cast Speed&#10;35% chance to Avoid interruption from Stuns while Casting",
    "Burden Projection":"30% increased Spell Damage&#10;8% chance to Knock Enemies Back on Hit with Spell Damage",
    "Thaumophage":"0.6% of Spell Damage Leeched as Energy Shield&#10;20% increased Maximum total Recovery per second from Energy Shield Leech&#10;10% chance to Hinder Enemies on Hit with Spells, with 30% reduced Movement Speed",
    "Essence Rush":"40% increased Damage while Leeching Energy Shield&#10;0.3% of Spell Damage Leeched as Energy Shield&#10;5% increased Attack and Cast Speed while Leeching Energy Shield",
    "Sap Psyche":"20% increased Spell Damage&#10;30% increased Mana Regeneration Rate&#10;Regenerate 1% of Energy Shield per second if you’ve Cursed an Enemy Recently",
    "Sadist":"15% increased Elemental Damage if you've Chilled an Enemy Recently&#10;20% increased Elemental Damage if you've Ignited an Enemy Recently&#10;25% increased Elemental Damage if you've Shocked an Enemy Recently",
    "Corrosive Elements":"15% increased Elemental Damage&#10;Cold Skills have a 25% chance to apply Cold Exposure on Hit&#10;Fire Skills have a 25% chance to apply Fire Exposure on Hit&#10;Lightning Skills have a 25% chance to apply Lightning Exposure on Hit",
    "Doryani's Lesson":"0.2% of Elemental Damage Leeched as Life&#10;25% increased Elemental Damage",
    "Disorienting Display":"25% increased Elemental Damage&#10;10% chance to Blind nearby Enemies when you use an Elemental Skill",
    "Prismatic Heart":"+10% to all Elemental Resistances&#10;30% increased Elemental Damage",
    "Widespread Destruction":"10% increased Area of Effect&#10;20% increased Elemental Damage",
    "Master of Fire":"Nearby Enemies have Fire Exposure",
    "Smoking Remains":"35% increased Fire Damage&#10;10% chance to create a Smoke Cloud on Kill",
    "Cremator":"30% increased Fire Damage&#10;Ignited Enemies you hit are destroyed on Kill",
    "Snowstorm":"Gain 10% of Lightning Damage as Extra Cold Damage against Chilled Enemies",
    "Storm Drinker":"Damage Penetrates 8% Lightning Resistance&#10;0.5% of Lightning Damage Leeched as Energy Shield",
    "Paralysis":"30% increased Lightning Damage&#10;10% chance to double Stun Duration&#10;Lightning Skills have 10% reduced Enemy Stun Threshold",
    "Supercharge":"Lightning Damage with Non-Critical Strikes is Lucky",
    "Blanketed Snow":"Damage Penetrates 10% Cold Resistance against Chilled Enemies",
    "Cold to the Core":"1% increased Cold Damage per 25 Dexterity&#10;1% increased Cold Damage per 25 Intelligence&#10;1% increased Cold Damage per 25 Strength",
    "Cold-Blooded Killer":"20% increased Cold Damage&#10;Recover 2% of Life on Kill",
    "Touch of Cruelty":"Chaos Skills have 10% chance to Hinder Enemies on Hit, with 30% reduced Movement Speed&#10;Enemies Hindered by you take 10% increased Chaos Damage",
    "Unwaveringly Evil":"30% increased Chaos Damage&#10;Chaos Skills ignore interruption from Stuns",
    "Unspeakable Gifts":"Enemies you Kill have a 10% chance to Explode, dealing a quarter of their maximum Life as Chaos Damage",
    "Dark Ideation":"2% increased Chaos Damage per 100 maximum Mana, up to a maximum of 80%",
    "Unholy Grace":"30% increased Chaos Damage&#10;10% increased Attack and Cast Speed",
    "Wicked Pall":"35% increased Chaos Damage&#10;20% increased Skill Effect Duration",
    "Renewal":"Minions Regenerate 1% of Life per second&#10;Minions have 10% chance to deal Double Damage while they are on Full Life",
    "Raze and Pillage":"Minions have 20% chance to Ignite&#10;Minions deal 20% increased Damage against Ignited Enemies&#10;Minions gain 6% of Physical Damage as Extra Fire Damage",
    "Rotten Claws":"Minions have a 20% chance to Impale on Hit with Attacks",
    "Call to the Slaughter":"Minions deal 15% increased Damage&#10;Minions created Recently have 10% increased Attack and Cast Speed&#10;Minions created Recently have 30% increased Movement Speed",
    "Skeletal Atrophy":"Summoned Skeletons have 10% chance to Wither Enemies for 2 seconds on Hit&#10;Summoned Skeletons have 30% of Physical Damage Converted to Chaos Damage",
    "Hulking Corpses":"Minions have 20% increased maximum Life&#10;20% increased Raised Zombie Size&#10;Raised Zombies have 5% chance to Taunt Enemies on Hit",
    "Vicious Bite":"Minions have 50% increased Critical Strike Chance&#10;Raised Spectres, Raised Zombies, and Summoned Skeletons have +50% to Critical Strike Multiplier",
    "Primordial Bond":"10% increased Damage per Summoned Golem&#10;40% increased Effect of Buffs granted by your Golems&#10;Golems have 25% increased Maximum Life",
    "Blowback":"Ignites you inflict deal Damage 15% faster",
    "Fan the Flames":"Ignites you inflict spread to other Enemies within a Radius of 15",
    "Cooked Alive":"15% chance to Ignite&#10;Enemies Ignited by you have -10% to Fire Resistance",
    "Burning Bright":"+8% to Fire Damage over Time Multiplier&#10;20% increased Fire Damage&#10;8% increased Area of Effect",
    "Wrapped in Flame":"20% increased Burning Damage&#10;+15% to Fire Damage over Time Multiplier while Burning&#10;Regenerate 1.50% of Life per second while Burning",
    "Vivid Hues":"+12% to Damage over Time Multiplier for Bleeding&#10;2% of Attack Damage Leeched as Life against Bleeding Enemies&#10;20% increased total Recovery per second from Life Leech",
    "Rend":"+12% to Damage over Time Multiplier for Bleeding&#10;30% increased Bleeding Duration",
    "Disorienting Wounds":"25% increased Damage with Bleeding&#10;25% chance to Blind with Hits against Bleeding Enemies",
    "Compound Injury":"50% increased Damage with Bleeding you inflict on Maimed Enemies",
    "Septic Spells":"8% increased Cast Speed&#10;Spell Skills have +10% to Damage over Time Multiplier for Poison&#10;20% chance to Poison on Hit with Spell Damage",
    "Low Tolerance":"+8% to Damage over Time Multiplier for Poison&#10;Poisons you inflict on non-Poisoned Enemies deal 300% increased Damage",
    "Steady Torment":"20% increased Poison Duration&#10;20% increased Bleeding Duration&#10;+10% to Damage over Time Multiplier for Bleeding you inflict on Poisoned Enemies&#10;+10% to Damage over Time Multiplier for Poison you inflict on Bleeding Enemies",
    "Eternal Suffering":"+5% to Chaos Damage over Time Multiplier&#10;Chaos Skills have 30% increased Skill Effect Duration",
    "Eldritch Inspiration":"+8% to Chaos Damage over Time Multiplier&#10;16% increased maximum Mana&#10;20% increased Mana Regeneration Rate",
    "Wasting Affliction":"20% increased Damage with Ailments&#10;Damaging Ailments deal damage 10% faster",
    "Haemorrhage":"+18% to Damage over Time Multiplier for Ailments from Critical Strikes&#10;40% increased Critical Strike Chance",
    "Flow of Life":"24% increased Damage over Time&#10;4% increased maximum Life&#10;Regenerate 0.6% of Life per second",
    "Exposure Therapy":"+10% to Damage over Time Multiplier&#10;+30% Chaos Resistance against Damage Over Time",
    "Brush with Death":"+10% to Damage over Time Multiplier&#10;Recover 1% of Life on Kill&#10;Recover 1% of Energy Shield on Kill",
    "Vile Reinvigoration":"24% increased Damage over Time&#10;6% increased maximum Energy Shield&#10;Regenerate 2% of Energy Shield per second if you’ve Killed an Enemy Recently",
    "Circling Oblivion":"20% increased Damage over Time&#10;20% increased Duration of Ailments on Enemies&#10;15% increased Skill Effect Duration",
    "Brewed for Potency":"24% increased Damage over Time&#10;10% increased Flask Charges gained&#10;20% increased Life and Mana Recovery from Flasks",
    "Astonishing Affliction":"20% increased Duration of Elemental Ailments on Enemies&#10;20% increased Damage with Hits and Ailments against Enemies affected by Ailments&#10;20% increased Effect of Non-Damaging Ailments",
    "Cold Conduction":"Enemies Chilled by your Hits are Shocked&#10;Enemies Shocked by your Hits are Chilled",
    "Inspired Oppression":"20% increased Elemental Damage&#10;30% increased Mana Regeneration Rate if you have Frozen an Enemy Recently&#10;30% increased Mana Regeneration Rate if you have Shocked an Enemy Recently&#10;10% increased Effect of Non-Damaging Ailments",
    "Chilling Presence":"Nearby Enemies are Chilled",
    "Deep Chill":"+10% to Cold Damage over Time Multiplier&#10;30% increased Effect of Chill",
    "Blast-Freeze":"20% increased Cold Damage&#10;Freezes you inflict spread to other Enemies within a Radius of 12",
    "Thunderstruck":"20% increased Lightning Damage&#10;Your Critical Strikes Knock Back Shocked Enemies&#10;30% increased Critical Strike Chance",
    "Stormrider":"10% chance to gain a Power Charge when you Shock a Chilled Enemy&#10;25% increased Cold Damage with Hits against Shocked Enemies&#10;25% increased Lightning Damage with Hits against Chilled Enemies",
    "Overshock":"30% increased Lightning Damage&#10;Your Shocks can increase Damage taken by up to a maximum of 60%&#10;30% increased Effect of Shock",
    "Evil Eye":"Enemies you Curse take 5% increased Damage&#10;5% chance to Dodge Attack Hits from Cursed Enemies",
    "Whispers of Death":"5% increased Effect of your Curses&#10;20% increased Damage if you've Killed a Cursed Enemy Recently",
    "Forbidden Words":"25% increased Area of Effect of Curse Skills&#10;5% increased Effect of your Curses&#10;Curse Skills have 5% reduced Mana Reservation",
    "Dark Discourse":"10% increased Effect of your Curses&#10;Enemies you Curse are Hindered, with 15% reduced Movement Speed&#10;Regenerate 1% of Energy Shield per second if you’ve Killed an Enemy Recently",
    "Victim Maker":"Curse Skills have 50% increased Skill Effect Duration&#10;25% increased Damage with Hits and Ailments against Cursed Enemies",
    "Master of Fear":"Enemies you Curse are Intimidated&#10;Enemies you Curse are Unnerved",
    "Wish for Death":"You have Culling Strike against Cursed Enemies&#10;Curse Skills have 20% increased Skill Effect Duration",
    "Heraldry":"20% increased Effect of Herald Buffs on you&#10;10% reduced Mana Reservation of Herald Skills",
    "Endbringer":"25% increased Damage for each Herald affecting you",
    "Cult-Leader":"Minions deal 35% increased Damage while you are affected by a Herald",
    "Empowered Envoy":"Herald Skills deal 40% increased Damage&#10;20% increased Effect of Herald Buffs on you",
    "Dark Messenger":"Herald Skills have 25% increased Area of Effect&#10;Herald Skills deal 20% increased Damage",
    "Agent of Destruction":"10% chance to Freeze, Shock and Ignite while affected by a Herald&#10;25% increased Elemental Damage while affected by a Herald",
    "Lasting Impression":"30% increased Damage over Time while affected by a Herald&#10;Herald Skills deal 50% increased Damage over Time",
    "Self-Fulfilling Prophecy":"+1% to Critical Strike Chance of Herald Skills&#10;+25% to Critical Strike Multiplier if you dealt a Critical Strike with a Herald Skill Recently",
    "Invigorating Portents":"Minions deal 20% increased Damage while you are affected by a Herald&#10;Minions have 10% increased Movement Speed for each Herald affecting you",
    "Pure Agony":"+1 to maximum number of Sentinels of Purity&#10;+5 to Maximum Virulence&#10;Minions deal 20% increased Damage while you are affected by a Herald",
    "Disciples":"1% additional Physical Damage Reduction per Summoned Sentinel of Purity&#10;You lose Virulence 30% slower&#10;Minions deal 20% increased Damage while you are affected by a Herald",
    "Dread March":"Minions have 10% increased maximum Life&#10;Minions have 10% increased Movement Speed&#10;Minions have 10% additional Physical Damage Reduction&#10;Minions have +10% to Chaos Resistance",
    "Blessed Rebirth":"Minions have 20% increased maximum Life&#10;Minions created Recently cannot be Damaged",
    "Life from Death":"Minions have 15% increased maximum Life&#10;Regenerate 2% of Life per second if a Minion has Died Recently&#10;Minions Recover 4% of Life on Minion Death",
    "Feasting Fiends":"Minions have 10% increased maximum Life&#10;Minions deal 10% increased Damage&#10;Minions Leech 0.4% of Damage as Life",
    "Bodyguards":"Minions have 10% increased maximum Life&#10;Minions have 10% chance to Knock Enemies Back on Hit with Attacks",
    "Follow-Through":"Projectiles deal 15% increased Damage for each remaining Chain",
    "Streamlined":"30% increased Projectile Speed&#10;20% increased Projectile Damage",
    "Shrieking Bolts":"35% increased Projectile Damage&#10;10% chance to Taunt Enemies on Projectile Hit",
    "Eye to Eye":"25% increased Projectile Damage&#10;35% increased Projectile Damage with Hits against Nearby Enemies",
    "Repeater":"30% increased Projectile Damage&#10;8% increased Attack and Cast Speed",
    "Aerodynamics":"Projectiles Pierce an additional Target&#10;20% increased Projectile Speed&#10;10% increased Projectile Damage",
    "Chip Away":"25% increased Brand Activation Frequency if you haven't used a Brand Skill Recently&#10;20% increased Brand Attachment range",
    "Seeker Runes":"25% increased Damage with Brand Skills&#10;Unattached Brands gain 20% increased Brand Attachment Range per second",
    "Remarkable":"You can Cast an additional Brand&#10;12% increased Cast Speed with Brand Skills",
    "Brand Loyalty":"Enemies take 5% increased Damage for each of your Brands Attached to them&#10;20% increased Brand Attachment range",
    "Holy Conquest":"5% increased Movement Speed&#10;20% increased Damage with Brand Skills&#10;10% increased Brand Activation frequency",
    "Grand Design":"You can Cast an additional Brand&#10;Brand Skills have 20% increased Duration&#10;10% increased Brand Activation frequency&#10;20% increased Brand Attachment range",
    "Set and Forget":"25% increased Trap Damage&#10;12% increased Area of Effect&#10;25% reduced Trap Duration&#10;40% increased Trap Trigger Area of Effect",
    "Expert Sabotage":"30% increased Mine Damage&#10;Can have up to 2 additional Remote Mines placed at a time&#10;Mines have 20% increased Detonation Speed",
    "Guerilla Tactics":"20% increased Trap Damage&#10;20% increased Mine Damage&#10;10% increased Trap Throwing Speed&#10;10% increased Mine Throwing Speed&#10;5% increased Movement Speed if you've thrown a Trap or Mine Recently",
    "Expendability":"10% chance to throw up to 1 additional Trap or Mine",
    "Arcane Pyrotechnics":"20% increased Trap Damage&#10;20% increased Mine Damage&#10;Gain Arcane Surge when your Mine is Detonated targeting an Enemy&#10;Gain Arcane Surge when your Trap is Triggered by an Enemy",
    "Surprise Sabotage":"+15% to Critical Strike Multiplier with Traps&#10;+15% to Critical Strike Multiplier with Mines&#10;Trap Damage Penetrates 5% Elemental Resistances&#10;Mine Damage Penetrates 5% Elemental Resistances",
    "Careful Handling":"15% increased Trap Damage&#10;15% increased Mine Damage&#10;4% increased maximum Life&#10;6% increased maximum Mana",
    "Peak Vigour":"8% increased maximum Life&#10;30% increased Life Recovery from Flasks",
    "Fettle":"+20 to maximum Life&#10;10% increased maximum Life",
    "Feast of Flesh":"8% increased maximum Life&#10;0.4% of Attack Damage Leeched as Life&#10;+10 Life gained for each Enemy hit by your Attacks",
    "Sublime Sensation":"10% increased maximum Energy Shield&#10;8% increased maximum Life",
    "Surging Vitality":"8% increased maximum Life&#10;Regenerate 0.5% of Life per second&#10;Every 5 seconds, Regenerate 10% of Life over one second",
    "Peace Amidst Chaos":"8% increased maximum Life&#10;2% additional Physical Damage Reduction while stationary&#10;Regenerate 2% of Life per second while stationary",
    "Adrenaline":"6% increased maximum Life&#10;15% increased Maximum total Recovery per second from Life Leech&#10;6% increased Attack Speed while Leeching",
    "Wall of Muscle":"6% increased maximum Life&#10;5% increased Strength",
    "Mindfulness":"15% increased maximum Mana&#10;80% increased Mana Regeneration Rate while stationary",
    "Liquid Inspiration":"15% increased maximum Mana&#10;30% increased Mana Recovery from Flasks&#10;5% increased Mana Recovery Rate during Effect of any Mana Flask",
    "Openness":"+30 to maximum Mana&#10;20% increased maximum Mana",
    "Daring Ideas":"18% increased maximum Mana&#10;0.4% of Attack Damage Leeched as Mana",
    "Clarity of Purpose":"15% increased maximum Mana&#10;30% increased Mana Regeneration Rate",
    "Scintillating Idea":"20% increased maximum Mana&#10;Damage Penetrates 5% Lightning Resistance",
    "Holistic Health":"8% increased maximum Life&#10;10% increased maximum Mana",
    "Genius":"8% increased maximum Mana&#10;5% increased Intelligence",
    "Improvisor":"6% increased Attack Speed&#10;10% increased maximum Mana&#10;+3 Mana gained for each Enemy hit by your Attacks",
    "Stubborn Student":"20% increased Armour&#10;15% increased maximum Mana&#10;4% additional Physical Damage Reduction",
    "Savour the Moment":"10% increased maximum Energy Shield&#10;Regenerate 3.00% of Energy Shield per second while stationary",
    "Energy From Naught":"+100 to maximum Energy Shield",
    "Will Shaper":"Gain 5% of Maximum Mana as Extra Maximum Energy Shield",
    "Spring Back":"6% increased maximum Energy Shield&#10;10% faster start of Energy Shield Recharge&#10;15% increased Energy Shield Recharge Rate",
    "Conservation of Energy":"8% increased maximum Energy Shield&#10;0.3% of Spell Damage Leeched as Energy Shield&#10;20% increased Maximum total Recovery per second from Energy Shield Leech",
    "Heart of Iron":"Gain 10% of Maximum Life as Extra Armour",
    "Prismatic Carapace":"30% increased Armour&#10;+1% to all maximum Elemental Resistances",
    "Militarism":"30% increased Armour&#10;8% increased maximum Life",
    "Second Skin":"3% Chance to Block Spell Damage&#10;30% increased Armour&#10;+3% Chance to Block Attack Damage",
    "Dragon Hunter":"30% increased Armour&#10;+20% to Fire Resistance&#10;5% additional Physical Damage Reduction",
    "Enduring Composure":"30% increased Armour&#10;Gain an Endurance Charge every second if you've been Hit Recently",
    "Prismatic Dance":"30% increased Evasion Rating&#10;+1% to all maximum Elemental Resistances",
    "Natural Vigour":"30% increased Evasion Rating&#10;8% increased maximum Life",
    "Untouchable":"30% increased Evasion Rating&#10;3% chance to Dodge Attack Hits&#10;3% chance to Dodge Spell Hits",
    "Shifting Shadow":"20% increased Evasion Rating&#10;+20 to Dexterity&#10;10% chance to Blind Enemies on Hit",
    "Readiness":"+4% chance to Evade Attack Hits if you haven't been Hit Recently",
    "Confident Combatant":"1% increased Damage per 1% Chance to Block Attack Damage",
    "Flexible Sentry":"3% Chance to Block Spell Damage&#10;25% chance to Avoid Elemental Ailments&#10;+3% Chance to Block Attack Damage",
    "Vicious Guard":"0.4% of Attack Damage Leeched as Life&#10;Regenerate 1.5% of Life per second&#10;+4% Chance to Block Attack Damage",
    "Mystical Ward":"4% Chance to Block Spell Damage&#10;0.3% of Spell Damage Leeched as Energy Shield&#10;Regenerate 1.5% of Energy Shield per second",
    "Rote Reinforcement":"+20 to maximum Life&#10;20% chance to gain an Endurance Charge when you Block&#10;+4% Chance to Block Attack Damage",
    "Mage Hunter":"4% Chance to Block Spell Damage&#10;20% increased Spell Damage&#10;20% chance to gain a Power Charge when you Block",
    "Riot Queller":"+4% Chance to Block Attack Damage&#10;Enemies Taunted by you take 6% increased Damage",
    "One with the Shield":"Recover 50 Life when you Block&#10;50% increased Defences from Equipped Shield&#10;+5% Chance to Block Attack Damage while holding a Shield",
    "Aerialist":"3% chance to Dodge Attack Hits&#10;3% chance to Dodge Spell Hits&#10;5% increased Dexterity",
    "Elegant Form":"30% chance to Avoid Elemental Ailments&#10;3% chance to Dodge Attack Hits&#10;3% chance to Dodge Spell Hits",
    "Darting Movements":"5% increased Movement Speed&#10;5% chance to Dodge Attack and Spell Hits while moving",
    "No Witnesses":"10% chance to gain Elusive on Kill&#10;25% increased Elusive Effect",
    "Molten One's Mark":"+2% to maximum Fire Resistance&#10;Regenerate 1% of Life per second",
    "Fire Attunement":"40% reduced Ignite Duration on you&#10;50% reduced Extra Damage taken from Critical Strikes while Ignited",
    "Pure Might":"40% increased Stun and Block Recovery&#10;Purity of Fire has 30% reduced Mana Reservation&#10;+20 to Strength",
    "Blacksmith":"25% increased Armour&#10;+20% to Fire Resistance&#10;0.4% of Fire Damage Leeched as Life",
    "Non-Flammable":"+20% to Fire Resistance&#10;40% chance to Avoid being Ignited&#10;6% chance to Avoid Fire Damage from Hits",
    "Winter Prowler":"+2% to maximum Cold Resistance&#10;6% increased Movement Speed",
    "Hibernator":"40% reduced Freeze Duration on you&#10;15% additional Physical Damage Reduction while Frozen",
    "Pure Guile":"Purity of Ice has 30% reduced Mana Reservation&#10;+20 to Dexterity&#10;5% chance to Blind Enemies on Hit",
    "Alchemist":"+20% to Cold Resistance&#10;8% increased Attack and Cast Speed&#10;20% increased Life Recovery from Flasks",
    "Antifreeze":"+20% to Cold Resistance&#10;40% chance to Avoid being Frozen&#10;6% chance to Avoid Cold Damage from Hits",
    "Wizardry":"8% increased maximum Mana&#10;+2% to maximum Lightning Resistance",
    "Capacitor":"12% increased Movement Speed while Shocked&#10;40% reduced Effect of Shock on you",
    "Pure Aptitude":"Regenerate 1% of Energy Shield per second&#10;Purity of Lightning has 30% reduced Mana Reservation&#10;+20 to Intelligence",
    "Sage":"20% increased Mana Regeneration Rate&#10;+20% to Lightning Resistance&#10;Regenerate 1.5% of Life per second",
    "Insulated":"+20% to Lightning Resistance&#10;40% chance to Avoid being Shocked&#10;6% chance to Avoid Lightning Damage from Hits",
    "Born of Chaos":"+3% to maximum Chaos Resistance",
    "Antivenom":"+17% to Chaos Resistance&#10;Unaffected by Poison",
    "Rot-Resistant":"+13% to Chaos Resistance&#10;Regenerate 1.2% of Life per second&#10;Regenerate 0.6% of Energy Shield per second&#10;Regenerate 0.3% of Mana per second",
    "Blessed":"6% increased maximum Life&#10;10% increased maximum Mana&#10;+13% to Chaos Resistance",
    "Student of Decay":"25% increased Damage over Time&#10;+13% to Chaos Resistance"
};

const keystone_prefix = 'Adds ';
const re_keystones = new RegExp(keystone_prefix + Object.keys(keystones).join('<|' + keystone_prefix) + '<', 'g');

const notable_prefix = '1 Added Passive Skill is ';
const re_notables = new RegExp(notable_prefix + Object.keys(notables).join('<|' + notable_prefix) + '<', 'g');

const valid_class_names = { notableProperty: true, separator: true };

var current_trade_site = 0;
if (location.href.indexOf('pathofexile.com/trade') > -1) {
    current_trade_site = 1;
} else if (location.href.indexOf('poe.trade') > -1) {
    current_trade_site = 2;
} else if (location.href.indexOf('poeapp.com') > -1) {
    current_trade_site = 3;
}

function parseNotables() {
    var item = null;
    if (current_trade_site == 1) {
        item = document.querySelector('.itemBoxContent .content:not(.has-cluster-descriptions)');
        // remove the default notable description elements in favor of hover tooltips
        var notableProperty = document.querySelector('.notableProperty');
        if (notableProperty) {
            var notableNextSibling     = notableProperty.nextElementSibling;
            var notablePreviousSibling = notableProperty.previousElementSibling;
            if (valid_class_names[notableNextSibling.className]) {
                notableNextSibling.remove();
            }
            if (valid_class_names[notablePreviousSibling.className]) {
                notablePreviousSibling.remove();
            }
            notableProperty.remove();
        }
    } else if (current_trade_site == 2) {
        item = document.querySelector('.item .item-mods:not(.has-cluster-descriptions)');
    } else if (current_trade_site == 3) {
        item = document.querySelector('my-app');
        if (item.shadowRoot) {
            item = item.shadowRoot.querySelector('#appHeader');
            if (item) {
                item = item.querySelector('search-page');
                if (item.shadowRoot) {
                    item = item.shadowRoot.querySelector('search-results');
                    if (item.shadowRoot) {
                        item = item.shadowRoot.querySelector('search-result:not(.has-cluster-descriptions)');
                    }
                }
            }
        }
        if (!item || !item.shadowRoot) {
            item = null;
        }
    }
    if (item) {
        item.classList.add('has-cluster-descriptions');
        if (current_trade_site == 3) {
            item = item.shadowRoot.querySelector('.item .mods');
        }
        if (item.innerHTML.indexOf(keystone_prefix) > -1) {
            item.innerHTML = item.innerHTML.replace(re_keystones, function(match) {
                const keystone_name = match.substring(keystone_prefix.length, match.length - 1);
                const keystone_description = keystones[keystone_name];
                return '<span title="' + keystone_description + '">' + keystone_prefix + keystone_name + '</span><';
            });
        }
        if (item.innerHTML.indexOf(notable_prefix) > -1) {
            item.innerHTML = item.innerHTML.replace(re_notables, function(match) {
                const notable_name = match.substring(notable_prefix.length, match.length - 1);
                const notable_description = notables[notable_name];
                return '<span title="' + notable_description + '">' + notable_prefix + notable_name + '</span><';
            });
        }
        setTimeout(parseNotables, 10);
    } else {
        setTimeout(parseNotables, 250);
    }
};

parseNotables();
