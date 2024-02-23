
import { Outlet } from "react-router-dom"
import "../../assets/css/admin.css"
import CmsFooter from "../../component/cms/footer/footer.component"
import CmsHeader from "../../component/cms/header/cms-header.component"
import CmsSidebar from "../../component/cms/sidebar/cms.sidebar.component"
const AdminLayout = () => {
  let LoggedInUser = JSON.parse(localStorage.getItem("_ud")) || null
  return (
    <>
     <CmsHeader/>
   
      <div id="layoutSidenav">
        {
          LoggedInUser.role ==='admin'?<CmsSidebar/> : <></>
        }
        <div id="layoutSidenav_content">
          <main >
           <Outlet/>
          </main>
         <CmsFooter/>
        </div>
      </div>
    </>
  )
}
export default AdminLayout