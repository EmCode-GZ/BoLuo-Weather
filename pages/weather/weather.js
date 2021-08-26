Page({
  data: {
    region: [],
    customItem: '',
    showList: [],
    longitude: 0,
    latitude: 0,
    date: [],
    hours: [],
    weather_img: ""
  },

  onLoad: function(options) {
    wx.getLocation({
      success: (res) => {
        console.log(res)
        wx.request({
          url: 'https://free-api.heweather.net/s6/weather?location=' + res.longitude + "," + res.latitude + "&key=6d3079cee3de4425a0757df0e61898ee",
          success: (res) => {
            this.setData({
              showList: res.data.HeWeather6[0],
              weather_img: "/images/icons/tqzk/" + res.data.HeWeather6[0].now.cond_code + ".png",
              region: [res.data.HeWeather6[0].basic.admin_area, res.data.HeWeather6[0].basic.parent_city, res.data.HeWeather6[0].basic.location],
              date: [res.data.HeWeather6[0].daily_forecast[0].date.substring(5, res.data.HeWeather6[0].daily_forecast[0].date.length),
                res.data.HeWeather6[0].daily_forecast[1].date.substring(5, res.data.HeWeather6[0].daily_forecast[0].date.length),
                res.data.HeWeather6[0].daily_forecast[2].date.substring(5, res.data.HeWeather6[0].daily_forecast[0].date.length),
                res.data.HeWeather6[0].daily_forecast[3].date.substring(5, res.data.HeWeather6[0].daily_forecast[0].date.length),
                res.data.HeWeather6[0].daily_forecast[4].date.substring(5, res.data.HeWeather6[0].daily_forecast[0].date.length)
              ],
              hours: [
                res.data.HeWeather6[0].hourly[0].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[1].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[2].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[3].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[4].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[5].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[6].time.substring(11, 16),
                res.data.HeWeather6[0].hourly[7].time.substring(11, 16)]
            })
            console.log(this.data.showList)
          }
        })
      }
    })
  },

  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        region: e.detail.value
      }),
      wx.request({
        url: 'https://free-api.heweather.net/s6/weather?location=' + this.data.region[2] + ',' + this.data.region[1].substring(0, this.data.region[1].length - 1) + '&key=6d3079cee3de4425a0757df0e61898ee',
        success: (res) => {
          console.log(res)
          this.setData({
            showList: res.data.HeWeather6[0],
            weather_img: "/images/icons/tqzk/" + res.data.HeWeather6[0].now.cond_code + ".png",
          })
          console.log(this.data.showList)
        },
      })
  }
})