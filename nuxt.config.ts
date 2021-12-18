import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  privateRuntimeConfig: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    UMB_ALIAS: process.env.UMB_ALIAS,
  },
  css: [
    'normalize.css/normalize.css',
    '@/assets/css/master.css'
  ],
  build: {
    postcss: {
      postcssOptions: {
        config: {
          stage: 0
        },
        plugins: {
          'postcss-import': {},
          'postcss-nested': {},
          'postcss-preset-env': {
            stage: 0, // default stage is 2
            preserve: false,
            importFrom: [
              'assets/css/_variables.css'
            ],
            autoprefixer: {
              grid: true
            },
            features: {
              'color-mod-function': { unresolved: 'warn' },
              'custom-media-queries': {},
            },
            browsers: ['>= 5% in DK', 'not ie 11']
          },
          'cssnano': {
            preset: ["default", {
              autoprefixer: false, // present-env does this
              discardComments: {
                removeAll: true
              },
              mergeLonghand: true,
              colormin: false,
              zindex: false,
              discardUnused: {
                fontFace: false
              }
            }],
          },
          'postcss-reporter': {
            clearReportedMessages: true
          },
        }
      }
    }
  },
});