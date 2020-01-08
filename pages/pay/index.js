// pages/pay/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { showToast, requestPayment } from "../../utils/wxAsync.js"
import { request } from "../../request/index.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addRess: {},
		cartData: [],
		totalPrice: 0,
		totalNum: 0,
		token: ''
	},

	// 支付
	async handlePay(){
		try{
			const token = wx.getStorageSync("token") || "";
			if (!token) {
				wx.navigateTo({
					url: '/pages/auth/index',
				})
			}
			const order_price = this.data.totalPrice;
			const consignee_addr = this.data.addRess.allAddress
			let goods = [];
			this.data.cartData.forEach(v => {
				goods.push({ goods_id: v.id, goods_number: v.num, goods_price: v.price })
			})
			const queryParams = { order_price, consignee_addr, goods }
			// 创建订单，获取订单编号
			const { order_number } = await request({ url: '/my/orders/create', method: "POST", data: queryParams });
			// 发起预支付接口
			const { pay } = await request({ url: '/my/orders/req_unifiedorder', method: "POST", data: { order_number } });
			// 发起微信支付
			await requestPayment(pay);
			// 查询订单
			const result = request({ url: '/my/orders/chkOrder', method: "POST", data: { order_number } });
			await showToast({ title: '支付成功' });
			// 支付成功手动删除缓存中的商品
			let newCart = wx.getStorageSync("cartData"); // 重新获取是因为之前获取的是筛选过的数据
			newCart = newCart.filter(v => !v.isChecked);
			wx.setStorageSync("cartData", newCart);
			// 支付成功跳转至订单页
			wx.navigateTo({
				url: '/pages/order/index',
			})

		}catch(err){
			console.log(err);
			await showToast({title: '支付失败'})
		}
	},

	// 获取地址
	getAddress() {
		const addRess = wx.getStorageSync("addRess");
		this.setData({ addRess })
	},
	/**
	 * 页面显示
	 */
	onShow: function () {
		let cartData = wx.getStorageSync("cartData") || [];
		cartData = cartData.filter(v => v.isChecked);
		const addRess = wx.getStorageSync("addRess")
		this.setData({ cartData, addRess })
		this.baseData(cartData);
		this.getAddress();
	},


	baseData(cartData) {
		let totalPrice = 0;
		let totalNum = 0;
		cartData.forEach(v => {
			if (v.isChecked) {
				totalPrice += v.price * v.num;
				totalNum += v.num
			}
		})

		this.setData({
			totalPrice: totalPrice.toFixed(2),
			totalNum,
			cartData
		})
	}
})