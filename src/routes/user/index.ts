import express from "express"
import { update_home_state } from "../../database/user"

const router: _Router = express.Router()

router.post("/home", (req: _Request, res: _Response): void => {
	const { user_id } = req.body

	update_home_state(db_connection, user_id)
		.then((resolve: void) => {
			res.status(200).json({
				message: "Updated User Home State!"
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

router.get("/", (req: _Request, res: _Response): void => {
    res.send("User's Home Route!")
})

export { router }