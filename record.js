const fs = require("fs")
const WebSocket = require("ws")
const msgpack = require("msgpack-lite")
const PORT = 8960

const server = new WebSocket.Server({ port: PORT })
let date = [],
	lastDate = [],
	started = [],
	count = [],
	marker = [],
	increaseNumber = 0

server.on("listening", () => {
	console.log("Listening to ws://localhost:" + PORT)
})

server.on("connection", (conn) => {
	conn.on("error", console.error)

	const sid = increaseNumber
	started[sid] = false
	count[sid] = 1
	marker[sid] = []
	increaseNumber++
	console.log("Recording Start")

	conn.on("message", (x) => {
		const [packet, data] = msgpack.decode(x)
		if (packet === "recordStart") {
			date[sid] = data[0]
			lastDate[sid] = date[sid]
			if (!fs.existsSync(date[sid])) {
				fs.mkdirSync(date[sid], { recursive: true })
			}
			const filePath = `${date[sid]}/start.json`
			fs.writeFileSync(filePath, JSON.stringify(data[1]))
			count[sid] = 1
			started[sid] = true
		} else if (packet === "addData") {
			lastDate[sid] = data[0]
			const filePath = `${date[sid]}/data.json`
			if (!fs.existsSync(filePath)) {
				fs.writeFileSync(filePath, `{"${count[sid]}":[${parseInt(data[0]) - parseInt(date[sid])},${JSON.stringify(data[1])}]`)
			} else {
				fs.appendFileSync(filePath, `,"${count[sid]}":[${parseInt(data[0]) - parseInt(date[sid])},${JSON.stringify(data[1])}]`)
			}
			count[sid]++
		} else if (packet === "addMarker") {
			marker[sid].push(parseInt(data[0]) - parseInt(date[sid]))
		}
	})

	conn.on("close", () => {
		console.log("Recording Stopped")
		if (started[sid]) {
			fs.appendFileSync(`${date[sid]}/data.json`, `}`)
			const data = { startTime: date[sid],duration: parseInt(lastDate[sid]) - parseInt(date[sid]), count: count[sid], marker: marker[sid] }
			fs.writeFileSync(`${date[sid]}/info.json`, JSON.stringify(data))
			started[sid] = false
			marker[sid] = []
		}
	})
})
