
<style scoped>
.ms-wrap {
    /* background-image: url('../../../assets/img/erqucrz/erqucrz-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100%; */

    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
    /* border: 8px solid red; */
    overflow-y: auto;
}
.bg-img {
    width: 100%;
    height: auto;
}

.ms-con {
    /* border: 6px solid blue; */
    top: 0px;
    position: absolute;
    width: 100%;
    color: #111111;
    overflow: hidden;
}
.ms-add {
    /* top: 6%; */
    margin-top: 10%;
    font-size: 38px;
}

.ms-nowTime {
    /* top: 37.5%; */
    margin-top: 63%;
    font-size: 38px;
}

.ms-nowDate {
    /* top: 45.5%; */
    margin-top: 78%;
    font-size: 21px;
}
.ms-msg {
    /* top: 54%; */
    margin-top: 91%;
}

.my-img {
    width: 50%;
    height: auto;
}
.my-info {
    font-size: 14px;
    margin: 0.7rem;
}
.ms-ti {
    color: #5a5a5a;
}

.ms-btn {
    /* top: 109%; */
    margin-top: 185%;
    /* border: 6px solid blue; */
}

.ms-btn button {
    width: 80%;
    height: 46px;
    font-size: 20px;
    /* display: none; */
}
</style>

<template>
  <div class="ms-wrap">
    <img
      class="bg-img"
      src="../../../assets/img/erqucrz/erqucrz-bg.jpg"
    >
    <div class="ms-con ms-add">{{crzdata.add}}</div>
    <div class="ms-con ms-nowTime">{{nowTime}}</div>
    <div class="ms-con ms-nowDate">{{nowDate}}</div>
    <div class="ms-con ms-msg">
      <img
        class="my-img"
        src="../../../assets/img/erqucrz/touxiang-chenqinghuan.jpg"
      >
      <div class="my-info"><span class="ms-ti">姓名:</span><span class="ms-neirong">{{crzdata.uname}}</span></div>
      <div class="my-info"><span class="ms-ti">楼门号:</span><span class="ms-neirong">{{crzdata.buildingNo}}</span></div>
      <div class="my-info"><span class="ms-ti">与房屋所有人关系:</span><span class="ms-neirong">{{crzdata.urelation}}</span></div>
    </div>

    <div class="ms-con ms-btn">
      <el-button
        type="primary"
        @click="toFront()"
      >关闭</el-button>
    </div>
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
        toFront() {
            this.$router.push('/erqucrz/front');
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

