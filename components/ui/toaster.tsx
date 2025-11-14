"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'white',
          color: '#1e293b',
          border: '2px solid #e0e7ff',
        },
        className: 'font-sans',
      }}
    />
  )
}
