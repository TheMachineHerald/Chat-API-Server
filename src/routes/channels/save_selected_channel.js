import express from "express"
import { save_selected_channel } from "../../database/channels"

const router = express.Router()

router.post("/", (req, res) => {
	const ctx = req.body

	save_selected_channel(db_connection, ctx)
		.then(resolve => {
			return res.status(200).json(resolve)
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