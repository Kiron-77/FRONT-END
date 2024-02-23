import HttpService from "../../config/http.service";

class AuthService extends HttpService{
    login = async(data) => {
        try {
            const loginResponse = await this.postRequest(
                '/v1/auth/login',
                data
            )
            if (loginResponse) {
                localStorage.setItem("_au", loginResponse.result.token)
                localStorage.setItem("_ud",JSON.stringify(loginResponse.result.userDetail))
            }
            return loginResponse
        } catch (exception) {
            throw exception
        }
    }
    register = async (data) => {
        try {
            let registerResponse = await this.postRequest(
                '/v1/auth/register',
                data,
                {file:true}
            )
           return registerResponse 
        } catch (exception) {
            throw exception
        }
    }
    verifyToken = async(token) => {
        try {
            const response = await this.getRequest('/v1/auth/verify/'+token)
            return response;
        } catch (exception) {
            throw exception
        }
    }
    setActivationPassword = async (data, token) =>{
        try {
            const response = await this.postRequest('/v1/auth/activation/'+ token,data)
            return response;
        } catch (exception) {
            throw exception
        }
    }
    getLoggedInUserDetail = async () => {
        try {
            const userDetail = await this.getRequest('/v1/auth/me', { auth: true })
            return userDetail
        } catch (exception) {
            throw exception
        }
    }
}
const Authsvc = new AuthService()
export default Authsvc