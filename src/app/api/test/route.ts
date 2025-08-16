import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const cwd = process.cwd()
    const dataDir = path.join(cwd, 'src', 'data')

    console.log('CWD:', cwd)
    console.log('Data dir:', dataDir)
    console.log('Data dir exists:', fs.existsSync(dataDir))

    if (fs.existsSync(dataDir)) {
      const files = fs.readdirSync(dataDir, { recursive: true })
      console.log('Files found:', files)
    }

    return NextResponse.json({
      cwd,
      dataDir,
      exists: fs.existsSync(dataDir),
      files: fs.existsSync(dataDir) ? fs.readdirSync(dataDir, { recursive: true }) : [],
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
