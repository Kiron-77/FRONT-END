import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { PasswordInput } from "../../../component/common/form/input.component"
import LoadingComponent from "../../../component/common/loading/loading.component"
import Authsvc from "../auth.service"

const ActivatePage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const passwordRules = Yup.object({
        password:Yup.string().min(8).max(25).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/, { message: "Password must contain one lowercase,one uppercase,a number,one special character and should be of 8-25 character long." }).required("Password is required"),
        confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"Password and Confirm Password does not match")
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(passwordRules)
    })

    const getVerifyToken = async() => {
        try {
            const response = await Authsvc.verifyToken(params.token)
            setLoading(false)
            console.log(response)
        } catch (exception) {
            console.log(exception)
            toast.error("Error verifying token")
            navigate('/login')
        }
    }
    useEffect(() => {
       getVerifyToken() 
    }, [])
    const submitForm = async(data) => {
        try {
            let response = await Authsvc.setActivationPassword(data, params.token)
            toast.success(response.message)
            navigate('/login')
        } catch (exception) {
            console.log(exception)
            toast.error("Password can not be updated at this moment.Please contact our admin")
            navigate("/register")
        }
    }
    return (<>
        {
            loading ? <LoadingComponent /> : <>
                <Container className={`bg-secondary mt-5 p-3 my-5`}>
                    <Row >
                        <Col sm={12}>
                            <h1 className="text-center ">Activate Account</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="p-3 my-3 bg-dark-subtle " sm={12} md={{ offset: 2, span: 8 }} lg={{ offset: 2, span: 8 }}>
                            <Form onSubmit={handleSubmit(submitForm)}>
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
                                    <Form.Label className="col-sm-3">Confirm-Password:</Form.Label>
                                    <Col sm={9}>
                                        <PasswordInput
                                            name={"confirmPassword"}
                                            control={control}
                                            errMsg={errors?.confirmPassword?.message}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="row mb-3">
                                    <Col sm={{ span: 9, offset: 3 }}>
                                        <Button disabled={loading} variant="danger" type="reset" size="sm" className="me-1">
                                            <i className="fa fa-trash"></i>Cancel
                                        </Button>
                                        <Button disabled={loading} variant="success" type="submit" size="sm" className="me-1">
                                            <i className="fa fa-paper-plane"></i>Submit
                                        </Button>
                                    </Col>
                                </Form.Group>

                            </Form>
                  
                        </Col>
                    </Row >
            
                </Container >
            </>
        }
    </>)
}
export default ActivatePage