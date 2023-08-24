import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

module.exports = {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      inlineDynamicImports: true,
    },
  ],
  external: [
    'react',
    'react-dom'
  ],
  plugins: [
    postcss({
      extensions: ['.sass', '.scss', '.css'],
    }),
    svgr(),
    typescript(),
    babel(),
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: './src/index.d.ts', dest: 'dist' }]
    })
  ]
}