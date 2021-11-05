import express from "express"
import { router as create_server } from "./create_server"
import { router as save_selected_server } from "./save_selected_server.js"
import { get_servers } from "../../database/servers"

const router = express.Router()

router.use("/create-server", create_server)
router.use("/save-selected-server", save_selected_server)

router.get("/:user_id", (req, res) => {
	const user_id = req.params.user_id

	get_servers(db_connection, user_id)
		.then(servers => {
			return res.status(200).json({
				servers: servers
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