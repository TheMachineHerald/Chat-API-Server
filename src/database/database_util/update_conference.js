function updateConference(connection, conferenceSid, status) {
	return new Promise(resolve => {
		const update = `

    `
		const values = [
			conferenceSid,
			status
		]

		console.log("RUNNING SAVE CONFERENCE")
		connection.query(update, values, (err, response) => {
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