const toJSON = ({ req, next }) => {
  let body = ""
  req.on("data", (chunk) => {
    body += chunk.toString()
  })

  req.on("end", () => {
    const data = JSON.parse(body)
    req.body = data
    next()
  })
}

module.exports = { toJSON }
