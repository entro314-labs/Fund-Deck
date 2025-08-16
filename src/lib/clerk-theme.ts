// Comprehensive Clerk theme configuration matching the warm sunset design system
export const clerkTheme = {
  variables: {
    // Color palette matching the design system
    colorPrimary: '#fa906e', // Primary orange
    colorDanger: '#e06053', // Destructive red
    colorSuccess: '#a6d18c', // Success green
    colorWarning: '#f4bc5f', // Warning yellow
    colorNeutral: '#95726a', // Muted foreground

    // Background and surface colors
    colorBackground: '#faf4f2', // Main background
    colorInputBackground: '#ffffff', // Input background
    colorInputText: '#384242', // Input text

    // Text colors
    colorText: '#384242', // Primary text
    colorTextSecondary: '#95726a', // Secondary text
    colorTextOnPrimaryBackground: '#ffffff', // Text on primary buttons

    // Border and outline
    borderRadius: '0.75rem', // Matching --radius

    // Typography
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    fontFamilyButtons: 'var(--font-inter), system-ui, sans-serif',
    fontSize: '16px',
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  elements: {
    // Root card styling
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid #f5f1eb',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 12px rgba(149, 114, 106, 0.15)',
    },

    // Header elements
    headerTitle: {
      color: '#384242',
      fontFamily: 'var(--font-lexend), serif',
      fontSize: '1.5rem',
      fontWeight: 700,
    },

    headerSubtitle: {
      color: '#95726a',
      fontSize: '0.875rem',
    },

    // Form elements
    formButtonPrimary: {
      backgroundColor: '#fa906e',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      padding: '0.75rem 1.5rem',
      border: 'none',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: '#f5bc5e',
        transform: 'translateY(-1px)',
        boxShadow: '0 8px 16px rgba(250, 144, 110, 0.3)',
      },
      '&:focus': {
        boxShadow: '0 0 0 2px #fa906e40',
      },
    },

    formButtonSecondary: {
      backgroundColor: '#fde6de',
      color: '#384242',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      padding: '0.75rem 1.5rem',
      border: '1px solid #f5f1eb',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: '#f5f1eb',
      },
    },

    // Social buttons
    socialButtonsBlockButton: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      border: '1px solid #f5f1eb',
      fontSize: '0.875rem',
      fontWeight: 500,
      padding: '0.75rem 1rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: '#f5f1eb',
        borderColor: '#fa906e',
      },
      '&:focus': {
        boxShadow: '0 0 0 2px #fa906e40',
      },
    },

    socialButtonsBlockButtonText: {
      color: '#384242',
      fontWeight: 500,
    },

    // Form fields
    formFieldInput: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      border: '1px solid #f5f1eb',
      color: '#384242',
      fontSize: '0.875rem',
      padding: '0.75rem 1rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:focus': {
        borderColor: '#fa906e',
        boxShadow: '0 0 0 3px #fa906e20',
      },
      '&::placeholder': {
        color: '#95726a',
      },
    },

    formFieldLabel: {
      color: '#384242',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
    },

    formFieldHintText: {
      color: '#95726a',
      fontSize: '0.75rem',
    },

    formFieldErrorText: {
      color: '#e06053',
      fontSize: '0.75rem',
      fontWeight: 500,
    },

    // Divider
    dividerLine: {
      backgroundColor: '#f5f1eb',
      height: '1px',
    },

    dividerText: {
      color: '#95726a',
      fontSize: '0.75rem',
      fontWeight: 500,
      backgroundColor: '#ffffff',
      padding: '0 1rem',
    },

    // Footer elements
    footerActionText: {
      color: '#95726a',
      fontSize: '0.875rem',
    },

    footerActionLink: {
      color: '#fa906e',
      fontSize: '0.875rem',
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
        color: '#f5bc5e',
        textDecoration: 'underline',
      },
    },

    // Alert styling
    alertText: {
      color: '#384242',
      fontSize: '0.875rem',
    },

    // OTP input
    formFieldInputShowPasswordButton: {
      color: '#95726a',
      '&:hover': {
        color: '#fa906e',
      },
    },

    // User button (for customizing dropdown)
    userButtonBox: {
      borderRadius: '0.5rem',
    },

    userButtonTrigger: {
      borderRadius: '0.5rem',
      border: '2px solid transparent',
      '&:focus': {
        borderColor: '#fa906e',
        boxShadow: '0 0 0 2px #fa906e20',
      },
    },

    // Loading spinner
    spinner: {
      color: '#fa906e',
    },

    // Internal card (for nested forms)
    internalFormCard: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      border: '1px solid #f5f1eb',
    },
  },
}

// Dark theme configuration
export const clerkDarkTheme = {
  variables: {
    // Color palette for dark mode
    colorPrimary: '#fa906e',
    colorDanger: '#e78284',
    colorSuccess: '#a6d18c',
    colorWarning: '#e5c890',
    colorNeutral: '#b5a9af',

    // Background and surface colors
    colorBackground: '#2a2023',
    colorInputBackground: '#403a40',
    colorInputText: '#c6d0f5',

    // Text colors
    colorText: '#c6d0f5',
    colorTextSecondary: '#b5a9af',
    colorTextOnPrimaryBackground: '#2a2023',

    // Border and outline
    borderRadius: '0.75rem',

    // Typography
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    fontFamilyButtons: 'var(--font-inter), system-ui, sans-serif',
    fontSize: '16px',
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  elements: {
    // Root card styling for dark mode
    card: {
      backgroundColor: '#342d34',
      border: '1px solid #403a40',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 12px rgba(42, 32, 35, 0.3)',
    },

    // Header elements
    headerTitle: {
      color: '#c6d0f5',
      fontFamily: 'var(--font-lexend), serif',
      fontSize: '1.5rem',
      fontWeight: 700,
    },

    headerSubtitle: {
      color: '#b5a9af',
      fontSize: '0.875rem',
    },

    // Form elements
    formButtonPrimary: {
      backgroundColor: '#fa906e',
      color: '#2a2023',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      padding: '0.75rem 1.5rem',
      border: 'none',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: '#f5bc5e',
        transform: 'translateY(-1px)',
        boxShadow: '0 8px 16px rgba(250, 144, 110, 0.3)',
      },
      '&:focus': {
        boxShadow: '0 0 0 2px #fa906e40',
      },
    },

    formButtonSecondary: {
      backgroundColor: '#403a40',
      color: '#c6d0f5',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      padding: '0.75rem 1.5rem',
      border: '1px solid #403a40',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: '#342d34',
      },
    },

    // Social buttons
    socialButtonsBlockButton: {
      backgroundColor: '#342d34',
      borderRadius: '0.75rem',
      border: '1px solid #403a40',
      fontSize: '0.875rem',
      fontWeight: 500,
      padding: '0.75rem 1rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: '#403a40',
        borderColor: '#fa906e',
      },
      '&:focus': {
        boxShadow: '0 0 0 2px #fa906e40',
      },
    },

    socialButtonsBlockButtonText: {
      color: '#c6d0f5',
      fontWeight: 500,
    },

    // Form fields
    formFieldInput: {
      backgroundColor: '#403a40',
      borderRadius: '0.75rem',
      border: '1px solid #403a40',
      color: '#c6d0f5',
      fontSize: '0.875rem',
      padding: '0.75rem 1rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:focus': {
        borderColor: '#fa906e',
        boxShadow: '0 0 0 3px #fa906e20',
      },
      '&::placeholder': {
        color: '#b5a9af',
      },
    },

    formFieldLabel: {
      color: '#c6d0f5',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
    },

    formFieldHintText: {
      color: '#b5a9af',
      fontSize: '0.75rem',
    },

    formFieldErrorText: {
      color: '#e78284',
      fontSize: '0.75rem',
      fontWeight: 500,
    },

    // Divider
    dividerLine: {
      backgroundColor: '#403a40',
      height: '1px',
    },

    dividerText: {
      color: '#b5a9af',
      fontSize: '0.75rem',
      fontWeight: 500,
      backgroundColor: '#342d34',
      padding: '0 1rem',
    },

    // Footer elements
    footerActionText: {
      color: '#b5a9af',
      fontSize: '0.875rem',
    },

    footerActionLink: {
      color: '#fa906e',
      fontSize: '0.875rem',
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
        color: '#f5bc5e',
        textDecoration: 'underline',
      },
    },

    // Alert styling
    alertText: {
      color: '#c6d0f5',
      fontSize: '0.875rem',
    },

    // OTP input
    formFieldInputShowPasswordButton: {
      color: '#b5a9af',
      '&:hover': {
        color: '#fa906e',
      },
    },

    // User button
    userButtonBox: {
      borderRadius: '0.5rem',
    },

    userButtonTrigger: {
      borderRadius: '0.5rem',
      border: '2px solid transparent',
      '&:focus': {
        borderColor: '#fa906e',
        boxShadow: '0 0 0 2px #fa906e20',
      },
    },

    // Loading spinner
    spinner: {
      color: '#fa906e',
    },

    // Internal card
    internalFormCard: {
      backgroundColor: '#342d34',
      borderRadius: '0.75rem',
      border: '1px solid #403a40',
    },
  },
}

// Function to get theme based on current theme
export function getClerkTheme(isDark: boolean) {
  return isDark ? clerkDarkTheme : clerkTheme
}
