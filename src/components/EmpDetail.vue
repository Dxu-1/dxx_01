<template>
  <div>
        <br>
        <van-form>
            <van-field v-model="empInfo.name" name="员工名"     
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]
            "></van-field>
                        
            <van-field v-model="empInfo.nickName" name="别名"     
            label="别名"
            placeholder="请输入别名"
            ></van-field>


            <van-field v-model="empInfo.idCard" name="身份证"     
            label="身份证"
            placeholder="请输入身份证"
            @touchstart.native.stop="show = true"
            >
                
            </van-field>
            
            <van-field v-model="empInfo.evlContent" name="评价内容"     
                label="评价内容"
                placeholder="请输入评价内容"
            ></van-field>

            <van-field v-model="empInfo.phone" name="手机号"     
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
            ></van-field>

            <van-field v-model="empInfo.address" name="住址"     
                label="住址"
                placeholder="请输入住址"
            ></van-field>

            <van-field v-model="empInfo.bankNum" name="银行卡号"     
                label="银行卡号"
                placeholder="请输入农行号"
            ></van-field>

            <van-field v-model="empInfo.otherBank" name="其他银行卡号"     
                label="银行卡号"
                placeholder="请输入其他银行卡号"
            ></van-field>             
            


            <van-radio-group v-model="empInfo.sex">
                <van-cell title="性别">
                    <template #right-icon>
                        男<van-radio name="1" />
                        女<van-radio name="2" />
                    </template>
                </van-cell>
           </van-radio-group>

        </van-form>

<!-- 
        <van-cell plain type="primary" @touchstart.native.stop="show = true">
                    弹出身份证号键盘
                </van-cell> -->
        <van-number-keyboard
            :show="show"
            extra-key="X"
            close-button-text="完成"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
        />
  </div>
</template>

<script>
export default {
    name:'EmpDetail',
    data() {
        return {
            empInfo:{
                "id":null,
                "name": null,
                "sex": null,
                "recomEmpId": null,
                "nickName": null,
                "skill": null,
                "iswork": null,
                "proId":null,
                "idCard": null,
                "evlScore": null,
                "evlContent": null,
                "phone": null,
                "wechat": null,
                "hometown": null,
                "bankNum": null,
                "otherBank": null,
                "address": null,
                "createTime": "",
                "updateTime": null,
                "isdelete": null,
                "attCount": null

            },
            show:true,
        }
    },
    methods: {
        async getEmp(id){
            let result = await this.myGet(`/emp/${id}`,id)
            this.empInfo = result.data[0];
        },
        editEmp(id){

        },
        addEmp(){

        },
        onInput(value) {
            this.$toast(value);
        },
        onDelete() {
            this.$toast('删除');
        },
    },
    mounted() {
        if(this.$route.query.id){
            this.getEmp(this.$route.query.id);
        }
    },
}
</script>

<style>

</style>