<template>
  <view class="container">
    <!-- Custom Tabs -->
    <view class="tabs">
      <view 
        class="tab-item" 
        v-for="(item, index) in tabs" 
        :key="index"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        <text class="tab-text">{{ item }}</text>
        <view class="tab-line" v-if="currentTab === index"></view>
      </view>
    </view>

    <!-- Content (Empty State) -->
    <view class="content">
      <view class="empty-state">
        <image class="empty-img" src="/static/empty-feedback.png" mode="widthFix" v-if="hasEmptyImg"></image>
        <view class="empty-icon-placeholder" v-else>
           <view class="icon-box">
             <text class="emoji">📦</text> <!-- Placeholder for box with paper plane -->
           </view>
        </view>
        <text class="empty-text">暂无反馈~</text>
      </view>
    </view>

    <!-- Footer Button -->
    <view class="footer-fixed">
      <button class="feedback-btn" @click="goToFeedback">我要反馈</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['客户反馈', '客户采购', '商务合作'];
const currentTab = ref(0);
const hasEmptyImg = ref(false); // Toggle if you add an image asset

const switchTab = (index: number) => {
  currentTab.value = index;
  // Here you would typically load data for the selected tab
};

const goToFeedback = () => {
  uni.navigateTo({
    url: '/subPackages/info/feedback/feedback'
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
}

.tabs {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  padding: 0 20rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 88rpx;
  position: relative;
  
  .tab-text {
    font-size: 28rpx;
    color: #666;
  }
  
  &.active {
    .tab-text {
      color: #ff3333;
      font-weight: bold;
    }
  }
  
  .tab-line {
    position: absolute;
    bottom: 0;
    width: 40rpx;
    height: 4rpx;
    background-color: #ff3333;
    border-radius: 2rpx;
  }
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 140rpx; // Space for footer
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .empty-img {
    width: 300rpx;
    margin-bottom: 30rpx;
  }
  
  .empty-icon-placeholder {
     margin-bottom: 40rpx;
     .icon-box {
        width: 200rpx;
        height: 200rpx;
        // background-color: #ffeaea;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .emoji {
            font-size: 100rpx;
        }
     }
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

.footer-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  
  .feedback-btn {
    background-color: #ff3333;
    color: #fff;
    border-radius: 45rpx;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    border: none;
    &::after { border: none; }
  }
}
</style>
