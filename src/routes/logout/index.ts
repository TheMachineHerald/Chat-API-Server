import express from "express"
import { logout_user } from "../../database/logout"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	const { user_id } = req.body
	logout_user(db_connection, user_id)
		.then((resolve: void) => {
			res.status(200).json({
				message: "Logged out!"
			})
		})
		.catch((err: STATUS_CODE ) => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

export { router }