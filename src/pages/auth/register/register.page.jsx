import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { EmailInputComponent, ImageUpoloaderComponent, SelectDropdownComponent, TextAreaInputComponent, TextInputComponent } from "../../../component/common/form/input.component"
import Authsvc from "../auth.service"

const options = [
    { value: 'customer', label: 'Customer' },
    { value: 'seller', label: 'Seller' }
]
const RegisterPage = () => {
    const registerSchema = Yup.object({
        name: Yup.string().min(2,"Name should be of at least 2 character long").max(30).required(),
        email: Yup.string().email().required("Email is required field"),
        address: Yup.string().min(2).max(150).required(""),
        role: Yup.object({
            label: Yup.string().matches(/^(Seller|Customer)$/,'role should be either customer or seller'),
            value:Yup.string().matches(/^(seller|customer)$/,'role should be either customer or seller'),
        },"Role should be provided").required("Role is compulsory"),
        phone: Yup.string().required("Phone is reqired filed"),
        // image:Yup.object().optional().nullable()
    })
    const [thumb, setThumb] = useState();
    const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm({
        resolver:yupResolver(registerSchema)
    })
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const submitForm = async (data) => {
        setLoading(true)
    try {
        const formattedData = {
            ...data,
            role:data.role.value
        }
        const resolve = await Authsvc.register(formattedData)
        toast.success("Your account has been registered successfully.Please check your email for further step.")
        navigate("/")
    } catch (exceptiton) {
        console.log("Error registration", exceptiton)
        toast.error(exceptiton?.data?.message)
    } finally {
        setLoading(false)
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
    return (<>
        <Container className={`bg-secondary mt-5 p-3 my-5`}>
            <Row >
                <Col sm={12}>
                    <h1 className="text-center ">Register</h1>
                </Col>
            </Row>
            <Row>
                <Col className="p-3 my-3 bg-dark-subtle " sm={12} md={{ offset: 2, span: 8 }} lg={{ offset: 2, span: 8 }}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Full Name:</Form.Label>
                            <Col sm={9}>
                                <TextInputComponent
                                    name={"name"}
                                    errMsg={errors?.name?.message}
                                    control={control}
                                />
                               
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Email(username):</Form.Label>
                            <Col sm={9}>
                                <EmailInputComponent
                                name={"email"}
                                errMsg={errors?.email?.message}
                                control={control}
                                />  
                            </Col>   
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Phone:</Form.Label>
                            <Col sm={9}>
                                <TextInputComponent
                                    name={"phone"}
                                    errMsg={errors?.phone?.message}
                                    control={control}
                                />  
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Address:</Form.Label>
                            <Col sm={9}>
                                <TextAreaInputComponent
                                    name={"address"}
                                    control={control}
                                    errMsg={errors?.address?.message}
                                
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Role:</Form.Label>
                            <Col sm={9}>
                            
                                <SelectDropdownComponent
                                    name={"role"}
                                    control={control}
                                    errMsg={errors?.role?.message}
                                    setValue={setValue}
                                    options={options}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Image:</Form.Label>
                            <Col sm={7}>
                                <ImageUpoloaderComponent
                                    name={"image"}
                                    errMsg={errors?.image?.message}
                                    control={control}
                                    setError={setError}
                                    setValue={setValue}
                                    setThumb={setThumb}
                                />
                                
                                <span className="text-danger">{errors?.image?.message}</span>
                            </Col>
                            <Col sm={2}>
                                <Image fluid alt="thumbnail" src={
                                    thumb ? URL.createObjectURL(thumb):'https://placehold.co/600x200/DDDDDD/999999?text=No+image+found'
                                 } />
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
                    <Row>
                        <Col>
                            Or
                            <NavLink className={"btn btn-sm btn-link"} to={"/login"}>Login</NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row >
            
        </Container >

    </>)
}
export default RegisterPage