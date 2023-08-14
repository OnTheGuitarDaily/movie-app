
// create axios instance
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjE0N2I0YjVhYWM3NDQzMWU0NzQ4NDk4MmUzNTM2MyIsInN1YiI6IjY0ZDYxNjVkZGI0ZWQ2MDBlMmI2NTY3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TI5LFenov7WG0EdfgYrWK_NoLkrckBYpalubSg5dkrs"
    },
    params : {
      query: '',
    }
  })

  

// Define api endpoints
export const getData = (endpoint) => instance.get(endpoint);

export const search = (endpoint, searchQuery) => {
  instance.defaults.params.query = searchQuery
  return instance.get(endpoint);
}

