function logout_user(connection: _Pool, user_id: number) {
	return new Promise<void>(resolve => {
		const statement = `
			UPDATE Users
			SET status = 4
			WHERE id = ${connection.escape(user_id)}
		`
		connection.query(statement, (err: Error, response: _RowDataPacket) => {
			if (err) console.log(err)
			if (!response) {
				console.log("failed user status update")
			}

			return resolve()
		})
	})
}

export default logout_user