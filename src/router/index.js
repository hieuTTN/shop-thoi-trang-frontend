import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'
import CheckoutLayout from '../layout/user/checkout/checkouLayout'

//admin
import AdminIndex from '../pages/admin/index'
import AdminBlog from '../pages/admin/blog'
import AdminAddBlog from '../pages/admin/addblog'
import AdminCategory from '../pages/admin/category'
import AdminAddCategory from '../pages/admin/addcategory'
import AdminProduct from '../pages/admin/product'
import AdminAddProduct from '../pages/admin/addproduct'


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
    { path: "/admin/index", component: AdminIndex, layout: layoutAdmin },
    { path: "/admin/blog", component: AdminBlog, layout: layoutAdmin },
    { path: "/admin/add-blog", component: AdminAddBlog, layout: layoutAdmin },
    { path: "/admin/category", component: AdminCategory, layout: layoutAdmin },
    { path: "/admin/add-category", component: AdminAddCategory, layout: layoutAdmin },
    { path: "/admin/product", component: AdminProduct, layout: layoutAdmin },
    { path: "/admin/add-product", component: AdminAddProduct, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes};
