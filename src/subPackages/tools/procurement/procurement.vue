<template>
  <view class="container">
    <view class="form-content">
      <!-- Description Section -->
      <view class="section">
        <view class="section-title">
          <text class="title-text">采购描述</text>
          <text class="required">(必填)</text>
        </view>
        <view class="textarea-wrapper">
          <textarea 
            class="desc-textarea" 
            placeholder-class="placeholder-style"
            :placeholder="placeholderText"
            maxlength="-1"
            v-model="formData.description"
          ></textarea>
        </view>
      </view>

      <!-- Input Fields -->
      <view class="input-group">
        <view class="input-item">
          <text class="label">采购价格</text>
          <input 
            class="input" 
            placeholder="请输入您的采购价格" 
            placeholder-class="input-placeholder"
            v-model="formData.price"
          />
        </view>
        <view class="input-item">
          <text class="label">您的称呼</text>
          <input 
            class="input" 
            placeholder="请输入您的称呼" 
            placeholder-class="input-placeholder"
            v-model="formData.name"
          />
        </view>
        <view class="input-item">
          <text class="label">联系方式</text>
          <input 
            class="input" 
            type="number"
            placeholder="请输入您的联系电话" 
            placeholder-class="input-placeholder"
            v-model="formData.contact"
          />
        </view>
      </view>

      <!-- Helper Text -->
      <view class="helper-text">
        <view>采购描述格式：</view>
        <view>品牌+型号+机器等级+数量+价格</view>
      </view>
    </view>

    <!-- Submit Button -->
    <view class="footer-btn">
      <button class="submit-btn" @click="submitForm">提交</button>
    </view>
    <view class="safe-area-bottom"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const placeholderText = '请输入您的采购需求\n\n格式：品牌+型号+机器等级+数量+价格\n\n例如：1、品牌+型号+机器等级+数量+价格\n      2、VIVO X20 等级A 100台 1000元';

const formData = ref({
  description: '',
  price: '',
  name: '',
  contact: ''
});

const submitForm = () => {
  if (!formData.value.description) {
    uni.showToast({ title: '请输入采购描述', icon: 'none' });
    return;
  }
  if (!formData.value.price) {
    uni.showToast({ title: '请输入采购价格', icon: 'none' });
    return;
  }
  if (!formData.value.name) {
    uni.showToast({ title: '请输入您的称呼', icon: 'none' });
    return;
  }
  if (!formData.value.contact) {
    uni.showToast({ title: '请输入联系方式', icon: 'none' });
    return;
  }
  
  // Submit logic here
  console.log('Submitting:', formData.value);
  uni.showToast({ title: '提交成功', icon: 'success' });
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f7;
  display: flex;
  flex-direction: column;
}

.form-content {
  flex: 1;
  padding: 15px;
}

/* Section */
.section {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.section-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.required {
  color: #999;
  font-size: 14px;
  font-weight: normal;
  margin-left: 5px;
}

.textarea-wrapper {
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 12px;
}

.desc-textarea {
  width: 100%;
  height: 160px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.placeholder-style {
  color: #999;
}

/* Input Group */
.input-group {
  background-color: #fff;
  border-radius: 8px;
  padding: 0 15px;
  margin-bottom: 20px;
}

.input-item {
  display: flex;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #f5f5f5;
}
.input-item:last-child {
  border-bottom: none;
}

.label {
  width: 80px;
  font-size: 15px;
  color: #333; /* Slightly darker/bolder per design */
  font-weight: 500;
}

.input {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.input-placeholder {
  color: #999;
}

/* Helper Text */
.helper-text {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  padding: 0 5px;
}

/* Footer Button */
.footer-btn {
  padding: 15px 20px;
  background-color: #fff;
  padding-bottom: calc(15px + constant(safe-area-inset-bottom));
  padding-bottom: calc(15px + env(safe-area-inset-bottom));
}

.submit-btn {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  border: none;
}
</style>
