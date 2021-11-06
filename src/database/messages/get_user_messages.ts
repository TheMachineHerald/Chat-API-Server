function get_user_messages(connection: _Pool, user_id: number, recipient_id: number) {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		const statement = `
			SELECT * FROM
				User_Messages
			WHERE user_id = ?
			ORDER BY create_date
			DESC LIMIT 50;
		`

		connection.query(statement, [user_id], (err, results: _RowDataPacket[]) => {
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