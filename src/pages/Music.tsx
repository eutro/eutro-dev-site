import DefaultIcon from "../components/DefaultIcon";
import DropdownCard from "../components/DropdownCard";
import IconOf from "../components/IconOf";
import License from "../components/License";
import Section from "../components/Section";
import { Block, Link } from "../components/simple";
import { Fragment } from "react"

function Track(props: { title: string, sources: React.JSX.IntrinsicElements["source"][] }) {
  return (
    <Block title={props.title}>
      <audio controls={true} loop={true} className="w-full"
        aria-label={props.title}>
        {props.sources.map((src, i) => (
          <source {...src} key={i}/>
        ))}
      </audio>
    </Block>
  );
}

export default function Music(_props: {}) {
  return (
    <Section title="Music">
      <div className="mb-6">I write music sometimes.</div>
      <DropdownCard
        title="Composure OST"
        icon={IconOf("https://composure.eutro.dev/icon.png", "Composure icon")}
      >
        <Block>Included in <Link href="https://composure.eutro.dev">Composure</Link>.</Block>
        <Block>Stream on {""}
          <Link href="https://open.spotify.com/album/6UnKYWVt2Q7DRZwdYLFmie">Spotify</Link>
          , <Link href="https://music.apple.com/gb/album/composure-original-video-game-soundtrack-ep/1653015569">
              Apple Music</Link>
          , <Link href="https://music.amazon.co.uk/albums/B0BLXMCHNX?marketplaceId=A1F83G8C2ARO7P">
              Amazon Music</Link>
          , <Link href="https://deezer.page.link/F87bYUgjvoBJuBbJ7">Deezer</Link>
          , or download the files below.
        </Block>
        {[{ tt: "first", nm: "First" },
          { tt: "rest", nm: "Rest" },
          { tt: "persistence", nm: "Persistence" },
          { tt: "transience", nm: "Transience" },
          { tt: "red_tears", nm: "Red Tears" },
          { tt: "main_menu", nm: "Title Theme" }]
          .map(({tt, nm}) => (
            <Fragment key={tt}>
              <p className="text-xl font-bold mb-2">{nm}</p>
              <Track
                title={nm}
                sources={[
                  {
                    src: `https://eutro.dev/music-files/composure/${tt}.opus`,
                    type: "audio/ogg"
                  },
                  {
                    src: `https://eutro.dev/music-files/composure/${tt}.ogg`,
                    type: "audio/ogg"
                  },
                  {
                    src: `https://eutro.dev/music-files/composure/${tt}.flac`,
                    type: "audio/flac"
                  }
                ]}
              />
            </Fragment>
          ))}
        <License license="CC BY-SA 4.0"/>
      </DropdownCard>

      <DropdownCard
        title={`Semantic Construct "OST"`}
        icon={IconOf("https://semantic-construct.eutro.dev/assets/icon.png", "Semantic Construct icon")}
      >
        <Block>Included in <Link href="https://semantic-construct.eutro.dev">Semantic Construct</Link>.</Block>
        <Track title="loop1" sources={[{
          src: "https://semantic-construct.eutro.dev/assets/audio/loop1.mp3",
          type: "audio/mpeg"
        }]} />
        <License license="CC0"/>
      </DropdownCard>

      <DropdownCard
        title={`Evaluation Order "OST"`}
        icon={IconOf("https://eutro.github.io/evaluation-order/icon.svg", "Evaluation Order icon")}
      >
        <Block>Included in <Link href="https://evaluation-order.eutro.dev">Evaluation Order</Link>.</Block>
        <Track title="loop0" sources={[{
          src: "https://evaluation-order.eutro.dev/audio/loop0.wav",
          type: "audio/wav"
        }]}/>
        <Track title="loop1" sources={[{
          src: "https://evaluation-order.eutro.dev/audio/loop1.wav",
          type: "audio/wav"
        }]}/>
        <License license="CC0"/>
      </DropdownCard>

      <DropdownCard
        title="Doodles"
        icon={DefaultIcon}>
        <Block>Some untitled doodles.</Block>
        <Track title="2022-02-26" sources={[
          {"src": "https://eutro.dev/music-files/2022-02-26.ogg", "type": "audio/ogg"},
          {"src": "https://eutro.dev/music-files/2022-02-26.wav", "type": "audio/wav"},
          {"src": "https://eutro.dev/music-files/2022-02-26.mp3", "type": "audio/mpeg"}
        ]}/>
        <Track title="2022-02-06" sources={[
          {"src": "https://eutro.dev/music-files/2022-02-06.wav", "type": "audio/wav"},
          {"src": "https://eutro.dev/music-files/2022-02-06.mp3", "type": "audio/mpeg"}
        ]}/>
        <Track title="2021-12-05" sources={[
          {"src": "https://eutro.dev/music-files/2021-12-05.wav", "type": "audio/wav"},
          {"src": "https://eutro.dev/music-files/2021-12-05.mp3", "type": "audio/mpeg"}
        ]}/>
        <License license="CC BY 4.0"/>
      </DropdownCard>
    </Section>
  );
}
