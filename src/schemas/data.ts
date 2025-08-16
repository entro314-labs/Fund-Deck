import { z } from 'zod'

// Icon types from lucide-react
export const IconTypeSchema = z.enum([
  'TrendingUp',
  'Euro',
  'Users',
  'Target',
  'BarChart3',
  'PieChart',
  'Calendar',
  'Building2',
  'FileText',
  'Rocket',
  'Shield',
  'LogOut',
  'Star',
  'Clock',
  'Eye',
  'Download',
  'ArrowRight',
  'Presentation',
  'Play',
  'ChevronRight',
  'CheckCircle',
  'Zap',
  'Globe',
  'MapPin',
  'AlertTriangle',
  'Smartphone',
  'Brain',
  'Code',
  'Database',
  'Cloud',
  'TrendingDown',
  'Building',
  'Activity',
  'Handshake',
  'Search',
  'Scale',
])

// Base schemas
export const PageMetaSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badge: z.string().optional(),
  date: z.string().optional(),
  exportButtonText: z.string().optional(),
})

export const MetricCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  value: z.union([z.number(), z.string()]),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  subtitle: z.string(),
  icon: IconTypeSchema,
  color: z.string(),
})

export const ChartSeriesSchema = z.object({
  key: z.string(),
  name: z.string(),
  color: z.string(),
  type: z.enum(['bar', 'line', 'area']).optional(),
  yAxisId: z.enum(['left', 'right']).optional(),
})

export const ChartDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['area', 'pie', 'composed', 'bar', 'line']),
  data: z.array(z.record(z.string(), z.any())),
  dataKeys: z.array(z.string()).optional(),
  series: z.array(ChartSeriesSchema).optional(),
})

export const TableDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  headers: z.array(z.string()),
  data: z.array(z.record(z.string(), z.any())),
})

export const FundingRoundSchema = z.object({
  round: z.string(),
  period: z.string(),
  amount: z.string(),
  valuation: z.string(),
  use: z.string(),
})

export const FundingTimelineSchema = z.object({
  title: z.string(),
  description: z.string(),
  rounds: z.array(FundingRoundSchema),
})

export const InsightSectionSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
})

export const InsightsSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(InsightSectionSchema),
})

// Cash Flow Analysis schemas
export const CashFlowDataPointSchema = z.object({
  month: z.string(),
  cashBalance: z.number(),
  monthlyBurn: z.number(),
  monthlyRevenue: z.number(),
  runwayMonths: z.number(),
  status: z.string(),
})

export const CashFlowAnalysisSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(CashFlowDataPointSchema),
})

// Unit Economics schemas
export const UnitEconomicsDataPointSchema = z.object({
  year: z.string(),
  cac_b2c: z.number(),
  ltv_b2c: z.number(),
  ratio_b2c: z.number(),
  cac_spaces: z.number(),
  ltv_spaces: z.number(),
  ratio_spaces: z.number(),
  cac_enterprise: z.number(),
  ltv_enterprise: z.number(),
  ratio_enterprise: z.number(),
  blended_ratio: z.number(),
  payback_months: z.number(),
})

export const UnitEconomicsEvolutionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(UnitEconomicsDataPointSchema),
})

// Financial Model Page schema
export const FinancialModelDataSchema = z.object({
  meta: PageMetaSchema,
  keyMetrics: z.array(MetricCardSchema),
  charts: z.object({
    revenueGrowth: ChartDataSchema,
    revenueDistribution: ChartDataSchema,
    profitability: ChartDataSchema,
  }),
  unitEconomics: TableDataSchema,
  fundingTimeline: FundingTimelineSchema,
  cashFlowAnalysis: CashFlowAnalysisSchema,
  unitEconomicsEvolution: UnitEconomicsEvolutionSchema,
  insights: InsightsSchema,
})

// Dashboard schemas
export const DocumentCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
  icon: IconTypeSchema,
  badge: z.string().optional(),
  audience: z.string().optional(),
  lastUpdated: z.string().optional(),
})

export const DocumentSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  badge: z.string().optional(),
  documents: z.array(DocumentCardSchema),
})

export const UsageGuidelineSectionSchema = z.object({
  title: z.string(),
  steps: z.array(z.string()),
})

export const UsageGuidelinesSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(UsageGuidelineSectionSchema),
})

export const DashboardDataSchema = z.object({
  meta: PageMetaSchema,
  quickStats: z.array(MetricCardSchema),
  documentSections: z.array(DocumentSectionSchema),
  usageGuidelines: UsageGuidelinesSchema,
})

// Investor Package schemas
export const CoreDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
  icon: IconTypeSchema,
  badge: z.string(),
  slides: z.number().nullable().optional(),
  duration: z.string(),
})

export const CoreDocumentsSectionSchema = z.object({
  title: z.string(),
  badge: z.string(),
  documents: z.array(CoreDocumentSchema),
})

export const InvestorFundingRoundSchema = z.object({
  id: z.string(),
  round: z.string(),
  amount: z.string(),
  timing: z.string(),
  valuation: z.string(),
  purpose: z.string(),
  status: z.enum(['Active', 'Planned', 'Future']),
})

export const FundingRoadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  rounds: z.array(InvestorFundingRoundSchema),
})

export const DueDiligenceMaterialSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
  icon: IconTypeSchema,
  type: z.string(),
})

export const DueDiligenceMaterialsSchema = z.object({
  title: z.string(),
  materials: z.array(DueDiligenceMaterialSchema),
})

export const InvestmentHighlightSectionSchema = z.object({
  title: z.string(),
  points: z.array(z.string()),
})

export const InvestmentHighlightsSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(InvestmentHighlightSectionSchema),
})

export const InvestorPackageDataSchema = z.object({
  meta: PageMetaSchema,
  investmentOverview: z.array(MetricCardSchema),
  coreDocuments: CoreDocumentsSectionSchema,
  fundingRoadmap: FundingRoadmapSchema,
  dueDiligenceMaterials: DueDiligenceMaterialsSchema,
  investmentHighlights: InvestmentHighlightsSchema,
})

// Exit Strategy schemas
export const ExitScenarioSchema = z.object({
  id: z.string(),
  scenario: z.string(),
  probability: z.string(),
  timeline: z.string(),
  valuation: z.string(),
  acquirer: z.string(),
  rationale: z.string(),
  examples: z.array(z.string()),
  revenue_multiple: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
})

export const ValuationDriverSchema = z.object({
  id: z.string(),
  driver: z.string(),
  current: z.string(),
  target2031: z.string(),
  impact: z.enum(['High', 'Medium', 'Low']),
  description: z.string(),
})

export const ValuationDriversSchema = z.object({
  title: z.string(),
  description: z.string(),
  drivers: z.array(ValuationDriverSchema),
})

export const ExitPreparationItemSchema = z.object({
  id: z.string(),
  item: z.string(),
  status: z.string(),
  priority: z.enum(['Critical', 'High', 'Medium', 'Low']),
})

export const ExitPreparationCategorySchema = z.object({
  id: z.string(),
  category: z.string(),
  timeline: z.string(),
  items: z.array(ExitPreparationItemSchema),
})

export const ExitPreparationSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(ExitPreparationCategorySchema),
})

export const StrategicConsiderationsSectionSchema = z.object({
  title: z.string(),
  points: z.array(z.string()),
})

export const StrategicConsiderationsSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(StrategicConsiderationsSectionSchema),
  summary: z.object({
    title: z.string(),
    content: z.string(),
  }),
})

export const ExitStrategyDataSchema = z.object({
  meta: PageMetaSchema,
  exitMetrics: z.array(MetricCardSchema),
  exitScenarios: z.array(ExitScenarioSchema),
  valuationDrivers: ValuationDriversSchema,
  exitPreparation: ExitPreparationSchema,
  strategicConsiderations: StrategicConsiderationsSchema,
})

// Strategic Plan schemas
export const StrategicPillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: IconTypeSchema,
  metrics: z.array(z.string()),
  status: z.string(),
})

export const StrategicPillarsSectionSchema = z.object({
  title: z.string(),
  pillars: z.array(StrategicPillarSchema),
})

export const MarketExpansionChartSchema = z.object({
  id: z.string(),
  type: z.literal('composed'),
  data: z.array(
    z.object({
      year: z.string(),
      markets: z.number(),
      users: z.number(),
      revenue: z.number(),
    })
  ),
  series: z.array(ChartSeriesSchema),
})

export const MarketExpansionSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  chart: MarketExpansionChartSchema,
})

export const ExpansionPhaseSchema = z.object({
  id: z.string(),
  phase: z.string(),
  period: z.string(),
  markets: z.array(z.string()),
  investment: z.string(),
  focus: z.string(),
  milestones: z.array(z.string()),
})

export const ExpansionPhasesSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  phases: z.array(ExpansionPhaseSchema),
})

export const StrategicObjectiveSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: IconTypeSchema,
})

export const StrategicObjectiveCategorySchema = z.object({
  title: z.string(),
  description: z.string(),
  objectives: z.array(StrategicObjectiveSchema),
})

export const StrategicObjectivesSectionSchema = z.object({
  foundationGrowth: StrategicObjectiveCategorySchema,
  scaleProfitability: StrategicObjectiveCategorySchema,
})

export const SuccessFactorCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  factors: z.array(z.string()),
})

export const SuccessFactorsSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(SuccessFactorCategorySchema),
})

export const StrategicPlanDataSchema = z.object({
  meta: PageMetaSchema,
  keyMetrics: z.array(MetricCardSchema),
  marketExpansion: MarketExpansionSectionSchema,
  strategicPillars: StrategicPillarsSectionSchema,
  expansionPhases: ExpansionPhasesSectionSchema,
  strategicObjectives: StrategicObjectivesSectionSchema,
  successFactors: SuccessFactorsSectionSchema,
})

// Executive Summary schemas
export const ExecutiveOverviewSchema = z.object({
  title: z.string(),
  mainStatement: z.string(),
  supportingText: z.string(),
})

export const BusinessPillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  revenue: z.string(),
  share: z.string(),
  icon: IconTypeSchema,
  description: z.string(),
})

export const BusinessPillarsSectionSchema = z.object({
  title: z.string(),
  pillars: z.array(BusinessPillarSchema),
})

export const InvestmentMilestoneSchema = z.object({
  id: z.string(),
  period: z.string(),
  milestone: z.string(),
  description: z.string(),
})

export const InvestmentTimelineSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  milestones: z.array(InvestmentMilestoneSchema),
})

export const CompetitiveAdvantageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: IconTypeSchema,
})

export const CompetitiveAdvantagesSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  advantages: z.array(CompetitiveAdvantageSchema),
})

export const FinancialHighlightSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: IconTypeSchema,
})

export const FinancialHighlightsSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  highlights: z.array(FinancialHighlightSchema),
})

export const InvestmentThesisCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  points: z.array(z.string()),
})

export const InvestmentThesisSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(InvestmentThesisCategorySchema),
})

export const ExecutiveSummaryDataSchema = z.object({
  meta: PageMetaSchema,
  executiveOverview: ExecutiveOverviewSchema,
  keyHighlights: z.array(MetricCardSchema),
  businessPillars: BusinessPillarsSectionSchema,
  investmentTimeline: InvestmentTimelineSectionSchema,
  competitiveAdvantages: CompetitiveAdvantagesSectionSchema,
  financialHighlights: FinancialHighlightsSectionSchema,
  investmentThesis: InvestmentThesisSectionSchema,
})

// Market Analysis schemas
export const HousingCrisisDataPointSchema = z.object({
  country: z.string(),
  priceIncrease: z.number(),
  incomeOnHousing: z.number(),
})

export const MarketSizeDataPointSchema = z.object({
  country: z.string(),
  population: z.number(),
  renters: z.number(),
  tam: z.number(),
})

export const BPOMarketDataPointSchema = z.object({
  country: z.string(),
  bpoEmployees: z.number(),
  relocations: z.number(),
  revenue: z.number(),
})

export const CompetitorSchema = z.object({
  name: z.string(),
  markets: z.array(z.string()),
  model: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  differentiation: z.string(),
})

export const MarketEntrySchema = z.object({
  market: z.string(),
  score: z.number(),
  status: z.string(),
  factors: z.array(z.string()),
})

export const CompetitiveAdvantageCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  advantages: z.array(z.string()),
})

export const HousingCrisisSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(HousingCrisisDataPointSchema),
})

export const MarketSizeSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(MarketSizeDataPointSchema),
})

export const BPOMarketSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(BPOMarketDataPointSchema),
})

export const CompetitiveLandscapeSchema = z.object({
  title: z.string(),
  description: z.string(),
  competitors: z.array(CompetitorSchema),
})

export const MarketEntryStrategySchema = z.object({
  title: z.string(),
  description: z.string(),
  markets: z.array(MarketEntrySchema),
})

export const CompetitiveAdvantagesSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(CompetitiveAdvantageCategorySchema),
})

// European Expansion Map schemas
export const ExpansionRegionSchema = z.object({
  country: z.string(),
  code: z.string(),
  coordinates: z.array(z.number()).length(2),
  status: z.enum(['live', 'launching', 'planned', 'future']),
  phase: z.string(),
  launchYear: z.number(),
  population: z.number(),
  tamSize: z.number(),
  currentRevenue: z.number(),
  projectedRevenue2031: z.number(),
  users: z.number(),
  marketPenetration: z.number(),
  competitorStrength: z.enum(['low', 'medium', 'high']),
  bpoEmployees: z.number(),
  marketScore: z.number(),
})

export const EuropeanExpansionMapSchema = z.object({
  title: z.string(),
  description: z.string(),
  regions: z.array(ExpansionRegionSchema),
})

// Competitive Positioning schemas
export const CompetitorPositionSchema = z.object({
  name: z.string(),
  funding: z.number(),
  marketCoverage: z.number(),
  featureScore: z.number(),
  category: z.enum(['us', 'established', 'growth', 'local']),
  description: z.string(),
  strengths: z.array(z.string()),
  marketPosition: z.string(),
})

export const CompetitivePositioningSchema = z.object({
  title: z.string(),
  description: z.string(),
  competitors: z.array(CompetitorPositionSchema),
})

export const MarketAnalysisDataSchema = z.object({
  meta: PageMetaSchema,
  keyMetrics: z.array(MetricCardSchema),
  housingCrisis: HousingCrisisSectionSchema,
  marketSize: MarketSizeSectionSchema,
  bpoMarket: BPOMarketSectionSchema,
  competitiveLandscape: CompetitiveLandscapeSchema,
  marketEntryStrategy: MarketEntryStrategySchema,
  competitiveAdvantages: CompetitiveAdvantagesSchema,
  europeanExpansionMap: EuropeanExpansionMapSchema,
  competitivePositioning: CompetitivePositioningSchema,
})

// Product Overview schemas
export const TechStackCategorySchema = z.object({
  id: z.string(),
  category: z.string(),
  technologies: z.array(z.string()),
  icon: IconTypeSchema,
  description: z.string(),
})

export const ProductFeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: IconTypeSchema,
  metrics: z.array(z.string()),
  status: z.enum(['Live', 'Development', 'Planned', 'Future']),
})

export const RoadmapItemSchema = z.object({
  id: z.string(),
  quarter: z.string(),
  title: z.string(),
  features: z.array(z.string()),
  status: z.enum(['In Progress', 'Planned', 'Future']),
})

export const TechnicalAdvantageCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  advantages: z.array(z.string()),
})

export const TechnologyStackSectionSchema = z.object({
  title: z.string(),
  categories: z.array(TechStackCategorySchema),
})

export const ProductFeaturesSectionSchema = z.object({
  title: z.string(),
  features: z.array(ProductFeatureSchema),
})

export const ProductRoadmapSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(RoadmapItemSchema),
})

export const TechnicalAdvantagesSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(TechnicalAdvantageCategorySchema),
})

export const ProductOverviewDataSchema = z.object({
  meta: PageMetaSchema,
  keyMetrics: z.array(MetricCardSchema),
  technologyStack: TechnologyStackSectionSchema,
  productFeatures: ProductFeaturesSectionSchema,
  productRoadmap: ProductRoadmapSectionSchema,
  technicalAdvantages: TechnicalAdvantagesSectionSchema,
})

// One Pager schemas
export const CompanyOverviewSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
})

export const OnePagerKeyMetricSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.number()]),
  label: z.string(),
  color: z.string(),
})

export const ProblemPointSchema = z.object({
  id: z.string(),
  point: z.string(),
})

export const SolutionSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export const ProblemSolutionSectionSchema = z.object({
  title: z.string(),
  icon: IconTypeSchema,
  problems: z.array(ProblemPointSchema),
  solution: SolutionSchema,
})

export const BusinessModelPillarSchema = z.object({
  id: z.string(),
  name: z.string(),
  percentage: z.string(),
  description: z.string(),
})

export const BusinessModelSectionSchema = z.object({
  title: z.string(),
  icon: IconTypeSchema,
  pillars: z.array(BusinessModelPillarSchema),
  unitEconomics: z.string(),
})

export const TractionPointSchema = z.object({
  id: z.string(),
  point: z.string(),
  completed: z.boolean(),
})

export const CurrentRoundSchema = z.object({
  amount: z.string(),
  timing: z.string(),
  valuation: z.string(),
  purpose: z.string(),
})

export const TractionSectionSchema = z.object({
  title: z.string(),
  icon: IconTypeSchema,
  points: z.array(TractionPointSchema),
  currentRound: CurrentRoundSchema,
})

export const ContactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
})

export const CallToActionSchema = z.object({
  title: z.string(),
  description: z.string(),
  contact: ContactInfoSchema,
})

export const QuickStatSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  color: z.string(),
})

export const OnePagerDataSchema = z.object({
  meta: PageMetaSchema,
  companyOverview: CompanyOverviewSchema,
  keyMetrics: z.array(OnePagerKeyMetricSchema),
  problemSolution: ProblemSolutionSectionSchema,
  businessModel: BusinessModelSectionSchema,
  traction: TractionSectionSchema,
  callToAction: CallToActionSchema,
  quickStats: z.array(QuickStatSchema),
})

// Risk Assessment schemas
export const RiskItemSchema = z.object({
  id: z.string(),
  risk: z.string(),
  probability: z.enum(['High', 'Medium', 'Low']),
  impact: z.enum(['High', 'Medium', 'Low']),
  mitigation: z.string(),
  status: z.string(),
})

export const RiskCategorySchema = z.object({
  id: z.string(),
  category: z.string(),
  icon: IconTypeSchema,
  color: z.string(),
  risks: z.array(RiskItemSchema),
})

export const ScenarioSchema = z.object({
  id: z.string(),
  scenario: z.string(),
  probability: z.string(),
  revenue2031: z.string(),
  impact: z.string(),
  description: z.string(),
})

export const RiskFrameworkCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(z.string()),
})

export const RiskManagementFrameworkSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(RiskFrameworkCategorySchema),
})

export const ScenarioAnalysisSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  scenarios: z.array(ScenarioSchema),
})

export const RiskAssessmentDataSchema = z.object({
  meta: PageMetaSchema,
  riskMetrics: z.array(MetricCardSchema),
  riskCategories: z.array(RiskCategorySchema),
  scenarioAnalysis: ScenarioAnalysisSectionSchema,
  riskManagementFramework: RiskManagementFrameworkSchema,
})

// Growth Strategy schemas
export const GrowthFunnelDataPointSchema = z.object({
  year: z.string(),
  awareness: z.number(),
  consideration: z.number(),
  trial: z.number(),
  adoption: z.number(),
})

export const MarketPenetrationDataPointSchema = z.object({
  market: z.string(),
  users: z.number(),
  penetration: z.number(),
  phase: z.string(),
})

export const GrowthStrategyItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  metrics: z.array(z.string()),
  investment: z.string(),
})

export const GrowthStrategyCategorySchema = z.object({
  id: z.string(),
  category: z.string(),
  icon: IconTypeSchema,
  strategies: z.array(GrowthStrategyItemSchema),
})

export const MarketEntryPhaseSchema = z.object({
  id: z.string(),
  phase: z.string(),
  timeline: z.string(),
  tasks: z.array(z.string()),
})

export const MarketEntryPlaybookSchema = z.object({
  title: z.string(),
  description: z.string(),
  phases: z.array(MarketEntryPhaseSchema),
  successMetrics: z.object({
    title: z.string(),
    metrics: z.array(z.string()),
  }),
})

export const InvestmentCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  investments: z.array(z.string()),
})

export const InvestmentAllocationSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(InvestmentCategorySchema),
})

export const GrowthFunnelSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(GrowthFunnelDataPointSchema),
})

export const MarketPenetrationSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(MarketPenetrationDataPointSchema),
})

export const GrowthStrategyDataSchema = z.object({
  meta: PageMetaSchema,
  growthMetrics: z.array(MetricCardSchema),
  growthFunnel: GrowthFunnelSectionSchema,
  marketPenetration: MarketPenetrationSectionSchema,
  growthStrategies: z.array(GrowthStrategyCategorySchema),
  marketEntryPlaybook: MarketEntryPlaybookSchema,
  investmentAllocation: InvestmentAllocationSchema,
})

// Milestones schemas
export const KPITimelineDataPointSchema = z.object({
  year: z.string(),
  users: z.string(),
  revenue: z.string(),
  markets: z.number(),
  status: z.string(),
})

export const KPITimelineSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(KPITimelineDataPointSchema),
})

export const MilestoneItemSchema = z.object({
  id: z.string(),
  milestone: z.string(),
  date: z.string(),
  status: z.enum(['Completed', 'In Progress', 'Planned', 'Future']),
  description: z.string(),
})

export const MilestoneCategorySchema = z.object({
  id: z.string(),
  category: z.string(),
  icon: IconTypeSchema,
  color: z.string(),
  status: z.enum(['Completed', 'In Progress', 'Planned', 'Future']),
  milestones: z.array(MilestoneItemSchema),
})

export const SuccessFactorSchema = z.object({
  id: z.string(),
  factor: z.string(),
  importance: z.enum(['Critical', 'High', 'Medium', 'Low']),
  timeline: z.string(),
  description: z.string(),
  dependencies: z.array(z.string()),
  riskLevel: z.enum(['High', 'Medium', 'Low']),
})

export const MilestoneSuccessFactorsSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  factors: z.array(SuccessFactorSchema),
})

export const AccountabilityCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  activities: z.array(z.string()),
})

export const AccountabilityFrameworkSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(AccountabilityCategorySchema),
})

export const MilestonesDataSchema = z.object({
  meta: PageMetaSchema,
  kpiTimeline: KPITimelineSectionSchema,
  milestoneCategories: z.array(MilestoneCategorySchema),
  successFactors: MilestoneSuccessFactorsSectionSchema,
  accountabilityFramework: AccountabilityFrameworkSchema,
})

// Presentation schemas
export const SlideMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: IconTypeSchema,
  color: z.string(),
})

export const SlideDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  layout: z.enum(['title', 'content', 'table', 'metrics', 'chart']),
  data: z.array(SlideMetricSchema).optional(),
  chartData: z.array(z.any()).optional(),
  chartType: z.enum(['line', 'area', 'bar', 'pie']).optional(),
})

export const PresentationDataSchema = z.object({
  meta: PageMetaSchema,
  slides: z.array(SlideDataSchema),
})

// Live Dashboard schemas
export const LiveDashboardDataSchema = z.object({
  meta: PageMetaSchema,
  liveMetrics: z.array(MetricCardSchema),
  charts: z.object({
    userGrowth: ChartDataSchema,
    revenueMetrics: ChartDataSchema,
    marketExpansion: ChartDataSchema,
  }),
  realTimeUpdates: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.string(),
    updates: z.array(
      z.object({
        id: z.string(),
        timestamp: z.string(),
        metric: z.string(),
        value: z.string(),
        change: z.string(),
        trend: z.enum(['up', 'down', 'stable']),
      })
    ),
  }),
})

// Generic page schema
export const GenericPageDataSchema = z.object({
  meta: PageMetaSchema,
  sections: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['metrics', 'charts', 'text', 'table', 'timeline']),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.any(),
    })
  ),
})

// Export all schemas for easy import
export const DataSchemas = {
  PageMeta: PageMetaSchema,
  MetricCard: MetricCardSchema,
  ChartData: ChartDataSchema,
  TableData: TableDataSchema,
  FinancialModelData: FinancialModelDataSchema,
  DashboardData: DashboardDataSchema,
  InvestorPackageData: InvestorPackageDataSchema,
  ExitStrategyData: ExitStrategyDataSchema,
  StrategicPlanData: StrategicPlanDataSchema,
  ExecutiveSummaryData: ExecutiveSummaryDataSchema,
  MarketAnalysisData: MarketAnalysisDataSchema,
  ProductOverviewData: ProductOverviewDataSchema,
  OnePagerData: OnePagerDataSchema,
  RiskAssessmentData: RiskAssessmentDataSchema,
  GrowthStrategyData: GrowthStrategyDataSchema,
  MilestonesData: MilestonesDataSchema,
  PresentationData: PresentationDataSchema,
  LiveDashboardData: LiveDashboardDataSchema,
  GenericPageData: GenericPageDataSchema,
} as const

// Type exports for convenience
export type IconType = z.infer<typeof IconTypeSchema>
export type PageMeta = z.infer<typeof PageMetaSchema>
export type MetricCard = z.infer<typeof MetricCardSchema>
export type ChartData = z.infer<typeof ChartDataSchema>
export type TableData = z.infer<typeof TableDataSchema>
export type FinancialModelData = z.infer<typeof FinancialModelDataSchema>
export type DashboardData = z.infer<typeof DashboardDataSchema>
export type InvestorPackageData = z.infer<typeof InvestorPackageDataSchema>
export type ExitStrategyData = z.infer<typeof ExitStrategyDataSchema>
export type StrategicPlanData = z.infer<typeof StrategicPlanDataSchema>
export type ExecutiveSummaryData = z.infer<typeof ExecutiveSummaryDataSchema>
export type MarketAnalysisData = z.infer<typeof MarketAnalysisDataSchema>
export type ProductOverviewData = z.infer<typeof ProductOverviewDataSchema>
export type OnePagerData = z.infer<typeof OnePagerDataSchema>
export type RiskAssessmentData = z.infer<typeof RiskAssessmentDataSchema>
export type GrowthStrategyData = z.infer<typeof GrowthStrategyDataSchema>
export type MilestonesData = z.infer<typeof MilestonesDataSchema>
export type PresentationData = z.infer<typeof PresentationDataSchema>
export type LiveDashboardData = z.infer<typeof LiveDashboardDataSchema>
export type GenericPageData = z.infer<typeof GenericPageDataSchema>
