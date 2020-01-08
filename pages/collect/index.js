// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
			{
				id: 0,
				title: '商品收藏',
				ischecked: true
			}, {
				id: 1,
				title: '品牌收藏',
				ischecked: false
			}, {
				id: 2,
				title: '店铺收藏',
				ischecked: false
			}, {
				id: 3,
				title: '浏览足迹',
				ischecked: false
			}
		],
		collectData: [],
    },
	onShow(){
		const collectData = wx.getStorageSync("collectData") || [];
		this.setData({ collectData })
	},

	// 处理tabs 切换
	handleChangeTab(e) {
		const index = e.detail.index;
		let tabs = this.data.tabs;
		tabs.forEach((v, i) => v.ischecked = i === index ? true : false);
		this.setData({
			tabs,
		})
	},
})