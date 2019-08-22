export default {
  input: 'index.js',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    name: 'sketch',
    sourcemap: 'inline'
  },
  watch: {
    exclude: ['node_modules/**']
  }
}
