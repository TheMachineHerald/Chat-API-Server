function get_friends(connection: _Pool, user_id: number): Promise<_RowDataPacket[]> {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		const statement = `
			SELECT
			u.id, u.user_name, u.first_name, u.last_name, u.email, u.status
			FROM Users as u
			INNER JOIN Friends as f
			ON u.id = f.friend_id
			WHERE f.user_id = ?
   		 `
		connection.query(statement, [user_id], (err, response: _RowDataPacket[]) => {
			if (err) return reject(500)
			if (!response) {
				console.log("not found")
				return reject(404)
			}

			return resolve(response)
		})
	})
}

export default get_friends