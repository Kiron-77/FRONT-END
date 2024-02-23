import { Col, Container, Row, Spinner } from "react-bootstrap"
const LoadingComponent = () => {
    return (<>
        <Container className="my-5">
            <Row className="my-5">
                <Col className="text-center p-5">
                    <Spinner></Spinner>
                </Col>
            </Row>
    </Container>
    </>)
}
export default LoadingComponent