/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		missingSuspenseWithCSRBailout: false,
	},
	output: "standalone",
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
