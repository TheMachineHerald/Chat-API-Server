function parse(data: _RowDataPacket[][]): SELECTED_SERVER {
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
		data[1].forEach((row: _RowDataPacket): void => {
			const tmp = Object.assign({})
			Object.keys(row).forEach((prop: string) => {
				tmp[prop] = row[prop]
			})

			if (tmp.is_selected == 1) {
				selected_server.server_id = tmp.server_id
				selected_server.server_name = tmp.server_name
				selected_server.selected_channel_id = tmp.channel_id
				selected_server.selected_channel_name = tmp.channel_name
			}

			if (tmp.type === "TEXT") selected_server.channels.text.push(tmp)
			if (tmp.type === "VOICE") selected_server.channels.voice.push(tmp)
		})
	} catch (e) {
		console.log(e)
	} finally {
		return selected_server
	}
}

function save_selected_server(connection: _Pool, ctx: SAVE_SELECTED_SERVER_REQUEST_BODY) {
	return new Promise<SELECTED_SERVER>((resolve, reject) => {
		const update = `
			UPDATE Users
			SET 
			selected_server_id = ${connection.escape(ctx.server_id)},
			selected_server_name = ${connection.escape(ctx.server_name)}
			WHERE id = ${connection.escape(ctx.user_id)}
		`
		const select = `
			SELECT *
			FROM User_Channels as uc
			WHERE 
			uc.server_id = ${connection.escape(ctx.server_id)}
			AND
			uc.user_id = ${connection.escape(ctx.user_id)}
		`
		const statement = [update, select]

		connection.query(statement.join(";"), (err, results: _RowDataPacket[][]) => {
			if (err) return reject(500)
			if (!results) {
				console.log("failed query")
				return reject(404)
			}

			return resolve(parse(results))
		})
	})
}

export default save_selected_server