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
    ...props,
    className: classes(
      props.className,
      "text-sky-500 hover:text-sky-700"
    )});
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
  return e("div", {...props, className:classes("mb-6 last:mb-0", props.className)}, props.children);
}

function BlockImg(props) {
  return e(Block, null, e("img", props));
}

function Caption(props) {
  return e("p", {className: "mb-6 last:mb-0"}, e("i", null, props.children));
}

function Icon(props) {
  return e("span", {
    ...props,
    down: undefined,
    className: classes(
      "inline-flex align-center justify-center",
      props.className
    )});
}

function IconOf(url, name) {
  return function(props) {
    return e(
      Icon, props,
      e("img", {
        className: classes(
          "transition motion-reduce:transition-none duration-500",
          props.down && "rotate-[360deg]",
        ),
        src: url,
        alt: "v",
        "aria-label": name,
      }));
  };
}

function MatIcon(props) {
  return e("span", {
    ...props,
    className: classes("material-icons", props.className),
  })
}

function DefaultIcon(props) {
  return e(
    Icon, props,
    e(MatIcon, {
      className: classes(
        "transition motion-reduce:transition-none duration-500",
        props.down && "-scale-y-100",
      )
    },
      "arrow_drop_down"));
}

function DropdownCard(props) {
  let [down, setDown] = React.useState(false);
  return e(
    Block, null, e(
      "div", {className:"rounded shadow-lg max-w-full"}, e(
        "div", {
          className:classes(
            "bg-teal-300 dark:bg-teal-800 dark:text-white rounded-t flex font-bold",
            !down && "rounded-b",
          ),
          "aria-label": props.title,
          role: "button",
          tabIndex: 0,
          onKeyDown: props.body?function(evt){if(evt.which===13||evt.which===32){setDown(!down);evt.preventDefault()}}:null,
          onClick: props.body?function(){setDown(!down);}:null
        },
        e("p", {className:"flex-grow align-center py-3 px-4"}, props.title),
        e("button", {className:"py-3 px-4 flex", "aria-label":"more options",tabIndex:-1},
          e(props.icon, {className: "w-6 h-6", down: down})),
      ),
      e("div", {className: classes(
        "collapsible-wrapper",
        !down && "collapsed"
      )},
        e("div", {className: "collapsible w-full"},
          props.body &&
            e("div", {
              className: classes(
                "p-6 dark:bg-neutral-800",
                !props.links && "rounded-b",
              )
            }, props.body.map(function(b, i){return e(React.Fragment, {key: i}, b);})),
          props.links &&
          e("footer", {className:"border-slate-300 dark:border-white border-t flex items-stretch rounded-b dark:bg-neutral-800"},
            props.links.map(function(l, i) {
              return e(
                Link,
                {
                  key: i,
                  className: classes(
                    "p-3",
                    "border-slate-300 dark:border-white border-r last:border-none",
                    "flex justify-center flex-grow",
                    "dark:text-slate-200 dark:hover:text-sky-200",
                  ),
                  href: l.url
                },
                l.text
              );
            }))))));
}

function Section(props) {
  return e(
    "div",
    {className:"p-12 pb-0 last:pb-12"},
    e("h1", {className:"text-3xl text-slate-700 dark:text-slate-100 font-bold mb-6"}, props.title),
    props.children,
  );
}

function Games(props) {
  return e(
    Section,
    {title: "Games"},
    e(Block, null, "Here are some games I've made, you can play them all in your browser!"),
    e(DropdownCard, {
      "title": "Semantic Construct",
      "icon": IconOf("https://semantic-construct.eutro.dev/assets/icon.png", "Semantic Construct icon"),
      "body": [e(Block, null,
                 e(
                   "svg", {height: "72px", width: "138px", viewBox: "0 0 138 72", xmlns: "http://www.w3.org/2000/svg",
                           "aria-label": "Semantic Construct logo"},
                   e("text", {
                     style: {fontFamily: "Arial, sans-serif", fontSize: "28px", whiteSpace: "pre"},
                     transform: "matrix(1.072165, 0, 0, 1.072167, -0.000021, 27.037241)"
                   },
                     e("tspan", {style: {fill: "currentColor"}}, "Semantic"),
                     e("tspan", {x: "0", dy: "1em"}, "\u200B"),
                     e("tspan", {style: {fill: "currentColor"}}, "Construct"),
                     e("tspan", {style: {fill: "rgb(255, 0, 0)"}}, ";")))),
               e(Caption, null, "A puzzle game about building a world with words.")],
      "links": [{"text":"Play","url":"https://semantic-construct.eutro.dev"},
                {"text":"Source Code","url":"https://github.com/eutro/semantic-construct"}],
    }),
    e(DropdownCard, {
      "title": "Evaluation Order",
      "icon": DefaultIcon,
      "body": [e("h1", {className:"text-3xl font-semibold mb-6",style:{fontFamily: "monospace"}}, "Evaluation Order"),
               e(Caption, null, "A game about lists, functions and enlightenment.")],
      "links": [{"text":"Play","url":"https://evaluation-order.eutro.dev"},
                {"text":"Source Code","url":"https://github.com/eutro/evaluation-order"}],
    }),
    e(DropdownCard, {
      "title": "Kutyagumi",
      "icon": IconOf("https://kutyagumi.eutro.dev/icon.png", "Kutyagumi icon"),
      "body": [e(BlockImg, {"src": "https://kutyagumi.eutro.dev/icon.png", "aria-label": "Kutyagumi logo"}),
               e(Caption, null, "A game about cells and taking over the world.")],
      "links": [{"text":"More Info","url":"https://github.com/eutro/kutyagumi/#readme"},
                {"text":"Play","url":"https://kutyagumi.eutro.dev"},
                {"text":"Source Code","url":"https://github.com/eutro/kutyagumi"}],
    }),
  );
}

function Home(props) {
  return e(
    Section,
    {title: "Home"},
    e(Block, null, "Hello! This is my site for me to showcase a few of my cool projects publicly."),
  );
}

function OtherThings(props) {
  return e(
    Section,
    {title: "Other Projects"},
    e(Block, null, "An assortment of my other projects."),
    e(DropdownCard, {
      "title": "R16",
      "icon": DefaultIcon,
      "body": [e(Caption, null, "A Racket trick bot."),
               e(Block, null,
                 "Run small reusable snippets of ",
                 e(Link, {href:"https://racket-lang.org"}, "Racket"),
                 " code in your browser.")],
      "links": [{"text":"Try","url":"https://r16.eutro.dev"},
                {"text":"Source Code","url":"https://sr.ht/~williewillus/r16"}],
    }),
    e(DropdownCard, {
      "title": "Minecraft Mods",
      "icon": DefaultIcon,
      "body": [e(Block, null,
                 e("div", {className: "flex justify-center"},
                   e("div", {className: "flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 justify-center"},
                     [{icon:"https://media.forgecdn.net/avatars/536/802/637859175423971845.png",
                       slug:"l12n",
                       name:"lOwOcalizatiωn"},
                      {icon:"https://media.forgecdn.net/avatars/264/387/637226486288344415.png",
                       slug:"framed-compacting-drawers",
                       name:"Framed Compacting Drawers"},
                      {icon:"https://media.forgecdn.net/avatars/288/979/637313657690108479.png",
                       slug:"multiblocktweaker",
                       name:"MultiblockTweaker"}]
                     .map(function(mod, i) {
                       return e("a", {
                         key: i,
                         href: "https://www.curseforge.com/minecraft/mc-mods/" + mod.slug,
                         title: mod.name,
                       }, e("img", {
                         "aria-label": mod.name,
                         className: classes(
                           "h-[100px] w-[100px]",
                           "md:hover:h-[150px] md:hover:w-[150px]",
                           "motion-reduce:md:hover:h-[110px] motion-reduce:md:hover:w-[110px]",
                           "transition-all ease-in motion-reduce:duration-100"
                         ),
                         src: mod.icon,
                       }))})))),
               e(Block, null, "I've made a number of Minecraft mods, check them out and download them from CurseForge!")],
      "links": [{"text": "CurseForge","url":"https://www.curseforge.com/members/eutropium/projects"}]
    }),
  );
}

function Music(props) {
  function Track(props) {
    let audioRef = React.useRef(null);
    return e(
      Block, {title: props.title, key: props.key},
      e(
        "audio", {
          controls: true,
          loop: true,
          className: "w-full",
          "aria-label": props.title
        },
        props.sources.map(function(source, i) {return e("source", {...source, key: i});}),
      ));
  }
  return e(
    Section,
    {"title":"Music"},
    e("div", {className:"mb-6"}, "I make music sometimes too."),
    e(DropdownCard, {
      "title": "Semantic Construct \"OST\"",
      "icon": IconOf("https://semantic-construct.eutro.dev/assets/icon.png", "Semantic Construct icon"),
      "body": [e(Block, null, "Included in ", e(Link, {href:"https://semantic-construct.eutro.dev"}, "Semantic Construct"), "."),
               e(Track, {"sources":[{"src": "https://semantic-construct.eutro.dev/assets/audio/loop1.mp3",
                                     "type": "audio/mpeg"}]}),
               e(License, {"license":"CC0"})],
    }),
    e(DropdownCard, {
      "title": "Evaluation Order \"OST\"",
      "icon": DefaultIcon,
      "body": [e(Block, null, "Included in ", e(Link, {href:"https://evaluation-order.eutro.dev"}, "Evaluation Order"), "."),
               e(Track, {"sources":[{"src": "https://evaluation-order.eutro.dev/audio/loop0.wav",
                                     "type": "audio/wav"}]}),
               e(Track, {"sources":[{"src": "https://evaluation-order.eutro.dev/audio/loop1.wav",
                                     "type": "audio/wav"}]}),
               e(License, {"license":"CC0"})],
    }),
    e(DropdownCard, {
      "title": "Doodles",
      "icon": DefaultIcon,
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

function Navbar(props) {
  let tabs = props.tabs;
  let subpage = props.subpage;
  let setSubpage = props.setSubpage;
  let [burgerActive, setBurgerActive] = React.useState(false);
  return e(
    "div",
    {className: classes(
      "bg-gray-100 dark:bg-gray-900 dark:text-white",
      "px-2 flex align-center relative"
    )},
    e(Icon, {className: "my-auto w-12 h-12 p-1 my-2 bg-white dark:bg-slate-700 rounded-full"},
      e("a", {href:"/"},
        e("img", {src:"/favicon.ico", title:"logo"}))),
    e("div", {
      className: classes(
        "bg-gray-100 dark:bg-gray-900 w-full absolute bottom-0 z-10 flex",
        "flex-col md:flex-row",
        "md:inline-flex",
        "translate-y-full md:translate-y-0",
        "-ml-2 md:ml-0",
        "md:left-14",
        "md:max-h-fit",
        "overflow-hidden transition-[opacity,max-height]",
        burgerActive ? "opacity-100 max-h-[100vh]" : "opacity-0 md:opacity-100 max-h-0"
      )
    },
      tabs.map(function(tab, i) {
        return e(
          "a",
          {key: i,
           href: tab.href,
           className: classes(
             "p-2 mb-3 md:mt-auto md:rounded-t my-auto md:ml-3 md:mb-0",
             subpage === i
               ? "bg-white dark:bg-slate-800"
               : ["bg-teal-200 hover:bg-teal-100",
                  "dark:bg-teal-700 dark:hover:bg-teal-900"],
           ),
           onClick() {setSubpage(i);}},
          tab.title
        );
      })),
    e("button",
      {className: classes(
        "w-12 h-12 my-auto cursor-pointer relative ml-auto inline-flex align-center justify-center",
        "md:hidden",
      ),
       onClick(){setBurgerActive(!burgerActive);}},
      e(MatIcon, {
        className: classes(
          "text-[48px] absolute t-0 l-0 transition duration-100 ease-linear",
          burgerActive ? "opacity-0" : "opacity-100",
        ),
      },
        "menu"),
      e(MatIcon, {
        className: classes(
          "text-[48px] absolute t-0 l-0 transition duration-100 ease-linear",
          burgerActive ? "opacity-100" : "opacity-0",
        ),
      },
        "close")));
}

function App(props) {
  let tabs = [
    {component: Home,
     title: "Home",
     href: "#home"},
    {component: Games,
     title: "Games",
     href: "#games"},
    {component: Music,
     title: "Music",
     href: "#music"},
    {component: OtherThings,
     title: "Other Projects",
     href: "#others"},
  ];
  let [subpage, setSubpage] = React.useState(function() {
    let tabHashes = new Map(tabs.map(function(tab, i){return [tab.href, i];}));
    return tabHashes.get(document.location.hash) || 0;
  });
  return e(
    React.Fragment,
    null,
    e(Navbar, {subpage: subpage, setSubpage: setSubpage, tabs: tabs}),
    e("div", {className: "bg-white dark:bg-slate-800"},
      e("div", {className: "mx-auto 2xl:max-w-screen-xl xl:max-w-screen-lg lg:max-w-screen-md"},
        e(tabs[subpage].component))),
  );
}

let root = ReactDOM.createRoot(document.getElementById("root-container"));
root.render(e(App, null));
