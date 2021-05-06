<template>
  <div class="mt-6" v-loading="loading">
    <div class="row align-items-center mt-5 px-3">
      <div class="col-md-4">
        <div class="h3 mb-0">论文列表 ({{paperCount}})</div>
      </div>
      <div class="col-md-8 d-md-flex flex-wrap justify-content-end align-items-center">
        <!-- <el-checkbox-group class="mr-4 mt-2 mt-md-0" v-model="paperTable.type" size="mini">
          <el-checkbox class="mb-0 mr-2" label="conf">
            <i class="fa fa-bookmark mr-1 text-primary"></i>会议
          </el-checkbox>
          <el-checkbox class="mb-0" label="journal">
            <i class="fa fa-bookmark mr-1 text-danger"></i>期刊
          </el-checkbox>
        </el-checkbox-group>

        <el-checkbox-group class="mr-4 mt-2 mt-md-0" v-model="paperTable.category" size="mini">
          <el-checkbox class="mb-0 mr-2" label="A">A 类</el-checkbox>
          <el-checkbox class="mb-0 mr-2" label="B">B 类</el-checkbox>
          <el-checkbox class="mb-0" label="C">C 类</el-checkbox>
        </el-checkbox-group> -->
        <span class="text-muted mr-3">Sort by</span>
        <el-select class="mr-3" v-model="selectValue" placeholder="请选择" @change="paperTableSelectChange">
          <el-option label="Default" value="Default"></el-option>
          <el-option label="Most Recent" value="Recent"></el-option>
          <el-option label="Most Early" value="Early"></el-option>
          <el-option label="Most Cite" value="Cite"></el-option>
        </el-select>
        <span class="text-muted mr-3"><i class="fa fa-bookmark mr-1 text-danger"></i> Journal</span>
        <span class="text-muted"><i class="fa fa-bookmark mr-1 text-primary"></i> Conference</span>
      </div>
    </div>
    <div v-for="paper in papers" :key="paper._key">
      <div class="card card-lift--hover shadow mt-3">
        <div class="card-body pb-3">
          <el-tooltip class="item" effect="dark" :content="paper.title" placement="top">
            <div class="card-title h2 mb-1 text-truncate">
              <i
                class="fa fa-bookmark mr-1"
                :class="paper.type === 2 ? 'text-danger' : 'text-primary'"></i>
              {{ paper.title }}
            </div>
          </el-tooltip>
          <div class="px-4" style="font-family: tahoma">
            <p class="card-text mb-0 text-muted font-italic">
              {{ paper.year }}
              <router-link
                v-if="paper.venue && paper.type === 2" class="mr-1"
                :to="{name: 'Journal', params: { jouKey: paper.venue._key }}"
                target="_blank">
                {{ paper.venue._key }}
              </router-link>
              <router-link
                v-if="paper.venue && paper.type === 1" class="mr-1"
                :to="{name: 'ConfSeries', params: { confSerKey: paper.venue._key }}"
                target="_blank">
                {{ paper.venue._key }}
              </router-link>
            </p>
            <p class="card-text mb-0">
              <router-link
                v-for="a in paper.authors" :key="a._key"
                class="mr-1"
                :to="{name: 'Author', params: { authorKey: a._key }}"
                target="_blank">
                {{ a.name }},
              </router-link>
            </p>
            <el-divider class="my-2"></el-divider>
            <span class="text-muted mr-2">
              <i class="fas fa-external-link-alt mr-1 text-muted"></i>
              <a :href="paper.doiUrl" target="_Blank">Source</a>
            </span>
            <span class="text-muted">
              Citations ({{paper.citationCount}})
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="paperCount"
        :pager-count="5"
        @current-change="paperTablePageChang">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "paper-table",
  components: {
  },
  props: {
    loading: Boolean,
    papers: Array,
    paperCount: Number,
    paperTableSelectChange: Function,
    paperTablePageChang: Function,
  },
  data() {
    return {
      selectValue: ""
    };
  },
  methods: {
  }
};
</script>