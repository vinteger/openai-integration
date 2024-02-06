/** @type {import('next').NextConfig} */
const nextConfig = {
	/**
	 * Enable static exports for the App Router.
	 *
	 * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
	 */
	output: "export",

	/**
	 * Set base path. This is the slug of your GitHub repository.
	 *
	 * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
	 */
	basePath: "/openai-integration",

	/**
	 * Disable server-based image optimization. Next.js does not support
	 * dynamic features with static exports.
	 *
	 * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
	 */
	images: {
		unoptimized: true,
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "https://vinteger.github.io/" }, // replace this your actual origin
					{ key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
					{ key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
				]
			}
		]
	}
};

export default nextConfig;
