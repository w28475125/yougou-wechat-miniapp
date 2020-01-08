// pages/auth/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { login } from "../../utils/wxAsync.js"
import {request} from "../../request/index.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	// 获取用户信息
	async handleGetUserInfo(e){
		const { encryptedData, rawData, iv, signature } = e.detail;
		const { code } = await login();
		const queryParams = { encryptedData, rawData, iv, signature, code }
		const {token} = await request({ url: '/users/wxlogin', method: 'post', data: queryParams})
		wx.setStorageSync("token", token || "123");
		wx.navigateBack({
			delta: 1
		})
	},
})