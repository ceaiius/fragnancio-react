import { ChevronDown, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { useState } from "react"

const MobileFooterAccordion = () => {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const sections = [
    {
      key: "fragg",
      label: "Fragg",
      links: [
        { href: "/about-us", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/blog", label: "Blog" },
        { href: "/news", label: "News" },
      ],
    },
    {
      key: "sell",
      label: "Sell",
      links: [
        { href: "/sell", label: "Sell on Fragg" },
      ],
    },
    {
      key: "help",
      label: "Help",
      links: [
        { href: "/help", label: "Help Centre" },
        { href: "/status", label: "Status" },
      ],
    },
  ]

  return (
    <div className="px-0 py-4 flex flex-col gap-4 w-full sm:hidden">
      {sections.map((section) => (
        <div key={section.key}>
          <button
            className="w-full flex justify-between items-center border-0 cursor-pointer px-4 py-3 bg-transparent"
            onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
          >
            <span>{section.label}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${openSection === section.key ? "rotate-180" : ""}`}
            />
          </button>
          {openSection === section.key && (
            <div className="pl-8 flex flex-col gap-2 py-2">
              {section.links.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-normal py-1">{link.label}</a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <div className='w-full bg-gray-footer px-2 sm:px-4 py-4 mx-auto mt-4 font-mono'>
        <div className="flex flex-col sm:block w-full justify-between pb-4 max-w-[1280px] mx-auto">
          <MobileFooterAccordion />
          <div className="hidden sm:flex">
            <div className="flex flex-col flex-grow-1">
              <h3 className="px-4 py-4 text-xl font-bold">Fragg</h3>
              <div className="px-4 py-3 text-sm">
                <a href="/about-us">About Us</a>
              </div>
              <div className="px-4 py-3 text-sm">
                <a href="/careers">Careers</a>
              </div>
              <div className="px-4 py-3 text-sm">
                <a href="/blog">Blog</a>
              </div>
              <div className="px-4 py-3 text-sm">
                <a href="/news">News</a>
              </div>
            </div>
            <div className="flex flex-col flex-grow-1">
              <h3 className="px-4 py-4 text-xl font-bold">Sell</h3>
              <div className="px-4 py-3 text-sm">
                <a href="/sell">Sell on Fragg</a>
              </div>
            </div>
            <div className="flex flex-col flex-grow-1">
              <h3 className="px-4 py-4 text-xl font-bold">Help</h3>
              <div className="px-4 py-3 text-sm">
                <a href="/help">Help Centre</a>
              </div>
              <div className="px-4 py-3 text-sm">
                <a href="/status">Status</a>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-center sm:justify-end gap-3 mt-4 sm:mt-0">
            <Facebook className="w-6 h-6" />
            <Instagram className="w-6 h-6" />
            <Twitter className="w-6 h-6" />
            <Linkedin className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-default px-2 sm:px-4 py-4 mx-auto font-mono">
        <div className="flex justify-center sm:justify-between items-center px-4 py-0 flex-wrap max-w-[1280px] mx-auto">
          <div className="hidden sm:block">
            Georgia
          </div>
          <div className="flex items-center justify-center sm:justify-end flex-wrap">
            <div className="p-4 text-sm">
              <a href="/privacy-policy">Privacy Policy</a>
            </div>
            <div className="p-4 text-sm">
              <a href="/terms-and-conditions">Terms & Conditions</a>
            </div>
            <div className="p-4 text-sm">
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer