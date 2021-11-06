function saveConference(connection: _Pool, conferenceSid: number, status: number) {
	return new Promise<void | _RowDataPacket[]>(resolve => {
		const insert = `
			INSERT INTO conferences
			(conferenceSid, status)
			VALUES
			(?,?)
		`
		const values = [
			conferenceSid,
			status
		]

		console.log("RUNNING SAVE CONFERENCE")
		connection.query(insert, values, (err, response: _RowDataPacket[]) => {
			if (err) {
				console.log(err)
				return resolve()
			}
			console.log("[SAVED DATA]: ", response)
			return resolve(response)
		})
	})
}

export default saveConference