<template>
  <div>
    <van-search v-model="searchInfo.nickName" 
      placeholder="请输入姓名或昵称"
      shape='round'
      show-action
      slots
      @search="onSearch"  
    >
    <template #action>
      <span @click="onSearch">搜索</span>
    </template>
    </van-search>

    <van-dropdown-menu>
      <van-dropdown-item v-model="searchInfo.iswork" :options="iswork" @change="menuChange"/>
      <van-dropdown-item v-model="searchInfo.skill" :options="skill" @change="menuChange" />
      <van-dropdown-item style="width:30px" v-model="searchInfo.sex" :options="sex"  @change="menuChange"/>
      <van-dropdown-item v-model="searchInfo.isdelete" :options="isdelete" @change="menuChange" />
    </van-dropdown-menu>

      
    <ul>
        <li class="item" v-for="info in records"  :key="info.id">
            <div style="
            width: 14%;
            height: 100%;
            float: left;">   
                <i class="iconfont icon-ren-" :style="info.sex == 0 ?'font-size:40px;color:#FC1944':'font-size:40px;color:black'"></i>
            </div>
            <div style="width: 68%;height: 100%;">
                <div style="margin-left: 10px;">
                  <span :style="info.isdelete==1?'color:#FC1944':'color:#1989FA'">{{info.name}}</span>
                </div>
                <div style="margin-left: 10px;">
                    <span v-if="info.iswork == 0" style="color:#FC1944">未工作</span>
                    <span v-if="info.iswork == 1" style="color:#0094ff">工作中</span>
                </div>
                <div style="margin-left: 10px;">
                  <van-icon name="fire" :color="info.skill == 0?'#326D6E':'red'" />
                </div>
                <div style="width: 70%;" >
                    <div style="margin-left: 10px;">电话:{{info.phone}}</div>
                </div>
            </div>
            <div style="float: right;height: 70%;width:18%;margin-left: -10px;padding-top:10px;color:blue">
                  <i v-show="info.isdelete==0" @click="deleteEmp(info.id)" class="iconfont icon-shanchu_" style="font-size:30px;color:#FC1944;margin-top:5px"></i>
                  <router-link :to="{path:'/edetail',query:{id:info.id}}"><van-icon name="edit" color="#1989FA" size="30px" /></router-link>
            </div>
        </li>
    </ul>
    

<router-link to="/edetail"> 
      <div class="addEmp">
        <van-icon name="add" color="#0094ff" size="40px" style="float:left;"/>
        <div class="etext" >添加员工</div>
        <van-icon name="arrow" color="#323233" size="35px" style="float:right;height:40px" />
    </div>
</router-link>



    <van-pagination 
        v-model="searchInfo.currentPage" 
        :total-items="totalPage" 
        :items-per-page="6"
        @change="pageChange"
    />

  </div>
</template> 

<script>
export default {
    name:'Emp',
    data() {
      return {
         searchInfo:{
           nickName:null,
           currentPage: 2,
           sex:null,
           skill:null,
           iswork:null,
           isdelete:null
         },
         totalPage:0,
          iswork: [
            { text: '是否工作', value: null },
            { text: '是', value: 1 },
            { text: '否', value: 0 },
          ],
          sex:[
            { text: '性别', value: null },
            { text: '男', value: 1 },
            { text: '女', value: 0 },
          ],
          skill:[
            { text: '技能', value: null },
            { text: '会', value: 1 },
            { text: '否', value: 0 },
          ],
          isdelete:[
            { text: '是否已删除', value: null },
            { text: '是', value: 1 },
            { text: '否', value: 0 },
          ],
          records:[]
      }
    },
    methods: {
      onSearch(){
          this.getEmp();
      },
      async getEmp(){
        let result =  await this.myGet('/emp',this.searchInfo);
        this.searchInfo.currentPage = result.data.current;
        this.totalPage = result.data.total;
        this.records = result.data.records
      },
      pageChange(val){
        this.searchInfo.currentPage = val;
        this.getEmp();
      },
      menuChange(){
        this.getEmp();
      },
      async deleteEmp(id){
          this.$dialog.confirm({
                    title: '删除员工',
                    message:"确定删除吗？"
                    })
                    .then(() => {
                         this.myDelete('/emp',{id});
                         this.getEmp();
                    })
                    .catch(() => {
                    }
          );
      }
    },
    mounted() {
      this.getEmp();
    },
}
</script>

<style >
  .van-pagination{
    align-content: center;
    width: 100%;
    position: absolute;
    bottom: 20px;
  }
  ul{
       
      margin: 0px;
      padding: 0px;
  }
  .item div{
      display: inline-block;
  }
  li{
    
      margin-top: 20px;
      width: 100%;
      height: 50px;
      list-style: none; 
  }
  div{
    margin: 0px;
  }
  .etext{
    margin-left: 20px;
    float: left;
    line-height:40px;
    font-size:13px;
  }

  .addEmp{
      width:100%;
      height:50px;
      border-bottom: 1px sienna solid;
      position: absolute;
      bottom: 70px;
  }

</style>