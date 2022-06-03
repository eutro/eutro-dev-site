(function() {
  let e = React.createElement;
  function License(props) {
    if (props.license === "ARR") {
        return e(Block, null, "All rights reserved");
    }
    let licenses = {
      "MIT": {"url": "https://opensource.org/licenses/mit-license.php"},
      "CC0": {"url": "http://creativecommons.org/publicdomain/zero/1.0/"},
      "CC-BY-4.0": {"url": "https://creativecommons.org/licenses/by/4.0/"},
    };
    let license = licenses[props.license];
    return e(
      Block, null,
      "License: ",
      e("a", {"href":license.url,"class":"has-text-link"}, props.license)
    );
  }
  function Block(props) {
    return e("div", {"class":"block", ...props}, props.children);
  }
  function BlockImg(props) {
    return e("img", {"class":"block", "src":props.src});
  }
  function Caption(props) {
    return e("p", null, e("i", null, props.children));
  }
  function iconOf(url) {
    return function(down) {
      return e("img", {"class":"icon","src":url});
    };
  }
  function defaultIcon(down) {
    return e("span", {"class":"icon material-icons"}, down?"arrow_drop_up":"arrow_drop_down");
  }
  class DropdownCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {"down":false};
    }
    render() {
      let it = this;
      return e(
        Block, null, e(
          "div", {"class":"card"}, e(
            "div", {"class":"card-header has-background-primary has-text-white",
                    "onClick":function(){it.setState({...it.state, "down":!it.state.down});}},
            e("p", {"class":"card-header-title has-text-white"}, this.props.title),
            e("button", {"class":"card-header-icon","aria-label":"more options"}, this.props.icon(this.state.down)),
          ),
          (this.state.down && e(
            React.Fragment, null,
            this.props.body && e("div", {"class":"card-content has-background-dark has-text-white"}, this.props.body),
            this.props.links && e("footer", {"class":"card-footer togglable has-background-dark"}, this.props.links.map(function(l){
              return e("a", {"class":"card-footer-item has-text-link-light","href":l.url}, l.text);
            })),
          ))
        )
      );
    }
  }
  function Section(props) {
    return e(
      "div",
      {"class":"section"},
      e("h1", {"class":"title"}, props.title),
      props.children,
    );
  }
  function ThisSite(props) {
    return e(
      Section,
      {"title":"Things on this site"},
      e(DropdownCard, {
        "title": "Semantic Construct",
        "icon": iconOf("https://semantic-construct.eutro.dev/assets/icon.png"),
        "body": [e(BlockImg, {"src": "https://semantic-construct.eutro.dev/assets/logo.svg"}),
                 e(Caption, null, "A puzzle game about building a world with words.")],
        "links": [{"text":"Play","url":"https://semantic-construct.eutro.dev"},
                  {"text":"Source Code","url":"https://github.com/eutro/semantic-construct"}],
      }),
      e(DropdownCard, {
        "title": "Evaluation Order",
        "icon": defaultIcon,
        "body": [e("h1", {"class":"title has-text-white","style":{"font-family":"monospace"}}, "Evaluation Order"),
                 e(Caption, null, "A game about lists, functions and enlightenment.")],
        "links": [{"text":"Play","url":"https://evaluation-order.eutro.dev"},
                  {"text":"Source Code","url":"https://github.com/eutro/evaluation-order"}],
      }),
      e(DropdownCard, {
        "title": "Kutyagumi",
        "icon": iconOf("https://kutyagumi.eutro.dev/icon.png"),
        "body": [e(BlockImg, {"src": "https://kutyagumi.eutro.dev/icon.png"}),
                 e(Caption, null, "A game about cells and taking over the world.")],
        "links": [{"text":"Play","url":"https://kutyagumi.eutro.dev"},
                  {"text":"Source Code","url":"https://github.com/eutro/kutyagumi"}],
      }),
      e(DropdownCard, {
        "title": "R16",
        "icon": defaultIcon,
        "body": [e(Caption, null, "A Racket trick bot.")],
        "links": [{"text":"Try","url":"https://r16.eutro.dev"},
                  {"text":"Source Code","url":"https://sr.ht/~williewillus/r16"}],
      }),
    );
  }
  function OtherSites(props) {
    return e(
      Section,
      {"title":"Things on other sites"},
      e("a", {"href":"https://github.com/eutro"}, "GitHub")
    );
  }
  function Music(props) {
    class Track extends React.Component {
      constructor(props) {
        super(props)
      }
      render() {
        return e(
          Block, {"title":this.props.title}, e(
            "audio", {"controls":true, "loop":true},
            this.props.sources.map(function(source){return e("source", source);}),
          ),
        );
      }
    }
    return e(
      Section,
      {"title":"Music"},
      e("div", {"class":"content"}, "I make music sometimes too."),
      e(DropdownCard, {
        "title": "Semantic Construct \"OST\"",
        "icon": iconOf("https://semantic-construct.eutro.dev/assets/icon.png"),
        "body": [e(Block, null, "Included in Semantic Construct."),
                 e(Track, {"sources":[{"src": "https://semantic-construct.eutro.dev/assets/audio/loop1.mp3",
                                       "type": "audio/mpeg"}]}),
                 e(License, {"license":"CC0"})],
      }),
      e(DropdownCard, {
        "title": "Evaluation Order \"OST\"",
        "icon": defaultIcon,
        "body": [e(Block, null, "Included in Evaluation Order."),
                 e(Track, {"sources":[{"src": "https://evaluation-order.eutro.dev/audio/loop0.wav",
                                       "type": "audio/wav"}]}),
                 e(Track, {"sources":[{"src": "https://evaluation-order.eutro.dev/audio/loop1.wav",
                                       "type": "audio/wav"}]}),
                 e(License, {"license":"CC0"})],
      }),
      e(DropdownCard, {
        "title": "Doodles",
        "icon": defaultIcon,
        "body": [e(Block, null, "Some untitled doodles."),
                 e(Track, {"sources": [{"src": "/music/2022-02-26.ogg", "type": "audio/ogg"},
                                       {"src": "/music/2022-02-26.wav", "type": "audio/wav"},
                                       {"src": "/music/2022-02-26.mp3", "type": "audio/mpeg"}],
                           "title": "2022-02-26"}),
                 e(Track, {"sources": [{"src": "/music/2022-02-06.wav", "type": "audio/wav"},
                                       {"src": "/music/2022-02-06.mp3", "type": "audio/mpeg"}],
                           "title": "2022-02-06"}),
                 e(Track, {"sources": [{"src": "/music/2021-12-05.wav", "type": "audio/wav"},
                                       {"src": "/music/2021-12-05.mp3", "type": "audio/mpeg"}],
                           "title": "2021-12-05"}),
                 e(License, {"license":"CC-BY-4.0"})],
      }),
    );
  }
  function App(props) {
    return e(
      React.Fragment,
      null,
      e(ThisSite, null),
      e(Music, null),
    );
  }
  ReactDOM.render(
    e(App, null),
    document.getElementById("root-container")
  );
})()
