import express, { json, urlencoded } from "express"
import cors from "cors"
import API from "./src/routes"
import connection from "./src/database/connection"
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

global.db_connection = connection

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use("/api", API)

app.get("/", (req, res) => {
	res.json({
		statusCode: 200,
		message: "Chat API Home Route"
	})
})

app.listen(port, () => console.log(`Server listening on port: ${port}`))