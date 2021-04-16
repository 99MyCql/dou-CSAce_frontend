<template>
  <div class="main-content">
    <content-navbar></content-navbar>

    <!-- your content here -->
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="h3 border-bottom mt-3 py-3">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/field' }">研究方向</el-breadcrumb-item>
        <el-breadcrumb-item>会议/期刊</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="row mt-5">
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-body pt-5 pb-6 pl-5">
              <div>
                <span class="icon icon-shape bg-primary">
                  <img class="w-100 h-100" src="img\\icons\\conference.svg" />
                </span>
                <span class="text-dark display-3 ml-3">IEEE Transactions on Computers</span>
              </div>
            </div>
            <div class="card-footer" style="background: #f9fafc;">
              <div class="row d-flex align-items-end">
                <div class="col-3 text-center">
                  <div class="h1 card-title mb-0">10,380</div>
                  <span class="text-muted mt-2 mb-0">Papers</span>
                </div>
                <div class="col-3 text-center">
                  <div class="h1 card-title mb-0">41,380</div>
                  <span class="text-muted mt-2 mb-0">Citations</span>
                </div>
                <div class="col-3 text-center">
                  <div class="ml-auto" style="height: 50px" :id="papersChartID"></div>
                  <span class="text-muted mt-2 mb-0">Paper Trend</span>
                </div>
                <div class="col-3 text-center">
                  <div style="height: 50px" :id="citsChartID"></div>
                  <span class="text-muted mt-2 mb-0">Citation Trend</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mt-5 mt-lg-0">
          <top-table style="height:400px;" title="Top 作者" :tableData="tableData">
            <template v-slot:columns>
              <th>Page name</th>
              <th>Visitors</th>
              <th>Unique users</th>
              <th>Bounce rate</th>
            </template>
          </top-table>
        </div>
      </div>

      <paper-table></paper-table>

    </div>

    <content-footer></content-footer>
  </div>
</template>

<script>
import ContentNavbar from "@/components/ContentNavbar";
import ContentFooter from "@/components/ContentFooter";
import TopTable from "@/components/TopTable";
import PaperTable from "@/components/PaperTable";

export default {
  name: 'Venue',
  components: {
    ContentNavbar,
    ContentFooter,
    TopTable,
    PaperTable,
  },
  data() {
    return {
      papersChartID: "papersChart",
      citsChartID: "citsChart",
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
        }
      ],
    }
  },
  mounted() {
    this.papersChartInit();
    this.citsChartInit();
  },
  methods: {
    papersChartInit() {
      // 基于准备好的dom，初始化echarts实例
      let papersChart = this.$echarts.init(document.getElementById(this.papersChartID));
      // 绘制图表
      papersChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "0%",
          bottom: "10%"
        },
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      });
    },
    citsChartInit() {
      // 基于准备好的dom，初始化echarts实例
      let citsChart = this.$echarts.init(document.getElementById(this.citsChartID));
      // 绘制图表
      citsChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "0%",
          bottom: "10%"
        },
        xAxis: {
          show: false,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      });
    }
  }
}
</script>