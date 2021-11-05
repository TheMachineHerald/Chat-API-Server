import bcrypt from "bcryptjs"
import check_dupe from "./check_dupe"
require("dotenv").config()

function user_register(connection, user) {
	return new Promise((resolve, reject) => {
		const {
			first_name,
			last_name,
			user_name,
			email,
			password
		} = user
		const salt_rounds = parseInt(process.env.SALT_ROUNDS)

		check_dupe(connection, email)
			.then(response => {
				bcrypt.genSalt(salt_rounds, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						const insert_user = `
                  INSERT INTO Users
                  (first_name, last_name, user_name, email, passwrd)
                  VALUES
                  (
                    ${connection.escape(first_name)}, 
                    ${connection.escape(last_name)},
                    ${connection.escape(user_name)},
                    ${connection.escape(email)},
                    ${connection.escape(hash)}
                  )
              `
						const select_user = `
                  SELECT * FROM
                  Users
                  WHERE email = ${connection.escape(email)}
              `
						const server = `
                  INSERT INTO Servers
                  (server_name, created_by_user_id)
                  VALUES
                  (${connection.escape(user_name)}, LAST_INSERT_ID())
              `
						const server_user = `
                  INSERT INTO Server_Users
                  (server_id, user_id, user_name)
                  VALUES
                  (
                      LAST_INSERT_ID(),
                      (
                          SELECT id
                          FROM Users
                          WHERE email = ${connection.escape(email)}
                      )
                      ,
                      ${connection.escape(user_name)}
                  )
              `
						const text_channel = `
                  INSERT INTO Channels
                  (
                      server_id,
                      created_by_user_id,
                      channel_name,
                      type,
                      user_id
                  )
                  VALUES
                  (
                      (
                          SELECT su.server_id 
                          FROM Server_Users as su
                          WHERE su.user_id = (
                              SELECT id FROM Users 
                              WHERE email = ${connection.escape(email)}
                          )
                      ),
                      (SELECT id FROM Users WHERE email = ${connection.escape(email)}),
                      'general',
                      'TEXT',
                      (SELECT id FROM Users WHERE email = ${connection.escape(email)})
                  )
              `
						const user_text_channel = `
                  INSERT INTO User_Channels
                  (
                      channel_id,
                      channel_name,
                      server_id,
                      server_name,
                      user_id,
                      user_name,
                      type,
                      is_selected
                  )
                  VALUES
                  (
                      LAST_INSERT_ID(),
                      'general',
                      (
                          SELECT su.server_id
                          FROM Server_Users as su
                          WHERE su.user_id = (
                            SELECT id FROM Users 
                            WHERE email = ${connection.escape(email)}
                          )
                      ),
                      ${connection.escape(user_name)},
                      (SELECT id FROM Users WHERE email = ${connection.escape(email)}),
                      ${connection.escape(user_name)},
                      'TEXT',
                      0
                  )
              `
						const voice_channel = `
                  INSERT INTO Channels
                  (
                      server_id,
                      created_by_user_id,
                      channel_name,
                      type,
                      user_id
                  )
                  VALUES
                  (
                      (
                          SELECT su.server_id 
                          FROM Server_Users as su
                          WHERE su.user_id = (
                              SELECT id FROM Users 
                              WHERE email = ${connection.escape(email)}
                          )
                      ),
                      (SELECT id FROM Users WHERE email = ${connection.escape(email)}),
                      'General',
                      'VOICE',
                      (SELECT id FROM Users WHERE email = ${connection.escape(email)})
                  )
              `
						const user_voice_channel = `
                  INSERT INTO User_Channels
                  (
                      channel_id,
                      channel_name,
                      server_id,
                      server_name,
                      user_id,
                      user_name,
                      type,
                      is_selected
                  )
                  VALUES
                  (
                      LAST_INSERT_ID(),
                      'General',
                      (
                          SELECT su.server_id 
                          FROM Server_Users as su 
                          WHERE su.user_id = (
                              SELECT id FROM Users 
                              WHERE email=${connection.escape(email)}
                          )
                      ),
                      ${connection.escape(user_name)},
                      (SELECT id FROM Users WHERE email=${connection.escape(email)}),
                      ${connection.escape(user_name)},
                      'VOICE',
                      0
                  )
              `
						const statement = [
							insert_user,
							select_user,
							server,
							server_user,
							text_channel,
							user_text_channel,
							voice_channel,
							user_voice_channel
						]

						connection.query(
							statement.join(";"),
							(err, results) => {
								if (err) {
									console.log(err)
									return reject(500)
								}

								results[1][0].passwrd = password
								return resolve(results[1][0])
							}
						)
					})
				})
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
	})
}

export default user_register