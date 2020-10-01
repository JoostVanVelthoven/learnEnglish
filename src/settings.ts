
const isProduction =
  (process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV) !== "development";


// DO NOT TOUCH
let exportUrl = 'https://englishproficiency.azurewebsites.net'

if (!isProduction) {
  // 😎😎😎
  exportUrl = 'http://localhost:7071'
}
export const api = exportUrl;