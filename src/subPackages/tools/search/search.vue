<template>
  <view class="container">
    <!-- Custom Search Bar Area -->
    <view class="search-header">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          placeholder="搜索您要卖的品牌、机型型号"
          v-model="keyword"
          confirm-type="search"
          @confirm="onSearch"
        />
      </view>
      <text class="cancel-btn" @click="goBack">取消</text>
    </view>

    <!-- Hot Search Section -->
    <view class="hot-search-section" v-if="!showResults">
      <view class="section-title">热门搜索</view>
      <view class="tags-container">
        <view
          class="tag-item"
          v-for="(item, index) in hotList"
          :key="index"
          @click="onTagClick(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <!-- Search Results List -->
    <view class="search-results" v-if="showResults">
      <view
        class="result-item"
        v-for="(item, index) in searchResults"
        :key="index"
        @click="goToDetail(item)"
      >
        <view class="item-name">{{ item.name }}</view>
        <view class="item-category">{{ item.category }}</view>
      </view>

      <view
        v-if="searchResults.length === 0"
        style="text-align: center; color: #999; margin-top: 50px"
      >
        未找到相关机型
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");
const hotList = ref([
  "iPhone 15",
  "iPad 9",
  "Nova11",
  "红米Note9",
  "Mate 60",
  "Play9T",
  "Magic3",
  "Findx8Pro",
  "Reno5",
  "Pocket2",
  "Y100",
  "R9",
  "x9",
  "R15",
  "A7x",
  "K30",
  "A5高配",
]);

const searchResults = ref<any[]>([]);
const showResults = ref(false);

const goBack = () => {
  uni.navigateBack();
};

const onSearch = () => {
  if (!keyword.value.trim()) {
    showResults.value = false;
    searchResults.value = [];
    return;
  }

  showResults.value = true;

  // Mock Search Logic
  // Generate valid looking results based on keyword
  const k = keyword.value.toLowerCase();

  // Dummy data generator
  const results = [];
  const models = [
    "iPhone 16promax",
    "iPhone 16plus",
    "iPhone 16",
    "iPhone 16pro",
    "iPhone 15 Pro",
    "iPhone 15plus",
    "iPhone 15",
    "iPhone 14 Pro max",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 14 plus",
    "iPhone 13 PRO MAX",
    "iPhone 13 PRO",
    "iPhone 13 mini",
    "iPhone 13",
    "iPhone 12 Promax",
    "iPhone 12 Pro",
    "iPhone 12mini",
    "iPhone 12",
    "iPhone 11PRO MAX",
    "iPhone 11PRO",
    "iPhone 11",
    "iPhone 8PLUS",
    "iPhone 8",
    "iPhone 7PLUS",
    "iPhone 7",
    "iPhone 6SP",
    "iPhone 6S",
    "iPhone 6P",
    "iPhone 6",
    "iPhone 5SE",
    "iPhone 5S",
  ];

  // Simple filter
  // If keyword is 'iphone', return all. If specific, filter.
  const filtered = models.filter((m) => m.toLowerCase().includes(k));

  // If no match found but keyword exists, just show some dummy data mixed with keyword to fake it
  const listToUse = filtered.length > 0 ? filtered : [];

  searchResults.value = listToUse.map((name) => ({
    name: name,
    category: "二手手机->苹果",
    type: "normal", // or 'red' for special ones
  }));

  // Add some special red ones at bottom like screenshot if iphone
  if (k.includes("iphone")) {
    searchResults.value.push(
      {
        name: "iPhone 16 PRO MAX",
        category: "靓机回收报价->苹果无保",
        type: "special",
      },
      {
        name: "iPhone 16 PRO",
        category: "靓机回收报价->苹果无保",
        type: "special",
      },
      {
        name: "iPhone 16 Plus",
        category: "靓机回收报价->苹果无保",
        type: "special",
      }
    );
  }
};

const onTagClick = (tag: string) => {
  keyword.value = tag;
  onSearch();
};

const goToDetail = (item: any) => {
  uni.navigateTo({
    url: `/subPackages/order/product-detail/product-detail?name=${item.name}`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding: 10px 15px;
}

.search-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .search-bar {
    flex: 1;
    background-color: #f5f5f5;
    height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-right: 15px;

    .search-icon {
      font-size: 14px;
      color: #999;
      margin-right: 8px;
    }

    .search-input {
      flex: 1;
      font-size: 14px;
      color: #333;
    }
  }

  .cancel-btn {
    font-size: 14px;
    color: #666;
  }
}

.hot-search-section {
  .section-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .tag-item {
      padding: 6px 12px;
      background-color: #f5f5f5;
      color: #333;
      font-size: 13px;
      border-radius: 16px;
    }
  }
}

/* Search Results */
.search-results {
  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;

    .item-name {
      font-size: 15px;
      color: #333;
    }

    .item-category {
      font-size: 12px;
      color: #ff2d2d;
    }
  }
}
</style>
