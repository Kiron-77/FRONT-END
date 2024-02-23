import { useCallback, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ProductGridList from "../../component/common/product/product-grid.component"
import categorySvc from "../cms/category/category.service"

const CategoryDetailPage = () => {
    const params = useParams()
    const [products,setProducts]=useState()
    const getCategoryDetail = useCallback(async () => {
        try {
            const detail = await categorySvc.getCategoryDetail(params.slug)
            setProducts(detail.result)
        } catch (exception) {
            console.log(exception)
        }
    },[params])
    useEffect(() => {
       getCategoryDetail() 
    },[])
    return (<>
        <Container className="my-5 py-5">
            <Row>
                <Col>Category Detail:</Col>
            </Row>
            <Row className="my-3">
                {
                    products && products > 0 ? <>
                        <ProductGridList products={ products} />
                    </> : <>
                    <p className="text-danger">no products found</p>
                    </>
                }
            </Row>
    </Container>
    </>)
}
export default CategoryDetailPage