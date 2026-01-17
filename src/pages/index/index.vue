<template>
  <view class="container">
    <!-- Banner Area -->
    <view class="banner-area">
      <swiper
        class="banner-swiper"
        indicator-dots
        autoplay
        :interval="3000"
        :duration="500"
        circular
      >
        <swiper-item @click="openLink('https://mp.weixin.qq.com/s/1N8GbgjXxu-Z5Zd1GXKVzg')">
          <image
            class="banner-image"
            src="/static/img/add-wechat.png"
            mode="aspectFill"
          />
        </swiper-item>
        <swiper-item @click="openLink('https://mp.weixin.qq.com/s/1N8GbgjXxu-Z5Zd1GXKVzg')">
          <image
            class="banner-image"
            src="/static/img/follow-official-account.png"
            mode="aspectFill"
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- Grid Menu -->
    <view class="grid-menu">
      <view
        class="grid-item"
        v-for="(item, index) in menuItems"
        :key="index"
        @click="handleMenuClick(item)"
      >
        <view class="item-content">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-desc">{{ item.desc }}</text>
          <view class="item-footer">
            <view class="go-btn">GO <text class="arrow">></text></view>
            <image v-if="item.icon" class="item-img" :src="item.icon" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>

    <!-- Notice Bar -->
    <view class="notice-bar">
      <view class="notice-left">
        <text class="notice-icon">📢</text>
        <text class="notice-label">公告</text>
      </view>
      <swiper class="notice-swiper" vertical autoplay circular :interval="3000">
        <swiper-item>
          <text class="notice-text">深圳南山 赵先生 高端邮寄 收益6800元</text>
          <text class="notice-time">25分钟前</text>
        </swiper-item>
        <swiper-item>
          <text class="notice-text"
            >广州天河 李女士 回收iPhone 15 收益5200元</text
          >
          <text class="notice-time">10分钟前</text>
        </swiper-item>
      </swiper>
    </view>

    <!-- Store Info -->
    <view class="store-card">
      <view class="store-header">
        <text class="shop-tag">附近门店</text>
        <text class="shop-name">青创回收网深圳运营中心</text>
        <text class="shop-dist">4.41km</text>
      </view>
      <view class="store-info-row">
        <text class="icon">📞</text>
        <text class="info-text">阿鑫 13005286705</text>
        <text class="action-btn">拨打></text>
      </view>
      <view class="store-info-row">
        <text class="icon">💬</text>
        <text class="info-text">15361685282</text>
        <text class="action-btn">复制></text>
      </view>
      <view class="store-info-row">
        <text class="icon">📍</text>
        <text class="info-text address"
          >广东省深圳市福田区南园街道 福田区上步南路国企大厦永富楼A栋16D</text
        >
        <text class="action-btn">导航></text>
      </view>
    </view>

    <!-- Search Bar -->
    <view class="search-section">
      <view class="search-bar" @click="navigateTo('/pages/price/price')">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">查找您想要看的机型报价</text>
      </view>
      <view class="customer-service-avatar">
        <!-- Avatar placeholder -->
        <text>客服</text>
      </view>
    </view>

    <!-- Price Tabs -->
    <view class="price-tabs">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @click="scrollToSection(0)"
      >
        <text>环保手机报价</text>
        <view class="tab-line" v-if="currentTab === 0"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @click="scrollToSection(1)"
      >
        <text>数码相机报价</text>
        <view class="tab-line" v-if="currentTab === 1"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 2 }"
        @click="scrollToSection(2)"
      >
        <text>新机靓机报价</text>
        <view class="tab-line" v-if="currentTab === 2"></view>
      </view>
    </view>

    <!-- Price List Content -->
    <view class="price-content">
      <view class="sub-tabs">
        <text class="sub-tab active">常用报价</text>
        <view class="divider"></view>
        <text class="sub-tab-info">暂无常用报价</text>
      </view>

      <view class="brand-section" id="recycle-phone-section">
        <view class="section-title">废旧手机回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in brandList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Parts Section -->
      <view class="brand-section">
        <view class="section-title">废旧手机内配回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in partsList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Gadgets Section -->
      <view class="brand-section">
        <view class="section-title">电子产品杂货铺报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in gadgetList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Camera Section -->
      <view class="brand-section" id="camera-section">
        <view class="section-title">数码相机回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in cameraList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Desktop Section -->
      <view class="brand-section">
        <view class="section-title">台式电脑报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in desktopList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Laptop Section -->
      <view class="brand-section">
        <view class="section-title">笔记本电脑/平板回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in laptopList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Tablet Section -->
      <view class="brand-section">
        <view class="section-title">环保品牌平板</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in tabletList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Difficult Section -->
      <view class="brand-section">
        <view class="section-title">疑难机型查看</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in difficultList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Nice Mobile Section -->
      <view class="brand-section">
        <view class="section-title">靓机回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in niceMobileList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Watch Section -->
      <view class="brand-section">
        <view class="section-title">手表报价/靓机平板</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in watchTabletList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- New Phone Section -->
      <view class="brand-section" id="new-phone-section">
        <view class="section-title">新机回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in newPhoneList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Appliance Section -->
      <view class="brand-section">
        <view class="section-title">家用家电回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in applianceList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Scrap Section -->
      <view class="brand-section">
        <view class="section-title">废品圈</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in scrapList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Herb Section -->
      <view class="brand-section">
        <view class="section-title">中药材</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in herbList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Wine Section -->
      <view class="brand-section">
        <view class="section-title">名酒回收报价</view>
        <view class="brand-grid">
          <view
            class="brand-item"
            v-for="(item, index) in wineList"
            :key="index"
          >
            <view class="brand-icon-box" @click="handleBrandClick">
              <image v-if="item.icon" class="brand-logo" :src="item.icon" />
              <view v-else class="brand-logo-placeholder">{{item.name.substring(0, 1)}}</view>
              <view class="update-badge" v-if="item.isNew">今日更新</view>
            </view>
            <text class="brand-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Tutorial Section -->
      <view class="tutorial-section">
        <view class="tutorial-header">
          <text class="section-title no-margin">手机回收教程</text>
          <text class="view-all" @click="navigateTo('/subPackages/info/tutorial/tutorial')"
            >全部视频 ></text
          >
        </view>

        <view class="tutorial-tabs">
          <view class="t-tab-item active"
            >查看报价 <view class="t-tab-line"></view
          ></view>
          <view class="t-tab-item">实用功能</view>
          <view class="t-tab-item">下单相关</view>
          <view class="t-tab-item">收入相关</view>
        </view>

        <scroll-view scroll-x class="video-scroll">
          <view class="video-list">
            <view
              class="video-card"
              v-for="(video, idx) in tutorialVideos"
              :key="idx"
            >
              <view class="video-cover">
                <view class="play-icon">▶</view>
                <view class="video-duration">{{ video.duration }}</view>
              </view>
              <text class="video-title">{{ video.title }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- Process Flow -->
      <view class="process-section" @click="switchToOrder">
        <view class="process-flow">
          <text class="process-step">发货下单</text>
          <text class="process-arrow">→</text>
          <text class="process-step">到货验机</text>
          <text class="process-arrow">→</text>
          <text class="process-step">确认报价</text>
          <text class="process-arrow">→</text>
          <text class="process-step">成交收款</text>
        </view>

        <view class="process-features">
          <view
            class="feature-item"
            v-for="(item, idx) in processSteps"
            :key="idx"
          >
            <view
              class="feature-icon"
              :style="{ backgroundColor: item.color }"
              >{{ item.icon }}</view
            >
            <text class="feature-title">{{ item.title }}</text>
          </view>
        </view>
      </view>

      <!-- Footer Button Area -->
      <view class="footer-area">
        <button class="recycle-btn" @click="switchToOrder">回收下单</button>
        <view class="footer-slogan">
          <text class="slogan-title">数码网·真诚服务好每一位客户</text>
          <text class="slogan-sub"
            >耕耘十余年始终为您提供最新最可靠的回收报价</text
          >
        </view>

        <view class="footer-links">
          <view class="footer-link-item">
            <text class="link-icon">💬</text>
            <text>添加微信</text>
          </view>
          <view class="footer-link-item middle-border">
            <text class="link-icon">📞</text>
            <text>客服电话</text>
          </view>
          <view
            class="footer-link-item"
            @click="navigateTo('/subPackages/info/store/store')"
          >
            <text class="link-icon">🏠</text>
            <text>门店列表</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Floating Actions -->
    <view class="floating-actions">
      <view class="float-btn" v-if="showBackToTop" @click="scrollToTop">
        <text class="float-icon">↑</text>
        <text>顶部</text>
      </view>
      <view class="float-btn">
        <text class="float-icon">📞</text>
        <text>电话</text>
      </view>
      <view class="float-btn">
        <text class="float-icon">🎧</text>
        <text>客服</text>
      </view>
      <view class="float-btn" @click="navigateTo('/subPackages/info/question/question')">
        <text class="float-icon">❓</text>
        <text>问题</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onPageScroll, onShow } from "@dcloudio/uni-app";

onShow(() => {
  uni.showTabBar();
});

const showBackToTop = ref(false);

onPageScroll((e) => {
  showBackToTop.value = e.scrollTop > 300;
});

const scrollToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
};

// 处理图片路径，对中文进行URL编码
const getImageUrl = (path: string) => {
  if (!path) return '';
  // 对路径中的中文部分进行编码
  return path.split('/').map(segment => {
    // 检查是否包含中文字符
    if (/[\u4e00-\u9fa5]/.test(segment)) {
      return encodeURIComponent(segment);
    }
    return segment;
  }).join('/');
};

const openLink = (url: string) => {
  // #ifdef H5
  window.location.href = url;
  // #endif
  // #ifndef H5
  uni.setClipboardData({
    data: url,
    success: () => {
      uni.showToast({
        title: "链接已复制",
        icon: "none",
      });
    },
  });
  // #endif
};

const handleBrandClick = () => {
  uni.navigateTo({
    url: "/pages/brand-detail/brand-detail",
  });
};

const navigateTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};

const currentTab = ref(0); // 0: 环保手机, 1: 数码相机, 2: 新机靓机
const scrollToSection = (index: number) => {
  currentTab.value = index;
  let selector = "";
  if (index === 0) {
    selector = "#recycle-phone-section";
  } else if (index === 1) {
    selector = "#camera-section";
  } else if (index === 2) {
    selector = "#new-phone-section";
  }

  if (selector) {
    uni.pageScrollTo({
      selector: selector,
      duration: 300,
    });
  }
};

const switchToOrder = () => {
  uni.switchTab({
    url: "/pages/order/order",
  });
};

const tutorialTab = ref(0);

const handleMenuClick = (item: { title: string; desc: string }) => {
  if (item.title === "一键下单") {
    uni.switchTab({
      url: "/pages/order/order",
    });
  } else if (item.title === "快速查价") {
    uni.navigateTo({
      url: "/pages/price/price",
    });
  } else if (item.title === "拍照查价") {
    uni.navigateTo({
      url: "/subPackages/tools/camera/camera",
    });
  } else if (item.title === "免费查询") {
    uni.navigateTo({
      url: "/subPackages/tools/inquiry/inquiry",
    });
  } else if (item.title === "邀请好友") {
    uni.navigateTo({
      url: "/subPackages/user/invite/invite",
    });
  }
};

const menuItems = [
  { title: "一键下单", desc: "免估价 更便捷", icon: "/static/img/pl.png" },
  { title: "快速查价", desc: "先估价 再下单", icon: "/static/img/jz.png" },
  { title: "限时特惠", desc: "赠送测机拆解工", icon: "/static/img/hd_icon.png" },
  { title: "拍照查价", desc: "拍照片 查价格", icon: "/static/img/cost.png" },
  { title: "免费查询", desc: "查苹果 查安卓", icon: "/static/img/ID_icon.png" },
  { title: "邀请好友", desc: "邀好友 分佣金", icon: "/static/img/yq_icon.png" },
];

const brandList = [
  { name: "热门老年机", isNew: true, icon: "/static/img/phone-recycle/popular-seniors-phone.png" },
  { name: "智能机/电容屏", isNew: true, icon: "/static/img/phone-recycle/smartphone-touchscreen.png" },
  { name: "手机拆机件", isNew: true, icon: "/static/img/phone-recycle/phone-parts-disassembled.png" },
  { name: "电池", isNew: true, icon: "/static/img/phone-recycle/battery.png" },
  { name: "OPPO", isNew: true, icon: "/static/img/phone-recycle/OPPO.png" },
  { name: "VIVO", isNew: true, icon: "/static/img/phone-recycle/VIVO.png" },
  { name: "小米", isNew: true, icon: "/static/img/phone-recycle/xiaomi.png" },
  { name: "华为OK板", isNew: true, icon: "/static/img/phone-recycle/huawei-ok-board.png" },
  { name: "华为", isNew: true, icon: "/static/img/phone-recycle/huawei.png" },
  { name: "三星", isNew: true, icon: "/static/img/phone-recycle/samsung.png" },
  { name: "苹果", isNew: true, icon: "/static/img/phone-recycle/apple.png" },
  { name: "高仿苹果", isNew: true, icon: "/static/img/phone-recycle/fake-apple.png" },
  { name: "金立", isNew: true, icon: "/static/img/phone-recycle/gionee.png" },
  { name: "联想", isNew: true, icon: "/static/img/phone-recycle/lenovo.png" },
  { name: "酷派/ivvi", isNew: true, icon: "/static/img/phone-recycle/coolpad-ivvi.png" },
  { name: "魅族", isNew: true, icon: "/static/img/phone-recycle/meizu.png" },
  { name: "锤子", isNew: true, icon: "/static/img/phone-recycle/smartisan.png" },
  { name: "360", isNew: true, icon: "/static/img/phone-recycle/360.png" },
  { name: "HTC", isNew: true, icon: "/static/img/phone-recycle/HTC.png" },
  { name: "黑莓", isNew: true, icon: "/static/img/phone-recycle/blackberry.png" },
  { name: "一加", isNew: true, icon: "/static/img/phone-recycle/oneplus.png" },
  { name: "真我/realme", isNew: true, icon: "/static/img/phone-recycle/realme.png" },
  { name: "诺基亚", isNew: true, icon: "/static/img/phone-recycle/nokia.png" },
  { name: "美图", isNew: true, icon: "/static/img/phone-recycle/meitu.png" },
  { name: "乐视", isNew: true, icon: "/static/img/phone-recycle/letv.png" },
  { name: "努比亚", isNew: true, icon: "/static/img/phone-recycle/nubia.png" },
  { name: "中国移动", isNew: true, icon: "/static/img/phone-recycle/china-mobile.png" },
  { name: "TCL", isNew: true, icon: "/static/img/phone-recycle/TCL.png" },
  { name: "中兴", isNew: true, icon: "/static/img/phone-recycle/zte.png" },
  { name: "8848", isNew: true, icon: "/static/img/phone-recycle/8848.png" },
  { name: "糖果/国美", isNew: true, icon: "/static/img/phone-recycle/sugar-gome.png" },
  { name: "步步高", isNew: true, icon: "/static/img/phone-recycle/bbk.png" },
  { name: "海信", isNew: true, icon: "/static/img/phone-recycle/hisense.png" },
  { name: "朵唯", isNew: true, icon: "/static/img/phone-recycle/doov.png" },
  { name: "格力", isNew: true, icon: "/static/img/phone-recycle/gree.png" },
  { name: "摩托罗拉", isNew: true, icon: "/static/img/phone-recycle/motorola.png" },
  { name: "华硕", isNew: true, icon: "/static/img/phone-recycle/asus.png" },
  { name: "柔宇", isNew: true, icon: "/static/img/phone-recycle/royole.png" },
  { name: "谷歌Google", isNew: true, icon: "/static/img/phone-recycle/google.png" },
];

const partsList = [
  { name: "主板芯片", isNew: true, icon: "/static/img/phone-parts/motherboard-chip.png" },
  { name: "苹果主板", isNew: true, icon: "/static/img/phone-parts/apple-motherboard.png" },
  { name: "内存卡", isNew: true, icon: "/static/img/phone-parts/memory-card.png" },
  { name: "苹果高端屏", isNew: true, icon: "/static/img/phone-parts/apple-premium-screen.png" },
  { name: "手机屏", isNew: true, icon: "/static/img/phone-parts/phone-screen.png" },
  { name: "冷光屏黑白屏", isNew: true, icon: "/static/img/phone-parts/lcd-bw-screen.png" },
  { name: "IPAD内爆屏", isNew: true, icon: "/static/img/phone-parts/ipad-broken-screen.png" },
  { name: "国产摄像头", isNew: true, icon: "/static/img/phone-parts/domestic-camera.png" },
  { name: "企业库存机", isNew: true, icon: "/static/img/phone-parts/enterprise-stock.png" },
  { name: "电子废弃物", isNew: true, icon: "/static/img/phone-parts/e-waste.png" },
];

const gadgetList = [
  { name: "苹果耳机", isNew: true, icon: "/static/img/electronics/apple-earphone.png" },
  { name: "POS机", isNew: true, icon: "/static/img/electronics/pos-machine.png" },
  { name: "对讲机", isNew: true, icon: "/static/img/electronics/walkie-talkie.png" },
  { name: "身份证阅读器", isNew: true, icon: "/static/img/electronics/id-card-reader.png" },
  { name: "方盒路由器", isNew: true, icon: "/static/img/electronics/box-router.png" },
  { name: "路由器", isNew: true, icon: "/static/img/electronics/router.png" },
  { name: "光纤猫", isNew: true, icon: "/static/img/electronics/fiber-modem.png" },
  { name: "4k/2k机顶盒", isNew: true, icon: "/static/img/electronics/4k-2k-set-top-box.png" },
  { name: "苹果盒子", isNew: true, icon: "/static/img/electronics/apple-tv-box.png" },
  { name: "小游戏机", isNew: true, icon: "/static/img/electronics/mini-game-console.png" },
  { name: "大游戏机", isNew: true, icon: "/static/img/electronics/game-console.png" },
  { name: "汽车导航", isNew: true, icon: "/static/img/electronics/car-gps.png" },
  { name: "扫描枪", isNew: true, icon: "/static/img/electronics/barcode-scanner.png" },
  { name: "户户通", isNew: true, icon: "/static/img/electronics/satellite-receiver.png" },
  { name: "EVD、唱戏机", isNew: true, icon: "/static/img/electronics/evd-player.png" },
  { name: "ipod系列", isNew: true, icon: "/static/img/electronics/ipod-series.png" },
  { name: "美团点餐机", isNew: true, icon: "/static/img/electronics/meituan-order-machine.png" },
  { name: "随身4Gwifi", isNew: true, icon: "/static/img/electronics/portable-4g-wifi.png" },
  { name: "亚马逊电子书", isNew: true, icon: "/static/img/electronics/kindle-ebook.png" },
  { name: "条码打印机", isNew: true, icon: "/static/img/electronics/barcode-printer.png" },
  { name: "儿童手表", isNew: true, icon: "/static/img/electronics/kids-watch.png" },
  { name: "投影仪", isNew: true, icon: "/static/img/electronics/projector.png" },
  { name: "微信支付设备", isNew: true, icon: "/static/img/electronics/wechat-pay-device.png" },
  { name: "出餐宝", isNew: true, icon: "/static/img/electronics/kitchen-display.png" },
  { name: "收银电子秤", isNew: true, icon: "/static/img/electronics/cashier-scale.png" },
  { name: "小票打印机", isNew: true, icon: "/static/img/electronics/receipt-printer.png" },
  { name: "支付宝支付设备", isNew: true, icon: "/static/img/electronics/alipay-device.png" },
  { name: "米家空气净化器", isNew: true, icon: "/static/img/electronics/mijia-air-purifier.png" },
  { name: "打印机", isNew: true, icon: "/static/img/electronics/printer.png" },
  { name: "卫星电话", isNew: true, icon: "/static/img/electronics/satellite-phone.png" },
  { name: "无线摄像头", isNew: true, icon: "/static/img/electronics/wireless-camera.png" },
  { name: "海康威视摄像头", isNew: true, icon: "/static/img/electronics/hikvision-camera.png" },
  { name: "平衡车", isNew: true, icon: "/static/img/electronics/hoverboard.png" },
  { name: "小度/天猫/小爱", isNew: true, icon: "/static/img/electronics/smart-speaker.png" },
  { name: "小米音响", isNew: true, icon: "/static/img/electronics/xiaomi-speaker.png" },
  { name: "索尼cd", isNew: true, icon: "/static/img/electronics/sony-cd.png" },
];

const cameraList = [
  { name: "索尼相机", isNew: true, icon: "/static/img/camera/sony-camera.png" },
  { name: "佳能相机", isNew: true, icon: "/static/img/camera/canon-camera.png" },
  { name: "尼康相机", isNew: true, icon: "/static/img/camera/nikon-camera.png" },
  { name: "三星相机", isNew: true, icon: "/static/img/camera/samsung-camera.png" },
  { name: "卡西欧相机", isNew: true, icon: "/static/img/camera/casio-camera.png" },
  { name: "富士相机", isNew: true, icon: "/static/img/camera/fuji-camera.png" },
  { name: "奥林巴斯", isNew: true, icon: "/static/img/camera/olympus-camera.png" },
  { name: "柯达相机", isNew: true, icon: "/static/img/camera/kodak-camera.png" },
  { name: "松下相机", isNew: true, icon: "/static/img/camera/panasonic-camera.png" },
  { name: "宾得相机", isNew: true, icon: "/static/img/camera/pentax-camera.png" },
];

const desktopList = [
  { name: "电脑主机/主板", isNew: true, icon: "/static/img/desktop/pc-host-motherboard.png" },
  { name: "电脑显卡", isNew: true, icon: "/static/img/desktop/graphics-card.png" },
  { name: "电脑内存条", isNew: true, icon: "/static/img/desktop/ram-memory.png" },
  { name: "电脑硬盘", isNew: true, icon: "/static/img/desktop/hard-disk.png" },
  { name: "电脑一体机", isNew: true, icon: "/static/img/desktop/all-in-one-pc.png" },
  { name: "电脑CPU", isNew: true, icon: "/static/img/desktop/cpu.png" },
  { name: "点数cpu", isNew: true, icon: "/static/img/desktop/cpu-chip.png" },
  { name: "主机光驱/电源", isNew: true, icon: "/static/img/desktop/optical-drive-power.png" },
  { name: "显示器", isNew: true, icon: "/static/img/desktop/monitor.png" },
];

const laptopList = [
  { name: "低端笔记本", isNew: true, icon: "/static/img/laptop/low-end-laptop.png" },
  { name: "品牌笔记本", isNew: true, icon: "/static/img/laptop/brand-laptop.png" },
  { name: "苹果笔记本", isNew: true, icon: "/static/img/laptop/apple-macbook.png" },
  { name: "杂牌平板", isNew: true, icon: "/static/img/laptop/generic-tablet.png" },
];

const tabletList = [
  { name: "苹果平板", isNew: true, icon: "/static/img/tablet/apple-ipad.png" },
  { name: "三星平板", isNew: true, icon: "/static/img/tablet/samsung-tablet.png" },
  { name: "小米平板", isNew: true, icon: "/static/img/tablet/xiaomi-tablet.png" },
  { name: "华为平板", isNew: true, icon: "/static/img/tablet/huawei-tablet.png" },
  { name: "荣耀平板", isNew: true, icon: "/static/img/tablet/honor-tablet.png" },
  { name: "OPPO/VIVO平板", isNew: true, icon: "/static/img/tablet/oppo-vivo-tablet.png" },
  { name: "品牌学习机", isNew: true, icon: "/static/img/tablet/brand-learning-tablet.png" },
];

const difficultList = [
  { name: "华为", isNew: false, icon: "/static/img/difficult-models/huawei.png" },
  { name: "VIVO", isNew: false, icon: "/static/img/difficult-models/VIVO.png" },
  { name: "OPPO", isNew: false, icon: "/static/img/difficult-models/OPPO.png" },
  { name: "realme", isNew: false, icon: "/static/img/difficult-models/realme.png" },
  { name: "小米", isNew: false, icon: "/static/img/difficult-models/xiaomi.png" },
  { name: "苹果", isNew: false, icon: "/static/img/difficult-models/apple.png" },
  { name: "三星", isNew: false, icon: "/static/img/difficult-models/samsung.png" },
  { name: "一加", isNew: false, icon: "/static/img/difficult-models/oneplus.png" },
  { name: "诺基亚", isNew: false, icon: "/static/img/difficult-models/nokia.png" },
  { name: "金立", isNew: false, icon: "/static/img/difficult-models/gionee.png" },
  { name: "美图", isNew: false, icon: "/static/img/difficult-models/meitu.png" },
  { name: "魅族", isNew: false, icon: "/static/img/difficult-models/meizu.png" },
  { name: "努比亚", isNew: false, icon: "/static/img/difficult-models/nubia.png" },
  { name: "360", isNew: true, icon: "/static/img/difficult-models/360.png" },
  { name: "锤子", isNew: false, icon: "/static/img/difficult-models/smartisan.png" },
  { name: "中兴", isNew: false, icon: "/static/img/difficult-models/zte.png" },
  { name: "酷派", isNew: false, icon: "/static/img/difficult-models/coolpad.png" },
  { name: "联想", isNew: false, icon: "/static/img/difficult-models/lenovo.png" },
  { name: "HTC", isNew: false, icon: "/static/img/difficult-models/HTC.png" },
  { name: "黑莓", isNew: false, icon: "/static/img/difficult-models/blackberry.png" },
  { name: "糖果/国美", isNew: false, icon: "/static/img/difficult-models/sugar-gome.png" },
  { name: "海信", isNew: false, icon: "/static/img/difficult-models/hisense.png" },
  { name: "朵唯", isNew: true, icon: "/static/img/difficult-models/doov.png" },
  { name: "8848", isNew: false, icon: "/static/img/difficult-models/8848.png" },
];

const niceMobileList = [
  { name: "苹果有保", isNew: true, icon: "/static/img/premium-phone/apple-with-warranty.png" },
  { name: "苹果无保", isNew: true, icon: "/static/img/premium-phone/apple-no-warranty.png" },
  { name: "华为旗舰", isNew: true, icon: "/static/img/premium-phone/huawei-flagship.png" },
  { name: "华为", isNew: true, icon: "/static/img/premium-phone/huawei.png" },
  { name: "真我/realme", isNew: true, icon: "/static/img/premium-phone/realme.png" },
  { name: "OPPO", isNew: true, icon: "/static/img/premium-phone/OPPO.png" },
  { name: "iQOO", isNew: true, icon: "/static/img/premium-phone/iQOO.png" },
  { name: "VIVO", isNew: true, icon: "/static/img/premium-phone/VIVO.png" },
  { name: "小米", isNew: true, icon: "/static/img/premium-phone/xiaomi.png" },
  { name: "红米、黑鲨", isNew: true, icon: "/static/img/premium-phone/redmi-blackshark.png" },
  { name: "荣耀其他", isNew: true, icon: "/static/img/premium-phone/honor-other.png" },
  { name: "荣耀", isNew: true, icon: "/static/img/premium-phone/honor.png" },
  { name: "魅族", isNew: true, icon: "/static/img/premium-phone/meizu.png" },
  { name: "三星", isNew: true, icon: "/static/img/premium-phone/samsung.png" },
  { name: "联想", isNew: true, icon: "/static/img/premium-phone/lenovo.png" },
  { name: "努比亚", isNew: true, icon: "/static/img/premium-phone/nubia.png" },
  { name: "8848", isNew: true, icon: "/static/img/premium-phone/8848.png" },
  { name: "一加", isNew: true, icon: "/static/img/premium-phone/oneplus.png" },
  { name: "锤子坚果", isNew: true, icon: "/static/img/premium-phone/smartisan-jianguo.png" },
  { name: "华硕", isNew: true, icon: "/static/img/premium-phone/asus.png" },
  { name: "蓝牙耳机", isNew: true, icon: "/static/img/premium-phone/bluetooth-earphone.png" },
];

const watchTabletList = [
  { name: "苹果手表", isNew: true, icon: "/static/img/watch-tablet/apple-watch.png" },
  { name: "华为手表", isNew: true, icon: "/static/img/watch-tablet/huawei-watch.png" },
  { name: "OPPO/VIVO手表", isNew: true, icon: "/static/img/watch-tablet/oppo-vivo-watch.png" },
  { name: "小米手表", isNew: true, icon: "/static/img/watch-tablet/xiaomi-watch.png" },
  { name: "苹果平板", isNew: true, icon: "/static/img/watch-tablet/apple-ipad.png" },
  { name: "华为平板", isNew: true, icon: "/static/img/watch-tablet/huawei-tablet.png" },
  { name: "荣耀平板", isNew: true, icon: "/static/img/watch-tablet/honor-tablet.png" },
  { name: "小米/红米 平板", isNew: true, icon: "/static/img/watch-tablet/xiaomi-redmi-tablet.png" },
  { name: "三星平板", isNew: true, icon: "/static/img/watch-tablet/samsung-tablet.png" },
  { name: "OPPO/vivo平板", isNew: true, icon: "/static/img/watch-tablet/oppo-vivo-tablet.png" },
  { name: "联想平板", isNew: true, icon: "/static/img/watch-tablet/lenovo-tablet.png" },
];

const newPhoneList = [
  { name: "苹果", isNew: true, icon: "/static/img/new-phone/apple.png" },
  { name: "华为", isNew: true, icon: "/static/img/new-phone/huawei.png" },
  { name: "荣耀", isNew: true, icon: "/static/img/new-phone/honor.png" },
  { name: "oppo", isNew: true, icon: "/static/img/new-phone/oppo.png" },
  { name: "真我/realme", isNew: true, icon: "/static/img/new-phone/realme.png" },
  { name: "vivo", isNew: true, icon: "/static/img/new-phone/vivo.png" },
  { name: "IQOO", isNew: true, icon: "/static/img/new-phone/IQOO.png" },
  { name: "小米", isNew: true, icon: "/static/img/new-phone/xiaomi.png" },
  { name: "红米/黑鲨", isNew: true, icon: "/static/img/new-phone/redmi-blackshark.png" },
  { name: "一加", isNew: true, icon: "/static/img/new-phone/oneplus.png" },
];

const applianceList = [
  { name: "品牌扫地机器人", isNew: true, icon: "/static/img/appliance/brand-vacuum-robot.png" },
  { name: "戴森吹风机", isNew: true, icon: "/static/img/appliance/dyson-hair-dryer.png" },
  { name: "电视机", isNew: true, icon: "/static/img/appliance/television.png" },
  { name: "洗衣机", isNew: true, icon: "/static/img/appliance/washing-machine.png" },
  { name: "冰箱", isNew: true, icon: "/static/img/appliance/refrigerator.png" },
  { name: "空调", isNew: true, icon: "/static/img/appliance/air-conditioner.png" },
];

const scrapList = [
  { name: "贵金属", isNew: true, icon: "/static/img/scrap/precious-metal.png" },
  { name: "钴锂", isNew: true, icon: "/static/img/scrap/cobalt-lithium.png" },
];

const herbList = [
  { name: "蝉蜕", isNew: true, icon: "/static/img/herb/cicada-slough.png" },
  { name: "鳖甲、甲鱼壳", isNew: true, icon: "/static/img/herb/turtle-shell.png" },
  { name: "蜂房（马蜂窝）", isNew: true, icon: "/static/img/herb/wasp-nest.png" },
];

const wineList = [
  { name: "常见茅台", isNew: true, icon: "/static/img/wine/common-moutai.png" },
  { name: "历年茅台", isNew: true, icon: "/static/img/wine/yearly-moutai.png" },
  { name: "生肖茅台", isNew: true, icon: "/static/img/wine/zodiac-moutai.png" },
  { name: "国产名酒", isNew: true, icon: "/static/img/wine/domestic-wine.png" },
  { name: "品牌洋酒", isNew: true, icon: "/static/img/wine/brand-foreign-wine.png" },
  { name: "洋酒威士忌", isNew: true, icon: "/static/img/wine/foreign-whisky.png" },
];

const tutorialVideos = [
  { title: "华为手机查询报价", image: "", duration: "0:30" },
  { title: "报价单查看教程", image: "", duration: "1:15" },
  { title: "报价单统货功能机", image: "", duration: "0:45" },
];

const processSteps = [
  { title: "报价精准", icon: "¥", color: "#ffaa00" },
  { title: "专业质检", icon: "质", color: "#ffaa00" },
  { title: "快速提现", icon: "⚡", color: "#ffaa00" },
  { title: "高价回收", icon: "❤", color: "#ffaa00" },
];
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 20px;
}

/* Banner */
.banner-area {
  background: linear-gradient(to bottom, #ff2d2d 0%, #ffffff 100%);
  padding: 30px 15px 60px; /* Extra padding for menu overlap */
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.banner-swiper {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
}

.banner-swiper swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-image {
  width: 100%;
  height: 100%;
  display: block;
}

.banner-placeholder {
  background: linear-gradient(
    135deg,
    #001f5b,
    #003399
  ); /* Deep blue gradient */
  height: 120px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  position: relative;
  color: white;
}
.banner-text {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}
.banner-sub {
  font-size: 12px;
  opacity: 0.8;
}

/* Tutorial Section */
.tutorial-section {
  margin-top: 30px;
  margin-bottom: 20px;
}
.tutorial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.no-margin {
  margin-bottom: 0;
}
.view-all {
  font-size: 12px;
  color: #999;
}
.tutorial-tabs {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.t-tab-item {
  margin-right: 20px;
  font-size: 14px;
  color: #666;
  padding-bottom: 8px;
  position: relative;
}
.t-tab-item.active {
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid #ff2d2d;
}
.video-scroll {
  width: 100%;
  white-space: nowrap;
}
.video-list {
  display: flex;
}
.video-card {
  display: inline-block;
  width: 140px;
  margin-right: 10px;
}
.video-cover {
  width: 100%;
  height: 200px;
  background-color: #333; /* Placeholder */
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  background-image: linear-gradient(to bottom, #444, #222);
}
.play-icon {
  color: white;
  font-size: 24px;
  opacity: 0.8;
}
.video-duration {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1px 4px;
  border-radius: 2px;
}
.video-title {
  font-size: 12px;
  color: #333;
  white-space: normal;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Process Section */
.process-section {
  background-color: #fff5f5;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
.process-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ff2d2d;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ffcccc;
}
.process-step {
  padding: 0 4px;
}
.process-features {
  display: flex;
  justify-content: space-between;
}
.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.feature-icon {
  width: 30px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 4px;
  margin-bottom: 5px;
  font-size: 12px;
  position: relative;
}
/* Speech bubble tail effect simplified */
.feature-icon::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px 4px 0;
  border-style: solid;
  border-color: inherit;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  width: 0;
  height: 0;
  /* Not perfect but simulates the speech bubble slightly */
}
.feature-title {
  font-size: 12px;
  color: #333;
}

/* Footer Area */
.footer-area {
  text-align: center;
  padding: 20px 0 40px;
}
.recycle-btn {
  background-color: #ff2d2d;
  color: white;
  border-radius: 25px;
  font-size: 16px;
  padding: 5px 0;
  width: 80%;
  margin: 0 auto 15px;
}
.footer-slogan {
  margin-bottom: 20px;
}
.slogan-title {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}
.slogan-sub {
  display: block;
  font-size: 10px;
  color: #999;
}
.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-link-item {
  font-size: 12px;
  color: #666;
  padding: 0 15px;
  display: flex;
  align-items: center;
}
.middle-border {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.link-icon {
  margin-right: 5px;
}
.qr-placeholder {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background-color: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 5px;
}

/* Grid Menu */
.grid-menu {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  margin-top: -30px; /* Pull up over banner */
  justify-content: space-between;
  position: relative;
  z-index: 10;
}
.grid-item {
  width: 32%;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.item-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
}
.item-desc {
  font-size: 10px;
  color: #999;
  margin-bottom: 8px;
  display: block;
}
.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.go-btn {
  background-color: #ff2d2d;
  color: white;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
}
.item-img-box {
  width: 30px;
  height: 30px;
  background-color: #fcebeb; /* Light red placeholder */
  border-radius: 4px;
}
.item-img {
  width: 30px;
  height: 30px;
  display: block;
}

/* Notice Bar */
.notice-bar {
  background-color: white;
  margin: 0 10px 10px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.notice-left {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.notice-label {
  color: #ff2d2d;
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
}
.notice-swiper {
  flex: 1;
  height: 20px;
}
.notice-text {
  font-size: 12px;
  color: #333;
  margin-right: 10px;
}
.notice-time {
  font-size: 12px;
  color: #999;
  float: right;
}

/* Store Card */
.store-card {
  background-color: white;
  margin: 0 10px 10px;
  padding: 15px;
  border-radius: 8px;
}
.store-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.shop-tag {
  background-color: #ff2d2d;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
  margin-right: 5px;
}
.shop-name {
  font-weight: bold;
  font-size: 14px;
  flex: 1;
}
.shop-dist {
  font-size: 12px;
  color: #999;
}
.store-info-row {
  display: flex;
  margin-bottom: 8px;
  font-size: 13px;
  color: #333;
  align-items: flex-start;
}
.icon {
  margin-right: 8px;
  color: #999;
}
.info-text {
  flex: 1;
}
.address {
  line-height: 1.4;
}
.action-btn {
  color: #ff2d2d;
  font-size: 12px;
  margin-left: 10px;
}

/* Search Bar */
.search-section {
  display: flex;
  align-items: center;
  margin: 0 10px 10px;
}
.search-bar {
  flex: 1;
  background-color: white;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border: 1px solid #ffcccc;
}
.search-icon {
  margin-right: 8px;
  color: #999;
}
.search-placeholder {
  color: #999;
  font-size: 14px;
}
.customer-service-avatar {
  margin-left: 10px;
  font-size: 10px;
  text-align: center;
}

/* Price Tabs */
.price-tabs {
  display: flex;
  background-color: white;
  padding: 10px 0;
  margin: 0 10px 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.tab-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #666;
  padding-bottom: 5px;
  position: relative;
}
.tab-item.active {
  background-color: #ff2d2d;
  color: white;
  padding: 5px 0;
  border-radius: 20px;
  margin: 0 5px;
}

/* Price Content */
.price-content {
  background-color: white;
  margin: 0 10px;
  padding: 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  min-height: 100px;
}
.sub-tabs {
  display: flex;
  align-items: center;
}
.sub-tab {
  font-weight: bold;
  color: #333;
  border-left: 3px solid #ff2d2d;
  padding-left: 8px;
}
.sub-tab-info {
  margin-left: 20px;
  color: #ff2d2d;
  font-size: 14px;
}

/* Floating Actions */
.floating-actions {
  position: fixed;
  right: 10px;
  bottom: 100px; /* Above tabbar */
  display: flex;
  flex-direction: column;
}
.float-btn {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
}
.float-icon {
  font-size: 16px;
  margin-bottom: 2px;
}

/* Brand Section */
.brand-section {
  margin-top: 20px;
}
.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}
.brand-grid {
  display: flex;
  flex-wrap: wrap;
}
.brand-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.brand-icon-box {
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
}
.brand-logo-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  border-radius: 50%; /* Circle */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-weight: bold;
  font-size: 20px;
  border: 1px solid #eee;
}
.brand-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.update-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffff00; /* Yellow */
  color: #ff0000; /* Red text */
  font-size: 10px; /* Slightly larger for readability */
  padding: 1px 4px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: bold;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  /* Scale down to look like 8px but clearer */
  transform: translateX(-50%) scale(0.8);
  transform-origin: center bottom;
}
.brand-name {
  font-size: 12px;
  color: #333;
  text-align: center;
  margin-top: 5px;
}
</style>
