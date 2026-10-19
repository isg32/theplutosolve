import Image from "next/image";
import { team } from "@/lib/people";
import { size } from "@/lib/work";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { SectionHeader } from "@/components/ui";

/** The founders, then the core team. Photos warm from greyscale to colour on hover. */
export function Team() {
  return (
    <>
      <SectionHeader eyebrow={team.eyebrow} title={team.headline} lead={team.lead} />
      <Stagger as="ul" className="team" stagger={0.15}>
        {team.members.map((m) => (
          <StaggerItem as="li" key={m.name} className="member">
            <div className="member__photo">
              <Image src={m.photo} {...size(m.photo)} alt={m.name} sizes="(max-width: 900px) 90vw, 40vw" />
            </div>
            <div className="member__body">
              <p className="ps-eyebrow">{m.role}</p>
              <h3 className="member__name">{m.name}</h3>
              {m.bio.map((b) => (
                <p key={b} className="member__bio">
                  {b}
                </p>
              ))}
              <p className="member__quote">“{m.quote}”</p>
              <ul className="member__focus">
                {m.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="core-team">
        <div>
          <p className="ps-eyebrow">{team.core.role}</p>
          <h3 className="member__name">{team.core.title}</h3>
        </div>
        <div>
          <ul>
            {team.core.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="core-team__closing">{team.core.closing}</p>
        </div>
      </Reveal>
    </>
  );
}
