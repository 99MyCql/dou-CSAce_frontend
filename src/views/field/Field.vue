<template>
  <div class="main-content">
    <content-navbar></content-navbar>

    <!-- your content here -->
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="h3 border-bottom mt-3 py-3">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>研究方向</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="row mt-5">
        <div class="col">
          <div class="card bg-default">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="h3 text-center text-white mb-0 ls-1">当前研究方向论文、引用变化趋势</h5>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div style="height: 500px" :id="fieldChartID"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <venue-table :tableData="tableData"></venue-table>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <top-table title="Top 作者" :tableData="tableData">
            <template v-slot:columns>
              <th>Page name</th>
              <th>Visitors</th>
              <th>Unique users</th>
              <th>Bounce rate</th>
            </template>
          </top-table>
        </div>
        <div class="col">
          <top-table title="Top 论文" :tableData="tableData">
            <template v-slot:columns>
              <th>Page name</th>
              <th>Visitors</th>
              <th>Unique users</th>
              <th>Bounce rate</th>
            </template>
          </top-table>
        </div>
      </div>
    </div>

    <content-footer></content-footer>
  </div>

</template>

<script>
import ContentNavbar from "@/components/ContentNavbar";
import ContentFooter from "@/components/ContentFooter";
import VenueTable from "./VenueTable";
import TopTable from "./TopTable";

export default {
  name: 'Field',
  components: {
    ContentNavbar,
    ContentFooter,
    VenueTable,
    TopTable
  },
  data() {
    return {
      fieldChartID: 'fieldChart',
      tableData: [
        {
          page: "/argon/",
          visitors: "4,569",
          unique: "340",
          bounceRate: "46,53%",
          bounceRateDirection: "up",
        },
        {
          page: "/argon/index.html",
          visitors: "3,985",
          unique: "319",
          bounceRate: "46,53%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/charts.html",
          visitors: "3,513",
          unique: "294",
          bounceRate: "36,49%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/tables.html",
          visitors: "2,050",
          unique: "147",
          bounceRate: "50,87%",
          bounceRateDirection: "up",
        },
        {
          page: "/argon/profile.html",
          visitors: "1,795",
          unique: "190",
          bounceRate: "46,53%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/",
          visitors: "4,569",
          unique: "340",
          bounceRate: "46,53%",
          bounceRateDirection: "up",
        },
        {
          page: "/argon/index.html",
          visitors: "3,985",
          unique: "319",
          bounceRate: "46,53%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/charts.html",
          visitors: "3,513",
          unique: "294",
          bounceRate: "36,49%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/tables.html",
          visitors: "2,050",
          unique: "147",
          bounceRate: "50,87%",
          bounceRateDirection: "up",
        },
        {
          page: "/argon/profile.html",
          visitors: "1,795",
          unique: "190",
          bounceRate: "46,53%",
          bounceRateDirection: "down",
        },
      ],
    }
  },
  mounted() {
    this.fieldChartInit();
  },
  methods: {
    fieldChartInit() {
      // 基于准备好的dom，初始化echarts实例
      let fieldChart = this.$echarts.init(document.getElementById(this.fieldChartID), 'light')
      // 绘制图表
      fieldChart.setOption({
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
  }
}
</script>
