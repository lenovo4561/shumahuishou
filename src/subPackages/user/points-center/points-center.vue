<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header-section">
      <!-- Navigation Bar Area - Adjust padding-top for status bar if needed -->
      <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
        <view class="back-btn" @click="goBack">
          <text
            class="uni-icon uni-icon-back"
            style="font-size: 24px; color: white"
            >&lt;</text
          >
        </view>
        <text class="nav-title">会员中心</text>
        <view class="nav-actions">
          <!-- Mock menu icons -->
          <text
            class="menu-dots"
            style="color: white; font-weight: bold; letter-spacing: 2px"
            >···</text
          >
        </view>
      </view>

      <!-- Points Info -->
      <view class="points-info">
        <view class="points-main">
          <text class="label">当前</text>
          <text class="value">0</text>
          <text class="label">积分</text>
        </view>
        <view class="rules-btn">等级规则</view>
      </view>

      <!-- Level Progress Text -->
      <view class="level-progress-text">
        <template v-for="(level, index) in memberLevels" :key="index">
          <text :class="{ active: currentSwiperIndex === index }">
            <text v-if="currentSwiperIndex === index">⦿ </text>{{ level.name.substring(0, 2) }}
          </text>
          <text class="dashed" v-if="index < memberLevels.length - 1">-----</text>
        </template>
      </view>

      <!-- Member Card Swiper -->
      <swiper
        class="member-swiper"
        :current="currentSwiperIndex"
        previous-margin="40rpx"
        next-margin="40rpx"
        @change="onSwiperChange"
        :circular="false"
        style="height: 180px;"
      >
        <swiper-item v-for="(level, index) in memberLevels" :key="index">
          <view class="member-card" :style="{ background: level.bgGradient, margin: '0 10rpx' }">
            <view class="card-content">
              <view class="card-header">
                <text class="card-title">{{ level.name }}</text>
                <text class="card-points">{{ level.minPoints }}积分</text>
                <view class="badge">待升级</view>
              </view>
              <view class="card-body">
                <!-- Progress Bar mockup -->
                <view class="progress-bar-bg">
                  <view class="progress-bar-fill" style="width: 0%"></view>
                </view>
                <text class="upgrade-tip" v-if="level.upgradePoints">距离升级还需{{ level.upgradePoints }}积分 去升级&gt;</text>
                <text class="upgrade-tip" v-else>已是最高等级</text>
              </view>
            </view>
            <!-- Placeholder for Member Medal Icon -->
            <view class="card-icon-placeholder"></view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- Content Body -->
    <view class="content-body">
      <!-- Lottery Entry -->
      <view class="lottery-entry">
        <view class="lottery-left">
          <view class="icon-circle">🎁</view>
          <text>积分抽奖</text>
        </view>
      </view>

      <!-- Tabs -->
      <view class="tabs">
        <view 
          class="tab-item" 
          :class="{ active: currentTab === 0 }"
          @click="switchTab(0)"
        >
          <text>成长值获取</text>
          <view class="indicator" v-if="currentTab === 0"></view>
        </view>
        <view 
          class="tab-item" 
          :class="{ active: currentTab === 1 }"
          @click="switchTab(1)"
        >
          <text>会员权益</text>
          <view class="indicator" v-if="currentTab === 1"></view>
        </view>
        <view 
          class="tab-item" 
          :class="{ active: currentTab === 2 }"
          @click="switchTab(2)"
        >
          <text>积分明细</text>
          <view class="indicator" v-if="currentTab === 2"></view>
        </view>
      </view>

      <!-- Task List (Tab 0) -->
      <view class="task-list" v-if="currentTab === 0">
        <view class="task-item" v-for="(item, index) in tasks" :key="index">
          <view
            class="task-icon-wrapper"
            :style="{ backgroundColor: item.bgColor || '#ffeaea' }"
          >
            <!-- Simple text emoticon fallback if iconfont not available -->
            <text class="task-icon-text">{{ item.iconChar }}</text>
          </view>
          <view class="task-info">
            <text class="task-name">{{ item.name }}</text>
            <text class="task-desc">{{ item.desc }}</text>
          </view>
          <button class="action-btn" @click="handleTask(item)">
            {{ item.btnText }}
          </button>
        </view>
      </view>

      <!-- Member Benefits List (Tab 1) -->
      <view class="benefits-list" v-if="currentTab === 1">
        <view class="benefit-item" v-for="(level, index) in memberLevels" :key="index">
          <view class="benefit-icon-wrapper" :style="{ background: level.bgGradient }">
             <text class="benefit-icon">★</text>
          </view>
          <view class="benefit-info">
            <view class="benefit-title-row">
              <text class="benefit-name">{{ level.name }}</text>
            </view>
            <text class="benefit-range">({{ level.minPoints }}-{{ level.upgradePoints || '2000000+' }}积分)</text>
          </view>
          <text class="benefit-status">未达成</text>
        </view>
      </view>

      <!-- Points Detail (Tab 2) - Placeholder -->
      <view class="points-detail-list" v-if="currentTab === 2">
        <view style="padding: 20px; text-align: center; color: #999;">
          暂无积分明细
        </view>
      </view>
    </view>

    <!-- Footer Button -->
    <view class="footer-bar">
      <button class="full-width-btn">积分充值</button>
    </view>

    <!-- Safe Area -->
    <view class="safe-area-bottom"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const statusBarHeight = ref(20); // Default fallback
// In a real app, use uni.getSystemInfoSync().statusBarHeight

const currentSwiperIndex = ref(0);
const currentTab = ref(0);

const switchTab = (index: number) => {
  currentTab.value = index;
};

const memberLevels = ref([
  {
    name: "青铜会员",
    minPoints: 0,
    upgradePoints: 3000,
    bgGradient: "linear-gradient(135deg, #8A6E56, #C7A68B)"
  },
  {
    name: "白银会员",
    minPoints: 3001,
    upgradePoints: 20000,
    bgGradient: "linear-gradient(135deg, #8E9EAB, #E0EAFC)" // Muted Silver
  },
  {
    name: "黄金会员",
    minPoints: 20001,
    upgradePoints: 300000,
    bgGradient: "linear-gradient(135deg, #B88746, #FDF5A6)" // Gold
  },
  {
    name: "铂金会员",
    minPoints: 300001,
    upgradePoints: 1000000,
    bgGradient: "linear-gradient(135deg, #6D697C, #B5B1CD)" // Platinum-ish
  },
  {
    name: "钻石会员",
    minPoints: 1000001,
    upgradePoints: null,
    bgGradient: "linear-gradient(135deg, #664E88, #A78CD1)" // Diamond Purple
  }
]);

const onSwiperChange = (e: any) => {
  currentSwiperIndex.value = e.detail.current;
};

const tasks = ref([
  {
    name: "回收下单",
    desc: "一键下单，方便高效",
    btnText: "去下单",
    iconChar: "♻️",
  },
  {
    name: "邀请好友",
    desc: "邀请好友，赢高额积分",
    btnText: "去邀请",
    iconChar: "👥",
  },
  {
    name: "积分充值",
    desc: "快速充值，多充多得",
    btnText: "去充值",
    iconChar: "💰",
  },
  { name: "绑定银行卡", desc: "赚200积分", btnText: "去绑定", iconChar: "💳" },
  {
    name: "绑定微信收款码",
    desc: "赚200积分",
    btnText: "去绑定",
    iconChar: "💬",
  },
  {
    name: "绑定支付宝收款码",
    desc: "赚200积分",
    btnText: "去绑定",
    iconChar: "支",
  },
  { name: "首单提现", desc: "赚100积分", btnText: "去提现", iconChar: "🧧" },
]);

const goBack = () => {
  uni.navigateBack();
};

const handleTask = (item: any) => {
  console.log("Task clicked:", item.name);
  uni.showToast({ title: "点击了 " + item.name, icon: "none" });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding-bottom: 90px;
}

/* Header Section */
.header-section {
  background-color: #1a1b2e; /* Deep dark blue/black */
  color: #fff;
  padding: 10px 20px 20px 20px;
  /* No border radius at bottom in image, looks like dark background continues or fades */
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 44px;
}
.nav-title {
  font-size: 18px;
  font-weight: bold;
}
.nav-actions {
  display: flex;
  gap: 10px;
}

.points-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 10px;
}
.points-main {
  display: flex;
  align-items: baseline;
}
.points-main .label {
  font-size: 14px;
  opacity: 0.7;
  margin-right: 5px;
}
.points-main .value {
  font-size: 48px;
  font-weight: 500;
  margin: 0 5px;
  line-height: 1;
}

.rules-btn {
  background-color: #d4b887;
  color: #333;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}

/* Level Progress */
.level-progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  opacity: 0.6;
  margin-bottom: 20px;
}
.level-progress-text .active {
  color: #d4b887;
  opacity: 1;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
}
.level-progress-text .dashed {
  letter-spacing: 2px;
}

/* Member Card */
.member-card {
  background: linear-gradient(135deg, #e6cbaec0, #d4b887);
  border-radius: 12px;
  padding: 20px;
  color: #5c4013;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  min-height: 100px;
}
.card-title {
  font-weight: 900;
  font-size: 20px;
  margin-right: 10px;
  letter-spacing: 1px;
}
.card-points {
  font-size: 12px;
  margin-right: 10px;
  opacity: 0.8;
}
.badge {
  background: #ab8857;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
}
.card-header {
  margin-bottom: 25px;
}

.progress-bar-bg {
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  margin-bottom: 8px;
  width: 60%; /* Only part of card */
}
.progress-bar-fill {
  background: #fff;
  height: 100%;
  border-radius: 2px;
}
.upgrade-tip {
  font-size: 11px;
  font-weight: 500;
}
.card-icon-placeholder {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

/* Content Body */
.content-body {
  background-color: #f5f5f7;
  position: relative;
  top: -10px; /* Slight overlap or pull up if needed, but here simple flow */
}

.lottery-entry {
  background: #fff;
  margin: 0px 0 20px 0;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.lottery-left {
  display: flex;
  align-items: center;
}
.icon-circle type {
  /* Using font icon or emoji directly */
}
.icon-circle {
  width: 36px;
  height: 36px;
  background: #fdf5e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  background: transparent;
  padding: 0 10px 10px 10px;
  margin-bottom: 10px;
}
.tab-item {
  font-size: 16px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5px;
}
.tab-item.active {
  color: #333;
  font-weight: bold;
  font-size: 18px;
}
.tab-item.active .indicator {
  width: 25px;
  height: 3px;
  background: #ff4d4f;
  margin-top: 8px;
  border-radius: 2px;
}

/* Task List */
.task-list {
  background: #fff; /* Actually transparent in image? No, looks like white items or white bg */
  background: transparent;
  padding: 0 15px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  margin-bottom: 1px; /* Separator */
  border-bottom: 1px solid #f9f9f9;
}
.task-item:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.task-item:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-bottom: 20px;
}

.task-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}
.task-icon-text {
  font-size: 20px;
}

.task-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.task-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
}
.task-desc {
  font-size: 12px;
  color: #999;
}

.action-btn {
  background: #fff;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  border-radius: 20px;
  font-size: 13px;
  padding: 0 18px;
  height: 30px;
  line-height: 28px;
  margin-left: 10px;
}

/* Footer */
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 10px 20px;
  padding-bottom: calc(10px + constant(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  z-index: 100;
}
.full-width-btn {
  background: #ff4d4f;
  color: #fff;
  border-radius: 25px;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  border: none;
  box-shadow: 0 4px 10px rgba(255, 77, 79, 0.3);
}

/* Benefits List */
.benefits-list {
  background: #fff;
  padding: 0 15px;
}
.benefit-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f9f9f9;
}
.benefit-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.benefit-icon {
  color: #fff;
  font-size: 18px;
}
.benefit-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.benefit-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.benefit-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
.benefit-range {
  font-size: 12px;
  color: #999;
}
.benefit-status {
  font-size: 14px;
  color: #999;
}
</style>
