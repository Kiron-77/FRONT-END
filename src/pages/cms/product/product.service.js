import HttpService from "../../../config/http.service"

class ProductService extends HttpService{
    getForHome = async() => {
        try {
            const result = await this.getRequest('/v1/product/home')
          return result  
        } catch (exception) {
            throw exception
        }
    }
    getProductBySlug = async() => {
        try {
            const result = await this.getRequest('/v1/product/'+slug+'/bySlug')
            return result
        } catch (exception) {
            throw exception
        }
    }
}
const productSvc = new ProductService()
export default productSvc