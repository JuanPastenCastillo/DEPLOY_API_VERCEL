const HOST_API = "localhost:3000" // Same origin of API

const originChecked = ({ req, ACCEPTED_ORIGINS }) => {
  const { origin = null, host = null } = req.headers

  return {
    acceptedOrigin: ACCEPTED_ORIGINS.includes(origin) || HOST_API === host,
    origin
  }
}

module.exports = {
  originChecked
}
