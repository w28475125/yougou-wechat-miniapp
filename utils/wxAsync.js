/**
 * Promise 状态的 showTost
 */
export const showToast = (options) => {
	return new Promise((resolve, reject) => {
		wx.showToast({
			icon: "none",
			mask: true,
			...options,
			success: (result) => resolve(result),
			fail:(err) => reject(err)
		})
	})
}

export const showLoading = (options) => {
	return new Promise((resolve, reject) => {
		wx.showLoading({
			icon: "none",
			...options,
			mask: true
		})
	})
}


/**
 * Promise 状态的 getSetting
 */
export const getSetting = () => {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: (result) => resolve(result),
			fail: (err) => reject(err)
		})
	})
}

/**
 * Promise 状态的 chooseAddress
 */
export const chooseAddress = () => {
	return new Promise((resolve, reject) => {
		wx.chooseAddress({
			success: (result) => resolve(result),
			fail: (err) => reject(err)
		})
	})
}

/**
 * Promise 状态的 openSetting
 */
export const openSetting = () => {
	return new Promise((resolve, reject) => {
		wx.openSetting({
			success: (result) => resolve(result),
			fail: (err) => reject(err)
		})
	})
}

/**
 * Promise 状态的 login
 */
export const login = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			success: (result) => resolve(result),
			fail: (err) => reject(err)
		})
	})
}

/**
 * 小程序的微信支付
 * Promise 状态的 requestPayment
 * @param {Object} options  小程序的微信支付参数
 */
export const requestPayment = (options) => {
	return new Promise((resolve, reject) => {
		wx.requestPayment({
			...options,
			success:(result) => resolve(result),
			fail: (err) => reject(err)
		})
	})
}