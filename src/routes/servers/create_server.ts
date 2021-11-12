import express from "express"
import { create_server } from "../../database/servers"

const router: _Router = express.Router()

router.post("/", (req: _Request, res: _Response): void  => {
	const user: CREATE_SERVER_REQUEST_BODY = req.body

	create_server(db_connection, user)
		.then((resolve: _RowDataPacket[]) => {
			res.status(200).json({
				message: "Created Server!",
				server: resolve
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