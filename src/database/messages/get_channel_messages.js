function get_channel_messages(connection, channel_id) {
	return new Promise((resolve, reject) => {
		const statement = `
      SELECT * FROM
      Channel_Messages
      WHERE channel_id = ?
      ORDER BY created_date
      DESC LIMIT 50;
    `

		connection.query(statement, [channel_id], (err, results) => {
			if (err) reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}

			return resolve(results)
		})
	})
}

export default get_channel_messages