import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const cwdPath = process.cwd()

    // Check multiple possible data directory locations
    const possiblePaths = [
      path.join(cwdPath, 'src', 'data'),
      '/var/task/src/data',
      path.join(cwdPath, '.next', 'standalone', 'src', 'data'),
      path.join(cwdPath, '.next', 'server', 'src', 'data'),
    ]

    const pathResults = possiblePaths.map((testPath) => ({
      path: testPath,
      exists: fs.existsSync(testPath),
      files: fs.existsSync(testPath)
        ? fs.existsSync(path.join(testPath, 'pages'))
          ? fs.readdirSync(path.join(testPath, 'pages')).slice(0, 5)
          : []
        : [],
    }))

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      cwd: cwdPath,
      paths: pathResults,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        environment: process.env.NODE_ENV,
        cwd: process.cwd(),
      },
      { status: 200 } // Return 200 to avoid network errors
    )
  }
}
