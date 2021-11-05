function getConference(connection, conferenceSid) {
	return new Promise(resolve => {
		const select = `
      SELECT * FROM
      conferences
      WHERE conferenceSid = '${conferenceSid}'
    `
		console.log("RUNNING GET CONFERENCE")
		connection.query(select, (err, response) => {
			if (err) {
				console.log(err)
				return resolve()
			}
			console.log("[GET DATA]: ", response)
			return resolve(response)
		})
	})
}

export default getConference