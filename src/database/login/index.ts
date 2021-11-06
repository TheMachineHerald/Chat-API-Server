import bcrypt from "bcryptjs"
import get_user from "./get_user"

function user_login(connection: _Pool, user: LOGIN_ROUTE_BODY) {
	return new Promise<LOGIN_ROUTE_PAYLOAD>((resolve, reject) => {
		const { email, password } = user

		get_user(connection, email)
			.then((payload: LOGIN_ROUTE_PAYLOAD) => {
				bcrypt.compare(
					password,
					payload.user.passwrd.toString(),
					(err: Error, result: boolean) => {
						if (err) {
							console.log("err in bcrypt compare: ", err)
							return reject(500)
						}

						if (!result) return reject(404)

						// auth user with session token/cookie
						// for dev just resolve and continue program execution
						payload.user.passwrd = password
						return resolve(payload)
					})
			})
			.catch((err: STATUS_CODE) => {
				console.log(err)
				return reject(err)
			})
	})
}

export default user_login