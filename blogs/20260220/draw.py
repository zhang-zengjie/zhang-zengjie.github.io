import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse

# -----------------------------
# 1. 定义状态空间（抽象）
# -----------------------------
x = np.linspace(0, 10, 200)  # e.g., relative distance
y = np.linspace(0, 10, 200)  # e.g., relative velocity
X, Y = np.meshgrid(x, y)

# -----------------------------
# 2. 安全边界（示意性曲线）
# -----------------------------
# 用一个非线性边界表示碰撞或安全约束
boundary_y = 8 - 0.5 * (x - 5)**2  # 简单抛物线

# -----------------------------
# 3. 离散 scenario 点
# -----------------------------
np.random.seed(42)
# traditional enumerated points (more sparse)
traditional_x = np.random.uniform(1, 9, 30)
traditional_y = np.random.uniform(1, 7, 30)

# AI-generated points (biased toward center, still sparse near boundaries)
ai_x = np.random.normal(5, 1.5, 50)
ai_y = np.random.normal(4, 1.5, 50)

# -----------------------------
# 4. 高亮潜在违规区域
# -----------------------------
# 用椭圆表示边界附近可能出现的安全违规
violation_region = Ellipse((5, 7.5), width=3, height=1.2, angle=0,
                           color='red', alpha=0.3, label='Potential Safety Violation')

# -----------------------------
# 5. 绘图
# -----------------------------
fig, ax = plt.subplots(figsize=(8,6))

# 绘制边界
ax.plot(x, boundary_y, color='black', linewidth=2, label='Safety Boundary')

# 绘制 scenario 点
ax.scatter(traditional_x, traditional_y, color='blue', label='Enumerated Scenarios', alpha=0.7)
ax.scatter(ai_x, ai_y, color='green', label='AI-Generated Scenarios', alpha=0.7)

# 绘制潜在违规区域
ax.add_patch(violation_region)

# 坐标和标题
ax.set_xlabel('Relative Distance')
ax.set_ylabel('Relative Velocity')
ax.set_title('Scenario Enumeration vs. Safety Boundary Exploration')
ax.legend(loc='upper right')

# 调整边界显示
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)

plt.tight_layout()
plt.show()
