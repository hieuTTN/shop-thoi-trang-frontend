import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'
import CheckoutLayout from '../layout/user/checkout/checkouLayout'

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
import PolicyContent from '../pages/public/about'
import regis from '../pages/public/regis'
import Confirm from '../pages/public/confirm'
import Forgot from '../pages/public/forgot'
import Blog from '../pages/public/blog'
import BlogDetail from '../pages/public/blogdetail'
import Account from '../pages/public/account'
import Cart from '../pages/public/cart'
import Product from '../pages/public/product'
import Checkout from '../pages/public/checkout'
import PublicPayment from '../pages/public/payment'

const publicRoutes = [
    { path: "/", component: index},
    { path: "/index", component: index},
    { path: "/detail", component: Detail},
    { path: "/login", component: login},
    { path: "/about", component: PolicyContent},
    { path: "/regis", component: regis},
    { path: "/confirm", component: Confirm},
    { path: "/forgot", component: Forgot},
    { path: "/blog", component: Blog},
    { path: "/blogdetail", component: BlogDetail},
    { path: "/account", component: Account},
    { path: "/cart", component: Cart},
    { path: "/product", component: Product},
    { path: "/checkout", component: Checkout, layout:CheckoutLayout},
    { path: "/payment", component: PublicPayment},
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
