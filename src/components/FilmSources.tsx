import { asset } from "@/lib/asset";

/**
 * <source> pair for a film from scripts/build-media.py: AV1 first (sharper and
 * about a third of the size), H.264 as the fallback for browsers without AV1.
 */
export function FilmSources({ name }: { name: string }) {
  return (
    <>
      <source src={asset(`/media/film-${name}.av1.mp4`)} type='video/mp4; codecs="av01.0.08M.08"' />
      <source src={asset(`/media/film-${name}.mp4`)} type="video/mp4" />
    </>
  );
}
