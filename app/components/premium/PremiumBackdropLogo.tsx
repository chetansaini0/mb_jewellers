import Image from "next/image";

export function PremiumBackdropLogo() {
  return (
    <div className="premium-backdrop-logo" aria-hidden>
      <Image
        src="/mb-jewellers-logo.png"
        alt=""
        width={896}
        height={768}
        priority={false}
        className="premium-backdrop-logo__image"
      />
    </div>
  );
}
