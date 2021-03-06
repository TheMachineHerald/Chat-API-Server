import express from "express"
import { router as create_channel } from "./create_channel"
import { router as get_channel_messages } from "./get_channel_messages"
import { router as save_selected_channel } from "./save_selected_channel"
import { router as save_message } from "./save_message"
import { router as channel_users } from "./channel_users"
import { get_channels } from "../../database/channels"

const router: _Router = express.Router()

router.use("/create-channel", create_channel)
router.use("/messages", get_channel_messages)
router.use("/save-selected-channel", save_selected_channel)
router.use("/save-message", save_message)
router.use("/users", channel_users)

router.get("/:user_id", (req: _Request, res: _Response): void => {
	const user_id: number = parseInt(req.params.user_id)

	get_channels(db_connection, user_id)
		.then((resolve: _RowDataPacket[]) => {
			res.status(200).json({
				channels: resolve
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