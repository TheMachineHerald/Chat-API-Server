function save_selected_friend(connection: _Pool, ctx: SAVE_SELECTED_FRIEND_REQUEST): Promise<any> {
    return new Promise<void>((resolve, reject) => {
        const statement = `
            UPDATE Users
            SET 
            selected_friend_id = ?,
            selected_friend_user_name = ?
            WHERE id = ?
        `
        const values = [
            ctx.friend_id,
            ctx.friend_user_name,
            ctx.user_id
        ]

        connection.query(statement, values, (err, results: _RowDataPacket[]) => {
            if (err) return reject(500)
            if (!results) {
                console.log("not found")
                return reject(404)
            }

            console.log("save selected friend results: ", results)
            return resolve()
        })
    })
}

export default save_selected_friend