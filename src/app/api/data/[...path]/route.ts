import { type NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import fs from 'fs'
import path from 'path'
import { getAdminEmails } from '../../../../lib/company-config'

// Dynamic data directory resolution for different environments
const getDataDirectory = () => {
  const cwd = process.cwd()

  const possiblePaths = [
    path.join(cwd, 'src', 'data'), // Source directory (primary)
    '/var/task/src/data', // Vercel serverless
    path.join(cwd, '.next', 'standalone', 'src', 'data'), // Vercel standalone
    path.join(cwd, '.next', 'server', 'src', 'data'), // Alternative build path
  ]

  for (const dataPath of possiblePaths) {
    if (fs.existsSync(dataPath)) {
      return dataPath
    }
  }

  // Return default src/data path for debugging
  return path.join(cwd, 'src', 'data')
}

// List of admin email addresses from environment variable
const ADMIN_EMAILS = getAdminEmails()

const ALLOW_ALL_USERS_IN_DEV = process.env.NODE_ENV === 'development'

// Allowed file paths to prevent directory traversal
const ALLOWED_PATHS = [
  'pages/financial-model',
  'pages/strategic-plan',
  'pages/executive-summary',
  'pages/market-analysis',
  'pages/product-overview',
  'pages/one-pager',
  'pages/risk-assessment',
  'pages/growth-strategy',
  'pages/milestones',
  'pages/exit-strategy',
  'pages/investor-package',
  'pages/dashboard',
  'pages/presentation',
  'shared/navigation',
]

function sanitizePath(pathArray: string[]): string | null {
  // Join path and normalize
  const requestedPath = pathArray.join('/')

  // Check if path is in allowed list
  if (!ALLOWED_PATHS.includes(requestedPath)) {
    return null
  }

  // Additional security: ensure no path traversal attempts
  if (
    requestedPath.includes('..') ||
    requestedPath.includes('~') ||
    path.isAbsolute(requestedPath)
  ) {
    return null
  }

  return requestedPath
}

async function checkAdminAccess(): Promise<{ isAdmin: boolean; user: any }> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { isAdmin: false, user: null }
    }

    // In development, allow all authenticated users
    if (ALLOW_ALL_USERS_IN_DEV) {
      return { isAdmin: true, user: { userId } }
    }

    // In production, check admin email list using modern Clerk API
    try {
      const client = await clerkClient()
      const user = await client.users.getUser(userId)

      const primaryEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress

      if (!primaryEmail) {
        console.warn(`User ${userId} has no primary email address`)
        return { isAdmin: false, user: { userId } }
      }

      const isAdmin = ADMIN_EMAILS.includes(primaryEmail)
      console.log(`Admin check for ${primaryEmail}: ${isAdmin}`)

      return { isAdmin, user: { userId, email: primaryEmail } }
    } catch (clerkError) {
      console.error('Error fetching user from Clerk:', clerkError)
      // Fallback to deny access if we can't verify admin status
      return { isAdmin: false, user: { userId } }
    }
  } catch (error) {
    console.error('Error checking admin access:', error)
    return { isAdmin: false, user: null }
  }
}

// GET /api/data/pages/financial-model
// GET /api/data/shared/navigation
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Get the actual data directory
    const DATA_DIR = getDataDirectory()
    const isProduction = process.env.NODE_ENV === 'production'
    const cwdPath = process.cwd()

    console.log('🔍 API Debug Info:')
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    console.log('- process.cwd():', cwdPath)
    console.log('- DATA_DIR (resolved):', DATA_DIR)

    // Check if DATA_DIR exists and list contents
    const dataDirExists = fs.existsSync(DATA_DIR)
    console.log('- DATA_DIR exists:', dataDirExists)

    if (dataDirExists) {
      try {
        const contents = fs.readdirSync(DATA_DIR)
        console.log('- DATA_DIR contents:', contents)

        const pagesDir = path.join(DATA_DIR, 'pages')
        if (fs.existsSync(pagesDir)) {
          const pagesContents = fs.readdirSync(pagesDir)
          console.log('- pages directory contents:', pagesContents)
        }
      } catch (error) {
        console.log('- Error reading DATA_DIR contents:', error)
      }
    } else {
      // Log all possible paths we checked
      console.log('- Checked paths:')
      const possiblePaths = [
        path.join(cwdPath, 'src', 'data'),
        '/var/task/src/data',
        path.join(cwdPath, '.next', 'standalone', 'src', 'data'),
        path.join(cwdPath, '.next', 'server', 'src', 'data'),
      ]

      for (const testPath of possiblePaths) {
        const exists = fs.existsSync(testPath)
        console.log(`  ${testPath}: ${exists}`)
      }
    }

    if (!dataDirExists) {
      return NextResponse.json(
        {
          error: 'Data directory not found',
          debug: isProduction
            ? undefined
            : {
                dataDir: DATA_DIR,
                cwd: cwdPath,
                message: 'No data directory found in any expected location',
              },
        },
        { status: 500 }
      )
    }

    // Check authentication - temporarily bypass for debugging
    let userId: string | null = 'debug-user'
    try {
      const authResult = await auth()
      userId = authResult?.userId || 'debug-user'
      console.log('- Auth successful:', !!userId)
    } catch (authError) {
      console.error('Auth error:', authError)
      // Allow access for debugging
      console.warn('Using debug user due to auth error')
      userId = 'debug-user'
    }

    // Temporarily disable auth check
    // if (!userId) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized - Authentication required' },
    //     { status: 401 }
    //   )
    // }

    const resolvedParams = await params
    const sanitizedPath = sanitizePath(resolvedParams.path)
    console.log('- Requested path:', resolvedParams.path)
    console.log('- Sanitized path:', sanitizedPath)

    if (!sanitizedPath) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 })
    }

    const filePath = path.join(DATA_DIR, sanitizedPath + '.json')
    console.log('- Full file path:', filePath)

    // Additional security: ensure file is within DATA_DIR
    const resolvedFilePath = path.resolve(filePath)
    const resolvedDataDir = path.resolve(DATA_DIR)

    if (!resolvedFilePath.startsWith(resolvedDataDir)) {
      return NextResponse.json({ error: 'Invalid file path - access denied' }, { status: 403 })
    }

    const fileExists = fs.existsSync(filePath)
    console.log('- File exists:', fileExists)

    if (!fileExists) {
      // List files in the directory for debugging
      try {
        const dirPath = path.dirname(filePath)
        const filesInDir = fs.readdirSync(dirPath)
        console.log('- Files in directory:', filesInDir)
      } catch (dirError) {
        console.log('- Could not read directory:', path.dirname(filePath))
      }

      return NextResponse.json(
        {
          error: 'Data file not found',
          debug: isProduction ? undefined : { filePath, fileExists },
        },
        { status: 404 }
      )
    }

    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    console.log('- Successfully read file, data length:', JSON.stringify(rawData).length)

    // Add server-side validation
    try {
      const { validateDataByPath } = await import('@/lib/validation')
      const validation = validateDataByPath(sanitizedPath.replace('pages/', ''), rawData)

      if (!validation.success) {
        console.error(
          `❌ Server-side validation failed for ${sanitizedPath}:`,
          validation.error?.message
        )

        // In development, return validation error details
        if (process.env.NODE_ENV === 'development') {
          return NextResponse.json(
            {
              error: 'Data validation failed',
              validationError: validation.error?.message,
              path: sanitizedPath,
            },
            { status: 422 }
          )
        }

        // In production, log error but return data anyway (graceful degradation)
        console.warn(`⚠️ Serving unvalidated data for ${sanitizedPath} in production`)
      } else {
        console.log(`✅ Server-side validation passed for ${sanitizedPath}`)
      }
    } catch (validationError) {
      console.error('Error during server-side validation:', validationError)
      // Continue without validation if there's an error in the validation system
    }

    return NextResponse.json(rawData)
  } catch (error) {
    console.error('Error in GET /api/data/[...path]:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      {
        error: 'Failed to read data file',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    )
  }
}

// POST /api/data/pages/financial-model
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Check admin access
    const { isAdmin, user } = await checkAdminAccess()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - Authentication required' }, { status: 401 })
    }

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required for data modification' },
        { status: 403 }
      )
    }

    const data = await request.json()
    const resolvedParams = await params
    const sanitizedPath = sanitizePath(resolvedParams.path)

    if (!sanitizedPath) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 })
    }

    const DATA_DIR = getDataDirectory()
    const filePath = path.join(DATA_DIR, sanitizedPath + '.json')

    // Additional security: ensure file is within DATA_DIR
    const resolvedFilePath = path.resolve(filePath)
    const resolvedDataDir = path.resolve(DATA_DIR)

    if (!resolvedFilePath.startsWith(resolvedDataDir)) {
      return NextResponse.json({ error: 'Invalid file path - access denied' }, { status: 403 })
    }

    // Validate JSON data structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 })
    }

    // Add server-side validation for incoming data
    try {
      const { validateDataByPath } = await import('@/lib/validation')
      const validation = validateDataByPath(sanitizedPath.replace('pages/', ''), data)

      if (!validation.success) {
        console.error(
          `❌ Incoming data validation failed for ${sanitizedPath}:`,
          validation.error?.message
        )
        return NextResponse.json(
          {
            error: 'Data validation failed',
            validationError: validation.error?.message,
            path: sanitizedPath,
          },
          { status: 422 }
        )
      } else {
        console.log(`✅ Incoming data validation passed for ${sanitizedPath}`)
      }
    } catch (validationError) {
      console.error('Error during incoming data validation:', validationError)
      return NextResponse.json(
        {
          error: 'Validation system error',
          details: process.env.NODE_ENV === 'development' ? String(validationError) : undefined,
        },
        { status: 500 }
      )
    }

    // Ensure directory exists
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Write data with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

    console.log(
      `Data updated by user ${user.userId} (${user.email || 'no email'}): ${sanitizedPath}`
    )

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${sanitizedPath}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error writing data file:', error)
    return NextResponse.json({ error: 'Failed to write data file' }, { status: 500 })
  }
}
