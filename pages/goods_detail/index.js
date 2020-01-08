// pages/goods_detail/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from "../../request/index.js"
import { showToast } from "../../utils/wxAsync.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goodDetail: {},
		isCollect: false, 	// 商品是否被收藏
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.log(options)
		this.getGoodDetail(options)
	},

	// 点击跳转去购物车
	goToCart(){
		wx.switchTab({
			url: '/pages/cart/index',
		})
	},

	// 点击跳转添加至购物车
	addCart(){
		let cartData = wx.getStorageSync("cartData") || [];
		let index = cartData.findIndex(v => v.id === this.data.goodDetail.goods_id);
		let data = {
			id: this.data.goodDetail.goods_id,
			image: this.data.goodDetail.goods_big_logo,
			name: this.data.goodDetail.goods_name,
			price: this.data.goodDetail.goods_price,
			num: 1,
			isChecked: true
		};
		if(index >= 0){
			cartData[index].num++;
		}else{
			cartData.push(data);
		}
		wx.setStorageSync("cartData", cartData);
		showToast({title: '添加成功', icon: 'none'})
	},

	// 点击查看轮播图
	handleSwiper(e){
		const current = e.currentTarget.dataset.index;
		let urls = [];
		this.data.goodDetail.pics.forEach(v => {
			urls.push(v.pics_big)
		})
		wx.previewImage({
			current: urls[current],
			urls
		})
	},

	// 获取商品详情
	async getGoodDetail(options){
		let result = await request({ url: '/goods/detail', data: options})
		result = result.data.message;

		// 获取缓存中的收藏数据
		const collectData = wx.getStorageSync("collectData") || [];
		// 判断是否被收藏
		let isCollect = collectData.some(v => v.goods_id === result.goods_id);

		this.setData({
			goodDetail: result,
			isCollect
		})
	},

	// 点击收藏
	handleCollect(){
		let isCollect = false;
		// 获取缓存中的数据
		let collectData = wx.getStorageSync("collectData")||[];
		// 判断是否存在
		let index = collectData.findIndex(v => v.goods_id === this.data.goodDetail.goods_id);
		if(index === -1){
			// 不存在
			isCollect = true;
			collectData.push(this.data.goodDetail);
			showToast({title: '收藏成功', icon: "success"})
		}else{
			// 存在
			isCollect = false;
			collectData.splice(index, 1);
			showToast({ title: '取消成功', icon: "success" })
		}
		wx.setStorageSync("collectData", collectData);
		this.setData({ isCollect })
	}
})