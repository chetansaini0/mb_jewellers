import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getWhatsAppUrl, hasWhatsApp, siteConfig } from "@/app/lib/siteConfig";

const visitingHours = "Mon–Sat, 10:00 AM – 7:00 PM";

export function PremiumContactAside() {
  const whatsappUrl = getWhatsAppUrl("Hello MB Jewellers, I would like to book an appointment.");

  return (
    <aside className="premium-contact__aside" data-reveal>
      <div className="premium-contact__aside-intro">
        <p className="premium-contact__aside-eyebrow">Immediate Assistance</p>
        <h3 className="premium-contact__aside-title">Contact Information</h3>
        <p className="premium-contact__aside-tagline">{siteConfig.tagline}</p>
      </div>

      <div className="premium-contact__aside-list">
        <a href={`mailto:${siteConfig.contact.email}`} className="premium-contact__aside-card">
          <span className="premium-contact__aside-icon premium-contact__aside-icon--gold">
            <Mail aria-hidden />
          </span>
          <span>
            <span className="premium-contact__aside-label">Email</span>
            <span className="premium-contact__aside-value">{siteConfig.contact.email}</span>
          </span>
        </a>

        {hasWhatsApp() && whatsappUrl ? (
          <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="premium-contact__aside-card">
            <span className="premium-contact__aside-icon premium-contact__aside-icon--whatsapp">
              <MessageCircle aria-hidden />
            </span>
            <span>
              <span className="premium-contact__aside-label">WhatsApp</span>
              <span className="premium-contact__aside-value">Chat with us</span>
            </span>
          </Link>
        ) : null}

        {siteConfig.showrooms.map((showroom) => (
          <div key={showroom.id} className="premium-contact__showroom">
            <div className="premium-contact__aside-card premium-contact__aside-card--static">
              <span className="premium-contact__aside-icon premium-contact__aside-icon--gold">
                <MapPin aria-hidden />
              </span>
              <span>
                <span className="premium-contact__aside-label">{showroom.name}</span>
                <span className="premium-contact__aside-value">{showroom.address}</span>
              </span>
            </div>

            <div className="premium-contact__showroom-phones">
              {showroom.landlines.map((line) => (
                <a key={line.e164} href={`tel:${line.e164}`} className="premium-contact__aside-card">
                  <span className="premium-contact__aside-icon premium-contact__aside-icon--gold">
                    <Phone aria-hidden />
                  </span>
                  <span>
                    <span className="premium-contact__aside-label">Landline</span>
                    <span className="premium-contact__aside-value">{line.display}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="premium-contact__aside-hours">
        <p className="premium-contact__aside-hours-label">
          <Clock aria-hidden />
          Studio Hours
        </p>
        <p className="premium-contact__aside-hours-value">{visitingHours}</p>
      </div>
    </aside>
  );
}
