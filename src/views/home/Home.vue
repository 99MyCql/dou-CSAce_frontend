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
              致力于保家卫国、开疆扩土、一统天下。
              <!-- 设计一个论文数据系统，能够基于论文不同研究方向呈现学术研究热点趋势以及相关方向的重要论文、学者信息，并能可视化呈现。 -->
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
          <div class="col-md-3" v-for="(item, index) in overview" :key="index">
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
                </div>
              </div>
              <div class="card-body">
                <div style="height: 400px" :id="fieldCompChartID"></div>
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
            <div class="col-md-3 mb-3" v-for="field in fields" :key="field.name">
              <div class="card card-lift--hover shadow" style="cursor: pointer;" @click="routeToField">
                <div class="card-body">
                  <div class="card-title h2">{{ field.name }}</div>
                  <p class="card-text">{{ field.zhName }}</p>
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
      fieldCompChartID: "fieldCompChart",
      fields: [
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
        {
          name: "Computer Architecture",
          zhName: "计算机体系结构/并行与分布计算/存储系统",
        },
      ]
    }
  },
  methods: {
    fieldCompChartInit() {
      // 基于准备好的dom，初始化echarts实例
      let fieldCompChart = this.$echarts.init(document.getElementById(this.fieldCompChartID), 'light')
      // 绘制图表
      fieldCompChart.setOption({
        tooltip: {
          trigger: 'axis',
          show: true,
          axisPointer: {
            type: "none"
          }
        },
        textStyle: {
          color: '#fff'
        },
        legend: {
          data: ['邮件营销', '联盟广告'],
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "8%",
          right: "5%",
          top: "5%",
          bottom: "10%"
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              type: "solid",
              width: 4
            }
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            smooth: true,
            lineStyle: {
              type: "solid",
              width: 4
            }
          },
        ]
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
    }
  },
  mounted() {
    this.fieldCompChartInit();
  },
  created() {
    this.getOverview();
  }
}
</script>
