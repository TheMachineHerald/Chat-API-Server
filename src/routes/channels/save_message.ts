import express from "express"
import { save_message } from "../../database/channels"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	const {
		channel_id,
		server_id,
		user_id,
		user_name,
		message
	} = req.body

	const ctx: SAVE_MESSAGE_CONTEXT = {
		channel_id,
		server_id,
		user_id,
		user_name,
		message
	}

	save_message(db_connection, ctx)
		.then((resolve: void) => {
			res.status(200).json({
				message: "Saved channel message"
			})
		})
		.catch((err: STATUS_CODE) => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

export { router }