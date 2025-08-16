// Icon types from lucide-react
export type IconType =
  | 'TrendingUp'
  | 'Euro'
  | 'Users'
  | 'Target'
  | 'BarChart3'
  | 'PieChart'
  | 'Calendar'
  | 'Building2'
  | 'FileText'
  | 'Rocket'
  | 'Shield'
  | 'LogOut'
  | 'Star'
  | 'Clock'
  | 'Eye'
  | 'Download'
  | 'ArrowRight'
  | 'Presentation'
  | 'Play'
  | 'ChevronRight'
  | 'CheckCircle'
  | 'Zap'
  | 'Globe'
  | 'MapPin'
  | 'AlertTriangle'
  | 'Smartphone'
  | 'Brain'
  | 'Code'
  | 'Database'
  | 'Cloud'
  | 'TrendingDown'
  | 'Building'
  | 'Activity'
  | 'Handshake'
  | 'Search'
  | 'Scale'

// Base interfaces
export interface PageMeta {
  title: string
  subtitle: string
  badge?: string
  date?: string
  exportButtonText?: string
}

export interface MetricCard {
  id: string
  title: string
  value: number | string
  prefix?: string
  suffix?: string
  subtitle: string
  icon: IconType
  color: string
}

export interface ChartSeries {
  key: string
  name: string
  color: string
  type?: 'bar' | 'line' | 'area'
  yAxisId?: 'left' | 'right'
}

export interface ChartData {
  id: string
  title: string
  description: string
  type: 'area' | 'pie' | 'composed' | 'bar' | 'line'
  data: Record<string, any>[]
  dataKeys?: string[]
  series?: ChartSeries[]
}

export interface TableData {
  title: string
  description: string
  headers: string[]
  data: Record<string, any>[]
}

export interface FundingRound {
  round: string
  period: string
  amount: string
  valuation: string
  use: string
}

export interface FundingTimeline {
  title: string
  description: string
  rounds: FundingRound[]
}

export interface InsightSection {
  title: string
  items: string[]
}

export interface Insights {
  title: string
  description: string
  sections: InsightSection[]
}

// Cash Flow Analysis Data Structure
export interface CashFlowDataPoint {
  month: string
  cashBalance: number
  monthlyBurn: number
  monthlyRevenue: number
  runwayMonths: number
  status: string
}

export interface CashFlowAnalysis {
  title: string
  description: string
  data: CashFlowDataPoint[]
}

// Unit Economics Evolution Data Structure
export interface UnitEconomicsDataPoint {
  year: string
  cac_b2c: number
  ltv_b2c: number
  ratio_b2c: number
  cac_spaces: number
  ltv_spaces: number
  ratio_spaces: number
  cac_enterprise: number
  ltv_enterprise: number
  ratio_enterprise: number
  blended_ratio: number
  payback_months: number
}

export interface UnitEconomicsEvolution {
  title: string
  description: string
  data: UnitEconomicsDataPoint[]
}

// Financial Model Page Data Structure
export interface FinancialModelData {
  meta: PageMeta
  keyMetrics: MetricCard[]
  charts: {
    revenueGrowth: ChartData
    revenueDistribution: ChartData
    profitability: ChartData
  }
  unitEconomics: TableData
  fundingTimeline: FundingTimeline
  cashFlowAnalysis: CashFlowAnalysis
  unitEconomicsEvolution: UnitEconomicsEvolution
  insights: Insights
}

// Dashboard Page Data Structure
export interface DocumentCard {
  id: string
  title: string
  description: string
  href: string
  icon: IconType
  badge?: string
  audience?: string
  lastUpdated?: string
}

export interface DocumentSection {
  id: string
  title: string
  badge?: string
  documents: DocumentCard[]
}

export interface UsageGuidelineSection {
  title: string
  steps: string[]
}

export interface UsageGuidelines {
  title: string
  description: string
  sections: UsageGuidelineSection[]
}

export interface DashboardData {
  meta: PageMeta
  quickStats: MetricCard[]
  documentSections: DocumentSection[]
  usageGuidelines: UsageGuidelines
}

// Investor Package Page Data Structure
export interface CoreDocument {
  id: string
  title: string
  description: string
  href: string
  icon: IconType
  badge: string
  slides?: number | null
  duration: string
}

export interface CoreDocumentsSection {
  title: string
  badge: string
  documents: CoreDocument[]
}

export interface FundingRound {
  id: string
  round: string
  amount: string
  timing: string
  valuation: string
  purpose: string
  status: 'Active' | 'Planned' | 'Future'
}

export interface FundingRoadmap {
  title: string
  description: string
  rounds: FundingRound[]
}

export interface DueDiligenceMaterial {
  id: string
  title: string
  description: string
  href: string
  icon: IconType
  type: string
}

export interface DueDiligenceMaterials {
  title: string
  materials: DueDiligenceMaterial[]
}

export interface InvestmentHighlightSection {
  title: string
  points: string[]
}

export interface InvestmentHighlights {
  title: string
  description: string
  sections: InvestmentHighlightSection[]
}

export interface InvestorPackageData {
  meta: PageMeta
  investmentOverview: MetricCard[]
  coreDocuments: CoreDocumentsSection
  fundingRoadmap: FundingRoadmap
  dueDiligenceMaterials: DueDiligenceMaterials
  investmentHighlights: InvestmentHighlights
}

// Exit Strategy Page Data Structure
export interface ExitScenario {
  id: string
  scenario: string
  probability: string
  timeline: string
  valuation: string
  acquirer: string
  rationale: string
  examples: string[]
  revenue_multiple: string
  pros: string[]
  cons: string[]
}

export interface ValuationDriver {
  id: string
  driver: string
  current: string
  target2031: string
  impact: 'High' | 'Medium' | 'Low'
  description: string
}

export interface ValuationDrivers {
  title: string
  description: string
  drivers: ValuationDriver[]
}

export interface ExitPreparationItem {
  id: string
  item: string
  status: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
}

export interface ExitPreparationCategory {
  id: string
  category: string
  timeline: string
  items: ExitPreparationItem[]
}

export interface ExitPreparation {
  title: string
  description: string
  categories: ExitPreparationCategory[]
}

export interface StrategicConsiderationsSection {
  title: string
  points: string[]
}

export interface StrategicConsiderations {
  title: string
  description: string
  sections: StrategicConsiderationsSection[]
  summary: {
    title: string
    content: string
  }
}

export interface ExitStrategyData {
  meta: PageMeta
  exitMetrics: MetricCard[]
  exitScenarios: ExitScenario[]
  valuationDrivers: ValuationDrivers
  exitPreparation: ExitPreparation
  strategicConsiderations: StrategicConsiderations
}

// Generic page data structure for simpler pages
export interface GenericPageData {
  meta: PageMeta
  sections: {
    id: string
    type: 'metrics' | 'charts' | 'text' | 'table' | 'timeline'
    title?: string
    description?: string
    content: any
  }[]
}

// Strategic Plan Page Data Structure
export interface StrategicPillar {
  id: string
  title: string
  description: string
  icon: IconType
  metrics: string[]
  status: string
}

export interface StrategicPillarsSection {
  title: string
  pillars: StrategicPillar[]
}

export interface MarketExpansionChart {
  id: string
  type: 'composed'
  data: {
    year: string
    markets: number
    users: number
    revenue: number
  }[]
  series: ChartSeries[]
}

export interface MarketExpansionSection {
  title: string
  description: string
  chart: MarketExpansionChart
}

export interface ExpansionPhase {
  id: string
  phase: string
  period: string
  markets: string[]
  investment: string
  focus: string
  milestones: string[]
}

export interface ExpansionPhasesSection {
  title: string
  description: string
  phases: ExpansionPhase[]
}

export interface StrategicObjective {
  id: string
  title: string
  description: string
  icon: IconType
}

export interface StrategicObjectiveCategory {
  title: string
  description: string
  objectives: StrategicObjective[]
}

export interface StrategicObjectivesSection {
  foundationGrowth: StrategicObjectiveCategory
  scaleProfitability: StrategicObjectiveCategory
}

export interface SuccessFactorCategory {
  id: string
  title: string
  factors: string[]
}

export interface SuccessFactorsSection {
  title: string
  description: string
  categories: SuccessFactorCategory[]
}

export interface StrategicPlanData {
  meta: PageMeta
  keyMetrics: MetricCard[]
  marketExpansion: MarketExpansionSection
  strategicPillars: StrategicPillarsSection
  expansionPhases: ExpansionPhasesSection
  strategicObjectives: StrategicObjectivesSection
  successFactors: SuccessFactorsSection
}

// Executive Summary Page Data Structure
export interface ExecutiveOverview {
  title: string
  mainStatement: string
  supportingText: string
}

export interface BusinessPillar {
  id: string
  title: string
  subtitle: string
  revenue: string
  share: string
  icon: IconType
  description: string
}

export interface BusinessPillarsSection {
  title: string
  pillars: BusinessPillar[]
}

export interface InvestmentMilestone {
  id: string
  period: string
  milestone: string
  description: string
}

export interface InvestmentTimelineSection {
  title: string
  description: string
  milestones: InvestmentMilestone[]
}

export interface CompetitiveAdvantage {
  id: string
  title: string
  description: string
  icon: IconType
}

export interface CompetitiveAdvantagesSection {
  title: string
  description: string
  advantages: CompetitiveAdvantage[]
}

export interface FinancialHighlight {
  id: string
  title: string
  description: string
  icon: IconType
}

export interface FinancialHighlightsSection {
  title: string
  description: string
  highlights: FinancialHighlight[]
}

export interface InvestmentThesisCategory {
  id: string
  title: string
  points: string[]
}

export interface InvestmentThesisSection {
  title: string
  description: string
  categories: InvestmentThesisCategory[]
}

export interface ExecutiveSummaryData {
  meta: PageMeta
  executiveOverview: ExecutiveOverview
  keyHighlights: MetricCard[]
  businessPillars: BusinessPillarsSection
  investmentTimeline: InvestmentTimelineSection
  competitiveAdvantages: CompetitiveAdvantagesSection
  financialHighlights: FinancialHighlightsSection
  investmentThesis: InvestmentThesisSection
}

// Market Analysis Page Data Structure
export interface HousingCrisisDataPoint {
  country: string
  priceIncrease: number
  incomeOnHousing: number
}

export interface MarketSizeDataPoint {
  country: string
  population: number
  renters: number
  tam: number
}

export interface BPOMarketDataPoint {
  country: string
  bpoEmployees: number
  relocations: number
  revenue: number
}

export interface Competitor {
  name: string
  markets: string[]
  model: string
  strengths: string[]
  weaknesses: string[]
  differentiation: string
}

export interface MarketEntry {
  market: string
  score: number
  status: string
  factors: string[]
}

export interface CompetitiveAdvantageCategory {
  id: string
  title: string
  advantages: string[]
}

export interface HousingCrisisSection {
  title: string
  description: string
  data: HousingCrisisDataPoint[]
}

export interface MarketSizeSection {
  title: string
  description: string
  data: MarketSizeDataPoint[]
}

export interface BPOMarketSection {
  title: string
  description: string
  data: BPOMarketDataPoint[]
}

export interface CompetitiveLandscape {
  title: string
  description: string
  competitors: Competitor[]
}

export interface MarketEntryStrategy {
  title: string
  description: string
  markets: MarketEntry[]
}

export interface CompetitiveAdvantages {
  title: string
  description: string
  categories: CompetitiveAdvantageCategory[]
}

// European Expansion Map Data Structure
export interface ExpansionRegion {
  country: string
  code: string
  coordinates: [number, number]
  status: 'live' | 'launching' | 'planned' | 'future'
  phase: string
  launchYear: number
  population: number
  tamSize: number
  currentRevenue: number
  projectedRevenue2031: number
  users: number
  marketPenetration: number
  competitorStrength: 'low' | 'medium' | 'high'
  bpoEmployees: number
  marketScore: number
}

export interface EuropeanExpansionMap {
  title: string
  description: string
  regions: ExpansionRegion[]
}

// Competitive Positioning Data Structure
export interface CompetitorPosition {
  name: string
  funding: number
  marketCoverage: number
  featureScore: number
  category: 'us' | 'established' | 'growth' | 'local'
  description: string
  strengths: string[]
  marketPosition: string
}

export interface CompetitivePositioning {
  title: string
  description: string
  competitors: CompetitorPosition[]
}

export interface MarketAnalysisData {
  meta: PageMeta
  keyMetrics: MetricCard[]
  housingCrisis: HousingCrisisSection
  marketSize: MarketSizeSection
  bpoMarket: BPOMarketSection
  competitiveLandscape: CompetitiveLandscape
  marketEntryStrategy: MarketEntryStrategy
  competitiveAdvantages: CompetitiveAdvantages
  europeanExpansionMap: EuropeanExpansionMap
  competitivePositioning: CompetitivePositioning
}

// Product Overview Page Data Structure
export interface TechStackCategory {
  id: string
  category: string
  technologies: string[]
  icon: IconType
  description: string
}

export interface ProductFeature {
  id: string
  title: string
  description: string
  icon: IconType
  metrics: string[]
  status: 'Live' | 'Development' | 'Planned' | 'Future'
}

export interface RoadmapItem {
  id: string
  quarter: string
  title: string
  features: string[]
  status: 'In Progress' | 'Planned' | 'Future'
}

export interface TechnicalAdvantageCategory {
  id: string
  title: string
  advantages: string[]
}

export interface TechnologyStackSection {
  title: string
  categories: TechStackCategory[]
}

export interface ProductFeaturesSection {
  title: string
  features: ProductFeature[]
}

export interface ProductRoadmapSection {
  title: string
  description: string
  items: RoadmapItem[]
}

export interface TechnicalAdvantagesSection {
  title: string
  description: string
  categories: TechnicalAdvantageCategory[]
}

export interface ProductOverviewData {
  meta: PageMeta
  keyMetrics: MetricCard[]
  technologyStack: TechnologyStackSection
  productFeatures: ProductFeaturesSection
  productRoadmap: ProductRoadmapSection
  technicalAdvantages: TechnicalAdvantagesSection
}

// One Pager Page Data Structure
export interface CompanyOverview {
  name: string
  tagline: string
  description: string
}

export interface OnePagerKeyMetric {
  id: string
  value: string | number
  label: string
  color: string
}

export interface ProblemPoint {
  id: string
  point: string
}

export interface Solution {
  title: string
  description: string
}

export interface ProblemSolutionSection {
  title: string
  icon: IconType
  problems: ProblemPoint[]
  solution: Solution
}

export interface BusinessModelPillar {
  id: string
  name: string
  percentage: string
  description: string
}

export interface BusinessModelSection {
  title: string
  icon: IconType
  pillars: BusinessModelPillar[]
  unitEconomics: string
}

export interface TractionPoint {
  id: string
  point: string
  completed: boolean
}

export interface CurrentRound {
  amount: string
  timing: string
  valuation: string
  purpose: string
}

export interface TractionSection {
  title: string
  icon: IconType
  points: TractionPoint[]
  currentRound: CurrentRound
}

export interface ContactInfo {
  email: string
  phone: string
}

export interface CallToAction {
  title: string
  description: string
  contact: ContactInfo
}

export interface QuickStat {
  id: string
  value: string
  label: string
  color: string
}

export interface OnePagerData {
  meta: PageMeta
  companyOverview: CompanyOverview
  keyMetrics: OnePagerKeyMetric[]
  problemSolution: ProblemSolutionSection
  businessModel: BusinessModelSection
  traction: TractionSection
  callToAction: CallToAction
  quickStats: QuickStat[]
}

// Risk Assessment Page Data Structure
export interface RiskItem {
  id: string
  risk: string
  probability: 'High' | 'Medium' | 'Low'
  impact: 'High' | 'Medium' | 'Low'
  mitigation: string
  status: string
}

export interface RiskCategory {
  id: string
  category: string
  icon: IconType
  color: string
  risks: RiskItem[]
}

export interface Scenario {
  id: string
  scenario: string
  probability: string
  revenue2031: string
  impact: string
  description: string
}

export interface RiskFrameworkCategory {
  id: string
  title: string
  items: string[]
}

export interface RiskManagementFramework {
  title: string
  description: string
  categories: RiskFrameworkCategory[]
}

export interface ScenarioAnalysisSection {
  title: string
  description: string
  scenarios: Scenario[]
}

export interface RiskAssessmentData {
  meta: PageMeta
  riskMetrics: MetricCard[]
  riskCategories: RiskCategory[]
  scenarioAnalysis: ScenarioAnalysisSection
  riskManagementFramework: RiskManagementFramework
}

// Growth Strategy Page Data Structure
export interface GrowthFunnelDataPoint {
  year: string
  awareness: number
  consideration: number
  trial: number
  adoption: number
}

export interface MarketPenetrationDataPoint {
  market: string
  users: number
  penetration: number
  phase: string
}

export interface GrowthStrategyItem {
  id: string
  name: string
  description: string
  metrics: string[]
  investment: string
}

export interface GrowthStrategyCategory {
  id: string
  category: string
  icon: IconType
  strategies: GrowthStrategyItem[]
}

export interface MarketEntryPhase {
  id: string
  phase: string
  timeline: string
  tasks: string[]
}

export interface MarketEntryPlaybook {
  title: string
  description: string
  phases: MarketEntryPhase[]
  successMetrics: {
    title: string
    metrics: string[]
  }
}

export interface InvestmentCategory {
  id: string
  title: string
  investments: string[]
}

export interface InvestmentAllocation {
  title: string
  description: string
  categories: InvestmentCategory[]
}

export interface GrowthFunnelSection {
  title: string
  description: string
  data: GrowthFunnelDataPoint[]
}

export interface MarketPenetrationSection {
  title: string
  description: string
  data: MarketPenetrationDataPoint[]
}

export interface GrowthStrategyData {
  meta: PageMeta
  growthMetrics: MetricCard[]
  growthFunnel: GrowthFunnelSection
  marketPenetration: MarketPenetrationSection
  growthStrategies: GrowthStrategyCategory[]
  marketEntryPlaybook: MarketEntryPlaybook
  investmentAllocation: InvestmentAllocation
}

// Milestones Page Data Structure
export interface KPITimelineDataPoint {
  year: string
  users: string
  revenue: string
  markets: number
  status: string
}

export interface KPITimelineSection {
  title: string
  description: string
  data: KPITimelineDataPoint[]
}

export interface MilestoneItem {
  id: string
  milestone: string
  date: string
  status: 'Completed' | 'In Progress' | 'Planned' | 'Future'
  description: string
}

export interface MilestoneCategory {
  id: string
  category: string
  icon: IconType
  color: string
  status: 'Completed' | 'In Progress' | 'Planned' | 'Future'
  milestones: MilestoneItem[]
}

export interface SuccessFactor {
  id: string
  factor: string
  importance: 'Critical' | 'High' | 'Medium' | 'Low'
  timeline: string
  description: string
  dependencies: string[]
  riskLevel: 'High' | 'Medium' | 'Low'
}

export interface SuccessFactorsSection {
  title: string
  description: string
  factors: SuccessFactor[]
}

export interface AccountabilityCategory {
  id: string
  title: string
  activities: string[]
}

export interface AccountabilityFramework {
  title: string
  description: string
  categories: AccountabilityCategory[]
}

export interface MilestonesData {
  meta: PageMeta
  kpiTimeline: KPITimelineSection
  milestoneCategories: MilestoneCategory[]
  successFactors: SuccessFactorsSection
  accountabilityFramework: AccountabilityFramework
}

// Presentation Page Data Structure
export interface SlideMetric {
  label: string
  value: string
  icon: IconType
  color: string
}

export interface SlideData {
  id: number
  title: string
  content: string
  layout: 'title' | 'content' | 'table' | 'metrics' | 'chart'
  data?: SlideMetric[]
  chartData?: any[]
  chartType?: 'line' | 'area' | 'bar' | 'pie'
}

export interface PresentationData {
  meta: PageMeta
  slides: SlideData[]
}
