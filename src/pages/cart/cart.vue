<template>
  <view class="container">
    <!-- Empty State -->
    <view class="empty-state" v-if="cartList.length === 0">
      <view class="image-box">
        <!-- Placeholder for the pink cart illustration -->
        <text class="cart-emoji">🛒</text>
      </view>
      <text class="empty-text">暂无商品，快去添加吧~~</text>
      <button class="add-btn" @click="goToPrice">添加机型</button>
    </view>

    <!-- Cart Content -->
    <view class="cart-content" v-else>
      <!-- Top Summary Bar -->
      <view class="top-bar">
        <text class="top-text"
          >当前已添加{{ totalCount }}件商品，合计{{
            totalItemCount
          }}台，已选<text class="red-text">{{ selectedCount }}台</text></text
        >
        <text class="clear-btn" @click="clearCart"> | 清空回收车</text>
      </view>

      <!-- Cart List Grouped by Category -->
      <scroll-view scroll-y class="cart-scroll">
        <view
          class="cart-group"
          v-for="(group, gIndex) in groupedCart"
          :key="gIndex"
        >
          <view class="group-header">
            <text class="group-title">{{ group.categoryName }}</text>
            <text
              class="group-clear-action"
              @click="clearCategory(group.categoryName)"
              >清空</text
            >
          </view>

          <!-- Sub Groups (e.g. 热门老年机) inside Category -->
          <view
            v-for="(subGroup, sIndex) in group.subGroups"
            :key="sIndex"
            class="sub-group-block"
          >
            <view class="sub-header">{{ subGroup.subCategoryName }}</view>

            <view
              class="cart-item"
              v-for="(item, iIndex) in subGroup.items"
              :key="item.id"
            >
              <!-- Left Slide Action placeholder text from screenshot says '左滑可删除...' 
                        Usually implemented with uni-swipe-action but for basic UI we stick to simple layout first -->
              <checkbox-group @change="onItemCheckChange(item)">
                <label class="checkbox-wrapper">
                  <checkbox
                    :checked="item.selected"
                    color="#ff2d2d"
                    style="transform: scale(0.8)"
                  />
                </label>
              </checkbox-group>

              <view class="item-info">
                <text class="item-name"
                  >{{ item.name }} ({{
                    item.unit === "斤" ? "称重" : "台"
                  }})</text
                >
                <view class="price-stepper-row">
                  <view class="price-col">
                    <text class="price-label">价格</text>
                    <text class="price-val"
                      >回收价: <text class="red">¥{{ item.price }}</text></text
                    >
                  </view>

                  <!-- Stepper and Delete -->
                  <view class="stepper-box">
                    <view class="step-btn" @click="updateQuantity(item, -1)"
                      >-</view
                    >
                    <text class="step-val">{{ item.quantity }}</text>
                    <view class="step-btn plus" @click="updateQuantity(item, 1)"
                      >+</view
                    >
                  </view>
                  <view class="delete-icon" @click="deleteItem(item)">
                    <text>🗑️</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="hint-text">提示：左滑可删除产品</view>
        <view style="height: 100px"></view>
        <!-- Spacer -->
      </scroll-view>

      <!-- Bottom Bar -->
      <view class="bottom-bar">
        <view class="select-all-box" @click="toggleSelectAll">
          <label class="checkbox-wrapper">
            <checkbox
              :checked="isAllSelected"
              color="#ff2d2d"
              style="transform: scale(0.8)"
            />
            <text class="select-text">全选</text>
          </label>
        </view>

        <view class="total-box">
          <text
            >合计:<text class="total-price"
              >¥{{ totalPrice.toFixed(2) }}</text
            ></text
          >
        </view>

        <view class="action-btns">
          <button class="btn continue" @click="goToPrice">继续添加</button>
          <button class="btn submit" @click="submitOrder">提交订单</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";

const cartList = ref<any[]>([]);

const goToPrice = () => {
  uni.navigateTo({
    url: "/pages/price/price",
  });
};

const loadCart = () => {
  cartList.value = uni.getStorageSync("cartView") || [];
};

onShow(() => {
  loadCart();
});

// Computed Properties
const groupedCart = computed(() => {
  // Group by Category -> SubCategory
  const groups: any[] = [];

  cartList.value.forEach((item) => {
    let catGroup = groups.find((g) => g.categoryName === item.categoryName);
    if (!catGroup) {
      catGroup = { categoryName: item.categoryName, subGroups: [] };
      groups.push(catGroup);
    }

    let subGroup = catGroup.subGroups.find(
      (s: any) => s.subCategoryName === item.subCategoryName
    );
    if (!subGroup) {
      subGroup = { subCategoryName: item.subCategoryName, items: [] };
      catGroup.subGroups.push(subGroup);
    }
    subGroup.items.push(item);
  });

  return groups;
});

const totalCount = computed(() => cartList.value.length); // Unique items types
const totalItemCount = computed(() =>
  cartList.value.reduce((sum, item) => sum + item.quantity, 0)
); // Total qty
const selectedCount = computed(() =>
  cartList.value
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + i.quantity, 0)
);

const totalPrice = computed(() => {
  return cartList.value
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const isAllSelected = computed(() => {
  return (
    cartList.value.length > 0 && cartList.value.every((item) => item.selected)
  );
});

// Methods
const clearCart = () => {
  uni.showModal({
    title: "提示",
    content: "确定要清空回收车吗？",
    success: (res) => {
      if (res.confirm) {
        cartList.value = [];
        uni.setStorageSync("cartView", []);
      }
    },
  });
};

const clearCategory = (catName: string) => {
  uni.showModal({
    content: `确定清空 ${catName} 下的商品吗？`,
    success: (res) => {
      if (res.confirm) {
        cartList.value = cartList.value.filter(
          (item) => item.categoryName !== catName
        );
        uni.setStorageSync("cartView", cartList.value);
      }
    },
  });
};

const updateQuantity = (item: any, change: number) => {
  const newVal = item.quantity + change;
  if (newVal <= 0) {
    deleteItem(item); // Or just minimum 1? Usually delete if 0.
    return;
  }
  item.quantity = newVal;
  saveCart();
};

const deleteItem = (item: any) => {
  uni.showModal({
    content: "确定删除该商品吗？",
    success: (res) => {
      if (res.confirm) {
        const idx = cartList.value.indexOf(item);
        if (idx > -1) {
          cartList.value.splice(idx, 1);
          saveCart();
        }
      }
    },
  });
};

const onItemCheckChange = (item: any) => {
  item.selected = !item.selected;
  saveCart();
};

const toggleSelectAll = () => {
  const newState = !isAllSelected.value;
  cartList.value.forEach((item) => (item.selected = newState));
  saveCart();
};

const saveCart = () => {
  uni.setStorageSync("cartView", cartList.value);
};

const submitOrder = () => {
  if (selectedCount.value === 0) {
    uni.showToast({ title: "请先选择商品", icon: "none" });
    return;
  }
  // Logic to go to order confirmation
  uni.showToast({ title: "提交订单功能待开发", icon: "none" });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
}

/* Existing Empty State Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  transform: translateY(-50px);
}
.image-box {
  margin-bottom: 20px;
  width: 150px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  .cart-emoji {
    font-size: 80px;
    filter: hue-rotate(300deg) opacity(0.8);
  }
}
.empty-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 30px;
}
.add-btn {
  background-color: #ff2d2d;
  color: #fff;
  font-size: 16px;
  padding: 0 45px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  border: none;
  box-shadow: 0 4px 6px rgba(255, 45, 45, 0.2);
  &::after {
    border: none;
  }
  &:active {
    opacity: 0.9;
  }
}

/* Cart Content Styles */
.cart-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 50px; /* Space for bottom bar */
}

.top-bar {
  background-color: #fcebeb;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #333;

  .red-text {
    color: #ff2d2d;
    font-weight: bold;
  }
  .clear-btn {
    color: #ff2d2d;
    margin-left: 5px;
  }
}

.cart-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
}

.cart-group {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;

  .group-header {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #f5f5f5;

    .group-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .group-clear-action {
      font-size: 14px;
      color: #666;
    }
  }
}

.sub-group-block {
  .sub-header {
    background-color: #f9f9f9;
    padding: 8px 15px;
    font-size: 14px;
    color: #999;
  }
}

.cart-item {
  display: flex;
  align-items: flex-start; /* Align top */
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;

  .checkbox-wrapper {
    margin-right: 10px;
    padding-top: 5px;
  }

  .item-info {
    flex: 1;

    .item-name {
      font-size: 14px;
      color: #333;
      margin-bottom: 5px;
      display: block;
    }

    .price-stepper-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price-col {
        .price-label {
          font-size: 12px;
          color: #999;
          display: block;
        }
        .price-val {
          font-size: 12px;
          color: #999;
          .red {
            font-size: 14px;
            color: #ff2d2d;
            font-weight: bold;
            margin-left: 2px;
          }
        }
      }

      .stepper-box {
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin-left: 10px;

        .step-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #999;
          &.plus {
            color: #fff;
            background-color: #ff2d2d;
            border-radius: 4px;
          }
        }
        .step-val {
          width: 30px;
          text-align: center;
          font-size: 12px;
        }
      }

      .delete-icon {
        margin-left: 10px;
        font-size: 18px;
      }
    }
  }
}

.hint-text {
  text-align: center;
  color: #ccc;
  font-size: 12px;
  margin-top: 20px;
}

.bottom-bar {
  position: fixed;
  bottom: 50px; /* Above Tabbar */
  /* #ifdef H5 */
  bottom: 50px;
  /* #endif */
  /* #ifdef MP-WEIXIN */
  bottom: 0;
  /* #endif */
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  justify-content: space-between;

  .select-all-box {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    .select-text {
      margin-left: 5px;
    }
  }

  .total-box {
    font-size: 14px;
    .total-price {
      color: #ff2d2d;
      font-weight: bold;
      font-size: 16px;
      margin-left: 5px;
    }
  }

  .action-btns {
    display: flex;

    .btn {
      font-size: 13px;
      padding: 0 15px;
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      margin-left: 10px;
      border: none;
      &::after {
        border: none;
      }

      &.continue {
        background-color: #ffaa00;
        color: #fff;
      }
      &.submit {
        background-color: #ff2d2d;
        color: #fff;
      }
    }
  }
}
</style>
