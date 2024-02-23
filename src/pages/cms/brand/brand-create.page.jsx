import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { ImageUpoloaderComponent, SelectDropdownComponent, TextInputComponent } from "../../../component/common/form/input.component"
import brandSvc from "./brand.service"

const BrandCreate = () => {
    const brandRules = Yup.object({
        title: Yup.string().min(2).required(),
        tagline: Yup.string().required(),
        status: Yup.object({
            label: Yup.string().matches(/^(Publish|Un-Publish)$/),
            value: Yup.string().matches(/^(active|inactive)$/),
        }).required()
    })

    const [thumb, setThumb] = useState();
    const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm({
        resolver: yupResolver(brandRules)
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitForm = async (data) => {
        try {
            setLoading(true)
            const formatted = {
                ...data,
                status: data.status.value
            }
            console.log(formatted)
            const response = await brandSvc.createBrand(formatted)
            console.log(response)
            toast.success("Brand Created Successfully.")
            navigate('/admin/brand')
        } catch (exception) {
            toast.error("Brand can not be created at this moment.")
            console.log(data)
        } finally {
            setLoading(false)
        }

    }
    return (<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">Brand Create</h1>
            <AdminBreadCrumb
                data={[
                    {
                        title: "Home",
                        link: "/"
                    },
                    {
                        title: "Dashboard",
                        link: "/admin"
                    },
                    {
                        title: "Brand List",
                        link: "/admin/brand"
                    },
                    {
                        title: "Brand Create",
                        link: null
                    }
                ]}
            />

            <Card className="mb-4">
                <Card.Header>
                    <Container>
                        <Row>
                            <Col sm={12} md={6}><h4>Brand Create</h4></Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col sm-3">Title:</Form.Label>
                            <Col sm={9}>
                                <TextInputComponent
                                    name={'title'}
                                    control={control}
                                    errMsg={errors?.title?.message}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col sm-3">Tagline:</Form.Label>
                            <Col sm={9}>
                                <TextInputComponent
                                    name={'tagline'}
                                    control={control}
                                    errMsg={errors?.tagline?.message}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col sm-3">Status:</Form.Label>
                            <Col sm={9}>
                                <SelectDropdownComponent
                                    control={control}
                                    errMsg={errors?.status?.message}
                                    name={"status"}
                                    isMultiple={true}
                                    options={
                                        [{ label: "Publish", value: "active" },
                                        { label: "Un-Publish", value: "inactive" }]
                                    }
                                    setValue={setValue}
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
                                    thumb ? URL.createObjectURL(thumb) : 'https://placehold.co/600x200/DDDDDD/999999?text=No+image+found'
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
                </Card.Body>
            </Card>



        </div>
    </>)
}
export default BrandCreate