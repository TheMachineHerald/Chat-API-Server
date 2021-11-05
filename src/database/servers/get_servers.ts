function get_servers(connection, user_id) {
	return new Promise((resolve, reject) => {
		const statement = `

    `
		connection.query(statement, [user_id], (err, results) => {
			if (err) reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}

			return resolve(results)
		})
	})
}

export default get_servers