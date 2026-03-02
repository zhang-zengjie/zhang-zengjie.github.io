// js/markdown-loader.js
class MarkdownLoader {
  constructor(config = {}) {
    this.contentContainerId = config.contentContainerId || 'markdown-content';
    this.listContainerId = config.listContainerId || 'markdown-list';
    this.indexUrl = config.indexUrl || 'index.json';
    this.contentType = config.contentType || 'blog';
    this.enableMath = config.enableMath !== false; // 默认启用数学公式
    
    // 绑定方法
    this.init = this.init.bind(this);
    this.getQueryParam = this.getQueryParam.bind(this);
    this.loadIndex = this.loadIndex.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderMath = this.renderMath.bind(this);
  }

  // 新增：渲染数学公式的方法
  renderMath(element) {
    if (!this.enableMath || typeof renderMathInElement !== 'function') return;
    
    try {
      renderMathInElement(element, {
        delimiters: [
          {left: '$$', right: '$$', display: true},   // 块级公式
          {left: '$', right: '$', display: false},    // 行内公式
          {left: '\\(', right: '\\)', display: false}, // LaTeX行内
          {left: '\\[', right: '\\]', display: true}   // LaTeX块级
        ],
        throwOnError: false,  // 出错时不中断
        output: 'html'        // 输出格式
      });
    } catch (error) {
      console.warn('Math rendering error:', error);
    }
  }

  getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  async loadIndex() {
    const res = await fetch(this.indexUrl);
    return await res.json();
  }

  async loadMarkdown(file) {
    const res = await fetch(file);
    return await res.text();
  }

  renderList(entries) {
    const listEl = document.getElementById(this.listContainerId);
    if (!listEl) return;
    
    listEl.innerHTML = '';
    listEl.style.display = ''; // 确保列表可见
    
    entries.forEach(entry => {
      const li = document.createElement('li');
      li.onclick = () => {
        window.location.search = `?${this.contentType}Id=${entry.id}`;
      };

      const titleDiv = document.createElement('div');
      titleDiv.className = `${this.contentType}-title`;
      titleDiv.textContent = entry.title;

      const dateDiv = document.createElement('div');
      dateDiv.className = `${this.contentType}-date`;
      dateDiv.textContent = entry.date;

      li.appendChild(titleDiv);
      li.appendChild(dateDiv);
      listEl.appendChild(li);
    });
  }

  async renderContent(entry) {
    const contentEl = document.getElementById(this.contentContainerId);
    const listEl = document.getElementById(this.listContainerId);
    
    if (!contentEl) return;
    
    const md = await this.loadMarkdown(entry.file);
    
    if (listEl) listEl.style.display = 'none';
    
    // 1. 先渲染Markdown
    contentEl.innerHTML = `
      <h1>${entry.title}</h1>
      <div class="meta">${entry.date}</div>
      <div class="article-content">
      ${marked.parse(md)}
      </div>
    `;
    
    // 2. 再渲染数学公式（关键步骤）
    const articleContent = contentEl.querySelector('.article-content');
    if (articleContent) {
      this.renderMath(articleContent);
    }
  }

  async init() {
    try {
      const index = await this.loadIndex();
      const contentId = this.getQueryParam(`${this.contentType}Id`);
      
      if (!contentId) {
        this.renderList(index);
      } else {
        const entry = index.find(e => e.id === contentId);
        if (entry) {
          await this.renderContent(entry);
        }
      }
    } catch (error) {
      console.error('MarkdownLoader error:', error);
    }
  }
}