<template>
  <div id="app-main" class="app-main">
    <!-- 全屏 -->
    <div class="btn-fullscreen" @click="handleFullScreen">
      <el-tooltip
        effect="dark"
        :content="fullscreen ? `取消全屏` : `全屏`"
        placement="bottom"
      >
        <i class="el-icon-rank"></i>
      </el-tooltip>
    </div>
    <!-- 右键菜单 -->
    <div
      v-if="rightMenu"
      ref="app-rightMenu"
      class="menu"
      :style="{ left: left + 'px', top: top + 'px', width: '120px' }"
    >
      <ul>
        <li class="hover">
          <div class="item">
            <i class="el-icon-s-grid"></i>
            <span class="label">布局</span>
          </div>
          <div class="app-size">
            <span @click="menuClick(this.currentAppGridList, '22')" class="size"
              >2X2</span
            >
            <span class="size">2X2</span>
            <span class="size">1X1</span>
          </div>
        </li>
        <li class="hover">
          <div class="item">
            <i class="el-icon-edit"></i>
            <span class="label">编辑</span>
          </div>
        </li>
        <li class="hover" @click="menuClick({ currentAppGridList }, 'del')">
          <div class="item">
            <i class="el-icon-delete"></i>
            <span class="label">删除</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 时钟 -->
    <div class="clock-container">
      <flip-clock />
    </div>
    <!-- gridApp -->
    <div class="app-body">
      <draggable
        animation="300"
        group="people"
        class="app-grid"
        ghost-class="ghost"
        :move="checkMove"
      >
        <template v-for="(item) in defaultArray">
          <div
            class="app-item"
            :class="item.size"
            @contextmenu.prevent.stop="menuHandle($event, item)"
            :key="item.index"
          >
            <div
              class="app-icon"
              @click="urlToHandle($event, item)"
              :style="item.value | ColorFilter"
            >
              <span class="website-app text">{{ item.icon_text }}</span>
            </div>
            <div class="app-title">{{ item.title }}</div>
          </div>
        </template>
        <!-- <div
          class="app-item"
          @contextmenu.prevent.stop="menuHandle($event)"
          @click="urlToHandle($event)"
          @mouseup="urlToMouseupHandle($event)"
          v-for="(item, index) in defaultArray"
          :key="item.index"
        >
          <div class="app-icon" :style="item.value | ColorFilter"></div>
          <div class="app-title">{{ item.name }}</div>
        </div> -->
      </draggable>
    </div>
    <!-- bottom -->
    <div style="display: flex; justify-content: center">
      <div class="app-bottom">
        <svg
          t="1667574666971"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2199"
          width="20"
          height="20"
        >
          <path
            d="M514.1 687.6m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"
            fill="#3E3A39"
            p-id="2200"
          ></path>
          <path
            d="M838.4 267.6m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"
            fill="#3E3A39"
            p-id="2201"
          ></path>
          <path
            d="M760.2 493.8c-5.5 0-10 4.5-10 10 0 47.5-18.5 92-52 125.5s-78.1 52-125.5 52c-5.5 0-10 4.5-10 10s4.5 10 10 10c52.8 0 102.4-20.5 139.7-57.8 37.3-37.3 57.8-86.9 57.8-139.7 0-5.6-4.4-10-10-10z"
            fill="#E285A8"
            p-id="2202"
          ></path>
          <path
            d="M950 329.3v-0.2c-7.3-37.2-22.1-68.9-44.1-94.3-19.5-22.5-43.7-38.6-69.9-46.6-37.7-11.5-74-4.6-97.1 18.4l7.1 7.1-7.7-6.4-65.6 78.5c-34.4-47.8-74.5-55.4-116.8-63.5-59.1-11.3-126.1-24-208.9-145.6-1.8-2.6-4.8-4.4-8.3-4.4-5.5 0-10 4.5-10 10 0 58.7 3 116.7 8.5 163.4 2.5 20.9 5.3 38.4 8.3 50.5 0.7 3 1.5 6 2.4 8.8-3.5 0.7-6.9 1.5-10.5 2.2-63.6 13.7-142.8 30.6-253.1 24h-0.6c-5.5 0-10 4.5-10 10 0 4.3 2.7 8 6.6 9.4 4.8 3.1 16.5 24.6 26.9 43.5 19.5 35.7 46.1 84.5 83.5 128.8 44.8 53.1 94.8 86.7 148.7 99.8 15 3.7 30.4 5.8 46.2 6.3l-167 199.7c-1.5 1.7-2.3 4-2.3 6.4 0 3.1 1.5 5.9 3.7 7.8l132 106.5c1.7 1.4 3.9 2.2 6.3 2.2 4 0 7.5-2.4 9.1-5.9l79.8-175.6h146.6c48 0 89.6-8.4 123.7-24.9 33-16 60.2-40.3 80.8-72.1 36.9-56.9 54.9-140.8 54.9-256.5 0-31 4.2-47.8 14.7-58.2 11.9-11.8 34.9-17.3 72.4-17.3 5.5 0 10-4.5 10-10-0.1-0.5-0.1-1.1-0.3-1.8zM451.1 208.5c37.2 21.2 71.2 27.7 101.1 33.4 42.7 8.1 76.8 14.6 107.2 59.7l-47.3 56.5c-47.1-39.4-90.5-60.5-136-65.9-35.3-4.2-70.2 0.9-108.5 8.6-2.8-7.7-7.4-27.6-11.7-67.5-3.8-35.5-6.1-77.1-6.9-119.7 32.9 43.5 66.5 74.6 102.1 94.9z m402.6 135.9c-18.1 18-20.6 45.4-20.6 72.3 0 111.7-16.9 192-51.7 245.6-38.3 59.1-99.7 87.9-187.7 87.9h-153c-24.3 0-50.5 6.1-70.2 16.3-27.3 14.2-41.8 35.3-41.8 61.2 0 5.5 4.5 10 10 10s10-4.5 10-10c0-18.2 10.4-32.8 31-43.4 14.2-7.4 30.8-11.4 45-13.1l-70.3 154.6-114-92L412 628.6c58.3-4.2 121-28.6 187.3-73.1 2.7-1.8 4.4-4.8 4.4-8.3 0-5.5-4.5-10-10-10-2.1 0-4 0.6-5.6 1.7-47.6 32-93.4 53.3-136.1 63.4-37.8 8.9-74.1 9.3-107.8 1-49.7-12.1-96.1-43.5-138.1-93.3-12.5-14.9-23.9-30.3-34.1-45.7 18.5 5.5 45.2 12.3 76.5 16.9 22.3 3.2 43.9 4.8 64.7 4.8 11.9 0 23.5-0.5 34.7-1.6 39.1-3.6 74.4-13.6 105-29.7 3.2-1.7 5.3-5 5.3-8.8 0-5.5-4.5-10-10-10-1.7 0-3.3 0.4-4.7 1.2-64.1 33.7-139.7 31.9-191.8 24.5-48.4-6.9-86.1-19.9-96.8-23.8-11.7-19.2-21.6-37.5-30.2-53.2-7.5-13.7-13.3-24.3-18.3-32.2 100.9 3.3 174.9-12.5 235.1-25.5 50.9-10.9 91.1-19.5 132.2-14.7 42 5 81.1 24 125.6 61.3l-44.3 53c-1.5 1.7-2.3 4-2.3 6.4 0 5.5 4.5 10 10 10 3.1 0 5.8-1.4 7.7-3.6l183-218.7c17.5-17.3 46.9-22.3 76.8-13.2 22.6 6.9 43.6 20.9 60.6 40.6 17.4 20.1 29.8 44.7 37 73.5-36.5 1.3-59.6 8.5-74.1 22.9z"
            fill="#3E3A39"
            p-id="2203"
          ></path>
        </svg>
        <span style="margin-left: 10px">鸽子桌面</span>
      </div>
    </div>
    <iframe
      id="background"
      src="https://naiop.github.io/threejs/frame/examples/bg.html"
    />
    <!-- <add msg="新增网站" :open="openAddDialog" item="currentAppGridList" /> -->
  </div>
</template>

<script>
import FlipClock from 'kuan-vue-flip-clock'
import draggable from 'vuedraggable' // 引入vuedraggable
import add from './Add'
export default {
  components: { draggable, FlipClock, add },
  filters: {
    // color 过滤
    ColorFilter (status) {
      var color = '#' + Math.random().toString(16).slice(-6)
      var style = 'background-color:' + color
      return style
    }
  },
  data () {
    return {
      openAddDialog: false,
      fullscreen: false,
      rightMenu: false,
      left: '',
      top: '',
      enabled: true,
      currentAppGridList: [],
      defaultArray: [
        {
          id: 'iM3NZ',
          type: 'box',
          size: 'icon-4X2',
          title: '文章收纳盒',
          url: 'undefined',
          icon: '',
          create_time: '2022-09-13 20:10:12',
          update_time: '2022-09-13 20:10:12',
          original_id: 1,
          position: 0,
          bg_color: '#154280',
          status: 0,
          desc:
            '临时使用的多个网址，添加进收纳盒，方便快速使用，避免因打开网址过多而丢失',
          icon_type: 'bg_color'
        },
        {
          id: 'G3H4D',
          type: 'folder',
          size: 'icon-2X2',
          title: '文件夹',
          url: null,
          icon: null,
          create_time: '2022-10-10 12:53:14',
          update_time: '2022-10-10 12:53:14',
          original_id: 16,
          position: 2,
          bg_color: '#FBBF24',
          status: 1,
          desc: '常用网站可以利用文件夹进行分类管理',
          icon_type: 'bg_color',
          children: []
        },
        {
          id: '5VvfU',
          type: 'screensaver',
          size: 'icon-2X1',
          title: '屏保',
          url: null,
          icon: '',
          create_time: '2022-10-10 12:53:28',
          update_time: '2022-10-10 12:53:28',
          original_id: 6,
          position: 3,
          bg_color: '#15803D',
          status: 0,
          desc:
            '离开电脑不想让被人看到你的电脑屏幕，一键打开个性化屏保小应用，支持自定义文字内容，自定义背景，让你的屏幕隐私安全且高大上',
          icon_type: 'bg_color'
        },
        {
          id: 'CneSJ',
          type: 'sticker',
          size: 'icon-1X1',
          title: '贴纸',
          url: null,
          icon: '/app/1665377471432.svg',
          create_time: '2022-10-10 17:59:01',
          update_time: '2022-10-10 17:59:01',
          original_id: 2,
          position: 4,
          bg_color: null,
          status: 0,
          desc:
            '有想要做的事情，担心忘记，随时打开便签，快速记录，可以拖到页面任何位置，方便提醒，再也不用花钱买纸质便签啦。',
          icon_type: 'icon'
        },
        {
          id: 'TAK88',
          type: 'set',
          size: 'icon-1X1',
          title: '设置',
          url: null,
          icon: '/app/1665377497026.svg',
          create_time: '2022-10-10 17:59:07',
          update_time: '2022-10-10 17:59:07',
          original_id: 5,
          position: 5,
          bg_color: null,
          status: 0,
          desc: '系统设置',
          icon_type: 'icon'
        },
        {
          id: 'v0Xf8',
          type: 'market',
          size: 'icon-1X1',
          title: '应用市场',
          url: null,
          icon: '/app/1665377514117.svg',
          create_time: '2022-10-10 17:59:07',
          update_time: '2022-10-10 17:59:07',
          original_id: 7,
          position: 6,
          bg_color: null,
          status: 0,
          desc:
            '各种使用的小工具，各种常用的网站,都在这里，有了它就再也不愁找不到想要的网站，想要的工具，大大提高工作效率，更主要的是，可以一键添加到桌面。',
          icon_type: 'icon'
        },
        {
          id: 'AH8tx',
          type: 'bookmark',
          size: 'icon-1X1',
          title: '书签管理',
          url: null,
          icon: '/app/1665377553008.svg',
          create_time: '2022-10-10 17:59:07',
          update_time: '2022-10-10 17:59:07',
          original_id: 9,
          position: 7,
          bg_color: null,
          status: 1,
          desc:
            '书签管理应用可以快速导入，浏览器书签并对其进行重新分类整理，统一在桌面显示，方便快速查找使用，可以大大提高使用效率。',
          icon_type: 'icon'
        },
        {
          id: 'wLxdI',
          type: 'add',
          size: 'icon-1X1',
          title: '新增网站',
          url: null,
          icon: '/app/1665377570145.svg',
          create_time: '2022-10-10 17:59:07',
          update_time: '2022-10-10 17:59:07',
          original_id: 17,
          position: 8,
          bg_color: null,
          status: 0,
          desc: '添加自己想要的网站，随时记录',
          icon_type: 'icon'
        },
        {
          id: 'LiW55',
          type: 'icon',
          size: 'icon-1X1',
          title: '百度',
          url: 'https://www.baidu.com/',
          icon: '/website/1665381372629.svg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 1,
          position: 9,
          bg_color: null,
          status: null,
          desc: '全球最大的中文搜索网站',
          icon_type: 'logo'
        },
        {
          id: 'BDSnC',
          type: 'icon',
          size: 'icon-1X1',
          title: '语雀',
          url: 'https://www.yuque.com',
          icon: '/website/1663064585280.png',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 6,
          position: 10,
          bg_color: null,
          status: null,
          desc:
            '十万阿里人都在用的笔记与文档知识库，面向企业、组织或个人，提供全新的体系化知识管理，打造轻松流畅的工作协同。',
          icon_type: 'logo'
        },
        {
          id: 'jrSXn',
          type: 'icon',
          size: 'icon-1X1',
          title: 'Vue.js',
          url: 'https://cn.vuejs.org',
          icon: '/website/1663064387372.png',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 10,
          position: 11,
          bg_color: null,
          status: null,
          desc: '渐进式 JavaScript 框架 | Vue.js',
          icon_type: 'logo'
        },
        {
          id: 'Z8qnL',
          type: 'icon',
          size: 'icon-1X1',
          title: '京东',
          url: 'https://www.jd.com',
          icon: '/website/1663054896745.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 29,
          position: 12,
          bg_color: null,
          status: null,
          desc:
            '专业的综合网上购物商城，为您提供正品低价的购物选择、优质便捷的服务体验。',
          icon_type: 'logo'
        },
        {
          id: 'T9Kso',
          type: 'icon',
          size: 'icon-1X1',
          title: '腾讯视频',
          url: 'https://v.qq.com/',
          icon: '/website/1663054921187.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 31,
          position: 13,
          bg_color: null,
          status: null,
          desc:
            '致力于打造中国领先的在线视频媒体平台，以丰富的内容、极致的观看体验、便捷的登录方式、24小时多平台无缝应用体验以及快捷分享的产品特性，主要满足用户在线观看视频的需求。',
          icon_type: 'logo'
        },
        {
          id: 'iIYa7',
          type: 'icon',
          size: 'icon-1X1',
          title: '芒果TV',
          url: 'https://www.mgtv.com',
          icon: '/website/1663054934958.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 33,
          position: 14,
          bg_color: null,
          status: null,
          desc: '大家都在看的在线视频网站-热门综艺最新电影电视剧在线观看',
          icon_type: 'logo'
        },
        {
          id: 'rpsEs',
          type: 'icon',
          size: 'icon-1X1',
          title: '西瓜视频',
          url: 'https://www.ixigua.com/',
          icon: '/website/1663054971875.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 47,
          position: 15,
          bg_color: null,
          status: null,
          desc:
            '国内领先的中视频平台，它源源不断地为不同人群提供优质内容，让人们看到更丰富和有深度的世界，收获轻松的获得感，点亮对生活的好奇心。',
          icon_type: 'logo'
        },
        {
          id: '9A9TF',
          type: 'icon',
          size: 'icon-1X1',
          title: 'QQ音乐',
          url: 'https://y.qq.com/',
          icon: '/website/1663054984410.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 49,
          position: 16,
          bg_color: null,
          status: null,
          desc: '千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！',
          icon_type: 'logo'
        },
        {
          id: 'KjfWe',
          type: 'icon',
          size: 'icon-1X1',
          title: 'CSDN',
          url: 'https://www.csdn.net/',
          icon: '/website/1663055086278.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 58,
          position: 17,
          bg_color: null,
          status: null,
          desc: '全球知名中文IT技术交流平台',
          icon_type: 'logo'
        },
        {
          id: 'LOQE9',
          type: 'icon',
          size: 'icon-1X1',
          title: '极客时间',
          url: 'https://time.geekbang.org/',
          icon: '/website/1663055015540.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 79,
          position: 18,
          bg_color: null,
          status: null,
          desc:
            '致力于为用户提供前沿的IT技术、产品、运营资讯、摄影跑步等知识服务。',
          icon_type: 'logo'
        },
        {
          id: 'zMxy4',
          type: 'icon',
          size: 'icon-1X1',
          title: '菜鸟教程',
          url: 'https://www.runoob.com/',
          icon: '/website/1663057479817.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 82,
          position: 19,
          bg_color: null,
          status: null,
          desc:
            '提供了编程的基础技术教程, 介绍了HTML、CSS、Javascript、Python，Java，Ruby，C，PHP , MySQL等各种编程语言的基础知识',
          icon_type: 'logo'
        },
        {
          id: 'kYSdd',
          type: 'icon',
          size: 'icon-1X1',
          title: '掘金',
          url: 'https://juejin.cn/',
          icon: '/website/1663066509693.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 84,
          position: 20,
          bg_color: null,
          status: null,
          desc: '掘金是面向全球中文开发者的技术内容分享与交流平台',
          icon_type: 'logo'
        },
        {
          id: 'lZD5e',
          type: 'icon',
          size: 'icon-1X1',
          title: 'BOSS直聘',
          url: 'https://www.zhipin.com',
          icon: '/website/1663055034446.jpeg',
          create_time: '2022-10-10 17:59:39',
          update_time: '2022-10-10 17:59:39',
          original_id: 90,
          position: 21,
          bg_color: null,
          status: null,
          desc: '让求职者与Boss直接开聊、加快面试、即时反馈。',
          icon_type: 'logo'
        },
        {
          url: 'https://0b29ou.csb.app/',
          title: 'gzz',
          user: '',
          password: '',
          icon: '',
          icon_text: '鸽子',
          icon_type: 'bg_color',
          imageUrl: '',
          bg_color: '#10B981',
          type: 'icon',
          size: 'icon-1X1',
          status: 1,
          id: 'TzWkd'
        }
      ]
    }
  },
  created () {
    this.appGridList()
    this.allClick() // 全局事件
  },
  methods: {
    allClick () {
      document.onclick = (event) => {
        this.rightMenu = false
      }
    },
    appGridList () {
      this.$storage.set('appList', this.defaultArray)
      this.$storage.get('appList')
    },
    color16 () {
      // 十六进制颜色随机
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
      return color
    },
    menuHandle (event, item) {
      console.log('menuHandle', item, event)
      // 给left和top分别赋值为鼠标的位置,
      this.rightMenu = true
      this.left = event.pageX
      this.top = event.pageY
      this.currentAppGridList = []
      this.currentAppGridList.push(item)
    },
    urlToHandle (event, item) {
      console.log('urlToHandle', item, event)
      this.rightMenu = false
      if (item.url !== '' && item.url !== null) {
        window.open(item.url, '_blank')
      }
      switch (item.title) {
        case '设置':
          this.openAddDialog = true
          break

        default:
          break
      }
    },
    urlToMouseupHandle (event, item) {
      this.rightMenu = false
      console.log(event)
      console.log('urlToMouseupHandle')
      console.log(item)
      // window.location.href = item.url;
      // window.open(item.url, "_blank");
    },
    checkMove () {
      console.log('checkMove')
    },
    menuClick (v, t) {
      try {
        switch (t) {
          case 'del':
            console.log('del', v)
            this.$storage.remove('appList', v)
            for (let index = 0; index < this.defaultArray.length; index++) {
              if (
                this.defaultArray[index].title === this.currentAppGridList.title
              ) {
                this.defaultArray.splice(index, 1)
              }
            }

            break
          case '22':
            break

          default:
            break
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}
#background {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    border: none;
    pointer-events: none;
}
.app-main {
    position: relative;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-flow: column;
    max-width: 1280px;
    height: calc(100vh - 350px);
    margin: 0 auto;
    padding-top: 50px;
}
.app-body{
    padding: 0 45px;
    height: 100%;
}
.app-grid {
  margin: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill,calc(var(--item-size) + var(--item-gap-y)));
   grid-template-rows: repeat(auto-fill,calc(var(--item-size) + var(--item-gap-x)));
  grid-auto-flow: dense;
  justify-content: center;
  box-sizing: border-box;
  }

.app-item {
    width: calc(var(--item-size) + var(--item-gap-x));
    height: calc(var(--item-size) + var(--item-gap-y));
    padding: 0 calc(var(--item-gap-y)/2) calc(var(--item-gap-x));
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
}
.icon-2X1 {
    grid-column: span 2;
    grid-row: span 1;
    width: calc(var(--item-size)*2 + var(--item-gap-y)*2);
    height: calc(var(--item-size)*1 + var(--item-gap-x)*1);
}
.icon-2X2 {
    grid-column: span 2;
    grid-row: span 2;
    width: calc(var(--item-size)*2 + var(--item-gap-y)*2);
    height: calc(var(--item-size)*2 + var(--item-gap-x)*2);
}
.icon-4X2 {
    grid-column: span 4;
    grid-row: span 2;
    width: calc(var(--item-size)*4 + var(--item-gap-y)*4);
    height: calc(var(--item-size)*2 + var(--item-gap-x)*2);
}
.app-icon {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--icon-bg-radius);
    background-color: #fff;
}
.app-box-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.app-title {
    font-size: 12px;
    color: var(--color);
    text-align: center;
    padding-top: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.app-grid .app-item .app-icon .website-app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.app-grid .app-item .app-icon .website-app .text {
    color: #fff;
    font-size: 12px;
    text-align: center;
}

/* ———————————————— */

li, ul {
    list-style: none;
}
.menu {
    position: fixed;
    border-radius: 8px;
    z-index: 999;
    padding: 5px 4px;
    background-color: #0b0b0bcc;
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    box-shadow: 0 2px 8px #0000004d;
    border: 1px solid rgba(11,11,11,.2);
  }

.menu ul li {
    transition: background .2s;
    font-size: 12px;
    color: #fff;
    padding: 0 4px;
    cursor: pointer;
    margin: 4px 0;
    border-radius: 6px;
}
.menu ul li .item {
    padding: 4px 0;
}
.menu ul li .app-size {
    padding-left: 24px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.menu ul li .app-size .size {
    border-radius: 12px;
    padding: 2px 8px;
    margin: 4px 0;
    display: inline-block;
    background-color: hsla(0,0%,100%,.10588235294117647);
}
.menu ul li .label {
    margin-left: 10px;
    vertical-align: middle;
}

.menu ul li :hover {
    background-color: rgba(255, 255, 255, 0.4);
    position: relative;
    box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
    display   : flex;
    border-radius: 5px;
    align-items: center;
    backdrop-filter: blur(50px);
}

/* ———————————————— */
.clock-container {
    font: normal 12px 'Helvetica Neue', Helvetica, sans-serif;
    user-select: none;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

.app-bottom{
    overflow: hidden;
    cursor: pointer;
    max-height: 60px;
    transition: .3s;
    line-height: 20px;
    background-color: transparent;
    color: #27d564;
    position: fixed;
    bottom:10px;
}

</style>
