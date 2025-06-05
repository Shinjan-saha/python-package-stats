'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type DownloadStats = {
  id: string;
  total_downloads: number;
  versions: string[];
  downloads: {
    [date: string]: {
      [version: string]: number;
    };
  };
};

export default function Home() {
  const [packageName, setPackageName] = useState('pyfilterlab');
  const [input, setInput] = useState('pyfilterlab');
  const [data, setData] = useState<DownloadStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (name: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`/api/pepy?package=${name}`);
      setData(res.data);
    } catch (err: any) {
      setError('Package not found or failed to fetch');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(packageName);
  }, [packageName]);

  return (
    <main className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4">📦 PyPI Download Stats Viewer</h1>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPackageName(input.trim());
        }}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Enter PyPI package name"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && !loading && (
        <>
          <h2 className="text-2xl font-semibold">{data.id}</h2>
          <p>📥 Total Downloads: {data.total_downloads}</p>
          <p>📌 Versions: {data.versions.join(', ')}</p>

          <h3 className="text-xl mt-6 mb-2">📊 Daily Downloads</h3>
          <div className="border p-4 rounded space-y-4 bg-gray-50">
            {Object.entries(data.downloads).map(([date, versions]) => (
              <div key={date}>
                <p className="font-medium">{date}</p>
                <ul className="ml-4 list-disc">
                  {Object.entries(versions).map(([version, count]) => (
                    <li key={version}>Version {version}: {count} downloads</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
