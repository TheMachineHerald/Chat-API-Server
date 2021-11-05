import bcrypt from "bcryptjs"
import get_user from "./get_user"

function user_login(connection, request) {
	return new Promise((resolve, reject) => {
		const { email, password } = request

		get_user(connection, email)
			.then(payload => {
				bcrypt.compare(
					password,
					payload.user.passwrd.toString(),
					(err, result) => {
						if (err) {
							console.log("err in bcrypt compare: ", err)
							return reject(500)
						}

						if (!result) reject(404)

						// auth user with session token/cookie
						// for dev just resolve and continue program execution
						payload.user.passwrd = password
						return resolve(payload)
					})
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
	})
}

export default user_login