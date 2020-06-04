<template>
  <div class="sbb-title">
    <!-- <h4>{{level}}</h4> -->
    <h5><span>所属时期：</span><span>{{getDateymd(headerInfo.sssqQ)}}-{{getDateymd(headerInfo.sssqZ)}}</span></h5>
    <div class="info">
      <div class="info-left">
        <div class="label">
          <span>纳税人名称：</span>
          <span>{{headerInfo.nsrxx.nsrmc}}</span>
        </div>
      </div>
      <div class="info-right">
        <div class="label">
          <span>金额单位：</span>
          <span>元至角分</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['level'],
    created() {
      this.headerInfo = JSON.parse(sessionStorage.getItem('useCase'))
    },
    methods: {
      getDateymd(str) {
				return this.$utils.dateFormat(str)
      },
    }
	}
</script>

<style scoped>
  .sbb-title h4, .sbb h5, .sbb h4 {
		text-align: center;
		font-size: 18px;
		padding-top: 15px;
	}

  .sbb-title .info {
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
	}
	
	.sbb-title .info .info-left {
		width: 400px;
	}
	
	.sbb-title .info .info-left .label {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.sbb-title .info .label span:first-child {
		text-align: right;
		width: 40%;
	}
	
	.sbb-title .info .label span:last-child {
		text-align: left;
		width: 60%;
  }
  
  .sbb-title .info-right .label span:last-child {
    padding-right: 15px;
  }
</style>
