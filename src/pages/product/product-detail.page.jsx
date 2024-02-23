import { useCallback, useEffect, useState } from "react"
import { Badge, Button, Carousel, Col, Container, Form, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import LoadingComponent from "../../component/common/loading/loading.component"
import productSvc from "../cms/product/product.service"

const ProductDetailPage = () => {
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState()
    const params = useParams()
    const productDetailBySlug = useCallback(async () => {
        try {
            let response = await productSvc.getProductBySlug(params.slug)
            setDetail(response.result.detail)
        } catch (exception) {
            toast.error("Product not found")
        } finally {
            setLoading(false)
        }
    }, [params])
    useEffect(() => {
        productDetailBySlug()
    }, [])
    const showError = (e) => {
        e.target.src = 'https://placehold.co/300*250?text=No+Image+Found'
    }
    return (<>
        <Container className="my-5 py-5">
            {
                loading ? <LoadingComponent /> : (
                    detail ? <>
                        <Row>
                            <Col sm={12} md={6} >
                                <Carousel>

                                    {
                                        detail.images && detail.images.map((img, ind) => (
                                            <Carousel.Item key={ind}>
                                                <Image onError={showError} thumbnail fluid src={import.meta.env.VITE_IMAGE_URL + '/' + img} alt="" />
                                            </Carousel.Item>
                                        ))
                                    }

                                </Carousel>
                            </Col>
                            <Col sm={12} md={6} >
                                <h4 className="mb-3">{detail.title}</h4>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Brand:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        <strong>{detail.brand ?? "No Brand"}</strong>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Category:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {
                                            detail.categories && detail.categories.map((cat, ind) => (
                                                <Badge key={ind} bg="info">
                                                    {cat.title}
                                                </Badge>
                                            ))
                                        }
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Price:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        <strong className="me-3">Npr.{detail.afterDiscount}</strong>
                                        {
                                            detail.discount > 0 ? <>
                                                <del className="text-danger">Npr.{detail.price}</del>&nbsp;<span className="text-danger">-(detail.discount)% Off</span></> : ""

                                        }
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Attributes</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {
                                            detail.attributs && detail.attributes.map((attr, ind) => (
                                                <Row className="mb-2" key={ind}>
                                                    <Col sm={4}>{attr.name}</Col>
                                                    <Col sm={8}>
                                                        {
                                                            attr.value && attr.value.map((val) => (
                                                                <strong>{val},</strong>
                                                            ))

                                                        }
                                                    </Col>
                                                </Row>
                                            ))
                                        }

                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <Form.Control
                                            type={'number'}
                                            size="sm"
                                            placeholder="0"
                                            min={0}
                                            max={10}
                                        />
                                    </Col>
                                    <Col sm={8}>
                                        <Button variant="warning" type="button" size="sm">Add to Cart</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col dangerouslySetInnerHTML={{__html:detail.description}}></Col>
                        </Row>
                    </> : <><p className="text-danger text-center">Product does not exist</p></>
                )
            }

        </Container>

    </>)
}
export default ProductDetailPage