var React  = require('react'),
    Header = require('./components/Header'),
    Loader = require('./components/Loader'),
    texts  = require('../texts.json');

var Home = React.createClass({
    getInitialState () {
        return {
            lang: 'pt',
            texts: texts
        };
    },

    _setLang (e) {
        e.preventDefault();

        this.setState({
            lang: e.currentTarget.dataset.lang
        });
    },

    render () {
        var state = this.state;

        return (
            <div className="app">
                <Header lang={state.lang} setLang={this._setLang} texts={state.texts}/>

                <main>
                    <div className="section summary">
                        <div className="container">
                            <h3 className="section__title">{state.texts.summary.title[state.lang]}</h3>
                            <ul className="section__list">
                                {state.texts.summary.items[state.lang].map((item, i) => {
                                    return <li key={i}>{item}</li>;
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="section skills">
                        <div className="container">
                            <h3 className="section__title">{state.texts.skills.title[state.lang]}</h3>
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
                            <h3 className="section__title">{state.texts.projects.title[state.lang]}</h3>
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
                            <div className="projects__more">{state.texts.projects.more[state.lang]}<br/>
                                <a href="http://github.com/gilbarbara" target="_blank">Github</a> / <a
                                    href="http://codepen.io/gilbarbara/" target="_blank">Codepen</a></div>
                        </div>
                    </div>
                    <div className="section experience">
                        <div className="container">
                            <h3 className="section__title">{state.texts.experience.title[state.lang]}</h3>
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
                            <h3 className="section__title">{state.texts.extra.title[state.lang]}</h3>

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
