/**
 * The glotfiles mark — same artwork as app/icon.svg so the browser tab and the
 * site agree. Keep the two in sync if either changes.
 */
export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="glotfiles">
      <rect width="32" height="32" rx="7.5" fill="#0A0A0A" />
      <rect x="5.5" y="4" width="13.5" height="18" rx="2.4" fill="#FF5C35" />
      <path
        d="M15.4 9.5h6.2l4.9 4.9v11.2A2.4 2.4 0 0 1 24.1 28h-8.7A2.4 2.4 0 0 1 13 25.6V11.9a2.4 2.4 0 0 1 2.4-2.4Z"
        fill="#fff"
        stroke="#0A0A0A"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M21.6 9.5 26.5 14.4h-4.9Z" fill="#FF5C35" />
    </svg>
  )
}
