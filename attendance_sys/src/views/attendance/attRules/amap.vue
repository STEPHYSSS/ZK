<template>
    <div class="amap-page-container">
      <el-form ref="form" :inline="true" :model="form" size="mini" class="form-query demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="考勤地点:" prop="name">
              <el-input v-model="address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考勤范围:" prop="name" class="qzbhh">
              <el-input v-model="circle.radius"></el-input>米
            </el-form-item>
          </el-col>
          <el-col class="fr text-right" :span="8">
            <el-form-item>
              <el-button class="border-blue bgc-blue font-color-fff" @click="register">确定</el-button>
              <el-button class="border-blue font-color-blue" @click="handleClose">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        :plugin="plugin" 
        class="amap-demo"
        :events="events">
        <el-amap-circle :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></el-amap-circle>
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" ></el-amap-marker>
      </el-amap>
      <!-- <div class="toolbar">
        position: [{{ lng }}, {{ lat }}] address: {{ address }}
      </div> -->
    </div>
</template>


<script>
  export default {
    data () {
      let self = this;
      return {
        form: {
          coordinate: ''
        },
        zoom: 12,
        center: self.coordinate,
        address: '',
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            self.circle.center = [lng, lat] // 设置圆的位置
            self.center = [lng, lat]
            // self.form.coordinate = self.circle.center.join(',')
            // 这里通过高德 SDK 完成。 // 定位获取地址
            let geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng ,lat], (status, result) => {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  self.$nextTick();
                }
              }
            });        
          }
        },
        circle: {
          center: self.coordinate,
          radius: self.range,
          fillOpacity: 0.5,
          events: {
            click: (e) => {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
              self.circle.center = [lng, lat] // 设置圆的位置
              self.center = [lng, lat]
              // 这里通过高德 SDK 完成。 // 定位获取地址
              let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });
              geocoder.getAddress([lng ,lat], (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              })
            }
          }
        },
        markers: [],
        searchOption: {
          city: '全国'
        },
        lng: 0,
        lat: 0,
        plugin: [   //一些工具插件
          {
            pName: 'Geolocation',   //定位
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    // self.lng = self.center[0];             //设置经度
                    // self.lat = self.center[1];             //设置维度
                    // self.center = [self.lng, self.lat];         //设置坐标
                    self.circle.center = self.center;         //设置圆的位置
                    // self.form.coordinate = self.circle.center.join('，')
                    // 这里通过高德 SDK 完成。 // 定位获取地址
                    let geocoder = new AMap.Geocoder({
                      radius: 1000,
                      extensions: "all"
                    });
                    geocoder.getAddress(self.center, (status, result) => {
                      if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                          self.address = result.regeocode.formattedAddress;
                          self.$nextTick();
                        }
                      }
                    });  
                    self.loaded = true;                         //load
                    self.$nextTick();                           //页面渲染好后
                  }
                })
              }
            }
          },
          {
            pName: 'ToolBar',  //工具栏
            events: {
              init(instance) {
                // console.log(instance);
              }
            }
          },
          {
            pName: 'OverView',  //鹰眼
            events: {
              init(instance) {
                // console.log(instance);
              }
            }
          },
          {
            pName: 'MapType',  //地图类型
            defaultType: 0,
            events: {
              init(instance) {
                // console.log(instance);
              }
            }
          }
        ]
      }
    },
    props: {
      coordinate: {
        type: Array,
        default: function () {
          return []
        }
      },
      range: String
    },
    methods: {
      onSearchResult (pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.center = [center.lng, center.lat];
        }
      },
      register () {
        this.$emit('register', [this.center, this.circle.radius, this.address])
        this.$emit('handleClose')
      },
      handleClose () {
        this.$emit('handleClose')
      }
    }
  }
</script>
  <style scope>
  .amap-page-container {
    position: relative;
    width: 100%;
    margin-top: 10px;
    height: 500px;
    font-size: 14px;
    color: #000;
  }
  .search-box {
    position: absolute !important;
    top: 60px;
    left: 190px;
  }
  </style>