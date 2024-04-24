/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "worker-loader",
        options: {
          disabled: true,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
