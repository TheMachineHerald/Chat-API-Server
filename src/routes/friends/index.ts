import express from "express"
import { get_friends, add_friend } from "../../database/friends"

const router: _Router = express.Router()

router.get("/:user_id", (req: _Request, res: _Response): void => {
	const user_id: number = parseInt(req.params.user_id)

	get_friends(db_connection, user_id)
		.then((resolve: _RowDataPacket[]): void => {
			res.status(200).json({
				friends: resolve
			})
		})
		.catch((err: STATUS_CODE): void => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

router.post("/add-friend", (req: _Request, res: _Response): void => {
	res.json({
		status: 200,
		msg: "add-friend route"
	})
})

export { router }