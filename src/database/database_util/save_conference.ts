function saveConference(connection, conferenceSid, status) {
	return new Promise(resolve => {
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
		connection.query(insert, values, (err, response) => {
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