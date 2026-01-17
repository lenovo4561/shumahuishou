<template>
  <view class="container">
    <!-- Header Banner Area -->
    <view class="banner-section">
      <view class="rule-tag">规则</view>

      <view class="title-area">
        <view class="main-title-row">
          <text class="title-text outlined">邀好友</text>
          <text class="title-text filled">分返佣</text>
        </view>
        <view class="sub-title-row">
          <text class="sub-title">好友下单返佣</text>
          <text class="sub-highlight">1%</text>
        </view>
      </view>

      <!-- Decorative Elements (Simulated with simple shapes/positions) -->
      <view class="red-packet p1"></view>
      <view class="red-packet p2"></view>
      <view class="coin c1">￥</view>
      <view class="coin c2">￥</view>

      <!-- Broadcast Ticker -->
      <view class="broadcast-bar">
        <view class="avatar-circle"></view>
        <text class="broadcast-text">@周先生 已邀请88人 获得返佣4963.88元</text>
      </view>
    </view>

    <!-- Content Body -->
    <view class="content-body">
      <!-- Steps Card -->
      <view class="card steps-card">
        <view class="step-item">
          <view class="step-icon-box">
            <text class="step-icon">👤+</text>
          </view>
          <text class="step-text">邀请好友</text>
        </view>
        <view class="step-arrow">></view>
        <view class="step-item">
          <view class="step-icon-box">
            <text class="step-icon">🔗</text>
          </view>
          <text class="step-text">好友关注小程序</text>
        </view>
        <view class="step-arrow">></view>
        <view class="step-item">
          <view class="step-icon-box">
            <text class="step-icon">🎁</text>
          </view>
          <text class="step-text">奖励到账</text>
        </view>
      </view>

      <!-- Action Buttons -->
      <view class="action-buttons-row">
        <button class="action-btn btn-invite">立即邀请获得奖励</button>
        <button class="action-btn btn-poster">生成我的专属海报</button>
      </view>

      <!-- My Rewards Card -->
      <view class="card rewards-card">
        <view class="card-title">我的奖励</view>
        <view class="stats-row">
          <view class="stat-item">
            <text class="stat-val red">0<text class="unit">元</text></text>
            <text class="stat-label">红包</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-val red">0<text class="unit">分</text></text>
            <text class="stat-label">积分</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-val red">0<text class="unit">人</text></text>
            <text class="stat-label">已邀请</text>
          </view>
        </view>
        <button class="detail-btn">查看奖励明细</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// Logic here if needed
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #ff4d6a; /* Main pinkish-red bg */
  background: linear-gradient(180deg, #ff4d6a 0%, #ff2d4a 100%);
  display: flex;
  flex-direction: column;
}

.banner-section {
  position: relative;
  height: 380px; /* Adjust based on needs */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  overflow: hidden;

  /* Background glow effect simulation */
  background: radial-gradient(circle at 50% 30%, #ff7a8e 0%, #ff4d6a 60%);
}

.rule-tag {
  position: absolute;
  right: 0;
  top: 20px;
  background-color: #feeaa5;
  color: #c97a00;
  font-size: 12px;
  padding: 2px 8px 2px 12px;
  border-radius: 12px 0 0 12px;
  font-weight: bold;
}

.title-area {
  text-align: center;
  z-index: 10;
}

.main-title-row {
  margin-bottom: 10px;
}

.title-text {
  font-size: 48px;
  font-weight: 900;
  font-style: italic;
  margin: 0 5px;
}

.outlined {
  color: #fff;
  /* Creating text stroke/shadow effect */
  text-shadow: 2px 2px 0px #ff2d2d;
}

.filled {
  color: #feeaa5; /* Goldish yellow */
  text-shadow: 2px 2px 0px #c97a00;
}

.sub-title-row {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.sub-highlight {
  color: #feeaa5;
  font-size: 32px;
  margin-left: 5px;
}

/* Decoration Placeholders */
.red-packet {
  position: absolute;
  width: 40px;
  height: 50px;
  background-color: #ff2d2d;
  border: 1px solid #ff9999;
  border-radius: 4px;

  &.p1 {
    left: 10%;
    top: 40%;
    transform: rotate(-15deg);
    opacity: 0.8;
  }
  &.p2 {
    right: 10%;
    top: 30%;
    transform: rotate(15deg);
    opacity: 0.6;
    width: 30px;
    height: 40px;
  }

  &::after {
    content: "￥";
    color: #feeaa5;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.coin {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #feeaa5;
  border-radius: 50%;
  border: 3px solid #eebb55;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eebb55;
  font-weight: bold;

  &.c1 {
    left: 20%;
    top: 60%;
    transform: scale(0.8);
  }
  &.c2 {
    right: 25%;
    top: 55%;
  }
}

.broadcast-bar {
  position: absolute;
  bottom: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 4px 15px 4px 5px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 12px;
}

.avatar-circle {
  width: 24px;
  height: 24px;
  background-color: #ddd; /* Image placeholder */
  border-radius: 50%;
  margin-right: 8px;
  border: 1px solid #fff;
}

.content-body {
  padding: 0 15px 30px;
  /* Pull content up to overlap banner slightly */
  position: relative;
  top: -20px;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.steps-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.step-icon-box {
  width: 40px;
  height: 40px;
  background-color: #ffeaea;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
}

.step-icon {
  font-size: 20px;
  color: #ff4d6a;
}

.step-text {
  font-size: 11px;
  color: #333;
  text-align: center;
}

.step-arrow {
  color: #ddd;
  font-weight: bold;
}

/* Action Buttons */
.action-buttons-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.action-btn {
  width: 48%;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff9a44 0%, #ff6b22 100%);
  box-shadow: 0 4px 6px rgba(255, 107, 34, 0.3);
  margin: 0;
  border: none;

  &::after {
    border: none;
  }
}

/* Rewards Card */
.stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-val {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;

  &.red {
    color: #ff2d2d;
  }

  .unit {
    font-size: 12px;
    font-weight: normal;
    margin-left: 2px;
  }
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background-color: #eee;
}

.detail-btn {
  background-color: #fff;
  color: #ff2d2d;
  border: 1px solid #ff2d2d;
  border-radius: 22px;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 80%;
  margin: 0 auto;
}
</style>
