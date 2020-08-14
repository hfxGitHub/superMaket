<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" /> -->

    <el-tree ref="tree2" :data="data2" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree"
      default-expand-all />

  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'child',
          label: 'title'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    mounted() {
      this.HuoQuLieBiao()
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      HuoQuLieBiao() {
        this.$store.dispatch('table/getClassify').then(res => {
          this.data2 = res.data;
          console.log(this.data2)
        }).catch(err => [
          console.log(err)
        ])
      }

    }
  }
</script>
