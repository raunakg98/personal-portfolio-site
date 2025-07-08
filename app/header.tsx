// 'use client'
// import { TextEffect } from '@/components/ui/text-effect'
// import Link from 'next/link'

// export function Header() {
//   return (
//     <header className="mb-8 flex items-center justify-between">
//       <div>
//         <Link href="/" className="font-medium text-black dark:text-white">
//           Raunak Ghawghawe
//         </Link>
//         <TextEffect
//           as="p"
//           preset="fade"
//           per="char"
//           className="text-zinc-600 dark:text-zinc-500"
//           delay={0.5}
//         >
//           Full-Stack Data Scientist
//         </TextEffect>
//       </div>
//     </header>
//   )
// }

'use client'

import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      {/* left‑hand side */}
      <div className="mr-4">
        <Link href="/" className="font-medium text-black dark:text-white">
          Raunak Ghawghawe
        </Link>

        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Data Scientist
        </TextEffect>
      </div>

      {/* right‑hand side – photo */}
      <div className="fade-in shrink-0 overflow-hidden rounded-full">
        <Image
          src="/og.jpeg"      // path inside /public
          alt="Raunak Ghawghawe"
          width={128}               // ≈ 6 rem
          height={128}
          className="rounded-full object-cover"
          priority                 // load eagerly
        />
      </div>
    </header>
  )
}
