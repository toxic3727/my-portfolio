/** @type {import('next').NextConfig} */
const nextConfig = {
  // 빌드 시 타입 체크 에러가 있어도 무시하고 배포함
  typescript: {
    ignoreBuildErrors: true,
  },
  // 린트(문법 체크) 에러가 있어도 무시하고 배포함
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;