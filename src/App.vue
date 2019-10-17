<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Candidates</el-menu-item>
        <el-menu-item index="2">Refer</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <tag-management></tag-management>
      <el-divider></el-divider>
      <candidate-list v-if="activeIndex === '1'"></candidate-list>
      <refer v-if="activeIndex === '2'"></refer>
    </el-main>
  </el-container>
</template>

<script>
import TagManagement from './components/TagManagement.vue'
import CandidateList from './components/CandidateList.vue'
import Refer from './components/Refer.vue'

export default {
  components: {
    TagManagement,
    CandidateList,
    Refer
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key) {
      this.activeIndex = key
    }
  }
}
</script>

<style>
</style>
