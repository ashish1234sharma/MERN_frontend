import { AXIOS } from './AXIOS'

export const usersignin = (data) => AXIOS().post(`/user/login`, data);
export const usersignup = (data) => AXIOS().post(`/user/register`, data);
export const passwordreset = (_id, data) => AXIOS().patch(`/user/reset/password/${_id}`, data);
export const passwordforgot = (_id, data) => AXIOS().patch(`/user/forgot/password/${_id}`, data);
export const userprofile = () => AXIOS().get(`/profile/user`);
export const finduser = (_username) => AXIOS().get(`/profile/user/find/${_username}`);

export const profileupdate = (_id, data) => AXIOS().patch(`/user/${_id}/update`, data)
export const profileimageupload = (data) => AXIOS().post(`/user/profile/image`, data, { headers: { "content-type": "multipart/form-data" } })

export const allproducts = (_query) => AXIOS().get(`/products?${_query}`)
export const productbyid = (_id) => AXIOS().get(`/product/${_id}`)
export const allusers = (_query) => AXIOS().get(`/users?${_query}`)
export const userbyid = (_id) => AXIOS().get(`/user/${_id}`)
export const allcheckouts = (_query) => AXIOS().get(`/product/checkouts/history?${_query}`)
export const checkoutbyid = (_id) => AXIOS().get(`/product/checkout/${_id}`)

export const deleteproduct = (_id) => AXIOS().delete(`/product/${_id}/delete`)
export const productimageupload = (data) => AXIOS().post(`/user/product/images`, data, { headers: { "content-type": "multipart/form-data" } })
export const createnewproduct = (data) => AXIOS().post(`/product/new/product`, data)
export const updateproductbyid = (_id, data) => AXIOS().patch(`/product/update/${_id}`, data)