import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { AiPoweredService } from 'src/app/services/ai-powered.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats: any[] = [];
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Word Count' }
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private aiPoweredService: AiPoweredService) { }

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.aiPoweredService.getWordsTrend()
      .subscribe(response => {
        this.stats = response.stats;
        this.lineChartData[0].data = this.stats.map(stat => stat.word_count);
        this.lineChartLabels = this.stats.map(stat => stat.title);
      });
  }
}
