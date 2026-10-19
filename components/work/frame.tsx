import Image from "next/image";
import type { Project } from "@/lib/work";
import { size } from "@/lib/work";

const host = (url?: string) => (url ? new URL(url).host.replace(/^www\./, "") : undefined);

/** A hairline browser window around a project screenshot. */
export function BrowserFrame({
  project,
  src,
  priority = false,
  sizes = "(max-width: 900px) 90vw, 50vw",
}: {
  project: Project;
  src?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = src ?? project.cover;
  return (
    <div className="frame">
      <div className="frame__bar" aria-hidden="true">
        <span className="frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame__url">{host(project.url) ?? project.name}</span>
      </div>
      <div className="frame__view">
        {image ? (
          <Image
            src={image}
            {...size(image)}
            alt={`${project.name} — ${project.kind}`}
            className="frame__cover"
            sizes={sizes}
            priority={priority}
          />
        ) : (
          <ProjectMonogram project={project} />
        )}
      </div>
    </div>
  );
}

/** For projects with no screenshot: the name set large in the client's colour. */
export function ProjectMonogram({ project }: { project: Project }) {
  return (
    <div className="monogram" style={{ background: project.colour }}>
      <span className="monogram__kind">{project.kind}</span>
      <span className="monogram__name">{project.name}</span>
    </div>
  );
}

/** A phone outline around a mobile screenshot. */
export function PhoneFrame({ project }: { project: Project }) {
  if (!project.mobile) return null;
  return (
    <div className="phone" aria-hidden="true">
      <Image src={project.mobile} {...size(project.mobile)} alt="" sizes="220px" className="phone__screen" />
    </div>
  );
}

/** The project's own colour as a small square, beside its sector. */
export function Chip({ colour }: { colour: string }) {
  return <span className="chip" style={{ background: colour }} aria-hidden="true" />;
}
