import { request } from "../../request/index.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		leftMenuList: [],
		leftCurrentIndex: 0,
		rightMenuList: [],
		scrollTop:0
	},
	Cates: [],

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const Cates = wx.getStorageSync("cates");
		if(!Cates){
			this.getCateList();
		}else{
			if(Date.now() - Cates.time > 1000*500){
				this.getCateList();
			}else{
				this.Cates = Cates.data;
				let leftMenuList = this.Cates.map(v => v.cat_name);
				let rightMenuList = this.Cates[0].children
				this.setData({
					leftMenuList,
					rightMenuList
				})
			}
		}
	},

	// 处理右边菜单的数据
	handleRightMenu(e){
		const index = e.target.dataset.index;
		this.setData({
			leftCurrentIndex: index,
			rightMenuList: this.Cates[index].children,
			scrollTop: 0
		})
	},

	// 获取分类数据
	getCateList(){
		request({ url: '/categories'}).then(res => {
			this.Cates = res.data.message;
			wx.setStorageSync("cates", {time: Date.now(), data: this.Cates});
			let leftMenuList = res.data.message.map(v=>v.cat_name);
			let rightMenuList = res.data.message[0].children
			this.setData({
				leftMenuList,
				rightMenuList
			})
		})
	}
})