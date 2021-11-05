function get_data(connection, user_id) {
	return new Promise((resolve, reject) => {
		const statement = `
            SELECT 
            server_id, channel_id, type
            FROM User_Channels
            WHERE user_id = ${connection.escape(user_id)}
            AND is_selected = 1
        `
		connection.query(statement, (err, results) => {
			if (err) reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}

			return resolve(results)
		})
	})
}

export default get_data