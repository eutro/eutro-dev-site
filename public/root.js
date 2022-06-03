let e = React.createElement;
function classes(...cls) {
  let clist = [];
  for (const cn of cls) {
    if (!cn) continue;
    if (typeof cn === "string") {
      clist.push(cn);
    } else if (cn instanceof Array) {
      clist.push(classes(...cn));
    } else if (typeof cn === "object") {
      for (const k of Object.keys(cn)) {
        const v = cn[k];
        if (v) {
          clist.push(k);
        }
      }
    }
  }
  return clist.join(" ");
}
function Link(props) {
  return e("a", {
    className: classes(
      props.className,
      "text-sky-500 hover:text-sky-700"
    ),
    ...props});
}
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
    e(Link, {"href":license.url}, props.license)
  );
}
function Block(props) {
  return e("div", {className:"mb-6 last:mb-0", ...props}, props.children);
}
function BlockImg(props) {
  return e("img", {className:"mb-6 last:mb-0", "src":props.src});
}
function Caption(props) {
  return e("p", null, e("i", null, props.children));
}
function Icon(props) {
  return e("span", {className:classes("w-6 h-6 inline-flex align-center justify-center", props.className),...props});
}
function iconOf(url) {
  return function(down) {
    return e(Icon, null, e("img", {"src":url}));
  };
}
function defaultIcon(down) {
  return e(Icon, null,
           e("span", {className:"material-icons"}, down?"arrow_drop_up":"arrow_drop_down"));
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
        "div", {className:"rounded shadow-lg max-w-full text-white"}, e(
          "div", {className:classes(
            "bg-teal-500 rounded-t flex font-bold",
            {
              "rounded-b": !this.state.down,
            }
          ),
                  "onClick":this.props.body?function(){it.setState({...it.state, "down":!it.state.down});}:null},
          e("p", {className:"flex-grow align-center py-3 px-4"}, this.props.title),
          e("button", {className:"py-3 px-4 flex", "aria-label":"more options"}, this.props.icon(this.state.down)),
        ),
        (this.state.down && e(
          React.Fragment, null,
          this.props.body &&
            e("div", {
              className: classes(
                "p-6 bg-neutral-800",
                {
                  "rounded-b": !this.props.links,
                }
              )
            }, this.props.body),
          this.props.links &&
            e("footer", {className:"border-white border-t flex items-stretch rounded-b bg-neutral-800"}, this.props.links.map(function(l){
              return e(
                Link,
                {
                  className: "border-white border-r last:border-none flex justify-center flex-grow p-3 hover:text-sky-200",
                  href: l.url
                },
                l.text
              );
            })),
        ))
      )
    );
  }
}
function Section(props) {
  return e(
    "div",
    {className:"p-12"},
    e("h1", {className:"text-3xl text-slate-700 font-bold mb-6"}, props.title),
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
      "body": [e("h1", {className:"text-3xl font-semibold mb-6",style:{fontFamily: "monospace"}}, "Evaluation Order"),
               e(Caption, null, "A game about lists, functions and enlightenment.")],
      "links": [{"text":"Play","url":"https://evaluation-order.eutro.dev"},
                {"text":"Source Code","url":"https://github.com/eutro/evaluation-order"}],
    }),
    e(DropdownCard, {
      "title": "Kutyagumi",
      "icon": iconOf("https://kutyagumi.eutro.dev/icon.png"),
      "body": [e(BlockImg, {"src": "https://kutyagumi.eutro.dev/icon.png"}),
               e(Caption, null, "A game about cells and taking over the world.")],
      "links": [{"text":"More Info","url":"https://github.com/eutro/kutyagumi/#readme"},
                {"text":"Play","url":"https://kutyagumi.eutro.dev"},
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
    e(Link, {"href":"https://github.com/eutro"}, "GitHub")
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
    e("div", {className:"mb-6"}, "I make music sometimes too."),
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
