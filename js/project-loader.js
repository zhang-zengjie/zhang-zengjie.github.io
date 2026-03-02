// js/project-loader.js
class ProjectLoader extends MarkdownLoader {
  constructor() {
    super({
      indexUrl: 'projects/index.json',
      enableMath: true
    });
  }

  // 加载所有项目并渲染
  async loadAndRenderAllProjects() {
    try {
      const projects = await this.loadIndex();
      const container = document.getElementById('projects-container');
      
      if (!container) return;
      
      container.innerHTML = '';
      
      for (const project of projects) {
        const projectEl = await this.renderProjectCard(project);
        container.appendChild(projectEl);
      }
      
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  // 渲染单个项目卡片
  async renderProjectCard(project) {
    const md = await this.loadMarkdown(project.file);
    
    // 创建项目卡片容器
    const card = document.createElement('div');
    card.className = 'project';
    card.dataset.projectId = project.id;
    
    // 标题
    const title = document.createElement('div');
    title.className = 'project-title';
    title.textContent = project.title;
    card.appendChild(title);
    
    // 描述包装器（用于渐变和展开/收起）
    const descWrapper = document.createElement('div');
    descWrapper.className = 'project-description-wrapper';
    
    const desc = document.createElement('div');
    desc.className = 'project-description';
    desc.innerHTML = marked.parse(md);
    descWrapper.appendChild(desc);
    card.appendChild(descWrapper);
    
    // 展开/收起按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-button';
    toggleBtn.textContent = 'Expand';
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      const isExpanded = descWrapper.classList.contains('expanded');
      
      if (isExpanded) {
        descWrapper.classList.remove('expanded');
        toggleBtn.textContent = 'Collapse';
      } else {
        descWrapper.classList.add('expanded');
        toggleBtn.textContent = 'Collapse';
      }
    };
    card.appendChild(toggleBtn);
    
    // 项目链接
    if (project.links) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'project-links';
      linksDiv.innerHTML = this.generateLinksHtml(project.links);
      card.appendChild(linksDiv);
    }
    
    // 渲染数学公式（如果有）
    if (this.enableMath) {
      this.renderMath(desc);
    }
    
    return card;
  }

  generateLinksHtml(links) {
    const linkItems = [];
    
    if (links.code) {
      linkItems.push(`[ <a href="${links.code}" target="_blank">Code</a> ]`);
    }
    if (links.demo) {
      linkItems.push(`[ <a href="${links.demo}" target="_blank">Demo</a> ]`);
    }
    if (links.paper) {
      linkItems.push(`[ <a href="${links.paper}" target="_blank">Paper</a> ]`);
    }
    if (links.status) {
      linkItems.push(`<span class="ongoing-tag">${links.status}</span>`);
    }
    
    return linkItems.join(' ');
  }
}