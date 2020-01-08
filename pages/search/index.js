// pages/search/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from "../../request/index.js"
Page({
	data: {
		value: '',
		searchData: [],
	},
	timer: null,
	// 取消事件
	handleClose(){
		this.setData({
			value: '',
			searchData: []
		})
	},
	// 获取input的值
	handleInput(e){
		const value = e.detail.value;
		if(!value.trim()){
			this.setData({ searchData: [], value: '' })
			return;
		}
		// 发送请求
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.getSearchData(value);
		}, 500)
		this.setData({value})
	},
	// 请求数据
	async getSearchData(query){
		let res = await request({ url: '/goods/qsearch', data: {query}});
		res = res.data.message;
		this.setData({
			searchData: res
		})
	},
})