export default {
  input: 'index.js',
  output: {
    file: 'dist/game-of-life.js',
    format: 'iife',
    name: 'sketch',
    sourcemap: 'inline'
  },
  watch: {
    exclude: ['node_modules/**']
  }
}
