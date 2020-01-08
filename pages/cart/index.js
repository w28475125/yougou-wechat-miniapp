// pages/cart/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { showToast, chooseAddress, getSetting, openSetting } from "../../utils/wxAsync.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addRess: {},
		cartData: [],
		isAllChecked: true,
		totalPrice: 0,
		totalNum: 0
	},

	// 跳转至结算
	goToPay(){
		let cartData = this.data.cartData;
		// let flag = cartData.length ? cartData.filter(v => v.isChecked).length>0 : false;
		if (this.data.totalNum <= 0){
			showToast({title: '请选择商品'});
			return false;
		}
		if (!this.data.addRess.errMsg){
			showToast({ title: '请选择地址' });
			return false;
		}
		wx.navigateTo({
			url: '/pages/pay/index',
		})
	},

	// 处理全选
	handleChecked(e){
		let index = e.currentTarget.dataset.index;
		let cartData = this.data.cartData;
		cartData[index].isChecked = !cartData[index].isChecked
		let isAllChecked = cartData.length ? cartData.every(v => v.isChecked) : false;
		this.setData({
			isAllChecked
		})
		this.baseData(cartData);
	},
	handleAllChecked(){
		let isAllChecked = !this.data.isAllChecked;
		let cartData = this.data.cartData;
		cartData.map(v => v.isChecked = isAllChecked);
		this.setData({ isAllChecked })
		this.baseData(cartData);
	},

	// 处理加减
	handleGoodNum(e){
		let {index, type} = e.currentTarget.dataset;
		let cartData = this.data.cartData;
		cartData[index].num = cartData[index].num + parseInt(type);
		if (cartData[index].num <= 0){
			cartData.splice(index, 1);
		}
		this.baseData(cartData);
	},

	// 获取地址
	async getAddress(){
		try{
			const result = await getSetting(); // false | undefined | true 
			if (result.authSetting['scope.address'] === false) {
				await openSetting()
			}
			const addRess = await chooseAddress();
			addRess.allAddress = `${addRess.provinceName}-${addRess.cityName}-${addRess.countyName}-${addRess.detailInfo}`
			this.setData({ addRess })
			wx.setStorageSync('addRess', addRess);
		}catch(err){
			console.log(err)
		}
		
	},
	/**
	 * 页面显示
	 */
	onShow: function () {
		const cartData = wx.getStorageSync("cartData")||[];
		const addRess = wx.getStorageSync("addRess")
		this.setData({ cartData, addRess })
		this.baseData(cartData);
	},


	baseData(cartData){
		let totalPrice = 0;
		let totalNum = 0;
		let isAllChecked = true;
		cartData.forEach(v => {
			if (v.isChecked){
				totalPrice += v.price*v.num;
				totalNum += v.num
			}else{
				isAllChecked = false
			}
		})
		wx.setStorageSync("cartData", cartData);

		this.setData({
			totalPrice: totalPrice.toFixed(2),
			totalNum,
			cartData,
			isAllChecked
		})
	}
})