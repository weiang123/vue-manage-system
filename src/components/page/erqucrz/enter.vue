<template>
  <div class="container">
    <div class="form-box">
      <el-form :model="routerForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="小区名字" prop="add">
          <el-input maxlength="10" show-word-limit v-model="routerForm.add"></el-input>
        </el-form-item>
        <el-form-item label="你的名字" prop="name">
          <el-input maxlength="10" show-word-limit v-model="routerForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="名字拼音" prop="txImg">
          <el-select v-model="routerForm.txImg" filterable allow-create placeholder="输入你的名字拼音">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('camera')">拍摄头像照片</el-button>
          <el-button type="primary" @click="onSubmit('file')">选择头像照片</el-button>
        </el-form-item>
      </el-form>
      <img ref="crztximgref" src="" alt="" style="display:none">
      <input type="file" id="inputcamera" accept="image/*" capture="camera" @change="onfilechange($event)" style="display:none" />
      <input type="file" id="inputfile" accept="image/*" @change="onfilechange($event)" style="display:none" />
    </div>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            routerForm: {
                add: '马坡二区',
                name: '张梓涵',
                txImg: 'someimg'
            },
            rules: {
                add: [{ required: true, message: '请输入地址', trigger: 'blur' }],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            }
        };
    },
    methods: {
        getBase64ImageByCanvas(img) {
            var canvas = document.createElement('canvas');
            canvas.width = 546;
            canvas.height = 662;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 546, 662);
            var dataURL = canvas.toDataURL(img.type);
            return dataURL;
        },
        cutDowmImg(img, width) {
            var canvas = document.createElement('canvas');
            canvas.width = Math.min(img.width, width);
            canvas.height = (img.height * width) / img.width;
            var cxt = canvas.getContext('2d');
            cxt.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL();
        },
        async onfilechange(e) {
            let that = this;
            var file = e.target.files[0];
            console.log('filesize: ', file.size);
            if (!/image\/\w+/.test(file.type)) {
                alert('请确保文件为图像类型!');
                return false;
            }
            var base64data = await that.file2Base64(file);
            console.log('---------- file2Base64 end outer --------------');
            if (!base64data) {
                return;
            }
            // console.log(base64data);
            console.log('base64data.length= ', base64data.length);
            if (base64data.length > 2 * 1000 * 1000) {
                console.log('文件过大，开始压缩图片');
                that.$refs['crztximgref'].src = base64data;
                var img = that.$refs['crztximgref'];
                img.onload = function() {
                    var base64File = that.cutDowmImg(img, 546);
                    // that.$message.success('cutDowmImg END');
                    console.log('---------- cutDowmImg end --------------');
                    console.log('base64File.length= ', base64File.length);
                    // console.log(base64File);
                    that.saveAndJump(base64File);
                };
            } else {
                that.saveAndJump(base64data);
            }
        },
        file2Base64(file) {
            let that = this;
            return new Promise((resolve, reject) => {
                if (window.FileReader) {
                    var fr = new FileReader();
                    fr.readAsDataURL(file);
                    fr.onloadend = function(e) {
                        that.$message.success('window.FileReader END');
                        var base64data = e.target.result;
                        console.log('---------- window.FileReader inner onloadend --------------');
                        // console.log(base64data);
                        console.log('base64data.length= ', base64data.length);
                        resolve(base64data);
                    };
                } else {
                    that.$message.success('浏览器不支持！');
                    resolve(null);
                }
            });
        },
        saveAndJump(base64data) {
            let that = this;
            localStorage.setItem('crzadd', that.routerForm.add);
            localStorage.setItem('crzname', that.routerForm.name);
            localStorage.setItem('crzimglocal', base64data);
            that.$message.success('成功！');
            that.$router.push('/crz/cont/' + that.routerForm.name + '/' + that.routerForm.add + '/' + that.routerForm.txImg);
        },
        onSubmit(flag) {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    if (flag == 'camera') {
                        document.getElementById('inputcamera').click();
                    } else {
                        document.getElementById('inputfile').click();
                    }
                } else {
                    this.$message.success('请输入参数！');
                    return false;
                }
            });
        },
        toLocalConform() {
            let that = this;
            that.$confirm('您已经录入过信息，是否直接打开?', '提示', {
                confirmButtonText: '直接打开',
                cancelButtonText: '重新录入',
                type: 'success',
                center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '直接打开'
                    });
                    this.$router.push('/crz/cont/' + that.routerForm.name + '/' + that.routerForm.add + '/' + that.routerForm.txImg);
                    // location.reload();
                })
                .catch(() => {
                    this.$message('重新录入');
                });
        }
    },
    created() {
        let crzname = localStorage.getItem('crzname');
        if (crzname) {
            this.routerForm.name = crzname;
            this.toLocalConform();
        }
    },
    beforeDestroy() {
        //实例销毁前清除定时器
        let that = this;
    },

    mounted() {
        let that = this;
    }
};
</script>

<style scoped>
</style>