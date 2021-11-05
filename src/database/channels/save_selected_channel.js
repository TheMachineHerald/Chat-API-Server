import parse from "./parse"

function save_selected_channel(connection, ctx) {
	return new Promise((resolve, reject) => {
		const toggle_off = `
            UPDATE User_Channels
            Set is_selected = 0
            WHERE user_id = ${connection.escape(ctx.user_id)}
            AND server_id = ${connection.escape(ctx.selected_server_id)}
            AND is_selected = 1
        `
		const toggle_on = `
            UPDATE User_Channels
            SET is_selected = 1
            WHERE user_id = ${connection.escape(ctx.user_id)}
            AND id = ${connection.escape(ctx.channel_id)}
        `
		const channels = `
            SELECT * FROM 
                User_Channels as uc
            WHERE uc.server_id = ${connection.escape(ctx.selected_server_id)}
            AND uc.user_id = ${connection.escape(ctx.user_id)}
        `
		const channel_messages = `
            SELECT * FROM
            Channel_Messages
            WHERE channel_id = ${connection.escape(ctx.channel_id)}
            ORDER BY created_date
            DESC LIMIT 50
        `
		const statement = [toggle_off, toggle_on, channels, channel_messages]

		connection.query(statement.join(";"), (err, results) => {
			if (err) reject(500)
			if (!results) {
				console.log("failed update")
				return reject(404)
			}

			return resolve({
				channels: parse(results[2]),
				payload: {
					messages: results[3]
				}
			})
		})
	})
}

export default save_selected_channel