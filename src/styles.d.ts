// Stylesheets are imported for their side effects and bundled by webpack's CSS
// loaders. TypeScript 6 checks side-effect imports, so it needs to know they resolve.
declare module "*.css";
