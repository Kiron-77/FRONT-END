import { Outlet } from "react-router-dom"
import FeFooter from "../../component/fe/footer/footer.component"
import FeHeader from "../../component/fe/header/header.component"

const HomePageLayout = () => {
    return (<>
        <FeHeader />
        <Outlet/>
        <FeFooter />
    </>)
}
export default HomePageLayout