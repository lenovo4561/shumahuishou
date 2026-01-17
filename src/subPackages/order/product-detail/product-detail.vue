<template>
  <view class="container">
    <view class="product-header">
      <view class="nav-bar">
        <!-- Back button could be custom, but standard nav bar handles it -->
      </view>
      <view class="product-image-box">
        <!-- Placeholder image -->
        <image class="product-img" src="/static/logo.png" mode="aspectFit" />
        <view class="product-name">{{ productName }}</view>
      </view>
    </view>

    <view class="info-links">
      <view class="link-item">
        <text class="link-label">等级说明</text>
        <text class="link-icon">?</text>
      </view>
      <view class="link-item right">
        <text>查看历史价格></text>
      </view>
    </view>

    <!-- Quantity Input List -->
    <view class="variant-list">
      <view class="list-title">| 输入数量</view>

      <view
        class="variant-item"
        v-for="(item, index) in variantList"
        :key="index"
      >
        <view class="variant-info">
          <view class="variant-name">
            {{ item.name }}
            <text class="variant-help">?</text>
          </view>
          <view class="variant-price">
            回收价: <text class="price-red">¥{{ item.price }} / 台</text>
          </view>
        </view>

        <view class="stepper">
          <view class="step-btn minus" @click="decreaseQty(index)">−</view>
          <view class="step-val">{{ item.quantity }}</view>
          <view class="step-btn plus" @click="increaseQty(index)">+</view>
        </view>
      </view>
    </view>

    <!-- Spacer for fixed footer -->
    <view style="height: 80px"></view>

    <!-- Fixed Footer -->
    <view class="footer-bar">
      <view class="footer-btn cart-link" @click="goToCart"> 回收车 </view>
      <view class="footer-btn add-cart" @click="addToCart"> 加入回收车 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const productName = ref("");
const variantList = ref<any[]>([]);

onLoad((options: any) => {
  if (options.name) {
    productName.value = options.name;
    generateVariants();
  }
});

const generateVariants = () => {
  // Mock data generation logic based on screenshot
  // Usually this would come from an API based on the product ID
  // Base price
  let basePrice = 3000;
  if (productName.value.toLowerCase().includes("promax")) basePrice = 5000;
  else if (productName.value.toLowerCase().includes("plus")) basePrice = 4000;

  variantList.value = [
    { name: "开机屏好 (无ID)", price: basePrice, quantity: 0 },
    {
      name: "开机屏坏 (无ID)",
      price: Math.floor(basePrice * 0.6),
      quantity: 0,
    },
    { name: "无ID靓板", price: Math.floor(basePrice * 0.35), quantity: 0 },
    { name: "无ID不靓板", price: 350, quantity: 0 },
    { name: "废板-整机", price: 100, quantity: 0 },
  ];
};

const increaseQty = (index: number) => {
  variantList.value[index].quantity++;
};

const decreaseQty = (index: number) => {
  if (variantList.value[index].quantity > 0) {
    variantList.value[index].quantity--;
  }
};

const goToCart = () => {
  uni.switchTab({
    url: "/pages/cart/cart",
  });
};

const addToCart = () => {
  const itemsToAdd = variantList.value.filter((item) => item.quantity > 0);

  if (itemsToAdd.length === 0) {
    uni.showToast({
      title: "请至少选择一项数量",
      icon: "none",
    });
    return;
  }

  // Add to local storage cart
  let cart = uni.getStorageSync("cartView") || [];

  itemsToAdd.forEach((item) => {
    // Generate unique ID or match existing
    // Construct a cart item
    const newItem = {
      id: productName.value + "_" + item.name + "_" + Date.now(), // Unique enough for now
      name: productName.value,
      variantName: item.name, // Extra detail
      // Combine name for display in cart if needed, or Cart needs adjustment to show variants
      // For now, let's append variant to name or use a unified name format as per cart screenshot requirements?
      // Cart screenshot showed "iPhone 16 Pro Max". If we add "开机屏好", it might be a separate entry.
      // Let's format name as "Product Name (Variant)"
      displayName: `${productName.value} ${item.name}`,
      price: item.price,
      quantity: item.quantity,
      unit: "台",
      categoryName: "二手手机", // Stub
      subCategoryName: "苹果", // Stub
      selected: true,
    };

    // Check if exists (simplified)
    const existingIndex = cart.findIndex(
      (c: any) => c.displayName === newItem.displayName
    );
    if (existingIndex > -1) {
      cart[existingIndex].quantity += newItem.quantity;
    } else {
      // Use displayName as the main name for the cart to render correctly
      newItem.name = newItem.displayName;
      cart.push(newItem);
    }
  });

  uni.setStorageSync("cartView", cart);

  uni.showToast({
    title: "已加入回收车",
    icon: "success",
  });

  // Reset quantities
  variantList.value.forEach((item) => (item.quantity = 0));
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 20px;
}

.product-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  .product-img {
    width: 180px;
    height: 180px;
    margin-bottom: 10px;
  }

  .product-name {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
}

.info-links {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 20px;

  .link-item {
    font-size: 12px;
    display: flex;
    align-items: center;

    .link-label {
      color: #fff;
      background-color: #ff2d2d;
      padding: 2px 6px;
      border-radius: 4px;
      margin-right: 4px;
    }

    .link-icon {
      color: #ff2d2d;
      border: 1px solid #ff2d2d;
      width: 14px;
      height: 14px;
      line-height: 12px;
      text-align: center;
      border-radius: 50%;
      font-size: 10px;
    }

    &.right {
      color: #ff2d2d;
    }
  }
}

.variant-list {
  padding: 0 15px;

  .list-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    border-left: 4px solid #ff2d2d;
    padding-left: 8px;
  }

  .variant-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .variant-info {
      .variant-name {
        font-size: 15px;
        color: #333;
        margin-bottom: 6px;
        display: flex;
        align-items: center;

        .variant-help {
          display: inline-block;
          width: 14px;
          height: 14px;
          line-height: 14px;
          text-align: center;
          background-color: #ccc;
          color: #fff;
          border-radius: 50%;
          font-size: 10px;
          margin-left: 6px;
        }
      }

      .variant-price {
        font-size: 13px;
        color: #999;

        .price-red {
          color: #ff2d2d;
          font-weight: bold;
        }
      }
    }

    .stepper {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 4px;
      height: 32px;

      .step-btn {
        width: 32px;
        height: 32px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        color: #666;
      }

      .step-val {
        width: 40px;
        text-align: center;
        font-size: 14px;
        color: #333;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
        height: 100%;
        line-height: 32px;
      }
    }
  }
}

.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding: 0 15px;
  z-index: 100;

  .footer-btn {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    font-size: 14px;

    &.cart-link {
      width: 120px;
      border: 1px solid #ff2d2d;
      color: #ff2d2d;
      margin-right: 15px;
      background-color: #fff;
    }

    &.add-cart {
      flex: 1;
      background-color: #ff2d2d;
      color: #fff;
    }
  }
}
</style>
