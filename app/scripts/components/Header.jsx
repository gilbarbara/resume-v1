var React = require('react');

var Header = React.createClass({

    propTypes: {
        lang: React.PropTypes.string.isRequired,
        setLang: React.PropTypes.func.isRequired,
        texts: React.PropTypes.object.isRequired
    },

    render: function () {
        var props = this.props;

        return (
            <header className="main-header">
                <div className="wrapper">
                    <h1>Gil Barbara</h1>

                    <h2>Front-End Developer - UI/UX</h2>

                    <ul className="menu">
                        {props.texts.header.menu[props.lang].map((item, i) => {
                            return (<li key={i}>
                                <a href={item.link || '#'} target={item.link ? '_blank' : '_self'}
                                   data-section={item.section}>{item.title}</a>
                           </li>);
                        })}
                        <li key="lang">
                            <div className="switchbox">
                                <input type="checkbox" id="language" name="language" onChange={props.setLang} defaultChecked={props.lang === 'en'}/>
                                <label htmlFor="language" data-on="PT" data-off="EN">
                                    <span className="on">PT</span>
                                    <span className="off">EN</span>
                                </label>
                            </div>
                        </li>
                    </ul>

                </div>

                <div className="logos">
                    <img src="media/logos/adobe-illustrator.svg" className="adobe-ai" title="adobe illustrator"/>
                    <img src="media/logos/adobe-photoshop.svg" className="adobe-ps" title="adobe photoshop"/>
                    <img src="media/logos/angular.svg" className="angular" title="angular"/>
                    <img src="media/logos/aws.svg" className="aws" title="amazon web services"/>
                    <img src="media/logos/backbone.svg" className="backbone" title="backbone"/>
                    <img src="media/logos/bash.svg" className="bash" title="sh / bash / zsh"/>
                    <img src="media/logos/bootstrap.svg" className="bootstrap" title="bootstrap"/>
                    <img src="media/logos/bower.svg" className="bower" title="bower"/>
                    <img src="media/logos/browserify.svg" className="browserify" title="browserify"/>
                    <img src="media/logos/codepen.svg" className="codepen" title="codepen"/>
                    <img src="media/logos/cordova.png" className="cordova" title="cordova"/>
                    <img src="media/logos/css-3.svg" className="css-3" title="css-3"/>
                    <img src="media/logos/d3.svg" className="d3" title="d3"/>
                    <img src="media/logos/eslint.svg" className="eslint" title="eslint"/>
                    <img src="media/logos/emmet.svg" className="emmet" title="emmet"/>
                    <img src="media/logos/git.svg" className="git" title="git"/>
                    <img src="media/logos/github-icon.svg" className="github" title="github"/>
                    <img src="media/logos/goggle-chrome.svg" className="chrome" title="chrome"/>
                    <img src="media/logos/grunt.svg" className="grunt" title="grunt"/>
                    <img src="media/logos/gulp.svg" className="gulp" title="gulp"/>
                    <img src="media/logos/handlebars.svg" className="handlebars" title="handlebars"/>
                    <img src="media/logos/html-5.svg" className="html-5" title="html-5"/>
                    <img src="media/logos/ionic.svg" className="ionic" title="ionic"/>
                    <img src="media/logos/jasmine.svg" className="jasmine" title="jasmine"/>
                    <img src="media/logos/jquery.svg" className="jquery" title="jquery"/>
                    <img src="media/logos/js.svg" className="js" title="javascript"/>
                    <img src="media/logos/less.svg" className="less" title="less"/>
                    <img src="media/logos/marionette.svg" className="marionette" title="marionette"/>
                    <img src="media/logos/meteor.svg" className="meteor" title="meteor"/>
                    <img src="media/logos/mocha.svg" className="mocha" title="mocha"/>
                    <img src="media/logos/modernizr.svg" className="modernizr" title="modernizr"/>
                    <img src="media/logos/mongodb.svg" className="mongodb" title="mongo db"/>
                    <img src="media/logos/mysql.svg" className="mysql" title="mysql"/>
                    <img src="media/logos/nodejs.svg" className="nodejs" title="node.js"/>
                    <img src="media/logos/npm.svg" className="npm" title="npm"/>
                    <img src="media/logos/octocat.svg" className="octocat" title="github"/>
                    <img src="media/logos/php.svg" className="php" title="php"/>
                    <img src="media/logos/polymer.svg" className="polymer" title="web components"/>
                    <img src="media/logos/python.svg" className="python" title="python"/>
                    <img src="media/logos/react.svg" className="react" title="react"/>
                    <img src="media/logos/rest.svg" className="rest" title="rest-api"/>
                    <img src="media/logos/ruby.svg" className="ruby" title="ruby"/>
                    <img src="media/logos/sass.svg" className="sass" title="sass"/>
                    <img src="media/logos/sketch.svg" className="sketch" title="sketch"/>
                    <img src="media/logos/svg.svg" className="svg" title="svg"/>
                    <img src="media/logos/swift.svg" className="swift" title="swift"/>
                    <img src="media/logos/webplatform.svg" className="webplatform" title="web platform"/>
                    <img src="media/logos/wordpress.svg" className="wordpress" title="wordpress"/>
                    <img src="media/logos/yeoman.svg" className="yeoman" title="yeoman"/>
                </div>
                <div className="bio">
                    <p>{props.texts.headline[props.lang]}</p>
                </div>

            </header>
        );
    }

});

module.exports = Header;
