module.exports = {
    mode: "development",
    entry: {
        'chapter_one': __dirname + '/src/chapter_one/chapter_one',
        'chapter_two': __dirname + '/src/chapter_two/chapter_two',
        'chapter_three': __dirname + '/src/chapter_three/chapter_three',
        'chapter_four': __dirname + '/src/chapter_four/chapter_four',
        'chapter_five': __dirname + '/src/chapter_five/chapter_five',
        'chapter_six': __dirname + '/src/chapter_six/chapter_six',
        'chapter_seven': __dirname + '/src/chapter_seven/chapter_seven',
        'component': __dirname + '/src/component/TableViewDemo'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].build.js'
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.tsx']
    },
    module: {
        rules: [
            {test: /(\.ts|\.tsx)$/, loader: "awesome-typescript-loader"},
            {test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader'}
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-router': 'ReactRouter',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        'redux-logger': 'reduxLogger'
    }
};
