import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { EmailInputComponent, PasswordInput } from "../../../component/common/form/input.component"
import Authsvc from "../auth.service"

const LoginPage = () => {
const navigate = useNavigate()

    const schema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required")
           
    })      
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver:yupResolver(schema)
  })

    const submitForm = async(data) => { 
        try {
            const loginData = await Authsvc.login(data);
            console.log(loginData)
            toast.success(`Welcome to ${loginData.result.userDetail.role} Panel`)
            navigate("/"+loginData.result.userDetail.role)
        } catch (exception) {
            console.log(exception)
           toast.error(exception.data.message)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("_au") || null
        if (token) {
            const userDetail = JSON.parse(localStorage.getItem("_ud")) || null
            if (userDetail) {
                navigate("/"+userDetail.role)
       }
   }     
},[])

    const theme = "dark"
    return (<>
        <Container className={`bg-secondary mt-5 `}>
            <Row >
                <Col sm={12}>
                    <h1 className="text-center ">Login</h1>
                </Col>
            </Row>
            <Row>
                <Col className="p-3 my-3 bg-dark-subtle " sm={12} md={{ offset: 2, span: 8 }} lg={{ offset: 3, span: 6 }}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Username:</Form.Label>
                            <Col sm={9}>
                                <EmailInputComponent
                                    name={"email"}
                                    control={control}
                                    errMsg={errors?.email?.message}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Password:</Form.Label>
                            <Col sm={9}>
                                <PasswordInput
                                    name={"password"}
                                    control={control}
                                    errMsg={errors?.password?.message}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{ span: 9, offset: 3 }}>
                                <NavLink className={'btn btn-sm btn-link'} to='/forget-password'>Forget Password?</NavLink>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{ span: 9, offset: 3 }}>
                                <Button variant="danger" type="reset" size="sm" className="me-1">
                                    <i className="fa fa-trash"></i>Cancel
                                </Button>
                                <Button variant="success" type="submit" size="sm" className="me-1">
                                    <i className="fa fa-paper-plane"></i>Send
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col>
                            Or
                            <NavLink className={"btn btn-sm btn-link"} to={"/register"}>Create an Account</NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <form></form>
            </Row>
        </Container>
    </>)
}
export default LoginPage