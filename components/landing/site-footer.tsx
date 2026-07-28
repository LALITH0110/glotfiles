import Link from "next/link"
import { BookOpen, Github, Mail } from "lucide-react"
import Logo from "./logo"

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-100 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-[15px] font-semibold tracking-[-0.01em]">glotfiles</span>
            </Link>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">
              Build files that are valid in several formats at once, in your browser, with
              nothing stored.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <FooterColumn
              title="Product"
              links={[
                { label: "Combinations", href: "/#combinations" },
                { label: "How it works", href: "/#how-it-works" },
                { label: "FAQ", href: "/#faq" },
              ]}
            />
            <FooterColumn
              title="Developers"
              links={[
                { label: "API & docs", href: "https://app.glotfiles.dev/docs", external: true },
                { label: "GitHub", href: "https://github.com/LALITH0110/glotfiles", external: true },
                {
                  label: "Report a bug",
                  href: "https://github.com/LALITH0110/glotfiles/issues",
                  external: true,
                },
              ]}
            />
            <FooterColumn
              title="More"
              links={[
                { label: "About", href: "/about" },
                { label: "Privacy & terms", href: "/privacy-terms" },
                {
                  label: "Contact",
                  href: "mailto:lalith.kothuru@gmail.com?subject=[GlotFiles]%20",
                  external: true,
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-6 text-[13px] text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} glotfiles · Made by{" "}
            <a
              href="https://www.lalithkothuru.com/?utm_source=glotfiles-website&utm_medium=referral&utm_campaign=glotfiles-project"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-900 hover:text-zinc-600"
            >
              Lalith Kothuru
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/LALITH0110/glotfiles"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-zinc-400 transition-colors hover:text-zinc-900"
            >
              <Github className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://app.glotfiles.dev/docs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Docs"
              className="text-zinc-400 transition-colors hover:text-zinc-900"
            >
              <BookOpen className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </a>
            <a
              href="mailto:lalith.kothuru@gmail.com?subject=[GlotFiles]%20"
              aria-label="Email"
              className="text-zinc-400 transition-colors hover:text-zinc-900"
            >
              <Mail className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold tracking-[-0.01em] text-zinc-900">{title}</h4>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[14px] text-zinc-500 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

