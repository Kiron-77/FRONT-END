import { useEffect, useState } from "react"
import { Card, Col, Container, Pagination, Row, Table } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import AdminBreadCrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import TableAction from "../../../component/cms/table/table-action.component"
import TableImage from "../../../component/cms/table/table-image.component"
import TableStatusComponent from "../../../component/cms/table/table-status.component"
import LoadingComponent from "../../../component/common/loading/loading.component"
import brandSvc from "./brand.service"

const BrandList = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    let [pageNo,setPageNo]=useState(1)
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 15,
        noOfPages: 1,
    
    })

    const getAllBrands = async (config) => {
        try {
            const response = await brandSvc.listAllbrands(config)
            setData(response.result)
            let pageNo = 1;
            pageNo = ((+response.meta.currentPage - 1) * response.meta.limit) + 1;
            setPageNo(pageNo);
            setPagination({
                total: response.meta.total,
                page: response.meta.currentPage,
                limit: response.meta.limit,
                noOfPages: Math.ceil(response.meta.total / response.meta.limit)
            })
        } catch (exception) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllBrands({ page: 1, limit: 15, search: null })
    }, [])

    const deleteData = async (id) => {
        try {
            const response = await brandSvc.deleteById(id)
            getAllBrands({ page: 1, limit: 15, search: null })
            toast.success("Brand deleted successfully.")
        } catch (exception) {
            toast.error("Brand can not be deleted at this moment.")
            console.log(exception)
        }
    }

    return (<>
        <div className="container-fluid px-4">
            <h1 className="mt-4">Brand List</h1>
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
                        link: null
                    }
                ]}
            />

            <Card className="mb-4">
                <Card.Header>
                    <Container>
                        <Row>
                            <Col sm={12} md={6}><h4>Brand List</h4></Col>
                            <Col sm={12} md={6}>
                                <NavLink className={"btn btn-sm btn-success float-end text-light"} to={"/admin/brand/create"}>
                                    <i className="fa fa-plus"></i>&nbsp;Add Brand
                                </NavLink>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <Table size="sm" striped hover bordered>
                        <thead className="table-dark">
                            <tr>
                                <th>S.N</th>
                                <th>Title</th>
                                <th>Tagline</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <>
                                    <tr>
                                        <td colSpan={5}>
                                            <LoadingComponent />
                                        </td>
                                    </tr>
                                </> : <>
                                    {
                                        data && data.length ? <>
                                            {
                                                data.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{pageNo++}</td>
                                                        <td>{row.title}</td>
                                                        <td>{row.tagline}</td>
                                                        <td>
                                                            <TableImage image={row.image} />
                                                        </td>
                                                      
                                                        <td>
                                                            <TableStatusComponent status={row.status} />
                                                        </td>
                                                        <td>
                                                            <TableAction
                                                                deleteAction={deleteData}
                                                                id={row._id}
                                                                editUrl={"/admin/brand/" + row._id}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </> : <tr>
                                            <td colSpan={5}>
                                                <p className="text-center">No data found...</p>
                                            </td>
                                        </tr>
                                    }
                                </>
                            }
                        </tbody>
                    </Table>
                    {
                        pagination ? <>
                            <Pagination className="float-end" size="sm">
                                {
                                    pagination.page !== 1 ? <>
                                        <Pagination.First onClick={(e) => {
                                             getAllBrands({ page:1, limit:pagination.limit, search: null })
                                        }}/>
                                        <Pagination.Prev onClick={(e) => {
                                          getAllBrands({ page:(+pagination.page-1), limit:pagination.limit, search: null })  
                                        }} />
                                    </> : <></>
                                }
                                {
                                    Array(pagination.noOfPages).fill(null).map((val, ind) => (
                                        <Pagination.Item onClick={(e) => {
                                            getAllBrands({ page:(ind+1), limit:pagination.limit, search: null })  
                                          }}active={(pagination.page===(ind+1)) ? true :false} key={ind}>{ind + 1}</Pagination.Item>
                                    ))
                                }

                                {
                                    pagination.page !== pagination.noOfPages ? <>
                                        <Pagination.Next onClick={(e) => {
                                          getAllBrands({ page:(+pagination.page+1), limit:pagination.limit, search: null })  
                                        }} />
                                        <Pagination.Last onClick={(e) => {
                                            getAllBrands({ page:pagination.noOfPages, limit:pagination.limit, search: null })
                                        }} />
                                    </> : <></>
                                }
                            </Pagination>
                        </> : <></>
                    }
                </Card.Body>
            </Card>



        </div>
    </>)
}
export default BrandList