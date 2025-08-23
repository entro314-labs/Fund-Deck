'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Download, FileText, FileSpreadsheet, Presentation } from 'lucide-react'
import {
  downloadDocument,
  getDefaultFileType,
  getDownloadDisplayName,
  type FileType,
} from '../lib/download-utils'

interface DownloadButtonProps {
  pageSlug: string
  fileType?: FileType
  filename?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children?: React.ReactNode
}

const FileIcon = ({ fileType }: { fileType: FileType }) => {
  switch (fileType) {
    case 'xlsx':
      return <FileSpreadsheet className="w-4 h-4" />
    case 'pptx':
      return <Presentation className="w-4 h-4" />
    case 'docx':
      return <FileText className="w-4 h-4" />
    default:
      return <Download className="w-4 h-4" />
  }
}

export function DownloadButton({
  pageSlug,
  fileType,
  filename,
  variant = 'outline',
  size = 'default',
  className = '',
  children,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const finalFileType = fileType || getDefaultFileType(pageSlug)
  const displayName = getDownloadDisplayName(pageSlug, finalFileType)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      await downloadDocument(pageSlug, { filename, fileType: finalFileType })
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant={variant}
      size={size}
      className={className}
    >
      {isDownloading ? (
        <>
          <Download className="w-4 h-4 mr-2 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <FileIcon fileType={finalFileType} />
          <span className="ml-2">{children || `Download ${displayName}`}</span>
        </>
      )}
    </Button>
  )
}
