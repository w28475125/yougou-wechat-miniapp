// pages/feedback/index.js
import { showToast, showLoading } from "../../utils/wxAsync.js"
Page({
	data: {
		tabs: [
			{
				id: 0,
				title: '体验问题',
				ischecked: true
			}, {
				id: 1,
				title: '商品、商家投诉',
				ischecked: false
			}
		],
		chooseImage: [],
		textVal: '',
	},
	uploadImg: [],
	// 提交表单
	handleSubmitFrom(){
		const { textVal, chooseImage } = this.data;
		if(!textVal.trim()){
			showToast({title: '请输入您的问题'});
			return false;
		}
		showLoading({title: '正在上传...'})
		if (chooseImage.length == 0){
			wx.hideLoading()
			console.log("没有上传图片，直接提交")
			wx.navigateBack({
				delta: 1
			})
			return false;
		}
		// 有上传图片
		chooseImage.forEach((v, i) => {
			wx.uploadFile({
				url: 'https://images.ac.cn/Home/Index/UploadAction',
				filePath: v,
				name: 'file',
				success: (result) => {
					const url = JSON.parse(result.data).url;
					this.uploadImg.push(url);
					if (i === chooseImage.length - 1){
						console.log("有上传图片，开始提交")
						wx.hideLoading();
						wx.navigateBack({
							delta: 1
						})
					}
				}
			})
		})
	},

	// 处理textarea值
	handleTextInput(e){
		this.setData({
			textVal: e.detail.value
		})
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

	// 删除图片
	handleRemoveImg(e){
		const {index} = e.currentTarget.dataset;
		const { chooseImage } = this.data;
		chooseImage.splice(index, 1);
		this.setData({ chooseImage })
	}, 
	// 添加图片
	handleChooseImg(){
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (result) => {
				this.setData({
					chooseImage: [...this.data.chooseImage, ...result.tempFilePaths]
				})
			},
		})
	},
})