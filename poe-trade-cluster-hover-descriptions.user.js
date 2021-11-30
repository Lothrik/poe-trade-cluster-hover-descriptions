// ==UserScript==
// @name         poe-trade-cluster-hover-descriptions
// @namespace    github.com/Lothrik
// @version      2021.11.30.1
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
    https://www.poewiki.net/wiki/Version_3.15.0:
        Hollow Palm Technique now grants 40% more Attack Speed with Melee Skills while you are Unencumbered. It previously granted 60% more Attack Speed while you are Unencumbered. The modifier that granted "14 to 20 Added Attack Physical Damage per 10 Dexterity while you are Unencumbered" is now "14 to 20 Attack Physical Damage to Melee Skills per 10 Dexterity while you are Unencumbered".
*/
const keystones = {
    "Disciple of Kitava":"Every second, Consume a nearby Corpse to Recover 5% of Life and Mana&#10;10% more Damage taken if you haven't Consumed a Corpse Recently",
    "Lone Messenger":"You can only have one Herald&#10;50% more Effect of Herald Buffs on you&#10;100% more Damage with Hits from Herald Skills&#10;50% more Damage Over Time with Herald Skills&#10;Minions from Herald Skills deal 25% more Damage&#10;Your Aura Skills are Disabled",
    "Nature's Patience":"Gain 2 Grasping Vines each second while stationary&#10;2% chance to deal Double Damage per Grasping Vine&#10;1% less Damage taken per Grasping Vine",
    "Secrets of Suffering":"Cannot Ignite, Chill, Freeze or Shock&#10;Critical Strikes inflict Scorch, Brittle and Sapped",
    "Kineticism":"Attack Projectiles always inflict Bleeding and Maim, and Knock Back Enemies&#10;Projectiles cannot Pierce, Fork or Chain",
    "Veteran's Awareness":"+10% to all Elemental Resistances and maximum Elemental Resistances while affected by a Non-Vaal Guard Skill&#10;20% more Damage taken if a Non-Vaal Guard Buff was lost Recently&#10;20% additional Physical Damage Reduction while affected by a Non-Vaal Guard Skill",
    "Hollow Palm Technique":"You count as Dual Wielding while you are Unencumbered&#10;40% more Attack Speed while you are Unencumbered&#10;14 to 20 Added Attack Physical Damage to Melee Skills per 10 Dexterity while you are Unencumbered"
};

/*
The following changes were manually added to the notables below:
    Undocumented:
        Spiked Concoction now only applies to Non-Unique Flasks.
        Eye of the Storm now grants +10% to Damage over Time Multiplier for Ignite from Critical Strikes (from 20%).
    https://www.poewiki.net/wiki/Version_3.10.1c:
        Reduced the value of "Auras from your Skills grant 0.2% of Life Regenerated per second to you and Allies" found on the Replenishing Presence notable to 0.1%.
        The Purposeful Harbinger notable now grants "Aura Buffs from Skills have 10% increased Effect on you for each Herald affecting you".
    https://www.poewiki.net/wiki/Version_3.11.0:
        Many balance changes have been made to passive skills granted by Cluster Jewels. This affects all existing Cluster Jewels with these passives automatically.
            The following notables have been affected: Hex Breaker, Evil Eye, Forbidden Words, Remarkable, Grand Design, Expert Sabotage, Vicious Bite, Holy Conquest, Flexible Sentry, Hulking Corpses,
            Cold-Blooded Killer, Wrapped in Flame, Fire Attunement, Hibernator, Capacitor, Replenishing Presence, Antivenom, Non-flammable, Antifreeze, Insulated, Readiness, Dragon Hunter, Conservation of Energy,
            Spring Back, Stubborn Student, Liquid Inspiration, Adrenaline, Peace Amidst Chaos, Heraldry, Disciples, Pure Agony, Purposeful Harbinger, Endbringer, Master of Fear, Victim Maker, Circling Oblivion,
            Wicked Pall, Drive the Destruction, Thaumophage, Numbing Elixir, Spiked Concoction, Sleepless Sentries, Chip Away, Precise Retaliation, Skullbreaker, Precise Commander, Savage Response, Precise Focus,
            Self-Fulfilling Prophecy, Surprise Sabotage, Mob Mentality, Cry Wolf, Haunting Shout, Lead By Example, Provocateur, Warning Call, Rattling Bellow and others.
        Added several new Curse- and Aura-centric notables.
        These Cluster Jewel Notables will no longer be available: Gladiatorial Combat, Deep Cuts, Intensity, Confident Combatant, No Witnesses. Any existing notables already on jewels will be retained.
    https://www.poewiki.net/wiki/Version_3.12.0:
        Eye of the Storm now increases the effect of non-Damaging Ailments you inflict with Critical Strikes (previously specified Chill and Shock, but it now also works with alternate elemental ailments).
        Precise Commander now causes you and nearby allies to have 25% increased Critical Strike Chance (from 30%), and +10% to Critical Strike Multiplier (from 12%).
        Vengeful Commander now grants 20% increased effect of Anger, Hatred and Wrath auras (from 30%).
        Vicious Bite now grants your minions +15% to Critical Strike Multiplier (from 20%) and 30% increased Critical Strike Chance (from 50%).
    https://www.poewiki.net/wiki/Version_3.13.0:
        Numbing Elixir and Flexible Sentry both now grant reduced effect of Shock and Chill on you, rather than reduced effect of non-damaging Ailments on you. All existing items with these notables are affected.
        Heraldry now applies its Exposure effects in a radius of 30 units (from 60).
        Stalwart Commander now grants 20% increased Aura Effect for Determination, Grace and Discipline (from 30%).
        Rotten Claws now causes minions to have a 12% chance to Impale on Hit with Attacks (from 20%).
        Renewal now grants your minions a 5% chance to deal Double Damage while they are on Full Life (from 10%).
        First Among Equals now grants 8% increased effect of Non-Curse Auras from your Skills (from 10%).
    https://www.poewiki.net/wiki/Version_3.14.0:
        Added a new Cluster Jewel notable - Blood Artist: Grants a +14% to Physical Damage over time Multiplier if you've Spent Life Recently, and +20 to Strength.
        Added a new Cluster Jewel notable - Phlebotomist: Grants a +14% to Physical Damage over Time Multiplier if you've dealt a Critical Strike Recently, and 20% increased Critical Strike Chance.
        Aerodynamics now grants 10% increased Projectile Speed (previously 20%).
        Brand Loyalty now causes Enemies to take 4% increased Damage for each of your Brands Attached to them (previously 5%).
        Dark Discourse now grants 6% increased Effect of your Curses (from 10%).
        Exposure Therapy now grants a +8% to Damage over Time Multiplier (previously +10%).
        First Among Equals now grants 6% increased effect of Non-Curse Auras from your Skills (previously 8%).
        Grand Design now grants 10% increased Brand Attachment Range (from 20%).
        Haemorrhage now grants a +15% to Damage over Time Multiplier for Ailments from Critical Strikes (previously 18%) and 30% increased Critical Strike Chance (previously 40%).
        Magnifier no longer grants 10% increased Area Damage.
        Rend no longer grants a +12% to Damage over Time Multiplier for Bleeding. It now grants a +12% to Physical Damage over Time Multiplier.
        Renewal now causes Minions to have 5% chance to deal Double Damage while they are on Full Life (previously 6%).
        Replenishing Presence now grants 6% increased effect of Non-Curse Auras from your Skills (previously 8%).
        Snowstorm now causes you to Gain 8% of Lightning Damage as Extra Cold Damage against Chilled Enemies (previously 10%).
        Stalwart Commander now causes Determination, Discipline and Grace to have 15% increased Aura Effect (previously 20%).
        Streamlined now grants 20% increased Projectile Speed (previously 30%).
        Surprise Sabotage now grants a +8% to Critical Strike Multiplier with Traps and Mines (previously 10%) and Trap and Mine Damage now Penetrates 4% Elemental Resistances (previously 5%).
        Tempered Arrowheads now causes Bow Skills to have 10% increased Skill Effect Duration (previously 20%).
        Vast Power now grants 3% increased Area of Effect per Power Charge, up to a maximum of 50% (previously uncapped).
        Vengeful Commander now causes Anger, Hatred and Wrath to have 15% increased Aura Effect (previously 20%).
        Wicked Pall now grants 30% increased Chaos Damage (previously 35%) and 5% increased Skill Effect Duration (previously 10%).
        Widespread Destruction now grants 6% increased Area of Effect (previously 10%).
    https://www.poewiki.net/wiki/Version_3.15.0:
        Numbing Elixir now grants 40% reduced Effect of Curses on you during Effect of any Mana Flask, and 40% reduced Effect of non-Damaging Ailments on you during Effect of any Life Flask.
        Winter Commander no longer grants 4% increased Movement Speed. It now grants 8% increased Evasion Rating.
        Winter Prowler no longer grants 6% increased Movement Speed. It now grants 10% increased Life Recovery from Flasks.
        Darting Movements now grants 3% increased Movement Speed (previously 5%).
        Cold Conduction no longer grants "Enemies Chilled by your Hits are Shocked" or "Enemies Shocked by your Hits are Chilled." It now grants "25% increased Effect of Lightning Ailments against Chilled Enemies" and "25% increased Effect of Cold Ailments against Shocked Enemies".
        Fasting now grants 10% increased Movement Speed while under no Flask Effects (previously 20%).
        Distilled Perfection now grants 10% increased Flask Effect Duration (previously 20%).
        Peak Vigour now grants 20% increased Life Recovery from Flasks (previously 30%).
        Liquid Inspiration now grants 20% increased Mana Recovery from Flasks (previously 30%).
        Brand Loyalty no longer grants 20% increased Brand Attachment Range. It now grants "Enemies take 3% increased Damage for each of your Brands Attached to them" (previously 4%).
        Holy Conquest no longer grants 10% increased Cast Speed with Brand Skills, or 5% increased Movement Speed.
        Grand Design no longer grants 10% increased Cast Speed with Brand Skills. It now grants 20% increased Brand Damage.
        Elegant Form now grants 15% chance to Avoid Elemental Ailments (previously 30%).
        Haemorrhage now grants 10% Damage over Time Multiplier for Ailments from Critical Strikes (previously 15%).
        Exposure Therapy now grants 5% Damage over Time Multiplier (previously 8%).
        Brush with Death now grants 5% Damage over Time Multiplier (previously 10%).
        Wasting Affliction now grants "Damaging Ailments deal damage 5% faster" (previously 10%).
        Circling Oblivion now grants 15% Duration of Ailments on Enemies (previously 25%).
        Tempered Arrowheads now grants "Bow Skills have 6% to Damage over Time Multiplier" (previously 10%).
        Disease Vector now grants "6% to Damage over Time Multiplier for Poison while wielding a Claw or Dagger" (previously 10%).
        Eye of the Storm now grants 10% Damage over Time Multiplier for Ignite from Critical Strikes (previously 20%).
        Cooked Alive now grants Enemies Ignited by you have -5% to Fire Resistance (previously 10%).
        Burning Bright no longer has 8% to Fire Damage over Time Multiplier, or 20% increased Fire Damage. It now has 25% increased Burning Damage.
        Blowback now grants "Ignites deal damage 8% faster" (previously 15%).
        Cold-Blooded Killer now grants 5% to Cold Damage over Time Multiplier (previously 8%).
        Deep Chill now grants 5% to Cold Damage over Time Multiplier (previously 10%).
        Septic Spells now grants "Spell Skills have 5% to Damage over Time Multiplier for Poison" (previously 10%), now has 5% increased Cast Speed (previously 8%).
        Low Tolerance no longer has "8% to Damage over Time Multiplier for Poison".
        Steady Torment now has "6% to Damage over Time Multiplier for Bleeding you inflict on Poisoned Enemies" (previously 10%) and "6% to Damage over Time Multiplier for Poison you inflict on Bleeding Enemies" (previously 10%). Now has 15% increased Bleeding Duration (previously 20%), and 15% increased Poison Duration (previously 20%).
        Eldritch Inspiration no longer grants "8% to Chaos Damage over Time Multiplier". It now grants 20% increased Chaos Damage.
        Wound Aggravation now grants 5% to Physical Damage over Time Multiplier while wielding an Axe or Sword (previously 10%).
        Vivid Hues no longer grants 12% to Damage over Time Multiplier for Bleeding. It now grants 20% increased Bleeding Damage.
        Rend now grants 5% to Physical Damage over Time Multiplier (previously 12%), and 20% increased Bleed Duration (previously 30%).
        Compound Injury now grants 35% increased Damage with Bleeding you inflict on Maimed Enemies (previously 50%).
        Blood Artist now grants 6% to Physical Damage over Time Multiplier if you've Spent Life Recently (previously 14%).
        Phlebotomist now grants 6% to Physical Damage over Time Multiplier if you've dealt a Critical Strike Recently (previously 14%).
    https://www.poewiki.net/wiki/Version_3.16.0:
        Energy From Naught now grants +60 to maximum Energy Shield (previously 100).
        Hit and Run Cluster Jewel Notable: Now grants 6% chance to Suppress Spell Damage if you've Hit an enemy recently.
        Untouchable Cluster Jewel Notable: Now grants 6% chance to Suppress Spell Damage.
        Elegant Form Cluster Jewel Notable: Now grants 6% chance to Suppress Spell Damage.
        Darting Movement Cluster Jewel Notable: Now grants 8% chance to Suppress Spell Damage while moving.
        The increased Aura Effect of Auras on you from the Purposeful Harbinger Cluster Jewel Notable now only applies to your own Auras Effect on you.
        Replenishing Presence no longer has 6% increased Effect of Non-Curse Auras from your Skills. It now has Non-Curse Aura Skills have 20% increased Duration.
        Master of Command now has 100% increased Mana Reservation Efficiency of Banner Skills (previously 50% reduced Reservation).
        Pure Might now has 80% increased Mana Reservation Efficiency for Purity of Fire (previously 30% reduced Reservation).
        Pure Guile now has 80% increased Mana Reservation Efficiency for Purity of Ice (previously 30% reduced Reservation).
        Pure Aptitude now has 80% increased Mana Reservation Efficiency for Purity of Lightning (previously 30% reduced Reservation). Now has 15% increased Energy Shield Recharge Rate instead of “Regenerate 1% of Energy Shield per second”.
        Self-Control now has 80% increased Mana Reservation Efficiency for Discipline (previously 30% reduced Reservation). Now has 25% increased Mana Regeneration Rate (previously 15%).
        Uncompromising now has 50% increased Mana Reservation Efficiency for Determination (previously 30% reduced Reservation). Now has 20% increased Stun Threshold (previously 10%).
        Sublime Form now has 50% increased Mana Reservation Efficiency for Grace (previously 30% reduced Reservation). Now has +10% to all Elemental Resistances (from +5%).
        The Pure Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Electric Presence.
        The Stalwart Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Volatile Presence.
        The Vengeful Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Righteous Path.
        The Precise Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Destructive Aspect.
        The Summer Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Mortifying Aspect.
        The Winter Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Frantic Aspect.
        The Grounded Commander Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Introspection.
        The First Among Equals Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Spiteful Presence.
        In general, Curse Effect that applies to all Curses no longer exists on Cluster Jewel Notable Passives.
        We've reworked two existing Curse Cluster Jewel Notables to new ones, and also introduced four new Notables to Curse Cluster Jewels: Hound's Mark, Doedre's Gluttony, Doedre's Apathy, and Master of the Maelstrom.
        Evil Eye no longer has "Non-Cursed Enemies you inflict Non-Aura Curses on are Blinded for 4 seconds". It now has "Enemies you Curse take 6% increased Damage" (previously 5%).
        Lord of Drought, Blizzard Caller, Tempt the Storm, Misery Everlasting, and Exploit Weakness all now grant 40% increased Curse Effect of specific Curses (previously 25%). Tempt the Storm now has 25% increased Mana Regeneration Rate instead of 5% increased Cast Speed.
        Forbidden Words no longer grants 5% increased Effect of your Curses. It now grants 15% Increased Reservation Efficiency of Curse Aura Skills (previously 4% reduced Reservation).
        Wish for Death no longer has "Curse Skills have 20% increased Skill Effect Duration".
        The Whispers of Death Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Inevitable Doom.
        The Dark Discourse Cluster Jewel Notable Passive has been removed. Existing items will have this replaced with Doedre’s Spite.
        Added new Curse Cluster Jewel Notable Passives that benefit Doom, Marks and Hexes that previously didn’t have their own Notables (such as Punishment, Elemental Weakness, Temporal Chains and Enfeeble).
        Holy Conquest: No longer has “Brands Attach to a new Enemy each time they Activate, no more than once every 0.3 seconds”, it now has 25% increased Brand Damage and Brands have 25% increased Area of Effect if 50% of Attached Duration expired.
        Cry Wolf: No longer has “Warcries have a minimum of 10 Power”, it now has 20% increased Total Power Counted from Warcries, and Exerted Attacks deal 30% increased Damage (previously 25%).
        Overshock: No longer has “Your Shocks can increase Damage taken by up to a maximum of 60%”. It now has “40% increased Effect of Lightning Ailments” (previously 30%).
        Unwavering Focus: No longer grants “15% reduced Cost of Channelling Skills”. It now grants “50% chance to Avoid being Stunned while Channelling” (previously 40%), and “Channelling Skills deal 30% increased Damage” (previously 25%).
*/
const notables = {
    "Prodigious Defence":"3% Chance to Block Spell Damage&#10;30% increased Attack Damage while holding a Shield&#10;+3% Chance to Block Attack Damage",
    "Advance Guard":"Attack Skills deal 30% increased Damage while holding a Shield&#10;Ignore all Movement Penalties from Armour&#10;5% increased Movement Speed while holding a Shield",
    "Gladiatorial Combat":"2% increased Attack Damage per 75 Armour or Evasion Rating on Shield&#10;+1% to Critical Strike Multiplier per 10 Maximum Energy Shield on Shield", /* Legacy, no longer obtainable as of 3.11.0. */
    "Strike Leader":"Attack Skills deal 30% increased Damage while holding a Shield&#10;+2% Chance to Block Attack Damage&#10;+2 to Melee Strike Range while Holding a Shield",
    "Powerful Ward":"20% chance to gain a Power Charge when you Block&#10;+6% Chance to Block Spell Damage while at Maximum Power Charges",
    "Enduring Ward":"20% chance to gain an Endurance Charge when you Block&#10;+6% Chance to Block Attack Damage while at Maximum Endurance Charges",
    "Gladiator's Fortitude":"Attack Skills deal 25% increased Damage while holding a Shield&#10;5% increased maximum Life",
    "Precise Retaliation":"60% increased Critical Strike Chance if you haven’t Blocked Recently&#10;+30% to Critical Strike Multiplier if you have Blocked Recently",
    "Veteran Defender":"+15 to all Attributes&#10;+15% Elemental Resistances while holding a Shield&#10;60% increased Defences from Equipped Shield",
    "Iron Breaker":"Enemies have -10% to Total Physical Damage Reduction against your Hits&#10;35% increased Physical Damage",
    "Deep Cuts":"15% chance to Impale Enemies on Hit with Attacks&#10;Impales you inflict last 1 additional Hit", /* Legacy, no longer obtainable as of 3.11.0. */
    "Master the Fundamentals":"+10% to all Elemental Resistances&#10;35% reduced Elemental Damage&#10;35% increased Physical Damage",
    "Force Multiplier":"5% chance to deal Double Damage&#10;25% increased Physical Damage",
    "Furious Assault":"8% increased Attack and Cast Speed&#10;25% increased Physical Damage",
    "Vicious Skewering":"Attacks have 10% chance to cause Bleeding&#10;10% chance to Impale Enemies on Hit with Attacks&#10;15% increased Effect of Impales inflicted by Hits that also inflict Bleeding",
    "Grim Oath":"Gain 10% of Physical Damage as Extra Chaos Damage",
    "Battle-Hardened":"30% increased Evasion Rating and Armour&#10;35% increased Physical Damage",
    "Replenishing Presence":"Non-Curse Aura Skills have 20% increased Duration&#10;Regenerate 1% of Life per second",
    "Master of Command":"100% increased Mana Reservation Efficiency of Banner Skill&#10;15% increased Effect of Non-Curse Auras from your Skills on Enemies",
    "Spiteful Presence":"Hatred has 50% increased Mana Reservation Efficiency&#10;20% increased Effect of Cold Ailments",
    "Purposeful Harbinger":"Aura buffs from Skills have 8% increased Effect on you for each Herald affecting you, up to 40%",
    "Destructive Aspect":"Pride has 50% increased Mana Reservation Efficiency&#10;12% increased Area of Effect of Aura Skills",
    "Electric Presence":"Wrath has 50% increased Mana Reservation Efficiency&#10;20% increased Effect of Lightning Ailments",
    "Volatile Presence":"Anger has 50% increased Mana Reservation Efficiency&#10;20% increased Duration of Fire Ailments",
    "Righteous Path":"Zealotry has 50% increased Mana Reservation Efficiency&#10;10% increased Effect of Consecrated Ground you create",
    "Skullbreaker":"8% reduced Enemy Stun Threshold&#10;+15% to Critical Strike Multiplier",
    "Pressure Points":"Your Critical Strikes have a 5% chance to deal Double Damage&#10;40% increased Critical Strike Chance",
    "Overwhelming Malice":"10% chance to gain Unholy Might for 4 seconds on Critical Strike",
    "Magnifier":"10% increased Area of Effect&#10;+10% to Critical Strike Multiplier",
    "Savage Response":"+30% to Critical Strike Multiplier if you've taken a Savage Hit Recently&#10;30% increased Critical Strike Chance",
    "Eye of the Storm":"+10% to Damage over Time Multiplier for Ignite from Critical Strikes&#10;20% increased Effect of non-Damaging Ailments you inflict with Critical Strikes&#10;40% increased Critical Strike Chance",
    "Basics of Pain":"20% increased Damage&#10;30% increased Critical Strike Chance",
    "Quick Getaway":"5% increased Attack and Cast Speed&#10;5% increased Movement Speed if you've dealt a Critical Strike Recently&#10;25% increased Critical Strike Chance",
    "Assert Dominance":"10% increased Area Damage&#10;15% increased Area of Effect if you've Killed Recently&#10;10% increased Area of Effect if you've Killed at least 5 Enemies Recently",
    "Vast Power":"20% increased Area Damage&#10;3% increased Area of Effect per Power Charge, up to a maximum of 50%",
    "Powerful Assault":"20% increased Area Damage&#10;Area Skills have 10% chance to Knock Enemies Back on Hit",
    "Intensity":"10% increased Area Damage&#10;Skills supported by Intensify have +1 to maximum Intensity", /* Legacy, no longer obtainable as of 3.11.0. */
    "Titanic Swings":"20% increased Area Damage while wielding a Two Handed Melee Weapon&#10;15% increased Area of Effect while wielding a Two Handed Melee Weapon",
    "Towering Threat":"5% increased maximum Life&#10;10% increased Area of Effect&#10;3% increased Character Size",
    "Ancestral Echo":"20% increased Totem Placement speed&#10;10% increased Attack and Cast Speed if you've summoned a Totem Recently",
    "Ancestral Reach":"25% increased Totem Damage&#10;25% increased Totem Placement speed&#10;25% increased Totem Placement range",
    "Ancestral Might":"20% increased Totem Damage&#10;30% increased Totem Duration&#10;30% increased Totem Damage if you haven't Summoned a Totem in the past 2 seconds",
    "Ancestral Preservation":"30% increased Totem Life&#10;Totems have 10% additional Physical Damage Reduction&#10;Totems gain +40% to Chaos Resistance",
    "Snaring Spirits":"30% increased Totem Damage&#10;Totems Hinder Enemies near them when Summoned, with 25% reduced Movement Speed",
    "Sleepless Sentries":"20% increased Totem Duration&#10;You have Onslaught if you've Summoned a Totem Recently",
    "Ancestral Guidance":"30% increased Effect of Buffs granted by your Active Ancestor Totems&#10;Totems' Action Speed cannot be modified to below base value",
    "Ancestral Inspiration":"Gain Arcane Surge when you Summon a Totem&#10;Spells cast by Totems deal 25% increased Damage",
    "Vital Focus":"Channelling Skills deal 30% increased Damage&#10;Regenerate 1.5% of Life per second while Channelling",
    "Rapid Infusion":"50% increased Effect of Infusion&#10;5% increased Movement Speed while you have Infusion",
    "Unwavering Focus":"50% chance to Avoid being Stunned while Channelling&#10;Channelling Skills deal 30% increased Damage",
    "Enduring Focus":"Channelling Skills deal 25% increased Damage&#10;25% chance to gain an Endurance Charge each second while Channelling",
    "Precise Focus":"30% increased Critical Strike Chance while Channelling&#10;+20% to Critical Strike Multiplier if you've been Channelling for at least 1 second",
    "Stoic Focus":"+4% Chance to Block Attack Damage while Channelling&#10;+4% Chance to Block Spell Damage while Channelling&#10;Channelling Skills deal 25% increased Damage",
    "Hex Breaker":"8% increased Attack and Cast Speed while Channelling&#10;Remove a Curse after Channelling for 2 seconds",
    "Arcane Adept":"5% increased Attack and Cast Speed while Channelling&#10;Channelling Skills deal 20% increased Damage&#10;Gain Arcane Surge after Channelling for 1 second",
    "Distilled Perfection":"25% increased Life Recovery from Flasks&#10;25% increased Mana Recovery from Flasks&#10;10% increased Flask Effect Duration",
    "Spiked Concoction":"Gain Alchemist's Genius when you use a Flask&#10;5% increased Attack and Cast Speed during any Flask Effect",
    "Fasting":"20% increased Flask Charges gained&#10;10% increased Movement Speed while under no Flask Effects",
    "Mender's Wellspring":"25% increased Life Recovery from Flasks&#10;Life Flasks gain 1 Charge every 3 seconds&#10;Remove Bleeding when you use a Life Flask",
    "Special Reserve":"20% increased Damage during any Flask Effect&#10;Regenerate 2% of Life per second during any Flask Effect",
    "Numbing Elixir":"40% reduced Effect of Curses on you during Effect of any Life or Mana Flask&#10;40% reduced Effect of non-Damaging Ailments on you during Effect of any Life or Mana Flask",
    "Mob Mentality":"Exerted Attacks deal 25% increased Damage&#10;Warcries have 5% Chance to grant an Endurance, Frenzy or Power Charge per Power",
    "Cry Wolf":"Exerted Attacks deal 30% increased Damage&#10;20% increased Total Power Counted from Warcries",
    "Haunting Shout":"Enemies Taunted by your Warcries are Intimidated",
    "Lead By Example":"+10 to Strength and Dexterity&#10;When you Warcry, you and nearby Allies gain Onslaught for 4 seconds",
    "Provocateur":"40% increased Critical Strike Chance against Taunted Enemies&#10;+10% to Critical Strike Multiplier against Taunted Enemies",
    "Warning Call":"Gain 25% increased Armour per 5 Power for 8 seconds when you Warcry, up to a maximum of 100%",
    "Rattling Bellow":"+20 to Strength&#10;Exerted Attacks have 8% chance to deal Double Damage",
    "Bloodscent":"Attacks with Axes or Swords grant 1 Rage on Hit, no more than once every second",
    "Run Through":"Axe or Sword Attacks deal 15% increased Damage with Ailments&#10;10% increased Impale Effect&#10;10% chance to Impale Enemies on Hit with Axes or Swords&#10;15% increased Physical Damage with Axes or Swords",
    "Wound Aggravation":"Axe or Sword Attacks deal 20% increased Damage with Ailments&#10;20% increased Physical Damage with Axes or Swords&#10;+5% to Physical Damage over Time Multiplier while wielding an Axe or Sword",
    "Overlord":"30% increased Damage with Maces, Sceptres or Staves&#10;Gain Fortify for 6 seconds on Melee Hit with a Mace, Sceptre or Staff",
    "Expansive Might":"Mace, Sceptre or Staff Attacks deal 20% increased Damage with Hits and Ailments&#10;While stationary, gain 10% increased Area of Effect every second, up to a maximum of 50%",
    "Weight Advantage":"Mace, Sceptre or Staff Attacks deal 30% increased Damage with Hits and Ailments&#10;4% chance to deal Double Damage while wielding a Mace, Sceptre or Staff&#10;+20 to Strength",
    "Wind-up":"+15% to Critical Strike Multiplier with Claws or Daggers&#10;10% chance to gain a Power Charge on Non-Critical Strike with a Claw or Dagger",
    "Fan of Blades":"Attack Skills fire an additional Projectile while wielding a Claw or Dagger&#10;20% increased Projectile Attack Damage with Claws or Daggers",
    "Disease Vector":"Enemies Poisoned by you cannot Regenerate Life&#10;+6% to Damage over Time Multiplier for Poison while wielding a Claw or Dagger",
    "Arcing Shot":"Arrows gain Critical Strike Chance as they travel farther, up to 100% increased Critical Strike Chance&#10;Arrows gain Damage as they travel farther, dealing up to 50% increased Damage with Hits to targets",
    "Tempered Arrowheads":"Bow Skills have +6% to Damage over Time Multiplier&#10;Bow Skills have 10% increased Skill Effect Duration&#10;10% increased Duration of Ailments inflicted while wielding a Bow",
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
    "Hit and Run":"Attack Skills deal 25% increased Damage while Dual Wielding&#10;+6% chance to Suppress Spell Damage if you've Hit an Enemy Recently",
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
    "Drive the Destruction":"0.8% of Attack Damage Leeched as Life&#10;25% increased Attack Damage when on Full Life&#10;Attacks have 10% chance to Maim on Hit",
    "Feed the Fury":"0.4% of Attack Damage Leeched as Life&#10;30% increased Damage while Leeching&#10;15% increased Attack Speed while Leeching",
    "Seal Mender":"Skills Supported by Unleash have 30% increased Seal gain frequency",
    "Conjured Wall":"25% increased Spell Damage&#10;+6% Chance to Block Spell Damage if you've Cast a Spell Recently",
    "Arcane Heroism":"30% increased Effect of Arcane Surge on you&#10;10% chance to gain Arcane Surge when you Hit a Unique enemy",
    "Practiced Caster":"20% increased Spell Damage&#10;5% increased Cast Speed&#10;35% chance to Avoid interruption from Stuns while Casting",
    "Burden Projection":"30% increased Spell Damage&#10;8% chance to Knock Enemies Back on Hit with Spell Damage",
    "Thaumophage":"0.6% of Spell Damage Leeched as Energy Shield&#10;25% increased Spell Damage while on Full Energy Shield&#10;10% chance to Hinder Enemies on Hit with Spells, with 30% reduced Movement Speed",
    "Essence Rush":"40% increased Damage while Leeching Energy Shield&#10;0.3% of Spell Damage Leeched as Energy Shield&#10;5% increased Attack and Cast Speed while Leeching Energy Shield",
    "Sap Psyche":"20% increased Spell Damage&#10;30% increased Mana Regeneration Rate&#10;Regenerate 1% of Energy Shield per second if you’ve Cursed an Enemy Recently",
    "Sadist":"15% increased Elemental Damage if you've Chilled an Enemy Recently&#10;20% increased Elemental Damage if you've Ignited an Enemy Recently&#10;25% increased Elemental Damage if you've Shocked an Enemy Recently",
    "Corrosive Elements":"15% increased Elemental Damage&#10;Cold Skills have a 25% chance to apply Cold Exposure on Hit&#10;Fire Skills have a 25% chance to apply Fire Exposure on Hit&#10;Lightning Skills have a 25% chance to apply Lightning Exposure on Hit",
    "Doryani's Lesson":"0.2% of Elemental Damage Leeched as Life&#10;25% increased Elemental Damage",
    "Disorienting Display":"25% increased Elemental Damage&#10;10% chance to Blind nearby Enemies when you use an Elemental Skill",
    "Prismatic Heart":"+10% to all Elemental Resistances&#10;30% increased Elemental Damage",
    "Widespread Destruction":"6% increased Area of Effect&#10;20% increased Elemental Damage",
    "Master of Fire":"Nearby Enemies have Fire Exposure",
    "Smoking Remains":"35% increased Fire Damage&#10;10% chance to create a Smoke Cloud on Kill",
    "Cremator":"30% increased Fire Damage&#10;Ignited Enemies you hit are destroyed on Kill",
    "Snowstorm":"Gain 8% of Lightning Damage as Extra Cold Damage against Chilled Enemies",
    "Storm Drinker":"Damage Penetrates 8% Lightning Resistance&#10;0.5% of Lightning Damage Leeched as Energy Shield",
    "Paralysis":"30% increased Lightning Damage&#10;10% chance to double Stun Duration&#10;Lightning Skills have 10% reduced Enemy Stun Threshold",
    "Supercharge":"Lightning Damage with Non-Critical Strikes is Lucky",
    "Blanketed Snow":"Damage Penetrates 10% Cold Resistance against Chilled Enemies",
    "Cold to the Core":"1% increased Cold Damage per 25 Dexterity&#10;1% increased Cold Damage per 25 Intelligence&#10;1% increased Cold Damage per 25 Strength",
    "Cold-Blooded Killer":"+5% to Cold Damage over Time Multiplier&#10;Recover 2% of Life on Killing a Chilled Enemy",
    "Touch of Cruelty":"Chaos Skills have 10% chance to Hinder Enemies on Hit, with 30% reduced Movement Speed&#10;Enemies Hindered by you take 10% increased Chaos Damage",
    "Unwaveringly Evil":"30% increased Chaos Damage&#10;Chaos Skills ignore interruption from Stuns",
    "Unspeakable Gifts":"Enemies you Kill have a 10% chance to Explode, dealing a quarter of their maximum Life as Chaos Damage",
    "Dark Ideation":"2% increased Chaos Damage per 100 maximum Mana, up to a maximum of 80%",
    "Unholy Grace":"30% increased Chaos Damage&#10;10% increased Attack and Cast Speed",
    "Wicked Pall":"30% increased Chaos Damage&#10;5% increased Skill Effect Duration",
    "Renewal":"Minions Regenerate 1% of Life per second&#10;Minions have 5% chance to deal Double Damage while they are on Full Life",
    "Raze and Pillage":"Minions have 20% chance to Ignite&#10;Minions deal 20% increased Damage against Ignited Enemies&#10;Minions gain 6% of Physical Damage as Extra Fire Damage",
    "Rotten Claws":"Minions have a 20% chance to Impale on Hit with Attacks",
    "Call to the Slaughter":"Minions deal 15% increased Damage&#10;Minions created Recently have 10% increased Attack and Cast Speed&#10;Minions created Recently have 30% increased Movement Speed",
    "Skeletal Atrophy":"Summoned Skeletons have 10% chance to Wither Enemies for 2 seconds on Hit&#10;Summoned Skeletons have 30% of Physical Damage Converted to Chaos Damage",
    "Hulking Corpses":"Minions have 25% increased maximum Life&#10;Raised Zombies have 5% chance to Taunt Enemies on Hit",
    "Vicious Bite":"Minions have 30% increased Critical Strike Chance&#10;Minions have +15% to Critical Strike Multiplier",
    "Primordial Bond":"10% increased Damage per Summoned Golem&#10;40% increased Effect of Buffs granted by your Golems&#10;Golems have 25% increased Maximum Life",
    "Blowback":"Ignites you inflict deal Damage 8% faster",
    "Fan the Flames":"Ignites you inflict spread to other Enemies within a Radius of 15",
    "Cooked Alive":"15% chance to Ignite&#10;Enemies Ignited by you have -5% to Fire Resistance",
    "Burning Bright":"25% increased Burning Damage&#10;8% increased Area of Effect",
    "Wrapped in Flame":"20% increased Fire Damage&#10;5% chance to Cover Enemies in Ash on Hit while you are Burning&#10;Cannot be Chilled while Burning",
    "Vivid Hues":"20% increased Bleeding Damage&#10;2% of Attack Damage Leeched as Life against Bleeding Enemies&#10;20% increased total Recovery per second from Life Leech",
    "Rend":"+5% to Physical Damage over Time Multiplier&#10;20% increased Bleeding Duration",
    "Disorienting Wounds":"25% increased Damage with Bleeding&#10;25% chance to Blind with Hits against Bleeding Enemies",
    "Compound Injury":"35% increased Damage with Bleeding you inflict on Maimed Enemies",
    "Septic Spells":"5% increased Cast Speed&#10;Spell Skills have +5% to Damage over Time Multiplier for Poison&#10;20% chance to Poison on Hit with Spell Damage",
    "Low Tolerance":"Poisons you inflict on non-Poisoned Enemies deal 300% increased Damage",
    "Steady Torment":"20% increased Poison Duration&#10;20% increased Bleeding Duration&#10;+6% to Damage over Time Multiplier for Bleeding you inflict on Poisoned Enemies&#10;+6% to Damage over Time Multiplier for Poison you inflict on Bleeding Enemies",
    "Eternal Suffering":"+5% to Chaos Damage over Time Multiplier&#10;Chaos Skills have 30% increased Skill Effect Duration",
    "Eldritch Inspiration":"20% increased Chaos Damage&#10;16% increased maximum Mana&#10;20% increased Mana Regeneration Rate",
    "Wasting Affliction":"20% increased Damage with Ailments&#10;Damaging Ailments deal damage 5% faster",
    "Haemorrhage":"+10% to Damage over Time Multiplier for Ailments from Critical Strikes&#10;30% increased Critical Strike Chance",
    "Flow of Life":"24% increased Damage over Time&#10;4% increased maximum Life&#10;Regenerate 0.6% of Life per second",
    "Exposure Therapy":"+5% to Damage over Time Multiplier&#10;+30% Chaos Resistance against Damage Over Time",
    "Brush with Death":"+5% to Damage over Time Multiplier&#10;Recover 1% of Life on Kill&#10;Recover 1% of Energy Shield on Kill",
    "Vile Reinvigoration":"24% increased Damage over Time&#10;6% increased maximum Energy Shield&#10;Regenerate 2% of Energy Shield per second if you’ve Killed an Enemy Recently",
    "Circling Oblivion":"25% increased Damage over Time&#10;15% increased Duration of Ailments on Enemies",
    "Brewed for Potency":"24% increased Damage over Time&#10;10% increased Flask Charges gained&#10;20% increased Life and Mana Recovery from Flasks",
    "Astonishing Affliction":"20% increased Duration of Elemental Ailments on Enemies&#10;20% increased Damage with Hits and Ailments against Enemies affected by Ailments&#10;20% increased Effect of Non-Damaging Ailments",
    "Cold Conduction":"25% increased Effect of Lightning Ailments against Chilled Enemies&#10;25% increased Effect of Cold Ailments against Shocked Enemies",
    "Inspired Oppression":"20% increased Elemental Damage&#10;30% increased Mana Regeneration Rate if you have Frozen an Enemy Recently&#10;30% increased Mana Regeneration Rate if you have Shocked an Enemy Recently&#10;10% increased Effect of Non-Damaging Ailments",
    "Chilling Presence":"Nearby Enemies are Chilled",
    "Deep Chill":"+5% to Cold Damage over Time Multiplier&#10;30% increased Effect of Chill",
    "Blast-Freeze":"20% increased Cold Damage&#10;Freezes you inflict spread to other Enemies within a Radius of 12",
    "Thunderstruck":"20% increased Lightning Damage&#10;Your Critical Strikes Knock Back Shocked Enemies&#10;30% increased Critical Strike Chance",
    "Stormrider":"10% chance to gain a Power Charge when you Shock a Chilled Enemy&#10;25% increased Cold Damage with Hits against Shocked Enemies&#10;25% increased Lightning Damage with Hits against Chilled Enemies",
    "Overshock":"30% increased Lightning Damage&#10;40% increased Effect of Lightning Ailments",
    "Evil Eye":"Enemies you Curse take 4% increased Damage",
    "Inevitable Doom":"Hexes you inflict have +3 to maximum Doom&#10;Hexes have 50% increased Doom gain rate",
    "Forbidden Words":"25% increased Area of Effect of Curse Skills&#10;15% increased Mana Reservation Efficiency of Curse Aura Skills",
    "Doedre's Spite":"20% increased Enfeeble Curse Effect&#10;10% reduced Effect of Curses on you",
    "Victim Maker":"Curse Skills have 8% increased Cast Speed&#10;Enemies Cursed by you have Malediction if 33% of Curse Duration expired",
    "Master of Fear":"Enemies you Curse are Unnerved",
    "Wish for Death":"You have Culling Strike against Cursed Enemies",
    "Heraldry":"Nearby Enemies have Fire Exposure while you are affected by Herald of Ash&#10;Nearby Enemies have Cold Exposure while you are affected by Herald of Ice&#10;Nearby Enemies have Lightning Exposure while you are affected by Herald of Thunder",
    "Endbringer":"20% increased Damage while affected by a Herald&#10;5% increased Damage for each Herald affecting you",
    "Cult-Leader":"Minions deal 35% increased Damage while you are affected by a Herald",
    "Empowered Envoy":"Herald Skills deal 40% increased Damage&#10;20% increased Effect of Herald Buffs on you",
    "Dark Messenger":"Herald Skills have 25% increased Area of Effect&#10;Herald Skills deal 20% increased Damage",
    "Agent of Destruction":"10% chance to Freeze, Shock and Ignite while affected by a Herald&#10;25% increased Elemental Damage while affected by a Herald",
    "Lasting Impression":"30% increased Damage over Time while affected by a Herald&#10;Herald Skills deal 50% increased Damage over Time",
    "Self-Fulfilling Prophecy":"+1% to Critical Strike Chance of Herald Skills&#10;+15% to Critical Strike Multiplier if you dealt a Critical Strike with a Herald Skill Recently",
    "Invigorating Portents":"Minions deal 20% increased Damage while you are affected by a Herald&#10;Minions have 10% increased Movement Speed for each Herald affecting you",
    "Pure Agony":"+5 to Maximum Virulence&#10;Minions deal 20% increased Damage while you are affected by a Herald",
    "Disciples":"Minions deal 20% increased Damage while you are affected by a Herald&#10;Summoned Sentinels have 25% increased Cooldown Recovery Rate",
    "Dread March":"Minions have 10% increased maximum Life&#10;Minions have 10% increased Movement Speed&#10;Minions have 10% additional Physical Damage Reduction&#10;Minions have +10% to Chaos Resistance",
    "Blessed Rebirth":"Minions have 20% increased maximum Life&#10;Minions created Recently cannot be Damaged",
    "Life from Death":"Minions have 15% increased maximum Life&#10;Regenerate 2% of Life per second if a Minion has Died Recently&#10;Minions Recover 4% of Life on Minion Death",
    "Feasting Fiends":"Minions have 10% increased maximum Life&#10;Minions deal 10% increased Damage&#10;Minions Leech 0.4% of Damage as Life",
    "Bodyguards":"Minions have 10% increased maximum Life&#10;Minions have 10% chance to Knock Enemies Back on Hit with Attacks",
    "Follow-Through":"Projectiles deal 15% increased Damage for each remaining Chain",
    "Streamlined":"20% increased Projectile Speed&#10;20% increased Projectile Damage",
    "Shrieking Bolts":"35% increased Projectile Damage&#10;10% chance to Taunt Enemies on Projectile Hit",
    "Eye to Eye":"25% increased Projectile Damage&#10;35% increased Projectile Damage with Hits against Nearby Enemies",
    "Repeater":"30% increased Projectile Damage&#10;8% increased Attack and Cast Speed",
    "Aerodynamics":"Projectiles Pierce an additional Target&#10;10% increased Projectile Speed&#10;10% increased Projectile Damage",
    "Chip Away":"Brand Recall has 4% increased Cooldown Recovery Rate per Brand, up to a maximum of 40%&#10;Brand Recall grants 20% increased Brand Attachment range to recalled Brands",
    "Seeker Runes":"25% increased Damage with Brand Skills&#10;Unattached Brands gain 20% increased Brand Attachment Range per second",
    "Remarkable":"Skills which create Brands have 35% chance to create an additional Brand&#10;8% increased Cast Speed with Brand Skills",
    "Brand Loyalty":"Enemies take 3% increased Damage for each of your Brands Attached to them",
    "Holy Conquest":"Brands have 25% increased Area of Effect if 50% of Attached Duration expired&#10;25% increased Brand Damage",
    "Grand Design":"20% increased Brand Damage&#10;Brand Skills have 10% increased Duration&#10;10% increased Brand Attachment range",
    "Set and Forget":"25% increased Trap Damage&#10;12% increased Area of Effect&#10;25% reduced Trap Duration&#10;40% increased Trap Trigger Area of Effect",
    "Expert Sabotage":"Mines have a 10% chance to be Detonated an Additional Time&#10;Mines have 20% increased Detonation Speed",
    "Guerilla Tactics":"20% increased Trap Damage&#10;20% increased Mine Damage&#10;10% increased Trap Throwing Speed&#10;10% increased Mine Throwing Speed&#10;5% increased Movement Speed if you've thrown a Trap or Mine Recently",
    "Expendability":"10% chance to throw up to 1 additional Trap or Mine",
    "Arcane Pyrotechnics":"20% increased Trap Damage&#10;20% increased Mine Damage&#10;Gain Arcane Surge when your Mine is Detonated targeting an Enemy&#10;Gain Arcane Surge when your Trap is Triggered by an Enemy",
    "Surprise Sabotage":"+8% to Critical Strike Multiplier with Traps&#10;+8% to Critical Strike Multiplier with Mines&#10;Trap Damage Penetrates 4% Elemental Resistances&#10;Mine Damage Penetrates 4% Elemental Resistances",
    "Careful Handling":"15% increased Trap Damage&#10;15% increased Mine Damage&#10;4% increased maximum Life&#10;6% increased maximum Mana",
    "Peak Vigour":"8% increased maximum Life&#10;20% increased Life Recovery from Flasks",
    "Fettle":"+20 to maximum Life&#10;10% increased maximum Life",
    "Feast of Flesh":"8% increased maximum Life&#10;0.4% of Attack Damage Leeched as Life&#10;+10 Life gained for each Enemy hit by your Attacks",
    "Sublime Sensation":"10% increased maximum Energy Shield&#10;8% increased maximum Life",
    "Surging Vitality":"8% increased maximum Life&#10;Regenerate 0.5% of Life per second&#10;Every 5 seconds, Regenerate 10% of Life over one second",
    "Peace Amidst Chaos":"8% increased maximum Life&#10;20% increased Armour while stationary&#10;Regenerate 2% of Life per second while stationary",
    "Adrenaline":"6% increased maximum Life&#10;10% increased Maximum total Recovery per second from Life Leech&#10;6% increased Attack Speed while Leeching",
    "Wall of Muscle":"6% increased maximum Life&#10;5% increased Strength",
    "Mindfulness":"15% increased maximum Mana&#10;80% increased Mana Regeneration Rate while stationary",
    "Liquid Inspiration":"15% increased maximum Mana&#10;20% increased Mana Recovery from Flasks&#10;25% chance to gain a Power Charge when you use a Mana Flask",
    "Openness":"+30 to maximum Mana&#10;20% increased maximum Mana",
    "Daring Ideas":"18% increased maximum Mana&#10;0.4% of Attack Damage Leeched as Mana",
    "Clarity of Purpose":"15% increased maximum Mana&#10;30% increased Mana Regeneration Rate",
    "Scintillating Idea":"20% increased maximum Mana&#10;Damage Penetrates 5% Lightning Resistance",
    "Holistic Health":"8% increased maximum Life&#10;10% increased maximum Mana",
    "Genius":"8% increased maximum Mana&#10;5% increased Intelligence",
    "Improvisor":"6% increased Attack Speed&#10;10% increased maximum Mana&#10;+3 Mana gained for each Enemy hit by your Attacks",
    "Stubborn Student":"15% increased maximum Mana&#10;20% increased Armour&#10;+1 Armour per 10 Unreserved Maximum Mana",
    "Savour the Moment":"10% increased maximum Energy Shield&#10;Regenerate 3.00% of Energy Shield per second while stationary",
    "Energy From Naught":"+60 to maximum Energy Shield",
    "Will Shaper":"Gain 5% of Maximum Mana as Extra Maximum Energy Shield",
    "Spring Back":"8% increased maximum Energy Shield&#10;5% faster start of Energy Shield Recharge&#10;15% increased Energy Shield Recharge Rate",
    "Conservation of Energy":"8% increased maximum Energy Shield&#10;0.3% of Spell Damage Leeched as Energy Shield&#10;10% increased Maximum total Recovery per second from Energy Shield Leech",
    "Heart of Iron":"Gain 10% of Maximum Life as Extra Armour",
    "Prismatic Carapace":"30% increased Armour&#10;+1% to all maximum Elemental Resistances",
    "Militarism":"30% increased Armour&#10;8% increased maximum Life",
    "Second Skin":"3% Chance to Block Spell Damage&#10;30% increased Armour&#10;+3% Chance to Block Attack Damage",
    "Dragon Hunter":"+20% to Fire Resistance&#10;30% increased Armour&#10;15% chance to Defend with Double Armour",
    "Enduring Composure":"30% increased Armour&#10;Gain an Endurance Charge every second if you've been Hit Recently",
    "Prismatic Dance":"30% increased Evasion Rating&#10;+1% to all maximum Elemental Resistances",
    "Natural Vigour":"30% increased Evasion Rating&#10;8% increased maximum Life",
    "Untouchable":"30% increased Evasion Rating&#10;+6% chance to Suppress Spell Damage",
    "Shifting Shadow":"20% increased Evasion Rating&#10;+20 to Dexterity&#10;10% chance to Blind Enemies on Hit",
    "Readiness":"30% increased Evasion Rating if you haven't been Hit Recently&#10;30% chance to avoid Bleeding&#10;30% chance to avoid being Impaled",
    "Confident Combatant":"1% increased Damage per 1% Chance to Block Attack Damage", /* Legacy, no longer obtainable as of 3.11.0. */
    "Flexible Sentry":"3% Chance to Block Spell Damage&#10;25% reduced Elemental Ailment Duration on you&#10;25% reduced Effect of Chill and Shock on you&#10;+3% Chance to Block Attack Damage",
    "Vicious Guard":"0.4% of Attack Damage Leeched as Life&#10;Regenerate 1.5% of Life per second&#10;+4% Chance to Block Attack Damage",
    "Mystical Ward":"4% Chance to Block Spell Damage&#10;0.3% of Spell Damage Leeched as Energy Shield&#10;Regenerate 1.5% of Energy Shield per second",
    "Rote Reinforcement":"+20 to maximum Life&#10;20% chance to gain an Endurance Charge when you Block&#10;+4% Chance to Block Attack Damage",
    "Mage Hunter":"4% Chance to Block Spell Damage&#10;20% increased Spell Damage&#10;20% chance to gain a Power Charge when you Block",
    "Riot Queller":"+4% Chance to Block Attack Damage&#10;Enemies Taunted by you take 6% increased Damage",
    "One with the Shield":"Recover 50 Life when you Block&#10;50% increased Defences from Equipped Shield&#10;+5% Chance to Block Attack Damage while holding a Shield",
    "Aerialist":"3% chance to Dodge Attack Hits&#10;3% chance to Dodge Spell Hits&#10;5% increased Dexterity",
    "Elegant Form":"20% chance to Avoid Elemental Ailments&#10;+6% chance to Suppress Spell Damage",
    "Darting Movements":"3% increased Movement Speed&#10;+8% chance to Suppress Spell Damage while moving",
    "No Witnesses":"10% chance to gain Elusive on Kill&#10;25% increased Elusive Effect", /* Legacy, no longer obtainable as of 3.11.0. */
    "Molten One's Mark":"+2% to maximum Fire Resistance&#10;Regenerate 1% of Life per second",
    "Fire Attunement":"30% reduced Ignite Duration on you&#10;Unaffected by Burning Ground&#10;You cannot be Ignited if you've been Ignited Recently",
    "Pure Might":"40% increased Stun and Block Recovery&#10;80% increased Mana Reservation Efficiency for Purity of Fire&#10;+20 to Strength",
    "Blacksmith":"25% increased Armour&#10;+20% to Fire Resistance&#10;0.4% of Fire Damage Leeched as Life",
    "Non-Flammable":"+20% to Fire Resistance&#10;30% chance to Avoid being Ignited&#10;+1% to maximum Fire Resistance",
    "Winter Prowler":"+2% to maximum Cold Resistance&#10;10% increased Life Recovery from Flasks",
    "Hibernator":"30% reduced Freeze Duration on you&#10;30% reduced Effect of Chill on you&#10;Unaffected by Chilled Ground&#10;You cannot be Frozen if you've been Frozen Recently",
    "Pure Guile":"Purity of Ice has 80% increased Mana Reservation Efficiency&#10;+20 to Dexterity&#10;5% chance to Blind Enemies on Hit",
    "Alchemist":"+20% to Cold Resistance&#10;8% increased Attack and Cast Speed&#10;20% increased Life Recovery from Flasks",
    "Antifreeze":"+20% to Cold Resistance&#10;30% chance to Avoid being Frozen&#10;+1% to maximum Cold Resistance",
    "Wizardry":"8% increased maximum Mana&#10;+2% to maximum Lightning Resistance",
    "Capacitor":"30% reduced Effect of Shock on you&#10;Unaffected by Shocked Ground&#10;You cannot be Shocked if you've been Shocked Recently",
    "Pure Aptitude":"15% increased Energy Shield Recharge Rate&#10;Purity of Lightning has 80% increased Mana Reservation Efficiency&#10;+20 to Intelligence",
    "Sage":"20% increased Mana Regeneration Rate&#10;+20% to Lightning Resistance&#10;Regenerate 1.5% of Life per second",
    "Insulated":"+20% to Lightning Resistance&#10;30% chance to Avoid being Shocked&#10;+1% to maximum Lightning Resistance",
    "Born of Chaos":"+3% to maximum Chaos Resistance",
    "Antivenom":"+23% to Chaos Resistance&#10;30% chance to Avoid being Poisoned&#10;+1% to maximum Chaos Resistance",
    "Rot-Resistant":"+13% to Chaos Resistance&#10;Regenerate 1.2% of Life per second&#10;Regenerate 0.6% of Energy Shield per second&#10;Regenerate 0.3% of Mana per second",
    "Blessed":"6% increased maximum Life&#10;10% increased maximum Mana&#10;+13% to Chaos Resistance",
    "Student of Decay":"25% increased Damage over Time&#10;+13% to Chaos Resistance",
    "Uncompromising":"Determination has 50% increased Mana Reservation Efficiency&#10;20% increased Stun Threshold",
    "Self-Control":"Discipline has 80% increased Mana Reservation Efficiency&#10;25% increased Mana Regeneration Rate",
    "Sublime Form":"Grace has 50% increased Mana Reservation Efficiency&#10;+10% to all Elemental Resistancese",
    "Introspection":"Auras from your Skills have 10% increased Effect on you",
    "Mortifying Aspect":"Malevolence has 50% increased Mana Reservation Efficiency&#10;+11% to Chaos Resistance",
    "Frantic Aspect":"Haste has 50% increased Mana Reservation Efficiency&#10;Debuffs on you expire 10% faster",
    "Misery Everlasting":"40% increased Despair Curse Effect&#10;10% increased Skill Effect Duration",
    "Lord of Drought":"40% increased Flammability Curse Effect&#10;10% increased Area of Effect",
    "Blizzard Caller":"40% increased Frostbite Curse Effect&#10;15% increased Critical Strike Chance",
    "Exploit Weakness":"40% increased Vulnerability Curse Effect&#10;15% increased Physical Damage",
    "Tempt the Storm":"40% increased Conductivity Curse Effect&#10;25% increased Mana Regeneration Rate",
    "Blood Artist":"+6% to Physical Damage over time Multiplier if you've Spent Life Recently&#10;+20 to Strength",
    "Phlebotomist":"+6% to Physical Damage over Time Multiplier if you've dealt a Critical Strike Recently&#10;20% increased Critical Strike Chance",
    "Hound's Mark":"20% increased Effect of your Marks&#10;20% increased Damage with Hits and Ailments against Marked Enemy",
    "Doedre's Gluttony":"40% increased Punishment Curse Effect&#10;25% increased Damage with Hits against Enemies that are on Low Life",
    "Doedre's Apathy":"20% increased Temporal Chains Curse Effect&#10;10% reduced Elemental Ailment Duration on you",
    "Master of the Maelstrom":"40% increased Elemental Weakness Curse Effect&#10;10% chance to Freeze, Shock and Ignite"
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
            if (notableNextSibling && valid_class_names[notableNextSibling.className]) {
                notableNextSibling.remove();
            }
            if (notablePreviousSibling && valid_class_names[notablePreviousSibling.className]) {
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
