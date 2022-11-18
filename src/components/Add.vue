<template>
  <div class="hello">
    <el-dialog
      title="提示"
      :visible.sync="open"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="open = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]
export default {
  name: 'Add',
  props: {
    msg: String,
    open: Boolean,
    item: String
  },
  data () {
    return {
      test: message,
      dialogVisible: false
    }
  },
  created () {},
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
