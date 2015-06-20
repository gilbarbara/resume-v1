var React  = require('react'),
    Loader = require('./Loader'),
    texts  = require('../../texts.json');

var Home = React.createClass({
    getInitialState: function () {
        return {
            lang: 'en'
        };
    },

    render: function () {
        var state = this.state;

        return (
            <div className="wrapper">
                <Loader/>
                <header className="main-header">
                    <h1>Gil Barbara</h1><br/>

                    <h2>Front-End Developer - UI/UX</h2><br/>

                    <div className="menu clearfix">
                        <a href="mailto:gilbarbara@gmail.com" target="_blank">{texts.header.contact[state.lang]}</a>

                        <a href="http://kollectiv.org" className="text-right" target="_blank">{texts.header.portfolio[state.lang]}</a>
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
                        <p>{texts.headline[state.lang]}</p>
                    </div>

                </header>

                <main>
                    <div className="section summary">
                        <div className="container">
                            <h3 className="section__title">{texts.summary.title[state.lang]}</h3>
                            <ul className="section__list">
                                {texts.summary.items[state.lang].map((item, i) => {
                                    return <li key={i}>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="section skills">
                        <div className="container">
                            <h3 className="section__title">{texts.skills.title[state.lang]}</h3>
                            <ul className="section__list">
                                <li>
                                    <h4>HTML/CSS</h4>

                                    <p>HTML5 (JADE/HAML), CSS3, Sass, Less, Emmet, SVG, Responsive Web Design, Bootstrap, Micro-frameworks, SEO</p>
                                </li>
                                <li>
                                    <h4>Javascript</h4>

                                    <p>React/Flux, Backbone/Marionette, Meteor, D3, Handlebars, Jasmine/Mocha. ES 5/6/7</p>
                                </li>

                                <li>
                                    <h4>Back-end</h4>

                                    <p>Node.js, PHP (Wordpress/Laravel), Ruby, Python, Objective-C, MySQL, MongoDB, Redis, Rest-API, Bash</p>
                                </li>
                                <li>
                                    <h4>Dev Tools</h4>

                                    <p>Gulp, Grunt, Git, Browserify, Bower, NPM, Yeoman, Cordova, Ionic</p>
                                </li>
                                <li>
                                    <h4>UI/UX</h4>

                                    <p>Adobe PS/AI, Sketch, Axure, Invision, OmniGraffle, Optimizely</p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="section projects">
                        <div className="container">
                            <h3 className="section__title">{texts.projects.title[state.lang]}</h3>
                            <ul className="section__list">
                                <li><a href="http://kollectiv.org/" target="_blank">
                                    <div className="project__image">
                                        <img src="media/projects/kollectiv.svg" className="project" title="Kollectiv"/>
                                    </div>
                                    <div className="project__name">Kollectiv</div>
                                </a>
                                </li>
                                <li><a href="http://favstagram.me/" className="project" target="_blank">
                                    <div className="project__image">
                                        <img src="media/projects/favstagram.svg" className="project"
                                             title="Favstagram"/>
                                    </div>
                                    <div className="project__name">Favstagram</div>
                                </a>
                                </li>
                                <li><a href="http://colormeup.co/" className="project" target="_blank">
                                    <div className="project__image">
                                        <img src="media/projects/colormeup.svg" title="Colormeup"/>
                                    </div>
                                    <div className="project__name">Colormeup</div>
                                </a>
                                </li>
                                <li><a href="http://apps.facebook.com/abovetheskyline/" className="project"
                                       target="_blank">
                                    <div className="project__image">
                                        <img src="media/projects/skyline.svg" title="Above The Skyline"/>
                                    </div>
                                    <div className="project__name">Above The Skyline</div>
                                </a>
                                </li>
                                <li><a href="http://littlealchemyhelper.com/" className="project" target="_blank">
                                    <div className="project__image">
                                        <img src="media/projects/little-alchemy-helper.svg"
                                             title="Little Alchemy Helper"/>
                                    </div>
                                    <div className="project__name">LittleAlchemy Helper</div>
                                </a>
                                </li>
                            </ul>
                            <div className="projects__more">{texts.projects.more[state.lang]}<br/>
                                <a href="http://github.com/gilbarbara" target="_blank">Github</a> / <a
                                    href="http://codepen.io/gilbarbara/" target="_blank">Codepen</a></div>
                        </div>
                    </div>
                    <div className="section experience">
                        <div className="container">
                            <h3 className="section__title">{texts.experience.title[state.lang]}</h3>
                            <ul className="section__list">
                                <li>
                                    <span>– Desde Dez/2014</span>
                                    <a href="http://kollectiv.org" className="title"
                                       target="_blank">Vérios Investimentos</a>
                                    Desenvolvimento de sistema de investimento automatizado (robo advisor)

                                    <em>Experiência: Node.js (Hapi), Javascript (React/Flux / Browserify), CSS3 (Sass / Less), MongoDB, Agile</em>
                                </li>

                                <li>
                                    <span>– Desde 2003</span>
                                    <a href="http://kollectiv.org" className="title" target="_blank">Kollectiv</a>
                                    Programador freelancer

                                    <em>Experiência: PHP (Wordpress/Laravel), Node.js (Express / Socket.io), Javascript (Backbone / Angular / D3), HTML5, SVG, CSS3 (Sass/Less), MySQL, MongoDB, Git, AWS, DevTools.</em>
                                </li>

                                <li>
                                    <span>– Entre 1997 e 2012</span>
                                    <a href="http://rraurl.com" className="title"
                                       target="_blank">rraurl.com</a>
                                    Sócio-Programador-Editor do primeiro site brasileiro sobre música e comportamento e com uma comunidade participativa.

                                    <em>Experiência: PHP, Ruby on Rails, HTML, Javascript, CSS, MySQL. SEO, metricas, comunidade, usabilidade.</em>
                                </li>

                                <li>
                                    <span>– Entre 1994 e 2010</span>
                                    Administrador de sistemas, programação e consultoria em produtoras de áudio e vídeo: Trattoria Filmes, Vetor Zero, Lobo Filmes, Dr. DD Música, O2 Filmes, Conspiração Filmes entre outras.
                                    <em>Experiência: Mac, Linux, Unix, Windows. Avid, Pro Tools, Flame, Inferno, Logic, Premiere, Final Cut Pro, After Effects. Desenvolvimento de plug-ins e bibliotecas de sistema.</em>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="section">
                        <div className="container">
                            <h3 className="section__title">{texts.extra.title[state.lang]}</h3>

                            <p>Um dos DJs pioneiros do Brasil na ativa desde 1987 – <a
                                href="http://rraurl.com/gilbarbara"
                                target="_blank">http://rraurl.com/gilbarbara</a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

});

module.exports = Home;
