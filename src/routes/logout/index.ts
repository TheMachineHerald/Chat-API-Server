import express from "express"
import { logout_user } from "../../database/logout"

const router = express.Router()

router.post("/", (req, res) => {
	const { user_id } = req.body
	logout_user(db_connection, user_id)
		.then(resolve => {
			return res.status(200).json({
				message: "Logged out!"
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