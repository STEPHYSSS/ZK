<template>
    <div class="outBox">
        <van-nav-bar title="地图定位" left-arrow fixed @click-left="onClickLeft">
            <!-- <template #right>
                <div>
                    <img src="@/assets/images/tijiao_icon@2x.png" alt class="imgIcon" />
                    <span class="submit">提交</span>
                </div>
            </template>-->
        </van-nav-bar>
        <div id="allmap"></div>
        <!-- <div class="getCity" @click="getAdd">获取定位</div> -->
    </div>
</template>

<script>
import { MP } from "@/common/map.js";
export default {
    data() {
        return {
            maps: null,
            currentLocation: ""
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                name: "clockIn",
                query: {
                    location: this.currentLocation
                }
            });
        },
        getData() {
            this.$nextTick(() => {
                const _this = this;
                MP().then(BMap => {
                    // 初始化
                    var map = new BMap.Map("allmap");
                    var point = new BMap.Point(116.331398, 39.897445);
                    // 初始化地图，设置中心点坐标和地图级别
                    map.centerAndZoom(point, 15);
                    map.enableScrollWheelZoom(false); // 启用滚轮放大缩小，默认禁用
                    map.disableDragging(true); //禁止拖拽
                    //画到地图上面
                    _this.maps = map;
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            var mk = new BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                            _this.currentLocation =
                                r.point.lng + "," + r.point.lat;
                            window.setTimeout(function() {
                                if (_this.currentLocation) {
                                    _this.$toast("定位成功！");
                                    // _this.$router.push({
                                    //     name: "clockIn",
                                    //     query: {
                                    //         location: _this.currentLocation
                                    //     }
                                    // });
                                }
                            }, 2000);

                            let pointCenter = new BMap.Point(
                                r.point.lng,
                                r.point.lat
                            );
                            let circle = new BMap.Circle(pointCenter, 10, {
                                strokeColor: "blue",
                                strokeWeight: 1
                            });
                            map.addOverlay(circle);
                        } else {
                            alert("failed" + this.getStatus());
                        }
                    });
                });
            });
        },
        getAdd() {
            let _this = this;
            console.log(_this.maps);
            var geolocation = new BMap.Geolocation();
            geolocation.enableSDKLocation();
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    _this.maps.addOverlay(mk);
                    _this.maps.panTo(r.point);
                    alert("您的位置：" + r.point.lng + "," + r.point.lat);
                } else {
                    alert("failed" + this.getStatus());
                }
            });
        }
    }
};
</script>
<style scoped>
#allmap {
    width: 100%;
    height: 100%;
    padding-top: 46px;
    box-sizing: border-box;
}
.getCity {
    margin: 20px auto;
    width: 100px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #000;
    text-align: center;
    line-height: 50px;
}
</style>
