function get_channel_messages(connection: _Pool, channel_id: number) {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		const statement = `
			SELECT * FROM
			Channel_Messages
			WHERE channel_id = ?
			ORDER BY created_date
			DESC LIMIT 50;
		`

		connection.query(statement, [channel_id], (err, results: _RowDataPacket[]) => {
			if (err) return reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}

			return resolve(results)
		})
	})
}

export default get_channel_messages