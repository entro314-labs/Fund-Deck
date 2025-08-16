# Examples

<div align="center">

<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 6L9 17l-5-5" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="12" cy="12" r="9" stroke="#10B981" stroke-width="1" fill="none"/>
</svg>

**Real-world examples for customizing FundDeck**

Practical code examples and common use cases for building your investor presentation platform.

</div>

---

## 🎯 Common Customization Examples

### 1. Creating a Custom Page

Let's create a "Team" page to showcase your startup's team members.

#### Step 1: Create the Data Structure

```json
// src/data/pages/team.json
{
  "meta": {
    "title": "Our Team",
    "subtitle": "Meet the people building the future",
    "date": "2024-08-16",
    "exportButtonText": "Export Team Info"
  },
  "teamMembers": [
    {
      "id": "ceo",
      "name": "Alex Johnson",
      "role": "CEO & Co-Founder",
      "bio": "Former VP of Product at TechCorp, 10+ years in SaaS",
      "image": "/images/team/alex.jpg",
      "linkedin": "https://linkedin.com/in/alexjohnson",
      "experience": [
        "VP Product at TechCorp (2019-2023)",
        "Senior PM at StartupX (2017-2019)",
        "Product Manager at BigTech (2014-2017)"
      ]
    },
    {
      "id": "cto",
      "name": "Sarah Chen",
      "role": "CTO & Co-Founder",
      "bio": "Tech lead with expertise in scalable architecture",
      "image": "/images/team/sarah.jpg",
      "linkedin": "https://linkedin.com/in/sarahchen",
      "experience": [
        "Senior Engineer at Google (2020-2023)",
        "Tech Lead at Facebook (2018-2020)",
        "Software Engineer at Amazon (2016-2018)"
      ]
    }
  ],
  "advisors": [
    {
      "id": "advisor1",
      "name": "Michael Brown",
      "role": "Strategic Advisor",
      "company": "Partner at VentureCapital",
      "bio": "20+ years in venture capital and startups"
    }
  ]
}
```

#### Step 2: Create TypeScript Types

```typescript
// src/types/data.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  experience?: string[];
}

export interface Advisor {
  id: string;
  name: string;
  role: string;
  company?: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export interface TeamData {
  meta: PageMeta;
  teamMembers: TeamMember[];
  advisors: Advisor[];
}
```

#### Step 3: Create the Page Component

```tsx
// src/app/team/page.tsx
'use client';

import { useState } from 'react';
import { useDataQuery } from '@/hooks/use-data-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Download } from 'lucide-react';
import { TeamData } from '@/types/data';
import { ErrorBoundary } from '@/components/error-boundary';

function TeamPageContent() {
  const { data, loading, error } = useDataQuery<TeamData>('pages/team');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load team data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{data.meta.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{data.meta.subtitle}</p>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {data.meta.exportButtonText}
        </Button>
      </div>

      {/* Team Members */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              {member.image && (
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {member.name}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </CardTitle>
                <Badge variant="secondary">{member.role}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                {member.experience && (
                  <div>
                    <h4 className="font-semibold mb-2">Experience:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {member.experience.map((exp, index) => (
                        <li key={index}>• {exp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Advisors */}
      {data.advisors.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Advisors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.advisors.map((advisor) => (
              <Card key={advisor.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{advisor.name}</CardTitle>
                  <div>
                    <Badge variant="outline">{advisor.role}</Badge>
                    {advisor.company && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {advisor.company}
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{advisor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <ErrorBoundary>
      <TeamPageContent />
    </ErrorBoundary>
  );
}
```

#### Step 4: Add to Navigation

```json
// src/data/shared/navigation.json
{
  "primaryNavigation": [
    {
      "name": "Dashboard",
      "href": "/dashboard",
      "icon": "BarChart3",
      "badge": "Core"
    },
    {
      "name": "Team",
      "href": "/team",
      "icon": "Users",
      "badge": "New"
    }
    // ... other navigation items
  ]
}
```

### 2. Custom Chart Component

Create a custom chart for displaying user growth metrics.

```tsx
// src/components/charts/user-growth-chart.tsx
'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

interface UserGrowthData {
  month: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
}

interface UserGrowthChartProps {
  data: UserGrowthData[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
}

export function UserGrowthChart({ 
  data, 
  height = 300, 
  showLegend = true,
  showGrid = true 
}: UserGrowthChartProps) {
  const formatTooltip = (value: number, name: string) => {
    const formatName = (name: string) => {
      switch (name) {
        case 'totalUsers': return 'Total Users';
        case 'activeUsers': return 'Active Users';
        case 'newUsers': return 'New Users';
        default: return name;
      }
    };

    return [value.toLocaleString(), formatName(name)];
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
          <XAxis 
            dataKey="month" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelStyle={{ color: '#333' }}
            contentStyle={{ 
              background: '#fff', 
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          {showLegend && <Legend />}
          
          <Line 
            type="monotone" 
            dataKey="totalUsers" 
            stroke="#6366F1" 
            strokeWidth={2}
            dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#6366F1', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="activeUsers" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="newUsers" 
            stroke="#F59E0B" 
            strokeWidth={2}
            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

#### Using the Custom Chart

```tsx
// src/app/dashboard/page.tsx
import { UserGrowthChart } from '@/components/charts/user-growth-chart';

function DashboardPage() {
  const userGrowthData = [
    { month: 'Jan', totalUsers: 1000, activeUsers: 800, newUsers: 200 },
    { month: 'Feb', totalUsers: 1500, activeUsers: 1200, newUsers: 500 },
    { month: 'Mar', totalUsers: 2200, activeUsers: 1800, newUsers: 700 },
    // ... more data
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>User Growth Trends</CardTitle>
          <CardDescription>
            Track total users, active users, and new user acquisition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserGrowthChart 
            data={userGrowthData}
            height={400}
            showLegend={true}
            showGrid={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

### 3. Custom Admin Panel Section

Add a custom section to the admin panel for managing team data.

```tsx
// src/components/admin/team-editor.tsx
'use client';

import { useState } from 'react';
import { useDataQuery, useDataMutation } from '@/hooks/use-data-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Save } from 'lucide-react';
import { TeamData, TeamMember } from '@/types/data';
import { useUIStore } from '@/stores/ui-store';

export function TeamEditor() {
  const { data, loading, error } = useDataQuery<TeamData>('pages/team');
  const { mutateAsync: updateTeam, loading: saving } = useDataMutation<TeamData>('pages/team');
  const { showToast } = useUIStore();
  const [formData, setFormData] = useState<TeamData | null>(null);

  // Update form data when server data changes
  React.useEffect(() => {
    if (data && !formData) {
      setFormData(data);
    }
  }, [data, formData]);

  const currentData = formData || data;

  const addTeamMember = () => {
    if (!currentData) return;

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: '',
      role: '',
      bio: '',
      experience: []
    };

    setFormData({
      ...currentData,
      teamMembers: [...currentData.teamMembers, newMember]
    });
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: any) => {
    if (!currentData) return;

    const updatedMembers = [...currentData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };

    setFormData({
      ...currentData,
      teamMembers: updatedMembers
    });
  };

  const removeTeamMember = (index: number) => {
    if (!currentData) return;

    const updatedMembers = currentData.teamMembers.filter((_, i) => i !== index);
    setFormData({
      ...currentData,
      teamMembers: updatedMembers
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      await updateTeam(formData);
      showToast('success', '✅ Team data saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      showToast('error', '❌ Failed to save team data');
    }
  };

  if (loading) return <div>Loading team editor...</div>;
  if (error || !currentData) return <div>Error loading team data</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Editor</h2>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Page Meta */}
      <Card>
        <CardHeader>
          <CardTitle>Page Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Page Title</label>
            <Input
              value={currentData.meta.title}
              onChange={(e) => setFormData({
                ...currentData,
                meta: { ...currentData.meta, title: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <Textarea
              value={currentData.meta.subtitle || ''}
              onChange={(e) => setFormData({
                ...currentData,
                meta: { ...currentData.meta, subtitle: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Team Members</CardTitle>
            <Button onClick={addTeamMember} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentData.teamMembers.map((member, index) => (
            <div key={member.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold">Member {index + 1}</h4>
                <Button
                  onClick={() => removeTeamMember(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Input
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <Textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <Input
                    value={member.linkedin || ''}
                    onChange={(e) => updateTeamMember(index, 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    value={member.image || ''}
                    onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                    placeholder="/images/team/photo.jpg"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
```

### 4. Custom Data Export

Create a custom export function for team data.

```tsx
// src/lib/export-utils.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TeamData } from '@/types/data';

export function exportTeamToPDF(teamData: TeamData) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text(teamData.meta.title, 20, 30);
  
  if (teamData.meta.subtitle) {
    doc.setFontSize(12);
    doc.text(teamData.meta.subtitle, 20, 40);
  }

  // Team members table
  const teamTableData = teamData.teamMembers.map(member => [
    member.name,
    member.role,
    member.bio,
    member.experience?.join(', ') || ''
  ]);

  autoTable(doc, {
    head: [['Name', 'Role', 'Bio', 'Experience']],
    body: teamTableData,
    startY: 50,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [99, 102, 241] },
    columnStyles: {
      2: { cellWidth: 60 }, // Bio column wider
      3: { cellWidth: 50 }  // Experience column
    }
  });

  // Advisors table if exists
  if (teamData.advisors.length > 0) {
    const advisorTableData = teamData.advisors.map(advisor => [
      advisor.name,
      advisor.role,
      advisor.company || '',
      advisor.bio
    ]);

    autoTable(doc, {
      head: [['Name', 'Role', 'Company', 'Bio']],
      body: advisorTableData,
      startY: (doc as any).lastAutoTable.finalY + 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [16, 185, 129] }
    });
  }

  // Save the PDF
  doc.save(`${teamData.meta.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

export function exportTeamToCSV(teamData: TeamData) {
  const csvData = [
    ['Name', 'Role', 'Bio', 'LinkedIn', 'Experience'],
    ...teamData.teamMembers.map(member => [
      member.name,
      member.role,
      member.bio,
      member.linkedin || '',
      member.experience?.join('; ') || ''
    ])
  ];

  const csvContent = csvData.map(row => 
    row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${teamData.meta.title.toLowerCase().replace(/\s+/g, '-')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

### 5. Custom Hook for Data Management

Create a custom hook for managing complex data operations.

```tsx
// src/hooks/use-team-management.ts
import { useState, useCallback } from 'react';
import { useDataQuery, useDataMutation } from '@/hooks/use-data-query';
import { TeamData, TeamMember, Advisor } from '@/types/data';
import { useUIStore } from '@/stores/ui-store';

export function useTeamManagement() {
  const { data, loading, error, refetch } = useDataQuery<TeamData>('pages/team');
  const { mutateAsync: updateTeam, loading: saving } = useDataMutation<TeamData>('pages/team');
  const { showToast } = useUIStore();
  const [localData, setLocalData] = useState<TeamData | null>(null);

  // Use local data if available, otherwise use server data
  const currentData = localData || data;

  const updateLocalData = useCallback((updatedData: TeamData) => {
    setLocalData(updatedData);
  }, []);

  const addTeamMember = useCallback((member?: Partial<TeamMember>) => {
    if (!currentData) return;

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: '',
      role: '',
      bio: '',
      experience: [],
      ...member
    };

    const updatedData = {
      ...currentData,
      teamMembers: [...currentData.teamMembers, newMember]
    };

    updateLocalData(updatedData);
    return newMember.id;
  }, [currentData, updateLocalData]);

  const updateTeamMember = useCallback((id: string, updates: Partial<TeamMember>) => {
    if (!currentData) return;

    const updatedMembers = currentData.teamMembers.map(member =>
      member.id === id ? { ...member, ...updates } : member
    );

    updateLocalData({
      ...currentData,
      teamMembers: updatedMembers
    });
  }, [currentData, updateLocalData]);

  const removeTeamMember = useCallback((id: string) => {
    if (!currentData) return;

    const updatedMembers = currentData.teamMembers.filter(member => member.id !== id);
    updateLocalData({
      ...currentData,
      teamMembers: updatedMembers
    });
  }, [currentData, updateLocalData]);

  const addAdvisor = useCallback((advisor?: Partial<Advisor>) => {
    if (!currentData) return;

    const newAdvisor: Advisor = {
      id: `advisor-${Date.now()}`,
      name: '',
      role: '',
      bio: '',
      ...advisor
    };

    const updatedData = {
      ...currentData,
      advisors: [...currentData.advisors, newAdvisor]
    };

    updateLocalData(updatedData);
    return newAdvisor.id;
  }, [currentData, updateLocalData]);

  const saveChanges = useCallback(async () => {
    if (!localData) return false;

    try {
      await updateTeam(localData);
      showToast('success', 'Team data saved successfully!');
      setLocalData(null); // Clear local data, use server data
      refetch(); // Refresh server data
      return true;
    } catch (error) {
      console.error('Save error:', error);
      showToast('error', 'Failed to save team data');
      return false;
    }
  }, [localData, updateTeam, showToast, refetch]);

  const discardChanges = useCallback(() => {
    setLocalData(null);
    showToast('info', 'Changes discarded');
  }, [showToast]);

  const hasUnsavedChanges = Boolean(localData);

  return {
    // Data
    data: currentData,
    loading,
    error,
    saving,
    hasUnsavedChanges,

    // Actions
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    addAdvisor,
    saveChanges,
    discardChanges,
    updateLocalData,
    refetch
  };
}
```

#### Using the Custom Hook

```tsx
// src/components/admin/enhanced-team-editor.tsx
import { useTeamManagement } from '@/hooks/use-team-management';

function EnhancedTeamEditor() {
  const {
    data,
    loading,
    saving,
    hasUnsavedChanges,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    saveChanges,
    discardChanges
  } = useTeamManagement();

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      {/* Unsaved changes indicator */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            You have unsaved changes. Don't forget to save!
          </p>
          <div className="mt-2 space-x-2">
            <Button onClick={saveChanges} size="sm" disabled={saving}>
              Save Changes
            </Button>
            <Button onClick={discardChanges} variant="outline" size="sm">
              Discard
            </Button>
          </div>
        </div>
      )}

      {/* Rest of the editor UI */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({data.teamMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {data.teamMembers.map((member) => (
            <div key={member.id}>
              {/* Member editing UI */}
              <Button
                onClick={() => updateTeamMember(member.id, { 
                  name: 'Updated Name' 
                })}
              >
                Update Member
              </Button>
            </div>
          ))}
          
          <Button onClick={() => addTeamMember({ name: 'New Member' })}>
            Add Team Member
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

<div align="center">

**Ready to build more custom features?**

[Configuration Guide](./configuration.md) • [API Reference](./api-reference.md) • [Contributing](../CONTRIBUTING.md)

</div>