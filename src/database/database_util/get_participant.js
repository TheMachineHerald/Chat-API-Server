function getParticipant(connection, callSid, conferenceSid, status) {
	return new Promise(resolve => {
		const select = `
      SELECT * FROM
      participants
      WHERE callSid = '${callSid}'
      AND conferenceSid = '${conferenceSid}'
    `
		console.log(`GET PARTICIPANTS: ${callSid} || ${conferenceSid}`)
		connection.query(select, (err, response) => {
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