/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://banmanagement.com',
  generateRobotsTxt: true,
  // Exclude redirect-only pages and internal routes
  exclude: [
    '/download', // Redirects to /download/banmanager
    '/404'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    additionalSitemaps: []
  }
}
