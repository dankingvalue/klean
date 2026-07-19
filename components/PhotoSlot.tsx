import { ImageIcon } from "lucide-react";

/**
 * A labelled image slot.
 *
 * To use a real photo: drop the file in /public (e.g. /public/hanging.jpg)
 * and pass src="/hanging.jpg". Until then it shows a captioned placeholder
 * so the layout is final and you only swap in the image.
 */
export default function PhotoSlot({
  src,
  caption,
  hint,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  src?: string;
  caption: string;
  hint?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-3xl border border-mist bg-white shadow-sm ${className}`}>
      <div className={`relative ${aspect} bg-paper`}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={caption} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
            <ImageIcon className="h-8 w-8 text-aqua/50" />
            <p className="text-sm font-semibold text-slate-500">{caption}</p>
            {hint && <p className="text-xs text-slate-400 max-w-[220px]">{hint}</p>}
          </div>
        )}
      </div>
      {src && (
        <figcaption className="px-5 py-3 text-sm font-medium text-slate-600 border-t border-mist">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
