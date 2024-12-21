module.exports = {
  presets: [
    '@babel/preset-env', // For Node.js (ES6+ to ES5)
    '@babel/preset-react' // If you are using JSX syntax in Node (e.g., for server-side rendering, optional)
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // To optimize and avoid code duplication
  ]
};
