<template>
  <view class="container">
    <!-- Header Search Area -->
    <view class="header">
      <view class="search-box">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          placeholder="门店搜索"
          placeholder-style="color: #999"
        />
      </view>
      <view class="region-btn">选择地区</view>
    </view>

    <!-- Store List -->
    <view class="store-list">
      <view class="store-item" v-for="(store, index) in stores" :key="index">
        <view class="store-header">
          <text class="store-name">{{ store.name }}</text>
          <text class="default-tag" v-if="store.isDefault">默认站点</text>
          <text class="distance">{{ store.distance }}</text>
        </view>
        <view class="store-address">{{ store.address }}</view>
        <view class="store-hours">营业时间：{{ store.hours }}</view>
        <view class="action-buttons">
          <view class="action-btn">拨打电话</view>
          <view class="action-btn">导航到店</view>
          <view class="action-btn">附近快递</view>
          <view class="action-btn primary">复制收货地址</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const stores = ref([
  {
    name: "数码回收网深圳运营中心",
    isDefault: true,
    distance: "4.41km",
    address:
      "广东省深圳市福田区深南中路2018号(科学馆地铁站B口步行200米)兴华大厦B座12层整层",
    hours: "10:00-22:00",
  },
  {
    name: "安徽门店",
    isDefault: false,
    distance: "1209.77km",
    address:
      "安徽省阜阳市太和县双浮镇双北路1号数码回收网废旧手机回收中心（五星大桥南50米路）",
    hours: "早6:00 至 晚 18:00",
  },
]);
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;
}

.header {
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-box {
  flex: 1;
  background-color: #f5f5f5;
  height: 70rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;

  .search-icon {
    font-size: 28rpx;
    margin-right: 10rpx;
    color: #999;
  }

  .search-input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
  }
}

.region-btn {
  background-color: #ff2d4a;
  color: #ffffff;
  font-size: 28rpx;
  padding: 0 24rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 8rpx;
}

.store-list {
  padding: 24rpx;
}

.store-item {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
}

.store-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;

  .store-name {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-right: 10rpx;
  }

  .default-tag {
    font-size: 20rpx;
    color: #ff2d4a;
    border: 1rpx solid #ff2d4a;
    padding: 2rpx 8rpx;
    border-radius: 4rpx;
    margin-right: auto;
  }

  .distance {
    font-size: 24rpx;
    color: #999;
    margin-left: auto; /* Push distance to the right if default tag is not present or flex behavior changes */
  }
}

.store-address {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.store-hours {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 30rpx;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
  flex-wrap: wrap; /* Allow wrapping on small screens */

  .action-btn {
    border: 1rpx solid #666;
    color: #333;
    font-size: 24rpx;
    padding: 10rpx 24rpx;
    border-radius: 30rpx;

    &.primary {
      background-color: #ff2d4a;
      color: #ffffff;
      border-color: #ff2d4a;
    }
  }
}
</style>
