const banStatus = async (req, res, next) => {
    try {
        if (req.user.isBanned) {
            res.status(401).json({ error: `Banned` })
        } else {
            next()
        }
    } catch (err) {
        res.status(401).json({ error: `${err}` })
    }
}

module.exports = banStatus