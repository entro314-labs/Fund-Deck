# Google Sheets Live Dashboard Integration

## Setup Instructions

### 1. Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**
4. Go to "Credentials" → "Create Credentials" → "API Key" 
5. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Your existing Clerk variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Google Sheets API
GOOGLE_SHEETS_API_KEY=AIzaSyC...your-api-key-here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Sheet Structure

Your Google Sheet has been configured to work with the existing structure:

#### Sheet 1: "Metrics" 
Contains overview dashboard metrics:
- Monthly Recurring Revenue (MRR)
- Active Users (MAU) 
- Net Monthly Burn Rate
- Cash Runway
- etc.

#### Sheet 2: "Data_Input" (GID: 2085933166)
Contains monthly data by country with columns:
- Month (A)
- Country (B) 
- New Signups Actual/Target (C/D)
- Active Users Actual/Target (E/F)
- Users Churned (G)
- Listings Growth (H)
- Successful Matches (I)
- MRR Actual/Target (J/K)
- Monthly Burn (L)
- Team Size (M)

The system will automatically:
- Parse the latest month's data for each country
- Calculate totals for the overview dashboard
- Map Greece → Greece 🇬🇷, Poland → Poland 🇵🇱

### 4. Sheet Access

Make sure your Google Sheet is:
- **Publicly accessible** (Anyone with the link can view)
- Or use a service account for private sheets

### 5. Test the Integration

1. Navigate to `/live-dashboard`
2. Check browser console for any errors
3. Data should refresh every 5 minutes automatically
4. Manual refresh button available

## Fallback Options

If the Google Sheets API fails, the system will:
1. Try CSV export fallback
2. Use mock data as last resort
3. Display error indicators in the UI

## Current Sheet URL
https://docs.google.com/spreadsheets/d/1rHJUPhxUzFE4g7uOfNNrzRuT0u_doFvNtEIbsZ85EBc/edit

## Troubleshooting

- **"Failed to fetch"**: Check if sheet is public or API key is correct
- **"Data not updating"**: Check the metric IDs match between sheet and dashboard
- **"500 error"**: Check server logs for detailed error messages

## Security Note

For production, consider using a service account instead of an API key for better security and access control.