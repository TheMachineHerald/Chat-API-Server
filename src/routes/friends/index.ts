import express from "express"
import { get_friends, add_friend } from "../../database/friends"

const router: _Router = express.Router()

router.get("/", (req: _Request, res: _Response): void => {
	res.send("friends GET route")
})

router.post("/add-friend", (req: _Request, res: _Response): void => {
	res.json({
		status: 200,
		msg: "add-friend route"
	})
})

export { router }