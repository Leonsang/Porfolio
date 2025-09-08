declare module '@next/bundle-analyzer' {
  import type { NextConfig } from 'next';
  export type BundleAnalyzer = (opts: { enabled: boolean }) => (config: NextConfig) => NextConfig;
  const bundleAnalyzer: BundleAnalyzer;
  export default bundleAnalyzer;
}

