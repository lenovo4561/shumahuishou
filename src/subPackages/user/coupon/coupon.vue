<template>
  <view class="container">
    <!-- Top Tabs -->
    <view class="tabs">
      <view
        class="tab-item"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        <text class="tab-text">{{ tab }}</text>
        <view class="active-line" v-if="currentTab === index"></view>
      </view>
    </view>

    <!-- Content Area -->
    <view class="content">
      <!-- Empty State -->
      <view class="empty-state">
        <!-- Placeholder for the coupon icon commonly found in empty states -->
        <view class="image-box">
          <text class="placeholder-icon">🎟️</text>
          <!-- In real app, use: <image src="/static/empty-coupon.png" mode="aspectFit" /> -->
        </view>
        <text class="empty-text">暂无优惠券~~</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentTab = ref(0);
const tabs = ["可使用", "已使用", "已过期"];

const switchTab = (index: number) => {
  currentTab.value = index;
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  background-color: #fff;
  height: 44px;
  border-bottom: 1px solid #eee;

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 14px;
    color: #333;

    &.active {
      font-weight: bold;
      color: #000;
    }

    .active-line {
      position: absolute;
      bottom: 0;
      width: 20px;
      height: 3px;
      background-color: #ff2d2d;
      border-radius: 2px;
    }
  }
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; // Center content vertically
  padding-bottom: 100px; // Offset center slightly upwards

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;

    .image-box {
      width: 120px;
      height: 120px;
      background-color: #fff0f0; // Light pinkish to match screenshot vibe
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      /* Simulating the coupon illustration in screenshot */
      background: linear-gradient(135deg, #fff 0%, #ffe6e6 100%);

      .placeholder-icon {
        font-size: 48px;
        opacity: 0.5;
      }
    }

    .empty-text {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
