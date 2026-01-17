<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header-section">
      <!-- Balance Card -->
      <view class="balance-card">
        <text class="card-label">我的余额</text>
        <view class="balance-row">
          <text class="balance-num">0</text>
          <text class="balance-unit">元</text>
        </view>
        <!-- Icon decoration placeholder -->
        <view class="card-icon-bg"></view>
      </view>

      <!-- Right Column Cards -->
      <view class="right-column">
        <view class="action-card recharge-card">
          <view class="card-text">
            <text class="card-title red-text">立即充值 ></text>
            <text class="card-sub">充值送现金</text>
          </view>
          <view class="card-icon icon-gift">🎁</view>
        </view>
        <view class="action-card history-card">
          <view class="card-text">
            <text class="card-title orange-text">查询历史 ></text>
            <text class="card-sub">历史结果都在这</text>
          </view>
          <view class="card-icon icon-history">🔍</view>
        </view>
      </view>
    </view>

    <!-- Service Grid -->
    <view class="service-grid">
      <view
        class="grid-item"
        v-for="(item, index) in serviceList"
        :key="index"
        :class="{ active: selectedIndex === index }"
        @click="selectService(index)"
      >
        <text class="item-text">{{ item }}</text>
      </view>
    </view>

    <!-- Bottom Query Area -->
    <view class="query-area">
      <view class="query-info">
        <text class="info-name">{{ serviceList[selectedIndex] }}</text>
        <text class="info-detail">~今日剩余免费"0次~单价0.6元</text>
      </view>

      <view class="input-row">
        <view class="input-wrapper">
          <input
            class="imei-input"
            placeholder="输入IMEI或序列号"
            placeholder-style="color:#999"
          />
          <text class="scan-icon">📷</text>
        </view>
        <button class="query-btn">查询</button>
      </view>

      <view class="help-links">
        <text class="link">IMEI或者序列号是什么?</text>
        <text class="link">苹果保修是什么?</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedIndex = ref(0);

const selectService = (index: number) => {
  selectedIndex.value = index;
};

const serviceList = [
  "苹果ID激活锁",
  "容量/颜色",
  "网络锁查询",
  "苹果监管锁",
  "维修状态查询",
  "苹果ID黑白锁",
  "苹果保修查询",
  "苹果串号互查",
  "苹果验机(旗舰版)",
  "购买日期查询",
  "苹果验机(购买日期)",
  "苹果验机(网络锁)",
  "Mac激活锁查询",
  "销售地查询",
  "运营商查询",
  "苹果型号号码查询",
  "IMEI查询(型号)",
  "IMEI查询(生产日期)",
  "IMEI查询(黑名单)",
  "苹果终极鉴定",
  "", // Empty for spacing if needed, logic handles it
  "华为保修查询",
  "小米保修查询",
  "努比亚保修查询",
  "小米账号锁查询",
  "一加保修查询",
  "三星保修查询",
  "vivo保修查询",
  "OPPO保修查询",
  "真我保修查询",
  "荣耀保修查询",
  "中兴保修查询",
  "moto保修查询",
].filter((item) => item !== ""); // Remove empty placeholder used for visual alignment thought process
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 15px;
  padding-bottom: 30px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  height: 140px;
  margin-bottom: 20px;
}

.balance-card {
  flex: 1;
  background: linear-gradient(135deg, #ff5e62 0%, #ff2d2d 100%);
  border-radius: 12px;
  padding: 20px;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .card-label {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 10px;
  }

  .balance-row {
    display: flex;
    align-items: baseline;

    .balance-num {
      font-size: 40px;
      font-weight: bold;
      margin-right: 5px;
    }

    .balance-unit {
      font-size: 16px;
    }
  }

  .card-icon-bg {
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 60px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    /* Simulate the wallet icon with simple CSS shapes if possible, or just opacity block */
  }
}

.right-column {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .action-card {
    height: 47%;
    border-radius: 12px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;

    &.recharge-card {
      background-color: #ffeaea;
      .card-title {
        color: #d32f2f;
      }
    }

    &.history-card {
      background-color: #fff8e1;
      .card-title {
        color: #f57c00;
      }
    }

    .card-text {
      display: flex;
      flex-direction: column;
      z-index: 2;
    }

    .card-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .card-sub {
      font-size: 10px;
      color: #999;
    }

    .card-icon {
      font-size: 24px;
      opacity: 0.8;
    }
  }
}

.service-grid {
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-between;
  gap: 10px;
  margin-bottom: 30px;
}

.grid-item {
  width: calc((100% - 20px) / 3); /* 3 columns with 10px gap */
  background-color: #f8f8f8;
  padding: 12px 5px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;

  .item-text {
    font-size: 12px;
    color: #666;
  }

  &.active {
    background-color: #ff2d2d;

    .item-text {
      color: #fff;
    }
  }
}

.query-area {
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.query-info {
  font-size: 12px;
  margin-bottom: 15px;

  .info-name {
    color: #ff2d2d;
    margin-right: 5px;
  }

  .info-detail {
    color: #666;
  }
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  height: 44px;
}

.input-wrapper {
  flex: 1;
  background-color: #f8f8f8;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-right: 10px;
}

.imei-input {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.scan-icon {
  font-size: 18px;
  color: #999;
}

.query-btn {
  width: 80px;
  height: 100%;
  background-color: #ff2d2d;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.help-links {
  display: flex;
  flex-direction: column;
}

.link {
  color: #1890ff;
  font-size: 14px;
  margin-bottom: 8px;
  text-decoration: none;
}
</style>
