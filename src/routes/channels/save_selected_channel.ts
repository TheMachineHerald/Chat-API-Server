import express from "express"
import { save_selected_channel } from "../../database/channels"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	const ctx: SAVE_SELECTED_CHANNEL_REQUEST_BODY = req.body

	save_selected_channel(db_connection, ctx)
		.then((payload: SAVE_SELECTED_CHANNEL_PAYLOAD) => {
			res.status(200).json(payload)
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