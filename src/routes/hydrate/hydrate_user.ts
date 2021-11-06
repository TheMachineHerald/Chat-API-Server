import express from "express"
import { hydrate_user } from "../../database/hydrate"

const router = express.Router()

router.get("/:user_id", (req: _Request, res: _Response): void => {
	const user_id = parseInt(req.params.user_id)

	hydrate_user(db_connection, user_id)
		.then((data: _RowDataPacket[]) => {
			res.status(200).json({
				payload: data
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