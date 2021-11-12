import get_data from "./hydrate"

/**
 * @NOTE I could've simply put the database transaction within hydrate_user
 *       but I decided to not constrain the function and keep the interface
 *       open for promise chaining if need be.
 */
function hydrate_user(connection: _Pool, user_id: number) {
	return new Promise<_RowDataPacket[]>((resolve, reject) => {
		get_data(connection, user_id)
			.then((get_data_resolve: _RowDataPacket[]) => {
				resolve(get_data_resolve)
			})
			.catch((err: STATUS_CODE) => {
				console.log(err)
				reject(err)
			})
	})
}

export {
	hydrate_user
}