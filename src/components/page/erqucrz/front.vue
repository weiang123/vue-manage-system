
<style scoped>
.ms-wrap {
    background-color: #f0f0f0;
    text-align: center;
    width: 100%;
    height: 100%;
    /* border: 8px solid red; */
    overflow-y: auto;
}
.ms-bottom {
    font-size: 11px;
    color: #999999;
    margin-top: 10%;
}
</style>

<template>
  <div class="ms-wrap">

    <div style="font-size:13px; margin-top:4%">居民认证</div>
    <img
      style="width:46%;margin-top:22%;"
      src="../../../assets/img/erqucrz/erqucrz-front-ico1.png"
    >
    <div style="font-size:16px;color:#07c160;margin-top:2rem">审核成功</div>
    <el-button
      style="width: 90%; height: 40px; font-size: 18px;border-radius: 5px; margin-top:34%;"
      type="primary"
      @click="toContent()"
    >扫码出入</el-button>
    <div class="ms-bottom">技术支持：云天融基(北京)科技有限公司<br />联系电话：15311456117</div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    data: function() {
        return {
            timeId: '', //定时器1
            nowTime: dayjs().format('HH:mm:ss'),
            nowDate: dayjs().format('YYYY年M月D日'),
            crzdata: {
                add: '马坡二区',
                uname: '陈青环',
                buildingNo: '32号楼2单元601',
                urelation: '非业主(承租人)'
            }
        };
    },
    methods: {
        toContent() {
            this.$router.push('/erqucrz/content');
        }
    },
    beforeDestroy: function() {
        //实例销毁前清除定时器
        let that = this;
        if (that.timeId) {
            clearInterval(that.timeId);
        }
    },
    mounted() {
        let that = this;
        that.timeId = setInterval(() => {
            that.nowTime = dayjs().format('HH:mm:ss');
        }, 1000);
    }
};
</script>

