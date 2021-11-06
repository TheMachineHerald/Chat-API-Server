function parse(data: _RowDataPacket[]) {
	const channels: _CHANNELS = {
		selected_channel_id: null,
		selected_channel_name: "",
		text: [],
		voice: []
	}

	try {
		data.forEach((row: _RowDataPacket): void => {
			const tmp = Object.assign({})
			Object.keys(row).forEach(prop => {
				tmp[prop] = row[prop]
			})

			if (tmp.is_selected == 1) {
				channels.selected_channel_id = tmp.channel_id
				channels.selected_channel_name = tmp.channel_name
			}

			if (tmp.type === "TEXT") channels.text.push(tmp)
			if (tmp.type === "VOICE") channels.voice.push(tmp)
		})
	} catch (e) {
		console.log(e)
	} finally {
		return channels
	}
}

export default parse