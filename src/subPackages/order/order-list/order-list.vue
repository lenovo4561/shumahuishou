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

    <!-- Content Area -->
    <view class="content">
      <!-- Loading State (Optional) -->

      <!-- List with Data -->
      <view v-if="orderList.length > 0" class="order-list">
        <view class="list-summary">共计{{ orderList.length }}个订单</view>

        <view
          class="order-card"
          v-for="(item, index) in orderList"
          :key="index"
        >
          <view class="card-row">
            <text class="label">订单号: {{ item.id }}</text>
            <text class="status-text">{{ getStatusText(currentTab) }}</text>
          </view>

          <view class="card-row">
            <text class="label">机器数量:</text>
            <text class="value">{{ item.quantity }}台</text>
          </view>

          <view class="card-row">
            <text class="label">价格:</text>
            <text class="value price">￥{{ item.price }}</text>
          </view>

          <view class="card-row">
            <text class="label">下单时间:</text>
            <text class="value">{{ item.time }}</text>
          </view>

          <view class="tags-row">
            <text class="tag-label">物流发货</text>
          </view>

          <view class="action-row">
            <button class="action-btn default" @click="cancelOrder(item)">
              取消订单
            </button>
            <button class="action-btn primary" @click="submitTracking(item)">
              提交快递单号
            </button>
          </view>
        </view>

        <view class="no-more">没有更多数据了</view>
      </view>

      <!-- Empty State -->
      <view v-else class="empty-state">
        <view class="image-box">
          <text class="placeholder-icon">📋</text>
        </view>
        <text class="empty-text">暂无此订单~</text>
        <button class="create-btn" @click="goToCreateOrder">创建订单</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const currentTab = ref(1); // Default to '已下单' based on request context usually, or passing in
const tabs = [
  "全部",
  "已下单",
  "已发货",
  "待质检",
  "待确认",
  "已成交",
  "已取消",
  "申请退货",
  "申请重检",
];

const orderList = ref<any[]>([]);

onLoad((options: any) => {
  if (options.status) {
    // Map status string or index to tab index
    // Simplified mapping for demo:
    const map: Record<string, number> = {
      已下单: 1,
      已发货: 2,
      待质检: 3,
      待确认: 4,
      // ... others
    };
    if (map[options.status] !== undefined) {
      currentTab.value = map[options.status];
    }
  }
  loadData();
});

const switchTab = (index: number) => {
  currentTab.value = index;
  loadData();
};

const getStatusText = (tabIndex: number) => {
  return tabs[tabIndex] === "全部" ? "已下单" : tabs[tabIndex];
};

const loadData = () => {
  // Mock data logic
  if (currentTab.value === 1) {
    // '已下单' has data for demo
    orderList.value = [
      {
        id: "20260116114442756610",
        quantity: 1,
        price: 1,
        time: "2026-01-16 11:44:42",
      },
    ];
  } else {
    // Others empty
    orderList.value = [];
  }
};

const cancelOrder = (item: any) => {
  uni.showModal({
    title: "提示",
    content: "确定要取消吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: "已取消", icon: "none" });
        // update list...
      }
    },
  });
};

const submitTracking = (item: any) => {
  uni.showToast({ title: "跳转填写单号", icon: "none" });
};

const goToCreateOrder = () => {
  uni.switchTab({
    url: "/pages/price/price", // Assuming create order starts at price list or order tab
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.tabs-scroll {
  background-color: #fff;
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
      background-color: #fff0f0;
    }
  }
}

.content {
  flex: 1;
  padding-bottom: 20px;
}

/* Order List Styles */
.order-list {
  .list-summary {
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 10px 0;
  }

  .order-card {
    background-color: #fff;
    margin: 0 15px 15px;
    padding: 15px;
    border-radius: 8px;

    .card-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;

      .label {
        color: #666;
      }

      .value {
        color: #333;
        font-weight: 500;

        &.price {
          font-weight: bold;
        }
      }

      .status-text {
        color: #ff2d2d;
      }
    }

    .tags-row {
      margin-top: 5px;
      margin-bottom: 15px;

      .tag-label {
        background-color: #ffeaea;
        color: #ff2d2d;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    .action-row {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      border-top: 1px solid #f9f9f9;
      padding-top: 15px;

      .action-btn {
        margin: 0;
        font-size: 13px;
        line-height: 28px;
        height: 30px;
        border-radius: 15px;
        padding: 0 15px;

        &::after {
          border: none;
        }

        &.default {
          background-color: #fff;
          border: 1px solid #ccc;
          color: #666;
        }

        &.primary {
          background-color: #fff;
          border: 1px solid #ff2d2d;
          color: #ff2d2d;
        }
      }
    }
  }

  .no-more {
    text-align: center;
    color: #ccc;
    font-size: 12px;
    margin-top: 20px;
  }
}

/* Empty State Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;

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

  .create-btn {
    background-color: #ff2d2d;
    color: #fff;
    font-size: 14px;
    padding: 0 40px;
    height: 36px;
    line-height: 36px;
    border-radius: 18px;
  }
}
</style>
