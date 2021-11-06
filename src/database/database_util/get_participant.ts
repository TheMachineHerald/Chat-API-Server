function getParticipant(connection: _Pool, callSid: number, conferenceSid: number, status: number) {
	return new Promise<void | _RowDataPacket[]>(resolve => {
		const select = `
			SELECT * FROM
			participants
			WHERE callSid = '${callSid}'
			AND conferenceSid = '${conferenceSid}'
		`
		console.log(`GET PARTICIPANTS: ${callSid} || ${conferenceSid}`)
		connection.query(select, (err, response: _RowDataPacket[]) => {
			if (err) {
				console.log(err)
				return resolve()
			}
			console.log("DATA: ", response)
			return resolve(response)
		})
	})
}

export default getParticipant