<template>
  <view class="container">
    <!-- Top Tabs -->
    <view class="tabs">
      <view
        class="tab-item"
        :class="{ active: currentTab === 0 }"
        @click="currentTab = 0"
      >
        <text>回收问题</text>
        <view class="tab-line" v-if="currentTab === 0"></view>
      </view>
      <view
        class="tab-item"
        :class="{ active: currentTab === 1 }"
        @click="currentTab = 1"
      >
        <text>邮寄问题</text>
        <view class="tab-line" v-if="currentTab === 1"></view>
      </view>
    </view>

    <!-- Tab Content -->
    <view class="content-area">
      <!-- Recycle Questions -->
      <view v-if="currentTab === 0" class="question-list">
        <view
          class="question-item"
          v-for="(item, index) in recycleQuestions"
          :key="index"
        >
          <view class="q-header" @click="toggleExpand(0, index)">
            <text class="q-title">{{ index + 1 }}、{{ item.title }}</text>
            <view class="arrow" :class="{ expanded: item.expanded }"></view>
          </view>
          <view class="q-body" v-if="item.expanded">
            <text class="answer-text">{{ item.answer }}</text>
          </view>
        </view>
      </view>

      <!-- Mailing Questions -->
      <view v-if="currentTab === 1" class="question-list">
        <view
          class="question-item"
          v-for="(item, index) in mailQuestions"
          :key="index"
        >
          <view class="q-header" @click="toggleExpand(1, index)">
            <text class="q-title">{{ index + 1 }}、{{ item.title }}</text>
            <view class="arrow" :class="{ expanded: item.expanded }"></view>
          </view>
          <view class="q-body" v-if="item.expanded">
            <text class="answer-text">{{ item.answer }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Floating CS Button -->
    <view class="cs-btn">
      <view class="cs-icon">🎧</view>
      <text class="cs-text">客服</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentTab = ref(0);

interface Question {
  title: string;
  answer: string;
  expanded: boolean;
}

const recycleQuestions = ref<Question[]>([
  {
    title: "我的手机值多少钱",
    answer:
      "打开数码回收网报价单，选择【手机品牌】打开找到手机型号就可以查看报价。",
    expanded: false,
  },
  {
    title: "找不到要回收的手机型号怎么办",
    answer: "可以联系客服18755875222电话咨询。",
    expanded: false,
  },
  {
    title: "已经下单，在哪里查看",
    answer: "在【我的】-【我的订单】-【已下单】-【查看订单】里查看。",
    expanded: false,
  },
  {
    title: "支持哪些收款方式",
    answer: "支持微信、支付宝以及银行卡收款。",
    expanded: false,
  },
  {
    title: "回收种类有哪些",
    answer:
      "①、统货功能机 功能机电容屏（电容屏、老年机）、手机拆解件、废旧电池、内存卡、手机主板（安卓、苹果）、其它手机配件 ②、二手手机 oppo、三星、vivo、小米、华为、锤子、360、酷派、苹果、魅族、HTC、中国移动、金立、黑莓、一加、诺基亚、美图、乐视、努比亚、TCL、中兴、糖果、国美、海信、步步高、朵唯、真我、摩托罗拉 ③、杂货铺 步步高学习机、游戏机、ipod系列、冷光屏、报废手机屏、POS机、对讲机、扫描枪、电脑主机、机顶盒、光纤猫、路由器、身份证阅读器、MP3/MP4、汽车导航、户户通、EVD/唱戏机、杂牌笔记本、杂牌平板、它废旧电子产品 ④、二手平板 小米平板、苹果平板、三星平板、华为平板",
    expanded: false,
  },
  {
    title: "如何进行质检",
    answer:
      "根据公司的回收标准质检，按照报价单上的报价出价，最后出具质检报告。可以在【订单】-【已质检】中查看。",
    expanded: false,
  },
  {
    title: "如果机器质检情况与提交订单不同怎么处理",
    answer:
      "在【订单】-【查看订单】-【异议重检】选择重新质检，或者联系客服，我们会及时跟您联系。",
    expanded: false,
  },
  {
    title: "准备出售产品的零部件会不会被质检人员更换",
    answer:
      "不会，我们是专业的数码回收平台，质检时24小时网络监控，保障您的机器零部件不更换，请您安心、放心。",
    expanded: false,
  },
  {
    title: "手机上的数据怎么处理",
    answer:
      "手机回收前请自行删除数据。如果您没有删除，作为回收的一个固定处理环节，我们会有专人服务删除/清理您的个人信息，确保隐私不外泄。",
    expanded: false,
  },
]);

const mailQuestions = ref<Question[]>([
  {
    title: "快递怎么进行包装",
    answer:
      "在邮寄的时候把您的机器放在盒子中，然后放些避震的泡沫塑料或者报纸，这样可以保证机器邮寄时由于颠簸造成损伤。",
    expanded: false,
  },
  {
    title: "邮寄时需要我做什么",
    answer: "请您在寄出之前将手机包装好。寄出后在小程序后台提交快递单号。",
    expanded: false,
  },
  {
    title: "邮寄后在哪里填写单号",
    answer: "点击【我的】-【我的订单】-【查看订单】-【提交快递单号】。",
    expanded: false,
  },
  {
    title: "快递运费哪边承担",
    answer:
      "发货运费自己承担。寄付会便宜一些; 如发到付我们会在成交货款里扣除运费。",
    expanded: false,
  },
  {
    title: "多久能拿到钱",
    answer:
      "我们收到机器后24小时内会进行检测，检测完成后会有短信通知，成交之后您可直接前往小程序提现到您的微信/支付宝/银行卡。",
    expanded: false,
  },
  {
    title: "多久可以退货",
    answer:
      "申请退货后，我们会在2个工作日内将机器快递寄出，并以短信方式告知您退货快递单号的。",
    expanded: false,
  },
  {
    title: "退货运费哪边承担",
    answer:
      "交易失败，部分退货运费由平台承担（安徽限智能手机三台之内，深圳部分退货智能手机满600+ 包邮退，不满运费自理。杂货、老人机和电容屏不包邮）全部退货邮费自理",
    expanded: false,
  },
]);

const toggleExpand = (tab: number, index: number) => {
  if (tab === 0) {
    recycleQuestions.value[index].expanded =
      !recycleQuestions.value[index].expanded;
  } else {
    mailQuestions.value[index].expanded = !mailQuestions.value[index].expanded;
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 100rpx; // Space for fixed tabs
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.tabs {
  position: fixed;
  top: 0; // Adjust if there is a custom navigation bar
  /* #ifdef H5 */
  top: 44px; // UniApp H5 default nav bar height
  /* #endif */
  /* #ifdef MP-WEIXIN */
  top: 0;
  /* #endif */
  left: 0;
  width: 100%;
  height: 90rpx;
  background-color: #ff2d4a; // Red background as shown
  display: flex;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    color: rgba(255, 255, 255, 0.8);
    position: relative;

    &.active {
      color: #ffffff;
      font-weight: bold;
    }

    .tab-line {
      position: absolute;
      bottom: 20rpx;
      width: 40rpx;
      height: 4rpx;
      background-color: #ffffff;
      border-radius: 2rpx;
    }
  }
}

.content-area {
  padding: 0;
}

.question-list {
  background-color: #ffffff;
}

.question-item {
  border-bottom: 1rpx solid #eeeeee;

  &:last-child {
    border-bottom: none;
  }

  .q-header {
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    .q-title {
      font-size: 28rpx;
      color: #333333;
      flex: 1;
      line-height: 1.4;
    }

    .arrow {
      width: 16rpx;
      height: 16rpx;
      border-right: 2rpx solid #999;
      border-bottom: 2rpx solid #999;
      margin-left: 20rpx;
      transform: rotate(45deg);
      transition: transform 0.3s;
      margin-bottom: 6rpx;

      &.expanded {
        transform: rotate(225deg);
        margin-bottom: -6rpx;
      }
    }
  }

  .q-body {
    padding: 20rpx 30rpx 30rpx 30rpx;
    background-color: #f9f9f9;

    .answer-text {
      font-size: 26rpx;
      color: #666666;
      line-height: 1.6;
      display: block; // allows text wraps
    }
  }
}

.cs-btn {
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
  width: 90rpx;
  height: 90rpx;
  background-color: #555;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0.8;
  z-index: 200;

  .cs-icon {
    font-size: 36rpx;
    margin-bottom: 4rpx;
  }

  .cs-text {
    font-size: 20rpx;
  }
}
</style>
