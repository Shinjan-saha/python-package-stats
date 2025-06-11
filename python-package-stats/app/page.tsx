'use client';
import { useEffect, useState } from 'react';
import { Search, Download, Package, TrendingUp, Calendar, Code } from 'lucide-react';

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
      const res = await fetch(`/api/pepy?package=${name}`);
      if (!res.ok) {
        throw new Error('Package not found');
      }
      const result = await res.json();
      setData(result);
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getVersionColor = (index: number) => {
    const colors = ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-indigo-500 to-purple-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <main className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Package className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PyPI Analytics
            </h1>
          </div>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Discover download statistics and trends for Python packages with stunning visualizations
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setPackageName(input.trim());
                    }
                  }}
                  className="flex-1 bg-transparent text-white placeholder-slate-400 px-6 py-4 text-lg focus:outline-none"
                  placeholder="Enter PyPI package name..."
                />
               <button 
  onClick={() => setPackageName(input.trim())}
  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
>

                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-slate-300 text-lg">Fetching package data...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Data Display */}
        {data && !loading && (
          <div className="space-y-8 animate-in fade-in-50 duration-700">
            {/* Package Header */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{data.id}</h2>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Package className="w-4 h-4" />
                    <span>Python Package</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Total Downloads</h3>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {formatNumber(data.total_downloads)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Active Versions</h3>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {data.versions.length}
                  </p>
                </div>
              </div>

              {/* Versions */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Available Versions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.versions.map((version, index) => (
                    <span
                      key={version}
                      className={`px-4 py-2 bg-gradient-to-r ${getVersionColor(index)} rounded-xl text-white font-medium text-sm shadow-lg hover:scale-105 transform transition-all duration-200`}
                    >
                      v{version}
                    </span>
                  ))}
                </div>
              </div>
            </div>

{/* Daily Downloads */}
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
      <Calendar className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white">Daily Download Breakdown</h3>
  </div>

  {data && (
    <div className="max-h-[36rem] overflow-y-auto space-y-6 pr-2">
      {Object.entries(data.downloads)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, versions], index) => {
          const totalDayDownloads = Object.values(versions).reduce((sum, count) => sum + count, 0);

          return (
            <div
              key={date}
              className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                  <span className="text-white font-semibold text-lg">{date}</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10">
                  <span className="text-cyan-300 font-medium">
                    {formatNumber(totalDayDownloads)} total
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(versions).map(([version, count], versionIndex) => (
                  <div
                    key={version}
                    className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:scale-105 transform transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${getVersionColor(
                            versionIndex
                          )} rounded-full`}
                        ></div>
                        <span className="text-slate-300 font-medium">v{version}</span>
                      </div>
                      <span className="text-white font-bold">{formatNumber(count)}</span>
                    </div>

                    <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getVersionColor(
                          versionIndex
                        )} transition-all duration-1000 ease-out`}
                        style={{ width: `${(count / totalDayDownloads) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  )}

  {/* Footer */}
  <div className="mt-10 text-center text-slate-400 font-semibold">
    made with <span className="text-pink-500">♥</span> Shinjan
  </div>
</div>

          </div>
        )}
      </main>
    </div>
  );
}