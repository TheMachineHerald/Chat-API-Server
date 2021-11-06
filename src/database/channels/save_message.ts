function save_message(connection: _Pool, ctx: SAVE_MESSAGE_CONTEXT) {
	return new Promise<void>((resolve, reject) => {
		const statement = `
			INSERT INTO Channel_Messages
			(channel_id, server_id, user_id, user_name, message)
			VALUES
			(?, ?, ?, ?, ?)
		`
		const values = [
			ctx.channel_id,
			ctx.server_id,
			ctx.user_id,
			ctx.user_name,
			ctx.message
		]

		connection.query(statement, values, (err, results: _RowDataPacket[]) => {
			if (err) return reject(500)
			if (!results) {
				console.log("failed message insert")
				return reject(404)
			}

			return resolve()
		})
	})
}

export default save_message