function get_friends(connection: _Pool, user_id: number) {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		const statement = `
			SELECT * FROM
			Friends
			WHERE user_id = ?
   		 `
		connection.query(statement, [user_id], (err, results: _RowDataPacket[]) => {
			if (err) return reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}

			console.log("get friends results: ", results)
			return resolve(results)
		})
	})
}

export default get_friends