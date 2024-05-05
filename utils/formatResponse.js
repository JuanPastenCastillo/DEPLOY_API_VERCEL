const formatResponse = ({ _actualFormat, theResMethod, theResBody }) => {
  if (_actualFormat === "json") {
    return theResMethod.json(theResBody)
  } else if (_actualFormat === "html") {
    let toHTML
    if (Array.isArray(theResBody)) {
      toHTML = theResBody
        .map((movie) => {
          return `<div>
      <h2>${movie.title}</h2>
      <p>Year: ${movie.year}</p>
      <p>Director: ${movie.director}</p>
      <p>Duration: ${movie.duration} minutes</p>
      <img src="${movie.poster}" alt="${movie.title} Poster" />
      <p>Genre: ${movie.genre.join(", ")}</p>
      <p>Rate: ${movie.rate}</p>
    </div>`
        })
        .join("")
    } else if (typeof theResBody === "object") {
      toHTML = `<div>
      <h2>${theResBody.title}</h2>
      <p>Year: ${theResBody.year}</p>
      <p>Director: ${theResBody.director}</p>
      <p>Duration: ${theResBody.duration} minutes</p>
      <img src="${theResBody.poster}" alt="${theResBody.title} Poster" />
      <p>Genre: ${theResBody.genre.join(", ")}</p>
      <p>Rate: ${theResBody.rate}</p>
    </div>`
    }

    return theResMethod.send(toHTML)
  } else {
    return theResMethod
      .status(400)
      .send({ message: `Bad format used «${_actualFormat}»` })
  }
}

module.exports = { formatResponse }
