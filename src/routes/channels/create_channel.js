import express from "express"
import { create_channels } from "../../database/channels"

const router = express.Router()

router.post("/", (req, res) => {
	res.json({
		status: 200,
		msg: "create-channel route"
	})
})

export { router }