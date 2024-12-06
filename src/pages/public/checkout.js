import {getMethod,getMethodPostByToken,getMethodByToken, postMethodPayload, uploadMultipleFile, deleteMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Swal from 'sweetalert2'
import Select from 'react-select';

function Checkout(){
    const [diaChi, setDiaChi] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectDiaChi, setSelectDiaChi] = useState(null);
    const [tongTien, setTongTien] = useState(0);
    const [maGiamGia, setMaGiamGia] = useState(null);
    const [mess, setMess] = useState(null);

    useEffect(()=>{
        getDiaChiUser();
        loadCartCheckOut();
    }, []);
    const getDiaChiUser = async() =>{
        var response = await getMethod('/api/user-address/user/my-address');
        var result = await response.json();
        setDiaChi(result)
    };

    function getDiaChi(item){
        setSelectDiaChi(item);
        document.getElementById("stressName").value = item?.streetName+", "+item?.wards.name+", "+item?.wards.districts.name+", "+item?.wards.districts.province.name
    }

    function loadCartCheckOut() {
        var listcart = localStorage.getItem("product_cart");
        if (listcart == null) {
            alert("Bạn chưa có sản phẩm nào trong giỏ hàng!");
            window.location.replace("cart");
            return;
        }
        var list = JSON.parse(localStorage.getItem("product_cart"));
        if (list.length == 0) {
            alert("Bạn chưa có sản phẩm nào trong giỏ hàng!");
            window.location.replace("cart");
        }
        setCart(list)
        var tongTien = 0;
        for(var i=0; i< list.length; i++){
            tongTien += list[i].quantity * list[i].product.price
        }
        setTongTien(tongTien)
    }

    async function loadVoucher() {
        var code = document.getElementById("codevoucher").value
        var url = 'http://localhost:8080/api/voucher/public/findByCode?code=' + code + '&amount=' + (tongTien - Number(20000));
        const response = await fetch(url, {});
        var result = await response.json();
        if (response.status == 417) {
            setMaGiamGia(null)
            setMaGiamGia(null)
            setMess(result.defaultMessage)
            document.getElementById("totalfi").innerHTML = formatMoney(tongTien + 20000)
        }
        if (response.status < 300) {
            setMaGiamGia(result)
            setMess(null)
            document.getElementById("totalfi").innerHTML = formatMoney(tongTien - result.discount + 20000)
        }
    
    }

    return(
        <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12 col-12 checkoutdiv" id="checkleft">
            <div class="d-flex flex-column align-items-center divimglogocheck divafter">
                <img class="imgcheckout" src="image/checkout_logo.webp"/>
            </div>

            <div class="inforship">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                        <br/><span class="titlecheckout">Thông tin giao hàng</span>
                        <div class="col-12 formadd">
                            <Select
                                options={diaChi}
                                onChange={getDiaChi}
                                getOptionLabel={(option) => option.fullname+", "+option.streetName+", "+option.wards.name+", "+option.wards.districts.name+", "+option.wards.districts.province.name} 
                                getOptionValue={(option) => option.id}    
                                closeMenuOnSelect={false}
                                name='diachi'
                                placeholder="Chọn địa chỉ"
                            />
                        </div>
                        <input value={selectDiaChi?.fullname} readonly id="fullname" class="form-control fomd" placeholder="Họ tên"/>
                        <input value={selectDiaChi?.phone} readonly id="phone" class="form-control fomd" placeholder="Số điện thoại"/>
                        <textarea readonly id="stressName" class="form-control fomd" placeholder="Địa chỉ nhận"></textarea>
                        <textarea id="ghichudonhang" class="form-control fomd" placeholder="ghi chú"></textarea>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                        <br/><span class="titlecheckout">Vận chuyển</span>
                        <div class="feevc">
                            <label for="checkvc">Phí vận chuyển</label>
                            <span class="tows">20.000đ</span>
                        </div>
                        <br/><span class="titlecheckout">Thanh toán</span>
                        <table class="table tablepay">
                            <tr onclick="momo.click()">
                                <td><label class="radiocustom">	Thanh toán qua Ví MoMo
                                        <input value="momo" id="momo" type="radio" name="paytype" checked="checked"/>
                                        <span class="checkmark"></span></label></td>
                                <td><img src="image/momo.webp" class="momopay"/></td>
                            </tr>
                            <tr onclick="vnpay.click()">
                                <td><label class="radiocustom">	Thanh toán qua Ví Vnpay
                                    <input value="vnpay" id="vnpay" type="radio" name="paytype"/>
                                    <span class="checkmark"></span></label></td>
                                <td><img src="image/vnpay.jpg" class="momopay"/></td>
                            </tr>
                            <tr onclick="code.click()">
                                <td><label class="radiocustom">	Thanh toán khi nhận hàng (COD)
                                        <input value="cod" id="code" type="radio" name="paytype"/>
                                        <span class="checkmark"></span></label></td>
                                <td><i class="fa fa-money paycode"></i></td>
                            </tr>
                        </table>

                        <button onclick="checkout()" class="btndathangmobile">Đặt hàng</button>
                    </div>
                </div>
            </div>

            <div class="notecheckout">
                <hr/>
                <span>Sau khi hoàn tất đơn hàng khoảng 60-90 phút (trong giờ hành chính), YODY sẽ nhanh chóng gọi điện xác nhận lại thời gian giao hàng với bạn. YODY xin cảm ơn!</span>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-12" id="checkright">
            <div class="d-flex flex-column align-items-center divimglogocheck divbefor">
                <img class="imgcheckout" src="image/checkout_logo.webp"/>
            </div>
            <div class="infordoncheck">
                <span class="dhcheck">Đơn hàng (<span id="slcartcheckout">1</span> sản phẩm)</span>
                <div id="listproductcheck">
                {cart.map((item=>{
                    return <div class="row">
                        <div class="col-lg-2 col-md-3 col-sm-3 col-3 colimgcheck">
                            <img src={item.product.imageBanner} class="procheckout"/>
                            <span class="slpro">{item.quantity}</span>
                        </div>
                        <div class="col-lg-7 col-md-6 col-sm-6 col-6">
                            <span class="namecheck">{item.product.name}</span>
                            <span class="colorcheck">{item.color.colorName} / {item.size.sizeName}</span>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3 pricecheck">
                            <span>{formatMoney(item.product.price * item.quantity)}</span>
                        </div>
                    </div>
                    }))}
                </div>
                <div class="row magg">
                    <div class="col-8"><input id="codevoucher" class="form-control" placeholder="Nhập mã giảm giá"/></div>
                    <div class="col-4"><button onClick={loadVoucher} class="btnmagg">Áp dụng</button></div>
                    {maGiamGia && (
                    <div class="col-12">
                        <span class="successvou">Mã giảm giá đã được áp dụng</span>
                    </div>
                    )}
                    {mess && (
                    <div class="col-12">
                        <div class="col-12">
                            <br/><i class="fa fa-warning"> <span id="messerr">{mess}</span></i>
                        </div>
                    </div>
                    )}
                </div>
                <div class="magg">
                    <table class="table">
                        <tr>
                            <td>Tạm tính</td>
                            <td class="colright" id="totalAmount">{formatMoney(tongTien)}</td>
                        </tr>
                        <tr>
                            <td>Phí vận chuyển</td>
                            <td class="colright">20.000đ</td>
                        </tr>
                        <tr>
                            <td>Giảm giá</td>
                            <td class="colright" id="moneyDiscount">{maGiamGia == null?'0đ':maGiamGia.discount}</td>
                        </tr>
                        <tr>
                            <td>Tổng cộng</td>
                            <td class="colright ylsbold" id="totalfi">{formatMoney(tongTien + 20000)}</td>
                        </tr>
                    </table>
                    <button onclick="checkout()" class="btndathang">Đặt hàng</button>
                </div>
            </div>
        </div>
    </div>
    );
}
export default Checkout;