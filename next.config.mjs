import MillionLint from "@million/lint";



const pluginOptions = {
  options: {
    
  }
};

/** @type {NextConfig} */
const nextConfig= {
  images: {
    domains: ['lh3.googleusercontent.com', 's.gravatar.com'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    });

    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            disable: true,
          },
        },
      ],
    });

    return config;
  },
};

export default MillionLint.next({ rsc: true })(nextConfig);