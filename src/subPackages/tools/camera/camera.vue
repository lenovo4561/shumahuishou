<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header-section">
      <view class="header-title-box">
        <text class="header-title">拍照片 查价格</text>
      </view>

      <view class="stats-box">
        <view class="stat-item">
          <text class="stat-num">0分</text>
          <text class="stat-label">拥有积分</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-num">10次</text>
          <text class="stat-label">剩余次数</text>
        </view>
      </view>

      <view class="camera-trigger-area" @click="handleCameraClick">
        <view class="scan-frame">
          <view class="scan-circle">
            <view class="scan-inner-circle">
              <text class="scan-text-lines">点击</text>
              <text class="scan-text-main">拍照查价</text>
            </view>
          </view>
          <!-- Corner markers -->
          <view class="corner top-left"></view>
          <view class="corner top-right"></view>
          <view class="corner bottom-left"></view>
          <view class="corner bottom-right"></view>
        </view>
        <!-- Hand icon placeholder -->
        <text class="hand-icon">👆</text>
      </view>

      <!-- Curved bottom decoration is handled by CSS or image, using CSS shape here -->
      <view class="curve-bottom"></view>
      <view class="logo-badge">
        <text class="logo-text">数码</text>
      </view>
    </view>

    <!-- Instruction Section -->
    <view class="instruction-section">
      <view class="instruction-text">
        <text>请尽量拍摄</text>
        <text class="highlight">手机背面</text>
        <text>，特征明显的一面</text>
      </view>

      <view class="examples-row">
        <view class="example-item correct">
          <view class="image-box green-border">
            <!-- Placeholder for phone back -->
            <view class="phone-back-placeholder"></view>
            <view class="camera-ui-mock"></view>
          </view>
          <view class="status-bar green-bg">
            <text class="status-icon">✔</text>
            <text>正确 (更其识别)</text>
          </view>
        </view>

        <view class="example-item error">
          <view class="image-box red-border">
            <!-- Placeholder for phone front -->
            <view class="phone-front-placeholder"></view>
            <view class="camera-ui-mock"></view>
          </view>
          <view class="status-bar red-bg">
            <text class="status-icon">✖</text>
            <text>错误 (不易识别)</text>
          </view>
        </view>
      </view>
    </view>

    <!-- History Section -->
    <view class="history-section">
      <text class="section-title">识图记录</text>
      <view class="empty-state">
        <text>没有更多数据了</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleCameraClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["camera"],
    success: (res) => {
      console.log("Image chosen:", res.tempFilePaths);
      uni.showToast({
        title: "识别功能开发中",
        icon: "none",
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.header-section {
  background: linear-gradient(135deg, #ff4e50 0%, #f44336 100%);
  padding-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px; /* Space for curve */
}

.header-title-box {
  margin-bottom: 20px;
}

.header-title {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-box {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  padding: 8px 30px;
  margin-bottom: 30px;
  width: 70%;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

.stat-label {
  color: #fff;
  font-size: 12px;
  opacity: 0.9;
}

.stat-divider {
  width: 1px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.4);
}

.camera-trigger-area {
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  width: 80%;
  aspect-ratio: 1; /* Square */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  z-index: 10;
}

.scan-frame {
  width: 90%;
  height: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: #ff4d4f;
  border-style: solid;
  border-width: 0;
}

.top-left {
  top: 0;
  left: 0;
  border-top-width: 3px;
  border-left-width: 3px;
  border-top-left-radius: 4px;
}
.top-right {
  top: 0;
  right: 0;
  border-top-width: 3px;
  border-right-width: 3px;
  border-top-right-radius: 4px;
}
.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom-width: 3px;
  border-left-width: 3px;
  border-bottom-left-radius: 4px;
}
.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom-width: 3px;
  border-right-width: 3px;
  border-bottom-right-radius: 4px;
}

.scan-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid rgba(255, 77, 79, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.scan-inner-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #ff4d4f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  box-shadow: 0 4px 15px rgba(255, 77, 79, 0.4);
}

.scan-text-lines {
  font-size: 14px;
  margin-bottom: 2px;
}

.scan-text-main {
  font-size: 20px;
  font-weight: bold;
}

.hand-icon {
  position: absolute;
  right: -10px;
  bottom: 20%;
  font-size: 40px;
  transform: rotate(-30deg);
  z-index: 20;
}

.curve-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  z-index: 5;
}

.logo-badge {
  position: absolute;
  bottom: 20px; /* Adjust to overlap curve */
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background-color: #ff2d2d;
  border: 2px solid #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-text {
  color: #fff;
  font-size: 10px;
  font-weight: bold;
}

.instruction-section {
  padding: 30px 20px 20px;
  background-color: #fff;
  text-align: center;
  margin-bottom: 10px;
}

.instruction-text {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;

  .highlight {
    color: #ff2d2d;
  }
}

.examples-row {
  display: flex;
  justify-content: space-between;
}

.example-item {
  width: 48%;
}

.image-box {
  width: 100%;
  aspect-ratio: 9/16;
  background-color: #ddd;
  border-radius: 8px 8px 0 0;
  position: relative;
  overflow: hidden;

  &.green-border {
    border: 4px solid #07c160;
  }

  &.red-border {
    border: 4px solid #ff4d4f;
  }
}

.phone-back-placeholder {
  width: 60%;
  height: 80%;
  background-color: #445;
  margin: 10% auto;
  border-radius: 10px;
}
.phone-front-placeholder {
  width: 60%;
  height: 80%;
  background: linear-gradient(135deg, #aaccff 0%, #fff 100%);
  margin: 10% auto;
  border-radius: 10px;
}

.camera-ui-mock {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;

  &::after {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}

.status-bar {
  padding: 6px 0;
  color: #fff;
  font-size: 12px;
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.green-bg {
    background-color: #07c160;
  }

  &.red-bg {
    background-color: #ff4d4f;
  }
}

.status-icon {
  margin-right: 4px;
  font-weight: bold;
}

.history-section {
  background-color: #fff;
  padding: 20px;
  flex: 1;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  display: block;
}

.empty-state {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px 0;
}
</style>
