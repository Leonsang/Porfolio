import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';
import { portfolioConfig } from '../../config/portfolio';
import type { Experience } from '../../types/portfolio';

export class ExperienceSection extends BaseSection {
  constructor() {
    super('experience-section');
  }

  protected setupEventListeners(): void {
    this.setupExperienceInteractions();
  }

  protected render(): void {
    if (!this.sectionElement) return;

    // Update i18n content
    this.updateContent();

    // Render dynamic vertical timeline
    this.renderTimeline();

    // Render leadership storytelling
    this.renderLeadership();
    
    // Setup animations and interactions
    this.setupAnimations();
  }

  /**
   * Update content with current language
   */
  private updateContent(): void {
    if (!this.sectionElement) return;

    // Update section header
    const title = this.sectionElement.querySelector('h2[data-i18n]');
    const subtitle = this.sectionElement.querySelector('p[data-i18n]');
    
    if (title) {
      const key = title.getAttribute('data-i18n');
      if (key) title.textContent = i18n.t(key);
    }
    
    if (subtitle) {
      const key = subtitle.getAttribute('data-i18n');
      if (key) subtitle.textContent = i18n.t(key);
    }

    // Update experience cards labels
    this.updateExperienceCards();
  }

  /**
   * Build vertical timeline from config
   */
  private renderTimeline(): void {
    if (!this.sectionElement) return;

    const timelineWrapper = this.sectionElement.querySelector('.experience-card .timeline-compact');
    if (!timelineWrapper) return;

    // Prepare data: sort by end date desc
    const items: (Experience & { start: Date; end: Date; months: number })[] = portfolioConfig.experience
      .map((exp) => {
        const { start, end } = this.parsePeriod(exp.period);
        return { ...exp, start, end, months: this.monthDiff(start, end) };
      })
      .sort((a, b) => b.end.getTime() - a.end.getTime());

    // Replace wrapper class for vertical timeline and id for targeting
    const container = timelineWrapper as HTMLElement;
    container.className = 'timeline-vertical';
    container.id = 'experience-timeline';

    container.innerHTML = items
      .map((exp) => this.renderTimelineItem(exp))
      .join('');
  }

  private renderTimelineItem(exp: Experience & { start: Date; end: Date; months: number }): string {
    const duration = this.formatDuration(exp.months);

    // Determine key achievement (heuristic: first item containing percentage or keywords)
    const all = [...(exp.achievements || [])];
    const keyIdx = all.findIndex(a => /(\d+%|reduc|reduce|reduction|improv|improve|optimized|optimiz|achiev|logro|mejor)/i.test(a));
    let keyAchievement: string | null = null;
    if (keyIdx >= 0) {
      keyAchievement = all.splice(keyIdx, 1)[0];
    }

    return `
      <div class="timeline-row">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h4 class="timeline-title">${exp.title} | ${exp.company} | ${exp.period}</h4>
          </div>
          <div class="timeline-meta">
            <span class="timeline-location">${exp.location}</span>
            <span class="timeline-duration">${duration}</span>
          </div>
          ${all.length > 0 ? `
            <ul class="timeline-achievements">
              ${all.map((a) => `<li>${a}</li>`).join('')}
              ${keyAchievement ? `<li><strong>Key Achievement:</strong> ${keyAchievement}</li>` : ''}
            </ul>
          ` : (keyAchievement ? `
            <ul class="timeline-achievements"><li><strong>Key Achievement:</strong> ${keyAchievement}</li></ul>
          ` : '')}
        </div>
      </div>
    `;
  }

  /** Build leadership storytelling (STAR) */
  private renderLeadership(): void {
    if (!this.sectionElement) return;
    const card = this.sectionElement.querySelector('.human-skills-card .human-skills-grid');
    if (!card) return;

    const stories = (portfolioConfig as any).leadershipStories || [];
    if (!stories.length) return;

    (card as HTMLElement).innerHTML = stories.map((s: any) => `
      <div class="skill-category">
        <h4>${s.title}</h4>
        <div class="skill-items">
          <div class="skill-item"><span><strong>S</strong>ituation</span><div class="skill-score">✔</div></div>
          <p>${s.situation}</p>
          <div class="skill-item"><span><strong>T</strong>ask</span><div class="skill-score">✔</div></div>
          <p>${s.task}</p>
          <div class="skill-item"><span><strong>A</strong>ctions</span><div class="skill-score">✔</div></div>
          <ul class="timeline-achievements">${s.action.map((a: string) => `<li>${a}</li>`).join('')}</ul>
          <div class="skill-item"><span><strong>R</strong>esult</span><div class="skill-score">✔</div></div>
          <p><strong>${s.result}</strong></p>
          <div class="timeline-meta" style="margin-top: .5rem;">
            ${s.skills.map((k: string) => `<span class="tech-tag">${k}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  private monthNames: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, setiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
  };

  private parsePeriod(period: string): { start: Date; end: Date } {
    // Examples: "June 2025 - July 2025", "December 2021 - March 2025", "Jan 2023 - Present"
    const parts = period.split('-').map((p) => p.trim());
    const startStr = parts[0];
    const endStr = (parts[1] || '').toLowerCase();

    const start = this.parseMonthYear(startStr);
    const end = endStr.includes('present') || endStr.includes('actual') || endStr === ''
      ? new Date()
      : this.parseMonthYear(parts[1].trim());

    return { start, end };
  }

  private parseMonthYear(text: string): Date {
    // Accept formats like "June 2025", "Jun 2025", "Sept 2024", "Septiembre 2024"
    const cleaned = text.replace(/\s+/g, ' ').trim();
    const [monthPart, yearStr] = cleaned.split(' ');
    const monthKey = (monthPart || '').toLowerCase();

    // Try full and short month
    let month = this.monthNames[monthKey];
    if (month === undefined) {
      // Normalize short forms (en/es)
      const short = monthKey.slice(0, 3);
      const map: Record<string, string> = {
        ene: 'enero', feb: 'febrero', mar: 'marzo', abr: 'abril', may: 'mayo', jun: 'junio', jul: 'julio', ago: 'agosto', sep: 'septiembre', set: 'setiembre', oct: 'octubre', nov: 'noviembre', dic: 'diciembre',
        jan: 'january', feb_: 'february', mar_: 'march', apr: 'april', may_: 'may', jun_: 'june', jul_: 'july', aug: 'august', sep_: 'september', oct_: 'october', nov_: 'november', dec: 'december'
      } as any;
      const key = (['jan','feb_','mar_','apr','may_','jun_','jul_','aug','sep_','oct_','nov_','dec'].includes(short) ? short : short) as string;
      const resolved = (map as any)[key] || monthKey;
      month = this.monthNames[resolved] ?? 0;
    }

    const year = parseInt((yearStr || '').replace(/[^0-9]/g, ''), 10);
    const safeYear = isNaN(year) ? new Date().getFullYear() : year;
    return new Date(safeYear, month, 1);
  }

  private monthDiff(d1: Date, d2: Date): number {
    const years = d2.getFullYear() - d1.getFullYear();
    const months = d2.getMonth() - d1.getMonth();
    return years * 12 + months + 1; // inclusive months
  }

  private formatDuration(totalMonths: number): string {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
    return parts.join(' · ') || '—';
  }

  /** Update experience card headers */
  private updateExperienceCards(): void {
    if (!this.sectionElement) return;

    const experienceCard = this.sectionElement.querySelector('.experience-card');
    if (experienceCard) {
      const title = experienceCard.querySelector('h3');
      const category = experienceCard.querySelector('.category-tag');
      if (title) title.textContent = i18n.t('experience.journey.title') || 'Professional Journey';
      if (category) category.textContent = i18n.t('experience.journey.category') || 'Journey';
    }

    const humanSkillsCard = this.sectionElement.querySelector('.human-skills-card');
    if (humanSkillsCard) {
      const title = humanSkillsCard.querySelector('h3');
      const category = humanSkillsCard.querySelector('.category-tag');
      if (title) title.textContent = i18n.t('experience.leadership.title') || 'Leadership & Strategy';
      if (category) category.textContent = i18n.t('experience.leadership.category') || 'Leadership';
    }
  }

  /** Setup experience interactions */
  private setupExperienceInteractions(): void {
    if (!this.sectionElement) return;

    // Hover effects to experience cards (no movement)
    const experienceCards = this.sectionElement.querySelectorAll('.dashboard-card');
    experienceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.boxShadow = '0 10px 26px rgba(0,255,65,0.10)';
        (card as HTMLElement).style.background = 'rgba(0,0,0,0.45)';
      });
      
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.boxShadow = '';
        (card as HTMLElement).style.background = '';
      });
    });

    // Click effects for timeline items (no movement)
    const timelineItems = this.sectionElement.querySelectorAll('#experience-timeline .timeline-row');
    timelineItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateTimelineItem(item as HTMLElement);
      });
    });
  }

  /** Setup animations */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Entrance animations to experience cards (fade + blur only)
    const experienceCards = this.sectionElement.querySelectorAll('.dashboard-card');
    experienceCards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.filter = 'blur(6px)';
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'opacity 0.6s ease-out, filter 0.6s ease-out';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.filter = 'blur(0)';
      }, index * 120);
    });

    // Animate timeline items (fade + blur only)
    const timelineItems = this.sectionElement.querySelectorAll('#experience-timeline .timeline-row');
    timelineItems.forEach((item, index) => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.filter = 'blur(6px)';
      setTimeout(() => {
        (item as HTMLElement).style.transition = 'opacity 0.6s ease-out, filter 0.6s ease-out';
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.filter = 'blur(0)';
      }, 400 + (index * 120));
    });
  }

  private animateTimelineItem(item: HTMLElement): void {
    // Brief highlight without movement
    const prev = item.style.boxShadow;
    item.style.boxShadow = '0 0 0 2px rgba(0,255,65,0.35) inset, 0 8px 24px rgba(0,255,65,0.10)';
    setTimeout(() => { item.style.boxShadow = prev; }, 250);
  }

  private animateSkillItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    setTimeout(() => { item.style.transform = 'scale(1) rotate(0deg)'; }, 300);
  }

  private highlightSkillScore(score: HTMLElement): void {
    score.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.6)';
    score.style.transform = 'scale(1.1)';
  }

  private unhighlightSkillScore(score: HTMLElement): void {
    score.style.boxShadow = '';
    score.style.transform = 'scale(1)';
  }

  private animateSkillScore(element: HTMLElement, finalValue: string): void {
    const final = parseInt(finalValue.replace(/\D/g, ''));
    const duration = 1500;
    const start = 0;
    const increment = final / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= final) {
        current = final;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + '%';
    }, 16);
  }

  protected onShow(): void {
    this.setupAnimations();
  }

  protected onHide(): void {}

  protected cleanup(): void {
    if (!this.sectionElement) return;

    const experienceCards = this.sectionElement.querySelectorAll('.dashboard-card');
    experienceCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const timelineItems = this.sectionElement.querySelectorAll('#experience-timeline .timeline-row');
    timelineItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    const skillItems = this.sectionElement.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    const skillScores = this.sectionElement.querySelectorAll('.skill-score');
    skillScores.forEach(score => {
      score.removeEventListener('mouseenter', () => {});
      score.removeEventListener('mouseleave', () => {});
    });
  }
}
