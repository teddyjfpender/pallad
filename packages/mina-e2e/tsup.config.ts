import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'pallad/mina-e2e',
    entry: ['./src/index.ts'],
    outDir: './dist',
    format: 'esm',
    sourcemap: true,
    clean: true,
    bundle: true,
    dts: {
      compilerOptions: {
        moduleResolution: 'Node',
        allowSyntheticDefaultImports: true,
        esModuleInterop: true
      }
    }
  }
])
