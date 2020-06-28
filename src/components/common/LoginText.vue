<template>
  <div>
      <van-field  
      :label="label" 
      :type="type"
      :placeholder="placeholder"
      v-model="content"
       />
  </div>
</template>

<script>
export default {
    data(){
        return{
            content:''
        }
    },
    props:['label','placeholder','type','rule'],
    methods:{
        handleInput(){
            const rule = new RegExp(this.rule)// 强制转换为 字符
            if(rule.test(this.content)){
               this.$emit('inputChange',this.content)
            }
        }
    },
    watch:{
        content(){// 监听 input框输入的内容
            this.handleInput()// 调用正则验证
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>