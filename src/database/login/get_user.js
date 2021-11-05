import parse from "./parse"

function get_user(connection, email) {
	return new Promise((resolve, reject) => {
		const user = `
            SELECT * FROM
            Users
            WHERE email = ${connection.escape(email)}
        `
		const servers = `
            SELECT 
                s.id as server_id, server_name, created_by_user_id
            FROM Server_Users as su
            JOIN Servers as s 
            ON s.id = su.server_id
            WHERE su.user_id = ( 
                SELECT id
                FROM Users
                WHERE email=${connection.escape(email)}
            )
        `
		const selected_server_channels = `
            SELECT * FROM
            User_Channels as uc
            WHERE
            uc.user_id = (
                SELECT id
                FROM Users
                WHERE email = ${connection.escape(email)}
            )
            AND
            uc.server_id = (
                SELECT selected_server_id 
                FROM Users
                WHERE email = ${connection.escape(email)}
            )
        `
		const update_user = `
            UPDATE Users
            SET status = 1 
            WHERE email = ${connection.escape(email)}
        `

		const statement = [user, servers, selected_server_channels]

		connection.query(
			statement.join(";"),
			(err, results) => {
				if (err) {
					console.log(err)
					return reject(500)
				}

				if (!results[0]) {
					console.log("does not exist: ", results)
					return reject(404)
				}

				connection.query(update_user, (err, update_response) => {
					if (err) 
						console.log(err)

					return resolve(parse(results))
				})
			})
	})
}

export default get_user