import express from "express"
import { get_channel_users } from "../../database/channels"

const router: _Router = express.Router()

router.get("/:channel_id", (req: _Request, res: _Response): void => {
	const channel_id: number = parseInt(req.params.channel_id)

	get_channel_users(db_connection, channel_id)
		.then((resolve: Array<CHANNEL_USER>) => {
			res.status(200).json({
				channel_users: resolve
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