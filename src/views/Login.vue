<template>
    <div>
			<h1 align="center"><span class="span">Admin</span></h1>
			<van-form @submit="onSubmit" class="form">
			  <van-field
			    v-model="admin.username"
			    name="用户名"
			    label="用户名"
			    placeholder="请输入用户名"
			    :rules="[{ required: true, message: '请填写用户名' }]"
			  />
			  <van-field
			    v-model="admin.password"
			    type="password"
			    name="密码"
			    label="密码"
			    placeholder="请输入密码"
			    :rules="[{ required: true, message: '请填写密码' }]"
			  />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
    </div>
</template>

<script scoped>
    export default {
		name:'Login',
      data() {
        return {
          admin:{
			  username: '',
          		password: '',
		  }
        };
      },
      methods: {
        onSubmit(values) {
			this.login();
        },
		async login(){
			try {
				let result = await this.myPost("/login",this.admin)
				if(result.code ==200){
					localStorage.setItem("token",result.data.tokenHead+result.data.token);
					this.$router.replace('/vis')
				}
			} catch (error) {
				this.$notify({type:'danger',message:"用户名不正确"});	
			}	
		}
      },
    };
</script>

<style>
	.form{
		margin-top: 50px;
	}
	.span{
        margin-top:20px;
        color: skyblue;
	}
</style>