<template>
  <view class="container">
    <!-- Search Bar -->
    <view class="search-box" @click="goToSearch">
      <text class="search-label">选择机型</text>
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <view class="search-input" style="color: #999; line-height: 36px"
          >搜索品牌/型号</view
        >
      </view>
    </view>

    <!-- Category Horizontal Scroll -->
    <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
      <view class="category-row">
        <text
          class="category-tab"
          v-for="(cat, index) in categoryList"
          :key="index"
          :class="{ active: currentCategoryIndex === index }"
          @click="onCategoryChange(index)"
        >
          {{ cat.name }}
        </text>
        <view
          class="active-bar"
          :style="{ left: currentCategoryIndex * 80 + 50 + 'px' }"
        ></view>
      </view>
    </scroll-view>

    <!-- Main Content: Left/Right Layout -->
    <view class="main-content-split">
      <!-- Left Sidebar -->
      <scroll-view scroll-y class="left-sidebar">
        <view
          class="sidebar-item"
          v-for="(sub, index) in currentSubCategories"
          :key="index"
          :class="{ active: currentSubCategoryIndex === index }"
          @click="onSubCategoryChange(index)"
        >
          <view class="sidebar-text">{{ sub.name }}</view>
        </view>
      </scroll-view>

      <!-- Right Content -->
      <scroll-view scroll-y class="right-list">
        <!-- Banner -->
        <view class="list-banner">
          <text class="banner-hint">懒得选机器？想要卖多台？</text>
          <view class="banner-link-wrapper" @click="goToOrder">
            <text class="banner-link">快速下单 ▶</text>
          </view>
        </view>

        <!-- Product Groups -->
        <view
          v-for="(group, gIndex) in productGroups"
          :key="gIndex"
          class="prod-group"
        >
          <view class="group-title">{{ group.title }}</view>
          <view
            class="product-item"
            v-for="(prod, pIndex) in group.items"
            :key="pIndex"
            @click="openProductModal(prod)"
          >
            <view class="prod-info">
              <text class="prod-indicator">●</text>
              <text class="prod-name">{{ prod.name }}</text>
            </view>
            <view class="prod-price-col" @click.stop="goToCart">
              <text class="price-val">￥{{ prod.price }}</text>
              <text class="price-label">预计可卖</text>
            </view>
          </view>
        </view>

        <!-- Empty State / Placeholder if no products -->
        <view v-if="productGroups.length === 0" class="empty-products">
          <text>暂无报价</text>
        </view>

        <view style="height: 100px"></view>
      </scroll-view>
    </view>

    <!-- Fly Animation Ball -->
    <view
      v-if="flyEl.show"
      class="fly-ball"
      :style="{
        left: flyEl.left + 'px',
        top: flyEl.top + 'px',
        opacity: flyEl.opacity,
      }"
    ></view>

    <!-- Product Detail Modal -->
    <view class="modal-overlay" v-if="showModal" @click="closeModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">{{ selectedProduct.name }}</text>
          <text class="close-btn" @click="closeModal">×</text>
        </view>

        <view class="modal-body">
          <view class="modal-img-box">
            <!-- Placeholder image, using a generic one or dynamic if available -->
            <image class="modal-img" src="/static/logo.png" mode="aspectFit" />
          </view>

          <view class="modal-info-row">
            <text class="grade-label">等级说明?</text>
            <text class="history-link">查看历史价格></text>
          </view>

          <view class="input-section">
            <view class="price-info">
              <text class="price-title">价格</text>
              <text class="price-val"
                >回收价:
                <text class="red"
                  >¥{{ selectedProduct.price }} /
                  {{ selectedProduct.unit || "台" }}</text
                ></text
              >
            </view>

            <view class="stepper">
              <view class="step-btn minus" @click="decreaseQty">−</view>
              <view class="step-val">{{ quantity }}</view>
              <view class="step-btn plus" @click="increaseQty">+</view>
            </view>
          </view>
        </view>

        <view class="modal-footer">
          <view class="footer-btn close" @click="closeModal">关闭</view>
          <view class="footer-btn cart-link" @click="goToCart">回收车</view>
          <view class="footer-btn add-cart" @click="addToCart">加入回收车</view>
        </view>
      </view>
    </view>

    <!-- Floating Cart -->
    <view class="floating-cart" @click="goToCart">
      <view class="cart-icon-box">
        <text class="cart-icon">🛒</text>
        <view class="cart-badge">{{ totalCartQty }}</view>
      </view>
      <text class="cart-text">预计可卖</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

const currentCategoryIndex = ref(0);
const currentSubCategoryIndex = ref(0);
const productGroups = ref<any[]>([]);
const currentSubCategories = ref<any[]>([]);
const cartList = ref<any[]>([]); // Reactive cart list

// Fly Animation State
const flyEl = ref({
  show: false,
  left: 0,
  top: 0,
  opacity: 1,
});

// Modal State
const showModal = ref(false);
const selectedProduct = ref<any>({});
const quantity = ref(0);

const getCartQty = (prod: any) => {
  const item = cartList.value.find((i: any) => i.name === prod.name);
  return item ? item.quantity : 0;
};

const openProductModal = (prod: any) => {
  selectedProduct.value = prod;
  // Initialize quantity from cart if exists
  const existingQty = getCartQty(prod);
  quantity.value = existingQty > 0 ? existingQty : 1;

  // Default unit logic if not present
  if (!selectedProduct.value.unit) {
    // Crude heuristic: if price is low, maybe 'kg'? Or just default to '台' as per screenshot logic usually implies nice phones are per piece.
    // But screenshot shows "称斤杂机" -> "¥200 / 斤".
    // I'll add logic: if name contains "称斤" or similar, use '斤'
    if (prod.name.indexOf("称斤") !== -1 || prod.name.indexOf("杂机") !== -1) {
      selectedProduct.value.unit = "斤";
    } else {
      selectedProduct.value.unit = "台";
    }
  }
  quantity.value = 0;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const increaseQty = () => {
  quantity.value++;
};

const decreaseQty = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (quantity.value <= 0) {
    uni.showToast({
      title: "请选择数量",
      icon: "none",
    });
    return;
  }

  // Close Modal First
  showModal.value = false;

  // Run Animation
  runFlyAnimation();

  // Get current category info
  const currentCategory = categoryList[currentCategoryIndex.value];
  const currentSubCategory =
    currentSubCategories.value[currentSubCategoryIndex.value];

  const cartItem = {
    id: selectedProduct.value.name + "_" + Date.now(),
    name: selectedProduct.value.name,
    price: selectedProduct.value.price,
    quantity: quantity.value,
    unit: selectedProduct.value.unit || "台",
    categoryName: currentCategory.name,
    subCategoryName: currentSubCategory.name,
    selected: true,
  };

  // Get existing cart
  let cart = uni.getStorageSync("cartView") || [];
  const existingIndex = cart.findIndex(
    (item: any) =>
      item.name === cartItem.name &&
      item.categoryName === cartItem.categoryName &&
      item.subCategoryName === cartItem.subCategoryName
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity = cartItem.quantity; // Update to new set quantity
  } else {
    cart.push(cartItem);
  }

  uni.setStorageSync("cartView", cart);
  cartList.value = cart; // Update reactive state
};

const runFlyAnimation = () => {
  // Start position: Bottom Center
  const sys = uni.getSystemInfoSync();
  const startLeft = sys.windowWidth / 2;
  const startTop = sys.windowHeight - 100;

  // End Position: Cart Icon (Right: 20px, Bottom: 80px)
  const endLeft = sys.windowWidth - 45;
  const endTop = sys.windowHeight - 105;

  flyEl.value = { show: true, left: startLeft, top: startTop, opacity: 1 };

  // Animate
  setTimeout(() => {
    flyEl.value.left = endLeft;
    flyEl.value.top = endTop;
    flyEl.value.opacity = 0.5;
  }, 50);

  setTimeout(() => {
    flyEl.value.show = false;
  }, 600);
};

const goToCart = () => {
  uni.switchTab({
    url: "/pages/cart/cart",
  });
};

const goToOrder = () => {
  uni.switchTab({
    url: "/pages/order/order",
  });
};

const goToSearch = () => {
  uni.navigateTo({
    url: "/subPackages/tools/search/search",
  });
};

const totalCartQty = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.quantity, 0);
});

// Data Source
const brandList = [
  { name: "热门老年机" },
  { name: "智能机/电容屏" },
  { name: "手机拆机件" },
  { name: "电池" },
  { name: "OPPO" },
  { name: "VIVO" },
  { name: "小米" },
  { name: "华为OK板" },
  { name: "华为" },
  { name: "三星" },
  { name: "苹果" },
  { name: "高仿苹果" },
  { name: "金立" },
  { name: "联想" },
  { name: "酷派/ivvi" },
  { name: "魅族" },
  { name: "锤子" },
  { name: "360" },
  { name: "HTC" },
  { name: "黑莓" },
  { name: "一加" },
  { name: "真我/realme" },
  { name: "诺基亚" },
  { name: "美图" },
  { name: "乐视" },
  { name: "努比亚" },
  { name: "中国移动" },
  { name: "TCL" },
  { name: "中兴" },
  { name: "8848" },
  { name: "糖果/国美" },
  { name: "步步高" },
  { name: "海信" },
  { name: "朵唯" },
  { name: "格力" },
  { name: "摩托罗拉" },
  { name: "华硕" },
  { name: "柔宇" },
  { name: "谷歌Google" },
];
const desktopList = [
  { name: "点数cpu" },
  { name: "CPU" },
  { name: "品牌笔记本" },
  { name: "杂牌笔记本" },
  { name: "主机光驱/电源" },
  { name: "电脑硬盘" },
  { name: "电脑主板" },
  { name: "显卡" },
  { name: "内存条" },
  { name: "显示器" },
  { name: "电脑一体机" },
  { name: "海康录像机" },
];
const gadgetList = [
  { name: "儿童手表" },
  { name: "汽车导航" },
  { name: "户户通" },
  { name: "EVD、唱戏机" },
  { name: "步步高学习机" },
  { name: "身份证阅读器" },
  { name: "路由器" },
  { name: "方盒路由器" },
  { name: "光纤猫" },
  { name: "机顶盒" },
  { name: "苹果盒子" },
  { name: "游戏机" },
  { name: "大游戏机" },
  { name: "扫描枪" },
  { name: "对讲机" },
  { name: "POS机" },
  { name: "ipod系列" },
  { name: "其他杂货" },
  { name: "蓝牙耳机" },
  { name: "亚马逊电子书" },
  { name: "美团点餐机" },
  { name: "大疆无人机" },
  { name: "小票打印机" },
  { name: "华为随身4Gwifi" },
  { name: "汉印" },
  { name: "打印机" },
  { name: "苹果耳机" },
  { name: "称斤系列" },
  { name: "米家空气净化器" },
  { name: "无线摄像头" },
  { name: "海康威视摄像头" },
  { name: "平衡车" },
  { name: "戴森吹风机" },
  { name: "条形扫码枪+扫描打印机" },
  { name: "索尼cd/mp3/MD/录音笔" },
  { name: "小米音响" },
  { name: "苹果P3播放器" },
];
const tabletList = [
  { name: "杂牌平板" },
  { name: "苹果平板" },
  { name: "三星平板" },
  { name: "小米平板" },
  { name: "华为平板" },
  { name: "荣耀平板" },
  { name: "OPPO/vivo平板" },
  { name: "小度/天猫/播放器" },
];

const internalPartList = [
  { name: "内存卡" },
  { name: "废旧电池" },
  { name: "锂电池" },
  { name: "手机主板(安卓)" },
  { name: "手机主板(苹果)" },
  { name: "报废手机屏" },
  { name: "苹果高端原装内爆屏" },
  { name: "OLED黑白屏" },
  { name: "IPAD内爆屏" },
  { name: "国产摄像头" },
  { name: "称斤废料" },
];

const nicePhoneList = [
  { name: "apple Watch" },
  { name: "小米/红米手表" },
  { name: "荣耀手表" },
  { name: "三星手表" },
  { name: "苹果在保" },
  { name: "苹果无保" },
  { name: "华为" },
  { name: "华为旗舰" },
  { name: "荣耀" },
  { name: "荣耀其他" },
  { name: "realme" },
  { name: "OPPO" },
  { name: "VIVO" },
  { name: "iQOO" },
  { name: "小米" },
  { name: "红米/黑鲨" },
  { name: "魅族" },
  { name: "三星" },
  { name: "联想" },
  { name: "努比亚" },
];

const newPhoneList = [
  { name: "OPPO" },
  { name: "VIVO" },
  { name: "荣耀" },
  { name: "小米/红米" },
  { name: "苹果" },
  { name: "真我/realme" },
  { name: "IQOO" },
  { name: "华为" },
];

const cameraList = [
  { name: "理光相机" },
  { name: "索尼相机" },
  { name: "佳能相机" },
  { name: "尼康相机" },
  { name: "三星相机" },
  { name: "卡西欧相机" },
  { name: "富士相机" },
  { name: "奥林巴斯" },
  { name: "柯达相机" },
  { name: "松下相机" },
  { name: "宾得相机" },
  { name: "国产数码相机" },
];

const preciousMetalList = [
  { name: "钴锂" },
  { name: "稀有金属" },
  { name: "塑料" },
  { name: "贵金属" },
];

const ancientCoinList = [
  { name: "第一版纸币" },
  { name: "第二版纸币" },
  { name: "第三版纸币" },
  { name: "第四版纸币" },
  { name: "硬币" },
];

const categoryList = [
  { name: "二手手机", subList: brandList },
  { name: "电脑回收", subList: desktopList },
  { name: "杂货铺", subList: gadgetList },
  { name: "二手平板", subList: tabletList },
  {
    name: "中药材",
    subList: [
      { name: "蝉蜕" },
      { name: "鳖甲、甲鱼壳" },
      { name: "蜂房" },
      { name: "中药材" },
    ],
  },
  { name: "手机内配", subList: internalPartList },
  { name: "靓机回收报价", subList: nicePhoneList },
  { name: "新机回收报价", subList: newPhoneList },
  { name: "数码相机回收报价", subList: cameraList },
  { name: "贵金属", subList: preciousMetalList },
  { name: "古钱币", subList: ancientCoinList },
];

// Logic
const updateSubCategories = () => {
  const cat = categoryList[currentCategoryIndex.value];
  currentSubCategories.value = cat ? cat.subList : [];
  currentSubCategoryIndex.value = 0; // Reset sub cat
  updateProducts();
};

const updateProducts = () => {
  if (!currentSubCategories.value[currentSubCategoryIndex.value]) {
    productGroups.value = [];
    return;
  }
  const subName =
    currentSubCategories.value[currentSubCategoryIndex.value].name;

  // Simulate product data - Same logic as order.vue
  if (subName === "热门老年机") {
    productGroups.value = [
      {
        title: "统货回收价格",
        items: [
          { name: "功能机 (老年机) 有...", price: 11 },
          { name: "功能机 (老年机) 无...", price: 10 },
        ],
      },
      {
        title: "非统货回收价格",
        items: [
          { name: "翻盖老款机 (称斤杂...", price: 200 },
          { name: "两成以上翻盖机 (称...", price: 90 },
          { name: "直板机 (称斤杂机)", price: 75 },
          { name: "双卡大屏机", price: 8.1 },
        ],
      },
      {
        title: "挑货老年机回收价",
        items: [
          { name: "老款5110系列", price: 35 },
          { name: "老款翻盖系列", price: 26 },
          { name: "老款低档诺基亚系列", price: 19 },
          { name: "老款低档诺基亚n70、...", price: 29 },
          { name: "老款低档诺基亚摩托v...", price: 29 },
          { name: "老款摩多罗拉大哥大", price: 70 },
        ],
      },
      {
        title: "保千里",
        items: [{ name: "保千里打令VR至尊版", price: 1999 }],
      },
      {
        title: "TCL热门机型",
        items: [{ name: "TCL999d", price: 1666 }],
      },
      {
        title: "双小卡老年机挑货",
        items: [
          { name: "双小卡老年机挑货", price: 12 },
          { name: "双小卡老年机通点", price: 11 },
        ],
      },
      {
        title: "其他",
        items: [],
      },
    ];
  } else if (subName === "点数cpu") {
    productGroups.value = [
      {
        title: "点数cpu",
        items: [
          { name: "intel", price: 4 },
          { name: "AMD全针", price: 9 },
          { name: "AMD半针", price: 4 },
          { name: "AMD无针", price: 10 },
          { name: "775 针", price: 15 },
        ],
      },
    ];
  } else if (subName === "儿童手表") {
    productGroups.value = [
      {
        title: "小天才",
        items: [
          { name: "小天才Z10", price: 240 },
          { name: "小天才Z9", price: 180 },
          { name: "小天才Z8", price: 128 },
          { name: "小天才Z7", price: 80 },
          { name: "小天才Z6巅峰版", price: 80 },
          { name: "小天才Z6", price: 24 },
          { name: "小天才Z5", price: 24 },
          { name: "小天才Z3", price: 8 },
          { name: "小天才Z2", price: 16 },
          { name: "小天才D2", price: 16 },
        ],
      },
      {
        title: "华为",
        items: [
          { name: "华为3pro", price: 16 },
          { name: "华为3x3c", price: 8 },
          { name: "华为4x", price: 56 },
        ],
      },
    ];
  } else if (subName === "杂牌平板") {
    productGroups.value = [
      {
        title: "杂牌平板",
        items: [
          { name: "10.1金边", price: 25 },
          { name: "9.6金边", price: 13 },
          { name: "9寸学习机", price: 10 },
          { name: "9寸平板", price: 20 },
          { name: "8.9寸", price: 7 },
          { name: "7寸平板", price: 13 },
        ],
      },
      {
        title: "车载导航",
        items: [
          { name: "杂牌导航 (7寸以上)", price: 10 },
          { name: "杂屏", price: 7 },
        ],
      },
      {
        title: "其他",
        items: [],
      },
    ];
  } else if (subName === "蝉蜕") {
    productGroups.value = [
      {
        title: "蝉",
        items: [
          { name: "2号蝉", price: 130 },
          { name: "金蝉衣", price: 130 },
          { name: "蝉蜕淤地", price: 200 },
          { name: "蝉蜕沙地", price: 270 },
          { name: "蝉蜕水洗", price: 400 },
          { name: "蝉蜕/小蝉蜕", price: 20 },
        ],
      },
      {
        title: "其他",
        items: [],
      },
    ];
  } else {
    // Default empty for other sub categories to avoid errors
    productGroups.value = [];
  }
};

const onCategoryChange = (index: number) => {
  currentCategoryIndex.value = index;
  updateSubCategories();
};

const onSubCategoryChange = (index: number) => {
  currentSubCategoryIndex.value = index;
  updateProducts();
};

const loadCart = () => {
  cartList.value = uni.getStorageSync("cartView") || [];
};

onMounted(() => {
  updateSubCategories();
  loadCart();
});

onShow(() => {
  loadCart(); // 页面显示时重新加载购物车
});
</script>

<style lang="scss" scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Bottom Sheet */
}

.modal-content {
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out; /* Animation */
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  padding: 15px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  position: relative;
  border-bottom: 1px solid #f5f5f5;

  .close-btn {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 20px;
    color: #999;
    line-height: 1;
  }
}

.modal-body {
  padding: 20px;
}

.modal-img-box {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  .modal-img {
    width: 200px;
    height: 200px;
    background-color: #f9f9f9;
  }
}

.modal-info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 12px;

  .grade-label {
    color: #fff;
    background-color: #ff2d2d;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
  }

  .history-link {
    color: #ff2d2d;
  }
}

.input-section {
  .price-info {
    margin-bottom: 15px;
    .price-title {
      font-size: 16px;
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }
    .price-val {
      font-size: 14px;
      color: #666;
      .red {
        color: #ff2d2d;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .stepper {
    display: flex;
    align-items: center;
    justify-content: flex-end; /* Align right as per screenshot logic usually? Actually screenshot shows it below? No, screenshot shows text left, stepper right or separate? Screenshot: "输入数量" (header), then "价格..." and stepper usually alongside. But here I put them stacked or row. Let's make stepper row aligned right or float. */

    /* Revisiting screenshot: 
       "输入数量" is a bold title.
       Then "价格 回收价..." is left.
       Stepper is right.
    */
  }
}

/* Adjusting structure to match screenshot better */
.input-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid #f5f5f5;
  padding-top: 15px;
}
.stepper {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;

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
    font-size: 16px;
    color: #333;
  }
}

.modal-footer {
  display: flex;
  height: 50px;
  border-top: 1px solid #eee;

  .footer-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    &.close {
      color: #999;
      background-color: #fff;
    }
    &.cart-link {
      color: #ff2d2d;
      background-color: #fff;
      border-left: 1px solid #eee;
    }
    &.add-cart {
      background-color: #ff2d2d;
      color: #fff;
      flex: 1.5; /* Larger */
    }
  }
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

/* Search Box */
.search-box {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;

  .search-label {
    font-size: 16px;
    font-weight: bold;
    margin-right: 15px;
    color: #333;
  }

  .search-input-wrapper {
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 18px;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    .search-icon {
      margin-right: 5px;
      color: #999;
    }

    .search-input {
      flex: 1;
      font-size: 14px;
      color: #333;
    }
  }
}

/* Category Horizontal Scroll */
.category-scroll {
  white-space: nowrap;
  border-bottom: 1px solid #f5f5f5;
  height: 44px;

  .category-row {
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    position: relative;
  }

  .category-tab {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    color: #666;
    height: 100%;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
    flex-shrink: 0;

    &.active {
      font-weight: bold;
      color: #333;
    }
  }

  .active-bar {
    position: absolute;
    bottom: 2px;
    width: 20px;
    height: 3px;
    background-color: #ff2d2d;
    border-radius: 3px;
    transition: left 0.3s;
    /* This simple calculation needs more robust logic for variable width tabs, 
       but suffices for fixed or similar width items */
    transform: translateX(-50%);
  }
}

/* Main Content Split */
.main-content-split {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Left Sidebar */
.left-sidebar {
  width: 100px;
  background-color: #f7f8fa;
  height: 100%;

  .sidebar-item {
    padding: 15px 10px;
    text-align: center;
    font-size: 13px;
    color: #666;
    border-left: 3px solid transparent;

    &.active {
      background-color: #fff;
      color: #ff2d2d;
      font-weight: bold;
      border-left-color: #ff2d2d;
    }
  }
}

/* Right Content */
.right-list {
  flex: 1;
  background-color: #fff;
  height: 100%;
  padding: 10px;

  .list-banner {
    background-color: #fffbf0;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .banner-hint {
      font-size: 12px;
      color: #333;
    }

    .banner-link {
      font-size: 12px;
      color: #ff2d2d;
      border: 1px solid #ff2d2d;
      border-radius: 12px;
      padding: 2px 8px;
      background-color: #fff;
    }
  }

  .prod-group {
    margin-bottom: 20px;

    .group-title {
      font-size: 15px;
      font-weight: bold;
      color: #ff2d2d;
      margin-bottom: 10px;
    }

    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .prod-info {
        display: flex;
        align-items: center;
        flex: 1;

        .prod-indicator {
          font-size: 12px;
          color: #ddd;
          margin-right: 8px;
        }

        .prod-name {
          font-size: 14px;
          color: #333;
        }
      }

      .prod-price-col {
        text-align: right;
        min-width: 70px;
        position: relative; /* For badge */

        .price-val {
          display: block;
          font-size: 14px;
          color: #ff2d2d;
          font-weight: bold;
        }

        .price-label {
          display: block;
          font-size: 10px;
          color: #999;
        }
      }
    }
  }

  .empty-products {
    text-align: center;
    padding: 50px 0;
    color: #999;
    font-size: 14px;
  }
}

/* Floating Cart */
.floating-cart {
  position: fixed;
  right: 20px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;

  .cart-icon-box {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .cart-icon {
      font-size: 24px;
      color: #ff2d2d; /* Red cart as per image */
    }

    .cart-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background-color: #ff2d2d;
      color: #fff;
      font-size: 10px;
      min-width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 8px;
    }
  }

  .cart-text {
    font-size: 10px;
    color: #999;
    margin-top: 5px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2px 4px;
    border-radius: 4px;
  }
}

/* Fly Animation Ball */
.fly-ball {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #ff2d2d;
  border-radius: 50%;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: none;
}

/* Product Badge */
.prod-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff2d2d;
  color: #fff;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  /* Since it's inside .prod-price-col which is relative or flex child, 
       ensure .prod-price-col implies positioning text-align right. 
       Let's just put it absolute to top right of container */
}

/* End Badge */
</style>
