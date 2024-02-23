import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductGridList from "../../component/common/product/product-grid.component";
import BannerComponent from "../../component/fe/home/banner.component";
import productSvc from "../cms/product/product.service";
const HomePage = () => {
    const [product, setProduct] = useState()
    const getProductList = useCallback(async() => {
        try {
            const productResponse = await productSvc.getForHome()
            setProduct(productResponse.result)
        } catch (exception) {
            console.log(exception)
        }
    },[])
    useEffect(() => {
      getProductList()
  },[])
    return (
        <>
            <BannerComponent />

            <Container className="my-3">
                <Row>
                    <Col>
                        <h4>Products Lists</h4>
                    </Col>  
                </Row>
                <ProductGridList products={product} />
            </Container>
        </>

    )

}
export default HomePage;
