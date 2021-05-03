<template>
  <div class="main-content">
    <content-navbar :showSearch="false"></content-navbar>

    <!-- your content here -->
    <div class="mb-md-5">
      <div class="header bg-gradient-info pb-6 pb-md-9 pt-4 pt-md-7">
        <div class="container-fluid">
          <div class="header-body">
            <h1 class="display-3 text-white d-flex justify-content-center">
              科研快速入门辅助系统
            </h1>
            <p class="mb-4 px-md-9 text-white-50 text-center">
              设计一个论文数据系统，能够基于论文不同研究方向呈现学术研究热点趋势以及相关方向的重要论文、学者信息，并能可视化呈现。
            </p>
            <form class="navbar-search navbar-search-dark form-inline d-flex justify-content-center">
              <base-input
                placeholder="Search"
                class="input-group-alternative"
                addon-right-icon="fas fa-search"
                formClasses="w-50"
              />
            </form>
          </div>
        </div>
      </div>

      <div class="container-fluid mt--5">
        <!-- 数据概览 -->
        <div class="row">
          <div class="col-md-3 mb-3" v-for="(item, index) in overview" :key="index">
            <stats-card
              :title="item.title"
              :subTitle="item.subTitle"
              :iconClass="item.iconClass"
              :iconSrc="item.iconSrc"
            />
          </div>
        </div>

        <!-- 研究方向对比分析图 -->
        <div class="row mt-5">
          <div class="col">
            <div class="card bg-default">
              <div class="card-header bg-transparent">
                <div class="row align-items-center">
                  <div class="col">
                    <h5 class="h3 text-white mb-0 ls-1">各研究方向对比</h5>
                  </div>
                  <div class="col">
                    <ul class="nav nav-pills justify-content-end">
                      <li class="nav-item mr-2 mr-md-0">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: fieldCompChart.activeType === 'P' }"
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
                          :class="{ active: fieldCompChart.activeType === 'C' }"
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
                <div style="height: 600px" :id="fieldCompChart.id"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 研究方向分类 -->
        <div class="mt-6">
          <div class="text-center">
            <h1 class="display-3">
              研究方向分类
            </h1>
            <p class="mb-4 px-md-9 text-black-50">
              参考中国计算机学会 CCF 推荐学术期刊/会议的分类
            </p>
          </div>

          <div class="row mt-2 mt-lg-5">
            <div class="col-md-4 mb-3" v-for="field in fields" :key="field.name">
              <div class="card card-lift--hover shadow" style="cursor: pointer;" @click="routeToField">
                <div class="card-body">
                  <div class="card-title h2 text-truncate">{{ field.name }}</div>
                  <p class="card-text text-truncate">{{ field.zhName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <content-footer></content-footer>
  </div>

</template>

<script>
import StatsCard from "./StatsCard";
import BaseInput from "@/components/BaseInput";
import ContentNavbar from "@/components/ContentNavbar.vue";
import ContentFooter from "@/components/ContentFooter.vue";
import { getCount as getAuthorCount } from '@/api/author.js';
import { getCount as getPaperCount } from '@/api/paper.js';
import { getCount as getConfSeriesCount } from '@/api/confSeries.js';
import { getCount as getJournalCount } from '@/api/journal.js';
import { list as listField } from '@/api/field.js';

var fieldCompChart = null;

export default {
  name: 'Home',
  components: {
    StatsCard,
    BaseInput,
    ContentNavbar,
    ContentFooter,
  },
  data() {
    return {
      overview: [
        {
          title: "",
          subTitle: "Author",
          iconClass: "bg-gradient-green",
          iconSrc: "img\\icons\\author.svg",
        },
        {
          title: "",
          subTitle: "Paper",
          iconClass: "bg-gradient-green",
          iconSrc: "img\\icons\\paper.svg",
        },
        {
          title: "",
          subTitle: "Conference",
          iconClass: "bg-gradient-green",
          iconSrc: "img\\icons\\conference.svg",
        },
        {
          title: "",
          subTitle: "Journal",
          iconClass: "bg-gradient-green",
          iconSrc: "img\\icons\\journal.svg",
        },
      ],
      fieldCompChart: {
        id: "fieldCompChart",
        activeType: "C",
        echart: null,
        xAxisData: Array.from({length:2021-1935},(item, i)=> 1935+i)
      },
      fields: [],
    }
  },
  methods: {
    setChartData(activeType) {
      this.fieldCompChart.activeType = activeType
      let series = []
      if (activeType === "C") {
        this.fields.forEach(e => {
          let data = []
          this.fieldCompChart.xAxisData.forEach(year => {
            data.push(e.citCountPYear[year.toString()])
          });
          series.push({
            name: e.zhName,
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
        this.fields.forEach(e => {
          let data = []
          this.fieldCompChart.xAxisData.forEach(year => {
            data.push(e.paperCountPYear[year.toString()])
          });
          series.push({
            name: e.zhName,
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
      fieldCompChart.setOption({series: series})
    },
    fieldCompChartInit() {
      // 基于准备好的dom，初始化echarts实例
      fieldCompChart = this.$echarts.init(document.getElementById(this.fieldCompChart.id), 'light')
      // 绘制图表
      fieldCompChart.setOption({
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
          data: this.fieldCompChart.xAxisData,
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
    routeToField() {
      this.$router.push('/field')
    },
    numToStr(num) {
      return num.toString().replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
        return s+','
      })
    },
    getOverview() {
      let that = this;
      getAuthorCount()
        .then(function(rsp) {
          that.overview[0].title = that.numToStr(rsp.data.data);
        })
        .catch(function(err) {
          console.error(err);
        });
      getPaperCount()
        .then(function(rsp) {
          that.overview[1].title = that.numToStr(rsp.data.data);
        })
        .catch(function(err) {
          console.error(err);
        });
      getConfSeriesCount()
        .then(function(rsp) {
          that.overview[2].title = that.numToStr(rsp.data.data);
        })
        .catch(function(err) {
          console.error(err);
        });
      getJournalCount()
        .then(function(rsp) {
          that.overview[3].title = that.numToStr(rsp.data.data);
        })
        .catch(function(err) {
          console.error(err);
        });
    },
    getFields() {
      let that = this;
      listField()
        .then(function(rsp) {
          that.fields = rsp.data.data;
          that.fieldCompChartInit();
          that.setChartData("P");
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  },
  computed: {
  },
  mounted() {
    this.getOverview();
    this.getFields();
  },
  created() {
  }
}
</script>
