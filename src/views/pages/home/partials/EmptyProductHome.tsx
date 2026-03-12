'use client'

import { Icon } from '@iconify/react'

export default function EmptyProductHome() {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center text-center">
      <Icon
        icon="mdi:package-variant-remove"
        className="text-gray-400 mb-4"
        width={150}
        height={150}
      />

      <h3 className="text-lg font-semibold mb-2">
        No products available
      </h3>

      <p className="text-sm text-muted-foreground max-w-sm">
        Products will appear here once they are added to the store.
      </p>
    </div>
  )
}