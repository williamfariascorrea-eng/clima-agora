import type { Location, CurrentWeather, DailyForecast } from "./types";

const WMO_DESC: Record<number, string> = {
  0: "ceu limpo", 1: "poucas nuvens", 2: "parcialmente nublado",
  3: "nublado", 45: "nevoeiro", 48: "nevoeiro denso",
  51: "chuvisco fraco", 53: "chuvisco", 55: "chuvisco forte",
  61: "chuva fraca", 63: "chuva", 65: "chuva forte",
  71: "neve fraca", 73: "neve", 75: "neve forte",
  80: "pancadas de chuva", 81: "pancadas moderadas", 82: "pancadas fortes",
  95: "tempestade", 96: "tempestade com granizo", 99: "tempestade com granizo forte",
};

export function weatherDesc(code: number): string {
  return WMO_DESC[code] || "desconhecido";
}

export const WEATHER_ICONS: Record<number, string> = {
  0: "\u2600\uFE0F", 1: "\u26C5", 2: "\u26C5", 3: "\u2601\uFE0F",
  45: "\uD83C\uDF2B\uFE0F", 48: "\uD83C\uDF2B\uFE0F",
  51: "\uD83D\uDCA7", 53: "\uD83D\uDCA7", 55: "\uD83D\uDCA7",
  61: "\uD83C\uDF27\uFE0F", 63: "\uD83C\uDF27\uFE0F", 65: "\uD83C\uDF27\uFE0F",
  71: "\u2744\uFE0F", 73: "\u2744\uFE0F", 75: "\u2744\uFE0F",
  80: "\uD83C\uDF26\uFE0F", 81: "\uD83C\uDF26\uFE0F", 82: "\uD83C\uDF26\uFE0F",
  95: "\u26A1", 96: "\u26A1", 99: "\u26A1",
};

export async function searchCity(query: string): Promise<Location[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`
  );
  if (!res.ok) throw new Error("Erro ao buscar cidade");
  const data = await res.json();

  if (!data.results) return [];

  return data.results.map((r: any) => ({
    name: r.name,
    country: r.country || "",
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export async function fetchWeather(lat: number, lon: number, locationName: string) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=auto&forecast_days=7`
  );
  if (!res.ok) throw new Error("Erro ao buscar clima");
  const data = await res.json();

  const current: CurrentWeather = {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
  };

  const daily: DailyForecast[] = data.daily.time.map((t: string, i: number) => ({
    date: t,
    tempMax: Math.round(data.daily.temperature_2m_max[i]),
    tempMin: Math.round(data.daily.temperature_2m_min[i]),
    weatherCode: data.daily.weather_code[i],
  }));

  return { location: locationName, current, daily };
}
