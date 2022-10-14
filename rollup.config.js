import dts from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'

const commonConfig = {
  input: './src/index.ts',
  output: [
    {
      file: './lib/esm/index.js',
      format: 'es'
    },
    {
      file: './lib/cjs/index.js',
      format: 'cjs'
    }
  ],
  plugins: [typescript()]
}

export default [
  commonConfig,
  {
    input: './src/types.ts',
    output: [
      {
        file: './lib/esm/index.d.ts',
        format: 'es'
      },
      {
        file: './lib/cjs/index.d.ts',
        format: 'cjs'
      }
    ],
    plugins: [typescript(), dts()]
  }
]
