import DropdownCard from "../components/DropdownCard";
import IconOf from "../components/IconOf";
import Section from "../components/Section";
import { Block, BlockImg, Caption, Link } from "../components/simple";

export default function Games(_props: {}) {
  return (
    <Section title="Games">
      <Block>
        Here are some games I've made for <Link href="https://itch.io/jams">game jams</Link>
        , you can play them all in your browser!
      </Block>

      <DropdownCard
        title="Composure"
        icon={IconOf("https://composure.eutro.dev/icon.png", "Composure icon")}
        links={[
          { text: "Download", url: "https://github.com/eutro/composure/releases/tag/1.0.0" },
          { text: "Play", url: "https://composure.eutro.dev" },
          { text: "Source Code", url: "https://github.com/eutro/composure" }
        ]}>
        <BlockImg src="https://composure.eutro.dev/title.svg" aria-label="Composure logo"/>
        <Caption>Compose your thoughts and functions. You'll be alright.</Caption>
        <Block>
          For the best experience, it is recommended that you play the downloadable version. {""}
          Mobile platforms are also unfortunately not supported.
        </Block>
      </DropdownCard>

      <DropdownCard
        title="Semantic Construct"
        icon={IconOf("https://semantic-construct.eutro.dev/assets/icon.png", "Semantic Construct icon")}
        links={[
          { text: "Play", url: "https://semantic-construct.eutro.dev" },
          { text: "Source Code", url: "https://github.com/eutro/semantic-construct" }
        ]}>
        <Block>
          <svg height="72px" width="138px" viewBox="0 0 138 72" xmlns="http://www.w3.org/2000/svg"
            aria-label="Semantic Construct logo">
            <text style={{fontFamily: "Arial, sans-serif", fontSize: "28px", whiteSpace: "pre"}}
              transform="matrix(1.072165, 0, 0, 1.072167, -0.000021, 27.037241)">
              <tspan style={{fill: "currentColor"}}>Semantic</tspan>
              <tspan x="0" dy="1em">{"\u200B"}</tspan>
              <tspan style={{fill: "currentColor"}}>Construct</tspan>
              <tspan style={{fill: "rgb(255, 0, 0)"}}>;</tspan>
            </text>
          </svg>
        </Block>
        <Caption>A puzzle game about building a world with words.</Caption>
      </DropdownCard>

      <DropdownCard
        title="Evaluation Order"
        icon={IconOf("https://eutro.github.io/evaluation-order/icon.svg", "Evaluation Order icon")}
        links={[
          { text: "Play", url: "https://evaluation-order.eutro.dev" },
          { text: "Source Code", url: "https://github.com/eutro/evaluation-order" }
        ]}>
        <h1 className="text-3xl font-semibold mb-6" style={{fontFamily: "monospace"}}>
          Evaluation Order
        </h1>
        <Caption>A game about lists, functions and enlightenment.</Caption>
      </DropdownCard>

      <DropdownCard
        title="Kutyagumi"
        icon={IconOf("https://kutyagumi.eutro.dev/icon.png", "Kutyagumi icon")}
        links={[
          { text: "More Info", url: "https://github.com/eutro/kutyagumi/#readme"},
          { text: "Play", url: "https://kutyagumi.eutro.dev"},
          { text: "Source Code", url: "https://github.com/eutro/kutyagumi"}
        ]}>
        <BlockImg src="https://kutyagumi.eutro.dev/icon.png" aria-label="Kutyagumi logo"/>
        <Caption>A game about cells and taking over the world.</Caption>
      </DropdownCard>
    </Section>
  );
}
