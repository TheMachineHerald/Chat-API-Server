import express from "express"
import { save_selected_server } from "../../database/servers"

const router = express.Router()

router.post("/", (req, res) => {
	const { user_id, server_id, server_name } = req.body

	save_selected_server(db_connection, { user_id, server_id, server_name })
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