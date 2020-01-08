// pages/order/index.js
import regeneratorRuntime from "../../lib/runtime/runtime.js"
import { request } from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
			{
            id: 0,
            title: '全部',
            ischecked: true
			}, {
				id: 1,
				title: '待付款',
				ischecked: false
			}, {
				id: 2,
				title: '待收货',
				ischecked: false
			}, {
				id: 3,
				title: '退款/退货',
				ischecked: false
			}
		],
		orders: [],
    },
	onShow(){
		const token = wx.getStorageSync("token");
		if(!token){
			wx.navigateTo({
				url: '/pages/auth/index',
			})
			return false;
		}
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		const type = currentPage.options.type;
		this.getOrderData(type)
		this.changeTabTitleByIndex(type-1);
	},
	// 获取订单数据
	async getOrderData(type){
		let result = await request({ url: '/my/orders/all', data: {type}});
		let data = [
			{ order_id: 1,order_number: 'HMDD20190812000000001104', order_price: 13618, create_time: 1565616985 },
			{ order_id: 2,order_number: 'HMDD20190812000000001105', order_price: 13188, create_time: 1565626985 },
			{ order_id: 3,order_number: 'HMDD20190812000000001106', order_price: 68462, create_time: 1565636985 },
			{ order_id: 4,order_number: 'HMDD20190812000000001107', order_price: 89456, create_time: 1565646985 },
			{ order_id: 5,order_number: 'HMDD20190812000000001108', order_price: 48354, create_time: 1565656985 },
			{ order_id: 6,order_number: 'HMDD20190812000000001109', order_price: 86774, create_time: 1565666985 },
			{ order_id: 7,order_number: 'HMDD20190812000000001110', order_price: 35363, create_time: 1565676985 },
			{ order_id: 8,order_number: 'HMDD20190812000000001111', order_price: 68444, create_time: 1565686985 },
			{ order_id: 9,order_number: 'HMDD20190812000000001112', order_price: 84831, create_time: 1565686985 },
			{ order_id: 10,order_number: 'HMDD20190812000000001113', order_price: 68468, create_time: 1565617985 },
			{ order_id: 11,order_number: 'HMDD20190812000000001114', order_price: 86464, create_time: 1565618985 }
		]
		result = result.data.message ? result.data.message.data : data;
		result = result.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString())}))
		this.setData({orders: result})

		console.log(result)
	},
    // 处理tabs 切换
    handleChangeTab(e) {
        const currentIndex = e.detail.index;
		this.changeTabTitleByIndex(currentIndex);
		this.getOrderData(currentIndex+1);
    },
	changeTabTitleByIndex(index){
		let tabs = this.data.tabs;
		tabs.forEach((v, i) => v.ischecked = i === index ? true : false);
		this.setData({
			tabs,
		})
	}
})