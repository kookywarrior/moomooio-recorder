const PORT = 6789
const items = {
	groups: [
		{ id: 0, name: "food", layer: 0 },
		{ id: 1, name: "walls", place: true, limit: 30, layer: 0 },
		{ id: 2, name: "spikes", place: true, limit: 15, layer: 0 },
		{ id: 3, name: "mill", place: true, limit: 7, layer: 1 },
		{ id: 4, name: "mine", place: true, limit: 1, layer: 0 },
		{ id: 5, name: "trap", place: true, limit: 6, layer: -1 },
		{ id: 6, name: "booster", place: true, limit: 12, layer: -1 },
		{ id: 7, name: "turret", place: true, limit: 2, layer: 1 },
		{ id: 8, name: "watchtower", place: true, limit: 12, layer: 1 },
		{ id: 9, name: "buff", place: true, limit: 4, layer: -1 },
		{ id: 10, name: "spawn", place: true, limit: 1, layer: -1 },
		{ id: 11, name: "sapling", place: true, limit: 2, layer: 0 },
		{ id: 12, name: "blocker", place: true, limit: 3, layer: -1 },
		{ id: 13, name: "teleporter", place: true, limit: 2, layer: -1 }
	],
	projectiles: [
		{ indx: 0, layer: 0, src: "arrow_1", dmg: 25, speed: 1.6, scale: 103, range: 1000 },
		{ indx: 1, layer: 1, dmg: 25, scale: 20 },
		{ indx: 0, layer: 0, src: "arrow_1", dmg: 35, speed: 2.5, scale: 103, range: 1200 },
		{ indx: 0, layer: 0, src: "arrow_1", dmg: 30, speed: 2, scale: 103, range: 1200 },
		{ indx: 1, layer: 1, dmg: 16, scale: 20 },
		{ indx: 0, layer: 0, src: "bullet_1", dmg: 50, speed: 3.6, scale: 160, range: 1400 }
	],
	weapons: [
		{
			id: 0,
			type: 0,
			name: "tool hammer",
			desc: "tool for gathering all resources",
			src: "hammer_1",
			length: 140,
			width: 140,
			xOff: -3,
			yOff: 18,
			dmg: 25,
			range: 65,
			gather: 1,
			speed: 300
		},
		{
			id: 1,
			type: 0,
			age: 2,
			name: "hand axe",
			desc: "gathers resources at a higher rate",
			src: "axe_1",
			length: 140,
			width: 140,
			xOff: 3,
			yOff: 24,
			dmg: 30,
			spdMult: 1,
			range: 70,
			gather: 2,
			speed: 400
		},
		{
			id: 2,
			type: 0,
			age: 8,
			pre: 1,
			name: "great axe",
			desc: "deal more damage and gather more resources",
			src: "great_axe_1",
			length: 140,
			width: 140,
			xOff: -8,
			yOff: 25,
			dmg: 35,
			spdMult: 1,
			range: 75,
			gather: 4,
			speed: 400
		},
		{
			id: 3,
			type: 0,
			age: 2,
			name: "short sword",
			desc: "increased attack power but slower move speed",
			src: "sword_1",
			iPad: 1.3,
			length: 130,
			width: 210,
			xOff: -8,
			yOff: 46,
			dmg: 35,
			spdMult: 0.85,
			range: 110,
			gather: 1,
			speed: 300
		},
		{
			id: 4,
			type: 0,
			age: 8,
			pre: 3,
			name: "katana",
			desc: "greater range and damage",
			src: "samurai_1",
			iPad: 1.3,
			length: 130,
			width: 210,
			xOff: -8,
			yOff: 59,
			dmg: 40,
			spdMult: 0.8,
			range: 118,
			gather: 1,
			speed: 300
		},
		{
			id: 5,
			type: 0,
			age: 2,
			name: "polearm",
			desc: "long range melee weapon",
			src: "spear_1",
			iPad: 1.3,
			length: 130,
			width: 210,
			xOff: -8,
			yOff: 53,
			dmg: 45,
			knock: 0.2,
			spdMult: 0.82,
			range: 142,
			gather: 1,
			speed: 700
		},
		{
			id: 6,
			type: 0,
			age: 2,
			name: "bat",
			desc: "fast long range melee weapon",
			src: "bat_1",
			iPad: 1.3,
			length: 110,
			width: 180,
			xOff: -8,
			yOff: 53,
			dmg: 20,
			knock: 0.7,
			range: 110,
			gather: 1,
			speed: 300
		},
		{
			id: 7,
			type: 0,
			age: 2,
			name: "daggers",
			desc: "really fast short range weapon",
			src: "dagger_1",
			iPad: 0.8,
			length: 110,
			width: 110,
			xOff: 18,
			yOff: 0,
			dmg: 20,
			knock: 0.1,
			range: 65,
			gather: 1,
			hitSlow: 0.1,
			spdMult: 1.13,
			speed: 100
		},
		{
			id: 8,
			type: 0,
			age: 2,
			name: "stick",
			desc: "great for gathering but very weak",
			src: "stick_1",
			length: 140,
			width: 140,
			xOff: 3,
			yOff: 24,
			dmg: 1,
			spdMult: 1,
			range: 70,
			gather: 7,
			speed: 400
		},
		{
			id: 9,
			type: 1,
			age: 6,
			name: "hunting bow",
			desc: "bow used for ranged combat and hunting",
			src: "bow_1",
			req: ["wood", 4],
			length: 120,
			width: 120,
			xOff: -6,
			yOff: 0,
			projectile: 0,
			spdMult: 0.75,
			speed: 600
		},
		{
			id: 10,
			type: 1,
			age: 6,
			name: "great hammer",
			desc: "hammer used for destroying structures",
			src: "great_hammer_1",
			length: 140,
			width: 140,
			xOff: -9,
			yOff: 25,
			dmg: 10,
			spdMult: 0.88,
			range: 75,
			sDmg: 7.5,
			gather: 1,
			speed: 400
		},
		{
			id: 11,
			type: 1,
			age: 6,
			name: "wooden shield",
			desc: "blocks projectiles and reduces melee damage",
			src: "shield_1",
			length: 120,
			width: 120,
			shield: 0.2,
			xOff: 6,
			yOff: 0,
			spdMult: 0.7
		},
		{
			id: 12,
			type: 1,
			age: 8,
			pre: 9,
			name: "crossbow",
			desc: "deals more damage and has greater range",
			src: "crossbow_1",
			req: ["wood", 5],
			aboveHand: true,
			armS: 0.75,
			length: 120,
			width: 120,
			xOff: -4,
			yOff: 0,
			projectile: 2,
			spdMult: 0.7,
			speed: 700
		},
		{
			id: 13,
			type: 1,
			age: 9,
			pre: 12,
			name: "repeater crossbow",
			desc: "high firerate crossbow with reduced damage",
			src: "crossbow_2",
			req: ["wood", 10],
			aboveHand: true,
			armS: 0.75,
			length: 120,
			width: 120,
			xOff: -4,
			yOff: 0,
			projectile: 3,
			spdMult: 0.7,
			speed: 230
		},
		{
			id: 14,
			type: 1,
			age: 6,
			name: "mc grabby",
			desc: "steals resources from enemies",
			src: "grab_1",
			length: 130,
			width: 210,
			xOff: -8,
			yOff: 53,
			dmg: 0,
			steal: 250,
			knock: 0.2,
			spdMult: 1.05,
			range: 125,
			gather: 0,
			speed: 700
		},
		{
			id: 15,
			type: 1,
			age: 9,
			pre: 12,
			name: "musket",
			desc: "slow firerate but high damage and range",
			src: "musket_1",
			req: ["stone", 10],
			aboveHand: true,
			rec: 0.35,
			armS: 0.6,
			hndS: 0.3,
			hndD: 1.6,
			length: 205,
			width: 205,
			xOff: 25,
			yOff: 0,
			projectile: 5,
			hideProjectile: true,
			spdMult: 0.6,
			speed: 1500
		}
	],
	list: [
		{
			group: { id: 0, name: "food", layer: 0 },
			name: "apple",
			desc: "restores 20 health when consumed",
			req: ["food", 10],
			scale: 22,
			holdOffset: 15,
			id: 0
		},
		{
			age: 3,
			group: { id: 0, name: "food", layer: 0 },
			name: "cookie",
			desc: "restores 40 health when consumed",
			req: ["food", 15],
			scale: 27,
			holdOffset: 15,
			id: 1
		},
		{
			age: 7,
			group: { id: 0, name: "food", layer: 0 },
			name: "cheese",
			desc: "restores 30 health and another 50 over 5 seconds",
			req: ["food", 25],
			scale: 27,
			holdOffset: 15,
			id: 2
		},
		{
			group: { id: 1, name: "walls", place: true, limit: 30, layer: 0 },
			name: "wood wall",
			desc: "provides protection for your village",
			req: ["wood", 10],
			projDmg: true,
			health: 380,
			scale: 50,
			holdOffset: 20,
			placeOffset: -5,
			id: 3
		},
		{
			age: 3,
			group: { id: 1, name: "walls", place: true, limit: 30, layer: 0 },
			name: "stone wall",
			desc: "provides improved protection for your village",
			req: ["stone", 25],
			health: 900,
			scale: 50,
			holdOffset: 20,
			placeOffset: -5,
			id: 4
		},
		{
			age: 7,
			pre: 4,
			group: { id: 1, name: "walls", place: true, limit: 30, layer: 0 },
			name: "castle wall",
			desc: "provides powerful protection for your village",
			req: ["stone", 35],
			health: 1500,
			scale: 52,
			holdOffset: 20,
			placeOffset: -5,
			id: 5
		},
		{
			group: { id: 2, name: "spikes", place: true, limit: 15, layer: 0 },
			name: "spikes",
			desc: "damages enemies when they touch them",
			req: ["wood", 20, "stone", 5],
			health: 400,
			dmg: 20,
			scale: 49,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5,
			id: 6
		},
		{
			age: 5,
			group: { id: 2, name: "spikes", place: true, limit: 15, layer: 0 },
			name: "greater spikes",
			desc: "damages enemies when they touch them",
			req: ["wood", 30, "stone", 10],
			health: 500,
			dmg: 35,
			scale: 52,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5,
			id: 7
		},
		{
			age: 9,
			pre: 7,
			group: { id: 2, name: "spikes", place: true, limit: 15, layer: 0 },
			name: "poison spikes",
			desc: "poisons enemies when they touch them",
			req: ["wood", 35, "stone", 15],
			health: 600,
			dmg: 30,
			pDmg: 5,
			scale: 52,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5,
			id: 8
		},
		{
			age: 9,
			pre: 7,
			group: { id: 2, name: "spikes", place: true, limit: 15, layer: 0 },
			name: "spinning spikes",
			desc: "damages enemies when they touch them",
			req: ["wood", 30, "stone", 20],
			health: 500,
			dmg: 45,
			turnSpeed: 0.003,
			scale: 52,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5,
			id: 9
		},
		{
			group: { id: 3, name: "mill", place: true, limit: 7, layer: 1 },
			name: "windmill",
			desc: "generates gold over time",
			req: ["wood", 50, "stone", 10],
			health: 400,
			pps: 1,
			turnSpeed: 0.0016,
			spritePadding: 25,
			iconLineMult: 12,
			scale: 45,
			holdOffset: 20,
			placeOffset: 5,
			id: 10
		},
		{
			age: 5,
			pre: 10,
			group: { id: 3, name: "mill", place: true, limit: 7, layer: 1 },
			name: "faster windmill",
			desc: "generates more gold over time",
			req: ["wood", 60, "stone", 20],
			health: 500,
			pps: 1.5,
			turnSpeed: 0.0025,
			spritePadding: 25,
			iconLineMult: 12,
			scale: 47,
			holdOffset: 20,
			placeOffset: 5,
			id: 11
		},
		{
			age: 8,
			pre: 11,
			group: { id: 3, name: "mill", place: true, limit: 7, layer: 1 },
			name: "power mill",
			desc: "generates more gold over time",
			req: ["wood", 100, "stone", 50],
			health: 800,
			pps: 2,
			turnSpeed: 0.005,
			spritePadding: 25,
			iconLineMult: 12,
			scale: 47,
			holdOffset: 20,
			placeOffset: 5,
			id: 12
		},
		{
			age: 5,
			group: { id: 4, name: "mine", place: true, limit: 1, layer: 0 },
			type: 2,
			name: "mine",
			desc: "allows you to mine stone",
			req: ["wood", 20, "stone", 100],
			iconLineMult: 12,
			scale: 65,
			holdOffset: 20,
			placeOffset: 0,
			id: 13
		},
		{
			age: 5,
			group: { id: 11, name: "sapling", place: true, limit: 2, layer: 0 },
			type: 0,
			name: "sapling",
			desc: "allows you to farm wood",
			req: ["wood", 150],
			iconLineMult: 12,
			colDiv: 0.5,
			scale: 110,
			holdOffset: 50,
			placeOffset: -15,
			id: 14
		},
		{
			age: 4,
			group: { id: 5, name: "trap", place: true, limit: 6, layer: -1 },
			name: "pit trap",
			desc: "pit that traps enemies if they walk over it",
			req: ["wood", 30, "stone", 30],
			trap: true,
			ignoreCollision: true,
			hideFromEnemy: true,
			health: 500,
			colDiv: 0.2,
			scale: 50,
			holdOffset: 20,
			placeOffset: -5,
			id: 15
		},
		{
			age: 4,
			group: { id: 6, name: "booster", place: true, limit: 12, layer: -1 },
			name: "boost pad",
			desc: "provides boost when stepped on",
			req: ["stone", 20, "wood", 5],
			ignoreCollision: true,
			boostSpeed: 1.5,
			health: 150,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5,
			id: 16
		},
		{
			age: 7,
			group: { id: 7, name: "turret", place: true, limit: 2, layer: 1 },
			doUpdate: true,
			name: "turret",
			desc: "defensive structure that shoots at enemies",
			req: ["wood", 200, "stone", 150],
			health: 800,
			projectile: 1,
			shootRange: 700,
			shootRate: 2200,
			scale: 43,
			holdOffset: 20,
			placeOffset: -5,
			id: 17
		},
		{
			age: 7,
			group: { id: 8, name: "watchtower", place: true, limit: 12, layer: 1 },
			name: "platform",
			desc: "platform to shoot over walls and cross over water",
			req: ["wood", 20],
			ignoreCollision: true,
			zIndex: 1,
			health: 300,
			scale: 43,
			holdOffset: 20,
			placeOffset: -5,
			id: 18
		},
		{
			age: 7,
			group: { id: 9, name: "buff", place: true, limit: 4, layer: -1 },
			name: "healing pad",
			desc: "standing on it will slowly heal you",
			req: ["wood", 30, "food", 10],
			ignoreCollision: true,
			healCol: 15,
			health: 400,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5,
			id: 19
		},
		{
			age: 9,
			group: { id: 10, name: "spawn", place: true, limit: 1, layer: -1 },
			name: "spawn pad",
			desc: "you will spawn here when you die but it will dissapear",
			req: ["wood", 100, "stone", 100],
			health: 400,
			ignoreCollision: true,
			spawnPoint: true,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5,
			id: 20
		},
		{
			age: 7,
			group: { id: 12, name: "blocker", place: true, limit: 3, layer: -1 },
			name: "blocker",
			desc: "blocks building in radius",
			req: ["wood", 30, "stone", 25],
			ignoreCollision: true,
			blocker: 300,
			health: 400,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5,
			id: 21
		},
		{
			age: 7,
			group: { id: 13, name: "teleporter", place: true, limit: 2, layer: -1 },
			name: "teleporter",
			desc: "teleports you to a random point on the map",
			req: ["wood", 60, "stone", 60],
			ignoreCollision: true,
			teleport: true,
			health: 200,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5,
			id: 22
		}
	]
}
const store = {
	sHats: {
		1: 1,
		2: 1,
		4: 1,
		5: 1,
		6: 0.94,
		7: 0.96,
		8: 1,
		9: 1,
		10: 1,
		11: 1,
		12: 1.16,
		13: 1,
		14: 1,
		15: 1,
		18: 1,
		20: 1,
		21: 1,
		22: 0.7,
		23: 1,
		26: 1,
		27: 1,
		28: 1,
		29: 1,
		30: 1,
		31: 1,
		32: 1,
		35: 1,
		36: 1,
		37: 1,
		38: 1,
		40: 0.3,
		42: 1,
		43: 1,
		44: 1,
		45: 1,
		46: 1,
		48: 1,
		49: 1,
		50: 1,
		51: 1,
		52: 1,
		53: 0.7,
		55: 1,
		56: 1.1,
		57: 1,
		58: 1
	},
	hats: [
		{
			id: 45,
			name: "Shame!",
			dontSell: true,
			price: 0,
			scale: 120,
			desc: "hacks are for losers"
		},
		{
			id: 51,
			name: "Moo Cap",
			price: 0,
			scale: 120,
			desc: "coolest mooer around"
		},
		{
			id: 50,
			name: "Apple Cap",
			price: 0,
			scale: 120,
			desc: "apple farms remembers"
		},
		{
			id: 28,
			name: "Moo Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 29,
			name: "Pig Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 30,
			name: "Fluff Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 36,
			name: "Pandou Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 37,
			name: "Bear Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 38,
			name: "Monkey Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 44,
			name: "Polar Head",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 35,
			name: "Fez Hat",
			price: 0,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 42,
			name: "Enigma Hat",
			price: 0,
			scale: 120,
			desc: "join the enigma army"
		},
		{
			id: 43,
			name: "Blitz Hat",
			price: 0,
			scale: 120,
			desc: "hey everybody i'm blitz"
		},
		{
			id: 49,
			name: "Bob XIII Hat",
			price: 0,
			scale: 120,
			desc: "like and subscribe"
		},
		{
			id: 57,
			name: "Pumpkin",
			price: 50,
			scale: 120,
			desc: "Spooooky"
		},
		{
			id: 8,
			name: "Bummle Hat",
			price: 100,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 2,
			name: "Straw Hat",
			price: 500,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 15,
			name: "Winter Cap",
			price: 600,
			scale: 120,
			desc: "allows you to move at normal speed in snow",
			coldM: 1
		},
		{
			id: 5,
			name: "Cowboy Hat",
			price: 1000,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 4,
			name: "Ranger Hat",
			price: 2000,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 18,
			name: "Explorer Hat",
			price: 2000,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 31,
			name: "Flipper Hat",
			price: 2500,
			scale: 120,
			desc: "have more control while in water",
			watrImm: true
		},
		{
			id: 1,
			name: "Marksman Cap",
			price: 3000,
			scale: 120,
			desc: "increases arrow speed and range",
			aMlt: 1.3
		},
		{
			id: 10,
			name: "Bush Gear",
			price: 3000,
			scale: 160,
			desc: "allows you to disguise yourself as a bush"
		},
		{
			id: 48,
			name: "Halo",
			price: 3000,
			scale: 120,
			desc: "no effect"
		},
		{
			id: 6,
			name: "Soldier Helmet",
			price: 4000,
			scale: 120,
			desc: "reduces damage taken but slows movement",
			spdMult: 0.94,
			dmgMult: 0.75
		},
		{
			id: 23,
			name: "Anti Venom Gear",
			price: 4000,
			scale: 120,
			desc: "makes you immune to poison",
			poisonRes: 1
		},
		{
			id: 13,
			name: "Medic Gear",
			price: 5000,
			scale: 110,
			desc: "slowly regenerates health over time",
			healthRegen: 3
		},
		{
			id: 9,
			name: "Miners Helmet",
			price: 5000,
			scale: 120,
			desc: "earn 1 extra gold per resource",
			extraGold: 1
		},
		{
			id: 32,
			name: "Musketeer Hat",
			price: 5000,
			scale: 120,
			desc: "reduces cost of projectiles",
			projCost: 0.5
		},
		{
			id: 7,
			name: "Bull Helmet",
			price: 6000,
			scale: 120,
			desc: "increases damage done but drains health",
			healthRegen: -5,
			dmgMultO: 1.5,
			spdMult: 0.96
		},
		{
			id: 22,
			name: "Emp Helmet",
			price: 6000,
			scale: 120,
			desc: "turrets won't attack but you move slower",
			antiTurret: 1,
			spdMult: 0.7
		},
		{
			id: 12,
			name: "Booster Hat",
			price: 6000,
			scale: 120,
			desc: "increases your movement speed",
			spdMult: 1.16
		},
		{
			id: 26,
			name: "Barbarian Armor",
			price: 8000,
			scale: 120,
			desc: "knocks back enemies that attack you",
			dmgK: 0.6
		},
		{
			id: 21,
			name: "Plague Mask",
			price: 10000,
			scale: 120,
			desc: "melee attacks deal poison damage",
			poisonDmg: 5,
			poisonTime: 6
		},
		{
			id: 46,
			name: "Bull Mask",
			price: 10000,
			scale: 120,
			desc: "bulls won't target you unless you attack them",
			bullRepel: 1
		},
		{
			id: 14,
			name: "Windmill Hat",
			topSprite: true,
			price: 10000,
			scale: 120,
			desc: "generates points while worn",
			pps: 1.5
		},
		{
			id: 11,
			name: "Spike Gear",
			topSprite: true,
			price: 10000,
			scale: 120,
			desc: "deal damage to players that damage you",
			dmg: 0.45
		},
		{
			id: 53,
			name: "Turret Gear",
			topSprite: true,
			price: 10000,
			scale: 120,
			desc: "you become a walking turret",
			turret: {
				proj: 1,
				range: 700,
				rate: 2500
			},
			spdMult: 0.7
		},
		{
			id: 20,
			name: "Samurai Armor",
			price: 12000,
			scale: 120,
			desc: "increased attack speed and fire rate",
			atkSpd: 0.78
		},
		{
			id: 58,
			name: "Dark Knight",
			price: 12000,
			scale: 120,
			desc: "restores health when you deal damage",
			healD: 0.4
		},
		{
			id: 27,
			name: "Scavenger Gear",
			price: 15000,
			scale: 120,
			desc: "earn double points for each kill",
			kScrM: 2
		},
		{
			id: 40,
			name: "Tank Gear",
			price: 15000,
			scale: 120,
			desc: "increased damage to buildings but slower movement",
			spdMult: 0.3,
			bDmg: 3.3
		},
		{
			id: 52,
			name: "Thief Gear",
			price: 15000,
			scale: 120,
			desc: "steal half of a players gold when you kill them",
			goldSteal: 0.5
		},
		{
			id: 55,
			name: "Bloodthirster",
			price: 20000,
			scale: 120,
			desc: "Restore Health when dealing damage. And increased damage",
			healD: 0.25,
			dmgMultO: 1.2
		},
		{
			id: 56,
			name: "Assassin Gear",
			price: 20000,
			scale: 120,
			desc: "Go invisible when not moving. Can't eat. Increased speed",
			noEat: true,
			spdMult: 1.1,
			invisTimer: 1000
		}
	],
	sAccs: {
		1: 1,
		2: 1,
		3: 1,
		4: 1,
		5: 1,
		6: 1,
		7: 1,
		8: 1,
		9: 1,
		10: 1,
		11: 1.35,
		12: 1,
		13: 1,
		14: 1,
		15: 1,
		16: 1,
		17: 1,
		18: 1,
		19: 1.1,
		20: 1,
		21: 1
	},
	accessories: [
		{
			id: 12,
			name: "Snowball",
			price: 1000,
			scale: 105,
			xOff: 18,
			desc: "no effect"
		},
		{
			id: 9,
			name: "Tree Cape",
			price: 1000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 10,
			name: "Stone Cape",
			price: 1000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 3,
			name: "Cookie Cape",
			price: 1500,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 8,
			name: "Cow Cape",
			price: 2000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 11,
			name: "Monkey Tail",
			price: 2000,
			scale: 97,
			xOff: 25,
			desc: "Super speed but reduced damage",
			spdMult: 1.35,
			dmgMultO: 0.2
		},
		{
			id: 17,
			name: "Apple Basket",
			price: 3000,
			scale: 80,
			xOff: 12,
			desc: "slowly regenerates health over time",
			healthRegen: 1
		},
		{
			id: 6,
			name: "Winter Cape",
			price: 3000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 4,
			name: "Skull Cape",
			price: 4000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 5,
			name: "Dash Cape",
			price: 5000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 2,
			name: "Dragon Cape",
			price: 6000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 1,
			name: "Super Cape",
			price: 8000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 7,
			name: "Troll Cape",
			price: 8000,
			scale: 90,
			desc: "no effect"
		},
		{
			id: 14,
			name: "Thorns",
			price: 10000,
			scale: 115,
			xOff: 20,
			desc: "no effect"
		},
		{
			id: 15,
			name: "Blockades",
			price: 10000,
			scale: 95,
			xOff: 15,
			desc: "no effect"
		},
		{
			id: 20,
			name: "Devils Tail",
			price: 10000,
			scale: 95,
			xOff: 20,
			desc: "no effect"
		},
		{
			id: 16,
			name: "Sawblade",
			price: 12000,
			scale: 90,
			spin: true,
			xOff: 0,
			desc: "deal damage to players that damage you",
			dmg: 0.15
		},
		{
			id: 13,
			name: "Angel Wings",
			price: 15000,
			scale: 138,
			xOff: 22,
			desc: "slowly regenerates health over time",
			healthRegen: 3
		},
		{
			id: 19,
			name: "Shadow Wings",
			price: 15000,
			scale: 138,
			xOff: 22,
			desc: "increased movement speed",
			spdMult: 1.1
		},
		{
			id: 18,
			name: "Blood Wings",
			price: 20000,
			scale: 178,
			xOff: 26,
			desc: "restores health when you deal damage",
			healD: 0.2
		},
		{
			id: 21,
			name: "Corrupt X Wings",
			price: 20000,
			scale: 178,
			xOff: 26,
			desc: "deal damage to players that damage you",
			dmg: 0.25
		}
	]
}
const config = {
	maxScreenWidth: 1920,
	maxScreenHeight: 1080,
	serverUpdateRate: 9,
	healthBarWidth: 50,
	healthBarPad: 4.5,
	iconPadding: 15,
	iconPad: 0.9,
	deathFadeout: 3000,
	crownIconScale: 60,
	crownPad: 35,
	chatCountdown: 3000,
	gatherWiggle: 10,
	hitReturnRatio: 0.25,
	hitAngle: Math.PI / 2,
	nameY: 34,
	skinColors: ["#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373"],
	cowNames: [
		"Sid",
		"Steph",
		"Bmoe",
		"Romn",
		"Jononthecool",
		"Fiona",
		"Vince",
		"Nathan",
		"Nick",
		"Flappy",
		"Ronald",
		"Otis",
		"Pepe",
		"Mc Donald",
		"Theo",
		"Fabz",
		"Oliver",
		"Jeff",
		"Jimmy",
		"Helena",
		"Reaper",
		"Ben",
		"Alan",
		"Naomi",
		"XYZ",
		"Clever",
		"Jeremy",
		"Mike",
		"Destined",
		"Stallion",
		"Allison",
		"Meaty",
		"Sophia",
		"Vaja",
		"Joey",
		"Pendy",
		"Murdoch",
		"Theo",
		"Jared",
		"July",
		"Sonia",
		"Mel",
		"Dexter",
		"Quinn",
		"Milky"
	],
	weaponVariants: [
		{ id: 0, src: "", xp: 0, val: 1 },
		{ id: 1, src: "_g", xp: 3000, val: 1.1 },
		{ id: 2, src: "_d", xp: 7000, val: 1.18 },
		{ id: 3, src: "_r", poison: true, xp: 12000, val: 1.18 }
	],
	riverWidth: 724,
	riverPadding: 114,
	waveSpeed: 0.0001,
	waveMax: 1.3,
	snowBiomeTop: 2400,
	mapScale: 14400,
	mapPingScale: 40
}
const UTILS = {
	randInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	},
	randFloat: function (min, max) {
		return Math.random() * (max - min + 1) + min
	},
	lerp: function (value1, value2, amount) {
		return value1 + (value2 - value1) * amount
	},
	getDistance: function (x1, y1, x2, y2) {
		return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2)
	},
	getDirection: function (x1, y1, x2, y2) {
		return Math.atan2(y1 - y2, x1 - x2)
	},
	fixTo: function (n, v) {
		return parseFloat(n.toFixed(v))
	},
	kFormat: function (num) {
		return num > 999 ? (num / 1000).toFixed(1) + "k" : num
	}
}
const dropZone = document.getElementById("dropZone")
const dropInput = document.getElementById("dropInput")
const loadScreen = document.getElementById("loadScreen")
const editorContainer = document.getElementById("editorContainer")
const canvasContainer = document.getElementById("canvasContainer")
const mainCanvas = document.getElementById("mainCanvas")
const mainContext = mainCanvas.getContext("2d")
const durationTrack = document.getElementById("durationTrack")
const slider1 = document.getElementById("slider1")
const slider2 = document.getElementById("slider2")
const timeline = document.getElementById("timeline")
const playButton = document.getElementById("playButton")
const prevFrame = document.getElementById("prevFrame")
const nextFrame = document.getElementById("nextFrame")
const markerContainer = document.getElementById("markerContainer")
const previewDATA = {
	FPS: 60,
	RESOLUTION: 0.5,
	SPEED: 1,
	TIMELINE: 0,
	CUTIN: 0,
	CUTOUT: 100,
	SEEK: 60,
	MARKER: true
}
var minGap = Math.ceil(1000 / previewDATA.FPS)
const elementDATA = {
	CURSORSIZE: 50,
	TOPINFOHOLDER: true,
	SHOP: true,
	CLAN: true,
	CLANNOTIFICATION: true,
	MINIMAP: true,
	RESOURCES: true,
	AGEBAR: true,
	SELECTITEM: true,
	UPGRADEITEM: true,
	DESCRIPTION: true,
	GAMEBUTTON: true,
	CHATBOX: true
}
const exportDATA = {
	FPS: 60,
	RESOLUTION: 1,
	SPEED: 1
}

const gameCanvas = document.createElement("canvas"),
	gameContext = gameCanvas.getContext("2d")
const elementCanvas = document.createElement("canvas"),
	elementContext = elementCanvas.getContext("2d")
const mapCanvas = document.createElement("canvas"),
	mapContext = mapCanvas.getContext("2d")
const storeCanvas = document.createElement("canvas"),
	storeContext = storeCanvas.getContext("2d")
const allianceCanvas = document.createElement("canvas"),
	allianceContext = allianceCanvas.getContext("2d")
const actionBarCanvas = document.createElement("canvas"),
	actionBarContext = actionBarCanvas.getContext("2d")
const descriptionCanvas = document.createElement("canvas"),
	descriptionContext = descriptionCanvas.getContext("2d")
const upgradeBarCanvas = document.createElement("canvas"),
	upgradeBarContext = upgradeBarCanvas.getContext("2d")
const disconnectCanvas = document.createElement("canvas"),
	disconnectContext = disconnectCanvas.getContext("2d")
const chatBoxCanvas = document.createElement("canvas"),
	chatBoxContext = chatBoxCanvas.getContext("2d")

var outlineColor = "#525252",
	darkOutlineColor = "#3d3f42",
	outlineWidth = 5.5

var iconSprites = {}
var iconsSrc = ["crown", "skull", "store", "chat", "tribe", "allow", "deny"]
var resourcesSprites = {}
var resourecesSrc = ["food_ico", "gold_ico", "stone_ico", "wood_ico"]
var projectileSprites = {}
var projectilesSrc = ["arrow_1", "arrow_2", "arrow_3", "bullet_1"]
var skinSprites = {}
var accessSprites = {}
var toolSprites = {}
var toolsSrc = [
	"axe_1",
	"bat_1",
	"bow_1",
	"crossbow_1",
	"crossbow_2",
	"dagger_1",
	"grab_1",
	"great_axe_1",
	"great_hammer_1",
	"hammer_1",
	"samurai_1",
	"musket_1",
	"shield_1",
	"spear_1",
	"stick_1",
	"sword_1"
]
var toolsVariance = ["", "_g", "_d", "_r"]
var aiSprites = {}
var aisSrc = [
	"bull_1",
	"bull_2",
	"chicken_1",
	"cow_1",
	"crate_1",
	"duck_1",
	"enemy",
	"fish_1",
	"pig_1",
	"sheep_1",
	"sid",
	"vince",
	"wolf_1",
	"wolf_2"
]
var actionBarSprites = []
var cursorSrc = ["normal", "pointer", "text"]
var cursorSprites = {}
let DATA = {},
	fileNAME = null
var RUNNINGFRAME = null

dropInput.addEventListener("change", () => {
	if (dropInput.files.length) {
		videoFileReader()
	}
})

dropZone.addEventListener("click", () => {
	dropInput.click()
})

dropZone.addEventListener("dragover", (event) => {
	event.preventDefault()
	dropZone.style.borderStyle = "solid"
})

dropZone.addEventListener("dragleave", () => {
	dropZone.style.borderStyle = null
})

dropZone.addEventListener("dragend", () => {
	dropZone.style.borderStyle = null
})

dropZone.addEventListener("drop", (event) => {
	event.preventDefault()

	if (event.dataTransfer.files.length) {
		dropInput.files = event.dataTransfer.files
		if (dropInput.files.length) {
			videoFileReader()
		}
		dropZone.style.borderStyle = null
	}
})

function videoFileReader() {
	if (dropInput.files[0].type !== "application/json") return
	dropZone.style.display = "none"
	loadScreen.style.display = "block"
	mainCanvas.style.display = "none"
	editorContainer.style.display = "flex"

	const reader = new FileReader()
	reader.readAsText(dropInput.files[0])
	reader.addEventListener("load", async (event) => {
		DATA = await JSON.parse(event.target.result)
		fileNAME = dropInput.files[0].name
		resizeUI()
		await preloadImages()
		document.getElementById("dimension").innerText = `${Math.floor(DATA.info.screenWidth * exportDATA.RESOLUTION)} × ${Math.floor(
			DATA.info.screenHeight * exportDATA.RESOLUTION
		)}`

		const maxValue = DATA.info.duration - (DATA.info.duration % previewDATA.FPS)
		timeline.setAttribute("max", maxValue)
		slider1.setAttribute("max", maxValue)
		slider2.setAttribute("max", maxValue)
		previewContainer.setRangeParameters("Timeline", 0, maxValue, 1)
		previewContainer.setRangeParameters("Start", 0, maxValue, 1)
		previewContainer.setRangeParameters("End", 0, maxValue, 1)
		previewContainer.setValue("End", maxValue)
		timeline.value = 0
		previewDATA.CUTOUT = maxValue
		previewContainer.setValue("Timeline", parseInt(timeline.value))
		slider1.value = 0
		slider2.value = DATA.info.duration
		Array.from(DATA.info.marker).forEach((marker) => {
			const markerDiv = document.createElement("div")
			markerDiv.classList.add("markerItems")
			markerDiv.style.left = `${(marker / maxValue) * 100}%`
			markerContainer.appendChild(markerDiv)
		})
		markerContainer.style.display = previewDATA.MARKER ? "block" : "none"
		fillColour()
		renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, 0, null, elementDATA)
		loadScreen.style.display = "none"
		mainCanvas.style.display = "block"

		window.onresize = resizeUI
	})
}

function resizeUI() {
	const containerRatio = (window.innerWidth - 250) / (window.innerHeight - 100)
	const videoRatio = DATA.info.screenWidth / DATA.info.screenHeight
	const width = containerRatio < videoRatio ? window.innerWidth - 250 : (DATA.info.screenWidth / DATA.info.screenHeight) * (window.innerHeight - 100)
	const height = containerRatio < videoRatio ? (DATA.info.screenHeight / DATA.info.screenWidth) * (window.innerWidth - 250) : window.innerHeight - 100
	mainCanvas.style.width = width + "px"
	mainCanvas.style.height = height + "px"
}

async function renderToCanvas(resolution, frameRate, renderFrame, renderStart, element) {
	const { duration, count, screenWidth, screenHeight, breaks } = DATA.info
	let tmpSTARTDATA = {}
	for (const key in breaks) {
		if ((renderFrame != null && parseInt(key) <= renderFrame) || (renderStart != null && parseInt(key) <= renderStart)) {
			tmpSTARTDATA.time = key
			tmpSTARTDATA.name = breaks[key].name
			tmpSTARTDATA.counter = breaks[key].count
		} else {
			break
		}
	}
	const startData = { ...DATA.data[tmpSTARTDATA.name] }
	const datas = DATA.data

	var hats = store.hats,
		accessories = store.accessories
	var canvasWidth, canvasHeight
	var storeWidth, storeHeight
	var allianceWidth, allianceHeight
	var actionBarWidth, actionBarHeight
	var descriptionWidth, descriptionHeight
	var upgradeBarWidth, upgradeBarHeight
	var disconnectHeight
	var inGame = false,
		disconnect = false

	const lerpAngle = function (value1, value2, amount) {
		var difference = Math.abs(value2 - value1)
		if (difference > Math.PI) {
			if (value1 > value2) {
				value2 += Math.PI * 2
			} else {
				value1 += Math.PI * 2
			}
		}
		var value = value2 + (value1 - value2) * amount
		if (value >= 0 && value <= Math.PI * 2) {
			return value
		}
		return value % (Math.PI * 2)
	}

	var players = []
	var player = null
	var playerSID = null
	var lockDir = false
	var canvasMouse, mouse
	var moofoll = false
	class Player {
		constructor(id, sid, assign) {
			this.id = id
			this.sid = sid
			this.team = null
			this.skinIndex = 0
			this.tailIndex = 0
			this.skinColor = 0
			this.iconIndex = 0
			this.skinRot = 0
			this.scale = 35
			this.maxHealth = 100
			this.dt = 0
			this.player_isPlayer = true
			if (assign) {
				Object.assign(this, assign)
			}
		}
		mySpawn() {
			player = this
			this.maxXP = 300
			this.XP = 0
			this.age = 1
			this.kills = 0
			this.upgrAge = 2
			this.upgradePoints = 0
			this.items = [0, 3, 6, 10]
			this.weapons = [0]
			this.itemCounts = {}
			this.wood = moofoll ? 100 : 0
			this.food = moofoll ? 100 : 0
			this.stone = moofoll ? 100 : 0
			this.points = moofoll ? 100 : 0
			updateAge()
			updateItems()
			updateUpgrades(0)
		}
		spawn(data) {
			this.chatCountdown = 0
			this.animTime = 0
			this.animSpeed = 0
			this.buildIndex = -1
			this.weaponIndex = 0
			this.health = this.maxHealth
			this.targetAngle = 0
			this.dir = 0
			this.dirPlus = 0
			this.zIndex = 0
			this.id = data[0]
			this.sid = data[1]
			this.name = data[2]
			this.x = data[3]
			this.y = data[4]
			this.dir = data[5]
			this.health = data[6]
			this.maxHealth = data[7]
			this.scale = data[8]
			this.skinColor = data[9]
			this.x2 = undefined
			this.y2 = undefined
			this.visible = false
			this.tmpRatio = 0
			this.animIndex = 0
		}
		animate(delta) {
			if (this.animTime > 0) {
				this.animTime -= delta
				if (this.animTime <= 0) {
					this.animTime = 0
					this.dirPlus = 0
					this.tmpRatio = 0
					this.animIndex = 0
				} else {
					if (this.animIndex == 0) {
						this.tmpRatio += delta / (this.animSpeed * config.hitReturnRatio)
						this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, this.tmpRatio))
						if (this.tmpRatio >= 1) {
							this.tmpRatio = 1
							this.animIndex = 1
						}
					} else {
						this.tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio))
						this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, this.tmpRatio))
					}
				}
			}
		}
		startAnim(didHit, index) {
			this.animTime = this.animSpeed = items.weapons[index].speed
			this.targetAngle = didHit ? -config.hitAngle : -Math.PI
			this.tmpRatio = 0
			this.animIndex = 0
		}
	}
	function findPlayerByID(id) {
		for (var i = 0; i < players.length; ++i) {
			if (players[i].id == id) {
				return players[i]
			}
		}
		return null
	}
	function findPlayerBySID(sid) {
		for (var i = 0; i < players.length; ++i) {
			if (players[i].sid == sid) {
				return players[i]
			}
		}
		return null
	}

	var gameObjects = []
	class GameObject {
		constructor(sid, x, y, dir, scale, type, data, setSID, owner, assign) {
			this.sid = sid
			this.x = x
			this.y = y
			this.dir = dir
			this.xWiggle = 0
			this.yWiggle = 0
			this.scale = scale
			this.type = type
			this.owner = owner
			if (data) {
				this.id = data.id
				this.name = data.name
				this.object_isItem = this.id != undefined
				this.group = data.group
				this.colDiv = data.colDiv || 1
				this.blocker = data.blocker
				this.hideFromEnemy = data.hideFromEnemy
				this.turnSpeed = data.turnSpeed
			}
			this.layer = 2
			if (this.group != undefined) {
				this.layer = this.group.layer
			} else if (this.type == 0) {
				this.layer = 3
			} else if (this.type == 2) {
				this.layer = 0
			} else if (this.type == 4) {
				this.layer = -1
			}
			if (assign) {
				Object.assign(this, assign)
			}
		}
		update(delta) {
			if (this.xWiggle) {
				this.xWiggle *= Math.pow(0.99, delta)
			}
			if (this.yWiggle) {
				this.yWiggle *= Math.pow(0.99, delta)
			}
			if (this.turnSpeed) {
				this.dir += this.turnSpeed * delta
			}
		}
	}
	function findObjectBySid(sid) {
		for (let i = 0; i < gameObjects.length; ++i) {
			if (gameObjects[i].sid == sid) {
				return gameObjects[i]
			}
		}
		return null
	}

	var ais = []
	var aiTypes = [
		{
			id: 0,
			src: "cow_1",
			killScore: 150,
			health: 500,
			weightM: 0.8,
			speed: 0.00095,
			turnSpeed: 0.001,
			scale: 72,
			drop: ["food", 50]
		},
		{
			id: 1,
			src: "pig_1",
			killScore: 200,
			health: 800,
			weightM: 0.6,
			speed: 0.00085,
			turnSpeed: 0.001,
			scale: 72,
			drop: ["food", 80]
		},
		{
			id: 2,
			name: "Bull",
			src: "bull_2",
			hostile: true,
			dmg: 20,
			killScore: 1000,
			health: 1800,
			weightM: 0.5,
			speed: 0.00094,
			turnSpeed: 0.00074,
			scale: 78,
			viewRange: 800,
			chargePlayer: true,
			drop: ["food", 100]
		},
		{
			id: 3,
			name: "Bully",
			src: "bull_1",
			hostile: true,
			dmg: 20,
			killScore: 2000,
			health: 2800,
			weightM: 0.45,
			speed: 0.001,
			turnSpeed: 0.0008,
			scale: 90,
			viewRange: 900,
			chargePlayer: true,
			drop: ["food", 400]
		},
		{
			id: 4,
			name: "Wolf",
			src: "wolf_1",
			hostile: true,
			dmg: 8,
			killScore: 500,
			health: 300,
			weightM: 0.45,
			speed: 0.001,
			turnSpeed: 0.002,
			scale: 84,
			viewRange: 800,
			chargePlayer: true,
			drop: ["food", 200]
		},
		{
			id: 5,
			name: "Quack",
			src: "chicken_1",
			dmg: 8,
			killScore: 2000,
			noTrap: true,
			health: 300,
			weightM: 0.2,
			speed: 0.0018,
			turnSpeed: 0.006,
			scale: 70,
			drop: ["food", 100]
		},
		{
			id: 6,
			name: "MOOSTAFA",
			nameScale: 50,
			src: "enemy",
			hostile: true,
			dontRun: true,
			fixedSpawn: true,
			spawnDelay: 60000,
			noTrap: true,
			colDmg: 100,
			dmg: 40,
			killScore: 8000,
			health: 18000,
			weightM: 0.4,
			speed: 0.0007,
			turnSpeed: 0.01,
			scale: 80,
			spriteMlt: 1.8,
			leapForce: 0.9,
			viewRange: 1000,
			hitRange: 210,
			hitDelay: 1000,
			chargePlayer: true,
			drop: ["food", 100]
		},
		{
			id: 7,
			name: "Treasure",
			hostile: true,
			nameScale: 35,
			src: "crate_1",
			fixedSpawn: true,
			spawnDelay: 120000,
			colDmg: 200,
			killScore: 5000,
			health: 20000,
			weightM: 0.1,
			speed: 0.0,
			turnSpeed: 0.0,
			scale: 70,
			spriteMlt: 1.0
		},
		{
			id: 8,
			name: "MOOFIE",
			src: "wolf_2",
			hostile: true,
			fixedSpawn: true,
			dontRun: true,
			hitScare: 4,
			spawnDelay: 30000,
			noTrap: true,
			nameScale: 35,
			dmg: 10,
			colDmg: 100,
			killScore: 3000,
			health: 7000,
			weightM: 0.45,
			speed: 0.0015,
			turnSpeed: 0.002,
			scale: 90,
			viewRange: 800,
			chargePlayer: true,
			drop: ["food", 1000]
		}
	]
	class AI {
		constructor(sid, assign) {
			this.sid = sid
			if (assign) {
				Object.assign(this, assign)
			}
		}
		init(x, y, dir, index, data) {
			this.tmpRatio = 0
			this.animIndex = 0
			this.x = x
			this.y = y
			this.dir = dir
			this.dirPlus = 0
			this.index = index
			this.src = data.src
			if (data.name) this.name = data.name
			this.scale = data.scale
			this.maxHealth = data.health
			this.health = this.maxHealth
			this.spriteMlt = data.spriteMlt
			this.nameScale = data.nameScale
		}
		animate(delta) {
			if (this.animTime > 0) {
				this.animTime -= delta
				if (this.animTime <= 0) {
					this.animTime = 0
					this.dirPlus = 0
					this.tmpRatio = 0
					this.animIndex = 0
				} else {
					if (this.animIndex == 0) {
						this.tmpRatio += delta / (this.animSpeed * config.hitReturnRatio)
						this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, this.tmpRatio))
						if (this.tmpRatio >= 1) {
							this.tmpRatio = 1
							this.animIndex = 1
						}
					} else {
						this.tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio))
						this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, this.tmpRatio))
					}
				}
			}
		}
		startAnim() {
			this.animTime = this.animSpeed = 600
			this.targetAngle = Math.PI * 0.8
			this.tmpRatio = 0
			this.animIndex = 0
		}
	}
	function findAIBySID(sid) {
		for (var i = 0; i < ais.length; ++i) {
			if (ais[i].sid == sid) {
				return ais[i]
			}
		}
		return null
	}

	var projectiles = []
	class Projectile {
		constructor(sid, assign) {
			this.sid = sid
			if (assign) {
				Object.assign(this, assign)
			}
		}
		init(indx, x, y, dir, speed, dmg, range, scale) {
			this.active = true
			this.indx = indx
			this.x = x
			this.y = y
			this.dir = dir
			this.skipMov = true
			this.speed = speed
			this.range = range
			this.scale = scale
			this.dmg = dmg
		}
		update(delta) {
			if (this.active) {
				var tmpSpeed = this.speed * delta
				if (!this.skipMov) {
					this.x += tmpSpeed * Math.cos(this.dir)
					this.y += tmpSpeed * Math.sin(this.dir)
					this.range -= tmpSpeed
					if (this.range <= 0) {
						this.x += this.range * Math.cos(this.dir)
						this.y += this.range * Math.sin(this.dir)
						tmpSpeed = 1
						this.range = 0
						this.active = false
					}
				} else {
					this.skipMov = false
				}
			}
		}
	}

	var texts = []
	class Text {
		constructor(assign) {
			if (assign) {
				Object.assign(this, assign)
			}
		}

		init(x, y, scale, speed, life, text, color) {
			this.x = x
			this.y = y
			this.color = color
			this.scale = scale
			this.startScale = this.scale
			this.maxScale = scale * 1.5
			this.scaleSpeed = 0.7
			this.speed = speed
			this.life = life
			this.text = text
		}

		update(delta) {
			if (this.life) {
				this.life -= delta
				this.y -= this.speed * delta
				this.scale += this.scaleSpeed * delta
				if (this.scale >= this.maxScale) {
					this.scale = this.maxScale
					this.scaleSpeed *= -1
				} else if (this.scale <= this.startScale) {
					this.scale = this.startScale
					this.scaleSpeed = 0
				}
				if (this.life <= 0) {
					this.life = 0
				}
			}
		}

		render(ctxt, xOff, yOff) {
			ctxt.fillStyle = this.color
			ctxt.font = this.scale + "px Hammersmith One"
			ctxt.fillText(this.text, this.x - xOff, this.y - yOff)
		}
	}

	var minimapData
	var mapPings = []
	var tmpPing
	class MapPing {
		constructor(assign) {
			if (assign) {
				Object.assign(this, assign)
			}
		}
		init(x, y) {
			this.scale = 0
			this.x = x
			this.y = y
			this.active = true
		}
		update(ctxt, delta) {
			if (this.active) {
				this.scale += 0.05 * delta
				if (this.scale >= config.mapPingScale) {
					this.active = false
				} else {
					ctxt.globalAlpha = 1 - Math.max(0, this.scale / config.mapPingScale)
					ctxt.beginPath()
					ctxt.arc((this.x / config.mapScale) * 300, (this.y / config.mapScale) * 300, this.scale, 0, 2 * Math.PI)
					ctxt.stroke()
				}
			}
		}
	}

	function setupGame(yourSID) {
		inGame = true
		playerSID = yourSID
	}

	function addPlayer(data, isYou) {
		var tmpPlayer = findPlayerByID(data[0])
		if (!tmpPlayer) {
			tmpPlayer = new Player(data[0], data[1])
			players.push(tmpPlayer)
		}
		tmpPlayer.spawn(data)
		if (isYou) tmpPlayer.mySpawn()
	}

	function removePlayer(id) {
		for (var i = 0; i < players.length; i++) {
			if (players[i].id == id) {
				players.splice(i--, 1)
				break
			}
		}
	}

	function updatePlayers(data, time) {
		for (let i = 0; i < players.length; ++i) {
			players[i].forcePos = !players[i].visible
			players[i].visible = false
		}
		for (let i = 0; i < data.length; i += 13) {
			var tmpObj = findPlayerBySID(data[i])
			if (tmpObj) {
				tmpObj.t1 = tmpObj.t2 === undefined ? time : tmpObj.t2
				tmpObj.t2 = time
				tmpObj.x1 = tmpObj.x
				tmpObj.y1 = tmpObj.y
				tmpObj.x2 = data[i + 1]
				tmpObj.y2 = data[i + 2]
				tmpObj.d1 = tmpObj.d2 === undefined ? data[i + 3] : tmpObj.d2
				tmpObj.d2 = data[i + 3]
				tmpObj.dt = 0
				tmpObj.buildIndex = data[i + 4]
				tmpObj.weaponIndex = data[i + 5]
				tmpObj.weaponVariant = data[i + 6]
				tmpObj.team = data[i + 7]
				tmpObj.isLeader = data[i + 8]
				if (tmpObj == player) {
					player.isOwner = tmpObj.isLeader
				}
				tmpObj.skinIndex = data[i + 9]
				tmpObj.tailIndex = data[i + 10]
				tmpObj.iconIndex = data[i + 11]
				tmpObj.zIndex = data[i + 12]
				tmpObj.visible = true
			}
		}
	}

	var deathTextScale = 99999
	var deathTime = null
	function killPlayer() {
		deathTextScale = 0
		inGame = false
		deathTime = null
		player.lastDeath = {
			x: player.x,
			y: player.y
		}
	}

	function updateHealth(sid, value) {
		var tmpObj = findPlayerBySID(sid)
		if (tmpObj) {
			tmpObj.health = value
		}
	}

	function gatherAnimation(sid, didHit, index) {
		var tmpObj = findPlayerBySID(sid)
		if (tmpObj) tmpObj.startAnim(didHit, index)
	}

	function wiggleGameObject(dir, sid) {
		var tmpObj = findObjectBySid(sid)
		if (tmpObj) {
			tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir)
			tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir)
		}
	}

	function shootTurret(sid, dir) {
		var tmpObj = findObjectBySid(sid)
		if (tmpObj) {
			tmpObj.dir = dir
			tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir + Math.PI)
			tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir + Math.PI)
		}
	}

	function receiveChat(sid, message) {
		var tmpPlayer = findPlayerBySID(sid)
		if (tmpPlayer) {
			tmpPlayer.chatMessage = message
			tmpPlayer.chatCountdown = 3000
		}
	}

	function updateItems(data, wpn) {
		if (data) {
			if (wpn) player.weapons = data
			else player.items = data
		}
		renderActionBar()
	}

	function updateItemCounts(index, value) {
		if (player) {
			player.itemCounts[index] = value
		}
	}

	function setPlayerTeam(team, isOwner) {
		if (player) {
			player.team = team
			player.isOwner = isOwner
		}
	}

	function updateStoreItems(type, id, index) {
		if (index) {
			if (!type) {
				player.tails[id] = 1
			} else {
				player.tailIndex = id
			}
		} else {
			if (!type) {
				player.skins[id] = 1
			} else {
				player.skinIndex = id
			}
		}
	}

	function updateUpgrades(points, age) {
		player.upgradePoints = points
		player.upgrAge = age
		renderUpgradeBar()
	}

	function updateAge(xp, mxp, age) {
		if (xp != undefined) {
			player.XP = xp
		}
		if (mxp != undefined) {
			player.maxXP = mxp
		}
		if (age != undefined) {
			player.age = age
		}
	}

	function updatePlayerValue(index, value, updateView) {
		if (player) {
			player[index] = value
		}
	}

	function loadGameObject(data) {
		for (var i = 0; i < data.length; ) {
			var tmpObject = findObjectBySid(data[i])
			if (!tmpObject) {
				tmpObject = new GameObject(
					data[i],
					data[i + 1],
					data[i + 2],
					data[i + 3],
					data[i + 4],
					data[i + 5],
					items.list[data[i + 6]],
					true,
					data[i + 7] >= 0 ? { sid: data[i + 7] } : null
				)
				gameObjects.push(tmpObject)
			}
			i += 8
		}
	}

	function killObject(sid) {
		for (var i = 0; i < gameObjects.length; ++i) {
			if (gameObjects[i].sid == sid) {
				gameObjects.splice(i--, 1)
				break
			}
		}
	}

	function killObjects(sid) {
		for (var i = 0; i < gameObjects.length; ++i) {
			if (gameObjects[i].owner && gameObjects[i].owner.sid == sid) {
				gameObjects.splice(i--, 1)
			}
		}
	}

	function animateAI(sid) {
		var tmpObj = findAIBySID(sid)
		if (tmpObj) tmpObj.startAnim()
	}

	function loadAI(data, time) {
		for (let i = 0; i < ais.length; ++i) {
			ais[i].forcePos = !ais[i].visible
			ais[i].visible = false
		}
		if (data) {
			for (let i = 0; i < data.length; ) {
				var tmpObj = findAIBySID(data[i])
				if (tmpObj) {
					tmpObj.index = data[i + 1]
					tmpObj.t1 = tmpObj.t2 === undefined ? time : tmpObj.t2
					tmpObj.t2 = time
					tmpObj.x1 = tmpObj.x
					tmpObj.y1 = tmpObj.y
					tmpObj.x2 = data[i + 2]
					tmpObj.y2 = data[i + 3]
					tmpObj.d1 = tmpObj.d2 === undefined ? data[i + 4] : tmpObj.d2
					tmpObj.d2 = data[i + 4]
					tmpObj.health = data[i + 5]
					tmpObj.dt = 0
					tmpObj.visible = true
				} else {
					tmpObj = new AI(ais.length)
					ais.push(tmpObj)
					tmpObj.init(data[i + 2], data[i + 3], data[i + 4], data[i + 1], aiTypes[data[i + 1]])
					tmpObj.x2 = tmpObj.x
					tmpObj.y2 = tmpObj.y
					tmpObj.d2 = tmpObj.dir
					tmpObj.health = data[i + 5]
					if (!aiTypes[data[i + 1]].name) {
						tmpObj.name = config.cowNames[data[i + 6]]
					}
					tmpObj.forcePos = true
					tmpObj.sid = data[i]
					tmpObj.visible = true
				}
				i += 7
			}
		}
	}

	function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
		var tmpData = items.projectiles[indx]
		var tmpProj
		for (var i = 0; i < projectiles.length; ++i) {
			if (!projectiles[i].active) {
				tmpProj = projectiles[i]
				break
			}
		}
		if (!tmpProj) {
			tmpProj = new Projectile(sid)
			projectiles.push(tmpProj)
		}
		tmpProj.init(indx, x, y, dir, speed, tmpData.dmg, range, tmpData.scale)
		tmpProj.ignoreObj = null
		tmpProj.layer = layer || tmpData.layer
		tmpProj.src = tmpData.src
	}

	function remProjectile(sid, range) {
		for (var i = 0; i < projectiles.length; ++i) {
			if (projectiles[i].sid == sid) {
				projectiles.splice(i--, 1)
			}
		}
	}

	function showText(x, y, value, type) {
		var tmpText
		for (var i = 0; i < texts.length; ++i) {
			if (!texts[i].life) {
				tmpText = texts[i]
				break
			}
		}
		if (!tmpText) {
			tmpText = new Text()
			texts.push(tmpText)
		}
		tmpText.init(x, y, 50, 0.18, 500, Math.abs(value), value >= 0 ? "#fff" : "#8ecc51")
	}

	function updateLeaderboard(data) {
		leaderboardData = data
	}

	function changeLockDir(lock) {
		lockDir = lock
	}

	function changeCanvasMouse(type, value) {
		canvasMouse[type] = value
	}

	function changeMouse(type, value) {
		mouse[type] = value
	}

	var lastDir
	function getAttackDir() {
		let returnValue
		if (!player) {
			returnValue = 0
		} else {
			if (!lockDir) {
				lastDir = Math.atan2(canvasMouse.y - screenHeight / 2, canvasMouse.x - screenWidth / 2)
			}
			returnValue = UTILS.fixTo(lastDir || 0, 2)
		}
		return returnValue
	}

	function markMap(x, y) {
		if (!player.mapMarker) {
			player.mapMarker = {}
		}
		player.mapMarker.x = x
		player.mapMarker.y = y
	}

	function pingMap(x, y) {
		for (var i = 0; i < mapPings.length; ++i) {
			if (!mapPings[i].active) {
				tmpPing = mapPings[i]
				break
			}
		}
		if (!tmpPing) {
			tmpPing = new MapPing()
			mapPings.push(tmpPing)
		}
		tmpPing.init(x, y)
	}

	function updateMinimap(data) {
		minimapData = data
	}

	function updateStore(storeIndex, storeArray, elementsLength, currentScrollPos) {
		storeData = [storeIndex, storeArray, elementsLength, currentScrollPos]
		renderStore()
	}

	function updatePosition(data) {
		updatePositionData = data
	}

	function updateAlliance(team, allianceArray, elementsLength, currentScrollPos) {
		allianceData = [team, allianceArray, elementsLength, currentScrollPos]
		renderAlliance()
	}

	function changeVisibility(id, value) {
		visibility[id] = value
	}

	function changeInputText(id, value) {
		inputText[id] = value
		if (id === "allianceInput") {
			renderAlliance()
		} else if (id === "chatBox") {
			renderChatBox()
		}
	}

	function changeInputScroll(value) {
		chatBoxLeft = value
		renderChatBox()
	}

	function showItemInfo(data) {
		itemInfoData = data
		renderDescription()
	}

	function notificationName(name) {
		allianceNotificationName = name
	}

	function hoverChange(type, id) {
		const renderLater = hoverData[0]
		hoverData = [type, id]
		if (type === "storeItem" || type === "storeTab") {
			renderStore()
		} else if (type === "allianceItem" || type === "allianceButtonM") {
			renderAlliance()
		} else if (type === "upgradeBarItem") {
			renderUpgradeBar()
		} else if (type === "actionBarItem") {
			renderActionBar()
		}
		if (renderLater === "storeItem" || renderLater === "storeTab") {
			renderStore()
		} else if (renderLater === "allianceItem" || renderLater === "allianceButtonM") {
			renderAlliance()
		} else if (renderLater === "upgradeBarItem") {
			renderUpgradeBar()
		} else if (renderLater === "actionBarItem") {
			renderActionBar()
		}
	}

	function disconnectEvent() {
		inGame = false
		disconnect = true
	}

	const events = {
		1: setupGame,
		2: addPlayer,
		4: removePlayer,
		33: updatePlayers,
		9: updatePlayerValue,
		ch: receiveChat,
		14: updateItemCounts,
		15: updateAge,
		16: updateUpgrades,
		17: updateItems,
		st: setPlayerTeam,
		us: updateStoreItems,
		6: loadGameObject,
		11: killPlayer,
		12: killObject,
		13: killObjects,
		h: updateHealth,
		7: gatherAnimation,
		8: wiggleGameObject,
		sp: shootTurret,
		a: loadAI,
		aa: animateAI,
		18: addProjectile,
		19: remProjectile,
		t: showText,
		5: updateLeaderboard,
		lockDir: changeLockDir,
		changeCanvasMouse: changeCanvasMouse,
		changeMouse: changeMouse,
		markMap: markMap,
		p: pingMap,
		mm: updateMinimap,
		updateStore: updateStore,
		updateAlliance: updateAlliance,
		changeVisibility: changeVisibility,
		changeInputText: changeInputText,
		changeInputScroll: changeInputScroll,
		showItemInfo: showItemInfo,
		notificationName: notificationName,
		hoverChange: hoverChange,
		disconnectEvent: disconnectEvent,
		updatePosition: updatePosition
	}

	let maxScreenWidth = 1920,
		maxScreenHeight = 1080,
		now,
		delta,
		lastUpdate = 0,
		camX,
		camY,
		xOffset,
		yOffset,
		waterMult = 1,
		waterPlus = 0,
		leaderboardData = [],
		fontHeight = {},
		itemInfoData = {},
		allianceNotificationName,
		hoverData = ["none"],
		allianceData = [],
		storeData = [],
		updatePositionData = [null, null, null, null],
		visibility,
		inputText,
		chatBoxLeft,
		chatBoxWidth

	async function updateGame(time, render) {
		elementContext.clearRect(0, 0, screenWidth, screenHeight)
		now = time
		delta = now - lastUpdate

		for (let n = tmpSTARTDATA.counter; n < count; n++) {
			const element = datas[n]

			let wannaReturn = true
			if (time === 0 && element[0] === 0) {
				wannaReturn = false
			} else if (lastUpdate < element[0] && element[0] <= now) {
				wannaReturn = false
			}
			if (wannaReturn) {
				break
			}

			const { type, data } = element[1]
			if (events[type] != null) {
				if (type === "a" || type === "33") {
					events[type](...data, element[0])
				} else {
					events[type](...data)
				}
			}
			tmpSTARTDATA.counter++
		}
		lastUpdate = now

		moveCamera()

		// INTERPOLATE PLAYERS AND AI:
		var lastTime = now - 1000 / config.serverUpdateRate
		var tmpDiff
		for (let i = 0; i < players.length + ais.length; ++i) {
			tmpObj = players[i] || ais[i - players.length]
			if (tmpObj && tmpObj.visible) {
				if (tmpObj.forcePos) {
					tmpObj.x = tmpObj.x2
					tmpObj.y = tmpObj.y2
					tmpObj.dir = tmpObj.d2
				} else {
					var total = tmpObj.t2 - tmpObj.t1
					var fraction = lastTime - tmpObj.t1
					var ratio = fraction / total
					var rate = 170
					tmpObj.dt += delta
					var tmpRate = Math.min(1.7, tmpObj.dt / rate)
					tmpDiff = tmpObj.x2 - tmpObj.x1
					tmpObj.x = tmpObj.x1 + tmpDiff * tmpRate
					tmpDiff = tmpObj.y2 - tmpObj.y1
					tmpObj.y = tmpObj.y1 + tmpDiff * tmpRate
					tmpObj.dir = lerpAngle(tmpObj.d2, tmpObj.d1, Math.min(1.2, ratio))
				}
			}
		}

		// RENDER CORDS:
		xOffset = camX - maxScreenWidth / 2
		yOffset = camY - maxScreenHeight / 2

		// RENDER BACKGROUND:
		if (render) {
			renderBackground()
		}

		// RENDER WATER AREAS:
		renderWaterAreas(render)

		// RENDER GRID:
		if (render) {
			drawGameGrids()
		}

		// RENDER BOTTOM LAYER:
		gameContext.globalAlpha = 1
		gameContext.strokeStyle = outlineColor
		renderGameObjects(-1, render)

		// RENDER PROJECTILES:
		gameContext.globalAlpha = 1
		gameContext.lineWidth = outlineWidth
		renderProjectiles(0, render)

		// RENDER PLAYERS:
		renderPlayers(0, render)

		// RENDER AI:
		drawAI(render)

		// RENDER GAME OBJECTS (LAYERED):
		renderGameObjects(0, render)
		renderProjectiles(1, render)
		renderGameObjects(1, render)
		renderPlayers(1, render)
		renderGameObjects(2, render)
		renderGameObjects(3, render)

		// MAP BOUNDARIES:
		if (render) {
			renderMapBoundaries()
		}

		// RENDER DAY/NIGHT TIME:
		if (render) {
			drawDayNight()
		}

		// RENDER PLAYER AND AI UI:
		if (render) {
			gameContext.strokeStyle = darkOutlineColor
			for (let i = 0; i < players.length + ais.length; ++i) {
				tmpObj = players[i] || ais[i - players.length]
				if (tmpObj.visible && (tmpObj.skinIndex != 10 || tmpObj.sid === player.sid || (tmpObj.team && tmpObj.team == player.team))) {
					drawNamesAndIcons(tmpObj)
					drawBars(tmpObj)
				}
			}
		}

		// RENDER ANIM TEXTS:
		gameContext.textBaseline = "middle"
		gameContext.textAlign = "center"
		for (var i = 0; i < texts.length; ++i) {
			if (texts[i].life) {
				texts[i].update(delta)
				if (render) {
					texts[i].render(gameContext, xOffset, yOffset)
				}
			}
		}

		// RENDER CHAT MESSAGES:
		renderChatMessages(render)

		elementContext.textBaseline = "bottom"
		if (inGame) {
			if (render) {
				if (element.RESOURCES) renderResources()
				if (element.TOPINFOHOLDER) renderTopInfoHolder()
				if (element.MINIMAP) renderMinimap()
				if (element.AGEBAR) renderAge()

				if (Object.keys(itemInfoData).length && element.DESCRIPTION) {
					elementContext.drawImage(descriptionCanvas, 20, 20)
				}

				if (visibility.allianceMenu && element.CLAN) {
					elementContext.drawImage(allianceCanvas, screenWidth / 2 - allianceWidth / 2, screenHeight / 2 - allianceHeight / 2)
				}

				if (visibility.chatHolder && element.CHATBOX) {
					elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
					elementContext.beginPath()
					elementContext.roundRect(
						screenWidth / 2 - (6 + chatBoxWidth + 6) / 2,
						screenHeight - 200 - (6 + fontHeight[20] + 6),
						6 + chatBoxWidth + 6,
						6 + fontHeight[20] + 6,
						4
					)
					elementContext.fill()

					elementContext.drawImage(chatBoxCanvas, screenWidth / 2 - chatBoxWidth / 2, screenHeight - 200 - (fontHeight[20] + 6))
				}

				if (visibility.upgradeHolder && player.upgradePoints > 0 && element.UPGRADEITEM) {
					elementContext.drawImage(
						upgradeBarCanvas,
						!updatePositionData[2] ? screenWidth / 2 - upgradeBarWidth / 2 : parseFloat(updatePositionData[2]) + 10 - upgradeBarWidth / 2,
						!updatePositionData[3] ? 10 : parseFloat(updatePositionData[3])
					)
					elementContext.font = "24px Hammersmith One"
					elementContext.textAlign = "center"
					elementContext.fillStyle = "#fff"
					elementContext.fillText(`SELECT ITEMS (${player.upgradePoints})`, screenWidth / 2, 95 + fontHeight[24])
				}

				if (visibility.storeMenu && element.SHOP) {
					elementContext.drawImage(
						storeCanvas,
						!updatePositionData[0] ? screenWidth / 2 - storeWidth / 2 : parseFloat(updatePositionData[0]),
						!updatePositionData[1] ? screenHeight / 2 - storeHeight / 2 : parseFloat(updatePositionData[1])
					)
				}

				if (visibility.noticationDisplay && allianceNotificationName && element.CLANNOTIFICATION) {
					elementContext.fillStyle = hoverData[0] === "notifButton" && hoverData[1] === "rgb(142, 204, 81)" ? "rgba(50, 50, 50, 0.25)" : "rgba(0, 0, 0, 0.25)"
					elementContext.beginPath()
					elementContext.roundRect(screenWidth - 270 - 38, 80, 38, 38, 4)
					elementContext.fill()
					elementContext.fillStyle = hoverData[0] === "notifButton" && hoverData[1] === "rgb(204, 81, 81)" ? "rgba(50, 50, 50, 0.25)" : "rgba(0, 0, 0, 0.25)"
					elementContext.beginPath()
					elementContext.roundRect(screenWidth - 270 - 38 - 10 - 38, 80, 38, 38, 4)
					elementContext.fill()

					elementContext.drawImage(iconSprites["allow"], screenWidth - 270 - 5 - 28, 80 + 5, 28, 28)
					elementContext.drawImage(iconSprites["deny"], screenWidth - 270 - 38 - 10 - 5 - 28, 80 + 5, 28, 28)
					elementContext.font = "25px Hammersmith One"
					elementContext.textAlign = "right"
					elementContext.fillStyle = "#fff"
					elementContext.fillText(allianceNotificationName, screenWidth - 270 - 38 - 38 - 10 - 10, 80 + fontHeight[25])
				}

				if (element.SELECTITEM) elementContext.drawImage(actionBarCanvas, screenWidth / 2 - actionBarWidth / 2, screenHeight - (actionBarHeight + 20))
				if (element.GAMEBUTTON) renderGameButtons()
			}
		} else {
			if (!disconnect && deathTime == null) {
				deathTime = time
			} else if ((disconnect || time - deathTime > config.deathFadeout) && render) {
				elementContext.fillStyle = "rgba(0, 0, 0, 0.5)"
				elementContext.fillRect(0, 0, screenWidth, screenHeight)
			}
			if (!disconnect && time - deathTime < config.deathFadeout && render) {
				elementContext.font = `${Math.min(Math.round(deathTextScale), 120)}px Hammersmith One`
				elementContext.textBaseline = "bottom"
				elementContext.textAlign = "center"
				const metrics = elementContext.measureText("YOU DIED")
				elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
				elementContext.fillRect(
					0,
					screenHeight / 2 - (metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent) / 2,
					screenWidth,
					metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
				)
				elementContext.fillStyle = "#fff"
				elementContext.fillText("YOU DIED", screenWidth / 2, screenHeight / 2 + metrics.fontBoundingBoxAscent / 2)
			}
		}

		if (deathTextScale < 120) {
			deathTextScale += 0.1 * delta
		}

		if (disconnect && render) {
			elementContext.drawImage(disconnectCanvas, 0, screenHeight * 0.45 - disconnectHeight / 2)
		}

		if (element.CURSORSIZE != 0 && render) {
			elementContext.drawImage(
				cursorSprites[hoverData[0] === "none" ? "normal" : hoverData[0] === "inputText" ? "text" : "pointer"],
				mouse.x,
				mouse.y,
				element.CURSORSIZE,
				element.CURSORSIZE
			)
		}

		if (!render) return
		mainContext.drawImage(gameCanvas, 0, 0)
		mainContext.drawImage(elementCanvas, 0, 0)
	}

	function renderAge() {
		// AGE BAR CONTAINER
		elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		elementContext.beginPath()
		elementContext.roundRect(screenWidth / 2 - (5 + 314 + 5) / 2, screenHeight - 96 - 20, 5 + 314 + 5, 20, 5)
		elementContext.fill()

		// AGE TEXT
		elementContext.font = "24px Hammersmith One"
		elementContext.fillStyle = "#fff"
		elementContext.textAlign = "center"
		elementContext.fillText(player.age === config.maxAge ? "MAX AGE" : `AGE ${player.age}`, screenWidth / 2, screenHeight - 118)

		// AGE BAR BODY
		if (player.XP === 0) return
		elementContext.beginPath()
		elementContext.roundRect(
			screenWidth / 2 - 314 / 2,
			screenHeight - 96 - 15,
			player.age === config.maxAge ? 314 : (player.XP / player.maxXP) * 314,
			10,
			3
		)
		elementContext.fill()
	}

	function renderGameButtons() {
		const array = [
			{ sprite: "tribe", right: 270, id: "allianceButton" },
			{ sprite: "store", right: 330, id: "customStoreButton" },
			{ sprite: "chat", right: 390, id: "chatButton" }
		]

		elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			if (hoverData[0] === "gameButton" && hoverData[1] === element.id) {
				elementContext.fillStyle = "rgba(50, 50, 50, 0.25)"
			}
			elementContext.beginPath()
			elementContext.roundRect(screenWidth - element.right - 50, 20, 50, 50, 4)
			elementContext.fill()
			if (hoverData[0] === "gameButton" && hoverData[1] === element.id) {
				elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
			}
			elementContext.drawImage(iconSprites[element.sprite], screenWidth - element.right - 40 - 5, 20 + 5, 40, 40)
		}
	}

	function renderResources() {
		elementContext.font = "28px Hammersmith One"
		elementContext.textAlign = "right"
		const array = [
			{ type: "food", sprite: "food_ico", bottom: 130 },
			{ type: "wood", sprite: "wood_ico", bottom: 75 },
			{ type: "stone", sprite: "stone_ico", bottom: 20 },
			{ type: "points", sprite: "gold_ico", bottom: 160 }
		]

		// Render Transparent Box
		elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			const measuredText = elementContext.measureText(player[element.type])
			elementContext.beginPath()
			elementContext.roundRect(
				element.type === "points" ? 20 : screenWidth - 40 - 20 - measuredText.width - 10,
				screenHeight - 45 - element.bottom,
				10 + measuredText.width + 40,
				45,
				4
			)
			elementContext.fill()
		}

		// Render Text
		elementContext.fillStyle = "#fff"
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			if (element.type === "points") {
				elementContext.textAlign = "left"
			}

			elementContext.fillText(player[element.type], element.type === "points" ? 20 + 40 : screenWidth - 40 - 20, screenHeight - element.bottom - 5)
		}

		// Render Icon
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			elementContext.drawImage(
				resourcesSprites[element.sprite],
				element.type === "points" ? 20 + 6 : screenWidth - 6 - 28 - 20,
				screenHeight - 5 - element.bottom - 28 - (35 - 28) / 2,
				28,
				28
			)
		}
	}

	function renderTopInfoHolder() {
		function fittingString(str, maxWidth = 140) {
			var width = elementContext.measureText(str).width
			var ellipsis = "..."
			var ellipsisWidth = elementContext.measureText(ellipsis).width
			if (width <= maxWidth || width <= ellipsisWidth) {
				return str
			} else {
				var len = str.length
				while (width >= maxWidth - ellipsisWidth && len-- > 0) {
					str = str.substring(0, len)
					width = elementContext.measureText(str).width
				}

				return str.slice(0, -1) + ellipsis
			}
		}

		var tmpC = 1,
			measuredHeight = fontHeight[31]
		elementContext.font = "22px Hammersmith One"
		const array = []
		for (let i = 0; i < leaderboardData.length; i += 3) {
			const name = fittingString(`${tmpC}. ${leaderboardData[i + 1] != "" ? leaderboardData[i + 1] : "unknown"}`)
			const score = UTILS.kFormat(leaderboardData[i + 2]) || "0"
			const line = elementContext.measureText(name).width + elementContext.measureText(score).width > 220 ? 2 : 1
			array.push({
				name,
				score,
				line,
				color: leaderboardData[i] == playerSID ? "#fff" : "rgba(255,255,255,0.6)"
			})
			measuredHeight += fontHeight[22] * line
			tmpC++
		}

		elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		elementContext.beginPath()
		elementContext.roundRect(screenWidth - 10 - 220 - 10 - 20, 20, 10 + 220 + 10, 7 + measuredHeight + 5, 4)
		elementContext.fill()

		elementContext.font = "28px Hammersmith One"
		elementContext.textAlign = "right"
		const measuredText = elementContext.measureText(player.kills)
		elementContext.beginPath()
		elementContext.roundRect(screenWidth - 40 - 20 - measuredText.width - 10, 20 + 7 + measuredHeight + 5 + 10, 10 + measuredText.width + 40, 45, 4)
		elementContext.fill()
		elementContext.fillStyle = "#fff"
		elementContext.fillText(player.kills, screenWidth - 40 - 20, 20 + 7 + measuredHeight + 5 + 10 + (45 - 5))
		elementContext.drawImage(iconSprites["skull"], screenWidth - 6 - 28 - 20, 20 + 7 + measuredHeight + 5 + 10 + (45 - 28) / 2, 28, 28)

		elementContext.font = "31px Hammersmith One"
		elementContext.textAlign = "left"
		elementContext.fillText("Leaderboard", screenWidth - 220 - 10 - 20, 20 + 7 + fontHeight[31])

		elementContext.font = "22px Hammersmith One"
		measuredHeight = fontHeight[31] + 20 + 7 + fontHeight[22]
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			elementContext.fillStyle = element.color
			elementContext.fillText(element.name, screenWidth - 220 - 10 - 20, measuredHeight)
			measuredHeight += fontHeight[22] * element.line
		}

		elementContext.textAlign = "right"
		elementContext.fillStyle = "#fff"
		measuredHeight = fontHeight[31] + 20 + 7 + fontHeight[22]
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			elementContext.fillText(element.score, screenWidth - 10 - 20, measuredHeight + fontHeight[22] * (element.line - 1))
			measuredHeight += fontHeight[22] * element.line
		}
	}

	function renderMinimap() {
		mapContext.clearRect(0, 0, 300, 300)

		// RENDER PINGS:
		mapContext.strokeStyle = "#fff"
		mapContext.lineWidth = 4
		for (let i = 0; i < mapPings.length; ++i) {
			tmpPing = mapPings[i]
			tmpPing.update(mapContext, delta)
		}

		// RENDER PLAYERS:
		mapContext.globalAlpha = 1
		mapContext.fillStyle = "#fff"
		renderCircle((player.x / config.mapScale) * 300, (player.y / config.mapScale) * 300, 7, mapContext, true)
		mapContext.fillStyle = "rgba(255,255,255,0.35)"
		if (player.team && minimapData) {
			for (let i = 0; i < minimapData.length; ) {
				renderCircle((minimapData[i] / config.mapScale) * 300, (minimapData[i + 1] / config.mapScale) * 300, 7, mapContext, true)
				i += 2
			}
		}

		// DEATH LOCATION:
		if (player.lastDeath) {
			mapContext.fillStyle = "#fc5553"
			mapContext.font = "34px Hammersmith One"
			mapContext.textBaseline = "middle"
			mapContext.textAlign = "center"
			mapContext.fillText("x", (player.lastDeath.x / config.mapScale) * 300, (player.lastDeath.y / config.mapScale) * 300)
		}

		// MAP MARKER:
		if (player.mapMarker) {
			mapContext.fillStyle = "#fff"
			mapContext.font = "34px Hammersmith One"
			mapContext.textBaseline = "middle"
			mapContext.textAlign = "center"
			mapContext.fillText("x", (player.mapMarker.x / config.mapScale) * 300, (player.mapMarker.y / config.mapScale) * 300)
		}

		elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		elementContext.beginPath()
		elementContext.roundRect(20, screenHeight - 130 - 20, 130, 130, 4)
		elementContext.fill()
		elementContext.drawImage(mapCanvas, 20, screenHeight - 130 - 20, 130, 130)
	}

	function moveCamera() {
		if (player) {
			var tmpDist = UTILS.getDistance(camX, camY, player.x, player.y)
			var tmpDir = UTILS.getDirection(player.x, player.y, camX, camY)
			var camSpd = Math.min(tmpDist * 0.01 * delta, tmpDist)
			if (tmpDist > 0.05) {
				camX += camSpd * Math.cos(tmpDir)
				camY += camSpd * Math.sin(tmpDir)
			} else {
				camX = player.x
				camY = player.y
			}
		} else {
			camX = config.mapScale / 2
			camY = config.mapScale / 2
		}
	}

	function renderBackground() {
		if (config.snowBiomeTop - yOffset <= 0 && config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight) {
			gameContext.fillStyle = "#b6db66"
			gameContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
		} else if (config.mapScale - config.snowBiomeTop - yOffset <= 0) {
			gameContext.fillStyle = "#dbc666"
			gameContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
		} else if (config.snowBiomeTop - yOffset >= maxScreenHeight) {
			gameContext.fillStyle = "#fff"
			gameContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
		} else if (config.snowBiomeTop - yOffset >= 0) {
			gameContext.fillStyle = "#fff"
			gameContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset)
			gameContext.fillStyle = "#b6db66"
			gameContext.fillRect(0, config.snowBiomeTop - yOffset, maxScreenWidth, maxScreenHeight - (config.snowBiomeTop - yOffset))
		} else {
			gameContext.fillStyle = "#b6db66"
			gameContext.fillRect(0, 0, maxScreenWidth, config.mapScale - config.snowBiomeTop - yOffset)
			gameContext.fillStyle = "#dbc666"
			gameContext.fillRect(
				0,
				config.mapScale - config.snowBiomeTop - yOffset,
				maxScreenWidth,
				maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset)
			)
		}
	}

	function renderWaterAreas(render) {
		function renderWaterBodies(ctxt, padding) {
			var tmpW = config.riverWidth + padding
			var tmpY = config.mapScale / 2 - yOffset - tmpW / 2
			if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
				ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW)
			}
		}

		waterMult += waterPlus * config.waveSpeed * delta
		if (waterMult >= config.waveMax) {
			waterMult = config.waveMax
			waterPlus = -1
		} else if (waterMult <= 1) {
			waterMult = waterPlus = 1
		}

		if (!render) return
		gameContext.globalAlpha = 1
		gameContext.fillStyle = "#dbc666"
		renderWaterBodies(gameContext, config.riverPadding)
		gameContext.fillStyle = "#91b2db"
		renderWaterBodies(gameContext, (waterMult - 1) * 250)
	}

	function drawGameGrids() {
		gameContext.lineWidth = 4
		gameContext.strokeStyle = "#000"
		gameContext.globalAlpha = 0.06
		gameContext.beginPath()
		for (var x = -camX; x < maxScreenWidth; x += maxScreenHeight / 18) {
			if (x > 0) {
				gameContext.moveTo(x, 0)
				gameContext.lineTo(x, maxScreenHeight)
			}
		}
		for (var y = -camY; y < maxScreenHeight; y += maxScreenHeight / 18) {
			if (x > 0) {
				gameContext.moveTo(0, y)
				gameContext.lineTo(maxScreenWidth, y)
			}
		}
		gameContext.stroke()
	}

	function renderGameObjects(layer, render) {
		var tmpSprite, tmpX, tmpY, tmpObj
		for (var i = 0; i < gameObjects.length; ++i) {
			tmpObj = gameObjects[i]
			tmpX = tmpObj.x + tmpObj.xWiggle - xOffset
			tmpY = tmpObj.y + tmpObj.yWiggle - yOffset
			if (layer == 0) {
				tmpObj.update(delta)
			}
			if (render && tmpObj.layer == layer && isOnScreen(tmpX, tmpY, tmpObj.scale + (tmpObj.blocker || 0))) {
				gameContext.globalAlpha = tmpObj.hideFromEnemy ? 0.6 : 1
				if (tmpObj.object_isItem) {
					tmpSprite = getItemSprite(tmpObj)
					gameContext.save()
					gameContext.translate(tmpX, tmpY)
					gameContext.rotate(tmpObj.dir)
					gameContext.drawImage(tmpSprite, -(tmpSprite.width / 2), -(tmpSprite.height / 2))
					if (tmpObj.blocker) {
						gameContext.strokeStyle = "#db6e6e"
						gameContext.globalAlpha = 0.3
						gameContext.lineWidth = 6
						renderCircle(0, 0, tmpObj.blocker, gameContext, false, true)
					}
					gameContext.restore()
				} else {
					tmpSprite = getResSprite(tmpObj)
					gameContext.drawImage(tmpSprite, tmpX - tmpSprite.width / 2, tmpY - tmpSprite.height / 2)
				}
			}
		}
	}

	// OBJECT ON SCREEN:
	function isOnScreen(x, y, s) {
		return x + s >= 0 && x - s <= maxScreenWidth && y + s >= 0 && y - s <= maxScreenHeight
	}

	// RENDER PROJECTILES:
	function renderProjectiles(layer, render) {
		for (var i = 0; i < projectiles.length; ++i) {
			tmpObj = projectiles[i]
			if (tmpObj.active && tmpObj.layer == layer) {
				tmpObj.update(delta)
				if (render && isOnScreen(tmpObj.x - xOffset, tmpObj.y - yOffset, tmpObj.scale)) {
					gameContext.save()
					gameContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset)
					gameContext.rotate(tmpObj.dir)
					renderProjectile(0, 0, tmpObj, gameContext, 1)
					gameContext.restore()
				}
			}
		}
	}

	// RENDER PROJECTILE:
	function renderProjectile(x, y, obj, ctxt) {
		if (obj.src) {
			var tmpSrc = items.projectiles[obj.indx].src
			var tmpSprite = projectileSprites[tmpSrc]
			ctxt.drawImage(tmpSprite, x - obj.scale / 2, y - obj.scale / 2, obj.scale, obj.scale)
		} else if (obj.indx == 1) {
			ctxt.fillStyle = "#939393"
			renderCircle(x, y, obj.scale, ctxt)
		}
	}

	// RENDER PLAYERS:
	function renderPlayers(zIndex, render) {
		gameContext.globalAlpha = 1
		for (var i = 0; i < players.length; ++i) {
			tmpObj = players[i]
			if (tmpObj.zIndex == zIndex) {
				tmpObj.animate(delta)
				if (tmpObj.visible) {
					tmpObj.skinRot += 0.002 * delta
					tmpDir = (tmpObj.sid === player.sid ? getAttackDir() : tmpObj.dir) + tmpObj.dirPlus

					if (render) {
						gameContext.save()
						gameContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset)

						// RENDER PLAYER:
						gameContext.rotate(tmpDir)
						renderPlayer(tmpObj, gameContext)
						gameContext.restore()
					}
				}
			}
		}
	}

	// RENDER PLAYER:
	function renderPlayer(obj, ctxt) {
		ctxt = ctxt || gameContext
		ctxt.lineWidth = outlineWidth
		ctxt.lineJoin = "miter"
		var handAngle = (Math.PI / 4) * (items.weapons[obj.weaponIndex].armS || 1)
		var oHandAngle = obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndS || 1 : 1
		var oHandDist = obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndD || 1 : 1
		// TAIL/CAPE:
		if (obj.tailIndex > 0) {
			renderTail(obj.tailIndex, ctxt, obj)
		}
		// WEAPON BELLOW HANDS:
		if (obj.buildIndex < 0 && !items.weapons[obj.weaponIndex].aboveHand) {
			renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt)
			if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
				renderProjectile(obj.scale, 0, items.projectiles[items.weapons[obj.weaponIndex].projectile], gameContext)
			}
		}
		// HANDS:
		ctxt.fillStyle = config.skinColors[obj.skinColor]
		renderCircle(obj.scale * Math.cos(handAngle), obj.scale * Math.sin(handAngle), 14)
		renderCircle(obj.scale * oHandDist * Math.cos(-handAngle * oHandAngle), obj.scale * oHandDist * Math.sin(-handAngle * oHandAngle), 14)
		// WEAPON ABOVE HANDS:
		if (obj.buildIndex < 0 && items.weapons[obj.weaponIndex].aboveHand) {
			renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt)
			if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
				renderProjectile(obj.scale, 0, items.projectiles[items.weapons[obj.weaponIndex].projectile], gameContext)
			}
		}
		// BUILD ITEM:
		if (obj.buildIndex >= 0) {
			var tmpSprite = getItemSprite(items.list[obj.buildIndex])
			ctxt.drawImage(tmpSprite, obj.scale - items.list[obj.buildIndex].holdOffset, -tmpSprite.width / 2)
		}
		// BODY:
		renderCircle(0, 0, obj.scale, ctxt)
		// SKIN:
		if (obj.skinIndex > 0) {
			ctxt.rotate(Math.PI / 2)
			renderSkin(obj.skinIndex, ctxt, null, obj)
		}
	}

	// RENDER SKINS:
	var skinPointers = {}
	var tmpSkin
	function renderSkin(index, ctxt, parentSkin, owner) {
		tmpSkin = skinSprites[index]
		var tmpObj = parentSkin || skinPointers[index]
		if (!tmpObj) {
			for (var i = 0; i < hats.length; ++i) {
				if (hats[i].id == index) {
					tmpObj = hats[i]
					break
				}
			}
			skinPointers[index] = tmpObj
		}
		ctxt.drawImage(tmpSkin, -tmpObj.scale / 2, -tmpObj.scale / 2, tmpObj.scale, tmpObj.scale)
		if (!parentSkin && tmpObj.topSprite) {
			ctxt.save()
			ctxt.rotate(owner.skinRot)
			renderSkin(index + "_top", ctxt, tmpObj, owner)
			ctxt.restore()
		}
	}

	// RENDER TAIL:
	var accessPointers = {}
	function renderTail(index, ctxt, owner) {
		tmpSkin = accessSprites[index]
		var tmpObj = accessPointers[index]
		if (!tmpObj) {
			for (var i = 0; i < accessories.length; ++i) {
				if (accessories[i].id == index) {
					tmpObj = accessories[i]
					break
				}
			}
			accessPointers[index] = tmpObj
		}
		ctxt.save()
		ctxt.translate(-20 - (tmpObj.xOff || 0), 0)
		if (tmpObj.spin) {
			ctxt.rotate(owner.skinRot)
		}
		ctxt.drawImage(tmpSkin, -(tmpObj.scale / 2), -(tmpObj.scale / 2), tmpObj.scale, tmpObj.scale)
		ctxt.restore()
	}

	// RENDER TOOL:
	function renderTool(obj, variant, x, y, ctxt) {
		var tmpSrc = obj.src + (variant || "")
		var tmpSprite = toolSprites[tmpSrc]
		ctxt.drawImage(tmpSprite, x + obj.xOff - obj.length / 2, y + obj.yOff - obj.width / 2, obj.length, obj.width)
	}

	// RENDER AI:
	function drawAI(render) {
		gameContext.globalAlpha = 1
		for (let i = 0; i < ais.length; ++i) {
			tmpObj = ais[i]
			if (tmpObj.visible) {
				tmpObj.animate(delta)
				if (render) {
					gameContext.save()
					gameContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset)
					gameContext.rotate(tmpObj.dir + tmpObj.dirPlus - Math.PI / 2)
					renderAI(tmpObj, gameContext)
					gameContext.restore()
				}
			}
		}
	}

	// RENDER AI:
	function renderAI(obj, ctxt) {
		var tmpSprite = aiSprites[obj.src]
		var tmpScale = obj.scale * 1.2 * (obj.spriteMlt || 1)
		ctxt.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale * 2, tmpScale * 2)
	}

	function renderMapBoundaries() {
		gameContext.fillStyle = "#000"
		gameContext.globalAlpha = 0.09
		if (xOffset <= 0) {
			gameContext.fillRect(0, 0, -xOffset, maxScreenHeight)
		}
		if (config.mapScale - xOffset <= maxScreenWidth) {
			var tmpY = Math.max(0, -yOffset)
			gameContext.fillRect(config.mapScale - xOffset, tmpY, maxScreenWidth - (config.mapScale - xOffset), maxScreenHeight - tmpY)
		}
		if (yOffset <= 0) {
			gameContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset)
		}
		if (config.mapScale - yOffset <= maxScreenHeight) {
			let tmpX = Math.max(0, -xOffset)
			var tmpMin = 0
			if (config.mapScale - xOffset <= maxScreenWidth) {
				tmpMin = maxScreenWidth - (config.mapScale - xOffset)
			}
			gameContext.fillRect(tmpX, config.mapScale - yOffset, maxScreenWidth - tmpX - tmpMin, maxScreenHeight - (config.mapScale - yOffset))
		}
	}

	function drawDayNight() {
		gameContext.globalAlpha = 1
		gameContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		gameContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
	}

	function drawNamesAndIcons(tmpObj) {
		var tmpText = (tmpObj.team ? "[" + tmpObj.team.replaceAll("\u0000", "") + "] " : "") + (tmpObj.name || "")
		if (tmpText != "") {
			gameContext.font = (tmpObj.nameScale || 30) + "px Hammersmith One"
			gameContext.fillStyle = "#fff"
			gameContext.textBaseline = "middle"
			gameContext.textAlign = "center"
			gameContext.lineWidth = tmpObj.nameScale ? 11 : 8
			gameContext.lineJoin = "round"
			gameContext.strokeText(tmpText, tmpObj.x - xOffset, tmpObj.y - yOffset - tmpObj.scale - config.nameY)
			gameContext.fillText(tmpText, tmpObj.x - xOffset, tmpObj.y - yOffset - tmpObj.scale - config.nameY)
			if (tmpObj.isLeader) {
				let tmpS = config.crownIconScale
				let tmpX = tmpObj.x - xOffset - tmpS / 2 - gameContext.measureText(tmpText).width / 2 - config.crownPad
				gameContext.drawImage(iconSprites.crown, tmpX, tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5, tmpS, tmpS)
			}
			if (tmpObj.iconIndex == 1) {
				let tmpS = config.crownIconScale
				let tmpX = tmpObj.x - xOffset - tmpS / 2 + gameContext.measureText(tmpText).width / 2 + config.crownPad
				gameContext.drawImage(iconSprites.skull, tmpX, tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5, tmpS, tmpS)
			}
		}
	}

	function drawBars(tmpObj) {
		// REOUNDED RECTANGLE:
		function roundRect(x, y, w, h, r, ctx) {
			if (w < 2 * r) r = w / 2
			if (h < 2 * r) r = h / 2
			if (r < 0) {
				r = 0
			}
			ctx.beginPath()
			ctx.moveTo(x + r, y)
			ctx.arcTo(x + w, y, x + w, y + h, r)
			ctx.arcTo(x + w, y + h, x, y + h, r)
			ctx.arcTo(x, y + h, x, y, r)
			ctx.arcTo(x, y, x + w, y, r)
			ctx.closePath()
		}

		if (tmpObj.health > 0) {
			roundRect(
				tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad,
				tmpObj.y - yOffset + tmpObj.scale + config.nameY,
				config.healthBarWidth * 2 + config.healthBarPad * 2,
				17,
				8,
				gameContext
			)
			gameContext.fillStyle = darkOutlineColor
			gameContext.fill()
			roundRect(
				tmpObj.x - xOffset - config.healthBarWidth,
				tmpObj.y - yOffset + tmpObj.scale + config.nameY + config.healthBarPad,
				config.healthBarWidth * 2 * (tmpObj.health / tmpObj.maxHealth),
				17 - config.healthBarPad * 2,
				7,
				gameContext
			)
			gameContext.fillStyle = tmpObj == player || (tmpObj.team && tmpObj.team == player.team) ? "#8ecc51" : "#cc5151"
			gameContext.fill()
		}
	}

	function renderChatMessages(render) {
		for (let i = 0; i < players.length; ++i) {
			tmpObj = players[i]
			if (tmpObj.visible && tmpObj.chatCountdown > 0) {
				tmpObj.chatCountdown -= delta
				if (tmpObj.chatCountdown <= 0) {
					tmpObj.chatCountdown = 0
				}
				if (render) {
					gameContext.font = "32px Hammersmith One"
					var tmpSize = gameContext.measureText(tmpObj.chatMessage)
					gameContext.textBaseline = "middle"
					gameContext.textAlign = "center"
					let tmpX = tmpObj.x - xOffset
					let tmpY = tmpObj.y - tmpObj.scale - yOffset - 90
					var tmpH = 47
					var tmpW = tmpSize.width + 17

					gameContext.beginPath()
					gameContext.roundRect(tmpX - tmpW / 2, tmpY - tmpH / 2, tmpW, tmpH, 6)
					gameContext.fillStyle = "rgba(0,0,0,0.2)"
					gameContext.fill()
					gameContext.fillStyle = "#fff"
					gameContext.fillText(tmpObj.chatMessage, tmpX, tmpY)
				}
			}
		}
	}

	function renderStore() {
		if (storeData.length <= 0) return
		storeContext.clearRect(0, 0, storeWidth, storeHeight)

		storeContext.fillStyle = hoverData[0] === "storeTab" && hoverData[1] === "Hats" ? "rgba(50, 50, 50, 0.25)" : "rgba(0, 0, 0, 0.25)"
		storeContext.beginPath()
		storeContext.roundRect(0, 0, 183 + 10 + 10, 10 + fontHeight[26] + 10, 4)
		storeContext.fill()
		storeContext.fillStyle = hoverData[0] === "storeTab" && hoverData[1] === "Accessories" ? "rgba(50, 50, 50, 0.25)" : "rgba(0, 0, 0, 0.25)"
		storeContext.beginPath()
		storeContext.roundRect(storeWidth - (183 + 10 + 10), 0, 183 + 10 + 10, 10 + fontHeight[26] + 10, 4)
		storeContext.fill()
		storeContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		storeContext.beginPath()
		storeContext.roundRect(0, 10 + fontHeight[26] + 10 + 15, storeWidth, storeHeight - (10 + fontHeight[26] + 10 + 15), 4)
		storeContext.fill()

		storeContext.font = "26px Hammersmith One"
		storeContext.fillStyle = "#fff"
		storeContext.textBaseline = "bottom"
		storeContext.textAlign = "center"
		storeContext.fillText("Hats", (183 + 10 + 10) / 2, 10 + fontHeight[26])
		storeContext.fillText("Accessories", storeWidth - (183 + 10 + 10) / 2, 10 + fontHeight[26])

		storeContext.font = "24px Hammersmith One"
		const upperHeight = 10 + fontHeight[26] + 10 + 15 + 10
		const storeArray = storeData[0] ? accessories : hats
		const storePointer = storeData[0] ? accessPointers : skinPointers
		const storeSprites = storeData[0] ? accessSprites : skinSprites
		const storePlayer = storeData[0] ? player.tails : player.skins
		const storePlayerIndex = storeData[0] ? player.tailIndex : player.skinIndex
		for (let i = 0; i < 4; i++) {
			const index = storeData[1][i]
			if (index === "blank") continue

			let element = storePointer[index]
			if (!element) {
				for (let j = 0; j < storeArray.length; ++j) {
					if (storeArray[j].id == index) {
						element = storeArray[j]
						break
					}
				}
				skinPointers[index] = element
			}
			if (element == null) continue

			storeContext.drawImage(storeSprites[index + (element.topSprite ? "_p" : "")], 10 + 5, upperHeight + 50 * i, 45, 45)

			storeContext.textAlign = "left"
			storeContext.fillStyle = "#fff"
			storeContext.fillText(element.name, 10 + 5 + 45 + 10, upperHeight + 50 - 10 + 50 * i)

			storeContext.textAlign = "right"
			storeContext.fillStyle = hoverData[0] === "storeItem" && hoverData[1] === "storeDisplay" + index ? "#72d3e0" : "#80eefc"
			if (!storePlayer[index]) {
				storeContext.fillText("Buy", storeWidth - 5 - 10, upperHeight + 50 - 10 + 50 * i)
				storeContext.fillStyle = "rgba(255,255,255,0.5)"
				storeContext.fillText(element.price, storeWidth - 5 - 10 - storeContext.measureText("Buy").width - 5, upperHeight + 50 - 10 + 50 * i)
			} else if (storePlayerIndex === index) {
				storeContext.fillText("Unequip", storeWidth - 5 - 10, upperHeight + 50 - 10 + 50 * i)
			} else {
				storeContext.fillText("Equip", storeWidth - 5 - 10, upperHeight + 50 - 10 + 50 * i)
			}
		}

		if (storeData[2] != null && storeData[2] >= 4) {
			const elementHeight = 220 / storeData[2]
			storeContext.beginPath()
			storeContext.roundRect(storeWidth - 3, 10 + fontHeight[26] + 10 + 15 + elementHeight * storeData[3], 3, elementHeight * 4, 10)
			storeContext.fillStyle = "#fff"
			storeContext.fill()
		}
	}

	function renderAlliance() {
		if (allianceData.length <= 0) return
		allianceContext.clearRect(0, 0, allianceWidth, allianceHeight)

		allianceContext.font = "24px Hammersmith One"
		allianceContext.textAlign = "center"
		allianceContext.textBaseline = "bottom"
		allianceContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		allianceContext.beginPath()
		allianceContext.roundRect(0, 0, 10 + 350 + 10, 10 + 200 + 10, 4)
		allianceContext.fill()
		if (allianceData[0]) {
			if (hoverData[0] === "allianceButtonM") {
				allianceContext.fillStyle = "rgba(50, 50, 50, 0.25)"
			}
			allianceContext.beginPath()
			allianceContext.roundRect(0, 10 + 200 + 10 + 10, 5 + 360 + 5, 5 + fontHeight[24] + 5, 4)
			allianceContext.fill()
			allianceContext.fillStyle = "#fff"
			allianceContext.fillText(player.isOwner ? "Delete Tribe" : "Leave Tribe", allianceWidth / 2, 10 + 200 + 10 + 10 + 5 + fontHeight[24])
		} else {
			allianceContext.beginPath()
			allianceContext.roundRect(0, 10 + 200 + 10 + 10, 5 + 200 + 5, 5 + fontHeight[24] + 5, 4)
			allianceContext.fill()
			if (hoverData[0] === "allianceButtonM") {
				allianceContext.fillStyle = "rgba(50, 50, 50, 0.25)"
			}
			allianceContext.beginPath()
			allianceContext.roundRect(5 + 200 + 5 + 10, 10 + 200 + 10 + 10, 5 + 140 + 5, 5 + fontHeight[24] + 5, 4)
			allianceContext.fill()
			allianceContext.fillStyle = "#fff"
			allianceContext.fillText("Create", 5 + 200 + 5 + 10 + (5 + 140 + 5) / 2, 10 + 200 + 10 + 10 + 5 + fontHeight[24])
			allianceContext.fillStyle = inputText.allianceInput == "" ? "#cecece" : "#fff"
			allianceContext.textAlign = "left"
			allianceContext.fillText(inputText.allianceInput == "" ? "unique name" : inputText.allianceInput, 5, 10 + 200 + 10 + 10 + 5 + fontHeight[24])
		}

		if (allianceData[1].length <= 0) {
			allianceContext.fillStyle = "#fff"
			allianceContext.textAlign = "left"
			allianceContext.fillText("No Tribes Yet", 10 + 5, 10 + 40 - 5)
		}

		for (let i = 0; i < 5; i++) {
			if (allianceData[1][i] == null) continue
			if (allianceData[0]) {
				allianceContext.fillStyle = allianceData[1][i].sid === playerSID ? "#fff" : "rgba(255,255,255,0.6)"
				allianceContext.textAlign = "left"
				allianceContext.fillText(allianceData[1][i].text, 10 + 5, 10 + 40 - 5 + 40 * i)
				if (player.isOwner && allianceData[1][i].sid !== playerSID) {
					allianceContext.fillStyle = hoverData[0] === "allianceItem" && hoverData[1] === "allianceItem" + allianceData[1][i].sid ? "#72d3e0" : "#80eefc"
					allianceContext.textAlign = "right"
					allianceContext.fillText("Kick", allianceWidth - 10 - 5, 10 + 40 - 5 + 40 * i)
				}
			} else {
				allianceContext.fillStyle = "rgba(255,255,255,0.6)"
				allianceContext.textAlign = "left"
				allianceContext.fillText(allianceData[1][i].text.sid, 10 + 5, 10 + 40 - 5 + 40 * i)
				allianceContext.fillStyle = hoverData[0] === "allianceItem" && hoverData[1] === "allianceItem" + allianceData[1][i].text.owner ? "#72d3e0" : "#80eefc"
				allianceContext.textAlign = "right"
				allianceContext.fillText("Join", allianceWidth - 10 - 5, 10 + 40 - 5 + 40 * i)
			}
		}
	}

	function renderActionBar() {
		actionBarWidth = (player.items.length + player.weapons.length) * (5 + 66 + 5)
		actionBarHeight = 66
		resizeCanvas(actionBarCanvas, actionBarWidth, actionBarHeight)

		let tmpLength = 0
		actionBarContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		for (let i = 0; i < items.weapons.length; i++) {
			const element = items.weapons[i]
			if (player.weapons[element.type] === element.id) {
				tmpLength += 5
				if (hoverData[0] === "actionBarItem" && hoverData[1] === "actionBarItem" + i) {
					actionBarContext.fillStyle = "rgba(50, 50, 50, 0.25)"
				}
				actionBarContext.beginPath()
				actionBarContext.roundRect(tmpLength, 0, 66, 66, 4)
				actionBarContext.fill()
				if (hoverData[0] === "actionBarItem" && hoverData[1] === "actionBarItem" + i) {
					actionBarContext.fillStyle = "rgba(0, 0, 0, 0.25)"
				}
				actionBarContext.drawImage(actionBarSprites[i], tmpLength, 0)
				tmpLength += 66 + 5
			}
		}

		for (let i = 0; i < items.list.length; i++) {
			const element = items.list[i]
			if (player.items.indexOf(element.id) >= 0) {
				tmpLength += 5
				if (hoverData[0] === "actionBarItem" && hoverData[1] === "actionBarItem" + (i + items.weapons.length)) {
					actionBarContext.fillStyle = "rgba(50, 50, 50, 0.25)"
				}
				actionBarContext.beginPath()
				actionBarContext.roundRect(tmpLength, 0, 66, 66, 4)
				actionBarContext.fill()
				if (hoverData[0] === "actionBarItem" && hoverData[1] === "actionBarItem" + (i + items.weapons.length)) {
					actionBarContext.fillStyle = "rgba(0, 0, 0, 0.25)"
				}
				actionBarContext.drawImage(actionBarSprites[i + items.weapons.length], tmpLength, 0)
				tmpLength += 66 + 5
			}
		}
	}

	function renderUpgradeBar() {
		if (player.upgradePoints < 0) return

		const upgradeList = []
		for (let i = 0; i < items.weapons.length; i++) {
			if (items.weapons[i].age === player.upgrAge && (items.weapons[i].pre == undefined || player.weapons.indexOf(items.weapons[i].pre) >= 0)) {
				upgradeList.push(i)
			}
		}
		for (let i = 0; i < items.list.length; i++) {
			if (items.list[i].age == player.upgrAge && (items.list[i].pre == undefined || player.items.indexOf(items.list[i].pre) >= 0)) {
				upgradeList.push(i + items.weapons.length)
			}
		}

		upgradeBarWidth = upgradeList.length * (5 + 66 + 5)
		upgradeBarHeight = 66
		resizeCanvas(upgradeBarCanvas, upgradeBarWidth, upgradeBarHeight)

		upgradeBarContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		let tmpLength = 0
		for (let i = 0; i < upgradeList.length; i++) {
			tmpLength += 5
			if (hoverData[0] === "upgradeBarItem" && hoverData[1] === "upgradeItem" + upgradeList[i]) {
				upgradeBarContext.fillStyle = "rgba(50, 50, 50, 0.25)"
			}
			upgradeBarContext.beginPath()
			upgradeBarContext.roundRect(tmpLength, 0, 66, 66, 4)
			upgradeBarContext.fill()
			if (hoverData[0] === "upgradeBarItem" && hoverData[1] === "upgradeItem" + upgradeList[i]) {
				upgradeBarContext.fillStyle = "rgba(0, 0, 0, 0.25)"
			}
			upgradeBarContext.drawImage(actionBarSprites[upgradeList[i]], tmpLength, 0)
			tmpLength += 66 + 5
		}
	}

	function renderDescription() {
		if (Object.keys(itemInfoData).length === 0) return
		if (descriptionCanvas) {
			descriptionContext.clearRect(0, 0, descriptionWidth, descriptionHeight)
		}

		function splitText(text, maxWidth) {
			var words = text.split(" ")
			var lines = []
			var currentLine = words[0]

			for (let i = 1; i < words.length; i++) {
				var word = words[i]
				var width = elementContext.measureText(currentLine + " " + word).width
				if (width < maxWidth) {
					currentLine += " " + word
				} else {
					lines.push(currentLine)
					currentLine = word
				}
			}
			lines.push(currentLine)
			return lines
		}

		elementContext.font = "30px Hammersmith One"
		const measureName = elementContext.measureText(itemInfoData.name).width
		elementContext.font = "22px Hammersmith One"
		const descriptionTexts = splitText(itemInfoData.desc, 250)
		const measureDesc = descriptionTexts.length === 1 ? elementContext.measureText(itemInfoData.desc).width : 250

		descriptionWidth = Math.max(measureName, measureDesc) + 10 + 10
		descriptionHeight = 5 + fontHeight[30] + (descriptionTexts.length + itemInfoData.req.length) * fontHeight[22] + 5
		resizeCanvas(descriptionCanvas, descriptionWidth, descriptionHeight)

		descriptionContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		descriptionContext.beginPath()
		descriptionContext.roundRect(0, 0, descriptionWidth, descriptionHeight, 4)
		descriptionContext.fill()

		descriptionContext.textAlign = "left"
		descriptionContext.textBaseline = "bottom"
		descriptionContext.font = "30px Hammersmith One"
		descriptionContext.fillStyle = "#fff"
		descriptionContext.fillText(itemInfoData.name, 10, 5 + fontHeight[30])

		descriptionContext.font = "22px Hammersmith One"
		descriptionContext.fillStyle = "rgba(255,255,255,0.6)"
		let positionTop = 5 + fontHeight[30]
		for (let i = 0; i < descriptionTexts.length; i++) {
			descriptionContext.fillText(descriptionTexts[i], 10, positionTop + fontHeight[22])
			positionTop += fontHeight[22]
		}
		for (let i = 0; i < itemInfoData.req.length; i++) {
			const split = itemInfoData.req[i].split(" x")
			descriptionContext.fillStyle = "#fff"
			descriptionContext.fillText(split[0], 10, positionTop + fontHeight[22])
			if (split[1]) {
				descriptionContext.fillStyle = "rgba(255,255,255,0.6)"
				descriptionContext.fillText(" x" + split[1], 10 + descriptionContext.measureText(split[0]).width, positionTop + fontHeight[22])
			}
			positionTop += fontHeight[22]
		}

		if (itemInfoData.lmt) {
			descriptionContext.textAlign = "right"
			descriptionContext.fillStyle = "#fff"
			descriptionContext.fillText(itemInfoData.lmt, descriptionWidth - 10, descriptionHeight - 6)
		}
	}

	function renderChatBox() {
		chatBoxContext.clearRect(0, 0, chatBoxWidth, fontHeight[20])
		chatBoxContext.font = "20px Hammersmith One"
		chatBoxContext.textBaseline = "bottom"
		chatBoxContext.fillStyle = inputText.chatBox == "" ? "#cecece" : "#fff"
		chatBoxContext.fillText(inputText.chatBox == "" ? "Enter Message" : inputText.chatBox, -chatBoxLeft, fontHeight[20])
	}

	// console.log("Setting Up...")
	inGame = startData.inGame
	disconnect = startData.disconnect
	playerSID = startData.playerSID
	lockDir = startData.lockDir
	moofoll = startData.moofoll
	camX = startData.camX
	camY = startData.camY
	canvasMouse = { ...startData.canvasMouse }
	mouse = { ...startData.mouse }
	leaderboardData = startData.leaderboardData
	allianceNotificationName = startData.allianceNotificationName
	hoverData = { ...startData.hoverData }
	minimapData = startData.minimapData
	fontHeight = { ...startData.fontHeight }
	storeData = startData.storeData || []
	updatePositionData = startData.updatePositionData || [null, null, null, null]
	allianceData = startData.allianceData || []
	visibility = { ...startData.visibility }
	inputText = { ...startData.inputText }
	chatBoxLeft = startData.chatBoxLeft
	chatBoxWidth = startData.chatBoxWidth
	itemInfoData = startData.itemInfoData
	startData.players.forEach((e) => {
		players.push(new Player(null, null, e))
	})
	player = findPlayerBySID(playerSID)
	for (let i = 0; i < accessories.length; ++i) {
		if (accessories[i].price <= 0) {
			player.tails[accessories[i].id] = 1
		}
	}
	for (let i = 0; i < hats.length; ++i) {
		if (hats[i].price <= 0) {
			player.skins[hats[i].id] = 1
		}
	}
	startData.ais.forEach((e) => {
		ais.push(new AI(null, e))
	})
	startData.gameObjects.forEach((e) => {
		gameObjects.push(new GameObject(null, null, null, null, null, null, null, null, null, e))
	})
	startData.projectiles.forEach((e) => {
		projectiles.push(new Projectile(null, e))
	})
	startData.texts.forEach((e) => {
		texts.push(new Text(e))
	})
	startData.mapPings.forEach((e) => {
		mapPings.push(new MapPing(e))
	})

	var scaleFillNative = Math.max(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight) * resolution
	canvasWidth = screenWidth * resolution
	canvasHeight = screenHeight * resolution

	resizeCanvas(gameCanvas, canvasWidth, canvasHeight)
	gameContext.setTransform(
		scaleFillNative,
		0,
		0,
		scaleFillNative,
		(canvasWidth - maxScreenWidth * scaleFillNative) / 2,
		(canvasHeight - maxScreenHeight * scaleFillNative) / 2
	)

	resizeCanvas(elementCanvas, canvasWidth, canvasHeight)
	elementContext.setTransform(resolution, 0, 0, resolution, 0, 0)

	resizeCanvas(mapCanvas, 300, 300)

	resizeCanvas(chatBoxCanvas, chatBoxWidth, fontHeight[20])
	renderChatBox()

	storeWidth = 400 + 10 + 10
	storeHeight = 10 + fontHeight[26] + 10 + 15 + 200 + 10 + 10
	resizeCanvas(storeCanvas, storeWidth, storeHeight)
	renderStore()

	allianceWidth = 10 + 350 + 10
	allianceHeight = 10 + 200 + 10 + 10 + 5 + fontHeight[24] + 5
	resizeCanvas(allianceCanvas, allianceWidth, allianceHeight)
	renderAlliance()

	renderActionBar()
	renderDescription()
	renderUpgradeBar()

	disconnectHeight = fontHeight[170] - 25 + fontHeight[45] + fontHeight[24]
	resizeCanvas(disconnectCanvas, screenWidth, disconnectHeight)
	disconnectContext.textAlign = "center"
	disconnectContext.textBaseline = "bottom"
	disconnectContext.font = "24px Hammersmith One"
	disconnectContext.fillStyle = "#6eb3ef"
	disconnectContext.fillText("reload", screenWidth / 2, fontHeight[170] - 25 + fontHeight[45] + fontHeight[24])
	disconnectContext.fillStyle = "#fff"
	disconnectContext.font = "45px Hammersmith One"
	disconnectContext.fillText("disconnected", screenWidth / 2, fontHeight[170] - 25 + fontHeight[45])
	disconnectContext.font = "170px Hammersmith One"
	disconnectContext.shadowColor = "#c4c4c4"
	for (let i = 1; i < 10; i++) {
		disconnectContext.shadowOffsetY = i
		disconnectContext.fillText("MOOMOO.io", screenWidth / 2, fontHeight[170])
	}

	resizeCanvas(mainCanvas, canvasWidth, canvasHeight)
	if (renderFrame != null) {
		for (let i = frameRate; i > 0; i--) {
			const num = renderFrame - i * Math.floor(1000 / frameRate)
			if (num > parseInt(tmpSTARTDATA.time)) {
				updateGame(num, false)
			}
		}
		updateGame(renderFrame, true)
	}

	if (renderStart != null) {
		for (let i = frameRate; i > 0; i--) {
			const num = renderStart - i * Math.floor(1000 / frameRate)
			if (num > parseInt(tmpSTARTDATA.time)) {
				updateGame(num, false)
			}
		}
		updateGame(renderStart, true)
		let fakeNow = Date.now()
		let fakeLastUpdate = 0
		function update() {
			fakeNow = Date.now()
			if (!fakeLastUpdate) fakeLastUpdate = fakeNow
			renderStart += (fakeNow - fakeLastUpdate) * previewDATA.SPEED
			if (previewDATA.CUTOUT < renderStart) {
				playPauseVideo()
				return
			}
			updateGame(renderStart, true)
			timeline.value = renderStart
			previewContainer.setValue("Timeline", renderStart)
			previewDATA.TIMELINE = renderStart
			fakeLastUpdate = fakeNow
			RUNNINGFRAME = window.requestAnimationFrame(update)
		}
		RUNNINGFRAME = window.requestAnimationFrame(update)
	}
}

function createCanvas(width, height) {
	const tmpCanvas = document.createElement("canvas")
	tmpCanvas.width = width
	tmpCanvas.height = height
	return tmpCanvas
}

function resizeCanvas(canvas, width, height) {
	canvas.width = width
	canvas.height = height
}

// GET ITEM SPRITE:
var itemSprites = []
function getItemSprite(obj, asIcon) {
	let returnValue
	var tmpSprite = itemSprites[obj.id]
	if (!tmpSprite || asIcon) {
		var tmpCanvas = createCanvas(
			obj.scale * 2.5 + outlineWidth + (items.list[obj.id].spritePadding || 0),
			obj.scale * 2.5 + outlineWidth + (items.list[obj.id].spritePadding || 0)
		)
		var tmpContext = tmpCanvas.getContext("2d")
		tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
		tmpContext.rotate(asIcon ? 0 : Math.PI / 2)
		tmpContext.strokeStyle = outlineColor
		tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1)
		if (obj.name == "apple") {
			tmpContext.fillStyle = "#c15555"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fillStyle = "#89a54c"
			var leafDir = -(Math.PI / 2)
			renderLeaf(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir), 25, leafDir + Math.PI / 2, tmpContext)
		} else if (obj.name == "cookie") {
			tmpContext.fillStyle = "#cca861"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fillStyle = "#937c4b"
			let chips = 4
			let rotVal = (Math.PI * 2) / chips
			let tmpRange
			for (let i = 0; i < chips; ++i) {
				tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)
				renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, true)
			}
		} else if (obj.name == "cheese") {
			tmpContext.fillStyle = "#f4f3ac"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fillStyle = "#c3c28b"
			let chips = 4
			let rotVal = (Math.PI * 2) / chips
			let tmpRange
			for (let i = 0; i < chips; ++i) {
				tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)
				renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, true)
			}
		} else if (obj.name == "wood wall" || obj.name == "stone wall" || obj.name == "castle wall") {
			tmpContext.fillStyle = obj.name == "castle wall" ? "#83898e" : obj.name == "wood wall" ? "#a5974c" : "#939393"
			var sides = obj.name == "castle wall" ? 4 : 3
			renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = obj.name == "castle wall" ? "#9da4aa" : obj.name == "wood wall" ? "#c9b758" : "#bcbcbc"
			renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65)
			tmpContext.fill()
		} else if (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "poison spikes" || obj.name == "spinning spikes") {
			tmpContext.fillStyle = obj.name == "poison spikes" ? "#7b935d" : "#939393"
			let tmpScale = obj.scale * 0.6
			renderStar(tmpContext, obj.name == "spikes" ? 5 : 6, obj.scale, tmpScale)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#a5974c"
			renderCircle(0, 0, tmpScale, tmpContext)
			tmpContext.fillStyle = "#c9b758"
			renderCircle(0, 0, tmpScale / 2, tmpContext, true)
		} else if (obj.name == "windmill" || obj.name == "faster windmill" || obj.name == "power mill") {
			tmpContext.fillStyle = "#a5974c"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fillStyle = "#c9b758"
			renderRectCircle(0, 0, obj.scale * 1.5, 29, 4, tmpContext)
			tmpContext.fillStyle = "#a5974c"
			renderCircle(0, 0, obj.scale * 0.5, tmpContext)
		} else if (obj.name == "mine") {
			tmpContext.fillStyle = "#939393"
			renderStar(tmpContext, 3, obj.scale, obj.scale)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#bcbcbc"
			renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65)
			tmpContext.fill()
		} else if (obj.name == "sapling") {
			for (let i = 0; i < 2; ++i) {
				let tmpScale = obj.scale * (!i ? 1 : 0.5)
				renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7)
				tmpContext.fillStyle = !i ? "#9ebf57" : "#b4db62"
				tmpContext.fill()
				if (!i) tmpContext.stroke()
			}
		} else if (obj.name == "pit trap") {
			tmpContext.fillStyle = "#a5974c"
			renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = outlineColor
			renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65)
			tmpContext.fill()
		} else if (obj.name == "boost pad") {
			tmpContext.fillStyle = "#7e7f82"
			renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#dbd97d"
			renderTriangle(obj.scale * 1, tmpContext)
		} else if (obj.name == "turret") {
			tmpContext.fillStyle = "#a5974c"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#939393"
			var tmpLen = 50
			renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext)
			renderCircle(0, 0, obj.scale * 0.6, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
		} else if (obj.name == "platform") {
			tmpContext.fillStyle = "#cebd5f"
			var tmpCount = 4
			var tmpS = obj.scale * 2
			var tmpW = tmpS / tmpCount
			var tmpX = -(obj.scale / 2)
			for (let i = 0; i < tmpCount; ++i) {
				renderRect(tmpX - tmpW / 2, 0, tmpW, obj.scale * 2, tmpContext)
				tmpContext.fill()
				tmpContext.stroke()
				tmpX += tmpS / tmpCount
			}
		} else if (obj.name == "healing pad") {
			tmpContext.fillStyle = "#7e7f82"
			renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#db6e6e"
			renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true)
		} else if (obj.name == "spawn pad") {
			tmpContext.fillStyle = "#7e7f82"
			renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#71aad6"
			renderCircle(0, 0, obj.scale * 0.6, tmpContext)
		} else if (obj.name == "blocker") {
			tmpContext.fillStyle = "#7e7f82"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.rotate(Math.PI / 4)
			tmpContext.fillStyle = "#db6e6e"
			renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true)
		} else if (obj.name == "teleporter") {
			tmpContext.fillStyle = "#7e7f82"
			renderCircle(0, 0, obj.scale, tmpContext)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.rotate(Math.PI / 4)
			tmpContext.fillStyle = "#d76edb"
			renderCircle(0, 0, obj.scale * 0.5, tmpContext, true)
		}
		tmpSprite = tmpCanvas
		if (!asIcon) {
			itemSprites[obj.id] = tmpSprite
		}
	}
	returnValue = tmpSprite
	return returnValue
}

// RENDER GAME OBJECTS:
var gameObjectSprites = {}
function getResSprite(tmpObj) {
	let returnValue
	var biomeID = tmpObj.y >= config.mapScale - config.snowBiomeTop ? 2 : tmpObj.y <= config.snowBiomeTop ? 1 : 0
	var tmpIndex = tmpObj.type + "_" + tmpObj.scale + "_" + biomeID
	var tmpSprite = gameObjectSprites[tmpIndex]
	if (!tmpSprite) {
		var tmpCanvas = createCanvas(tmpObj.scale * 2.1 + outlineWidth, tmpObj.scale * 2.1 + outlineWidth)
		var tmpContext = tmpCanvas.getContext("2d")
		tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
		tmpContext.rotate(UTILS.randFloat(0, Math.PI))
		tmpContext.strokeStyle = outlineColor
		tmpContext.lineWidth = outlineWidth
		if (tmpObj.type == 0) {
			var tmpScale
			for (var i = 0; i < 2; ++i) {
				tmpScale = tmpObj.scale * (!i ? 1 : 0.5)
				renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7)
				tmpContext.fillStyle = !biomeID ? (!i ? "#9ebf57" : "#b4db62") : !i ? "#e3f1f4" : "#fff"
				tmpContext.fill()
				if (!i) {
					tmpContext.stroke()
				}
			}
		} else if (tmpObj.type == 1) {
			if (biomeID == 2) {
				tmpContext.fillStyle = "#606060"
				renderStar(tmpContext, 6, tmpObj.scale * 0.3, tmpObj.scale * 0.71)
				tmpContext.fill()
				tmpContext.stroke()
				tmpContext.fillStyle = "#89a54c"
				renderCircle(0, 0, tmpObj.scale * 0.55, tmpContext)
				tmpContext.fillStyle = "#a5c65b"
				renderCircle(0, 0, tmpObj.scale * 0.3, tmpContext, true)
			} else {
				renderBlob(tmpContext, 6, tmpObj.scale, tmpObj.scale * 0.7)
				tmpContext.fillStyle = biomeID ? "#e3f1f4" : "#89a54c"
				tmpContext.fill()
				tmpContext.stroke()
				tmpContext.fillStyle = biomeID ? "#6a64af" : "#c15555"
				var tmpRange
				var berries = 4
				var rotVal = (Math.PI * 2) / berries
				for (let i = 0; i < berries; ++i) {
					tmpRange = UTILS.randInt(tmpObj.scale / 3.5, tmpObj.scale / 2.3)
					renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(10, 12), tmpContext)
				}
			}
		} else if (tmpObj.type == 2 || tmpObj.type == 3) {
			tmpContext.fillStyle = tmpObj.type == 2 ? (biomeID == 2 ? "#938d77" : "#939393") : "#e0c655"
			renderStar(tmpContext, 3, tmpObj.scale, tmpObj.scale)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = tmpObj.type == 2 ? (biomeID == 2 ? "#b2ab90" : "#bcbcbc") : "#ebdca3"
			renderStar(tmpContext, 3, tmpObj.scale * 0.55, tmpObj.scale * 0.65)
			tmpContext.fill()
		}
		tmpSprite = tmpCanvas
		gameObjectSprites[tmpIndex] = tmpSprite
	}
	returnValue = tmpSprite
	return returnValue
}

// RENDER LEAF:
function renderLeaf(x, y, l, r, ctxt) {
	//no
	var endX = x + l * Math.cos(r)
	var endY = y + l * Math.sin(r)
	var width = l * 0.4
	ctxt.moveTo(x, y)
	ctxt.beginPath()
	ctxt.quadraticCurveTo((x + endX) / 2 + width * Math.cos(r + Math.PI / 2), (y + endY) / 2 + width * Math.sin(r + Math.PI / 2), endX, endY)
	ctxt.quadraticCurveTo((x + endX) / 2 - width * Math.cos(r + Math.PI / 2), (y + endY) / 2 - width * Math.sin(r + Math.PI / 2), x, y)
	ctxt.closePath()
	ctxt.fill()
	ctxt.stroke()
}

// RENDER CIRCLE:
function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
	//no
	tmpContext = tmpContext || gameContext
	tmpContext.beginPath()
	tmpContext.arc(x, y, scale, 0, 2 * Math.PI)
	if (!dontFill) tmpContext.fill()
	if (!dontStroke) tmpContext.stroke()
}

// RENDER STAR SHAPE:
function renderStar(ctxt, spikes, outer, inner) {
	var rot = (Math.PI / 2) * 3
	var x, y
	var step = Math.PI / spikes
	ctxt.beginPath()
	ctxt.moveTo(0, -outer)
	for (var i = 0; i < spikes; i++) {
		x = Math.cos(rot) * outer
		y = Math.sin(rot) * outer
		ctxt.lineTo(x, y)
		rot += step
		x = Math.cos(rot) * inner
		y = Math.sin(rot) * inner
		ctxt.lineTo(x, y)
		rot += step
	}
	ctxt.lineTo(0, -outer)
	ctxt.closePath()
}

// RENDER RECTANGLE:
function renderRect(x, y, w, h, ctxt, stroke) {
	ctxt.fillRect(x - w / 2, y - h / 2, w, h)
	if (!stroke) {
		ctxt.strokeRect(x - w / 2, y - h / 2, w, h)
	}
}

// RENDER RECTCIRCLE:
function renderRectCircle(x, y, s, sw, seg, ctxt, stroke) {
	ctxt.save()
	ctxt.translate(x, y)
	seg = Math.ceil(seg / 2)
	for (var i = 0; i < seg; i++) {
		renderRect(0, 0, s * 2, sw, ctxt, stroke)
		ctxt.rotate(Math.PI / seg)
	}
	ctxt.restore()
}

// RENDER BLOB:
function renderBlob(ctxt, spikes, outer, inner) {
	var rot = (Math.PI / 2) * 3
	var step = Math.PI / spikes
	var tmpOuter
	ctxt.beginPath()
	ctxt.moveTo(0, -inner)
	for (var i = 0; i < spikes; i++) {
		tmpOuter = UTILS.randInt(outer + 0.9, outer * 1.2)
		ctxt.quadraticCurveTo(
			Math.cos(rot + step) * tmpOuter,
			Math.sin(rot + step) * tmpOuter,
			Math.cos(rot + step * 2) * inner,
			Math.sin(rot + step * 2) * inner
		)
		rot += step * 2
	}
	ctxt.lineTo(0, -inner)
	ctxt.closePath()
}

// RENDER TRIANGLE:
function renderTriangle(s, ctx) {
	ctx = ctx || gameContext
	var h = s * (Math.sqrt(3) / 2)
	ctx.beginPath()
	ctx.moveTo(0, -h / 2)
	ctx.lineTo(-s / 2, h / 2)
	ctx.lineTo(s / 2, h / 2)
	ctx.lineTo(0, -h / 2)
	ctx.fill()
	ctx.closePath()
}

async function preloadImages() {
	function loadImage(fileName) {
		return new Promise((resolve) => {
			var tmpSprite = new Image()
			tmpSprite.src = fileName
			tmpSprite.onload = function () {
				this.isLoaded = true
				resolve(tmpSprite)
			}
			tmpSprite.onerror = function () {
				resolve(null)
			}
		})
	}
	cursorSrc.forEach(async (e) => {
		cursorSprites[e] = await loadImage("img/cursor/" + e + ".png")
	})

	iconsSrc.forEach(async (e) => {
		iconSprites[e] = await loadImage("img/icons/" + e + ".png")
	})

	resourecesSrc.forEach(async (e) => {
		resourcesSprites[e] = await loadImage("img/resources/" + e + ".png")
	})

	projectilesSrc.forEach(async (e) => {
		projectileSprites[e] = await loadImage("img/weapons/" + e + ".png")
	})

	aisSrc.forEach(async (e) => {
		aiSprites[e] = await loadImage("img/animals/" + e + ".png")
	})

	for (var i = 1; i < 59; ++i) {
		if ([3, 25].includes(i)) continue
		try {
			var tmpSprite = await loadImage("img/hats/hat_" + i + ".png")
			skinSprites[i.toString()] = tmpSprite
			if ([11, 14, 53].includes(i)) {
				tmpSprite = await loadImage("img/hats/hat_" + i + "_p.png")
				skinSprites[`${i}_p`] = tmpSprite
				tmpSprite = await loadImage("img/hats/hat_" + i + "_top.png")
				skinSprites[`${i}_top`] = tmpSprite
			}
		} catch (err) {}
	}

	for (var i = 1; i < 22; ++i) {
		try {
			var tmpSprite = await loadImage("img/accessories/access_" + i + ".png")
			accessSprites[i] = tmpSprite
		} catch (err) {}
	}

	for (var i = 0; i < toolsSrc.length; ++i) {
		for (var j = 0; j < toolsVariance.length; ++j) {
			try {
				var tmpSprite = await loadImage("img/weapons/" + toolsSrc[i] + toolsVariance[j] + ".png")
				toolSprites[toolsSrc[i] + toolsVariance[j]] = tmpSprite
			} catch (err) {}
		}
	}

	for (var i = 0; i < items.weapons.length + items.list.length; i++) {
		var tmpCanvas = createCanvas(66, 66)
		var tmpContext = tmpCanvas.getContext("2d")
		tmpContext.translate(66 / 2, 66 / 2)
		if (items.weapons[i]) {
			const element = items.weapons[i]
			var tmpSprite = toolSprites[element.src]

			var tmpPad = 1 / (tmpSprite.height / tmpSprite.width)
			var tmpMlt = element.iPad || 1
			tmpContext.imageSmoothingEnabled = false
			tmpContext.rotate(Math.PI / 4 + Math.PI)
			tmpContext.drawImage(
				tmpSprite,
				-(66 * tmpMlt * config.iconPad * tmpPad) / 2,
				-(66 * tmpMlt * config.iconPad) / 2,
				66 * tmpMlt * tmpPad * config.iconPad,
				66 * tmpMlt * config.iconPad
			)

			tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)"
			tmpContext.globalCompositeOperation = "source-atop"
			tmpContext.fillRect(-66 / 2, -66 / 2, 66, 66)
		} else {
			const element = items.list[i - items.weapons.length]
			var tmpSprite = getItemSprite(element, true)
			var tmpScale = Math.min(66 - config.iconPadding, 66)

			tmpContext.globalAlpha = 1
			tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale)
			tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)"
			tmpContext.globalCompositeOperation = "source-atop"
			tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale)
		}

		actionBarSprites.push(tmpCanvas)
	}
}

slider1.addEventListener("input", () => {
	dragCutStart(parseInt(slider1.value))
})
slider2.addEventListener("input", () => {
	dragCutEnd(parseInt(slider2.value))
})
slider1.addEventListener("change", () => {
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
slider2.addEventListener("change", () => {
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
timeline.addEventListener("input", () => {
	dragTimeline(parseInt(timeline.value))
})

function playPauseVideo(forcePause) {
	if (DATA.info == null) return
	if (RUNNINGFRAME == null && !forcePause) {
		if (previewDATA.CUTOUT < previewDATA.TIMELINE + previewDATA.FPS) previewDATA.TIMELINE = previewDATA.CUTIN
		renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, null, previewDATA.TIMELINE, elementDATA)
		playButton.classList.remove("paused")
	} else {
		window.cancelAnimationFrame(RUNNINGFRAME)
		RUNNINGFRAME = null
		playButton.classList.add("paused")
	}
}

playButton.addEventListener("click", () => {
	playPauseVideo()
})
prevFrame.addEventListener("click", () => {
	dragTimeline(previewDATA.TIMELINE - previewDATA.SEEK)
})
nextFrame.addEventListener("click", () => {
	dragTimeline(previewDATA.TIMELINE + previewDATA.SEEK)
})

window.addEventListener("keydown", (event) => {
	if ((event.target.tagName === "INPUT" && event.target.type === "number") || event.target.type === "text") return
	if (event.code === "Space") {
		playPauseVideo()
	} else if (event.code === "ArrowLeft") {
		event.preventDefault()
		event.stopImmediatePropagation()
		event.stopPropagation()
		dragTimeline(previewDATA.TIMELINE - previewDATA.SEEK)
	} else if (event.code === "ArrowRight") {
		event.preventDefault()
		event.stopImmediatePropagation()
		event.stopPropagation()
		dragTimeline(previewDATA.TIMELINE + previewDATA.SEEK)
	}
})

const previewContainer = QuickSettings.create(0, 0, "Preview", document.getElementById("previewContainer"))
previewContainer.setDraggable(false)
previewContainer.addRange("FPS", 1, 120, previewDATA.FPS, 1, (data) => {
	previewDATA.FPS = data
	minGap = Math.ceil(1000 / previewDATA.FPS)
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
previewContainer.addRange("Resolution", 0.05, 3, previewDATA.RESOLUTION, 0.05, (data) => {
	previewDATA.RESOLUTION = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
previewContainer.addRange("Speed", 0.1, 2, previewDATA.SPEED, 0.1, (data) => {
	previewDATA.SPEED = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
previewContainer.addBoolean("Marker", previewDATA.MARKER, (data) => {
	previewDATA.MARKER = data
	markerContainer.style.display = previewDATA.MARKER ? "block" : "none"
})
previewContainer.addRange("Seek", 1, 500, previewDATA.SEEK, 1, (data) => {
	previewDATA.SEEK = data
})
previewContainer.addRange("Timeline", 0, 100, 0, 1)
document.getElementById("Timeline").addEventListener("input", (event) => {
	dragTimeline(parseInt(event.target.value))
})
previewContainer.addRange("Start", 0, 100, 0, 1)
document.getElementById("Start").addEventListener("input", (event) => {
	dragCutStart(parseInt(event.target.value))
})
previewContainer.addRange("End", 0, 100, 100, 1)
document.getElementById("End").addEventListener("input", (event) => {
	dragCutEnd(parseInt(event.target.value))
})
previewContainer.addButton("Element", () => {
	document.getElementById("previewContainer").style.display = "none"
	document.getElementById("elementContainer").style.display = "block"
})
// previewContainer.addButton("Visual", () => {
// 	document.getElementById("previewContainer").style.display = "none"
// 	document.getElementById("visualContainer").style.display = "block"
// })
previewContainer.addButton("Export", () => {
	document.getElementById("previewContainer").style.display = "none"
	document.getElementById("exportContainer").style.display = "block"
	updateExportingContainer()
})

function dragCutStart(value) {
	if (previewDATA.CUTOUT - value <= minGap) {
		value = previewDATA.CUTOUT - minGap
	}
	slider1.value = value
	previewContainer.setValue("Start", value)
	previewDATA.CUTIN = value
	fillColour()
	if (previewDATA.TIMELINE < value) {
		previewContainer.setValue("Timeline", value)
		timeline.value = value
		previewDATA.TIMELINE = value
	}
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, value, null, elementDATA)
}

function dragCutEnd(value) {
	if (value - previewDATA.CUTIN <= minGap) {
		value = previewDATA.CUTIN + minGap
	}
	slider2.value = value
	previewContainer.setValue("End", value)
	previewDATA.CUTOUT = value
	fillColour()
	if (previewDATA.TIMELINE > value) {
		previewContainer.setValue("Timeline", value)
		timeline.value = value
		previewDATA.TIMELINE = value
	}
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, value, null, elementDATA)
}

function dragTimeline(value) {
	if (value < previewDATA.CUTIN) {
		value = previewDATA.CUTIN
	} else if (value > previewDATA.CUTOUT) {
		value = previewDATA.CUTOUT
	}
	previewContainer.setValue("Timeline", value)
	timeline.value = value
	previewDATA.TIMELINE = value
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, value, null, elementDATA)
}

function fillColour() {
	const percent1 = (slider1.value / slider1.max) * 100
	const percent2 = (slider2.value / slider2.max) * 100
	durationTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`
}

const elementContainer = QuickSettings.create(0, 0, "Element", document.getElementById("elementContainer"))
elementContainer.setDraggable(false)
elementContainer.addRange("Cursor Size", 0, 200, elementDATA.CURSORSIZE, 1, (data) => {
	elementDATA.CURSORSIZE = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Top Info Holder", elementDATA.TOPINFOHOLDER, (data) => {
	elementDATA.TOPINFOHOLDER = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Shop", elementDATA.SHOP, (data) => {
	elementDATA.SHOP = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Clan", elementDATA.CLAN, (data) => {
	elementDATA.CLAN = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Clan Notification", elementDATA.CLANNOTIFICATION, (data) => {
	elementDATA.CLANNOTIFICATION = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Mini Map", elementDATA.MINIMAP, (data) => {
	elementDATA.MINIMAP = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Resources", elementDATA.RESOURCES, (data) => {
	elementDATA.RESOURCES = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Age Bar", elementDATA.AGEBAR, (data) => {
	elementDATA.AGEBAR = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Select Items", elementDATA.SELECTITEM, (data) => {
	elementDATA.SELECTITEM = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Upgrade Items", elementDATA.UPGRADEITEM, (data) => {
	elementDATA.UPGRADEITEM = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Description", elementDATA.DESCRIPTION, (data) => {
	elementDATA.DESCRIPTION = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Game Buttons", elementDATA.GAMEBUTTON, (data) => {
	elementDATA.GAMEBUTTON = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addBoolean("Chat Box", elementDATA.CHATBOX, (data) => {
	elementDATA.CHATBOX = data
	playPauseVideo(true)
	renderToCanvas(previewDATA.RESOLUTION, previewDATA.FPS, previewDATA.TIMELINE, null, elementDATA)
})
elementContainer.addButton("Back", () => {
	document.getElementById("elementContainer").style.display = "none"
	document.getElementById("previewContainer").style.display = "block"
})

const exportContainer = QuickSettings.create(0, 0, "Export", document.getElementById("exportContainer"))
exportContainer.setDraggable(false)
exportContainer.addRange("FPS", 1, 120, exportDATA.FPS, 1, (data) => {
	exportDATA.FPS = data
})
exportContainer.addRange("Resolution", 0.05, 3, exportDATA.RESOLUTION, 0.05, (data) => {
	exportDATA.RESOLUTION = data
	document.getElementById("dimension").innerText = `${Math.floor(DATA.info.screenWidth * exportDATA.RESOLUTION)} × ${Math.floor(
		DATA.info.screenHeight * exportDATA.RESOLUTION
	)}`
})
exportContainer.addHTML("dimension", "<div id='dimension' style='text-align: center;'></div>")
exportContainer.hideTitle("dimension")
exportContainer.addRange("Speed", 0.1, 2, exportDATA.SPEED, 0.1, (data) => {
	exportDATA.SPEED = data
})
exportContainer.addButton("Export Image", () => {
	const OUTPUTNAME = Date.now()
	const ws = new WebSocket("ws://localhost:" + PORT)

	ws.onmessage = (e) => {
		const { packet, data } = JSON.parse(e.data)
		if (packet === "start") {
			const tmpOption = document.createElement("option")
			tmpOption.label = OUTPUTNAME
			tmpOption.innerText = OUTPUTNAME
			document.querySelector(".qs_select").appendChild(tmpOption)
			EXPORTINGDATA[OUTPUTNAME] = {
				type: "image",
				rendering: 0,
				converting: 0
			}
			SELECTEDPROJECT = OUTPUTNAME
			updateExportingContainer()
		} else if (packet === "error") {
			alert(data)
		} else if (packet === "rendering") {
			EXPORTINGDATA[OUTPUTNAME].rendering = data
			updateExportingContainer()
		} else if (packet === "converting") {
			EXPORTINGDATA[OUTPUTNAME].converting = data
			updateExportingContainer()
		}
	}
	ws.onopen = async () => {
		websockets[OUTPUTNAME] = ws
		ws.send(JSON.stringify(["renderImage", [exportDATA, previewDATA.TIMELINE, fileNAME, String(OUTPUTNAME), elementDATA]]))
	}
	ws.onclose = () => {
		const tmpElement = document.querySelector(`.qs_select > option[label="${OUTPUTNAME}"]`)
		if (tmpElement) tmpElement.remove()
		delete websockets[OUTPUTNAME]
		const tmpSelect = document.querySelector(`.qs_select > option`)
		SELECTEDPROJECT = tmpSelect ? tmpSelect.label : null
		updateExportingContainer()
	}
})
exportContainer.addButton("Export Video", () => {
	const OUTPUTNAME = Date.now()
	const ws = new WebSocket("ws://localhost:" + PORT)
	ws.onmessage = (e) => {
		const { packet, data } = JSON.parse(e.data)
		if (packet === "start") {
			const tmpOption = document.createElement("option")
			tmpOption.label = OUTPUTNAME
			tmpOption.innerText = OUTPUTNAME
			document.querySelector(".qs_select").appendChild(tmpOption)
			EXPORTINGDATA[OUTPUTNAME] = {
				type: "video",
				rendering: 0,
				converting: 0
			}
			SELECTEDPROJECT = OUTPUTNAME
			updateExportingContainer()
		} else if (packet === "error") {
			alert(data)
		} else if (packet === "rendering") {
			EXPORTINGDATA[OUTPUTNAME].rendering = data
			updateExportingContainer()
		} else if (packet === "converting") {
			EXPORTINGDATA[OUTPUTNAME].converting = data
			updateExportingContainer()
		}
	}
	ws.onopen = () => {
		websockets[OUTPUTNAME] = ws
		ws.send(JSON.stringify(["renderVideo", [exportDATA, previewDATA.CUTIN, previewDATA.CUTOUT, fileNAME, String(OUTPUTNAME), elementDATA]]))
	}
	ws.onclose = () => {
		const tmpElement = document.querySelector(`.qs_select > option[label="${OUTPUTNAME}"]`)
		if (tmpElement) tmpElement.remove()
		delete websockets[OUTPUTNAME]
		const tmpSelect = document.querySelector(`.qs_select > option`)
		SELECTEDPROJECT = tmpSelect ? tmpSelect.label : null
		updateExportingContainer()
	}
})
exportContainer.addButton("Back", () => {
	document.getElementById("exportContainer").style.display = "none"
	updateExportingContainer()
	document.getElementById("previewContainer").style.display = "block"
})

const EXPORTINGDATA = {}
var SELECTEDPROJECT = null
const websockets = {}
const exportingContainer = QuickSettings.create(0, 0, "Exporting", document.getElementById("exportingContainer"))
exportingContainer.setDraggable(false)
exportingContainer.addDropDown("Select Project", [])
document.querySelector(".qs_select").addEventListener("input", (event) => {
	SELECTEDPROJECT = event.target.value
	updateExportingContainer()
})
exportingContainer.addProgressBar("Rendering", 100, 0)
exportingContainer.addProgressBar("Converting", 100, 0)
exportingContainer.addButton("Stop", () => {
	websockets[SELECTEDPROJECT].close()
})

function updateExportingContainer() {
	if (SELECTEDPROJECT == null) {
		exportingContainer.removeControl("Rendering")
		exportingContainer.removeControl("Converting")
		exportingContainer.addProgressBar("Rendering", 100, 0)
		exportingContainer.addProgressBar("Converting", 100, 0)
		document.getElementById("exportingContainer").style.display = "none"
		window.onbeforeunload = null
		return
	}
	window.onbeforeunload = () => {
		return "Are you sure?"
	}
	document.querySelector(".qs_select").value = String(SELECTEDPROJECT)
	exportingContainer.removeControl("Rendering")
	exportingContainer.removeControl("Converting")
	exportingContainer.addProgressBar("Rendering", 100, EXPORTINGDATA[SELECTEDPROJECT].rendering)
	exportingContainer.addProgressBar("Converting", 100, EXPORTINGDATA[SELECTEDPROJECT].converting)
	if (EXPORTINGDATA[SELECTEDPROJECT].type === "image") {
		exportingContainer.hideControl("Converting")
	}
	if (document.getElementById("exportContainer").style.display === "none") {
		document.getElementById("exportingContainer").style.display = "none"
		return
	}
	document.getElementById("exportingContainer").style.display = "block"
}
updateExportingContainer()
