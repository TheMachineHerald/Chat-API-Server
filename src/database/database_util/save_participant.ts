import getParticipant from "./get_participant"
import updateParticipant from "./update_participant"

function saveParticipant(connection, callSid, status, conferenceSid) {
	return new Promise((resolve, reject) => {
		getParticipant(connection, callSid, conferenceSid, status)
			.then(participant => {
				if (!participant[0]) {
					console.log("IN SAVE PARTICIPANT>>> 0 PARTICIPANT>>> SAVING")
					const insert = `
          INSERT INTO participants
          (callSid, status, conferenceSid)
          VALUES
          (?,?,?)`
					const values = [
						callSid,
						status,
						conferenceSid
					]

					connection.query(insert, values, (err, response) => {
						if (err) {
							console.log(err)
							return resolve()
						}
						console.log("[SAVED DATA]: ", response)
						return resolve(response)
					})
				} else {
					console.log("IN SAVE PARTICIPANT >>> UPDATING")
					updateParticipant(connection, callSid, status, conferenceSid)
						.then(participant => {
							console.log(participant)
							return resolve()
						})
				}
			})
	})
}

export default saveParticipant