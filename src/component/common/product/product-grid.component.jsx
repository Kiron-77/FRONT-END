import { Row } from "react-bootstrap"
import SingleProductItem from "./single-product.component"
const ProductGridList = ({products}) => {
  
    return (<>
        <Row>
            {
                products && products.map((prod, ind) => (<>
                <SingleProductItem product={prod} key={ind}/>
                </>))
          }
        </Row>
    </>)
}
export default ProductGridList