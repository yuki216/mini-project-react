import axios from "axios"


const authApiURL = "http://localhost:3001/profiles";//process.env.REACT_APP_AUTH_API_URL;

export const authLogin = async (req) => {
  try {
    // backend Fe do...
    const { phone_number, password } = req
    // login  post method
    const { data } = await axios.get(authApiURL)  // get all data dari DB
    console.log(req)
    // backend actually do...
    const user = data.filter(v => v.phone_number === phone_number && v.password === password ) //|| []//cek bila ada data yang sama
    
    if (user.length > 0) return { sucess: true, code: 200, status: "success", data, msg: "login sukses" }
    return { success: false, code: 404, status: "not found", data: null, msg: "User not found" }
  } catch (e) {
    return { success: false, code: 400, status: "error", data: null, msg: "Service Error" }
  }
}

export const authRegister = async (req) => {
  try {
    console.log(req)
    const { phone_number } = req
    const { data } = await axios.get(authApiURL)  // get all data dari DB
    const user = data.filter(v => v.phone_number === phone_number )   // cek jika data ada

    // backend do
    if (user.length > 0) {
      return { code: 409, status: "conflict", msg: "User already exist" }
    } else {
      await axios.post(authApiURL, req);
      return {  success: false, code: 200, status: "success", msg: "register sukses" }
    }
  } catch (e) {
    return { success: false, code: 400, status: "error", msg: "Service Error" }
  }
}