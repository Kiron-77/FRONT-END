import { Badge, Card, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"
const SingleProductItem = ({ product }) => {
    const showError = (e) => {
        e.target.src = "https://placehold.co/300x250?text=No+Image+Found"
    }
    return (<>
    <Col sm={6} md={4} lg={3} className="mb-3 mr-3">
                <Card >
                <Card.Img onError={showError} variant="top" src={import.meta.env.VITE_IMAGE_URL} />
                    <Card.Body>
                        <Card.Title as={'h6'} >
                        <NavLink to={"/product/"+product.slug}style={{textDecoration:"none"}}>
                            {product.title}
                            </NavLink>
                        </Card.Title>
                        <Card.Text>
                        <span className="me-2">Npr.{product.afterDiscount}</span>
                        {
                            product.discount > 0 ? <> <del className="text-danger">Npr.{product.price}</del></>:<></>
                           }
                        </Card.Text>
                    <Card.Text>
                        {
                            product.category && product.category.map((cat,ind) => (
                                <Badge bg="info" key={ind} className="me-2">{cat.title}</Badge>
                            ))
                        }
                            
                            
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-warning text-center">
                        <NavLink to="/product/+product.slug" className={"btn btn-link btn-sm"} >
                            <strong>Add To Cart</strong>
                    </NavLink>
                    </Card.Footer>
                </Card>
            </Col>
    </>)
}
export default SingleProductItem