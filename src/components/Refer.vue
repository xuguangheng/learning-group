<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Title" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="Referer" prop="referer">
        <el-input v-model="ruleForm.referer"></el-input>
      </el-form-item>
      <el-form-item label="Tags" prop="tags">
        <el-checkbox-group v-model="ruleForm.tags">
          <el-checkbox v-for="tag in tags" :key="tag" :label="tag" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../utils/api'

export default {
  data () {
    return {
      ruleForm: {
        title: '',
        referer: '',
        tags: []
      },
      rules: {
        title: [
          { required: true, message: 'Title cannot be empty', trigger: 'change' }
        ],
        tags: [
          { type: 'array', required: true, message: 'At least on tag', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await api.createCandidate(this.ruleForm)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: mapState([
    'tags'
  ])
}
</script>

<style>
</style>
