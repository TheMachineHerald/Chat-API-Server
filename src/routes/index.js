import express from "express"
import { router as login_route } from "./login"
import { router as logout_route } from "./logout"
import { router as register_route } from "./register"
import { router as channels_route } from "./channels"
import { router as servers_route } from "./servers"
import { router as friends_route } from "./friends"
import { router as hydrate_route } from "./hydrate"

const API = express.Router()

API.use("/login", login_route)
API.use("/logout", logout_route)
API.use("/register", register_route)
API.use("/channels", channels_route)
API.use("/friends", friends_route)
API.use("/servers", servers_route)
API.use("/hydrate", hydrate_route)

API.get("/", (req, res) => {
	res.json({
		statusCode: 200,
		message: "API Route"
	})
})

export default API