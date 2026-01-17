<template>
  <view class="container">
    <view class="warning-bar">
      <view class="warning-icon">!</view>
      <text>请完整填写您的收货信息</text>
    </view>
    
    <view class="form-group">
      <view class="form-item">
        <text class="label">收件人</text>
        <input class="input" type="text" placeholder="请输入您的真实姓名" v-model="form.name" placeholder-class="placeholder" />
      </view>
      
      <view class="form-item">
        <text class="label">联系电话</text>
        <input class="input" type="number" maxlength="11" placeholder="请输入您的手机号" v-model="form.phone" placeholder-class="placeholder" />
      </view>
      
      <view class="form-item">
        <text class="label">所在地区</text>
        <picker mode="region" @change="onRegionChange" :value="form.region">
           <view class="picker-view" :class="{'empty': !form.regionStr}">
             <text>{{ form.regionStr || '请选择所在地区' }}</text>
             <text class="arrow">></text>
           </view>
        </picker>
      </view>
      
      <view class="form-item no-border">
        <text class="label">详细地址</text>
        <input class="input" type="text" placeholder="请输入详细地址" v-model="form.detail" placeholder-class="placeholder" />
      </view>
    </view>
    
    <view class="footer-btn">
      <button class="save-btn" @click="saveAddress">保存</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const form = reactive({
  id: '',
  name: '',
  phone: '',
  region: [] as string[],
  regionStr: '',
  detail: ''
});

onLoad((options: any) => {
    if (options.id) {
        uni.setNavigationBarTitle({ title: '编辑邮寄地址' });
        const stored = uni.getStorageSync('addressList');
        if (stored) {
            const list = JSON.parse(stored);
            const item = list.find((i: any) => i.id == options.id);
            if (item) {
                form.id = item.id;
                form.name = item.name;
                form.phone = item.phone;
                form.regionStr = item.region; // Assuming stored as string or check structure
                form.detail = item.detail;
                // reconstruct region array if needed, but simple string is easier for now
            }
        }
    }
});

const onRegionChange = (e: any) => {
  form.region = e.detail.value;
  form.regionStr = form.region.join(' ');
};

const saveAddress = () => {
    if(!form.name.trim()) {
        uni.showToast({ title: '请输入收件人姓名', icon: 'none' });
        return;
    }
    if(!form.phone.trim()) {
        uni.showToast({ title: '请输入手机号', icon: 'none' });
        return;
    }
    if(!/^1[3-9]\d{9}$/.test(form.phone)) {
        uni.showToast({ title: '手机号格式不正确', icon: 'none' });
        return;
    }
    if(!form.regionStr) {
        uni.showToast({ title: '请选择所在地区', icon: 'none' });
        return;
    }
    if(!form.detail.trim()) {
        uni.showToast({ title: '请输入详细地址', icon: 'none' });
        return;
    }

    let list = [];
    const stored = uni.getStorageSync('addressList');
    if (stored) {
        list = JSON.parse(stored);
    }

    if (form.id) {
        // Update
        const index = list.findIndex((i: any) => i.id == form.id);
        if (index > -1) {
            list[index] = {
                ...list[index],
                name: form.name,
                phone: form.phone,
                region: form.regionStr,
                detail: form.detail
            };
        }
    } else {
        // Add
        list.push({
            id: Date.now().toString(),
            name: form.name,
            phone: form.phone,
            region: form.regionStr,
            detail: form.detail,
            isDefault: list.length === 0 // First one is default
        });
    }

    uni.setStorageSync('addressList', JSON.stringify(list));

    uni.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => {
        uni.navigateBack();
    }, 1500);
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.warning-bar {
  background-color: #fdf5e6;
  color: #faad14; 
  padding: 20rpx 30rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  
  .warning-icon {
     margin-right: 14rpx;
     border: 1px solid #faad14;
     border-radius: 50%;
     width: 28rpx;
     height: 28rpx;
     text-align: center;
     line-height: 24rpx;
     font-size: 20rpx;
     font-weight: bold;
  }
}

.form-group {
    background-color: #fff;
    padding: 0 30rpx;
}

.form-item {
    display: flex;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1px solid #eee;
    
    &.no-border {
        border-bottom: none;
    }
    
    .label {
        width: 180rpx;
        font-size: 30rpx;
        color: #333;
        font-weight: bold;
    }
    
    .input {
        flex: 1;
        font-size: 30rpx;
        color: #333;
    }
    
    picker {
        flex: 1;
    }
    
    .picker-view {
        font-size: 30rpx;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        
        &.empty {
            color: #999;
        }
        
        .arrow {
            color: #ccc;
            margin-left: 10rpx;
        }
    }
}

.footer-btn {
  margin-top: 60rpx;
  padding: 0 40rpx;
  
  .save-btn {
    background-color: #ff3333;
    color: #fff;
    border-radius: 45rpx;
    font-size: 32rpx;
    height: 88rpx;
    line-height: 88rpx;
    border: none;
    &::after { border: none; }
  }
}

.placeholder {
    color: #ccc;
}
</style>
