import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    console.log('🐛 Debug API called')

    // Environment check
    const hasClerkKeys = !!(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
    )
    console.log('- Clerk keys present:', hasClerkKeys)

    // File system check
    const cwdPath = process.cwd()
    const dataDir = path.join(cwdPath, 'src', 'data')
    const dataDirExists = fs.existsSync(dataDir)

    console.log('- CWD:', cwdPath)
    console.log('- Data dir:', dataDir)
    console.log('- Data dir exists:', dataDirExists)

    // List files in data directory if it exists
    let dataFiles: string[] = []
    if (dataDirExists) {
      try {
        const pagesDir = path.join(dataDir, 'pages')
        if (fs.existsSync(pagesDir)) {
          dataFiles = fs.readdirSync(pagesDir)
        }
      } catch (e) {
        console.log('- Error reading pages dir:', e)
      }
    }

    // Auth check
    let authStatus = 'not-attempted'
    let userId: string | null = null
    try {
      const authResult = await auth()
      userId = authResult?.userId || null
      authStatus = userId ? 'authenticated' : 'unauthenticated'
    } catch (authError) {
      authStatus = 'auth-error'
      console.log('- Auth error:', authError)
    }

    const response = {
      success: true,
      environment: process.env.NODE_ENV,
      clerk: {
        hasKeys: hasClerkKeys,
        authStatus,
        userId: userId ? `${userId.slice(0, 8)}...` : null,
      },
      filesystem: {
        cwd: cwdPath,
        dataDir,
        dataDirExists,
        dataFiles: dataFiles.slice(0, 5), // Only show first 5 files
      },
      timestamp: new Date().toISOString(),
    }

    console.log('🐛 Debug response:', response)

    return NextResponse.json(response)
  } catch (error) {
    console.error('🚨 Debug API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
