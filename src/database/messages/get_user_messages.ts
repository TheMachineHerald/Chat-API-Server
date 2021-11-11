function get_user_messages(connection: _Pool, user_id: number, friend_id: number) {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		const statement = `
			SELECT * FROM
			User_Messages
			WHERE 
			user_id in(${connection.escape(user_id)}, ${connection.escape(friend_id)})
			AND
			friend_id in(${connection.escape(user_id)}, ${connection.escape(friend_id)})
			ORDER BY created_date
			DESC LIMIT 50
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

export default get_user_messages