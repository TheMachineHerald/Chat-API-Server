function updateParticipant(connection: _Pool, callSid: number, conferenceSid: number, status: number) {
	return new Promise<void | _RowDataPacket[]>(resolve => {
		const update = `
			UPDATE participants
			SET status = '${status}'
			WHERE callSid = '${callSid}'
			AND conferenceSid = '${conferenceSid}'
		`
		console.log("RUNNING update PARTICIPANTS")
		connection.query(update, (err, response: _RowDataPacket[]) => {
			if (err) {
				console.log(err)
				return resolve()
			}
			console.log("[UPDATED DATA]: ", response)
			return resolve(response)
		})
	})
}

export default updateParticipant