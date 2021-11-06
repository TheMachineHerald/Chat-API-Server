function get_channel_users(connection: _Pool, channel_id: number) {
	return new Promise<Array<CHANNEL_USER>>((resolve, reject) => {
		const statement = `
			SELECT
				u.id, u.user_name, u.first_name, u.last_name, u.email, u.status
			FROM User_Channels as uc
			INNER JOIN Users as u
			ON uc.user_id = u.id
			AND uc.channel_id = ?
		`
		connection.query(statement, [channel_id], (err, results: _RowDataPacket[]) => {
			if (err) return reject(500)
			if (!results) {
				console.log("not found")
				return reject(404)
			}
			return resolve(parse(results))
		})
	})
}

export default get_channel_users

function parse(data: _RowDataPacket[]): Array<CHANNEL_USER> {
	const channel_users: Array<CHANNEL_USER> = []
	try {
		data.forEach((row: _RowDataPacket): void => {
			const tmp = Object.assign({})
			Object.keys(row).forEach(prop => {
				tmp[prop] = row[prop]
			})
			channel_users.push(tmp)
		})
	} catch(e) {
		console.log(e)
	} finally {
		return channel_users
	}
}