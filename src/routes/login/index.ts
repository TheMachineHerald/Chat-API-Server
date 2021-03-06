import express from "express"
import user_login from "../../database/login"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	// sanitize data > validate(req.body)
	const { email, password }: LOGIN_ROUTE_BODY = req.body
	user_login(db_connection, { email: email, password: password })
		.then((resolve: LOGIN_ROUTE_RESPONSE) => {
			res.status(200).json({
				message: "Logged In!",
				payload: resolve
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