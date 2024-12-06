import {getMethod,getMethodPostByToken,getMethodByToken, postMethodPayload, uploadMultipleFile, deleteMethod} from '../../services/request'
import {formatMoney} from '../../services/money'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';

function Checkout(){
    const [diaChi, setDiaChi] = useState([]);

    useEffect(()=>{
        getDiaChi();
    }, []);
    const getDiaChi = async() =>{
        var response = await getMethod('/api/user-address/user/my-address');
        var result = await response.json();
        setDiaChi(result)
    };

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
                            <select onchange="loadAddInfor()" id="sodiachi" class="formcou fomd">
                                <option value="" hidden="">---</option>
                                <option value="haf npio">hà nội</option>
                            </select>
                        </div>
                        <input readonly id="fullname" class="form-control fomd" placeholder="Họ tên"/>
                        <input readonly id="phone" class="form-control fomd" placeholder="Số điện thoại"/>
                        <input readonly id="stressName" class="form-control fomd" placeholder="Tên đường, số nhà"/>
                        <div class="col-12 formadd">
                            <select readonly id="chosprov" class="formcou fomd">
                                <option value="" hidden="">---</option>
                                <option value="haf npio">hà nội</option>
                            </select>
                            <label class="lbsatop">Tỉnh</label>
                        </div>
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
                    <div class="row">
                        <div class="col-lg-2 col-md-3 col-sm-3 col-3 colimgcheck">
                            <img src="image/sp1.webp" class="procheckout"/>
                            <span class="slpro">1</span>
                        </div>
                        <div class="col-lg-7 col-md-6 col-sm-6 col-6">
                            <span class="namecheck">Áo Polo Nam Mắt Chim Bo Hiệu Ứng Dệt Nổi</span>
                            <span class="colorcheck">Vàng / M</span>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-3 pricecheck">
                            <span>359.000đ</span>
                        </div>
                    </div>
                </div>
                <div class="row magg">
                    <div class="col-8"><input id="codevoucher" class="form-control" placeholder="Nhập mã giảm giá"/></div>
                    <div class="col-4"><button onclick="loadVoucher()" class="btnmagg">Áp dụng</button></div>
                    <div class="col-12" id="blockmess">
                        <span class="successvou">Mã giảm giá đã được áp dụng</span>
                    </div>
                    <div class="col-12" id="blockmessErr">
                        <br/><i class="fa fa-warning"> <span id="messerr">Mã giảm giá không khả dụng</span></i>
                    </div>
                </div>
                <div class="magg">
                    <table class="table">
                        <tr>
                            <td>Tạm tính</td>
                            <td class="colright" id="totalAmount">359.000đ</td>
                        </tr>
                        <tr>
                            <td>Phí vận chuyển</td>
                            <td class="colright">20.000đ</td>
                        </tr>
                        <tr>
                            <td>Giảm giá</td>
                            <td class="colright" id="moneyDiscount">0đ</td>
                        </tr>
                        <tr>
                            <td>Tổng cộng</td>
                            <td class="colright ylsbold" id="totalfi">379.000đ</td>
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