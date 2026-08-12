import { readFileSync, writeFileSync } from 'node:fs'

const nextEnvContents = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
`

writeFileSync(new URL('../next-env.d.ts', import.meta.url), nextEnvContents)

const tsconfigPath = new URL('../tsconfig.json', import.meta.url)
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'))

tsconfig.include = (tsconfig.include ?? []).filter(
  (entry) => entry !== '.next/dev/types/**/*.ts',
)
tsconfig.exclude = Array.from(new Set([...(tsconfig.exclude ?? []), '.next']))

writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`)
