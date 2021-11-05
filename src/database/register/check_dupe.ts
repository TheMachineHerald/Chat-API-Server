function parse(obj, ctx) {
	Object.keys(obj).forEach(prop => {
		return ((obj[prop] === 0) ? ctx.resolve() : ctx.reject(-1))
	})
}

function check_dupe(connection, email) {
	return new Promise((resolve, reject) => {
		const statement = `
      SELECT EXISTS (
        SELECT 1 
        FROM Users
        WHERE email = ?
      )
    `
		connection.query(
			statement,
			email,
			(err, results) => {
				if (err) {
					console.log(err)
					return reject(500)
				}

				if (!results[0]) {
					console.log("invalid request: ", results)
					return reject(400)
				}

				return parse(results[0], { resolve: resolve, reject: reject })
			})
	})
}

export default check_dupe