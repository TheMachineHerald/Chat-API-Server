import express from "express"
import { save_message } from "../../database/channels"

const router = express.Router()

router.post("/", (req, res) => {
	const {
		channel_id,
		server_id,
		user_id,
		user_name,
		message
	} = req.body

	const ctx = {
		channel_id,
		server_id,
		user_id,
		user_name,
		message
	}

	save_message(db_connection, ctx)
		.then(resolve => {
			return res.status(200).json({
				message: "Saved channel message"
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