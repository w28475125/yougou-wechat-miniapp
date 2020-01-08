
let ajaxNum = 0;
export const request = (option) => {
	const token = wx.getStorageSync("token");

	let header = {...option.header}
	if(option.url.includes("/my/")){
		header['Authorization'] = token;
	}
	
	wx.showLoading({
		title: '加载中...',
		mask: true
	})
	ajaxNum++;

	const baseUrl = "https://api.zbztb.cn/api/public/v1";
	return new Promise((resolve, reject) => {
		ajaxNum--;
		wx.request({
			...option,
			header,
			url: baseUrl + option.url,
			success: result => resolve(result),
			fail: err => reject(err),
			complete: () => {
				if(ajaxNum === 0){
					wx.hideLoading()
				}
			}
		})
	})
}