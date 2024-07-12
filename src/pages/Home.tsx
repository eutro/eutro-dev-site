import Section from "../components/Section";
import { Block, Link } from "../components/simple";

export default function Home(_props: {}) {
  return (
    <Section title="Home">
      <Block>Welcome to my website, see above for some of my projects.</Block>
      <Block>
        <h2 className="text-xl text-slate-700 dark:text-slate-100 font-bold mb-2">
          Find me on
        </h2>
        <Block className="pl-6">
          <ul className="list-disc">
            <li><Link href="https://github.com/eutro">GitHub</Link></li>
            <li><Link href="https://linkedin.com/in/beatrice-szilvasy/">LinkedIn</Link></li>
            <li><Link href="https://eutro.itch.io/">itch.io</Link></li>
          </ul>
        </Block>
      </Block>
    </Section>
  );
}
