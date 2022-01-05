<template>
    <div>
        <van-nav-bar>
            <template #left>
                <van-popover
                    v-model="showPopover"
                    trigger="click"
                    :actions="actions"
                    @select="onSelect"
                    placement = 'bottom-start'
                >
                    <template #reference>
                        <van-icon name="wap-nav" size="30" class="list"/>
                    </template>
                </van-popover>
            </template>

            <template #title>
                <b style="font-size:20px">{{title}}</b>
            </template>

            <template #right>
                <i class="iconfont icon-tuichudenglu" 
                style="color:blue;font-size:30px" 
                @click="logout"></i>
            </template>
        </van-nav-bar>


        <router-view />
    </div>  
</template>

<script>
    export default {
        name:'Home',
        data() {
            return {
                title:'主页',
               showPopover: false,
                // 通过 actions 属性来定义菜单选项
                actions: [
                    { text: '员工管理',url:'/emp' },
                    { text: '项目管理',url:'/pro' },
                    { text: '经理管理',url:'/man' },
                    { text: '可视化',url:'/vis' }
                ],
            }
        },
        methods: {
            onSelect(action) {
                let url = action.url;
                this.$router.push(url)
                this.title = this.$router.history.current.name
            },
            logout(){
                this.$dialog.confirm({
                    title: '退出登录',
                    message:"确定退出吗？"
                    })
                    .then(() => {
                        localStorage.removeItem('token');
                        this.$notify({type:'success',message:'退出成功'})
                        this.$router.replace('/')
                    })
                    .catch(() => {
                });
            }
        },
        computed: {
            
        },
        mounted() {
            
        },
    }
</script>

<style>

</style>