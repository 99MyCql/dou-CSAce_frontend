<template>
  <div class="main-content">
    <content-navbar></content-navbar>

    <!-- your content here -->
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="h3 border-bottom mt-3 py-3">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>Author</el-breadcrumb-item>
        <el-breadcrumb-item>{{ author.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="row mt-5">
        <!-- 期刊简介 -->
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-body pt-6 pb-5 pb-lg-6 pl-md-5">
              <div class="row">
                <div class="col-lg-5">
                  <span class="icon icon-shape bg-danger">
                    <img class="w-100 h-100" src="\img\icons\author.svg" />
                  </span>
                  <span class="text-dark display-3 pl-3">{{ author.name }}</span>
                  <div class="pl-2 pl-md-5">
                    <div v-if="author.urls" class="h3 text-muted mt-3"><i class="fas fa-external-link-square-alt mr-3"></i>{{ author.urls }}</div>
                  </div>
                </div>
                <div class="col-lg-7 mt-3 mt-lg-0" v-loading="relationChart.loading">
                  <div style="height: 400px" :id="relationChart.id"></div>
                </div>
              </div>
            </div>
            <div class="card-footer py-4" style="background: #f9fafc;">
              <div class="row d-flex align-items-end" v-if="author._key">
                <div class="col-4 text-center">
                  <div class="h1 card-title mb-0">{{ numToStr(author.paperCount) }}</div>
                  <span class="text-muted mt-2 mb-0">Papers</span>
                </div>
                <div class="col-4 text-center">
                  <div class="h1 card-title mb-0">{{ numToStr(author.citationCount) }}</div>
                  <span class="text-muted mt-2 mb-0">Citations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 历年变化 -->
        <div class="col-lg-4 mt-5 mt-lg-0">
          <div class="card bg-default">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="h3 text-white mb-0 ls-1">历年变化</h5>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div style="height: 540px" :id="trendChart.id"></div>
            </div>
          </div>
        </div>
      </div>


      <!-- 论文列表 -->
      <paper-table
        :loading="paperTable.loading"
        :papers="paperTable.papers"
        :paperCount="author.paperCount"
        :paperTableSelectChange="paperTableSelectChange"
        :paperTablePageChang="paperTablePageChang"></paper-table>
    </div>

    <content-footer></content-footer>
  </div>
</template>

<script>
import ContentNavbar from "@/components/ContentNavbar"
import ContentFooter from "@/components/ContentFooter"
import PaperTable from "@/components/PaperTable"
import { get, listPaper, listCoAuthor } from '@/api/author.js'
import { listAuthor as listPaperAuthor, getPublishVenue } from '@/api/paper.js'
import { numToStr } from '@/util.js'

var trendChart = null
var relationChart = null

export default {
  name: 'Venue',
  components: {
    ContentNavbar,
    ContentFooter,
    PaperTable,
  },
  props: {
    authorKey: String,
  },
  data() {
    return {
      author: {},
      trendChart: {
        id: "trendChart",
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
            left: "15%",
            right: "5%",
            top: "10%",
            bottom: "20%"
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
      },
      paperTable: {
        papers: [],
        loading: true,
        type: [],
        category: [],
        selectValue: "",
        sortAttr: "",
        sortType: ""
      },
      coauthors: {},
      relationChart: {
        loading: true,
        id: "relationChart",
        options: {
          title: {
            // text: '合作者关系图',
            // top: 'bottom',
            // left: 'right'
          },
          tooltip: {},
          legend: [],
        }
      }
    }
  },
  methods: {
    trendChartInit() {
      // 基于准备好的dom，初始化echarts实例
      trendChart = this.$echarts.init(document.getElementById(this.trendChart.id), 'light')
      // 绘制图表
      trendChart.setOption(this.trendChart.options)
    },
    setTrendChartData() {
      this.trendChart.options.series = []
      let data = []
      this.trendChart.xAxisData.forEach(year => {
        data.push(this.author.citCountPYear[year.toString()])
      });
      this.trendChart.options.series.push({
        name: 'Citation',
        type: 'bar',
        data: data,
        smooth: true,
        lineStyle: {
          type: "solid",
          width: 4
        }
      })
      data = []
      this.trendChart.xAxisData.forEach(year => {
        data.push(this.author.paperCountPYear[year.toString()])
      });
      this.trendChart.options.series.push({
        name: 'Paper',
        type: 'bar',
        data: data,
        smooth: true,
        lineStyle: {
          type: "solid",
          width: 4
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
      })
      console.log(this.trendChart.options)
      trendChart.setOption(this.trendChart.options)
    },
    getAuthor() {
      let that = this
      get(this.authorKey)
        .then(function(rsp) {
          that.author = rsp.data.data
          that.setTrendChartData()
          that.getCoAuthors()
        })
        .catch(function(err) {
          console.error(err)
        });
    },
    getPaper(page=0, size=10) {
      let that = this
      listPaper(this.authorKey, page*size, size, that.paperTable.sortAttr, that.paperTable.sortType)
        .then(function(rsp) {
          that.paperTable.papers = rsp.data.data
          that.getPaperAuthor()
          that.getPaperPublishVenue()
          that.paperTable.loading = false
        })
        .catch(function(err) {
          console.error(err)
          that.paperTable.loading = false
        });
    },
    getPaperAuthor() {
      this.paperTable.papers.forEach(p => {
        listPaperAuthor(p._key)
          .then(function(rsp) {
            p.authors = rsp.data.data
          })
          .catch(function(err) {
            console.error(err)
          });
      });
    },
    getPaperPublishVenue() {
      this.paperTable.papers.forEach(p => {
        getPublishVenue(p._key)
          .then(function(rsp) {
            p.venue = rsp.data.data
          })
          .catch(function(err) {
            console.error(err)
          });
      });
    },
    paperTablePageChang(page) {
      console.log(page)
      this.paperTable.loading = true;
      this.getPaper(page-1)
    },
    paperTableSelectChange(value) {
      switch (value) {
        case "Default":
          this.getPaper()
          break;
        case "Recent":
          this.paperTable.sortAttr = "year"
          this.paperTable.sortType = "DESC"
          this.getPaper(0, 10)
          break;
        case "Early":
          this.paperTable.sortAttr = "year"
          this.paperTable.sortType = "ASC"
          this.getPaper(0, 10)
          break;
        case "Cite":
          this.paperTable.sortAttr = "citationCount"
          this.paperTable.sortType = "DESC"
          this.getPaper(0, 10)
          break;
        default:
          console.err("no match")
          break;
      }
    },
    numToStr(num) {
      return numToStr(num)
    },
    relationChartInit() {
      relationChart = this.$echarts.init(document.getElementById(this.relationChart.id), 'light')
      relationChart.setOption(this.relationChart.options)
    },
    setRelChartData() {
      this.relationChart.options.series = [{
        name: '合作者关系图',
        type: 'graph',
        layout: 'circular', // none circular force
        data: [],
        links: [],
        roam: true,
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        },
        force: {
          repulsion: 70
        },
        circular: {
          rotateLabel: true
        }
      }]
      let maxWeight = 0
      this.coauthors.forEach(author => {
        if (author.weight > maxWeight) maxWeight = author.weight
      })
      this.relationChart.options.series[0].data.push({
        name: this.author.name,
        symbolSize: maxWeight/2,
        x: -200,
        y: 200,
        label: {
          show: true
        }
      })
      let that = this
      this.coauthors.forEach(author => {
        that.relationChart.options.series[0].data.push({
          name: author.name,
          symbolSize: author.weight,
          value: author.weight,
          label: {
            show: author.weight > maxWeight/10
          },
          x: -(Math.random() * 400),
          y: Math.random() * 400,
          itemStyle: {
            color: that.getRandomColor()
          }
        })
        that.relationChart.options.series[0].links.push({
          "source": that.author.name,
          "target": author.name,
        })
      });
      console.log(this.relationChart.options)
      relationChart.setOption(this.relationChart.options)
      this.relationChart.loading = false
    },
    getCoAuthors() {
      let that = this
      listCoAuthor(this.authorKey)
        .then(function(rsp) {
          that.coauthors = rsp.data.data
          that.setRelChartData()
        })
        .catch(function(err) {
          console.error(err)
        });
    },
    getRandomColor(){
      let r = Math.floor(Math.random()*255);
      let g = Math.floor(Math.random()*255);
      let b = Math.floor(Math.random()*255);
      return 'rgba('+ r +','+ g +','+ b +',0.8)';
    }
  },
  created() {
    this.getAuthor()
    this.getPaper()
  },
  mounted() {
    this.trendChartInit()
    this.relationChartInit()
  }
}
</script>