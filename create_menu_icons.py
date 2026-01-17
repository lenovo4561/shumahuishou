#!/usr/bin/env python3
"""创建缺失的 menuItems 图标"""

from PIL import Image, ImageDraw, ImageFont
import os

# 图标配置
icons = [
    ('hd_icon.png', '#ff2d2d', '特惠'),  # 活动图标
    ('cost.png', '#ff8800', '拍照'),     # 相机图标  
    ('ID_icon.png', '#00aa00', 'ID'),   # ID查询图标
]

# 图标路径
img_dir = 'src/static/img'
size = 60  # 图标大小

for icon_name, color, text in icons:
    # 创建图片
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    if 'hd_icon' in icon_name:
        # 活动图标 - 星形/礼物
        # 绘制一个简单的礼盒形状
        box_size = 40
        x = (size - box_size) // 2
        y = (size - box_size) // 2
        # 盒子
        draw.rectangle([x, y+10, x+box_size, y+box_size], fill=color)
        # 丝带
        draw.rectangle([x+box_size//2-3, y, x+box_size//2+3, y+box_size], fill='#ffaa00')
        draw.rectangle([x, y+box_size//2-3, x+box_size, y+box_size//2+3], fill='#ffaa00')
        
    elif 'cost' in icon_name:
        # 相机图标
        # 相机机身
        cam_w, cam_h = 45, 35
        x = (size - cam_w) // 2
        y = (size - cam_h) // 2 + 5
        draw.rounded_rectangle([x, y, x+cam_w, y+cam_h], radius=5, fill=color)
        # 镜头
        lens_r = 12
        lens_x = size // 2
        lens_y = y + cam_h // 2
        draw.ellipse([lens_x-lens_r, lens_y-lens_r, lens_x+lens_r, lens_y+lens_r], fill='#333333')
        draw.ellipse([lens_x-lens_r+4, lens_y-lens_r+4, lens_x+lens_r-4, lens_y+lens_r-4], fill='#666666')
        # 闪光灯
        draw.rectangle([x+5, y-8, x+15, y-2], fill='#ffff00')
        
    elif 'ID_icon' in icon_name:
        # ID卡图标
        card_w, card_h = 45, 32
        x = (size - card_w) // 2
        y = (size - card_h) // 2
        # 卡片
        draw.rounded_rectangle([x, y, x+card_w, y+card_h], radius=3, fill=color)
        # ID 文字背景
        draw.rectangle([x+5, y+5, x+15, y+15], fill='white')
        # 横线
        draw.line([x+18, y+7, x+40, y+7], fill='white', width=2)
        draw.line([x+18, y+12, x+40, y+12], fill='white', width=2)
        draw.line([x+5, y+20, x+40, y+20], fill='white', width=2)
        draw.line([x+5, y+25, x+35, y+25], fill='white', width=2)
    
    # 保存
    output_path = os.path.join(img_dir, icon_name)
    img.save(output_path, 'PNG')
    print(f'创建: {output_path}')

print('\n✅ 所有缺失的图标创建成功！')
