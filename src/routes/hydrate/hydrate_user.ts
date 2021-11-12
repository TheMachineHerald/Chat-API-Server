import express from "express"
import { hydrate_user } from "../../database/hydrate"

const router: _Router = express.Router()

router.get("/:user_id", (req: _Request, res: _Response): void => {
	const user_id: number = parseInt(req.params.user_id)

	hydrate_user(db_connection, user_id)
		.then((resolve: _RowDataPacket[]) => {
			res.status(200).json({
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