// source/js/sidebar-clock.js
class SidebarClock {
  constructor() {
    this.clockElement = null;
    this.init();
  }

  init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createClock());
    } else {
      this.createClock();
    }
  }

  createClock() {
    // 查找侧边栏位置
    const sidebar = document.querySelector('.sidebar-inner');
    if (!sidebar) {
      console.warn('Sidebar not found');
      return;
    }

    // 创建时钟容器
    this.clockElement = document.createElement('div');
    this.clockElement.id = 'sidebar-digital-clock';
    this.clockElement.className = 'site-overview-item';

    // 插入到侧边栏顶部
    sidebar.insertBefore(this.clockElement, sidebar.firstChild);

    // 立即显示并开始更新
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    if (!this.clockElement) return;

    const now = new Date();

    // 格式化时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 格式化日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];

    this.clockElement.innerHTML = `
            <div class="clock-container">
                <div class="clock-time">${hours}:${minutes}:${seconds}</div>
                <div class="clock-date">${year}-${month}-${day}</div>
                <div class="clock-weekday">${weekday}</div>
            </div>
        `;
  }
}

// 初始化时钟
new SidebarClock();