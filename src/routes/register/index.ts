import express from "express"
import user_register from "../../database/register"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	const user: REGISTER_ROUTE_REQUEST_BODY = req.body

	user_register(db_connection, user)
		.then((response: REGISTER_ROUTE_RESPONSE) => {
			res.status(200).json({
				message: "Created User!",
				payload: response
			})
		})
		.catch((err: number) => {
			if (err === -1) {
				res.status(404).json({
					status: 404,
					error: "Invalid Request"
				})
				return
			}

			res.status(500).json({
				status: 500,
				error: "Bad Request"
			})
		})
})

export { router }