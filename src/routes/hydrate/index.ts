import express from "express"
import { router as hydrate_user_route } from "./hydrate_user"

const router = express.Router()

router.use("/user", hydrate_user_route)

router.get("/", (req: _Request, res: _Response): void => {
	res.send("hydrate GET route")
})

export { router }