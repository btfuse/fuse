
module.exports = {
    test: /(\.tsx?|\.jsx?)$/,
    use: {
        loader: 'ts-loader',
        options: {
            projectReferences: true
        }
    },
    exclude: /node_modules/
};
