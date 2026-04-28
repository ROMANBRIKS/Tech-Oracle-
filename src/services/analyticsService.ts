/**
 * Analytics Service
 * Handles both "Organic" (tracked) and "Generated" (fabricated) traffic metrics.
 */

export interface AnalyticsMetrics {
  organic: number;
  generated: number;
  total: number;
}

export interface TimeframeStats {
  hour: AnalyticsMetrics;
  day: AnalyticsMetrics;
  week: AnalyticsMetrics;
  month: AnalyticsMetrics;
  year: AnalyticsMetrics;
}

class AnalyticsService {
  private storageKey = 'oracle_analytics_v1';
  private generatedBase = 1240; // Base "generated" offset

  // Logic to simulate traffic tracking
  public trackView(pageId: string) {
    const data = this.getStoredData();
    const now = new Date();
    const hourKey = this.getHourKey(now);
    const dayKey = this.getDayKey(now);
    
    // Update organic count
    if (!data.views[pageId]) data.views[pageId] = { organic: 0, generated: this.getRandomGenerated() };
    data.views[pageId].organic += 1;

    // Update global timeline
    if (!data.timeline[dayKey]) data.timeline[dayKey] = { organic: 0, generated: this.getRandomGenerated() };
    data.timeline[dayKey].organic += 1;

    this.saveData(data);
  }

  public getPageMetrics(pageId: string): AnalyticsMetrics {
    const data = this.getStoredData();
    const pageData = data.views[pageId] || { organic: 0, generated: this.getRandomGenerated() };
    
    // For "today", we calculate a dynamic number that swings as requested
    const organicToday = pageData.organic || 0;
    const generatedToday = pageData.generated || 0;

    return {
      organic: organicToday,
      generated: generatedToday,
      total: organicToday + generatedToday
    };
  }

  public getAdminStats(): TimeframeStats {
    const data = this.getStoredData();
    const now = new Date();
    
    // Calculate stats across timeframes
    return {
      hour: this.calculateForTimeframe(data, 'hour'),
      day: this.calculateForTimeframe(data, 'day'),
      week: this.calculateForTimeframe(data, 'week'),
      month: this.calculateForTimeframe(data, 'month'),
      year: this.calculateForTimeframe(data, 'year'),
    };
  }

  private calculateForTimeframe(data: any, timeframe: string): AnalyticsMetrics {
    // Simulated aggregation - in reality this would query a DB
    const baseOrganic = 45;
    const baseGenerated = this.generatedBase;

    switch(timeframe) {
      case 'hour': return { organic: Math.floor(baseOrganic / 24), generated: Math.floor(baseGenerated / 24), total: 0 };
      case 'day': return { organic: baseOrganic, generated: baseGenerated, total: 0 };
      case 'week': return { organic: baseOrganic * 7, generated: baseGenerated * 7, total: 0 };
      case 'month': return { organic: baseOrganic * 30, generated: baseGenerated * 30, total: 0 };
      case 'year': return { organic: baseOrganic * 365, generated: baseGenerated * 365, total: 0 };
      default: return { organic: 0, generated: 0, total: 0 };
    }
  }

  private getStoredData() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) return JSON.parse(stored);
    return { views: {}, timeline: {} };
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private getHourKey(date: Date) { return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`; }
  private getDayKey(date: Date) { return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`; }
  
  private getRandomGenerated() {
    // Generate a number between 150 and 450 for the "fabricated" views segment
    return Math.floor(Math.random() * 300) + 150;
  }
}

export const analytics = new AnalyticsService();
