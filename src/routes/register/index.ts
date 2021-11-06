import express from "express"
import user_register from "../../database/register"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	const user: REGISTER_ROUTE_REQUEST_BODY = req.body

	user_register(db_connection, user)
		.then((user: REGISTER_ROUTE_PAYLOAD) => {
			res.status(200).json({
				message: "Created User!",
				user: user
			})
		})
		.catch((err: number) => {
			if (err === -1) {
				res.status(404).json({
					status: 404,
					error: "Invalid Request"
				})
			}

			res.status(500).json({
				status: 500,
				error: "Not Allowed"
			})
		})
})

export { router }