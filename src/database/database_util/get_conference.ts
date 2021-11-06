function getConference(connection: _Pool, conferenceSid: number) {
	return new Promise<void | _RowDataPacket[]>(resolve => {
		const select = `
			SELECT * FROM
			conferences
			WHERE conferenceSid = '${conferenceSid}'
		`
		console.log("RUNNING GET CONFERENCE")
		connection.query(select, (err, response: _RowDataPacket[]) => {
			if (err) {
				console.log(err)
				return resolve()
			}
			console.log("[GET CONFERENCE]: ", response)
			return resolve(response)
		})
	})
}

export default getConference