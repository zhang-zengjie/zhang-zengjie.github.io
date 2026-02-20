import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse

# -----------------------------
# 1. 定义语义 scenario 空间 (抽象 2D)
# -----------------------------
x = np.linspace(0, 10, 200)
y = np.linspace(0, 10, 200)
X, Y = np.meshgrid(x, y)

# -----------------------------
# 2. 安全边界（由 formal methods 定义）
# -----------------------------
# 这里用一个非线性曲线表示边界
boundary_y = 8 - 0.5 * (x - 5)**2 + 0.2 * np.sin(3*(x-5))  # 曲折边界

# -----------------------------
# 3. 离散 scenario 点
# -----------------------------
np.random.seed(42)
# 传统枚举/AI生成的随机点
traditional_x = np.random.uniform(1, 9, 30)
traditional_y = np.random.uniform(1, 7, 30)

# Formal-method guided sampling: 沿边界或高风险区域
fm_x = np.linspace(2, 8, 20)
fm_y = 8 - 0.5 * (fm_x - 5)**2 + 0.2 * np.sin(3*(fm_x-5)) + np.random.normal(0, 0.2, len(fm_x))

# -----------------------------
# 4. 潜在违规高亮区域
# -----------------------------
violation_region = Ellipse((5, 7.5), width=3, height=1.2, angle=0,
                           color='red', alpha=0.3, label='Potential Safety Violation')

# -----------------------------
# 5. 绘图
# -----------------------------
fig, ax = plt.subplots(figsize=(8,6))

# 绘制 formal methods 定义的边界
ax.plot(x, boundary_y, color='black', linewidth=2, label='Formal Safety Boundary')

# 绘制 scenario 点
ax.scatter(traditional_x, traditional_y, color='blue', label='Enumerated / AI Scenarios', alpha=0.7)
ax.scatter(fm_x, fm_y, color='orange', label='Formal-Method-guided Scenarios', alpha=0.9, edgecolors='k')

# 绘制潜在违规区域
ax.add_patch(violation_region)

# 坐标和标题
ax.set_xlabel('Ego-NPC Interaction Intensity')
ax.set_ylabel('Behavioral Aggressiveness')
ax.set_title('Formal Methods in Semantic Scenario Space')
ax.legend(loc='upper right')

# 调整边界显示
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)

plt.tight_layout()
plt.show()
