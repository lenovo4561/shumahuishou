<template>
  <view class="container">
    <!-- Top Toggle -->
    <view class="toggle-container">
      <view class="toggle-wrapper">
         <view 
           class="toggle-item" 
           :class="{ active: currentTab === 0 }"
           @click="currentTab = 0"
         >
           视频
         </view>
         <view 
           class="toggle-item" 
           :class="{ active: currentTab === 1 }"
           @click="currentTab = 1"
         >
           图片
         </view>
      </view>
    </view>

    <!-- Video List -->
    <view class="content-list" v-if="currentTab === 0">
      <view class="video-card" v-for="(item, index) in videos" :key="index">
        <view class="icon-section">
           <image src="/static/tutorial/video-icon.png" v-if="hasVideoIcon" class="video-icon-img"></image>
           <view class="circle-logo" v-else>
             <view class="logo-text">数码</view>
             <view class="logo-leaf">🍃</view>
           </view>
        </view>
        <view class="info-section">
          <text class="title">{{ item.title }}</text>
          <text class="sub-info">· {{ item.duration }} · {{ item.size }}</text>
        </view>
      </view>
    </view>

    <!-- Picture Grid -->
    <view class="content-grid" v-if="currentTab === 1">
      <view class="grid-card" v-for="(item, index) in pictures" :key="index" @click="previewImage(index)">
        <image class="grid-img" :src="item.image" mode="widthFix"></image>
        <view class="grid-title-box">
             <text class="grid-title">{{ item.title }}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentTab = ref(0);
const hasVideoIcon = ref(false); // Toggle to true if you have the actual icon asset

const videos = ref([
  { title: "课程1 - 废旧手机行业概述", duration: "15:49", size: "135.00MB" },
  { title: "课程2 - 废旧手机回收专业知识", duration: "35:53", size: "294.00MB" },
  { title: "课程3 - 跑市场需要具备的条件", duration: "5:48", size: "50.10MB" },
  { title: "课程4 - 客户群体与市场开发", duration: "13:03", size: "109.00MB" },
  { title: "课程5 - 怎样提高回收效率赚钱", duration: "11:51", size: "98.80MB" },
  { title: "课程6 - 废旧手机回收场所和方式", duration: "26:45", size: "140.00MB" }
]);

const pictures = ref([
  { title: "地摊海报", image: "/static/ditan.png" }, 
  { title: "货源分部利润点", image: "/static/lirun.png" },
  { title: "入门级价格参考表", image: "/static/jiage.png" },
  { title: "有机会成为城市合伙人", image: "/static/hehuoren.png" }
]);

const previewImage = (index: number) => {
    // Preview logic
    const urls = pictures.value.map(p => p.image);
    uni.previewImage({
        current: index,
        urls: urls
    });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f7;
  padding-bottom: 30rpx;
}

/* Toggle */
.toggle-container {
    background-color: #fff;
    padding: 20rpx;
    display: flex;
    justify-content: center;
}

.toggle-wrapper {
    display: flex;
    background-color: #f0f0f0;
    border-radius: 40rpx;
    padding: 6rpx;
}

.toggle-item {
    padding: 10rpx 50rpx;
    border-radius: 34rpx;
    font-size: 28rpx;
    color: #666;
    
    &.active {
        background-color: #07c160;
        color: #fff;
        font-weight: bold;
    }
}

/* Video List */
.content-list {
    padding: 20rpx;
}

.video-card {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
}

.icon-section {
    margin-right: 30rpx;
}

.circle-logo {
    width: 100rpx;
    height: 100rpx;
    border: 4rpx solid #07c160;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #fff;
    
    .logo-text {
        font-size: 28rpx;
        color: #ff6600; 
        font-weight: bold;
    }
    
    .logo-leaf {
        font-size: 24rpx;
        color: #07c160;
        margin-top: -6rpx;
    }
}
.video-icon-img {
    width: 110rpx;
    height: 110rpx;
}

.info-section {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 12rpx;
    font-weight: 500;
}

.sub-info {
    font-size: 24rpx;
    color: #999;
}

/* Picture Grid */
.content-grid {
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.grid-card {
    width: 48%; 
    background-color: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.grid-img {
    width: 100%;
    height: 340rpx; 
    background-color: #eee;
}

.grid-title-box {
    padding: 20rpx;
    text-align: center;
}

.grid-title {
    font-size: 26rpx;
    color: #333;
}
</style>
