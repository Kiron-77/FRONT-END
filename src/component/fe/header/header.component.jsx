import { Button, Container, Form, Nav, NavDropdown, Navbar, } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
const FeHeader = () => {
    const [query,setQuery]=useSearchParams()
    return (<>
    <Navbar expand={"lg"} className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        E-commerce
                    </Navbar.Brand>
                    <Navbar.Toggle
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                    </Navbar.Toggle>
                    <Navbar.Collapse id="menu">
                        <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Nav.Item>
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className={"nav-link"} to="/about-us">About Us</NavLink>
                            </Nav.Item>
                        <NavDropdown title="Brand" id="brand-dropdown">
                            <NavLink className={"dropdown-item"} to={"/brand/apple"}>Apple</NavLink>
                            <NavLink className={"dropdown-item"} to={"/brand/samsung"}>Samsung</NavLink>
                            </NavDropdown>
                            <NavDropdown title="Category" id="category-dropdown">
                            <NavLink className={"dropdown-item"} to={"/category/clothings"}>Clothings</NavLink>
                            <NavLink className={"dropdown-item"} to={"/category/smart-phones"}>Smart Phones</NavLink>
                            </NavDropdown>

                        </Nav>
                        <Form className="d-flex" role="search" onSubmit={(e)=>{e.preventDefault}}>
                            <Form.Control
                                type="search"
                                className="me-2"
                            placeholder="Search"
                            name="q"
                            onChange={(e) => {
                                const type = e.target.value
                                setQuery({q:type})
                            }}
                            />
                            <Button variant="outline-success" type="submit">
                                Search
                            </Button>
                        </Form>
                        <Nav>
                            <Nav.Item>
                                <NavLink className={"nav-link"} to="/register">Register</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className={"nav-link"} to="/login">Login</NavLink>
                            </Nav.Item>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
    </>)
}
export default FeHeader