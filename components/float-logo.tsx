import { memo } from "react"

function FloatLogoComponent() {
  return (
    <div className="text-center overflow-hidden" role="banner">
      <h1 className="sr-only">FLOAT BBS - You Are The Thread Now</h1>
      <pre
        className="text-pink-500 font-mono text-xs md:text-base whitespace-pre overflow-x-auto scrollbar-hide"
        aria-hidden="true"
      >
        {`
  ███████╗██╗      ██████╗  █████╗ ████████╗
  ██╔════╝██║     ██╔═══██╗██╔══██╗╚══██╔══╝
  █████╗  ██║     ██║   ██║███████║   ██║   
  ██╔══╝  ██║     ██║   ██║██╔══██║   ██║   
  ██║     ███████╗╚██████╔╝██║  ██║   ██║   
  ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
                                           
  YOU ARE THE THREAD NOW
  ————————— // —————————
`}
      </pre>
      <span className="sr-only">FLOAT BBS ASCII Art Logo</span>
    </div>
  )
}

// Use memo to prevent unnecessary re-renders
export const FloatLogo = memo(FloatLogoComponent)

