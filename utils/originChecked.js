const HOST_API = "localhost:3000" // Same origin of API

const originChecked = ({ req, ACCEPTED_ORIGINS }) => {
  const { origin = null, host = null } = req.headers

  return {
    acceptedOrigin: ACCEPTED_ORIGINS.includes(origin) || host === HOST_API,
    origin
  }
}

module.exports = {
  originChecked
}
