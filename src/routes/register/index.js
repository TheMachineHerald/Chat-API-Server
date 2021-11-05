import express from "express"
import user_register from "../../database/register"

const router = express.Router()

router.post("/", (req, res) => {
	const user = req.body

	user_register(db_connection, user)
		.then(user => {
			return res.status(200).json({
				message: "Created User!",
				user: user
			})
		})
		.catch(err => {
			if (err === -1) {
				return res.status(404).json({
					status: 404,
					error: "Invalid Request"
				})
			}

			return res.status(500).json({
				status: 500,
				error: "Not Allowed"
			})
		})
})

export { router }