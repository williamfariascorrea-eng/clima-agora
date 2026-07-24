import type { DailyForecast } from "../types";
import { WEATHER_ICONS } from "../api";

interface ForecastProps {
  daily: DailyForecast[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const dias = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
  return dias[d.getDay()];
}

const Forecast = ({ daily }: ForecastProps) => {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6 max-w-sm mx-auto">
      <h3 className="text-sm font-medium text-surface-400 mb-4 text-center">Previsão dos proximos dias</h3>
      <div className="divide-y divide-surface-700/40">
        {daily.slice(1).map((day) => (
          <div key={day.date} className="flex items-center justify-between py-2.5">
            <span className="text-white text-sm w-10">{formatDate(day.date)}</span>
            <span className="text-lg">{WEATHER_ICONS[day.weatherCode] || "\u2601\uFE0F"}</span>
            <span className="text-sm text-surface-300">
              <span className="text-white font-medium">{day.tempMax}°</span>
              <span className="text-surface-500"> / {day.tempMin}°</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
