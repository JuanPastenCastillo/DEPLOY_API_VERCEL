const z = require("zod")

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required"
  }),
  year: z
    .number({
      invalid_type_error: "Movie year must be a number",
      required_error: "Movie year is required"
    })
    .int()
    .min(1906)
    .max(new Date().getFullYear() + 1),
  director: z.string({
    invalid_type_error: "Movie director must be a string",
    required_error: "Movie director is required"
  }),
  duration: z
    .number({
      invalid_type_error: "Movie duration must be a number",
      required_error: "Movie duration is required"
    })
    .int()
    .positive(),
  poster: z.string().url({
    message: "Poster must be a valid URL"
  }),
  genre: z
    .enum([
      "Action",
      "Adventure",
      "Animation",
      "Biography",
      "Crime",
      "Drama",
      "Fantasy",
      "Romance",
      "Sci-Fi"
    ])
    .array({
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genre"
    }),
  rate: z
    .number({
      invalid_type_error: "Movie rate must be a number",
      required_error: "Movie rate is required"
    })
    .min(0)
    .max(10)
    .nullable()
    .default(null),
  oscar: z.boolean().nullable().default(null),
  basedOnBook: z.boolean().nullable().default(null)
})

const validateMovie = ({ objectToValidate }) => {
  /*
  You can validate the data with the method "parse" or you can use "safeParse". With "safeParse" you will have a object result with data or errors. You can even use the safeParseAsync to avoid blocking the request
  return movieSchema.parse(objectToValidate)
  */
  return movieSchema.safeParse(objectToValidate)
}

const validatePartialMovies = ({ objectToValidate }) => {
  return movieSchema.partial().safeParse(objectToValidate)
}

module.exports = { validateMovie, validatePartialMovies }
