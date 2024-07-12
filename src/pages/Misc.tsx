import DefaultIcon from "../components/DefaultIcon";
import DropdownCard from "../components/DropdownCard";
import Section from "../components/Section";
import { Block, Caption, Link } from "../components/simple";
import { cc } from "../components/utils";

function ModIcon(mod: { name: string, slug: string, avatar: string }) {
  return (
    <a
      href={`https://www.curseforge.com/minecraft/mc-mods/${mod.slug}`}
      title={mod.name}>
      <img
        aria-label={mod.name}
        className={cc(
          "h-[100px] w-[100px]",
          "md:hover:h-[150px] md:hover:w-[150px]",
          "motion-reduce:md:hover:h-[110px] motion-reduce:md:hover:w-[110px]",
          "transition-all ease-in motion-reduce:duration-100"
        )}
        src={`https://media.forgecdn.net/avatars/${mod.avatar}.png`}
      />
    </a>
  )
}

export default function OtherThings(_props: {}) {
  return (
    <Section title="Other Projects">
      <Block>An assortment of my other projects.</Block>
      <DropdownCard
        title="R16"
        icon={DefaultIcon}
        links={[
          { text: "Try", url: "https://r16.eutro.dev" },
          { text: "Source Code", url: "https://sr.ht/~williewillus/r16" }
        ]}>
        <Caption>A Racket trick bot.</Caption>
        <Block>
          Run small reusable snippets of {""}
          <Link href="https://racket-lang.org">Racket</Link> {""}
          code in your browser, or in {""}
          <Link href="https://discord.gg/6Zq8sH5" title="Racket Discord">Discord</Link>.
        </Block>
      </DropdownCard>

      <DropdownCard
        title="Minecraft Mods"
        icon={DefaultIcon}
        links={[{ text: "CurseForge", url: "https://www.curseforge.com/members/eutropium/projects" }]}>
        <Block>
          <div className="flex justify-center">
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 justify-center">
              <ModIcon slug="l12n" name="lOwOcalizatiωn" avatar="536/802/637859175423971845" />
              <ModIcon slug="framed-compacting-drawers" name="Framed Compacting Drawers" avatar="264/387/637226486288344415" />
              <ModIcon slug="multiblocktweaker" name="MultiblockTweaker" avatar="288/979/637313657690108479" />
            </div>
          </div>
        </Block>
        <Block>I've made a number of Minecraft mods, check them out and download them from CurseForge!</Block>
      </DropdownCard>

      <DropdownCard
        title="Touch Grass"
        icon={DefaultIcon}
        links={[{ text: "Touch Grass", url: "https://eutro.dev/touch_grass" }]}>
        <Block>For when you've been inside for a little too long.</Block>
      </DropdownCard>
    </Section>
  );
}
