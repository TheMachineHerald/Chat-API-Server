function update_home_state(connection: _Pool, user_id: number): Promise<any> {
    return new Promise<void>((resolve, reject) => {
        const statement = `
            UPDATE Users
            SET home_selected = !home_selected
            WHERE id = ?
        `
        connection.query(statement, [user_id], (err, response: _RowDataPacket[]) => {
            if (err) return reject(500)
            if (!response) {
                console.log("not found")
                return reject(404)
            }

            console.log("update home state response: ", response)
            return resolve()
        })
    })
}

export default update_home_state