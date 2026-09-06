/**
 * Common: two file silhouettes joined by a shared stepped seam.
 * Vector geometry keeps the mark crisp at header and footer sizes.
 */
export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 104 108"
      className={className}
      role="img"
      aria-label="glotfiles"
    >
      <g fill="currentColor">
        <path d="M14 0H46a7 7 0 0 1 5 2l12 12a7 7 0 0 1 2 5v28H38a8 8 0 0 0-8 8v27H14A14 14 0 0 1 0 68V14A14 14 0 0 1 14 0Z" />
        <path d="M74 27h6a7 7 0 0 1 5 2l17 17a7 7 0 0 1 2 5v43a14 14 0 0 1-14 14H55a7 7 0 0 1-5-2L40 96a7 7 0 0 1-2-5V56h28a8 8 0 0 0 8-8V27Z" />
      </g>
    </svg>
  )
}
