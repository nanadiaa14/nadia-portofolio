import { about, profile } from "@/data/portofolio";
import Photo from "@/components/ui/Photo";

// The "About me" note with a taped-on polaroid.
export default function NoteCard() {
  return (
    <div className="relative flex flex-col gap-[18px] rounded-md border border-ink/10 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(35,25,32,0.5)] md:p-9">
      {/* polaroid */}
      <div className="absolute -top-7 right-3 z-10 rotate-[5deg] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 md:-right-3.5">
        <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-[70px] -translate-x-1/2 -rotate-[4deg] bg-silver-deep/85" />
        <div className="flex w-[120px] flex-col gap-1.5 bg-white px-2 pb-2.5 pt-2 shadow-[0_16px_30px_-14px_rgba(35,25,32,0.5)] md:w-[136px]">
          <Photo src={profile.photo} alt={profile.fullName} label="your photo" sizes="136px" className="h-[104px] md:h-[120px]" />
          <span className="display-italic text-center text-[15px]">{profile.firstName}</span>
        </div>
      </div>

      <p className="label text-[10px] text-rose">About me</p>
      <p className="display max-w-[calc(100%-124px)] text-[clamp(32px,4vw,40px)] leading-[1.02] sm:max-w-[11ch]">
        {about.heading} <em className="display-italic text-rose">{about.headingItalic}</em>
      </p>
      {about.paragraphs.map((text) => (
        <p key={text} className="leading-[1.75]">
          {text}
        </p>
      ))}

      <dl className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-3.5 gap-y-2.5 border-t border-ink pt-4 text-sm leading-normal">
        <dt className="label pt-0.5 text-[10px] text-muted-soft">Education</dt>
        <dd>
          {about.education.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </dd>
        <dt className="label pt-0.5 text-[10px] text-muted-soft">Languages</dt>
        <dd>{about.languages}</dd>
      </dl>
    </div>
  );
}