import express from "express"

const router = express.Router()

router.post("/signup", async (req, res) => {
    const data = req.body

    const result = await userSignup(data)
    res.send("this is signup route")
})

export const userRoutes = router
