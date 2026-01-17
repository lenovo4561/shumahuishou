<template>
  <view class="container">
    <!-- Feedback Types -->
    <view class="type-section">
      <view 
        class="type-tag" 
        v-for="(item, index) in feedbackTypes" 
        :key="index"
        :class="{ active: currentType === index }"
        @click="selectType(index)"
      >
        {{ item }}
      </view>
    </view>

    <!-- Feedback Content -->
    <view class="content-section">
      <view class="input-area">
        <textarea 
          class="feedback-textarea" 
          placeholder="请详细输入您所遇到的问题或者服务,便于我们为您服务。" 
          placeholder-class="placeholder-style"
          maxlength="500"
          v-model="content"
        ></textarea>
        
        <!-- Image Upload -->
        <view class="upload-box" @click="chooseImage">
          <view v-if="tempImage" class="image-preview-wrapper">
             <image :src="tempImage" mode="aspectFill" class="preview-image"></image>
             <view class="remove-btn" @click.stop="removeImage">×</view>
          </view>
          <view v-else class="upload-placeholder">
            <text class="uni-icon icon-camera">📷</text>
            <text class="upload-text">上传图片</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Submit Button -->
    <view class="footer-btn">
      <button class="submit-btn" :class="{ active: canSubmit }" @click="submitForm">提交</button>
    </view>
    <view class="safe-area-bottom"></view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const feedbackTypes = [
  "投诉问题", "功能异常", "体验问题", "新功能建议", "其它原因"
];

const currentType = ref(0);
const content = ref('');
const tempImage = ref('');

const selectType = (index: number) => {
  currentType.value = index;
};

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      tempImage.value = res.tempFilePaths[0];
    }
  });
};

const removeImage = () => {
    tempImage.value = '';
}

const canSubmit = computed(() => {
    // Simple validation: type selected (always true default 0) and content not empty? 
    // Screenshot shows button is grey, maybe implying disabled or just style. 
    // I'll make it clickable but styled grey if empty, or just style matches image.
    // The image shows a grey button "提交".
    return content.value.length > 0;
});

const submitForm = () => {
  if (!content.value) {
    uni.showToast({ title: '请输入问题描述', icon: 'none' });
    return;
  }
  
  // Submit logic simulation
  uni.showLoading({ title: '提交中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '提交成功', icon: 'success' });
    setTimeout(() => {
        uni.navigateBack();
    }, 1500);
  }, 1000);
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f7;
  display: flex;
  flex-direction: column;
}

/* Feedback Types */
.type-section {
  background-color: #fff;
  padding: 15px 15px 5px 15px;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #f0f0f0;
}

.type-tag {
  padding: 6px 12px;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
.type-tag.active {
  border-color: #ff4d4f; /* Assuming active color, though image doesn't show active state clearly, it has multiple tags. Default to first? or none? Screenshot shows none obviously highlighed or maybe '投诉问题' isn't highlighted. I'll stick to a subtle active state or user clicked one. */
  color: #ff4d4f;
  background-color: #fff0f0;
}

/* Content Section */
.content-section {
  padding: 15px;
}

.input-area {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  min-height: 250px;
}

.feedback-textarea {
  width: 100%;
  height: 120px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
}
.placeholder-style {
  color: #999;
}

/* Upload */
.upload-box {
  width: 80px;
  height: 80px;
  background-color: #f5f5f7;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
}

.upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.icon-camera {
  font-size: 24px;
  margin-bottom: 5px;
}

.upload-text {
  font-size: 12px;
}

.image-preview-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.preview-image {
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
.remove-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,0.5);
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
}

/* Footer */
.footer-btn {
  margin-top: auto;
  padding: 15px 20px;
  background-color: #fff;
  padding-bottom: calc(15px + constant(safe-area-inset-bottom));
  padding-bottom: calc(15px + env(safe-area-inset-bottom));
}

.submit-btn {
  background-color: #ccc; /* Disabled grey as shown */
  color: #fff;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  border: none;
}
.submit-btn.active {
    background-color: #ff4d4f; /* Active Red */
}

</style>
