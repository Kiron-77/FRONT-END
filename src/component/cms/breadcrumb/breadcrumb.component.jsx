import { NavLink } from "react-router-dom"

const AdminBreadCrumb = ({data}) => {
    return (<>
     <ol className="breadcrumb mb-4">
                {/* <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                </li> */}
            {
                data.map((item,ind) => (
                    <li key={ind} className={`breadcrumb-item ${item.link === null ? 'active' : ''}`}>
                        {
                            item.link ? <>
                                <NavLink to={item.link}>{ item.title}</NavLink>
                            </> : item.title
                        }
                    </li>
                ))
             }
            </ol>
    </>)
}
export default AdminBreadCrumb