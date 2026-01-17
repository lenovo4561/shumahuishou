<template>
  <view class="container">
    <view class="address-list" v-if="addressList.length > 0">
      <view class="address-item" v-for="(item, index) in addressList" :key="index" @click="editAddress(item)">
        <view class="info">
          <view class="user-row">
            <text class="name">{{ item.name }}</text>
            <text class="phone">{{ item.phone }}</text>
            <text class="tag" v-if="item.isDefault">默认</text>
          </view>
          <view class="address-row">
             {{ item.region }} {{ item.detail }}
          </view>
        </view>
        <view class="edit-icon">
          <text class="iconfont icon-edit">✎</text>
        </view>
      </view>
    </view>
    
    <view class="empty-state" v-else>
      <image class="empty-img" src="/static/empty-address.png" mode="widthFix" v-if="hasEmptyImg"></image>
      <view class="empty-icon-placeholder" v-else>
        <view class="icon-circle">
            <text class="icon-location">📍</text>
        </view>
      </view>
      <text class="empty-text">您尚未添加邮寄地址~</text>
    </view>

    <view class="footer-fixed">
      <button class="add-btn" @click="addAddress">添加新地址</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

const addressList = ref<any[]>([]);
const hasEmptyImg = ref(false); // Set to true if you have an image

onShow(() => {
    // Load addresses from storage or API
    const stored = uni.getStorageSync('addressList');
    if (stored) {
        addressList.value = JSON.parse(stored);
    }
});

const addAddress = () => {
  uni.navigateTo({
    url: '/subPackages/order/address-edit/address-edit'
  });
};

const editAddress = (item: any) => {
   uni.navigateTo({
    url: `/subPackages/order/address-edit/address-edit?id=${item.id}`
  });
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 140rpx;
  display: flex;
  flex-direction: column;
}

.address-list {
    padding: 0 30rpx;
}

.address-item {
    padding: 30rpx 0;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .info {
        flex: 1;
        margin-right: 20rpx;
    }
    
    .user-row {
        margin-bottom: 16rpx;
        display: flex;
        align-items: center;
        
        .name {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
            margin-right: 20rpx;
        }
        
        .phone {
            font-size: 28rpx;
            color: #999;
        }
        
        .tag {
            font-size: 20rpx;
            color: #ff3333;
            background-color: rgba(255, 51, 51, 0.1);
            padding: 2rpx 10rpx;
            border-radius: 4rpx;
            margin-left: 20rpx;
        }
    }
    
    .address-row {
        font-size: 28rpx;
        color: #666;
        line-height: 1.4;
    }
    
    .edit-icon {
        color: #999;
    }
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100rpx;
  
  .empty-img {
      width: 300rpx;
      margin-bottom: 20rpx;
  }
  
  .empty-icon-placeholder {
      margin-bottom: 40rpx;
      .icon-circle {
          width: 160rpx;
          height: 160rpx;
          background-color: #ffeaea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          
          .icon-location {
              font-size: 80rpx;
          }
      }
  }
  
  .empty-text {
    color: #999;
    font-size: 28rpx;
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
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
  
  .add-btn {
    background-color: #ff3333;
    color: #fff;
    border-radius: 45rpx;
    font-size: 32rpx;
    height: 90rpx;
    line-height: 90rpx;
    border: none; 
    &::after { border: none; }
  }
}
</style>
