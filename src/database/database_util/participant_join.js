import getParticipant from "./get_participant"
import saveParticipant from "./save_participant"
import updateParticipant from "./update_participant"

function participantJoin(connection, callSid, conferenceSid, status) {
	return getParticipant(connection, callSid, conferenceSid).then(participant => {
		console.log("AFTER GET PARTICIPANT")

		if (!participant) {
			return saveParticipant(connection, callSid, status, conferenceSid)
		}
		return updateParticipant()
	})
}

export default participantJoin