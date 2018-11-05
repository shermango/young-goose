module.exports = {
  siteMetadata: {
    title: 'Old Sport',
    description: 'Exploring Gatsby V2',
  },
  plugins: [
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
