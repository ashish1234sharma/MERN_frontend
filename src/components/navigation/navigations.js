import {
    DashboardRounded,
    PeopleRounded,
    ArticleRounded,
    QuestionAnswerRounded,
    AlternateEmailRounded,
    AdminPanelSettingsRounded,
    HistoryToggleOffRounded,
    StorageRounded,
    PlaylistAddRounded
} from "@mui/icons-material"

export const navigations = (currentUser = {}) => {
    return [
        {
            _id: 1,
            visible: true,
            isActive: ["/admin/dashboard"],
            navigator: "/admin/dashboard",
            name: "Dashboard",
            icon: (color) => { return <DashboardRounded fontSize="small" sx={{ color: color }} /> }
        },
        {
            _id: 2,
            visible: true,
            isActive: ["/admin/products", "/admin/product/detail"],
            navigator: "/admin/products?currentPage=1&pageSize=20",
            name: "Products",
            icon: (color) => { return <PeopleRounded fontSize="small" sx={{ color: color }} /> }
        },
        {
            _id: 3,
            visible: currentUser?.user_type === 'admin',
            isActive: ["/admin/product/checkouts", "/admin/product/checkout/detail"],
            navigator: "/admin/product/checkouts?currentPage=1&pageSize=20",
            name: "Checkout",
            icon: (color) => { return <PeopleRounded fontSize="small" sx={{ color: color }} /> }
        },
        {
            _id: 4,
            visible: currentUser?.user_type === 'admin',
            isActive: ["/admin/users", "/admin/user/detail"],
            navigator: "/admin/users?currentPage=1&pageSize=20",
            name: "Users",
            icon: (color) => { return <PeopleRounded fontSize="small" sx={{ color: color }} /> }
        },
        {
            _id: 5,
            visible: currentUser?.user_type === 'admin',
            isActive: ["/admin/products/create"],
            navigator: "/admin/products/create",
            name: "New Product",
            icon: (color) => { return <PlaylistAddRounded fontSize="small" sx={{ color: color }} /> }
        },

    ]
}