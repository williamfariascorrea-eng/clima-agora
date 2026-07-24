import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import { searchCity, fetchWeather } from "./api";
import type { WeatherData } from "./types";

const App = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(query: string) {
    setLoading(true);
    setError("");

    try {
      const results = await searchCity(query);
      if (results.length === 0) {
        setError("Cidade nao encontrada");
        setLoading(false);
        return;
      }

      const loc = results[0];
      const weather = await fetchWeather(loc.latitude, loc.longitude, `${loc.name}, ${loc.country}`);
      setData(weather);
    } catch {
      setError("Erro ao buscar clima");
    }

    setLoading(false);
  }

  useEffect(() => {
    handleSearch("Rio Grande");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 sm:py-16 px-4">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
        Clima <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Agora</span>
      </h1>
      <p className="text-surface-400 text-sm mb-8">Tempo atual e previsao para sua cidade</p>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}

      {loading && (
        <div className="flex flex-col items-center mt-10">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-surface-400 text-sm mt-3">Buscando...</p>
        </div>
      )}

      {data && !loading && (
        <div className="mt-10 w-full max-w-sm space-y-6">
          <WeatherCard current={data.current} location={data.location} />
          <Forecast daily={data.daily} />
        </div>
      )}

      <p className="text-surface-600 text-xs mt-auto pt-10">
        Dados: Open-Meteo | Feito por William Correa
      </p>
    </div>
  );
};

export default App;
