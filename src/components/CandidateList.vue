<template>
  <div>

    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="votes"
        label="Votes"
        width="80"
        sortable>
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Tags"
        :filters="tags"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <el-tag
            :key="tag"
            v-for="tag in scope.row.tags"
            :disable-transitions="false"
          >
            {{tag}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="referer"
        label="Referer"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Create Date"
        sortable
        width="120"
      >
      </el-table-column>
      <el-table-column label="Operation"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleVote(scope.$index, scope.row)">Vote</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '../utils/api'

export default {
  data () {
    return {
      tableData: []
    }
  },

  methods: {
    filterHandler (value, row, column) {
      return row.tags.includes(value)
    },
    async handleVote (index, row) {
      const { candidates } = await api.vote(row.id)
      this.tableData = candidates
    },
    async handleDelete (index, row) {
      const { candidates } = await api.deleteCandidate(row.id)
      this.tableData = candidates
    }
  },

  async mounted () {
    const { candidates } = await api.getCandidates()
    this.tableData = candidates
  },
  computed: {
    tags () {
      const tagSet = new Set()
      for (var candidate of this.tableData) {
        for (var tag of candidate.tags) {
          tagSet.add(tag)
        }
      }
      const tagFilters = []
      for (var temp of tagSet) {
        tagFilters.push({ text: temp, value: temp })
      }
      return tagFilters
    }
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
