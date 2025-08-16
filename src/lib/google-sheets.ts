import { google } from 'googleapis'

// Extract Sheet ID from environment variable
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || ''

// Define sheet ranges for different data
const SHEET_RANGES = {
  dataInput: 'Data_Input!A1:M50', // All country data by month
  metrics: 'Metrics!A1:E20', // Dashboard overview metrics
} as const

interface SheetData {
  values?: string[][]
}

// Google Sheets service configuration
class GoogleSheetsService {
  private sheets

  constructor() {
    // For production, use service account
    // For now, we'll use the simpler public access approach
    this.sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_SHEETS_API_KEY, // Public API key
    })
  }

  // Fetch data from a specific range
  async getRange(range: string): Promise<string[][]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
      })

      return response.data.values || []
    } catch (error) {
      console.error(`Error fetching range ${range}:`, error)
      throw new Error(`Failed to fetch data from ${range}`)
    }
  }

  // Fetch multiple ranges at once (more efficient)
  async getBatchRanges(ranges: string[]): Promise<Record<string, string[][]>> {
    try {
      const response = await this.sheets.spreadsheets.values.batchGet({
        spreadsheetId: SPREADSHEET_ID,
        ranges: ranges,
      })

      const result: Record<string, string[][]> = {}

      response.data.valueRanges?.forEach((valueRange, index) => {
        const range = ranges[index]
        const sheetName = range.split('!')[0].toLowerCase().replace('_', '')
        result[sheetName] = valueRange.values || []
      })

      return result
    } catch (error) {
      console.error('Error fetching batch ranges:', error)
      throw new Error('Failed to fetch batch data from Google Sheets')
    }
  }

  // Parse Data_Input sheet with country-specific monthly data
  parseDataInput(sheetData: string[][]): Record<string, any> {
    const countries: Record<string, any> = {}

    // Skip header row, process data rows
    for (let i = 1; i < sheetData.length; i++) {
      const row = sheetData[i]

      if (row.length >= 13 && row[0] && row[1]) {
        const month = row[0]
        const country = row[1]?.toLowerCase()

        if (!country) continue

        // Initialize country if not exists
        if (!countries[country]) {
          countries[country] = {
            latestMonth: month,
            metrics: {},
            historicalData: [],
          }
        }

        // Store historical data for charts
        countries[country].historicalData.push({
          month: month,
          newSignupsActual: this.parseNumber(row[2]),
          newSignupsTarget: this.parseNumber(row[3]),
          activeUsersActual: this.parseNumber(row[4]),
          activeUsersTarget: this.parseNumber(row[5]),
          usersChurned: this.parseNumber(row[6]),
          listingsGrowth: this.parseNumber(row[7]),
          successfulMatches: this.parseNumber(row[8]),
          mrrActual: this.parseEuroValue(row[9]),
          mrrTarget: this.parseEuroValue(row[10]),
          monthlyBurn: this.parseEuroValue(row[11]),
          teamSize: this.parseNumber(row[12]),
        })

        // Update to latest month's data
        if (new Date(month) >= new Date(countries[country].latestMonth)) {
          countries[country].latestMonth = month
          countries[country].metrics = {
            newSignupsActual: this.parseNumber(row[2]),
            newSignupsTarget: this.parseNumber(row[3]),
            activeUsersActual: this.parseNumber(row[4]),
            activeUsersTarget: this.parseNumber(row[5]),
            usersChurned: this.parseNumber(row[6]),
            listingsGrowth: this.parseNumber(row[7]),
            successfulMatches: this.parseNumber(row[8]),
            mrrActual: this.parseEuroValue(row[9]),
            mrrTarget: this.parseEuroValue(row[10]),
            monthlyBurn: this.parseEuroValue(row[11]),
            teamSize: this.parseNumber(row[12]),
          }
        }
      }
    }

    // Sort historical data by date for each country
    Object.keys(countries).forEach((country) => {
      countries[country].historicalData.sort(
        (a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime()
      )
    })

    return countries
  }

  // Parse Metrics sheet for dashboard overview
  parseMetricsSheet(sheetData: string[][]): Record<string, any> {
    const metrics: Record<string, any> = {}

    for (let i = 0; i < sheetData.length; i++) {
      const row = sheetData[i]
      if (row.length >= 2 && row[0]) {
        const key = row[0].toLowerCase().replace(/[^a-z0-9]/g, '')

        // Parse key metrics from Metrics sheet
        if (key.includes('monthlyrecurringrevenue') || key.includes('mrr')) {
          metrics.totalMRR = {
            actual: this.parseEuroValue(row[1]),
            target: this.parseEuroValue(row[2]),
          }
        } else if (key.includes('activeusers') || key.includes('mau')) {
          metrics.totalActiveUsers = {
            actual: this.parseNumber(row[1]),
            target: this.parseNumber(row[2]),
          }
        } else if (key.includes('burnrate') || key.includes('burn')) {
          metrics.totalBurn = {
            actual: this.parseEuroValue(row[1]),
            target: this.parseEuroValue(row[2]),
          }
        } else if (key.includes('signups') || key.includes('newsignups')) {
          metrics.totalSignups = {
            actual: this.parseNumber(row[1]),
            target: this.parseNumber(row[2]),
          }
        } else if (key.includes('cashonhand')) {
          metrics.cashOnHand = this.parseEuroValue(row[1])
        } else if (key.includes('runway')) {
          metrics.cashRunway = this.parseNumber(row[1])
        }
      }
    }

    return metrics
  }

  // Helper function to parse numbers
  private parseNumber(value: string): number {
    if (!value) return 0
    const cleaned = value.replace(/[^0-9.-]/g, '')
    return isNaN(Number(cleaned)) ? 0 : Number(cleaned)
  }

  // Helper function to parse Euro values
  private parseEuroValue(value: string): number {
    if (!value) return 0
    // Remove €, commas, and convert to number
    const cleaned = value.replace(/[€,\s]/g, '').replace(/[^0-9.-]/g, '')
    return isNaN(Number(cleaned)) ? 0 : Number(cleaned)
  }
}

// Singleton instance
const googleSheetsService = new GoogleSheetsService()
export default googleSheetsService

// Helper function to fetch all dashboard data
export async function fetchDashboardData() {
  try {
    const ranges = Object.values(SHEET_RANGES)
    const batchData = await googleSheetsService.getBatchRanges(ranges)

    // Parse the Data_Input sheet for country-specific data
    const countryData = googleSheetsService.parseDataInput(batchData.datainput || [])

    // Parse the Metrics sheet for overview data
    const metricsData = googleSheetsService.parseMetricsSheet(batchData.metrics || [])

    return {
      overview: metricsData,
      countries: countryData,
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw error
  }
}

// Fallback to CSV export if API fails (more reliable for public sheets)
export async function fetchSheetAsCSV(gid: number = 0): Promise<string[][]> {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`

    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`)
    }

    const csvText = await response.text()

    // Parse CSV manually (simple parser for our use case)
    const rows = csvText.split('\n').map((row) => {
      // Handle quoted values and commas
      const values: string[] = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < row.length; i++) {
        const char = row[i]
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      values.push(current.trim()) // Add the last value

      return values
    })

    return rows.filter((row) => row.some((cell) => cell.length > 0)) // Remove empty rows
  } catch (error) {
    console.error('Error fetching CSV:', error)
    throw error
  }
}

export { SPREADSHEET_ID, SHEET_RANGES }
