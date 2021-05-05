<template>
  <div class="main-content">
    <content-navbar></content-navbar>

    <!-- your content here -->
    <div class="container-fluid">
      <!-- 页首面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="h3 border-bottom mt-3 py-3">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ fieldKey.slice(2).replace(/_/g, " ") }}</el-breadcrumb-item>
      </el-breadcrumb>


      <div class="row mt-5">
        <!-- 会议/期刊列表 -->
        <div class="col-lg-5">
          <div class="card">
            <div class="card-header border-bottom">
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="h3 mb-0">会议/期刊列表</div>
                </div>
                <div class="col-md-8 d-md-flex justify-content-end align-items-center">
                  <div
                    class="btn btn-sm btn-secondary mt-2 mt-md-0"
                    @click="this.$refs.venueTable.clearFilter();">
                    清除筛选
                  </div>
                  <div
                    class="btn btn-sm btn-secondary mt-2 mt-md-0"
                    @click="this.$refs.venueTable.clearSelection()">
                    取消选择
                  </div>
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
                  <div style="font-weight: 600;cursor: pointer;" @click="routeToVenue(scope.row)">
                    <i
                      class="fa fa-bookmark mr-1"
                      :class="scope.row._id.split('/')[0] === 'journals' ? 'text-danger' : 'text-primary'"
                    ></i>
                    {{ scope.row._key }}
                    <i class="fas fa-external-link-alt ml-1 text-muted"></i>
                    <!-- <i class="fas fa-link ml-1 text-muted"></i> -->
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

        <!-- 会议/期刊对比 -->
        <div class="col-lg-7 mt-5 mt-lg-0">
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
                        @click.prevent="setChartData('P')">
                        <span class="d-none d-md-block">Paper</span>
                        <span class="d-md-none">P</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: venueCmpChart.activeType === 'C' }"
                        @click.prevent="setChartData('C')">
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
        <!-- Top作者 -->
        <div class="col-md-6">
          <top-author-table
            :authors="topAuthorTable.authors"
            :loading="topAuthorTable.loading"
            :topAuthorTableChang="topAuthorTableChang">
          </top-author-table>
        </div>

        <!-- Top论文 -->
        <div class="col-md-6 mt-5 mt-md-0">
          <top-paper-table
            :papers="topPaperTable.papers"
            :loading="topPaperTable.loading"
            :topPaperTableChang="topPaperTableChang">
          </top-paper-table>
        </div>
      </div>
    </div>

    <content-footer></content-footer>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import ContentNavbar from "@/components/ContentNavbar"
import ContentFooter from "@/components/ContentFooter"
import TopAuthorTable from "@/components/TopAuthorTable"
import TopPaperTable from "@/components/TopPaperTable"
import { listVenue, listAuthor, listPaper } from '@/api/field.js'

var venueCmpChart = null

export default {
  name: 'Field',
  components: {
    ContentNavbar,
    ContentFooter,
    TopAuthorTable,
    TopPaperTable,
  },
  props: {
    fieldKey: String
  },
  data() {
    return {
      venueTable: {
        venues: [],
        selectCount: 0,
      },
      venueCmpChart: {
        id: "venueCmpChart",
        xAxisData: Array.from({length:2021-1935},(item, i)=> 1935+i),
        options: {
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
            data: Array.from({length:2021-1935},(item, i)=> 1935+i),
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
        },
        activeType: "P",
        cmpVenues: [],
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
    routeToVenue(venue) {
      console.log(venue)
      let venuePage = null
      if (venue._id.split('/')[0] === 'journals') {
        venuePage = this.$router.resolve({
          name: 'Journal',
          params: { jouKey: venue._key },
          query: { fieldKey: this.fieldKey }
        })
      } else {
        venuePage = this.$router.resolve({
          name: 'ConfSeries',
          params: { confSerKey: venue._key },
          query: { fieldKey: this.fieldKey }
        })
      }
      window.open(venuePage.href);
    },
    venueCmpChartInit() {
      // 基于准备好的dom，初始化echarts实例
      venueCmpChart = this.$echarts.init(document.getElementById(this.venueCmpChart.id), 'light')
      // 绘制图表
      venueCmpChart.setOption(this.venueCmpChart.options)
    },
    setChartData(activeType) {
      this.venueCmpChart.activeType = activeType
      this.venueCmpChart.options.series = []
      if (activeType === "C") {
        this.venueCmpChart.cmpVenues.forEach(e => {
          let data = []
          this.venueCmpChart.xAxisData.forEach(year => {
            data.push(e.citCountPYear[year.toString()])
          });
          this.venueCmpChart.options.series.push({
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
          this.venueCmpChart.options.series.push({
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
      console.log(this.venueCmpChart.options)
      venueCmpChart.clear()
      venueCmpChart.setOption(this.venueCmpChart.options)
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
  },
  created() {
    this.getVenues()
    this.getTopAuthor()
    this.getTopPaper()
  }
}
</script>
