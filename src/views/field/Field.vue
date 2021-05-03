<template>
  <div class="main-content">
    <content-navbar></content-navbar>

    <!-- your content here -->
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="h3 border-bottom mt-3 py-3">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{fieldKey.slice(2)}}</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="row mt-5">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header border-bottom">
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="h3 mb-0">会议/期刊列表</div>
                </div>
                <div class="col-md-8 d-md-flex justify-content-end align-items-center">
                  <div class="btn btn-sm btn-secondary mt-2 mt-md-0" @click="clearFilter">清除筛选</div>
                  <div class="btn btn-sm btn-secondary mt-2 mt-md-0" @click="clearSelection">取消选择</div>
                  <div class="btn btn-sm btn-primary mt-2 mt-md-0" @click="cmpVenue">对比所选项</div>
                </div>
              </div>
            </div>
            <el-table
              ref="venueTable"
              :data="venueTable.venues"
              highlight-current-row
              max-height="560px"
              :header-cell-style="{'background-color': '#f6f9fc', 'color': '#8898aa'}"
              @selection-change="val => {
                venueCmpChart.cmpVenues = val;
                venueTable.selectCount = val.length;
              }">
              <el-table-column
                type="selection"
                width="60">
              </el-table-column>
              <el-table-column
                prop="_key"
                label="ShortName"
                min-width="150"
                show-overflow-tooltip
                sortable
                :filters="[{text: '会议', value: 'confSeries'}, {text: '期刊', value: 'journals'}]"
                :filter-method="(value, row) => {return row._id.split('/')[0] === value}"
                filter-placement="bottom-end">
                <template #default="scope">
                  <div style="font-weight: 600;">
                    <i
                      class="fa fa-bookmark mr-1"
                      :class="scope.row._id.split('/')[0] === 'journals' ? 'text-danger' : 'text-primary'"
                    ></i>
                    {{ scope.row._key }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="category"
                label="Category"
                min-width="100"
                :filters="[{text: 'A', value: 'A'}, {text: 'B', value: 'B'}, {text: 'C', value: 'C'}]"
                :filter-method="(value, row) => {return row.category === value}"
                filter-placement="bottom-end">
              </el-table-column>
              <el-table-column
                prop="name"
                label="Name"
                min-width="300"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="publisher"
                label="Publisher"
                min-width="150"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="paperCount"
                label="Paper"
                min-width="130"
                sortable>
              </el-table-column>
              <el-table-column
                prop="citationCount"
                label="Citation"
                min-width="130"
                sortable>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="col-lg-6 mt-5 mt-lg-0">
          <div class="card bg-default">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="h3 text-white mb-0 ls-1">会议/期刊对比</h5>
                </div>
                <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                    <li class="nav-item mr-2 mr-md-0">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: venueCmpChart.activeType === 'P' }"
                        @click.prevent="setChartData('P')"
                      >
                        <span class="d-none d-md-block">Paper</span>
                        <span class="d-md-none">P</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: venueCmpChart.activeType === 'C' }"
                        @click.prevent="setChartData('C')"
                      >
                        <span class="d-none d-md-block">Citation</span>
                        <span class="d-md-none">C</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div style="height: 500px" :id="venueCmpChart.id"></div>
            </div>
          </div>
        </div>
      </div>


      <div class="row mt-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header border-bottom">
              <div class="row align-items-center">
                <div class="col text-center">
                  <div class="h3 mb-0">Top作者</div>
                </div>
              </div>
            </div>
            <el-table
              v-loading="topAuthorTable.loading"
              :data="topAuthorTable.authors"
              highlight-current-row
              max-height="400px"
              cell-class-name="pl-2"
              header-cell-class-name="pl-2"
              :header-cell-style="{'background-color': '#f6f9fc', 'color': '#8898aa'}">
              <el-table-column
                prop="name"
                label="Name"
                min-width="160"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="paperCount"
                label="Paper"
                min-width="130">
              </el-table-column>
              <el-table-column
                prop="citationCount"
                label="Citation"
                min-width="130">
              </el-table-column>
            </el-table>
            <div class="card-footer d-flex justify-content-center bg-transparent">
              <el-pagination
                background
                :pager-count="3"
                layout="prev, pager, next"
                :total="100"
                @current-change="topAuthorTableChang">
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="col-md-6 mt-5 mt-md-0">
          <div class="card">
            <div class="card-header border-bottom">
              <div class="row align-items-center">
                <div class="col text-center">
                  <div class="h3 mb-0">Top论文</div>
                </div>
              </div>
            </div>
            <el-table
              v-loading="topPaperTable.loading"
              :data="topPaperTable.papers"
              highlight-current-row
              max-height="400px"
              cell-class-name="pl-2"
              header-cell-class-name="pl-2"
              :header-cell-style="{'background-color': '#f6f9fc', 'color': '#8898aa'}">
              <el-table-column
                prop="title"
                label="Title"
                min-width="300"
                show-overflow-tooltip>
                <template #default="scope">
                  <div style="font-weight: 600;">
                    <i
                      class="fa fa-bookmark mr-1"
                      :class="scope.row.type === 1 ? 'text-danger' : 'text-primary'"
                    ></i>
                    {{ scope.row.title }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="Venue"
                min-width="80">
                <template #default="scope">
                  {{ scope.row._id.split('-')[1].toUpperCase() }}
                </template>
              </el-table-column>
              <el-table-column
                prop="year"
                label="Year"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="citationCount"
                label="Citation"
                min-width="130">
              </el-table-column>
            </el-table>
            <div class="card-footer d-flex justify-content-center bg-transparent">
              <el-pagination
                background
                :pager-count="3"
                layout="prev, pager, next"
                :total="100"
                @current-change="topPaperTableChang">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <content-footer></content-footer>
  </div>
</template>

<script>
import ContentNavbar from "@/components/ContentNavbar";
import ContentFooter from "@/components/ContentFooter";
import { listVenue, listAuthor, listPaper } from '@/api/field.js';
import { ElMessage } from 'element-plus'

var venueCmpChart = null;

export default {
  name: 'Field',
  components: {
    ContentNavbar,
    ContentFooter,
  },
  data() {
    return {
      fieldKey: this.$route.params.key,
      venueTable: {
        venues: [],
        selectCount: 0,
      },
      venueCmpChart: {
        cmpVenues: [],
        id: "venueCmpChart",
        activeType: "P",
        xAxisData: Array.from({length:2021-1935},(item, i)=> 1935+i)
      },
      topAuthorTable: {
        authors: [],
        loading: true,
      },
      topPaperTable: {
        papers: [],
        loading: true,
      }
    }
  },
  methods: {
    routeTo(path) {
      this.$router.push(path)
    },
    setChartData(activeType) {
      this.venueCmpChart.activeType = activeType
      let series = []
      if (activeType === "C") {
        this.venueCmpChart.cmpVenues.forEach(e => {
          let data = []
          this.venueCmpChart.xAxisData.forEach(year => {
            data.push(e.citCountPYear[year.toString()])
          });
          series.push({
            name: e.shortName,
            type: 'line',
            data: data,
            smooth: true,
            lineStyle: {
              type: "solid",
              width: 4
            }
          })
        });
      } else if (activeType === "P") {
        this.venueCmpChart.cmpVenues.forEach(e => {
          let data = []
          this.venueCmpChart.xAxisData.forEach(year => {
            data.push(e.paperCountPYear[year.toString()])
          });
          series.push({
            name: e.shortName,
            type: 'line',
            data: data,
            smooth: true,
            lineStyle: {
              type: "solid",
              width: 4
            }
          })
        });
      }
      console.log(series)
      venueCmpChart.setOption({series: series})
    },
    venueCmpChartInit() {
      // 基于准备好的dom，初始化echarts实例
      venueCmpChart = this.$echarts.init(document.getElementById(this.venueCmpChart.id), 'light')
      // 绘制图表
      venueCmpChart.setOption({
        tooltip: {
          trigger: 'axis',
          show: true,
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "10%",
          right: "5%",
          top: "20%",
          bottom: "15%"
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.venueCmpChart.xAxisData,
          splitLine: {
            show:false
          },
          axisLine: {
            show:false
          },
          axisLabel: {
            color: "rgba(136, 152, 170, 1)"
          },
          // offset: 5
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show:false
          },
          axisLine: {
            show:false
          },
          axisLabel: {
            color: "rgba(136, 152, 170, 1)"
          },
          offset: 5
        },
        dataZoom: [{
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 80,      // 左边在的位置。
          end: 100        // 右边在的位置。
        }],
      })
    },
    getVenues() {
      let that = this
      listVenue(this.fieldKey)
        .then(function(rsp) {
          that.venueTable.venues = rsp.data.data;
        })
        .catch(function(err) {
          console.error(err);
        });
    },
    cmpVenue() {
      console.log(this.venueCmpChart.cmpVenues, this.venueTable.selectCount)
      if (this.venueTable.selectCount > 10) {
        ElMessage.error("最多对比10项")
        return
      }
      this.setChartData("P")
    },
    clearFilter() {
      this.$refs.venueTable.clearFilter();
    },
    clearSelection() {
      this.$refs.venueTable.clearSelection();
    },
    getTopAuthor(page=0) {
      let that = this
      listAuthor(this.fieldKey, page*10, 10, "citationCount", "DESC")
        .then(function(rsp) {
          that.topAuthorTable.authors = rsp.data.data
          that.topAuthorTable.loading = false
        })
        .catch(function(err) {
          console.error(err)
          that.topAuthorTable.loading = false
        });
    },
    topAuthorTableChang(page) {
      console.log(page)
      this.topAuthorTable.loading = true;
      this.getTopAuthor(page-1)
    },
    getTopPaper(page=0) {
      let that = this
      listPaper(this.fieldKey, page*10, 10, "citationCount", "DESC")
        .then(function(rsp) {
          that.topPaperTable.papers = rsp.data.data
          that.topPaperTable.loading = false
        })
        .catch(function(err) {
          console.error(err)
          that.topPaperTable.loading = false
        });
    },
    topPaperTableChang(page) {
      console.log(page)
      this.topPaperTable.loading = true;
      this.getTopPaper(page-1)
    }
  },
  mounted() {
    this.venueCmpChartInit()
    this.getVenues()
    this.getTopAuthor()
    this.getTopPaper()
  },
}
</script>
<style scoped>
.my-tr {
  cursor: pointer;
}
.my-tr:hover {
  background-color: #f5f7fa;
}
</style>
