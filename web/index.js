const ROUTES_TO_FETCH_DEV = {
  dev: "http://localhost:3000"
}

const ROUTES_TO_FETCH_PROD = {
  render: "https://deploy-api-render.onrender.com"
}

const f_movies_default = document.querySelector(".fetch-movies")
// const getAllFetched_default = Array.from(f_movies_default.children).map((x) => {
//   const toFetch = x.attributes?.["data-to-fetch"]?.value
//   return toFetch
// })

document.addEventListener("click", async (e) => {
  const foundToFetch = e.target.attributes?.["data-to-fetch"]?.value
  if (foundToFetch === undefined) {
    return
  } else {
    const toShowFetchedOnDOM_default = document.querySelector(".f-movies-show")
    try {
      const getData = await fetch(
        `${ROUTES_TO_FETCH_PROD.render}/${foundToFetch}`
      )
      // const getData = await fetch(`${ROUTES_TO_FETCH_DEV.dev}/${foundToFetch}`)
      const contentType = getData.headers.get("Content-Type")

      if (contentType.includes("text/html")) {
        const htmlContent = await getData.text()
        toShowFetchedOnDOM_default.innerHTML = htmlContent
      } else if (contentType.includes("application/json")) {
        const { data, ...rest } = await getData.json()

        if (rest.error) {
          throw new Error(rest.error)
        }

        if (Array.isArray(data)) {
          data.forEach((movie) => {
            const movieDiv = document.createElement("div")

            // Set the innerHTML of the movie div with the movie's properties
            movieDiv.innerHTML = `
        <div>
          <h2>${movie.title}</h2>
          <p>Year: ${movie.year}</p>
          <p>Director: ${movie.director}</p>
          <p>Duration: ${movie.duration} minutes</p>
          <p>Genre: ${movie.genre.join(", ")}</p>
          <p>Rate: ${movie.rate}</p>
          <p>Won an Oscar: ${movie.oscar}</p>
          <p>Based on book: ${movie.basedOnBook}</p>
          <img src="${movie.poster}" alt="${movie.title} Poster" />
        </div>
      `

            // Append the movie div to the moviesContainer
            toShowFetchedOnDOM_default.appendChild(movieDiv)
          })
        } else if (typeof rest === "object") {
          const movieDiv = document.createElement("div")
          movieDiv.innerHTML = `
        <div>
          <h2>${rest.title}</h2>
          <p>Year: ${rest.year}</p>
          <p>Director: ${rest.director}</p>
          <p>Duration: ${rest.duration} minutes</p>
          <p>Genre: ${rest.genre.join(", ")}</p>
          <p>Rate: ${rest.rate}</p>
          <p>Won an Oscar: ${movie.oscar}</p>
          <p>Based on book: ${movie.basedOnBook}</p>
          <img src="${rest.poster}" alt="${rest.title} Poster" />
        </div>
      `

          // Append the movie div to the moviesContainer
          toShowFetchedOnDOM_default.appendChild(movieDiv)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toShowFetchedOnDOM_default.innerHTML = error
    }
  }
})

document.addEventListener("click", async (e) => {
  const foundFetchKeys = e.target.attributes?.["f-keys"]?.value
  if (foundFetchKeys === undefined) {
    return
  } else {
    const foundToKeys = document.querySelector(".fetched-keys")

    try {
      const getData = await fetch(`${ROUTES_TO_FETCH_PROD.render}/movies/keys`)
      // const getData = await fetch(`${ROUTES_TO_FETCH_DEV.dev}/movies/keys`)

      const { keys } = await getData.json()

      if (keys.error) {
        throw new Error(rest.error)
      }

      Object.values(keys).forEach(({ key, type }) => {
        const movieDiv = document.createElement("p")
        const theKey = key
        const theType = type

        movieDiv.innerHTML = `<span>the key: ${theKey}. The type: ${theType}</span>`
        foundToKeys.appendChild(movieDiv)
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      foundFetchKeys.innerHTML = error
    }
  }
})

document.addEventListener("click", async (e) => {
  const foundToFetchWithFilters =
    e.target.attributes?.["fetch-with-filters"]?.value

  if (foundToFetchWithFilters === undefined) {
    return
  } else {
    const toDOM = document.querySelector(".fetched-filters")

    const getData = await fetch(
      `${ROUTES_TO_FETCH_PROD.render}/${foundToFetchWithFilters}`
    )
    /*
    const getData = await fetch(
      `${ROUTES_TO_FETCH_DEV.dev}/${foundToFetchWithFilters}`
    )
    */
    const contentType = getData.headers.get("Content-Type")

    if (contentType.includes("text/html")) {
      const htmlContent = await getData.text()
      toDOM.innerHTML = htmlContent
    } else if (contentType.includes("application/json")) {
      const { data, ...rest } = await getData.json()

      if (rest.error) {
        throw new Error(rest.error)
      }

      if (Array.isArray(data)) {
        if (data.length === 0) {
          const movieDiv = document.createElement("div")
          movieDiv.innerHTML = `No data to show`
          return toDOM.appendChild(movieDiv)
        }

        data.forEach((movie) => {
          const movieDiv = document.createElement("div")

          // Set the innerHTML of the movie div with the movie's properties
          movieDiv.innerHTML = `
        <div>
          <h2>${movie.title}</h2>
          <p>Year: ${movie.year}</p>
          <p>Director: ${movie.director}</p>
          <p>Duration: ${movie.duration} minutes</p>
          <p>Genre: ${movie.genre.join(", ")}</p>
          <p>Rate: ${movie.rate}</p>
          <p>Won an Oscar: ${movie.oscar}</p>
          <p>Based on book: ${movie.basedOnBook}</p>
          <img src="${movie.poster}" alt="${movie.title} Poster" />
        </div>
      `

          // Append the movie div to the moviesContainer
          toDOM.appendChild(movieDiv)
        })
      } else if (typeof rest === "object") {
        const movieDiv = document.createElement("div")
        movieDiv.innerHTML = `
        <div>
          <h2>${rest.title}</h2>
          <p>Year: ${rest.year}</p>
          <p>Director: ${rest.director}</p>
          <p>Duration: ${rest.duration} minutes</p>
          <p>Genre: ${rest.genre.join(", ")}</p>
          <p>Rate: ${rest.rate}</p>
          <p>Won an Oscar: ${movie.oscar}</p>
          <p>Based on book: ${movie.basedOnBook}</p>
          <img src="${rest.poster}" alt="${rest.title} Poster" />
        </div>
      `

        // Append the movie div to the moviesContainer
        toDOM.appendChild(movieDiv)
      }
    }
  }
})

const buttonToClean = document.querySelector(".clean-fetched-filters")
buttonToClean.addEventListener("click", async (e) => {
  const toDOM = document.querySelector(".fetched-filters")
  toDOM.innerHTML = ""
})
