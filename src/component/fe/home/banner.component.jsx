import { useEffect, useState } from "react";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";

import bannerSvc from "../../../pages/cms/banner/banner.service";
const BannerComponent = () => {
    const [bannerData, setbannerData] = useState()
    const getBannerForhome = async () => {
        try {
            const response = await bannerSvc.getBannerForHomePage()
            setbannerData(response.result)
        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        getBannerForhome()
    }, [])
    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={12} md={12}>

                        {
                            bannerData ? <>
                                <Carousel>
                                    {
                                        bannerData.map((banner, ind) => (
                                            <Carousel.Item key={ind}>
                                                <a target="_new" href={banner.url}>
                                                <Image fluid src={import.meta.env.VITE_IMAGE_URL + '/' + banner.image} />
                                                </a>
                                                <Carousel.Caption>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel>
                            </> : <></>
                        }

                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default BannerComponent