<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header-section">
      <!-- Custom Navbar Status Bar Placeholder if needed -->
      <!-- <view class="status-bar"></view> -->

      <view class="nav-bar">
        <text class="page-title">个人中心</text>
        <view class="nav-icons">
          <!-- Replacements for icons: using text or basic shapes for now -->
          <text class="iconfont icon-edit nav-icon">✎</text>
          <text class="iconfont icon-settings nav-icon">⚙</text>
        </view>
      </view>

      <view class="user-card">
        <view class="avatar-container">
          <image
            class="avatar"
            src="/static/logo.png"
            mode="aspectFill"
          ></image>
          <view class="update-avatar-btn">更换头像</view>
        </view>
        <view class="user-info">
          <text class="user-id">用户编号：2142056</text>
          <text class="user-phone">132****9366</text>
          <text class="user-score">积分: 0</text>
        </view>
      </view>

      <!-- VIP Banner -->
      <view class="vip-banner">
        <view class="vip-content">
          <view class="vip-text">
            <text class="vip-title">报价VIP</text>
            <text class="vip-sub">开通VIP会员，享受更多专属特权!</text>
          </view>
          <button class="vip-btn" @click="goToVip">立即开通 ></button>
        </view>
        <image class="vip-crown" src="" mode="widthFix"></image>
        <!-- Crown placeholder -->
      </view>
    </view>

    <!-- Content Section -->
    <view class="content-section">
      <!-- Quick Stats -->
      <view class="card quick-stats">
        <view
          class="stat-item"
          v-for="(item, index) in quickStats"
          :key="index"
          @click="onQuickStatClick(item)"
        >
          <image class="stat-icon-img" :src="item.image" mode="widthFix" v-if="item.image"></image>
          <view class="stat-icon-box" :style="{ backgroundColor: item.color }" v-else>
            <text class="iconfont" :class="item.icon"></text>
          </view>
          <text class="stat-name">{{ item.name }}</text>
        </view>
      </view>

      <!-- My Orders -->
      <view class="card order-card">
        <view class="card-header">
          <text class="card-title">我的订单</text>
          <view class="card-more">
            <text>查看全部订单 ></text>
          </view>
        </view>
        <view class="grid-layout">
          <view
            class="grid-item"
            v-for="(item, index) in myOrders"
            :key="index"
            @click="goToOrderList(item.name)"
          >
            <view class="icon-wrapper">
              <image class="grid-icon-img" :src="item.image" mode="widthFix" v-if="item.image"></image>
              <text class="iconfont" :class="item.icon" v-else>📦</text>
              <view v-if="item.badge" class="badge">{{ item.badge }}</view>
            </view>
            <text class="grid-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Points Orders -->
      <view class="card order-card">
        <view class="card-header">
          <text class="card-title">积分订单</text>
          <view class="card-more">
            <text>查看全部订单 ></text>
          </view>
        </view>
        <view class="grid-layout">
          <view
            class="grid-item"
            v-for="(item, index) in pointsOrders"
            :key="index"
            @click="goToPointsOrder(item.name)"
          >
            <view class="icon-wrapper">
              <image class="grid-icon-img" :src="item.image" mode="widthFix" v-if="item.image"></image>
              <text class="iconfont" :class="item.icon" v-else>📋</text>
            </view>
            <text class="grid-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Points Activity -->
      <view class="card grid-card">
        <view class="card-header">
          <text class="card-title">积分活动</text>
        </view>
        <view class="grid-layout">
          <view
            class="grid-item"
            v-for="(item, index) in pointsActivities"
            :key="index"
            @click="onPointsActivityClick(item)"
          >
            <view class="icon-wrapper smaller">
              <image class="grid-icon-img" :src="item.image" mode="widthFix" v-if="item.image"></image>
              <text class="iconfont" :class="item.icon" v-else>🎁</text>
            </view>
            <text class="grid-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Common Functions -->
      <view class="card grid-card">
        <view class="card-header">
          <text class="card-title">常用功能</text>
        </view>
        <view class="grid-layout cols-4">
          <view
            class="grid-item"
            v-for="(item, index) in commonFunctions"
            :key="index"
            @click="onFunctionClick(item)"
          >
            <view class="icon-wrapper smaller">
              <image class="grid-icon-img" :src="item.image" mode="widthFix" v-if="item.image"></image>
              <text class="iconfont" :class="item.icon" v-else>🔧</text>
            </view>
            <text class="grid-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Member Functions -->
      <view class="card grid-card last-card">
        <view class="card-header">
          <text class="card-title">会员功能</text>
        </view>
        <view class="grid-layout cols-4">
          <view
            class="grid-item"
            v-for="(item, index) in memberFunctions"
            :key="index"
          >
            <view class="icon-wrapper smaller">
              <image class="grid-icon-img" :src="item.image" mode="widthFix" v-if="item.image"></image>
              <text class="iconfont" :class="item.icon" v-else>⭐</text>
            </view>
            <text class="grid-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- Footer Action -->
      <view class="footer-actions">
        <view class="action-item">
          <text class="iconfont icon-weixin">💬</text>
          <text>添加微信</text>
        </view>
        <view class="divider"></view>
        <view class="action-item">
          <text class="iconfont icon-phone">📞</text>
          <text>客服电话</text>
        </view>
        <view class="divider"></view>
        <view class="action-item">
          <text class="iconfont icon-store">🏪</text>
          <text>门店列表</text>
        </view>
      </view>

      <view class="safe-area-bottom"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Mock Data
const quickStats = ref([
  { name: "我的钱包", image: "/static/mine/wallet.svg", icon: "icon-wallet", color: "#fff" },
  { name: "我的卡券", image: "/static/mine/coupon.svg", icon: "icon-ticket", color: "#fff" },
  { name: "我的红包", image: "/static/mine/redpacket.svg", icon: "icon-redpacket", color: "#fff" },
  { name: "公告中心", image: "/static/mine/notice.svg", icon: "icon-notice", color: "#fff" },
]);

const myOrders = ref([
  { name: "已下单", image: "/static/mine/order-1.svg", icon: "icon-ordered", badge: 1 },
  { name: "已发货", image: "/static/mine/order-2.svg", icon: "icon-shipped", badge: 0 },
  { name: "质检中", image: "/static/mine/order-3.svg", icon: "icon-inspecting", badge: 0 },
  { name: "待确认", image: "/static/mine/order-4.svg", icon: "icon-pending", badge: 0 },
]);

const goToOrderList = (statusName: string) => {
  uni.navigateTo({
    url: `/subPackages/order/order-list/order-list?status=${statusName}`,
  });
};

const pointsOrders = ref([
  { name: "待收货", image: "/static/mine/p-order-1.svg", icon: "icon-wait-receive" },
  { name: "已收货", image: "/static/mine/p-order-2.svg", icon: "icon-received" },
  { name: "已完成", image: "/static/mine/p-order-3.svg", icon: "icon-completed" },
  { name: "售后", image: "/static/mine/p-order-4.svg", icon: "icon-after-sale" },
]);

const pointsActivities = ref([
  { name: "我的积分", image: "/static/mine/act-points.svg", icon: "icon-point" },
  { name: "积分抽奖", image: "/static/mine/act-lottery.svg", icon: "icon-lottery" },
  { name: "积分商城", image: "/static/mine/act-mall.svg", icon: "icon-mall" },
  { name: "邀请好友", image: "/static/mine/act-invite.svg", icon: "icon-invite" },
]);

const commonFunctions = ref([
  { name: "回收流程", image: "/static/mine/func-process.svg", icon: "icon-process" },
  { name: "我要采购", image: "/static/mine/func-purchase.svg", icon: "icon-purchase" },
  { name: "邮寄地址", image: "/static/mine/func-address.svg", icon: "icon-address" },
  { name: "问题反馈", image: "/static/mine/func-feedback.svg", icon: "icon-feedback" },
  { name: "常见问题", image: "/static/mine/func-faq.svg", icon: "icon-faq" },
  { name: "反馈结果", image: "/static/mine/func-result.svg", icon: "icon-result" },
  { name: "商务合作", image: "/static/mine/func-cooperation.svg", icon: "icon-cooperation" },
  { name: "投诉建议", image: "/static/mine/func-complaint.svg", icon: "icon-complaint" },
  { name: "广告录音", image: "/static/mine/func-audio.svg", icon: "icon-audio" },
  { name: "行情走势", image: "/static/mine/func-trend.svg", icon: "icon-trend" },
  { name: "回收教学视频", image: "/static/mine/func-video.svg", icon: "icon-video" },
]);

const memberFunctions = ref([
  { name: "收藏报价单", image: "/static/mine/member-collect.svg", icon: "icon-star" },
  { name: "报价变动", image: "/static/mine/member-price.svg", icon: "icon-monitor" },
  { name: "拍照查价", image: "/static/mine/member-camera.svg", icon: "icon-camera" },
  { name: "报价短信通知", image: "/static/mine/member-sms.svg", icon: "icon-sms" },
]);

const onQuickStatClick = (item: any) => {
  if (item.name === "我的钱包") {
    uni.navigateTo({
      url: "/subPackages/user/wallet/wallet",
    });
  } else if (item.name === "我的卡券") {
    uni.navigateTo({
      url: "/subPackages/user/coupon/coupon",
    });
  } else if (item.name === "我的红包") {
    uni.navigateTo({
      url: "/subPackages/user/red-packet/red-packet",
    });
  } else if (item.name === "公告中心") {
    uni.navigateTo({
      url: "/subPackages/info/notice/notice",
    });
  } else {
    uni.showToast({
      title: `${item.name} 功能开发中`,
      icon: "none",
    });
  }
};

const onFunctionClick = (item: any) => {
  if (item.name === "我要采购") {
    uni.navigateTo({
      url: "/subPackages/tools/procurement/procurement",
    });
  } else if (item.name === "问题反馈") {
    uni.navigateTo({
      url: "/subPackages/info/feedback/feedback",
    });
  } else if (item.name === "邮寄地址") {
    uni.navigateTo({
      url: "/subPackages/order/address/address",
    });
  } else if (item.name === "反馈结果") {
    uni.navigateTo({
      url: "/subPackages/info/feedback-result/feedback-result",
    });
  } else if (item.name === "投诉建议") {
    uni.navigateTo({
      url: "/subPackages/info/feedback/feedback",
    });
  } else if (item.name === "回收教学视频") {
    uni.navigateTo({
      url: "/subPackages/info/tutorial/tutorial",
    });
  } else {
    uni.showToast({
      title: `${item.name} 功能待开发`,
      icon: "none",
    });
  }
};

const goToPointsOrder = (statusName: string) => {
  uni.navigateTo({
    url: "/subPackages/order/points-order/points-order",
  });
};

const goToVip = () => {
  uni.navigateTo({
    url: "/subPackages/user/member-center/member-center",
  });
};

const onPointsActivityClick = (item: any) => {
  if (item.name === "我的积分") {
    uni.navigateTo({
      url: "/subPackages/user/points-center/points-center",
    });
  } else if (item.name === "积分商城") {
    uni.navigateTo({
      url: "/subPackages/user/points-mall/points-mall",
    });
  } else {
    uni.showToast({
      title: `${item.name} 功能待开发`,
      icon: "none",
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f5f5f7;
  min-height: 100vh;
  padding-bottom: 20px;
}

.header-section {
  background: linear-gradient(135deg, #ff4c4c 0%, #ff2a2a 100%);
  padding: 40px 20px 0 20px; /* Adjust for status bar */
  color: #fff;
  position: relative;

  .nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 44px;
    margin-bottom: 20px;

    .page-title {
      font-size: 18px;
      font-weight: 500;
    }

    .nav-icons {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;

      .nav-icon {
        font-size: 20px;
        margin-left: 15px;
      }
    }
  }

  .user-card {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .avatar-container {
      position: relative;
      margin-right: 15px;

      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #eee;
        border: 2px solid rgba(255, 255, 255, 0.8);
      }

      .update-avatar-btn {
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        color: #ff2a2a;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 10px;
        white-space: nowrap;
      }
    }

    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;

      .user-id {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
      }
      .user-phone {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 4px;
      }
      .user-score {
        font-size: 14px;
        color: #ffeeb0;
      }
    }
  }

  .vip-banner {
    background: linear-gradient(90deg, #333333 0%, #1a1a1a 100%);
    border-radius: 12px 12px 0 0;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;

    .vip-content {
      z-index: 2;
      flex: 1;
    }

    .vip-title {
      color: #f0c27b;
      font-size: 18px;
      font-weight: bold;
      font-style: italic;
      margin-right: 10px;
    }

    .vip-sub {
      color: #999;
      font-size: 12px;
      display: block;
      margin-top: 5px;
    }

    .vip-btn {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(90deg, #f0c27b 0%, #d4a053 100%);
      color: #333;
      font-size: 12px;
      padding: 5px 12px;
      border-radius: 20px;
      border: none;
      line-height: normal;
      margin: 0;
    }

    .vip-crown {
      /* Placeholder styling for crown background if needed */
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0.1;
    }
  }
}

.content-section {
  padding: 0 15px;
  position: relative;
  top: -10px; /* Overlap header slighty if needed, or simply follow flow */
  z-index: 10;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.quick-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 10px;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .stat-icon-img {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 8rpx;
    }

    .stat-icon-box {
      /* Placeholder icons */
      font-size: 24px;
      margin-bottom: 8px;
    }

    .stat-name {
      font-size: 12px;
      color: #333;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #f9f9f9;
  padding-bottom: 10px;

  .card-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    position: relative;
    padding-left: 0;
  }

  .card-more {
    font-size: 12px;
    color: #999;
  }
}

.grid-layout {
  display: flex;
  flex-wrap: wrap;

  &.cols-4 {
    /* Force 4 columns if needed, though flex usually handles it */
  }

  .grid-item {
    width: 25%; /* 4 items per row */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    position: relative; /* for badge */

    .icon-wrapper {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      margin-bottom: 5px;
      position: relative;
      display: flex;
      justify-content: center;

      &.smaller {
        font-size: 28px;
        width: 50px;
        height: 50px;
      }

      .grid-icon-img {
        width: 90rpx;
        height: 90rpx;
        margin-bottom: 2rpx;
      }

      .badge {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        background-color: #ff4d4f;
        color: white;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 10px;
        min-width: 14px;
        text-align: center;
        z-index: 10;
      }
    }

    .grid-name {
      font-size: 14px;
      color: #666;
      white-space: nowrap;
    }
  }
}

.footer-actions {
  background-color: #fff;
  margin: 0 15px 30px 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 15px 0;

  .action-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #666;

    .iconfont {
      margin-right: 5px;
      font-size: 16px;
    }
  }

  .divider {
    width: 1px;
    height: 20px;
    background-color: #eee;
  }
}
.safe-area-bottom {
  height: 20px;
}
</style>
