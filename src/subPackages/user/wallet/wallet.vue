<template>
  <view class="container">
    <!-- Top Warning Bar -->
    <view class="warning-bar">
      提现中金额将在<text class="red-text">24小时内</text>到账，请耐心等待
    </view>

    <!-- Balance Card -->
    <view class="balance-card">
      <view class="balance-item">
        <text class="label">可提现金额(元)</text>
        <text class="amount">0.00</text>
      </view>
      <view class="divider"></view>
      <view class="balance-item">
        <text class="label">提现中金额(元)</text>
        <text class="amount">0.00</text>
      </view>
    </view>

    <!-- Settings List -->
    <view class="settings-list">
      <view class="list-item">
        <view class="item-left">
          <image
            class="icon-img"
            src="/static/alipay.png"
            mode="aspectFit"
            v-if="false"
          />
          <!-- Placeholder for icon -->
          <text class="icon-text alipay">支</text>
          <text class="item-name">支付宝收款码</text>
        </view>
        <view class="item-right">
          <text class="status">未绑定</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="list-item">
        <view class="item-left">
          <text class="icon-text bank">卡</text>
          <text class="item-name">银行卡</text>
        </view>
        <view class="item-right">
          <text class="status">未绑定</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="list-item">
        <view class="item-left">
          <text class="icon-text wechat">微</text>
          <text class="item-name">微信收款码</text>
        </view>
        <view class="item-right">
          <text class="status">未绑定</text>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- History Header -->
    <view class="history-section">
      <view class="section-header">
        <text class="title">余额流水</text>
        <text class="more">更多></text>
      </view>

      <!-- Empty State -->
      <view class="empty-state">
        <text>没有更多数据了</text>
      </view>
    </view>

    <!-- Bottom Button -->
    <view class="bottom-area">
      <button class="withdraw-btn">余额提现</button>
    </view>
  </view>
</template>

<script setup lang="ts">
// Logic here if needed
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
}

.warning-bar {
  background-color: #ffe4e4;
  color: #333;
  font-size: 12px;
  padding: 10px 15px;
  text-align: center;

  .red-text {
    color: #ff2d2d;
    font-weight: bold;
    margin: 0 4px;
  }
}

.balance-card {
  background: linear-gradient(
    135deg,
    #ff4e50 0%,
    #f9d423 100%
  ); /* Fallback or adjustment */
  background: #ff2d2d; /* Solid red matching screenshot roughly, actually looks like a vibrant red-pink gradient */
  background: linear-gradient(to right, #ff3b3b, #ff2d2d);
  margin: 15px;
  border-radius: 12px;
  padding: 30px 0;
  display: flex;
  align-items: center;
  color: #fff;

  .balance-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .label {
      font-size: 12px;
      opacity: 0.9;
      margin-bottom: 8px;
    }

    .amount {
      font-size: 32px;
      font-weight: bold;
    }
  }

  .divider {
    width: 1px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.settings-list {
  background-color: #fff;
  margin: 0 15px 20px;
  border-radius: 12px;
  overflow: hidden;

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f9f9f9;

    &:last-child {
      border-bottom: none;
    }

    .item-left {
      display: flex;
      align-items: center;

      .icon-text {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;

        &.alipay {
          background-color: #1677ff;
        }
        &.bank {
          background-color: #ffca28;
        }
        &.wechat {
          background-color: #07c160;
        }
      }

      .item-name {
        font-size: 14px;
        color: #333;
      }
    }

    .item-right {
      display: flex;
      align-items: center;

      .status {
        font-size: 12px;
        color: #999;
        margin-right: 5px;
      }

      .arrow {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}

.history-section {
  margin: 0 15px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .more {
      font-size: 12px;
      color: #999;
    }
  }

  .empty-state {
    text-align: center;
    padding: 30px 0;
    color: #ccc;
    font-size: 12px;
  }
}

.bottom-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 30px;
  background-color: #fff;

  .withdraw-btn {
    background-color: #ff2d2d;
    color: #fff;
    border-radius: 25px;
    font-size: 16px;
    border: none;

    &::after {
      border: none;
    }
  }
}
</style>
