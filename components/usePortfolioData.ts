"use client";
import { useEffect, useState } from "react";
import { defaultData, PortfolioData } from "@/lib/data";

const KEY = "halek_portfolio_data_v1";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...defaultData, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);

  const save = (next: PortfolioData) => {
    setData(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setData(defaultData);
  };

  return { data, save, reset, loaded };
}

export { KEY as STORAGE_KEY };
