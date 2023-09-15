const fs = require("fs")
const { loadImage, registerFont, createCanvas } = require("canvas")
const {
	resolution,
	frameRate,
	renderFrame,
	renderStart,
	renderEnd,
	renderCursor,
	cursorSize,
	dataPath,
	outputPath,
	outputName
} = require("../setup.json")
const items = require("./items.json")
const store = require("./store")
const ffmpegStatic = require("ffmpeg-static")
const ffmpeg = require("fluent-ffmpeg")

registerFont("render/HammersmithOne.ttf", { family: "Hammersmith One" })

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

const UTILS = {}
UTILS.randInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
UTILS.randFloat = function (min, max) {
	return Math.random() * (max - min + 1) + min
}
UTILS.lerp = function (value1, value2, amount) {
	return value1 + (value2 - value1) * amount
}
UTILS.getDistance = function (x1, y1, x2, y2) {
	return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2)
}
UTILS.getDirection = function (x1, y1, x2, y2) {
	return Math.atan2(y1 - y2, x1 - x2)
}
UTILS.fixTo = function (n, v) {
	return parseFloat(n.toFixed(v))
}
UTILS.kFormat = function (num) {
	return num > 999 ? (num / 1000).toFixed(1) + "k" : num
}

startRender(resolution, frameRate, renderFrame, renderStart, renderEnd, renderCursor, cursorSize, dataPath, outputPath, outputName)
async function startRender(resolution, frameRate, renderFrame, renderStart, renderEnd, renderCursor, cursorSize, dataPath, outputPath, outputName) {
	if (fs.existsSync("tmp")) {
		await fs.promises.rm("tmp", { recursive: true })
	}
	await fs.promises.mkdir("tmp", { recursive: true })
	if (!fs.existsSync(dataPath)) {
		console.log("Data path not found")
		return
	}
	if (!fs.existsSync(outputPath)) {
		console.log("Output path not found")
		return
	}
	const startData = require(`${dataPath}/start.json`)
	const datas = require(`${dataPath}/data.json`)
	const { duration, count, startTime } = require(`${dataPath}/info.json`)
	outputName = outputName || startTime

	var outlineColor = "#525252",
		darkOutlineColor = "#3d3f42",
		outlineWidth = 5.5
	var hats = store.hats,
		accessories = store.accessories
	var canvasWidth, canvasHeight
	var storeWidth, storeHeight
	var allianceWidth, allianceHeight
	var actionBarWidth, actionBarHeight
	var descriptionWidth, descriptionHeight
	var upgradeBarWidth, upgradeBarHeight
	var disconnectHeight
	var screenWidth, screenHeight
	var inGame = false,
		disconnect = false

	// MATHS:
	var mathPI = Math.PI,
		mathPI2 = mathPI * 2
	const lerpAngle = function (value1, value2, amount) {
		var difference = Math.abs(value2 - value1)
		if (difference > mathPI) {
			if (value1 > value2) {
				value2 += mathPI2
			} else {
				value1 += mathPI2
			}
		}
		var value = value2 + (value1 - value2) * amount
		if (value >= 0 && value <= mathPI2) {
			return value
		}
		return value % mathPI2
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
				players.splice(i, 1)
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
				gameObjects.splice(i, 1)
				break
			}
		}
	}

	function killObjects(sid) {
		for (var i = 0; i < gameObjects.length; ++i) {
			if (gameObjects[i].owner && gameObjects[i].owner.sid == sid) {
				gameObjects.splice(i, 1)
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
				projectiles.splice(i, 1)
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

	function updateStore(storeIndex, storeArray) {
		storeData = [storeIndex, storeArray]
		renderStore()
	}

	function updateAlliance(team, allianceArray) {
		allianceData = [team, allianceArray]
		renderAlliance()
	}

	function changeVisibility(id, value) {
		visibility[id] = value
	}

	function changeInputText(id, value) {
		inputText[id] = value
		if (id === "allianceInput") {
			renderAlliance()
		}
	}

	function showItemInfo(data) {
		itemInfoData = data
		renderDescription()
	}

	function notificationName(name) {
		allianceNotificationName = name
	}

	function hoverChange(type, id) {
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
		showItemInfo: showItemInfo,
		notificationName: notificationName,
		hoverChange: hoverChange,
		disconnectEvent: disconnectEvent
	}

	var gameCanvas, gameContext
	var elementCanvas, elementContext
	var mapCanvas, mapContext
	var storeCanvas, storeContext
	var allianceCanvas, allianceContext
	var actionBarCanvas, actionBarContext
	var descriptionCanvas, descriptionContext
	var upgradeBarCanvas, upgradeBarContext
	var disconnectCanvas, disconnectContext
	var mainCanvas, mainContext
	var maxScreenWidth = 1920
	var maxScreenHeight = 1080
	var now,
		delta,
		lastUpdate = 0
	var camX, camY, xOffset, yOffset
	var waterMult = 1,
		waterPlus = 0
	var leaderboardData = [],
		fontHeight = [],
		itemInfoData = {},
		allianceNotificationName,
		hoverData = ["none"]
	var allianceData = [],
		storeData = [],
		visibility,
		inputText

	let updateCounter = 1
	async function updateGame(time) {
		now = time
		delta = now - lastUpdate

		for (let n = updateCounter; n < count; n++) {
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
			// console.log({ element[1], lastUpdate, now})
			if (events[type] != null) {
				if (type === "a" || type === "33") {
					events[type](...data, element[0])
				} else {
					events[type](...data)
				}
			}
			updateCounter++
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
		renderBackground()

		// RENDER WATER AREAS:
		renderWaterAreas()

		// RENDER GRID:
		drawGameGrids()

		// RENDER BOTTOM LAYER:
		gameContext.globalAlpha = 1
		gameContext.strokeStyle = outlineColor
		renderGameObjects(-1)

		// RENDER PROJECTILES:
		gameContext.globalAlpha = 1
		gameContext.lineWidth = outlineWidth
		renderProjectiles(0)

		// RENDER PLAYERS:
		renderPlayers(0)

		// RENDER AI:
		drawAI()

		// RENDER GAME OBJECTS (LAYERED):
		renderGameObjects(0)
		renderProjectiles(1)
		renderGameObjects(1)
		renderPlayers(1)
		renderGameObjects(2)
		renderGameObjects(3)

		// MAP BOUNDARIES:
		renderMapBoundaries()

		// RENDER DAY/NIGHT TIME:
		drawDayNight()

		// RENDER PLAYER AND AI UI:
		gameContext.strokeStyle = darkOutlineColor
		for (let i = 0; i < players.length + ais.length; ++i) {
			tmpObj = players[i] || ais[i - players.length]
			if (tmpObj.visible) {
				drawNamesAndIcons(tmpObj)
				drawBars(tmpObj)
			}
		}

		// RENDER ANIM TEXTS:
		gameContext.textBaseline = "middle"
		gameContext.textAlign = "center"
		for (var i = 0; i < texts.length; ++i) {
			if (texts[i].life) {
				texts[i].update(delta)
				texts[i].render(gameContext, xOffset, yOffset)
			}
		}

		// RENDER CHAT MESSAGES:
		renderChatMessages()

		if (inGame) {
			renderResources()
			renderTopInfoHolder()
			renderMinimap()
			renderAge()

			if (Object.keys(itemInfoData).length) {
				elementContext.drawImage(descriptionCanvas, 20, 20)
			}

			if (visibility.storeMenu) {
				elementContext.drawImage(storeCanvas, screenWidth / 2 - storeWidth / 2, screenHeight / 2 - storeHeight / 2)
			}

			if (visibility.allianceMenu) {
				elementContext.drawImage(allianceCanvas, screenWidth / 2 - allianceWidth / 2, screenHeight / 2 - allianceHeight / 2)
			}

			if (visibility.chatHolder) {
				elementContext.font = "20px Hammersmith One"
				elementContext.textBaseline = "middle"
				elementContext.textAlign = "center"
				const text = inputText.chatBox == "" ? "Enter Message" : inputText.chatBox
				const width = 6 + elementContext.measureText(text).width + 6
				const height = 6 + fontHeight[4] + 6

				elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
				elementContext.beginPath()
				elementContext.roundRect(screenWidth / 2 - width / 2, screenHeight - 200 - height, width, height, 4)
				elementContext.fill()

				elementContext.fillStyle = inputText.chatBox == "" ? "#cecece" : "#fff"
				elementContext.fillText(text, screenWidth / 2, screenHeight - (200 + (6 + fontHeight[4] + 6) / 2))
			}

			if (visibility.upgradeHolder && player.upgradePoints > 0) {
				elementContext.drawImage(upgradeBarCanvas, screenWidth / 2 - upgradeBarWidth / 2, 10)
				elementContext.font = "24px Hammersmith One"
				elementContext.textBaseline = "top"
				elementContext.textAlign = "center"
				elementContext.fillStyle = "#fff"
				elementContext.fillText(`SELECT ITEMS (${player.upgradePoints})`, screenWidth / 2, 95)
			}

			if (visibility.noticationDisplay && allianceNotificationName) {
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
				elementContext.textBaseline = "top"
				elementContext.textAlign = "right"
				elementContext.fillStyle = "#fff"
				elementContext.fillText(allianceNotificationName, screenWidth - 270 - 38 - 38 - 10 - 10, 80)
			}

			elementContext.drawImage(actionBarCanvas, screenWidth / 2 - actionBarWidth / 2, screenHeight - (actionBarHeight + 20))
			renderGameButtons()
		} else {
			if (!disconnect && deathTime == null) {
				deathTime = time
			} else if (disconnect || time - deathTime > config.deathFadeout) {
				elementContext.fillStyle = "rgba(0, 0, 0, 0.5)"
				elementContext.fillRect(0, 0, screenWidth, screenHeight)
			}
			if (!disconnect && time - deathTime < config.deathFadeout) {
				elementContext.font = `${Math.min(Math.round(deathTextScale), 120)}px Hammersmith One`
				elementContext.textBaseline = "middle"
				elementContext.textAlign = "center"
				const metrics = elementContext.measureText("YOU DIED")
				elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
				elementContext.fillRect(
					0,
					screenHeight / 2 - (metrics.emHeightAscent + metrics.emHeightDescent) / 2,
					screenWidth,
					metrics.emHeightAscent + metrics.emHeightDescent
				)
				elementContext.fillStyle = "#fff"
				elementContext.fillText("YOU DIED", screenWidth / 2, screenHeight / 2)
			}
		}

		if (deathTextScale < 120) {
			deathTextScale += 0.1 * delta
		}

		if (disconnect) {
			elementContext.drawImage(disconnectCanvas, 0, screenHeight * 0.45 - disconnectHeight / 2)
		}

		if (renderCursor) {
			elementContext.drawImage(cursorSprites[hoverData[0] === "none" ? "normal" : hoverData[0] === "inputText" ? "text" : "pointer"], mouse.x, mouse.y, cursorSize / resolution, cursorSize / resolution)
		}

		mainContext.drawImage(gameCanvas, 0, 0)
		mainContext.drawImage(elementCanvas, 0, 0)
		elementContext.clearRect(0, 0, screenWidth, screenHeight)
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
		elementContext.textBaseline = "bottom"
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
		elementContext.textBaseline = "middle"
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

			elementContext.fillText(
				player[element.type],
				element.type === "points" ? 20 + 40 : screenWidth - 40 - 20,
				screenHeight - element.bottom - Math.floor(45 / 2)
			)
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
			measuredHeight = fontHeight[0]
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
			measuredHeight += fontHeight[1] * line
			tmpC++
		}

		elementContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		elementContext.beginPath()
		elementContext.roundRect(screenWidth - 10 - 220 - 10 - 20, 20, 10 + 220 + 10, 7 + measuredHeight + 5, 4)
		elementContext.fill()

		elementContext.font = "28px Hammersmith One"
		elementContext.textBaseline = "middle"
		elementContext.textAlign = "right"
		const measuredText = elementContext.measureText(player.kills)
		elementContext.beginPath()
		elementContext.roundRect(screenWidth - 40 - 20 - measuredText.width - 10, 20 + 7 + measuredHeight + 5 + 10, 10 + measuredText.width + 40, 45, 4)
		elementContext.fill()
		elementContext.fillStyle = "#fff"
		elementContext.fillText(player.kills, screenWidth - 40 - 20, 20 + 7 + measuredHeight + 5 + 10 + Math.round(45 / 2))
		elementContext.drawImage(iconSprites["skull"], screenWidth - 6 - 28 - 20, 20 + 7 + measuredHeight + 5 + 10 + (45 - 28) / 2, 28, 28)

		elementContext.font = "31px Hammersmith One"
		elementContext.textBaseline = "top"
		elementContext.textAlign = "left"
		elementContext.fillText("Leaderboard", screenWidth - 220 - 10 - 20, 20 + 7)

		elementContext.font = "22px Hammersmith One"
		measuredHeight = fontHeight[0] + 20 + 7
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			elementContext.fillStyle = element.color
			elementContext.fillText(element.name, screenWidth - 220 - 10 - 20, measuredHeight)
			measuredHeight += fontHeight[1] * element.line
		}

		elementContext.textBaseline = "top"
		elementContext.textAlign = "right"
		elementContext.fillStyle = "#fff"
		measuredHeight = fontHeight[0] + 20 + 7
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			elementContext.fillText(element.score, screenWidth - 10 - 20, measuredHeight + fontHeight[1] * (element.line - 1))
			measuredHeight += fontHeight[1] * element.line
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

	function renderWaterAreas() {
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
		//no
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

	function renderGameObjects(layer) {
		var tmpSprite, tmpX, tmpY, tmpObj
		for (var i = 0; i < gameObjects.length; ++i) {
			tmpObj = gameObjects[i]
			tmpX = tmpObj.x + tmpObj.xWiggle - xOffset
			tmpY = tmpObj.y + tmpObj.yWiggle - yOffset
			if (layer == 0) {
				tmpObj.update(delta)
			}
			if (tmpObj.layer == layer && isOnScreen(tmpX, tmpY, tmpObj.scale + (tmpObj.blocker || 0))) {
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
					var rotVal = mathPI2 / berries
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
				let rotVal = mathPI2 / chips
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
				let rotVal = mathPI2 / chips
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

	// RENDER PROJECTILES:
	function renderProjectiles(layer) {
		for (var i = 0; i < projectiles.length; ++i) {
			tmpObj = projectiles[i]
			if (tmpObj.active && tmpObj.layer == layer) {
				tmpObj.update(delta)
				if (tmpObj.active && isOnScreen(tmpObj.x - xOffset, tmpObj.y - yOffset, tmpObj.scale)) {
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
	function renderProjectile(x, y, obj, ctxt, debug) {
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
	function renderPlayers(zIndex) {
		gameContext.globalAlpha = 1
		for (var i = 0; i < players.length; ++i) {
			tmpObj = players[i]
			if (tmpObj.zIndex == zIndex) {
				tmpObj.animate(delta)
				if (tmpObj.visible) {
					tmpObj.skinRot += 0.002 * delta
					tmpDir = (tmpObj.sid === player.sid ? getAttackDir() : tmpObj.dir) + tmpObj.dirPlus
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
	function drawAI() {
		gameContext.globalAlpha = 1
		for (let i = 0; i < ais.length; ++i) {
			tmpObj = ais[i]
			if (tmpObj.visible) {
				tmpObj.animate(delta)
				gameContext.save()
				gameContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset)
				gameContext.rotate(tmpObj.dir + tmpObj.dirPlus - Math.PI / 2)
				renderAI(tmpObj, gameContext)
				gameContext.restore()
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
		var tmpText = (tmpObj.team ? "[" + tmpObj.team + "] " : "") + (tmpObj.name || "") //var w =
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
			gameContext.fillStyle = darkOutlineColor
			roundRect(
				tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad,
				tmpObj.y - yOffset + tmpObj.scale + config.nameY,
				config.healthBarWidth * 2 + config.healthBarPad * 2,
				17,
				8,
				gameContext
			)
			gameContext.fill()
			gameContext.fillStyle = tmpObj == player || (tmpObj.team && tmpObj.team == player.team) ? "#8ecc51" : "#cc5151"
			roundRect(
				tmpObj.x - xOffset - config.healthBarWidth,
				tmpObj.y - yOffset + tmpObj.scale + config.nameY + config.healthBarPad,
				config.healthBarWidth * 2 * (tmpObj.health / tmpObj.maxHealth),
				17 - config.healthBarPad * 2,
				7,
				gameContext
			)
			gameContext.fill()
		}
	}

	function renderChatMessages() {
		for (let i = 0; i < players.length; ++i) {
			tmpObj = players[i]
			if (tmpObj.visible && tmpObj.chatCountdown > 0) {
				tmpObj.chatCountdown -= delta
				if (tmpObj.chatCountdown <= 0) {
					tmpObj.chatCountdown = 0
				}
				gameContext.font = "32px Hammersmith One"
				var tmpSize = gameContext.measureText(tmpObj.chatMessage)
				gameContext.textBaseline = "middle"
				gameContext.textAlign = "center"
				let tmpX = tmpObj.x - xOffset
				let tmpY = tmpObj.y - tmpObj.scale - yOffset - 90
				var tmpH = 47
				var tmpW = tmpSize.width + 17
				gameContext.fillStyle = "rgba(0,0,0,0.2)"
				gameContext.roundRect(tmpX - tmpW / 2, tmpY - tmpH / 2, tmpW, tmpH, 6)
				gameContext.fill()
				gameContext.fillStyle = "#fff"
				gameContext.fillText(tmpObj.chatMessage, tmpX, tmpY)
			}
		}
	}

	function renderStore() {
		if (storeData.length <= 0) return
		storeContext.clearRect(0, 0, storeWidth, storeHeight)

		storeContext.fillStyle = hoverData[0] === "storeTab" && hoverData[1] === "Hats" ? "rgba(50, 50, 50, 0.25)" : "rgba(0, 0, 0, 0.25)"
		storeContext.beginPath()
		storeContext.roundRect(0, 0, 183 + 10 + 10, 10 + fontHeight[2] + 10, 4)
		storeContext.fill()
		storeContext.fillStyle = hoverData[0] === "storeTab" && hoverData[1] === "Accessories" ? "rgba(50, 50, 50, 0.25)" : "rgba(0, 0, 0, 0.25)"
		storeContext.beginPath()
		storeContext.roundRect(storeWidth - (183 + 10 + 10), 0, 183 + 10 + 10, 10 + fontHeight[2] + 10, 4)
		storeContext.fill()
		storeContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		storeContext.beginPath()
		storeContext.roundRect(0, 10 + fontHeight[2] + 10 + 15, storeWidth, storeHeight - (10 + fontHeight[2] + 10 + 15), 4)
		storeContext.fill()

		storeContext.font = "26px Hammersmith One"
		storeContext.fillStyle = "#fff"
		storeContext.textBaseline = "top"
		storeContext.textAlign = "center"
		storeContext.fillText("Hats", (183 + 10 + 10) / 2, 10)
		storeContext.fillText("Accessories", storeWidth - (183 + 10 + 10) / 2, 10)

		storeContext.font = "24px Hammersmith One"
		storeContext.textBaseline = "middle"
		const upperHeight = 10 + fontHeight[2] + 10 + 15 + 10
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
			storeContext.fillText(element.name, 10 + 5 + 45 + 10, upperHeight + 50 / 2 + 50 * i)

			storeContext.textAlign = "right"
			storeContext.fillStyle = hoverData[0] === "storeItem" && hoverData[1] === "storeDisplay" + index ? "#72d3e0" : "#80eefc"
			if (!storePlayer[index]) {
				storeContext.fillText("Buy", storeWidth - 5 - 10, upperHeight + 50 / 2 + 50 * i)
				storeContext.fillStyle = "rgba(255,255,255,0.5)"
				storeContext.fillText(element.price, storeWidth - 5 - 10 - storeContext.measureText("Buy").width - 5, upperHeight + 50 / 2 + 50 * i)
			} else if (storePlayerIndex === index) {
				storeContext.fillText("Unequip", storeWidth - 5 - 10, upperHeight + 50 / 2 + 50 * i)
			} else {
				storeContext.fillText("Equip", storeWidth - 5 - 10, upperHeight + 50 / 2 + 50 * i)
			}
		}
	}

	function renderAlliance() {
		if (allianceData.length <= 0) return
		allianceContext.clearRect(0, 0, allianceWidth, allianceHeight)

		allianceContext.font = "24px Hammersmith One"
		allianceContext.textAlign = "center"
		allianceContext.textBaseline = "middle"
		allianceContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		allianceContext.beginPath()
		allianceContext.roundRect(0, 0, 10 + 350 + 10, 10 + 200 + 10, 4)
		allianceContext.fill()
		if (allianceData[0]) {
			if (hoverData[0] === "allianceButtonM") {
				allianceContext.fillStyle = "rgba(50, 50, 50, 0.25)"
			}
			allianceContext.beginPath()
			allianceContext.roundRect(0, 10 + 200 + 10 + 10, 5 + 360 + 5, 5 + fontHeight[3] + 5, 4)
			allianceContext.fill()
			allianceContext.fillStyle = "#fff"
			allianceContext.fillText(player.isOwner ? "Delete Tribe" : "Leave Tribe", allianceWidth / 2, 10 + 200 + 10 + 10 + (5 + fontHeight[3] + 5) / 2)
		} else {
			allianceContext.beginPath()
			allianceContext.roundRect(0, 10 + 200 + 10 + 10, 5 + 200 + 5, 5 + fontHeight[3] + 5, 4)
			allianceContext.fill()
			if (hoverData[0] === "allianceButtonM") {
				allianceContext.fillStyle = "rgba(50, 50, 50, 0.25)"
			}
			allianceContext.beginPath()
			allianceContext.roundRect(5 + 200 + 5 + 10, 10 + 200 + 10 + 10, 5 + 140 + 5, 5 + fontHeight[3] + 5, 4)
			allianceContext.fill()
			allianceContext.fillStyle = "#fff"
			allianceContext.fillText("Create", 5 + 200 + 5 + 10 + (5 + 140 + 5) / 2, 10 + 200 + 10 + 10 + (5 + fontHeight[3] + 5) / 2)
			allianceContext.fillStyle = inputText.allianceInput == "" ? "#cecece" : "#fff"
			allianceContext.textAlign = "left"
			allianceContext.fillText(inputText.allianceInput == "" ? "unique name" : inputText.allianceInput, 5, 10 + 200 + 10 + 10 + (5 + fontHeight[3] + 5) / 2)
		}

		if (allianceData[1].length <= 0) {
			allianceContext.fillStyle = "#fff"
			allianceContext.textAlign = "left"
			allianceContext.fillText("No Tribes Yet", 10, 10 + 40 / 2)
		}

		for (let i = 0; i < 5; i++) {
			if (allianceData[1][i] == null) continue
			if (allianceData[0]) {
				allianceContext.fillStyle = allianceData[1][i].sid === playerSID ? "#fff" : "rgba(255,255,255,0.6)"
				allianceContext.textAlign = "left"
				allianceContext.fillText(allianceData[1][i].text, 10, 10 + 40 / 2 + 40 * i)
				if (player.isOwner && allianceData[1][i].sid !== playerSID) {
					allianceContext.fillStyle = hoverData[0] === "allianceItem" && hoverData[1] === "allianceItem" + allianceData[1][i].sid ? "#72d3e0" : "#80eefc"
					allianceContext.textAlign = "right"
					allianceContext.fillText("Kick", allianceWidth - 10, 10 + 40 / 2 + 40 * i)
				}
			} else {
				allianceContext.fillStyle = "rgba(255,255,255,0.6)"
				allianceContext.textAlign = "left"
				allianceContext.fillText(allianceData[1][i].text.sid, 10, 10 + 40 / 2 + 40 * i)
				allianceContext.fillStyle = hoverData[0] === "allianceItem" && hoverData[1] === "allianceItem" + allianceData[1][i].text.owner ? "#72d3e0" : "#80eefc"
				allianceContext.textAlign = "right"
				allianceContext.fillText("Join", allianceWidth - 10, 10 + 40 / 2 + 40 * i)
			}
		}
	}

	function renderActionBar() {
		actionBarWidth = (player.items.length + player.weapons.length) * (5 + 66 + 5)
		actionBarHeight = 66
		actionBarCanvas = createCanvas(actionBarWidth, actionBarHeight)
		actionBarContext = actionBarCanvas.getContext("2d")

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
		upgradeBarCanvas = createCanvas(upgradeBarWidth, upgradeBarHeight)
		upgradeBarContext = upgradeBarCanvas.getContext("2d")

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
		descriptionHeight = 5 + fontHeight[5] + (descriptionTexts.length + itemInfoData.req.length) * fontHeight[1] + 5
		descriptionCanvas = createCanvas(descriptionWidth, descriptionHeight)
		descriptionContext = descriptionCanvas.getContext("2d")

		descriptionContext.fillStyle = "rgba(0, 0, 0, 0.25)"
		descriptionContext.beginPath()
		descriptionContext.roundRect(0, 0, descriptionWidth, descriptionHeight, 4)
		descriptionContext.fill()

		descriptionContext.textAlign = "left"
		descriptionContext.textBaseline = "top"
		descriptionContext.font = "30px Hammersmith One"
		descriptionContext.fillStyle = "#fff"
		descriptionContext.fillText(itemInfoData.name, 10, 5)

		descriptionContext.font = "22px Hammersmith One"
		descriptionContext.fillStyle = "rgba(255,255,255,0.6)"
		let positionTop = 5 + fontHeight[5]
		for (let i = 0; i < descriptionTexts.length; i++) {
			descriptionContext.fillText(descriptionTexts[i], 10, positionTop)
			positionTop += fontHeight[1]
		}
		for (let i = 0; i < itemInfoData.req.length; i++) {
			const split = itemInfoData.req[i].split(" x")
			descriptionContext.fillStyle = "#fff"
			descriptionContext.fillText(split[0], 10, positionTop)
			if (split[1]) {
				descriptionContext.fillStyle = "rgba(255,255,255,0.6)"
				descriptionContext.fillText(" x" + split[1], 10 + descriptionContext.measureText(split[0]).width, positionTop)
			}
			positionTop += fontHeight[1]
		}

		if (itemInfoData.lmt) {
			descriptionContext.textAlign = "right"
			descriptionContext.textBaseline = "bottom"
			descriptionContext.fillStyle = "#fff"
			descriptionContext.fillText(itemInfoData.lmt, descriptionWidth - 10, descriptionHeight - 6)
		}
	}

	// PRELOAD IMAGES:
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
		"shield_2",
		"shotgun_1",
		"spear_1",
		"stick_1",
		"sword_1"
	]
	var toolsVariance = ["", "_g", "_d", "_r", "_e"]
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
	async function preloadImages() {
		cursorSrc.forEach(async (e) => {
			cursorSprites[e] = await loadImage("render/img/cursor/" + e + ".png")
		})

		iconsSrc.forEach(async (e) => {
			iconSprites[e] = await loadImage("render/img/icons/" + e + ".png")
		})

		resourecesSrc.forEach(async (e) => {
			resourcesSprites[e] = await loadImage("render/img/resources/" + e + ".png")
		})

		projectilesSrc.forEach(async (e) => {
			projectileSprites[e] = await loadImage("render/img/weapons/" + e + ".png")
		})

		aisSrc.forEach(async (e) => {
			aiSprites[e] = await loadImage("render/img/animals/" + e + ".png")
		})

		for (var i = 1; i < 59; ++i) {
			try {
				var tmpSprite = await loadImage("render/img/hats/hat_" + i + ".png")
				skinSprites[i.toString()] = tmpSprite
				if ([11, 14, 53].includes(i)) {
					tmpSprite = await loadImage("render/img/hats/hat_" + i + "_p.png")
					skinSprites[`${i}_p`] = tmpSprite
					tmpSprite = await loadImage("render/img/hats/hat_" + i + "_top.png")
					skinSprites[`${i}_top`] = tmpSprite
				}
			} catch (err) {}
		}

		for (var i = 1; i < 22; ++i) {
			try {
				var tmpSprite = await loadImage("render/img/accessories/access_" + i + ".png")
				accessSprites[i] = tmpSprite
			} catch (err) {}
		}

		for (var i = 0; i < toolsSrc.length; ++i) {
			for (var j = 0; j < toolsVariance.length; ++j) {
				try {
					var tmpSprite = await loadImage("render/img/weapons/" + toolsSrc[i] + toolsVariance[j] + ".png")
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

	console.log("Preloading Images...")
	await preloadImages()

	console.log("Setting Up...")
	screenWidth = startData.screenWidth
	screenHeight = startData.screenHeight
	inGame = startData.inGame
	disconnect = startData.disconnect
	playerSID = startData.playerSID
	lockDir = startData.lockDir
	moofoll = startData.moofoll
	camX = startData.camX
	camY = startData.camY
	canvasMouse = startData.canvasMouse
	mouse = startData.mouse
	leaderboardData = startData.leaderboardData
	allianceNotificationName = startData.allianceNotificationName
	hoverData = startData.hoverData
	minimapData = startData.minimapData
	fontHeight = startData.fontHeight
	storeData = startData.storeData || []
	allianceData = startData.allianceData || []
	visibility = startData.visibility
	inputText = startData.inputText
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

	gameCanvas = createCanvas(canvasWidth, canvasHeight)
	gameContext = gameCanvas.getContext("2d")
	gameContext.setTransform(
		scaleFillNative,
		0,
		0,
		scaleFillNative,
		(canvasWidth - maxScreenWidth * scaleFillNative) / 2,
		(canvasHeight - maxScreenHeight * scaleFillNative) / 2
	)

	elementCanvas = createCanvas(canvasWidth, canvasHeight)
	elementContext = elementCanvas.getContext("2d")
	elementContext.setTransform(resolution, 0, 0, resolution, 0, 0)

	mapCanvas = createCanvas(300, 300)
	mapContext = mapCanvas.getContext("2d")

	storeWidth = 400 + 10 + 10
	storeHeight = 10 + fontHeight[2] + 10 + 15 + 200 + 10 + 10
	storeCanvas = createCanvas(storeWidth, storeHeight)
	storeContext = storeCanvas.getContext("2d")
	renderStore()

	allianceWidth = 10 + 350 + 10
	allianceHeight = 10 + 200 + 10 + 10 + 5 + fontHeight[3] + 5
	allianceCanvas = createCanvas(allianceWidth, allianceHeight)
	allianceContext = allianceCanvas.getContext("2d")
	renderAlliance()

	renderActionBar()
	renderDescription()
	renderUpgradeBar()

	disconnectHeight = fontHeight[6] - 25 + fontHeight[7] + fontHeight[3]
	disconnectCanvas = createCanvas(screenWidth, disconnectHeight)
	disconnectContext = disconnectCanvas.getContext("2d")
	disconnectContext.textAlign = "center"
	disconnectContext.textBaseline = "top"
	disconnectContext.font = "24px Hammersmith One"
	disconnectContext.fillStyle = "#6eb3ef"
	disconnectContext.fillText("reload", screenWidth / 2, fontHeight[6] - 25 + fontHeight[7])
	disconnectContext.fillStyle = "#fff"
	disconnectContext.font = "45px Hammersmith One"
	disconnectContext.fillText("disconnected", screenWidth / 2, fontHeight[6] - 25)
	disconnectContext.font = "170px Hammersmith One"
	disconnectContext.shadowColor = "#c4c4c4"
	for (let i = 1; i < 10; i++) {
		disconnectContext.shadowOffsetY = i
		disconnectContext.fillText("MOOMOO.io", screenWidth / 2, 0)
	}

	mainCanvas = createCanvas(canvasWidth, canvasHeight)
	mainContext = mainCanvas.getContext("2d")

	const frameCount = Math.floor((duration / 1000) * frameRate)
	if (frameCount <= 0) {
		console.log("Video length too short!")
		return
	}
	var tmpDate = Date.now()
	const frameStop = renderFrame != null ? Math.floor((renderFrame / 1000) * frameRate) : null
	const frameStart = renderStart != null ? Math.floor((renderStart / 1000) * frameRate) : null
	const frameEnd = renderEnd != null ? Math.floor((renderEnd / 1000) * frameRate) : null
	let i2 = 0
	console.log(`Creating frame(s)...`)
	for (let i = 0; i < frameCount; i++) {
		const time = i / frameRate
		const millisecTime = Math.floor(time * 1000)

		updateGame(millisecTime)

		if (frameStop == null) {
			if ((frameStart == null || frameStart <= i) && (frameEnd == null || i <= frameEnd)) {
				console.log(`Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`)
				await fs.promises.writeFile(`tmp/frame-${i2}.png`, mainCanvas.toBuffer("image/png"))
				i2++
			}
			if (frameEnd !== null && i === frameEnd) break
		} else if (frameStop === i) {
			console.log(`Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`)
			await fs.promises.writeFile(`${outputPath}/${outputName}_${Date.now()}.png`, mainCanvas.toBuffer("image/png"))
			break
		} else {
			console.log(`Updating canvas at ${Math.round(time * 10) / 10} seconds...`)
		}
	}

	if (renderFrame != null) return

	var totalTime,
		lastProgressTime = -1
	ffmpeg.setFfmpegPath(ffmpegStatic)
	await new Promise((resolve, reject) => {
		ffmpeg()
			.input("tmp/frame-%d.png")
			.inputOptions([`-framerate ${frameRate}`])

			.videoCodec("libx264")
			.outputOptions(["-pix_fmt yuv420p"])

			.fps(frameRate)
			.size(`${Math.floor(canvasWidth)}x${Math.floor(canvasHeight)}`)

			.saveToFile(`${outputPath}/${outputName}_${Date.now()}.mp4`)
			.on("codecData", (data) => {
				totalTime = parseInt(data.duration.replace(/:/g, ""))
			})
			.on("progress", (progress) => {
				const time = parseInt(progress.timemark.replace(/:/g, ""))
				if (lastProgressTime !== time) {
					lastProgressTime = time
					console.log(`Converting Images => Video | ${Math.round((time / totalTime) * 100)}%`)
				}
			})
			.on("end", () => {
				resolve()
			})
			.on("error", (error) => {
				console.log(error)
				reject()
			})
	})

	console.log("Total time taken: " + (Date.now() - tmpDate) + "ms")
}
