import { NavLink } from "react-router-dom"
const SidebarItem = ({ url, icon, name }) => {
    return (<>
        <NavLink className="nav-link" to={url}>
            <div className="sb-nav-link-icon">
                <i className={`fa ${icon}`}></i>
            </div>
            {name}
        </NavLink>
    </>)
}
export default SidebarItem