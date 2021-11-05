function logout_user(connection, user_id) {
	return new Promise(resolve => {
		const statement = `
            UPDATE Users
            SET status = 4
            WHERE id = ${connection.escape(user_id)}
        `
		connection.query(statement, (err, results) => {
			if (err) console.log(err)
			if (!results) {
				console.log("failed user status update")
			}

			return resolve()
		})
	})
}

export default logout_user