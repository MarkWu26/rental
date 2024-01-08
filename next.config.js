/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "res.cloudinary.com"
        ]
    },
     webpack: (config) => {
            config.externals = [...config.externals, 'bcrypt'];
            return config;
          },
    transpilePackages: ['@mui/x-charts'],
}

module.exports = nextConfig
