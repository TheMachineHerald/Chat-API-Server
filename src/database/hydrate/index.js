import get_data from "./hydrate"

function hydrate_user(connection, user_id) {
	return new Promise((resolve, reject) => {
		get_data(connection, user_id)
			.then(response => {
				resolve(response)
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
	})
}

export {
	hydrate_user
}