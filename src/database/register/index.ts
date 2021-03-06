import bcrypt from "bcryptjs"
import parse from "../login/parse"
import check_dupe from "./check_dupe"
require("dotenv").config()

function user_register(connection: _Pool, user: REGISTER_ROUTE_REQUEST_BODY) {
    return new Promise<REGISTER_ROUTE_RESPONSE>((resolve, reject) => {
        const {
            first_name,
            last_name,
            user_name,
            email,
            password
        } = user

        check_dupe(connection, email)
            .then(check_dupe_response => {
                bcrypt.genSalt(10, (err, salt) => {
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
                                1
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
                        const select_user = `
                            SELECT
                            u.id, u.first_name, u.last_name, u.user_name, u.email, u.passwrd, u.status, u.home_selected, u.selected_friend_id, u.selected_friend_user_name, uc.server_id as selected_server_id, uc.server_name as selected_server_name, u.created_date
                            FROM Users as u
                            INNER JOIN User_Channels as uc on uc.user_id = u.id
                            WHERE uc.is_selected = 1 AND u.id = (
                                SELECT id FROM Users
                                WHERE email = ${connection.escape(email)}
                            )
                        `
                        const select_servers = `
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
                        const select_selected_server_channels = `
                            SELECT * FROM
                            User_Channels as uc
                            WHERE
                            uc.user_id = (
                                SELECT id
                                FROM Users
                                WHERE email = ${connection.escape(email)}
                            )
                        `
                        const statement = [
                            insert_user,
                            server,
                            server_user,
                            text_channel,
                            user_text_channel,
                            voice_channel,
                            user_voice_channel,
                            select_user,
                            select_servers,
                            select_selected_server_channels
                        ]

                        connection.query(
                            statement.join(";"),
                            (err, register_response: _RowDataPacket) => {
                                if (err) {
                                    console.log(err)
                                    return reject(500)
                                }

                                register_response[7][0].passwrd = password
                                return resolve(parse(register_response[7][0], register_response[8], register_response[9]))
                            }
                        )
                    })
                })
            })
            .catch((err: number) => {
                console.log(err)
                return reject(err)
            })
    })
}

export default user_register