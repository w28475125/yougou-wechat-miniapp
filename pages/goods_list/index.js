// pages/goods_list/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from "../../request/index.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [{ id: 0, title: '综合', ischecked: true }, { id: 1, title: '销量', ischecked: false }, { id: 2, title: '价格', ischecked: false }],
		currentIndex: 0,
		tabsData: [],
		maxPageNum: 0,
	},
	queryParams:{
		query: '',
		cid: '',
		pagenum: 1, 
		pagesize: 10
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.queryParams.cid = options.cid || '';
		this.queryParams.query = options.query || '';
		this.getTabsData()
	},

	// 处理tabs 切换
	handleChangeTab(e){
		const currentIndex = e.detail.index;
		let tabs = this.data.tabs;
		tabs.forEach((v, i) => v.ischecked = i===currentIndex ? true : false);
		this.setData({ tabs, currentIndex})
	},
	// 请求数据
	async getTabsData(){
		let res = await request({ url: '/goods/search', data: this.queryParams});
		res = res.data.message
		this.setData({ 
			tabsData: [...this.data.tabsData, ...res.goods],
			maxPageNum: Math.ceil(res.total / this.queryParams.pagesize)
		})
		wx.stopPullDownRefresh()
	},

	// 页面下拉刷新
	onPullDownRefresh(){
		this.queryParams.pagenum = 1
		this.setData({
			tabsData: []
		})
		this.getTabsData()
	},
	// 页面触底
	onReachBottom(){
		this.queryParams.pagenum ++;
		if (this.queryParams.pagenum > this.data.maxPageNum){
			wx.showToast({
				title: '暂无数据',
				icon: 'none'
			})
			return false;
		}
		this.getTabsData()
	}
})