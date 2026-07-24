import type { CurrentWeather } from "../types";
import { weatherDesc, WEATHER_ICONS } from "../api";

interface WeatherCardProps {
  current: CurrentWeather;
  location: string;
}

const WeatherCard = ({ current, location }: WeatherCardProps) => {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 text-center max-w-sm mx-auto">
      <p className="text-surface-400 text-sm mb-1">{location}</p>
      <div className="text-6xl sm:text-7xl my-4">{WEATHER_ICONS[current.weatherCode] || "\u2601\uFE0F"}</div>
      <p className="text-5xl sm:text-6xl font-bold text-white mb-1">{current.temperature}°</p>
      <p className="text-surface-300 text-base mb-6">{weatherDesc(current.weatherCode)}</p>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="glass rounded-xl p-3">
          <p className="text-surface-400 text-xs">Sensação</p>
          <p className="text-white font-medium">{current.feelsLike}°</p>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-surface-400 text-xs">Umidade</p>
          <p className="text-white font-medium">{current.humidity}%</p>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-surface-400 text-xs">Vento</p>
          <p className="text-white font-medium">{current.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
