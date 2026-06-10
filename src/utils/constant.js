
// // local devlopment
// export const CONSTANT = {
// BASE_URL : "http://localhost:8000"
// }

// // // Producntion
// // // export const BASE_URL : "/api";


export const CONSTANT = {
BASE_URL : location.hostname === "localhost" ?"http://localhost:8000" : "/api"
}

