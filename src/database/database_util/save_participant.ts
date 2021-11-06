import getParticipant from "./get_participant"
import updateParticipant from "./update_participant"

function saveParticipant(connection:_Pool, callSid: number, status: number, conferenceSid: number) {
	return new Promise<void | _RowDataPacket[]>((resolve, reject) => {
		getParticipant(connection, callSid, conferenceSid, status)
			.then((participant: void | _RowDataPacket[]) => {
				if (!participant) {
					console.log("IN SAVE PARTICIPANT>>> 0 PARTICIPANT>>> SAVING")
					const insert = `
						INSERT INTO participants
						(callSid, status, conferenceSid)
						VALUES
						(?,?,?)
					`
					const values = [
						callSid,
						status,
						conferenceSid
					]

					connection.query(insert, values, (err, response: _RowDataPacket[]) => {
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
						.then((participant: void | _RowDataPacket[]) => {
							console.log(participant)
							return resolve()
						})
				}
			})
	})
}

export default saveParticipant