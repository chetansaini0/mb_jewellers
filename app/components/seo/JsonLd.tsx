/**
 * Server-rendered JSON-LD. Emits a plain `<script type="application/ld+json">` in the initial
 * HTML so crawlers and validators see it without executing JavaScript. (next/script with
 * dangerouslySetInnerHTML only injected the payload on the client, so the site-wide
 * JewelryStore / Organization / WebSite graphs were missing from the server HTML.)
 */
export function JsonLd({ id, data }: { id?: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
