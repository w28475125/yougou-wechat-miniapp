// pages/user/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {},
		collectNum: 0
	},

	onShow(){
		const userInfo = wx.getStorageSync("userInfo") || {};
		const collectData = wx.getStorageSync("collectData") || [];
		this.setData({
			userInfo,
			collectNum: collectData.length
		})
	}
})