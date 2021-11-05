import express from "express"
import { hydrate_user } from "../../database/hydrate"

const router = express.Router()

router.get("/:user_id", (req, res) => {
	const user_id = req.params.user_id

	hydrate_user(db_connection, user_id)
		.then(data => {
			return res.status(200).json({
				payload: data
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