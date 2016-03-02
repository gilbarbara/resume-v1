import React from 'react';
import { autobind } from 'core-decorators';
import Header from './components/Header';
import texts from '../texts.json';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: location.pathname.indexOf('en') > -1 ? 'en' : 'pt',
      texts
    };
  }

  @autobind
  setLang(e) {
    const lang = e.currentTarget.checked ? 'en' : 'pt';

    window.history.pushState('', '', (lang === 'pt' ? '/' : '?en'));
    this.setState({
      lang
    });
  }

  render() {
    const state = this.state;
    const strings = state.texts;

    return (
      <div className="app">
        <Header lang={state.lang} setLang={this.setLang} texts={state.texts} />

        <main>
          <div className="section summary">
            <div className="container">
              <h3 className="section__title">{state.texts.summary.title[state.lang]}</h3>
              <ul className="section__list">
                {strings.summary.items[state.lang].map((item, i) =>
                  (<li key={i}>{item}</li>)
                )}
              </ul>
            </div>
          </div>

          <div className="section skills">
            <div className="container">
              <h3 className="section__title">{strings.skills.title[state.lang]}</h3>
              <ul className="section__list">
                <li>
                  <h4>HTML/CSS</h4>

                  <p>HTML5 (JADE/HAML), CSS3, Sass, Less, Emmet, SVG, Responsive Web Design,
                    Bootstrap, Micro-frameworks, SEO</p>
                </li>
                <li>
                  <h4>Javascript</h4>

                  <p>React/Flux, Backbone/Marionette, Meteor, D3, Handlebars, Jasmine/Mocha. ES
                    5/6/7</p>
                </li>

                <li>
                  <h4>Back-end</h4>

                  <p>Node.js, PHP (Wordpress/Laravel), Ruby, Python, Objective-C, MySQL, MongoDB,
                    Redis, Rest-API, Bash</p>
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
              <h3 className="section__title">{strings.projects.title[state.lang]}</h3>
              <ul className="section__list">
                <li><a href="http://svgporn.com/" className="project" target="_blank">
                  <div className="project__image">
                    <img
                      src="media/projects/svgporn.svg"
                      className="project"
                      title="SVG Porn" />
                  </div>
                  <div className="project__name">SVG Porn</div>
                </a>
                </li>
                <li><a href="http://favstagram.me/" className="project" target="_blank">
                  <div className="project__image">
                    <img
                      src="media/projects/favstagram.svg"
                      className="project"
                      title="Favstagram" />
                  </div>
                  <div className="project__name">Favstagram</div>
                </a>
                </li>
                <li>
                  <a href="http://colormeup.co/" className="project" target="_blank">
                    <div className="project__image">
                      <img src="media/projects/colormeup.svg" title="Colormeup" />
                    </div>
                    <div className="project__name">Colormeup</div>
                  </a>
                </li>
                <li>
                  <a href="http://kollectiv.org/" target="_blank">
                    <div className="project__image">
                      <img src="media/projects/kollectiv.svg" className="project" title="Kollectiv" />
                    </div>
                    <div className="project__name">Kollectiv</div>
                  </a>
                </li>
                <li>
                  <a
                    href="http://apps.facebook.com/abovetheskyline/"
                    className="project"
                    target="_blank">
                    <div className="project__image">
                      <img src="media/projects/skyline.svg" title="Above The Skyline" />
                    </div>
                    <div className="project__name">Above The Skyline</div>
                  </a>
                </li>
                <li><a href="http://littlealchemyhelper.com/" className="project" target="_blank">
                  <div className="project__image">
                    <img
                      src="media/projects/little-alchemy-helper.svg"
                      title="Little Alchemy Helper" />
                  </div>
                  <div className="project__name">LittleAlchemy Helper</div>
                </a>
                </li>
              </ul>
              <div className="projects__more">{strings.projects.more[state.lang]}<br />
                <a href="http://github.com/gilbarbara" target="_blank">Github</a> / <a
                  href="http://codepen.io/gilbarbara/" target="_blank">Codepen</a></div>
            </div>
          </div>
          <div className="section experience">
            <div className="container">
              <h3 className="section__title">{strings.experience.title[state.lang]}</h3>
              <ul className="section__list">
                {strings.experience.items[state.lang].map((item, i) =>
                  (<li key={i}>
                    <span className="timeframe">{item.timeframe}</span>
                    {item.title
                      ? (<a href={item.link} className="title" target="_blank">{item.title}</a>)
                      : ''
                    }
                    {item.description}

                    <em>{strings.experience.learned[state.lang]}: {item.experience}</em>
                  </li>)
                )}
              </ul>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <h3 className="section__title">{strings.extra.title[state.lang]}</h3>

              <p>{strings.extra.text[state.lang]} – <a
                href="http://rraurl.com/gilbarbara"
                target="_blank">http://rraurl.com/gilbarbara</a>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
