import getParticipant from "./get_participant"
import saveParticipant from "./save_participant"
import updateParticipant from "./update_participant"

function participantJoin(connection:_Pool, callSid: number, conferenceSid: number, status: number) {
	return getParticipant(connection, callSid, conferenceSid, status).then(participant => {
			console.log("AFTER GET PARTICIPANT")
			if (!participant) {
				return saveParticipant(connection, callSid, status, conferenceSid)
			}
			return updateParticipant(connection, callSid, conferenceSid, status)
	})
}

export default participantJoin