function updateConference(connection: _Pool, conferenceSid: number, status: number) {
	return new Promise<void | _RowDataPacket[]>(resolve => {
		const update = `
		
		`
		const values = [
			conferenceSid,
			status
		]

		console.log("RUNNING SAVE CONFERENCE")
		connection.query(update, values, (err, response: _RowDataPacket[]) => {
			if (err) {
				console.log(err)
				return resolve()
			}
			console.log("[SAVED DATA]: ", response)
			return resolve(response)
		})
	})
}

export default updateConference