import React, { useContext } from "react"
import { ThemeContext } from "../../../config/theme.config"
import SidebarItem from "./sidebar-menu-item-component"

const CmsSidebar = () => {
    const LoggedInUser = JSON.parse(localStorage.getItem("_ud")) || null
    const {theme}=useContext(ThemeContext)
    const sidebarItems = [
        {
            name: "",
            items: [
                {
                    name: "Home",
                    icon: "fa-home",
                    url: "/"
                },
                {
                    name: "Dashboard",
                    icon: "fa-tachometer-alt",
                    url: "/admin"
                }
            ]
        },
        {
            name: "Core Features",
            items: [
                {
                    name: "Banner Manager",
                    icon: "fa-images",
                    url: "/admin/banner"
                },
                {
                    name: "Brand Manager",
                    icon: "fa-barcode",
                    url: "/admin/brand"
                },
                {
                    name: "Category Manager",
                    icon: "fa-images",
                    url: "/admin/category"
                },
                {
                    name: "Users Manager",
                    icon: "fa-users",
                    url: "/admin/users"
                },
                {
                    name: "Products Manager",
                    icon: "fa-basket-shopping",
                    url: "/admin/products"
                },
                {
                    name: "Order Manager",
                    icon: "fa-shopping-cart",
                    url: "/admin/order"
                }
            ]
        },
        {
            name: "Add On Features",
            items: [
                {
                    name: "Transactions Manager",
                    icon: "fa-receipt",
                    url: "/admin/transaction"
                },
                {
                    name: "Blogs Manager",
                    icon: "fa-newspaper",
                    url: "/admin/blogs"
                },
                {
                    name: "Tags Manager",
                    icon: "fa-tag",
                    url: "/admin/tags"
                },
                {
                    name: "Offers Manager",
                    icon: "fa-gifts",
                    url: "/admin/offers"
                },
                {
                    name: "Promo Manager",
                    icon: "fa-bullhorn",
                    url: "/admin/promo"
                }
            ]
        }
    ]
    return (<>
        <div id="layoutSidenav_nav">
            <nav className={`sb-sidenav accordion sb-sidenav-`+theme} id="sidenavAccordion">
                <div className="sb-sidenav-menu" >
                    <div className="nav">
                        {
                            sidebarItems.map((menuList, index) => (
                                <React.Fragment key={index}>
                                    {
                                        menuList.name ? <div className="sb-sidenav-menu-heading">{menuList.name}</div> : ''
                                    }
                                    {
                                        menuList.items.map((item, index) => (
                                            <SidebarItem
                                                key={index}
                                                url={item.url}
                                                icon={item.icon}
                                                name={item.name}
                                            />
                                        ))
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {LoggedInUser?.name}
                </div>
            </nav>
        </div>
    </>)
}
export default CmsSidebar