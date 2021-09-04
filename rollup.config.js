// reference: https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const name = require('./package.json').main.replace(/\.js$/, '');

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id),
});

const bundleDevWeb = (config) => ({
  ...config,
  input: 'tests/runner-browser.ts',
});

export default [
  bundleDevWeb({
    plugins: [esbuild()],
    output: [
      {
        file: `tests/${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
];
