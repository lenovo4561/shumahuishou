<template>
  <view class="container">
    <!-- Header Card -->
    <view class="header-card">
      <view class="label">总共获得红包(元)</view>
      <view class="amount">0</view>
    </view>

    <!-- Invitation Record Section -->
    <view class="record-section">
      <view class="section-header">
        <text class="title">邀请记录</text>
        <view class="filter-btn">时间筛选</view>
      </view>

      <view class="summary-row">
        <text class="label">合计</text>
        <view class="stats">
          <text class="stat-item">0人</text>
          <text class="stat-item">0积分</text>
        </view>
      </view>

      <!-- Table Header -->
      <view class="table-header">
        <text class="th">头像</text>
        <text class="th">昵称</text>
        <text class="th">成交金额</text>
        <text class="th">积分</text>
        <text class="th">佣金</text>
      </view>

      <!-- Empty Data / List Area -->
      <!-- The screenshot shows a large white/gray empty area below the headers -->
      <scroll-view scroll-y class="list-container">
        <!-- Content would go here -->
      </scroll-view>
    </view>

    <!-- Footer Button -->
    <view class="footer-area">
      <button class="invite-btn">邀请好友赚红包</button>
    </view>
  </view>
</template>

<script setup lang="ts">
// Logic can be added here
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header-card {
  background-color: #ff3344; /* Approximate red */
  color: #fff;
  padding: 25px 20px;

  .label {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 10px;
  }

  .amount {
    font-size: 40px;
    line-height: 1;
  }
}

.record-section {
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #f5f5f5;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .filter-btn {
      font-size: 13px;
      color: #666;
      border: 1px solid #ccc;
      padding: 4px 12px;
      border-radius: 18px;
    }
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #f9f9f9;

    .label {
      font-size: 15px;
      font-weight: bold;
      color: #333;
    }

    .stats {
      .stat-item {
        margin-left: 20px;
        color: #ff3344;
        font-size: 14px;
      }
    }
  }

  .table-header {
    display: flex;
    padding: 15px 0;
    background-color: #fff;

    .th {
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #999;
    }
  }

  .list-container {
    flex: 1;
    background-color: #f9f9f9;
  }
}

.footer-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 40px;
  background-color: transparent;
  /* Assuming transparent or matching background, button floats */
  pointer-events: none; /* Let clicks pass through area but catch on button */

  .invite-btn {
    pointer-events: auto;
    background-color: #ff3344;
    color: #fff;
    border-radius: 25px;
    font-size: 16px;
    border: none;
    box-shadow: 0 4px 15px rgba(255, 51, 68, 0.4);

    &::after {
      border: none;
    }
  }
}
</style>
