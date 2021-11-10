import express from "express"
import { update_home_state } from "../../database/user"
import { get_user_messages } from "../../database/messages"
import { save_selected_friend } from "../../database/user"
import { save_message } from "../../database/messages"

const router: _Router = express.Router()

router.post("/home", (req: _Request, res: _Response): void => {
	const { user_id } = req.body

	update_home_state(db_connection, user_id)
		.then((resolve: void) => {
			res.status(200).json({
				message: "Updated User Home State!"
			})
		})
		.catch((err: STATUS_CODE ) => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

router.post("/save-message", (req: _Request, res: _Response): void => {
	save_message(db_connection, req.body)
		.then((resolve: void) => {
			res.status(200).json({
				message: "Saved User Message!"
			})
		})
		.catch((err: STATUS_CODE ) => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

router.post("/save-selected-friend", (req: _Request, res: _Response): void => {
	save_selected_friend(db_connection, req.body)
		.then((resolve: void) => {
			res.status(200).json({
				message: "Saved Selected Friend!"
			})
		})
		.catch((err: STATUS_CODE ) => {
			// rewrite this to send error to middle ware logger
			console.log(err)
			res.status(err).json({
				status: err,
				error: "Bad Request"
			})
		})
})

router.get("/:user_id/messages/:friend_id", (req: _Request, res: _Response): void => {
	const user_id: number = parseInt(req.params.user_id)
	const friend_id: number = parseInt(req.params.friend_id)

	get_user_messages(db_connection, user_id, friend_id)
		.then((messages: _RowDataPacket[])=> {
			res.status(200).json({
				messages: messages
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

router.get("/", (req: _Request, res: _Response): void => {
    res.send("User's Home Route!")
})

export { router }