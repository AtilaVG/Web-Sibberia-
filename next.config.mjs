// basePath solo en CI (GitHub Pages sirve bajo /Web-Sibberia-/).
// Si se configura un dominio personalizado (sibberia.com), eliminar basePath.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/Web-Sibberia-" : "",
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
