import express, { json, urlencoded } from "express"
import cors from "cors"
import API from "./src/routes"
import connection from "./src/database/connection"
require("dotenv").config()

const app: _Application = express()
const port = process.env.PORT || 3000

global.db_connection = connection

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use("/api", API)

app.get("/", (req: _Request, res: _Response): void => {
	res.json({
		statusCode: 200,
		message: "Chat API Home Route"
	})
})

app.listen(port, (): void => console.log(`Server listening on port: ${port}`))