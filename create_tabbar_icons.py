#!/usr/bin/env python3
"""创建小程序 tabBar 图标 (PNG格式)"""

try:
    from PIL import Image, ImageDraw
    import os
    
    # 图标配置
    icons = [
        ('home.png', '#999999'),
        ('home-active.png', '#07c160'),
        ('order.png', '#999999'),
        ('order-active.png', '#07c160'),
        ('cart.png', '#999999'),
        ('cart-active.png', '#07c160'),
        ('mine.png', '#999999'),
        ('mine-active.png', '#07c160'),
    ]
    
    # 图标路径
    tabbar_dir = 'src/static/tabbar'
    size = 81  # 微信小程序推荐 81x81
    
    for icon_name, color in icons:
        # 创建图片
        img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
        draw = ImageDraw.Draw(img)
        
        # 根据不同图标绘制简单图形
        padding = 15
        
        if 'home' in icon_name:
            # 首页图标 - 房子形状
            points = [
                (size//2, padding),  # 顶部
                (size-padding, size//2),  # 右上
                (size-padding, size-padding),  # 右下
                (padding, size-padding),  # 左下
                (padding, size//2),  # 左上
            ]
            draw.polygon(points, fill=color)
            # 门
            door_w, door_h = 20, 25
            door_x = (size - door_w) // 2
            door_y = size - padding - door_h
            draw.rectangle([door_x, door_y, door_x+door_w, door_y+door_h], fill='white')
            
        elif 'order' in icon_name:
            # 下单图标 - 文档形状
            draw.rectangle([padding, padding, size-padding, size-padding], outline=color, width=4, fill=None)
            # 横线
            for i in range(3):
                y = padding + 15 + i*15
                draw.line([padding+10, y, size-padding-10, y], fill=color, width=3)
                
        elif 'cart' in icon_name:
            # 购物车图标 - 简化的购物车
            draw.arc([padding, padding, size-padding, size-padding-15], 180, 360, fill=color, width=4)
            # 轮子
            wheel_r = 5
            draw.ellipse([padding+10-wheel_r, size-padding-wheel_r, padding+10+wheel_r, size-padding+wheel_r], fill=color)
            draw.ellipse([size-padding-10-wheel_r, size-padding-wheel_r, size-padding-10+wheel_r, size-padding+wheel_r], fill=color)
            
        elif 'mine' in icon_name:
            # 我的图标 - 人形
            # 头
            head_r = 12
            draw.ellipse([size//2-head_r, padding+5, size//2+head_r, padding+5+head_r*2], fill=color)
            # 身体
            body_top = padding + 5 + head_r*2 + 5
            draw.ellipse([padding+10, body_top, size-padding-10, size-padding], fill=color)
        
        # 保存
        output_path = os.path.join(tabbar_dir, icon_name)
        img.save(output_path, 'PNG')
        print(f'创建: {output_path}')
    
    print('\n✅ 所有 tabBar 图标创建成功！')
    
except ImportError:
    print('❌ 需要安装 Pillow 库')
    print('请运行: pip3 install Pillow')
except Exception as e:
    print(f'❌ 错误: {e}')
