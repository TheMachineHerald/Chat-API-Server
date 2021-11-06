import express from "express"
import { save_selected_server } from "../../database/servers"

const router = express.Router()

router.post("/", (req: _Request, res: _Response): void => {
	const { user_id, server_id, server_name }: SAVE_SELECTED_SERVER_REQUEST_BODY = req.body

	save_selected_server(db_connection, { user_id, server_id, server_name })
		.then((payload: SELECTED_SERVER)=> {
			res.status(200).json(payload)
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