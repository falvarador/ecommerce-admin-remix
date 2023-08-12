/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  appDirectory: "src",
  ignoredRouteFiles: ["**/.*"],
  postcss: true,
  serverModuleFormat: "cjs",
  tailwind: true,
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
