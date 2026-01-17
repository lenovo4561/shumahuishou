<template>
  <view class="container">
    <!-- Custom Header Background (Fixed Red) -->
    <view class="header-bg"></view>

    <!-- Nav Bar -->
    <view class="nav-bar">
         <view class="back-icon" @click="goBack">
           <image src="/static/member/back.svg" style="width: 20px; height: 20px;" mode="contain" />
         </view>
         <text class="nav-title">会员中心</text>
    </view>

    <!-- Content -->
    <view class="content-wrapper">
        <!-- User Card -->
        <view class="user-card-wrapper">
           <view class="user-card">
              <view class="user-info-row">
                 <view class="avatar-circle">
                   <image src="" mode="aspectFill" class="avatar-img" v-if="false"></image>
                   <text class="avatar-placeholder" v-else>👤</text>
                 </view>
                 <view class="user-text-col">
                   <view class="name-row">
                     <text class="user-name">微信用户</text>
                     <image src="/static/mine/vip-tag.svg" mode="heightFix" class="vip-badge" v-if="false"></image>
                     <view class="vip-tag-text">VIP</view>
                   </view>
                   <text class="user-status-text">暂未开通报价会员，开通立享更多特权！</text>
                 </view>
              </view>
           </view>
        </view>
        
        <!-- Notification Bar -->
        <view class="notification-bar">
           <view class="tag">赚</view>
           <text class="notif-text">李明开通月度报价会员 累计获得收益<text class="red-text">10157</text>元</text>
        </view>

        <!-- Main White Panel -->
        <view class="main-panel">
            <!-- Privileges Grid -->
            <view class="section-title">会员专属特权</view>
            <view class="privilege-grid">
               <view class="privilege-item" v-for="(item, index) in privileges" :key="index">
                  <view class="icon-box">
                     <image :src="item.image" mode="widthFix" class="p-icon-img" />
                  </view>
                  <text class="p-text">{{ item.name }}</text>
               </view>
            </view>

            <!-- Packages List -->
            <view class="section-title">选择会员套餐</view>
            <view class="package-list">
               <view 
                 class="package-item" 
                 v-for="(pkg, index) in packages" 
                 :key="index"
                 :class="{ active: selectedPkgIndex === index }"
                 @click="selectPkg(index)"
               >
                  <view class="pkg-left">
                     <text class="pkg-name">{{ pkg.name }}</text>
                     <text class="pkg-original-price">¥{{ pkg.originalPrice }}</text>
                  </view>
                  <view class="pkg-right">
                     <view class="price-row">
                       <text class="currency">¥</text>
                       <text class="current-price">{{ pkg.price }}</text>
                     </view>
                     <text class="pkg-count">{{ pkg.count }}人开通</text>
                  </view>
               </view>
            </view>

            <!-- Rules / Description -->
            <view class="rules-section">
               <view class="rules-title">规则说明</view>
               <view class="rules-subtitle">月度会员权限</view>
               <view class="rule-item" v-for="(rule, idx) in rules" :key="idx">
                  {{ idx + 1 }}、{{ rule }}
               </view>
            </view>

             <!-- Bottom Placeholder for Footer -->
            <view class="bottom-space"></view>
        </view>
    </view>

    <!-- Footer -->
    <view class="footer-fixed">
       <view class="footer-left">
          <text>会员说明</text>
       </view>
       <button class="buy-btn" @click="buyVip">立即购买</button>
    </view>

    <!-- Floating Buttons (Right Side) -->
    <view class="floating-btns">
       <view class="float-btn">
         <text>📞</text>
         <text class="float-text">电话</text>
       </view>
       <view class="float-btn">
         <text>🎧</text>
         <text class="float-text">客服</text>
       </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedPkgIndex = ref(0);

const privileges = ref([
  { name: "免费查看报价", image: "/static/member/privilege-free.svg" },
  { name: "行情抢先知道", image: "/static/member/privilege-trend.svg" },
  { name: "拍照查价不限次", image: "/static/member/privilege-camera.svg" },
  { name: "专属收藏报价单", image: "/static/member/privilege-star.svg" },
  { name: "报价短信通知", image: "/static/member/privilege-msg.svg" },
  { name: "专属VIP服务", image: "/static/member/privilege-vip.svg" }
]);

const packages = ref([
  { name: "月度会员权限", price: "29", originalPrice: "99", count: "43833" },
  { name: "季度会员权限", price: "79", originalPrice: "159", count: "3518" },
  { name: "半年会员权限", price: "110", originalPrice: "299", count: "2035" },
  { name: "两年会员权限", price: "199", originalPrice: "399", count: "8730" },
  { name: "三年会员权限", price: "299", originalPrice: "599", count: "834" },
  { name: "一年会员权限", price: "119", originalPrice: "299", count: "29789" }
]);

const rules = [
  "会员免费无限次查看报价",
  "价格更新更及时、精准、更权威",
  "开通会员一手行情信息抢先知道",
  "拍照查价功能会员每日不限次数查询"
];

const goBack = () => {
  uni.navigateBack();
};

const selectPkg = (index: number) => {
  selectedPkgIndex.value = index;
};

const buyVip = () => {
  const pkg = packages.value[selectedPkgIndex.value];
  uni.showToast({
    title: `购买 ${pkg.name}`,
    icon: 'none'
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  position: relative;
}

/* Header Background */
.header-bg {
  background: linear-gradient(180deg, #ff3333 0%, #ff4c4c 100%);
  height: 600rpx;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.nav-bar {
  padding-top: calc(44px + env(safe-area-inset-top)); /* Improved status bar handling */
  padding-left: 30rpx;
  padding-right: 30rpx;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center; /* Center title */
  position: absolute; /* Fixed on top over red bg */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  color: #fff;
}

.back-icon {
    position: absolute;
    left: 30rpx;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 11;
}

.nav-title {
  font-size: 34rpx;
  font-weight: bold;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    padding-top: 180rpx; /* Push content down below Navbar area */
}

/* User Card */
.user-card-wrapper {
  padding: 0 30rpx;
  margin-bottom: 20rpx;
}
/* ... user card styles same ... */

/* Notification Bar */
.notification-bar {
  margin: 0 30rpx;
  background-color: #fff9e6;
  border-radius: 12rpx;
  padding: 20rpx 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  /* Lift it slightly if needed, or just let it sit */
}

/* Main Main Panel */
.main-panel {
    background-color: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    margin-top: 30rpx;
    min-height: 50vh;
    padding-bottom: 40rpx;
    overflow: hidden; /* For radius */
}

/* Privileges Grid Title inside panel */
.section-title {
  padding: 40rpx 30rpx 20rpx; /* moved padding here */
  margin: 0;
}

.user-card {
  background: linear-gradient(135deg, #ffeebb 0%, #dab578 100%);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(139, 69, 19, 0.2);
}

.user-info-row {
  display: flex;
  align-items: center;
}

.avatar-circle {
  width: 100rpx;
  height: 100rpx;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #fff;
  
  .avatar-placeholder {
     font-size: 50rpx;
  }
}

.user-text-col {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.user-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-right: 12rpx;
}

.vip-tag {
  background-color: #999;
  color: #fff;
  font-size: 20rpx;
  padding: 2rpx 8rpx;
  border-radius: 4rpx;
}

.user-status-text {
  font-size: 24rpx;
  color: #554422;
}

/* Notification Bar */
.notification-bar {
  margin: 30rpx 30rpx 0;
  background-color: #fff9e6;
  border-radius: 10rpx;
  padding: 16rpx 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  
  .tag {
    background-color: #dab578;
    color: #fff;
    font-size: 20rpx;
    padding: 2rpx 6rpx;
    border-radius: 4rpx;
    margin-right: 12rpx;
  }
  
  .notif-text {
    font-size: 24rpx;
    color: #665533;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .red-text {
    color: #ff3333;
    font-weight: bold;
    margin: 0 4rpx;
  }
}

/* Privileges Grid */
.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin: 40rpx 30rpx 20rpx;
}

.privilege-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10rpx;
}

.privilege-item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30rpx;
  
  .icon-box {
    margin-bottom: 15rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .p-icon-img { width: 80rpx; height: 80rpx; }
  }
  
  .p-text {
    font-size: 24rpx;
    color: #333;
  }
}

/* Package List */
.package-list {
  padding: 0 30rpx;
}

.package-item {
  background-color: #f8f8f8;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid transparent;
  
  &.active {
    background-color: #fffcf2;
    border-color: #eec170;
    
    .price-row {
        color: #bfa15f !important;
    }
  }
  
  .pkg-left {
    display: flex;
    flex-direction: column;
  }
  
  .pkg-name {
    font-size: 30rpx;
    color: #333; // Default
    margin-bottom: 6rpx;
  }
  
  .pkg-original-price {
    font-size: 24rpx;
    color: #999;
    text-decoration: line-through;
  }
  
  .pkg-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .price-row {
    color: #333;
    font-weight: bold;
    margin-bottom: 6rpx;
    .currency { font-size: 24rpx; }
    .current-price { font-size: 36rpx; }
  }
  
  .pkg-count {
    font-size: 22rpx;
    color: #bfa15f;
  }
}

/* Rules */
.rules-section {
    padding: 0 30rpx;
    margin-bottom: 40rpx;
}

.rules-title, .rules-subtitle {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 10rpx;
}

.rule-item {
    font-size: 26rpx;
    color: #666;
    line-height: 1.6;
    margin-bottom: 6rpx;
}

/* Footer */
.bottom-space {
    height: 140rpx;
}

.footer-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 20rpx 30rpx;
    padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.footer-left {
    font-size: 28rpx;
    color: #333;
}

.buy-btn {
    background: linear-gradient(to right, #eec170, #dab578); // Golden gradient
    color: #333;
    font-weight: bold;
    border-radius: 45rpx;
    width: 400rpx;
    font-size: 32rpx;
    height: 88rpx;
    line-height: 88rpx;
    border: none;
    &::after { border: none; }
}

/* Floating Buttons */
.floating-btns {
    position: fixed;
    right: 20rpx;
    top: 60%;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.float-btn {
    width: 90rpx;
    height: 90rpx;
    background-color: rgba(0,0,0,0.6);
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    
    .float-text {
        font-size: 20rpx;
        margin-top: 4rpx;
    }
}
</style>
