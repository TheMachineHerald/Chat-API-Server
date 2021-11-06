function get_data(connection: _Pool, user_id: number) {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		const statement = `
			SELECT 
			server_id, channel_id, type
			FROM User_Channels
			WHERE user_id = ${connection.escape(user_id)}
			AND is_selected = 1
        `
		connection.query(statement, (err, results: _RowDataPacket[]) => {
			if (err) return reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}

			return resolve(results)
		})
	})
}

export default get_data