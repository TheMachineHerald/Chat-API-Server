import express from "express"
import friends from "../../database/friends"

const router = express.Router()

router.get("/", (req, res) => {
	// user_logout(db_connection, {})
	//   .then(resolve => {
	//     console.log('user logged out: ', resolve)
	//     return res.status(200).json({
	//       message: "Logged out!"
	//     })
	//   })
	//   .catch(err => {
	//     //rewrite this to send error to middle ware logger
	//     console.log(err)
	//     return res.status(err).json({
	//       status: err,
	//       error: 'Bad Request'
	//     })
	//   })
	res.send("friends GET route")
})

router.post("/add-friend", (req, res) => {
	res.json({
		status: 200,
		msg: "add-friend route"
	})
})

export { router }