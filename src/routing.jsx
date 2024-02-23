import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AboutusComponent from "./component/fe/aboutus/about.component";
import CheckPermission from "./config/permission.config";
import { ThemeProvider } from "./config/theme.config";
import ActivatePage from "./pages/auth/activate/activate.page";
import LoginPage from "./pages/auth/login/login.page";
import RegisterPage from "./pages/auth/register/register.page";
import BrandDetailPage from "./pages/brand/brand-detail.page";
import CategoryDetailPage from "./pages/category/category-detail.page";
import { BannerCreate, BannerEdit, BannerList } from "./pages/cms/banner";
import { BrandCreate, BrandEdit, BrandList } from "./pages/cms/brand";
import DashboardPage from "./pages/cms/dashboard/dashboard.page";
import Error404 from "./pages/error/404.page";
import HomePage from "./pages/home/home.page";
import AdminLayout from "./pages/layout/admin.layout";
import HomePageLayout from "./pages/layout/home.layout";
import ProductDetailPage from "./pages/product/product-detail.page";

const Routing = () => {

    return (
        <>
            <ToastContainer theme="colored" />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePageLayout />}>
                        <Route path="/" element={<HomePage />}></Route>
                       
                        <Route path="register" element={<RegisterPage />}></Route>
                        <Route path="activate/:token" element={<ActivatePage />} />
                        <Route path="login" element={<LoginPage />}></Route>
                       
                        <Route path="about-us" element={<AboutusComponent />}></Route>
                        <Route path="brand/:slug" element={<BrandDetailPage />}></Route>
                        <Route path="category/:slug" element={<CategoryDetailPage />}></Route>
                        <Route path="product/:slug" element={<ProductDetailPage/>}></Route>

                        <Route path="*" element={<Error404 goBackUrl={'/'} name={'Home Page'} />}></Route>
                    </Route>
                    <Route path="/admin" element={<CheckPermission accessBy={"admin"}>
                        <ThemeProvider>
                            <AdminLayout />
                        </ThemeProvider>
                    </CheckPermission>}>
                        <Route index element={<DashboardPage />}></Route>

                        <Route path="banner" element={<BannerList />}></Route>
                        <Route path="banner/create" element={<BannerCreate />}></Route>
                        <Route path="banner/:id" element={<BannerEdit />}></Route>

                        <Route path="brand" element={<BrandList />}></Route>
                        <Route path="brand/create" element={<BrandCreate />}></Route>
                        <Route path="brand/:id" element={<BrandEdit />}></Route>

                        <Route path="*" element={<Error404 goBackUrl={'/admin'} name={'Admin Dashboard'} />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}
export default Routing