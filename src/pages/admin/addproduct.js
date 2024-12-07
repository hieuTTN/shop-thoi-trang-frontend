import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod, uploadSingleFile} from '../../services/request';
import {formatMoney} from '../../services/money';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import Select from 'react-select';


var linkbanner = '';
var description = '';
async function saveBlog() {
    document.getElementById("loading").style.display = 'block'
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");

    var linktam = await uploadSingleFile(document.getElementById('fileimage'))
    if(linktam != null) linkbanner = linktam
    var blog = {
        "id": id,
        "title": document.getElementById("title").value,
        "description": document.getElementById("description").value,
        "content": description,
        "imageBanner": linkbanner,
        "primaryBlog": document.getElementById("primaryBlog").checked
    }

    const response = await postMethodPayload('/api/blog/admin/create',blog)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "thêm/sửa blog thành công!",
            preConfirm: () => {
                window.location.href = 'blog'
            }
        });
    }
    if (response.status == 417) {
        var result = await response.json()
        toast.warning(result.defaultMessage);
    }
    document.getElementById("loading").style.display = 'none'
}



const AdminAddProduct = ()=>{
    const editorRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [category, setcategory] = useState([]);
    const [selectCategory, setSelectcategory] = useState([]);
    useEffect(()=>{
        getCategory();
        const getBaiViet = async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/blog/public/findById?id='+id)
                var result = await response.json();
                setProduct(result)
                linkbanner = result.imageBanner
                description = result.content;
                document.getElementById("primaryBlog").checked = result.primaryBlog
                document.getElementById("imgpreview").src = result.imageBanner
            }
        };
        getBaiViet();
    }, []);

    const getCategory = async() =>{
        var response = await getMethod('/api/category/public/findAllList')
        var result = await response.json();
        setcategory(result)
    };


    
    function handleEditorChange(content, editor) {
        description = content;
    }
    
    function onchangeFile(){
        const [file] = document.getElementById("fileimage").files
        if (file) {
            document.getElementById("imgpreview").src = URL.createObjectURL(file)
        }
    }

return (
    <>
    <div class="col-sm-12 header-sps">
        <div class="title-add-admin">
            <h4>Thêm/ cập nhật bài viết</h4>
        </div>
    </div>
    <div class="col-sm-12">
    <main class="main">
        <div class="col-sm-12 header-sps">
            <div class="title-add-admin">
                <p>Hãy thêm sản phẩm cùng kích thước và màu sắc sản phẩm</p>
            </div>
        </div>
        <div class="group-tabs">
            <ul class="nav nav-tabs" role="tablist">
                <li class="tabtk nav-item active"><a data-toggle="tab" class="nav-link" aria-current="page" href="#home">Thông tin sản phẩm</a></li>
                <li class="tabtk nav-item"><a href="#profile" data-toggle="tab" class="nav-link">Màu sắc/ kích thước</a></li>
            </ul>
        </div>
        <div class="tab-content contentab">
            <div role="tabpanel" class="tab-pane active" id="home">
                <div class="col-sm-12">
                    <div class="form-add">
                        <div class="row">
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Mã sản phẩm</label>
                                <input id="codesp" type="text" class="form-control" />
                                <label class="lb-form">Tên sản phẩm</label>
                                <input id="namesp" type="text" class="form-control" />
                                <label class="lb-form">Alias</label>
                                <input id="alias" type="text" class="form-control" />
                                <label class="lb-form">Giá tiền</label>
                                <input id="price" type="text" class="form-control" />
                                <label class="lb-form">Danh mục sản phẩm</label>
                                <Select
                                    isMulti
                                    options={category}
                                    value={selectCategory}
                                    onChange={setSelectcategory}
                                    getOptionLabel={(option) => option.name} 
                                    getOptionValue={(option) => option.id}    
                                    placeholder="Chọn danh mục"
                                /> 
                                <br/>
                                <div class="loading" id="loading">
                                    <div class="bar1 bar"></div>
                                </div><br/>
                                <button onclick="saveProduct()" class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                            <div class="col-md-8 col-sm-12 col-12">
                                <label class="lb-form">Ảnh nền</label>
                                <input onChange={()=>onchangeFile()} id="fileimage" type="file" class="form-control" />
                                <img id="imgpreview" className='imgadd' />
                                <label class="lb-form">Ảnh phụ</label>
                                <input id="choosefile" multiple type="file" style={{visibility:'hidden'}} />
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row" id="preview">
                                            <div class="col-md-3" id="chon-anhs" style={{height:'100%'}}>
                                                <div style={{height:"120px"}} id="choose-image" class="choose-image" onclick="document.getElementById('choosefile').click(); return false;">
                                                    <p><i class="fas fa-camera" id="camera"></i></p>
                                                    <p id="numimage">Đăng từ 3 ảnh</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row" id="anhdathem">
                                        <div class="col-sm-12">
                                            <h4 style={{marginTop:'30px'}}>Ảnh đã thêm</h4>
                                        </div>
                                        <div id="listanhdathem" class="row">

                                        </div>
                                         <div class="col-md-4">
                                            <img style={{width:'90%'}} src="../image/detail.jpeg" class="image-upload" />
                                            <button class="btn btn-danger form-control">Xóa ảnh</button>
                                        </div> 
                                    </div>
                                </div>
                                <label class="lb-form">Mô tả sản phẩm</label>
                                <Editor name='editor' tinymceScriptSrc={'https://cdn.tiny.cloud/1/f6s0gxhkpepxkws8jawvfwtj0l9lv0xjgq1swbv4lgcy3au3/tinymce/6/tinymce.min.js'}
                                        onInit={(evt, editor) => editorRef.current = editor} 
                                        initialValue={product==null?'':product.description}
                                        onEditorChange={handleEditorChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="profile">
                <div class="row">
                    <div id="listcolorblock" class="col-md-12 col-sm-12 col-12 row" style={{paddingTop:'20px'}}>
                         <div class="col-sm-6">
                            <div class="singlecolor row">
                                <div class="col-12"><i onclick="removeColorBlock(this)" class="fa fa-trash pointer"></i></div>
                                <div class="col-8 inforcolor">
                                    <input type="hidden" class="idcolor" />
                                    <label class="lb-form">Tên màu:</label>
                                    <input type="text" class="form-control colorName" />
                                    <label class="lb-form">Ảnh màu</label>
                                    <input onchange="priviewImg(this)" type="file" class="form-control fileimgclo" />
                                </div>
                                <div class="col-4 divimgpre">
                                    <img class="imgpreview" src="" style={{width:'100%'}} />
                                </div>
                                <span onclick="addSizeBlock(this)" class="pointer btnaddsize"><i class="fa fa-plus"></i> Thêm size</span>
                                <div class="listsizeblock">
                                    <div class="singelsizeblock">
                                        <input type="hidden" class="idsize" />
                                        <input placeholder="tên size" class="sizename" />
                                        <input placeholder="Số lượng" value="0" class="sizequantity" />
                                        <i onclick="removeInputSize(this)" class="fa fa-trash-alt trashsize"></i>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <button onclick="addBlockColor()" id="myBtn"><i class="fa fa-plus-circle"></i></button>
            </div>
        </div>
    </main>
    </div>
    </>
);
}

export default AdminAddProduct;