function updateParticipant(connection, callSid, status, conferenceSid) {
	return new Promise(resolve => {
		const update = `
      UPDATE participants
      SET status = '${status}'
      WHERE callSid = '${callSid}'
      AND conferenceSid = '${conferenceSid}'
    `
		console.log("RUNNING update PARTICIPANTS")
		connection.query(update, (err, response) => {
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