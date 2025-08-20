/**
 * Utility functions for handling file downloads in the dashboard
 */

export type FileType = 'pdf' | 'docx' | 'xlsx' | 'pptx';

export interface DownloadOptions {
  filename?: string;
  fileType?: FileType;
}

/**
 * Download a file from the public/documents directory
 * @param pageSlug - The page slug (e.g., 'investor-package', 'executive-summary')
 * @param options - Download options including filename and file type
 */
export const downloadDocument = async (
  pageSlug: string,
  options: DownloadOptions = {}
): Promise<void> => {
  try {
    const { filename, fileType = 'pdf' } = options;
    
    // Generate filename if not provided
    const finalFilename = filename || `${pageSlug}.${fileType}`;
    
    // Construct file path
    const filePath = `/documents/${finalFilename}`;
    
    // Check if file exists first
    const response = await fetch(filePath, { method: 'HEAD' });
    
    if (!response.ok) {
      // Fallback to PDF if the requested file type doesn't exist
      if (fileType !== 'pdf') {
        return downloadDocument(pageSlug, { ...options, fileType: 'pdf' });
      }
      
      throw new Error(`Document not found: ${finalFilename}`);
    }
    
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = finalFilename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Download failed:', error);
    
    // Show user-friendly error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to download document';
      
    // You can replace this with your preferred toast/notification system
    alert(`Download failed: ${errorMessage}`);
  }
};

/**
 * Get the appropriate file extension for a page
 * @param pageSlug - The page slug
 * @returns The most appropriate file extension
 */
export const getDefaultFileType = (pageSlug: string): FileType => {
  const financialPages = ['financial-model'];
  const presentationPages = ['investor-package'];
  
  if (financialPages.includes(pageSlug)) {
    return 'xlsx';
  }
  
  if (presentationPages.includes(pageSlug)) {
    return 'pptx';
  }
  
  return 'pdf';
};

/**
 * Get a user-friendly display name for the download
 * @param pageSlug - The page slug
 * @param fileType - The file type
 * @returns User-friendly display name
 */
export const getDownloadDisplayName = (pageSlug: string, fileType: FileType): string => {
  const pageNames: Record<string, string> = {
    'investor-package': 'Investor Package',
    'executive-summary': 'Executive Summary',
    'financial-model': 'Financial Model',
    'pitch-deck': 'Pitch Deck',
    'one-pager': 'One Pager',
    'market-analysis': 'Market Analysis',
    'product-overview': 'Product Overview',
    'growth-strategy': 'Growth Strategy',
    'strategic-plan': 'Strategic Plan',
    'exit-strategy': 'Exit Strategy',
    'risk-assessment': 'Risk Assessment',
    'milestones': 'Milestones'
  };
  
  const baseName = pageNames[pageSlug] || pageSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const typeExtensions = {
    'pdf': 'PDF',
    'docx': 'Word Document',
    'xlsx': 'Excel Spreadsheet',
    'pptx': 'PowerPoint Presentation'
  };
  
  return `${baseName} (${typeExtensions[fileType]})`;
};

/**
 * Check if a document exists in the documents directory
 * @param pageSlug - The page slug
 * @param fileType - The file type to check
 * @returns Promise that resolves to true if the file exists
 */
export const checkDocumentExists = async (pageSlug: string, fileType: FileType): Promise<boolean> => {
  try {
    const filename = `${pageSlug}.${fileType}`;
    const response = await fetch(`/documents/${filename}`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};