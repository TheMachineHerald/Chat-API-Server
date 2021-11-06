import express from "express"
import { create_channel } from "../../database/channels"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	res.json({
		status: 200,
		msg: "create-channel route"
	})
})

export { router }