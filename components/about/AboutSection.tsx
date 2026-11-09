import SectionHeader from "@/components/SectionHeader";
import NoteCard from "./NoteCard";
import TechStack from "./TechStack";

type Props = {
  onOpenProject: (index: number) => void;
};

export default function AboutSection({ onOpenProject }: Props) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <SectionHeader
        title={
          <>
            About me & <em className="display-italic text-rose">Skills</em>
          </>
        }
        kicker="05 · profile · education · tech stack"
      />

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <NoteCard />
        <TechStack onOpenProject={onOpenProject} />
      </div>
    </section>
  );
}