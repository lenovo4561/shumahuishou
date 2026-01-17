<template>
  <view class="container">
    <view class="notice-list">
      <view
        class="notice-item"
        v-for="(item, index) in noticeList"
        :key="index"
      >
        <!-- Date Time -->
        <view class="time-header">{{ item.time }}</view>

        <!-- Card Content -->
        <view class="notice-card" @click="goToDetail(item)">
          <!-- Banner Area (Simulating the images in screenshot with CSS) -->
          <view class="banner-box" :class="item.bannerClass">
            <text class="banner-text">{{ item.bannerText }}</text>
          </view>

          <view class="card-body">
            <view class="card-title">{{ item.title }}</view>
            <view class="card-desc">{{ item.content }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="footer-tip">
      <text>— 更多公告请留意官方通知 —</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const noticeList = ref([
  {
    time: "2024-05-12 18:30:50",
    title: "报价单升级通知",
    content:
      "重要通知：为了更好的服务每一位客户，报价单正在升级，临时性卡顿，各位老板稍等...",
    bannerText: "重要通知",
    bannerClass: "banner-red-white",
  },
  {
    time: "2024-03-23 10:38:30",
    title: "【重要】事关报价单使用问题!",
    content: "重要提醒!\n...",
    bannerText: "重要提醒",
    bannerClass: "banner-dark-red",
  },
  {
    time: "2024-01-25 11:23:18",
    title: "最新收货通知!",
    content: "【收货通知】\n...",
    bannerText: "最新收货通知",
    bannerClass: "banner-red-yellow",
  },
  {
    time: "2024-01-15 17:25:33",
    title: "系统维护公告",
    content: "系统将于今晚进行例行维护，届时可能无法访问，请提前做好准备。",
    bannerText: "系统维护",
    bannerClass: "banner-blue",
  },
]);

const goToDetail = (item: any) => {
  // Placeholder for detail navigation
  uni.showToast({
    title: "查看详情",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 10px 15px;
  padding-bottom: 40px;
}

.notice-item {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-header {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  background-color: transparent;
}

.notice-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .banner-box {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.banner-red-white {
      background-color: #cc0000;
      .banner-text {
        color: #fff;
        font-size: 32px;
        font-weight: bold;
        font-style: italic;
        letter-spacing: 2px;
      }
    }

    &.banner-dark-red {
      background-color: #a82e2e;
      .banner-text {
        color: #ffeb3b;
        font-size: 30px;
        font-weight: 900;
        text-shadow: 2px 2px 0px #333;
      }
    }

    &.banner-red-yellow {
      background-color: #e53935;
      background-image: linear-gradient(45deg, #e53935, #ff5252);
      .banner-text {
        color: #fff9c4;
        font-size: 28px;
        font-weight: bold;
        border: 2px dashed #fff9c4;
        padding: 5px 15px;
      }
    }

    &.banner-blue {
      background-color: #1976d2;
      .banner-text {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
      }
    }
  }

  .card-body {
    padding: 15px;

    .card-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    .card-desc {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}

.footer-tip {
  text-align: center;
  font-size: 12px;
  color: #ccc;
  margin-top: 20px;
}
</style>
