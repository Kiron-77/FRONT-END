import { Col, Container, Row } from "react-bootstrap"

const Error404 = ({goBackUrl,name}) => {
    return (<>
        <Container className="my-5">
            <Row className="bg-danger-subtle p-3 mx-3">
                <Col sm={12} md={{ offset: 2, span: 8 }} className="p-3 text-center text-danger">
                    Opps!! The page/resources you are looking for does not exist!!!
                    <p>
                        Go back to
                        <a href={goBackUrl} className="btn btn-link">
                            {name}
                        </a>
                    </p>
                </Col>
            </Row> 
    </Container>
    </>)
}
export default Error404