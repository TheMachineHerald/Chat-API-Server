import express from "express"
import { get_channel_messages } from "../../database/messages"

const router = express.Router()

router.get("/:channel_id", (req, res) => {
	const channel_id = req.params.channel_id

	get_channel_messages(db_connection, channel_id)
		.then(messages => {
			return res.status(200).json({
				messages: messages
			})
		})
		.catch(err => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			return res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

export { router }