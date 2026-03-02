// js/project-loader.js
class ProjectLoader extends MarkdownLoader {
  constructor() {
    super({
      contentContainerId: 'project-content',
      listContainerId: 'project-list',
      indexUrl: 'projects/index.json',
      contentType: 'project',
      enableMath: true  // 启用数学公式
    });
  }

  // 重写 renderContent 以包含项目链接和数学公式支持
  async renderContent(entry) {
    const contentEl = document.getElementById(this.contentContainerId);
    const listEl = document.getElementById(this.listContainerId);
    const staticProjectsEl = document.getElementById('static-projects');
    
    if (!contentEl) return;
    
    const md = await this.loadMarkdown(entry.file);
    
    if (listEl) listEl.style.display = 'none';
    if (staticProjectsEl) staticProjectsEl.style.display = 'none';
    
    // 生成项目链接HTML
    const linksHtml = this.generateLinksHtml(entry.links);
    
    // 1. 先渲染Markdown内容（包含公式的原始文本）
    contentEl.innerHTML = `
      <div class="project">
        <div class="project-title">${entry.title}</div>
        <div class="project-description">
          ${marked.parse(md)}
        </div>
        <div class="project-links">
          ${linksHtml}
        </div>
      </div>
    `;
    
    // 2. 再渲染数学公式（关键步骤）
    const projectDesc = contentEl.querySelector('.project-description');
    if (projectDesc && this.enableMath) {
      this.renderMath(projectDesc);
    }
  }

  // 新增：渲染静态项目列表时也支持公式
  async renderStaticProjects() {
    const staticProjectsEl = document.getElementById('static-projects');
    if (!staticProjectsEl) return;
    
    try {
      const projects = await this.loadIndex();
      
      staticProjectsEl.innerHTML = await Promise.all(projects.map(async project => {
        // 读取项目的markdown文件获取描述
        const md = await this.loadMarkdown(project.file);
        // 只取第一段作为预览
        const previewMd = md.split('\n\n')[0] + '...';
        
        return `
          <div class="project">
            <div class="project-title">${project.title}</div>
            <div class="project-description">
              ${marked.parse(previewMd)}
            </div>
            <div class="project-links">
              <a href="?projectId=${project.id}">Read More →</a>
            </div>
          </div>
        `;
      }));
      
      // 渲染静态项目中的数学公式
      if (this.enableMath) {
        const projectDescs = staticProjectsEl.querySelectorAll('.project-description');
        projectDescs.forEach(desc => this.renderMath(desc));
      }
    } catch (error) {
      console.error('Error rendering static projects:', error);
    }
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