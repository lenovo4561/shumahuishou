<template>
  <view class="container">
    <!-- Top Tabs -->
    <view class="tabs-scroll">
      <view class="tabs-container">
        <view
          class="tab-item"
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
        >
          <text class="tab-text">{{ tab }}</text>
        </view>
      </view>
    </view>

    <!-- Main Content -->
    <view class="content">
      <!-- Empty State -->
      <view class="empty-state">
        <view class="image-box">
          <text class="placeholder-icon">📋</text>
        </view>
        <text class="empty-text">暂无相关订单~</text>
        <button class="exchange-btn" @click="goToMall">我要兑换</button>
      </view>

      <!-- Recommendation Section -->
      <view class="recommend-section">
        <view class="divider-title">
          <text class="line"></text>
          <text class="text">更多商品</text>
          <text class="line"></text>
        </view>

        <view class="product-grid">
          <view
            class="product-card"
            v-for="(item, index) in products"
            :key="index"
          >
            <image class="prod-img" :src="item.image" mode="aspectFill"></image>
            <view class="prod-info">
              <text class="prod-title">{{ item.title }}</text>
              <view class="price-row">
                <text class="price">{{ item.price }}元</text>
                <text class="sold">已兑{{ item.sold }}件</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentTab = ref(0);
const tabs = [
  "全部",
  "待收货",
  "已收货",
  "已完成",
  "售后处理中",
  "售后已拒绝",
  "售后已同意",
  "已取消",
];

const products = ref([
  {
    image: "/static/logo.png", // Placeholder
    title: "地摊海报",
    price: "22",
    sold: "1820",
  },
  {
    image: "/static/logo.png", // Placeholder
    title: "插电动车充电口版+回收海报+录音储存",
    price: "89.9",
    sold: "421",
  },
]);

const switchTab = (index: number) => {
  currentTab.value = index;
};

const goToMall = () => {
  uni.showToast({
    title: "跳转积分商城",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.tabs-scroll {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;

  .tabs-container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 8px;
  }

  .tab-item {
    display: inline-flex;
    padding: 6px 12px;
    font-size: 14px;
    color: #333;
    background-color: #f5f5f5;
    border-radius: 4px;

    &.active {
      color: #ff2d2d;
      border: 1px solid #ff2d2d;
      background-color: #fff;
    }
  }
}

.content {
  padding-top: 50px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  .image-box {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #fff 0%, #ffe6e6 100%);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .placeholder-icon {
      font-size: 40px;
    }
  }

  .empty-text {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  .exchange-btn {
    background-color: #ff2d2d;
    color: #fff;
    font-size: 14px;
    padding: 0 30px;
    height: 36px;
    line-height: 36px;
    border-radius: 18px;
    border: none;

    &::after {
      border: none;
    }
  }
}

.recommend-section {
  padding: 0 10px;

  .divider-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .text {
      font-size: 16px;
      color: #ff2d2d;
      font-weight: bold;
      margin: 0 10px;
    }

    .line {
      width: 40px;
      height: 1px;
      background-color: #ff2d2d;
    }
  }

  .product-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .product-card {
      width: 48%;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 15px;

      .prod-img {
        width: 100%;
        height: 150px;
        background-color: #f0f0f0;
      }

      .prod-info {
        padding: 10px;

        .prod-title {
          font-size: 14px;
          color: #333;
          margin-bottom: 10px;
          line-height: 1.4;
          height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .price {
            font-size: 16px;
            color: #ff2d2d;
            font-weight: bold;
          }

          .sold {
            font-size: 10px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
