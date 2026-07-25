'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'Terminal',
  sh: 'Terminal',
  zsh: 'Terminal',
  shell: 'Terminal',
  cmd: 'Terminal',
  powershell: 'Terminal',
  go: 'Go',
  golang: 'Go',
  ts: 'TypeScript',
  tsx: 'TypeScript',
  js: 'JavaScript',
  jsx: 'JavaScript',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  py: 'Python',
  python: 'Python',
  rust: 'Rust',
  rs: 'Rust',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  toml: 'TOML',
  sql: 'SQL',
  md: 'Markdown',
  mdx: 'MDX',
  dockerfile: 'Dockerfile',
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children)
  }
  return ''
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string
  'data-theme'?: string
  nodes?: React.ReactNode
}

export function CodeBlock({
  children,
  nodes,
  'data-language': dataLanguage,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const langKey = dataLanguage?.toLowerCase() || ''
  const label =
    LANGUAGE_LABELS[langKey] ||
    (langKey ? langKey.charAt(0).toUpperCase() + langKey.slice(1) : 'Code')

  const handleCopy = async () => {
    const rawText = extractText(nodes)
    if (!rawText) return
    try {
      await navigator.clipboard.writeText(rawText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API is restricted
    }
  }

  return (
    <figure className="group/code border-border bg-muted/20 my-6 rounded-xl border p-1 dark:bg-zinc-900/50">
      <figcaption className="font-secondary text-muted-foreground mb-1 flex items-center justify-between px-1 text-xs">
        <span className="font-medium tracking-wide">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" aria-hidden />
              <span className="text-[11px] font-medium text-emerald-500">
                Copied
              </span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden />
              <span className="sr-only sm:not-sr-only sm:text-[11px] sm:font-medium">
                Copy
              </span>
            </>
          )}
        </button>
      </figcaption>
      {children}
    </figure>
  )
}
