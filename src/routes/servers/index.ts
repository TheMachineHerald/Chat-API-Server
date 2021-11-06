import express from "express"
import { router as create_server } from "./create_server"
import { router as save_selected_server } from "./save_selected_server.js"
import { get_servers } from "../../database/servers"

const router = express.Router()

router.use("/create-server", create_server)
router.use("/save-selected-server", save_selected_server)

router.get("/:user_id", (req: _Request, res: _Response): void => {
	const user_id = parseInt(req.params.user_id)

	get_servers(db_connection, user_id)
		.then((servers: _RowDataPacket[]) => {
			res.status(200).json({
				servers: servers
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