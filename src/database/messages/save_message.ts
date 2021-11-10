function save_message(connection: _Pool, ctx: SAVE_USER_MESSAGE_REQUEST) {
    return new Promise<void>((resolve, reject) => {
        const statement = `
            INSERT INTO User_Messages
            (user_id, user_name, friend_id, friend_user_name, message)
            VALUES
            (?, ?, ?, ?, ?)
        `
        const values = [
            ctx.user_id,
            ctx.user_name,
            ctx.friend_id,
            ctx.friend_user_name,
            ctx.message
        ]

        connection.query(statement, values, (err, response) => {
            if (err) return reject(500)
			if (!response) {
				console.log("not found")
				return reject(404)
			}

			return resolve()
        })
    })
}

export default save_message