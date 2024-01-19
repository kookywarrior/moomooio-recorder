// ==UserScript==
// @name         MooMoo.io Recorder
// @description  Record In Game Data
// @author       KOOKY WARRIOR
// @match        *://*.moomoo.io/*
// @icon         https://moomoo.io/img/favicon.png?v=1
// @require      https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min.js
// @require      https://greasyfork.org/scripts/478839-moomoo-io-packet-code/code/MooMooio%20Packet%20Code.js?version=1275938
// @run-at       document-start
// @grant        unsafeWindow
// @license      MIT
// @version      1.0
// @namespace    https://greasyfork.org/users/999838
// @downloadURL  https://github.com/kookywarrior/moomooio-recorder/raw/main/userscript.user.js
// @updateURL    https://github.com/kookywarrior/moomooio-recorder/raw/main/userscript.user.js
// ==/UserScript==

const VERSION = 1
const PORT = 6789
const PACKETMANAGER = {
	SEND: {},
	RECEIVE: {}
}
for (const key in PACKETCODE.RECEIVE) {
	PACKETMANAGER.RECEIVE[PACKETCODE.RECEIVE[key]] = key
}

;(() => {
	unsafeWindow.recorder = true

	Event.prototype.stopPropagation = () => {
		return
	}

	const recordButton = document.createElement("div")
	recordButton.id = "recordButton"
	recordButton.className = "uiElement gameButton"
	recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe837;</i>`

	var items = {
		groups: [
			{
				id: 0,
				name: "food",
				layer: 0
			},
			{
				id: 1,
				name: "walls",
				place: true,
				limit: 30,
				layer: 0
			},
			{
				id: 2,
				name: "spikes",
				place: true,
				limit: 15,
				layer: 0
			},
			{
				id: 3,
				name: "mill",
				place: true,
				limit: 7,
				layer: 1
			},
			{
				id: 4,
				name: "mine",
				place: true,
				limit: 1,
				layer: 0
			},
			{
				id: 5,
				name: "trap",
				place: true,
				limit: 6,
				layer: -1
			},
			{
				id: 6,
				name: "booster",
				place: true,
				limit: 12,
				layer: -1
			},
			{
				id: 7,
				name: "turret",
				place: true,
				limit: 2,
				layer: 1
			},
			{
				id: 8,
				name: "watchtower",
				place: true,
				limit: 12,
				layer: 1
			},
			{
				id: 9,
				name: "buff",
				place: true,
				limit: 4,
				layer: -1
			},
			{
				id: 10,
				name: "spawn",
				place: true,
				limit: 1,
				layer: -1
			},
			{
				id: 11,
				name: "sapling",
				place: true,
				limit: 2,
				layer: 0
			},
			{
				id: 12,
				name: "blocker",
				place: true,
				limit: 3,
				layer: -1
			},
			{
				id: 13,
				name: "teleporter",
				place: true,
				limit: 2,
				layer: -1
			}
		],
		projectiles: [
			{
				indx: 0,
				layer: 0,
				src: "arrow_1",
				dmg: 25,
				speed: 1.6,
				scale: 103,
				range: 1000
			},
			{
				indx: 1,
				layer: 1,
				dmg: 25,
				scale: 20
			},
			{
				indx: 0,
				layer: 0,
				src: "arrow_1",
				dmg: 35,
				speed: 2.5,
				scale: 103,
				range: 1200
			},
			{
				indx: 0,
				layer: 0,
				src: "arrow_1",
				dmg: 30,
				speed: 2,
				scale: 103,
				range: 1200
			},
			{
				indx: 1,
				layer: 1,
				dmg: 16,
				scale: 20
			},
			{
				indx: 0,
				layer: 0,
				src: "bullet_1",
				dmg: 50,
				speed: 3.6,
				scale: 160,
				range: 1400
			}
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
		]
	}
	items.list = [
		{
			group: items.groups[0],
			name: "apple",
			desc: "restores 20 health when consumed",
			req: ["food", 10],
			consume: function (doer) {
				return doer.changeHealth(20, doer)
			},
			scale: 22,
			holdOffset: 15
		},
		{
			age: 3,
			group: items.groups[0],
			name: "cookie",
			desc: "restores 40 health when consumed",
			req: ["food", 15],
			consume: function (doer) {
				return doer.changeHealth(40, doer)
			},
			scale: 27,
			holdOffset: 15
		},
		{
			age: 7,
			group: items.groups[0],
			name: "cheese",
			desc: "restores 30 health and another 50 over 5 seconds",
			req: ["food", 25],
			consume: function (doer) {
				if (doer.changeHealth(30, doer) || doer.health < 100) {
					doer.dmgOverTime.dmg = -10
					doer.dmgOverTime.doer = doer
					doer.dmgOverTime.time = 5
					return true
				}
				return false
			},
			scale: 27,
			holdOffset: 15
		},
		{
			group: items.groups[1],
			name: "wood wall",
			desc: "provides protection for your village",
			req: ["wood", 10],
			projDmg: true,
			health: 380,
			scale: 50,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 3,
			group: items.groups[1],
			name: "stone wall",
			desc: "provides improved protection for your village",
			req: ["stone", 25],
			health: 900,
			scale: 50,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 7,
			pre: 1,
			group: items.groups[1],
			name: "castle wall",
			desc: "provides powerful protection for your village",
			req: ["stone", 35],
			health: 1500,
			scale: 52,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			group: items.groups[2],
			name: "spikes",
			desc: "damages enemies when they touch them",
			req: ["wood", 20, "stone", 5],
			health: 400,
			dmg: 20,
			scale: 49,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5
		},
		{
			age: 5,
			group: items.groups[2],
			name: "greater spikes",
			desc: "damages enemies when they touch them",
			req: ["wood", 30, "stone", 10],
			health: 500,
			dmg: 35,
			scale: 52,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5
		},
		{
			age: 9,
			pre: 1,
			group: items.groups[2],
			name: "poison spikes",
			desc: "poisons enemies when they touch them",
			req: ["wood", 35, "stone", 15],
			health: 600,
			dmg: 30,
			pDmg: 5,
			scale: 52,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5
		},
		{
			age: 9,
			pre: 2,
			group: items.groups[2],
			name: "spinning spikes",
			desc: "damages enemies when they touch them",
			req: ["wood", 30, "stone", 20],
			health: 500,
			dmg: 45,
			turnSpeed: 0.003,
			scale: 52,
			spritePadding: -23,
			holdOffset: 8,
			placeOffset: -5
		},
		{
			group: items.groups[3],
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
			placeOffset: 5
		},
		{
			age: 5,
			pre: 1,
			group: items.groups[3],
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
			placeOffset: 5
		},
		{
			age: 8,
			pre: 1,
			group: items.groups[3],
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
			placeOffset: 5
		},
		{
			age: 5,
			group: items.groups[4],
			type: 2,
			name: "mine",
			desc: "allows you to mine stone",
			req: ["wood", 20, "stone", 100],
			iconLineMult: 12,
			scale: 65,
			holdOffset: 20,
			placeOffset: 0
		},
		{
			age: 5,
			group: items.groups[11],
			type: 0,
			name: "sapling",
			desc: "allows you to farm wood",
			req: ["wood", 150],
			iconLineMult: 12,
			colDiv: 0.5,
			scale: 110,
			holdOffset: 50,
			placeOffset: -15
		},
		{
			age: 4,
			group: items.groups[5],
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
			placeOffset: -5
		},
		{
			age: 4,
			group: items.groups[6],
			name: "boost pad",
			desc: "provides boost when stepped on",
			req: ["stone", 20, "wood", 5],
			ignoreCollision: true,
			boostSpeed: 1.5,
			health: 150,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 7,
			group: items.groups[7],
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
			placeOffset: -5
		},
		{
			age: 7,
			group: items.groups[8],
			name: "platform",
			desc: "platform to shoot over walls and cross over water",
			req: ["wood", 20],
			ignoreCollision: true,
			zIndex: 1,
			health: 300,
			scale: 43,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 7,
			group: items.groups[9],
			name: "healing pad",
			desc: "standing on it will slowly heal you",
			req: ["wood", 30, "food", 10],
			ignoreCollision: true,
			healCol: 15,
			health: 400,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 9,
			group: items.groups[10],
			name: "spawn pad",
			desc: "you will spawn here when you die but it will dissapear",
			req: ["wood", 100, "stone", 100],
			health: 400,
			ignoreCollision: true,
			spawnPoint: true,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 7,
			group: items.groups[12],
			name: "blocker",
			desc: "blocks building in radius",
			req: ["wood", 30, "stone", 25],
			ignoreCollision: true,
			blocker: 300,
			health: 400,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5
		},
		{
			age: 7,
			group: items.groups[13],
			name: "teleporter",
			desc: "teleports you to a random point on the map",
			req: ["wood", 60, "stone", 60],
			ignoreCollision: true,
			teleport: true,
			health: 200,
			colDiv: 0.7,
			scale: 45,
			holdOffset: 20,
			placeOffset: -5
		}
	]

	for (var i = 0; i < items.list.length; ++i) {
		items.list[i].id = i
		if (items.list[i].pre) items.list[i].pre = i - items.list[i].pre
	}

	const config = {
		gatherWiggle: 10,
		hitReturnRatio: 0.25,
		hitAngle: 1.5707963267948966,
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
		mapScale: 14400,
		mapPingScale: 40
	}

	const UTILS = {
		lerp: function (value1, value2, amount) {
			return value1 + (value2 - value1) * amount
		},
		getDistance: function (x1, y1, x2, y2) {
			return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2)
		},
		getDirection: function (x1, y1, x2, y2) {
			return Math.atan2(y1 - y2, x1 - x2)
		},
		NewToOld: function (packetCode, type) {
			return PACKETMANAGER[type][packetCode]
		}
	}

	var moofoll = unsafeWindow.localStorage.getItem("moofoll")
	var players = []
	var player = null
	var playerSID = null
	var camX, camY
	var lockDir = false
	var lockDirMouse = {
		x: 0,
		y: 0
	}
	var tmpLockDir = Symbol("lockDir")
	Object.defineProperty(Object.prototype, "lockDir", {
		get() {
			return this[tmpLockDir]
		},
		set(value) {
			this[tmpLockDir] = value
			if (this.sid === playerSID) {
				lockDir = value
				lockDirMouse.x = canvasMouse.x
				lockDirMouse.y = canvasMouse.y
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "lockDir", data: [lockDir, lockDirMouse.x, lockDirMouse.y] }])
			}
		}
	})
	class Player {
		constructor(id, sid) {
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
			this.lastDeath = null
			this.mapMarker = null
			this.tails = {}
			this.skins = {}
			this.player_isPlayer = true
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
			this.chatMessage = null
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
		toJSON() {
			return {
				id: this.id,
				sid: this.sid,
				team: this.team,
				skinIndex: this.skinIndex,
				tailIndex: this.tailIndex,
				skinColor: this.skinColor,
				iconIndex: this.iconIndex,
				skinRot: this.skinRot,
				scale: this.scale,
				maxHealth: this.maxHealth,
				dt: this.dt,
				player_isPlayer: this.player_isPlayer,
				chatCountdown: this.chatCountdown,
				chatMessage: this.chatMessage,
				animTime: this.animTime,
				animSpeed: this.animSpeed,
				buildIndex: this.buildIndex,
				weaponIndex: this.weaponIndex,
				health: this.health,
				targetAngle: this.targetAngle,
				dir: this.dir,
				dirPlus: this.dirPlus,
				zIndex: this.zIndex,
				name: this.name,
				x: this.x,
				y: this.y,
				x2: this.x2,
				y2: this.y2,
				visible: this.visible,
				tmpRatio: this.tmpRatio,
				animIndex: this.animIndex,
				maxXP: this.maxXP,
				XP: this.XP,
				age: this.age,
				kills: this.kills,
				upgradePoints: this.upgradePoints,
				upgrAge: this.upgrAge,
				items: this.items,
				weapons: this.weapons,
				itemCounts: this.itemCounts,
				wood: this.wood,
				food: this.food,
				stone: this.stone,
				points: this.points,
				forcePos: this.forcePos,
				t1: this.t1,
				t2: this.t2,
				x1: this.x1,
				y1: this.y1,
				d1: this.d1,
				d2: this.d2,
				weaponVariant: this.weaponVariant,
				isLeader: this.isLeader,
				isOwner: this.isOwner,
				lastDeath: this.lastDeath,
				mapMarker: this.mapMarker,
				tails: this.tails,
				skins: this.skins
			}
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
		constructor(sid, x, y, dir, scale, type, data, setSID, owner) {
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
		toJSON() {
			return {
				sid: this.sid,
				x: this.x,
				y: this.y,
				dir: this.dir,
				xWiggle: this.xWiggle,
				yWiggle: this.yWiggle,
				scale: this.scale,
				type: this.type,
				owner: this.owner,
				id: this.id,
				name: this.name,
				object_isItem: this.object_isItem,
				group: this.group,
				colDiv: this.colDiv,
				blocker: this.blocker,
				hideFromEnemy: this.hideFromEnemy,
				turnSpeed: this.turnSpeed,
				layer: this.layer
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

	function randFloat(min, max) {
		return Math.random() * (max - min + 1) + min
	}
	const randomAngle = [randFloat(0, Math.PI), randFloat(0, Math.PI), randFloat(0, Math.PI), randFloat(0, Math.PI)]

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
		},
		{
			id: 9,
			name: "💀MOOFIE",
			src: "wolf_2",
			hostile: true,
			fixedSpawn: true,
			dontRun: true,
			hitScare: 50,
			spawnDelay: 60000,
			noTrap: true,
			nameScale: 35,
			dmg: 12,
			colDmg: 100,
			killScore: 3000,
			health: 9000,
			weightM: 0.45,
			speed: 0.0015,
			turnSpeed: 0.0025,
			scale: 94,
			viewRange: 1440,
			chargePlayer: true,
			drop: ["food", 3000],
			minSpawnRange: 0.85,
			maxSpawnRange: 0.9
		},
		{
			id: 10,
			name: "💀Wolf",
			src: "wolf_1",
			hostile: true,
			fixedSpawn: true,
			dontRun: true,
			hitScare: 50,
			spawnDelay: 30000,
			dmg: 10,
			killScore: 700,
			health: 500,
			weightM: 0.45,
			speed: 0.00115,
			turnSpeed: 0.0025,
			scale: 88,
			viewRange: 1440,
			chargePlayer: true,
			drop: ["food", 400],
			minSpawnRange: 0.85,
			maxSpawnRange: 0.9
		},
		{
			id: 11,
			name: "💀Bully",
			src: "bull_1",
			hostile: true,
			fixedSpawn: true,
			dontRun: true,
			hitScare: 50,
			dmg: 20,
			killScore: 5000,
			health: 5000,
			spawnDelay: 100000,
			weightM: 0.45,
			speed: 0.00115,
			turnSpeed: 0.0025,
			scale: 94,
			viewRange: 1440,
			chargePlayer: true,
			drop: ["food", 800],
			minSpawnRange: 0.85,
			maxSpawnRange: 0.9
		}
	]
	class AI {
		constructor(sid) {
			this.sid = sid
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
		toJSON() {
			return {
				sid: this.sid,
				tmpRatio: this.tmpRatio,
				animIndex: this.animIndex,
				x: this.x,
				y: this.y,
				dir: this.dir,
				dirPlus: this.dirPlus,
				index: this.index,
				src: this.src,
				name: this.name,
				scale: this.scale,
				maxHealth: this.maxHealth,
				health: this.health,
				x2: this.x2,
				y2: this.y2,
				d2: this.d2,
				forcePos: this.forcePos,
				visible: this.visible,
				t1: this.t1,
				t2: this.t2,
				x1: this.x1,
				y1: this.y1,
				d1: this.d1,
				dt: this.dt
			}
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
		constructor(sid) {
			this.sid = sid
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
		toJSON() {
			return {
				ignoreObj: this.ignoreObj,
				layer: this.layer,
				src: this.src,
				sid: this.sid,
				active: this.active,
				indx: this.indx,
				x: this.x,
				y: this.y,
				dir: this.dir,
				skipMov: this.skipMov,
				speed: this.speed,
				range: this.range
			}
		}
	}

	var texts = []
	class Text {
		constructor() {}
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
		toJSON() {
			return {
				x: this.x,
				y: this.y,
				color: this.color,
				scale: this.scale,
				startScale: this.startScale,
				maxScale: this.maxScale,
				scaleSpeed: this.scaleSpeed,
				speed: this.speed,
				life: this.life,
				text: this.text
			}
		}
	}

	var minimapData
	var mapPings = []
	var tmpPing
	class MapPing {
		constructor() {}
		init(x, y) {
			this.scale = 0
			this.x = x
			this.y = y
			this.active = true
		}
		update(delta) {
			if (this.active) {
				this.scale += 0.05 * delta
				if (this.scale >= config.mapPingScale) {
					this.active = false
				}
			}
		}
		toJSON() {
			return {
				x: this.x,
				y: this.y,
				scale: this.scale,
				active: this.active
			}
		}
	}

	let init = false
	const originalSend = WebSocket.prototype.send
	WebSocket.prototype.send = function () {
		originalSend.apply(this, arguments)
		this.send = originalSend
		if (!init) {
			init = true
			this.addEventListener("message", (e) => {
				try {
					let data = new Uint8Array(e.data)
					const parsed = msgpack.decode(data)
					const type = parsed[0]
					const code = PACKETMANAGER[type]
					data = parsed[1]
					const events = {
						setupGame,
						addPlayer,
						removePlayer,
						updatePlayers,
						updatePlayerValue,
						receiveChat,
						updateItemCounts,
						updateAge,
						updateUpgrades,
						updateItems,
						setPlayerTeam,
						updateStoreItems,
						loadGameObject,
						killPlayer,
						killObject,
						killObjects,
						updateHealth,
						gatherAnimation,
						wiggleGameObject,
						shootTurret,
						loadAI,
						animateAI,
						addProjectile,
						remProjectile,
						showText,
						updateLeaderboard,
						pingMap,
						updateMinimap
					}
					
					if (type != "io-init" && events[code] != null) {
						unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type, data }])
						events[code].apply(undefined, data)
					}
				} catch (error) {}
			})
		}
	}

	var leaderboardData = [],
		fontHeight = {},
		chatBoxWidth = 0,
		itemInfoData = {},
		allianceNotificationName,
		hoverData = ["none"],
		inGame = false,
		disconnect = false
	function updateLeaderboard(data) {
		leaderboardData = data
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
		if (isYou) {
			tmpPlayer.mySpawn()
			camX = player.x
			camY = player.y
		}
	}

	function removePlayer(id) {
		for (var i = 0; i < players.length; i++) {
			if (players[i].id == id) {
				players.splice(i--, 1)
				break
			}
		}
	}

	function updatePlayers(data) {
		var tmpTime = Date.now()
		for (let i = 0; i < players.length; ++i) {
			players[i].forcePos = !players[i].visible
			players[i].visible = false
		}
		for (let i = 0; i < data.length; i += 13) {
			var tmpObj = findPlayerBySID(data[i])
			if (tmpObj) {
				tmpObj.t1 = tmpObj.t2 === undefined ? tmpTime : tmpObj.t2
				tmpObj.t2 = tmpTime
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

	function killPlayer() {
		inGame = false
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

	function loadAI(data) {
		for (let i = 0; i < ais.length; ++i) {
			ais[i].forcePos = !ais[i].visible
			ais[i].visible = false
		}
		if (data) {
			var tmpTime = Date.now()
			for (let i = 0; i < data.length; ) {
				var tmpObj = findAIBySID(data[i])
				if (tmpObj) {
					tmpObj.index = data[i + 1]
					tmpObj.t1 = tmpObj.t2 === undefined ? tmpTime : tmpObj.t2
					tmpObj.t2 = tmpTime
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

	function updateGame() {
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

		var lastTime = now - 1000 / 9
		var tmpDiff
		var tmpObj
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

		for (var i = 0; i < players.length; ++i) {
			tmpObj = players[i]
			if (tmpObj.zIndex == 0 || tmpObj.zIndex == 1) {
				tmpObj.animate(delta)
				if (tmpObj.visible) {
					tmpObj.skinRot += 0.002 * delta
				}
			}
			if (tmpObj.visible && tmpObj.chatCountdown > 0) {
				tmpObj.chatCountdown -= delta
				if (tmpObj.chatCountdown <= 0) {
					tmpObj.chatCountdown = 0
				}
			}
		}

		for (let i = 0; i < ais.length; ++i) {
			tmpObj = ais[i]
			if (tmpObj.visible) {
				tmpObj.animate(delta)
			}
		}

		for (var i = 0; i < gameObjects.length; ++i) {
			tmpObj = gameObjects[i]
			tmpObj.update(delta)
		}

		for (var i = 0; i < projectiles.length; ++i) {
			tmpObj = projectiles[i]
			if (tmpObj.active) {
				tmpObj.update(delta)
			}
		}

		for (var i = 0; i < texts.length; ++i) {
			if (texts[i].life) {
				texts[i].update(delta)
			}
		}

		for (let i = 0; i < mapPings.length; ++i) {
			tmpPing = mapPings[i]
			tmpPing.update(delta)
		}
	}

	let ws,
		websocketReady = false,
		errorCountdown = false,
		markerCountdown = false,
		wsInterval = null
	unsafeWindow.sendToLocal = async (packet, data) => {
		if (websocketReady) {
			ws.send(JSON.stringify([packet, data]))
		}
	}

	unsafeWindow.recordStart = async () => {
		if (unsafeWindow.innerWidth <= 768) {
			console.error("Screen width must be more than 768px")
			errorCountdown = true
			markerCountdown = false
			recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe000;</i>`
			recordButton.style.color = "red"
			setTimeout(() => {
				if (!errorCountdown) return
				if (!websocketReady) {
					recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe837;</i>`
					recordButton.style.color = null
				} else {
					recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe047;</i>`
					recordButton.style.color = "red"
				}
			}, 3000)
			return
		}
		ws = new WebSocket("ws://localhost:" + PORT)
		ws.onopen = () => {
			websocketReady = true
			errorCountdown = false
			markerCountdown = false
			recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe047;</i>`
			recordButton.style.color = "red"

			unsafeWindow.sendToLocal("recordStart", [
				Date.now().toString(),
				unsafeWindow.innerWidth,
				unsafeWindow.innerHeight,
				randomAngle,
				{
					inGame,
					disconnect,
					playerSID,
					moofoll,
					camX,
					camY,
					lockDir,
					lockDirMouse,
					canvasMouse,
					mouse,
					minimapData,
					leaderboardData,
					fontHeight,
					visibility: {
						storeMenu: document.getElementById("storeMenu").style.display === "block",
						allianceMenu: document.getElementById("allianceMenu").style.display === "block",
						chatHolder: document.getElementById("chatHolder").style.display === "block",
						noticationDisplay: document.getElementById("noticationDisplay").style.display === "block",
						upgradeHolder: document.getElementById("upgradeHolder").style.display === "block"
					},
					inputText: {
						chatBox: document.getElementById("chatBox").value,
						allianceInput: document.getElementById("allianceInput") ? document.getElementById("allianceInput").value : ""
					},
					chatBoxLeft: document.getElementById("chatBox").scrollLeft,
					chatBoxWidth,
					itemInfoData,
					allianceNotificationName,
					hoverData,
					storeData: unsafeWindow.updateStoreData,
					updatePositionData: unsafeWindow.updatePositionData,
					allianceData: unsafeWindow.updateAllianceData,
					players: JSON.parse(JSON.stringify(players)),
					ais: JSON.parse(JSON.stringify(ais)),
					gameObjects: JSON.parse(JSON.stringify(gameObjects)),
					projectiles: JSON.parse(JSON.stringify(projectiles)),
					texts: JSON.parse(JSON.stringify(texts)),
					mapPings: JSON.parse(JSON.stringify(mapPings))
				},
				VERSION
			])
			lastCanvasMouse = canvasMouse
			lastMouse = mouse
			if (wsInterval == null) {
				wsInterval = setInterval(() => {
					unsafeWindow.sendToLocal("addBreak", [
						now.toString(),
						{
							inGame,
							disconnect,
							playerSID,
							moofoll,
							camX,
							camY,
							lockDir,
							lockDirMouse,
							canvasMouse,
							mouse,
							minimapData,
							leaderboardData,
							fontHeight,
							visibility: {
								storeMenu: document.getElementById("storeMenu").style.display === "block",
								allianceMenu: document.getElementById("allianceMenu").style.display === "block",
								chatHolder: document.getElementById("chatHolder").style.display === "block",
								noticationDisplay: document.getElementById("noticationDisplay").style.display === "block",
								upgradeHolder: document.getElementById("upgradeHolder").style.display === "block"
							},
							inputText: {
								chatBox: document.getElementById("chatBox").value,
								allianceInput: document.getElementById("allianceInput") ? document.getElementById("allianceInput").value : ""
							},
							chatBoxLeft: document.getElementById("chatBox").scrollLeft,
							chatBoxWidth,
							itemInfoData,
							allianceNotificationName,
							hoverData,
							storeData: unsafeWindow.updateStoreData,
							updatePositionData: unsafeWindow.updatePositionData,
							allianceData: unsafeWindow.updateAllianceData,
							players: JSON.parse(JSON.stringify(players)),
							ais: JSON.parse(JSON.stringify(ais)),
							gameObjects: JSON.parse(JSON.stringify(gameObjects)),
							projectiles: JSON.parse(JSON.stringify(projectiles)),
							texts: JSON.parse(JSON.stringify(texts)),
							mapPings: JSON.parse(JSON.stringify(mapPings))
						}
					])
					lastCanvasMouse = canvasMouse
					lastMouse = mouse
				}, 60 * 1000 * 2)
			}
		}
		ws.onclose = (event) => {
			websocketReady = false
			if (event.reason === "diffVersion") {
				console.error("The server version and userscript version does not match. Please update either of them.")
				errorCountdown = true
				markerCountdown = false
				recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe000;</i>`
				recordButton.style.color = "red"
				setTimeout(() => {
					if (!errorCountdown) return
					if (!websocketReady) {
						recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe837;</i>`
						recordButton.style.color = null
					} else {
						recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe047;</i>`
						recordButton.style.color = "red"
					}
				}, 3000)
			}
			if (!errorCountdown && !markerCountdown) {
				recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe837;</i>`
				recordButton.style.color = null
			}
			if (wsInterval != null) {
				clearInterval(wsInterval)
				wsInterval = null
			}
		}
		ws.onerror = () => {
			errorCountdown = true
			markerCountdown = false
			recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe000;</i>`
			recordButton.style.color = "red"
			setTimeout(() => {
				if (!errorCountdown) return
				if (!websocketReady) {
					recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe837;</i>`
					recordButton.style.color = null
				} else {
					recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe047;</i>`
					recordButton.style.color = "red"
				}
			}, 3000)
		}
	}

	unsafeWindow.recordStop = () => {
		ws.close()
		ws = null
		if (document.getElementById("stopRecordingWhenDisconnected") != null) {
			document.getElementById("stopRecordingWhenDisconnected").remove()
		}
	}

	recordButton.addEventListener("click", () => {
		errorCountdown = false
		markerCountdown = false
		if (websocketReady) {
			unsafeWindow.recordStop()
		} else {
			unsafeWindow.recordStart()
		}
	})

	recordButton.addEventListener("contextmenu", (e) => {
		e.preventDefault()
		if (websocketReady) {
			unsafeWindow.sendToLocal("addMarker", [Date.now().toString()])
			markerCountdown = true
			errorCountdown = false
			recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xf10d;</i>`
			recordButton.style.color = "lightgreen"
			setTimeout(() => {
				if (!markerCountdown) return
				if (!websocketReady) {
					recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe837;</i>`
					recordButton.style.color = null
				} else {
					recordButton.innerHTML = `<i class="material-icons" style="font-size:40px;vertical-align:middle">&#xe047;</i>`
					recordButton.style.color = "red"
				}
			}, 1000)
		}
	})

	var mouse = { x: 0, y: 0 }
	var canvasMouse = { x: 0, y: 0 }
	var lastCanvasMouse = { x: 0, y: 0 }
	var lastMouse = { x: 0, y: 0 }

	document.addEventListener("DOMContentLoaded", () => {
		function defineElementAndFontSize() {
			fontHeight = {}
			const array = [31, 22, 26, 24, 20, 30, 170, 45, 25]

			const tmpDiv = document.createElement("div")
			tmpDiv.innerHTML = "a"
			tmpDiv.style = "position: absolute; top: -500px; left: 0px; font-family: Hammersmith One"
			document.body.appendChild(tmpDiv)
			for (let i = 0; i < array.length; i++) {
				tmpDiv.style.fontSize = array[i] + "px"
				fontHeight[array[i]] = tmpDiv.offsetHeight
			}
			tmpDiv.remove()

			const tmpInput = document.createElement("input")
			tmpInput.style = "position: absolute; top: -500px; left: 0px; font-family: Hammersmith One; font-size: 20px; border: 0; padding: 0; margin: 0;"
			document.body.appendChild(tmpInput)
			chatBoxWidth = tmpInput.clientWidth
			tmpInput.remove()
		}
		defineElementAndFontSize()

		unsafeWindow.addEventListener("resize", () => {
			defineElementAndFontSize()
			if (websocketReady) {
				errorCountdown = false
				markerCountdown = false
				unsafeWindow.recordStop()
			}
		})
		unsafeWindow.addEventListener("keydown", (event) => {
			function keysActive() {
				return document.getElementById("allianceMenu").style.display != "block" && document.getElementById("chatHolder").style.display != "block"
			}
			var keyNum = event.which || event.keyCode || 0
			if (player && keyNum === 67 && !event.repeat && keysActive()) {
				if (!player.mapMarker) {
					player.mapMarker = {}
				}
				player.mapMarker.x = player.x
				player.mapMarker.y = player.y
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "markMap", data: [player.mapMarker.x, player.mapMarker.y] }])
			}
		})

		unsafeWindow.addEventListener("mousemove", (e) => {
			mouse = {
				x: e.clientX,
				y: e.clientY
			}
		})
		document.getElementById("touch-controls-fullscreen").addEventListener("mousemove", (e) => {
			canvasMouse = {
				x: e.clientX,
				y: e.clientY
			}
		})

		const style = document.createElement("style")
		style.innerHTML = `
            #recordButton {
                right: 450px;
            }
            @media only screen and (max-width: 896px) {
                #recordButton {
                    top: inherit;
                    left: 60px;
                }
            }
			#actionBar {
				font-size: 0;
				bottom: 20px;
				position: absolute;
			}
			#ageBarContainer {
				font-size: 0;
				bottom: 96px;
				position: absolute;
			}
			#ageText {
				position: absolute;
			}
			.notifButton {
				font-size: 0;
			}
			.material-icons {
				pointer-events: none;
			}
        `
		document.head.appendChild(style)
		document.getElementById("gameUI").appendChild(recordButton)

		const observeStyle = new MutationObserver((mutations) => {
			mutations.forEach((event) => {
				unsafeWindow.sendToLocal("addData", [
					Date.now().toString(),
					{ type: "changeVisibility", data: [event.target.id, event.target.style.display === "block"] }
				])

				if (event.target.id === "chatHolder" && event.target.style.display !== "block") {
					unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeInputText", data: ["chatBox", ""] }])
				}
			})
		})
		const observeStyleConfig = {
			attributes: true,
			attributeFilter: ["style"]
		}
		observeStyle.observe(document.getElementById("storeMenu"), observeStyleConfig)
		observeStyle.observe(document.getElementById("allianceMenu"), observeStyleConfig)
		observeStyle.observe(document.getElementById("chatHolder"), observeStyleConfig)
		observeStyle.observe(document.getElementById("noticationDisplay"), observeStyleConfig)
		observeStyle.observe(document.getElementById("upgradeHolder"), observeStyleConfig)

		const observeClass = new MutationObserver((mutations) => {
			mutations.forEach((event) => {
				itemInfoData = Array.from(event.target.classList).includes("visible")
					? {
							name: document.getElementById("itemInfoName").innerText,
							desc: document.getElementById("itemInfoDesc").innerText,
							req: Array.from(document.getElementsByClassName("itemInfoReq"), (e) => e.innerText),
							lmt: Array.from(document.getElementsByClassName("itemInfoLmt"), (e) => e.innerText)
					  }
					: {}
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "showItemInfo", data: [itemInfoData] }])
			})
		})
		observeClass.observe(document.getElementById("itemInfoHolder"), {
			attributes: true,
			attributeFilter: ["class"]
		})

		const observerChildList = new MutationObserver((mutations) => {
			mutations.forEach((event) => {
				if (event.target.id === "noticationDisplay") {
					allianceNotificationName = document.querySelector(".notificationText").innerText
					unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "notificationName", data: [allianceNotificationName] }])
				} else if (event.target.id === "loadingText" && event.target.textContent === "disconnectedreload") {
					disconnect = true
					inGame = false
					unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "disconnectEvent", data: [] }])
					if (websocketReady) {
						event.target.innerHTML += `<div id="stopRecordingWhenDisconnected" class="ytLink" style="cursor: pointer;" onclick="window.recordStop()">stop recording</div>`
					}
					observerChildList.disconnect()
				}
			})
		})
		observerChildList.observe(document.getElementById("noticationDisplay"), { childList: true })
		observerChildList.observe(document.getElementById("loadingText"), { childList: true })

		document.addEventListener("input", (event) => {
			if (event.target?.id === "allianceInput") {
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeInputText", data: ["allianceInput", event.target.value] }])
			} else if (event.target?.id === "chatBox") {
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeInputText", data: ["chatBox", event.target.value] }])
			}
		})

		var oldData = "none"
		document.addEventListener("mouseover", (event) => {
			if (event.target.classList.contains("actionBarItem")) {
				hoverData = [event.target.id.includes("actionBarItem") ? "actionBarItem" : "upgradeBarItem", event.target.id]
			} else if (event.target.classList.contains("joinAlBtn")) {
				hoverData = [event.target.parentNode.classList.contains("allianceItem") ? "allianceItem" : "storeItem", event.target.parentNode.id]
			} else if (event.target.classList.contains("storeTab")) {
				hoverData = ["storeTab", event.target.innerText]
			} else if (event.target.classList.contains("gameButton") && event.target.id !== "recordButton") {
				hoverData = ["gameButton", event.target.id]
			} else if (event.target.classList.contains("allianceButtonM")) {
				hoverData = ["allianceButtonM"]
			} else if (event.target.classList.contains("notifButton")) {
				hoverData = ["notifButton", event.target.querySelector(".material-icons").style.color]
			} else if (event.target.id === "chatBox" || event.target.id === "allianceInput") {
				hoverData = ["inputText"]
			} else {
				hoverData = ["none"]
			}

			if (oldData !== hoverData[0]) {
				oldData = hoverData
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "hoverChange", data: hoverData }])
			}
		})

		document.getElementById("chatBox").addEventListener("scroll", () => {
			unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeInputScroll", data: [document.getElementById("chatBox").scrollLeft] }])
		})
	})

	var now,
		delta,
		lastUpdate = Date.now()
	function doUpdate() {
		now = Date.now()
		delta = now - lastUpdate
		lastUpdate = now
		if (websocketReady) {
			if (lastCanvasMouse.x !== canvasMouse.x) {
				lastCanvasMouse.x = canvasMouse.x
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeCanvasMouse", data: ["x", canvasMouse.x] }])
			}
			if (lastCanvasMouse.y !== canvasMouse.y) {
				lastCanvasMouse.y = canvasMouse.y
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeCanvasMouse", data: ["y", canvasMouse.y] }])
			}
			if (lastMouse.x !== mouse.x) {
				lastMouse.x = mouse.x
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeMouse", data: ["x", mouse.x] }])
			}
			if (lastMouse.y !== mouse.y) {
				lastMouse.y = mouse.y
				unsafeWindow.sendToLocal("addData", [Date.now().toString(), { type: "changeMouse", data: ["y", mouse.y] }])
			}
		}

		updateGame()
		unsafeWindow.requestAnimationFrame(doUpdate)
	}
	doUpdate()
})()
