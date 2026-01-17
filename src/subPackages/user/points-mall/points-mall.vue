<template>
  <view class="container">
    <!-- Categories Tabs -->
    <scroll-view scroll-x class="category-scroll" :show-scrollbar="false">
      <view class="category-list">
        <view 
          class="category-item" 
          v-for="(item, index) in categories" 
          :key="index"
          :class="{ active: currentCategory === index }"
          @click="selectCategory(index)"
        >
          {{ item }}
        </view>
      </view>
    </scroll-view>

    <!-- Filters -->
    <view class="filters-bar">
      <view class="filter-item" @click="toggleSort('default')">
        <text>默认排序</text>
        <text class="uni-icon">▼</text>
      </view>
      <view class="filter-item" @click="toggleSort('points')">
        <text>积分筛选</text>
        <text class="uni-icon">▼</text>
      </view>
      <view class="filter-item" @click="toggleSort('price')">
        <text>价格筛选</text>
        <text class="uni-icon">▼</text>
      </view>
    </view>

    <!-- Product List -->
    <scroll-view scroll-y class="product-scroll">
      <view class="product-grid">
        <view class="product-item" v-for="(item, index) in products" :key="index" @click="goToDetail(item)">
          <view class="image-wrapper">
             <!-- Placeholder for product image -->
             <image v-if="item.image" :src="item.image" mode="aspectFill" class="product-image"></image>
             <view v-else class="image-placeholder">产品图</view>
             <view v-if="item.status === 'out_of_stock'" class="out-of-stock-mask">
               <text>已兑完</text>
             </view>
          </view>
          
          <view class="product-info">
            <text class="product-title">{{ item.title }}</text>
            <view class="price-row">
              <text class="points-price" v-if="item.points > 0">{{ item.points }}积分</text>
              <text class="plus-sign" v-if="item.points > 0 && item.price > 0">+</text>
              <text class="cash-price" v-if="item.price > 0">{{ item.price }}元</text>
            </view>
            <text class="sales-count">已兑{{ item.sales }}件</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- Footer -->
    <view class="footer-bar">
      <view class="footer-left">
        <text class="remain-text">剩余积分 </text>
        <text class="points-val">0</text>
      </view>
      <button class="orders-btn" @click="goToMyOrders">我的积分订单(0)</button>
    </view>
    <view class="safe-area-bottom"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const categories = ref([
  "全部", "摆摊物资", "回收教学课程", "地推海报喇叭", "手机测机充电宝", "手机回收工具"
]);

const currentCategory = ref(0);

const selectCategory = (index: number) => {
  currentCategory.value = index;
};

const products = ref([
  {
    title: "测机充电宝-双十二特惠",
    points: 0,
    price: 220,
    sales: 375,
    status: "out_of_stock",
    image: "" // Add image url if available
  },
  {
    title: "废旧手机回收基础入门课程 (针对新...",
    points: 100,
    price: 19.9,
    sales: 1318,
    image: ""
  },
  {
    title: "机大侠 手机回收专业质检工具",
    points: 0,
    price: 239,
    sales: 188,
    status: "out_of_stock",
    image: ""
  },
  {
    title: "插电动车充电口版+回收海报+录音储存",
    points: 0,
    price: 89.9,
    sales: 421,
    image: ""
  },
  {
    title: "点烟器版喇叭+回收海报+录音储存",
    points: 0,
    price: 89.9,
    sales: 222,
    image: ""
  },
  {
    title: "插电动车充电口版喊话喇叭",
    points: 0,
    price: 50,
    sales: 47,
    image: ""
  }
]);

const toggleSort = (type: string) => {
  console.log("Sort by", type);
};

const goToDetail = (item: any) => {
  console.log("Go to detail", item);
};

const goToMyOrders = () => {
    uni.navigateTo({ url: '/subPackages/order/points-order/points-order' });
};

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f7;
}

/* Category Tabs */
.category-scroll {
  background-color: #fff;
  white-space: nowrap;
  border-bottom: 1px solid #f0f0f0;
}
.category-list {
  display: flex;
  padding: 10px;
}
.category-item {
  padding: 6px 12px;
  background-color: #f5f5f5;
  color: #333;
  margin-right: 10px;
  border-radius: 4px;
  font-size: 14px;
}
.category-item.active {
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  background-color: #fff;
}

/* Filters */
.filters-bar {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.filter-item {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 4px;
}
.uni-icon {
  font-size: 10px;
  color: #666;
}

/* Product List */
.product-scroll {
  flex: 1;
  overflow-y: auto;
}
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
}
.product-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.image-wrapper {
  height: 170px;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-image {
  width: 100%;
  height: 100%;
}
.image-placeholder {
    color: #999;
}
.out-of-stock-mask {
  position: absolute;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.out-of-stock-mask text {
    border: 2px solid #fff;
    padding: 5px 10px;
    border-radius: 50%;
    transform: rotate(-15deg);
}

.product-info {
  padding: 10px;
}
.product-title {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  height: 40px; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
}
.price-row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  line-height: 1.2;
  margin-bottom: 5px;
}
.points-price, .cash-price {
  color: #ff4d4f;
  font-size: 16px;
  font-weight: bold;
}
.plus-sign {
  color: #ff4d4f;
  margin: 0 2px;
  font-size: 12px;
}
.sales-count {
  font-size: 12px;
  color: #999;
}

/* Footer */
.footer-bar {
  background-color: #fff;
  padding: 10px 15px;
  padding-bottom: calc(10px + constant(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}
.footer-left {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.remain-text {
  color: #333;
}
.points-val {
  font-weight: bold;
  color: #ff4d4f;
  margin-left: 5px;
}
.orders-btn {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 14px;
  padding: 0 15px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  margin: 0;
}
</style>
