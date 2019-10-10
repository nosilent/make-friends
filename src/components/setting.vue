<template>
  <div>
    <navbar>
      <template #title>修改信息</template>
      <template #icon>
        <img src="/src/icon/arrow-left.png" alt="头像" @click="back()" />
      </template>
    </navbar>
    <div class="content">
      <a-card :bordered="false">
        <div slot="title">
          当前头像为：
          <img :src="photo?photo:default_avatar" alt='' />
        </div>
        <a-card-grid
          v-for="item of icon.split(',')"
          :key="item"
          style="width:20%;textAlign:'center'"
          @click='info_photo_change(item)'
        >
          <img :src="'/src/icon/'+item+'.png'" alt />
        </a-card-grid>
      </a-card>
        <p style='margin-top:30px;'>个性描述：</p>
        <a-input-textArea v-model="describe"/>
        <a-button type='primary' block style='margin-top: 30px;' size='large' @click='keep'>
          保存
        </a-button>
    </div>
  </div>
</template>

<script>
import navbar from "./navbar";
import { card,input,button } from "ant-design-vue";
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
  created(){
    this.init_photo = this.photo
    this.init_description = this.description
  },
  data() {
    return {
      default_avatar: '/src/icon/default.png',
      init_photo:'',
      init_description: '',
      icon:
        "boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra"
    };
  },
  computed:{
    ...mapGetters(['photo','description']),
    ...mapState(['info']),
    describe:{
      get(){
        return this.description
      },
      set(value){
        this.info_description_change(value)
      }
    }
  },
  components: {
    navbar,
    aCard: card,
    aCardGrid: card.Grid,
    aInput:input,
    aInputTextArea:input.TextArea,
    aButton:button
  },
  methods: {
    ...mapMutations(['info_photo_change','info_description_change','set_photo','set_description']),
    keep(){
      this.$axios.post(`api/user_update/${this.info.account}`,{
        photo:this.photo,
        description: this.description
      }).then(res=>{
        if(!res.data.code){
          this.$message.success(res.data.msg)
          this.$socket.emit('user_update',{account:this.info.account})
          this.$router.back(-1)
        }else{
          this.$message.error('操作失败')
        }
      })
    },
    back(){
      this.set_photo(this.init_photo)
      this.set_description(this.init_description)
      this.$router.back(-1)
    }
  }
};
</script>

<style lang='less' scoped>
.content {
  padding: 45px 10px;
}
</style>