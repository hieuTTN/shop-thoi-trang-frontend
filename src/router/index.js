import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'

//admin
// import homeAdmin from '../pages/admin/index'
// import userAdmin from '../pages/admin/user'
// import AdminCateory from '../pages/admin/category'
// import AdminDoanhThu from '../pages/admin/doanhthu'
// import AdminProduct from '../pages/admin/product'
// import AdminAddProduct from '../pages/admin/addproduct'
// import AdminInvoice from '../pages/admin/invoice'


//public
import login from '../pages/public/login'
import index from '../pages/public/index'
import Detail from '../pages/public/detail'
// import confirm from '../pages/public/confirm'
// import PublicForgot from '../pages/public/forgot'
// import PublicCheckOut from '../pages/public/checkout'
// import PublicPayment from '../pages/public/payment'
// import PublicAccount from '../pages/public/account'
// import PublicCart from '../pages/public/cart'
// import PublicDetailProduct from '../pages/public/detail'
// import PublicProduct from '../pages/public/product'

const publicRoutes = [
    { path: "/", component: index},
    { path: "/index", component: index},
    { path: "/detail", component: Detail},
    { path: "/login", component: login},
];


const adminRoutes = [
    // { path: "/admin/index", component: homeAdmin, layout: layoutAdmin },
    // { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    // { path: "/admin/category", component: AdminCateory, layout: layoutAdmin },
    // { path: "/admin/doanhthu", component: AdminDoanhThu, layout: layoutAdmin },
    // { path: "/admin/product", component: AdminProduct, layout: layoutAdmin },
    // { path: "/admin/addproduct", component: AdminAddProduct, layout: layoutAdmin },
    // { path: "/admin/invoice", component: AdminInvoice, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes};
