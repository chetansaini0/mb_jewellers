import { flagshipStudio } from "@/app/lib/siteData";

export function PremiumStudioMap() {
  return (
    <div className="premium-map__frame">
      <iframe
        title={`${flagshipStudio.name} on Google Maps`}
        src={flagshipStudio.mapEmbedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="premium-map__embed"
      />
    </div>
  );
}
