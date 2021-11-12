/**
 * Parses out MySQL meta data from database response
 * 		&&
 * Creates User Object for redux consumption
 */
function parse(db_user: USER, db_servers: _RowDataPacket[], db_selected_server: _RowDataPacket[]): LOGIN_ROUTE_RESPONSE {
	const servers: Array<SERVER> = []
	const selected_server: SELECTED_SERVER = {
		server_id: null,
		server_name: "",
		selected_channel_id: null,
		selected_channel_name: "",
		channels: {
			text: [],
			voice: []
		}
	}

	try {
		db_servers.forEach((row: _RowDataPacket): void => {
			const tmp = Object.assign({})
			Object.keys(row).forEach((prop: string) => {
				tmp[prop] = row[prop]
			})
			servers.push(tmp)
		})

		db_selected_server.forEach((row: _RowDataPacket): void => {
			const tmp = Object.assign({})
			Object.keys(row).forEach((prop: string) => {
				tmp[prop] = row[prop]
			})

			if (
				!selected_server.server_id &&
				!selected_server.server_name
			) {
				selected_server.server_id = tmp.server_id
				selected_server.server_name = tmp.server_name
			}

			if (tmp.is_selected == 1) {
				selected_server.selected_channel_id = tmp.channel_id
				selected_server.selected_channel_name = tmp.channel_name
			}

			if (tmp.type === "TEXT") selected_server.channels.text.push(tmp)
			if (tmp.type === "VOICE") selected_server.channels.voice.push(tmp)
		})
	} catch (e) {
		console.log(e)
	} finally {
		return {
			user: db_user,
			servers: servers,
			selected_server: selected_server
		}
	}
}

export default parse