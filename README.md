# **Application hierarchy and publishing workflow** 

For the Skunkworks Academy ecosystem. It treats Publishing as a paid, multi-tenant module while retaining shared identity, navigation, governance, analytics, and platform services.

Your current ecosystem landing page already identifies publishing as part of the unified Academy navigation, and the Jobs module already links to `publish.skunkworksacademy.com`. fileciteturn2file10 fileciteturn2file15

## 1. Entire application hierarchy

```mermaid
flowchart TB
    User["User / Customer / Instructor / Staff"]

    subgraph Public["Public Experience Layer"]
        Main["skunkworksacademy.com"]
        Catalogue["Course Catalogue"]
        ProductPages["Module Product Pages"]
        Blog["Blog"]
        Jobs["Jobs"]
        Docs["Documentation"]
    end

    subgraph Identity["Identity and Access Layer"]
        Entra["Microsoft Entra ID"]
        SSO["Single Sign-On"]
        MFA["Multifactor Authentication"]
        Tenant["Tenant Resolution"]
        RBAC["Role-Based Access Control"]
        Entitlement["Subscription and Module Entitlement"]
    end

    subgraph Modules["Skunkworks Academy Application Modules"]
        Portal["portal.skunkworksacademy.com<br/>Learner and Operations Portal"]
        Publish["publish.skunkworksacademy.com<br/>Publishing and Course Production"]
        Labs["labs.skunkworksacademy.com<br/>Virtual Labs"]
        Badge["badge-hub.skunkworksacademy.com<br/>Credentials and Evidence"]
        Security["security.skunkworksacademy.com<br/>Security Learning"]
        IBM["ibm.skunkworksacademy.com<br/>IBM Learning"]
        Forms["Forms and Assessments"]
        Careers["Jobs and Talent Placement"]
        Analytics["Analytics and Reporting"]
        Community["Community and Collaboration"]
    end

    subgraph Shared["Shared Platform Services"]
        API["API Gateway / Backend APIs"]
        Workflow["Workflow and Notifications"]
        Search["Search and Content Index"]
        Audit["Audit and Activity Logging"]
        Billing["Billing, Plans and Metering"]
        FeatureFlags["Feature Flags"]
        Integration["Integration Services"]
        AI["AI Content and Learning Services"]
    end

    subgraph Data["Data and Content Services"]
        AzureSQL["Azure SQL<br/>Metadata and Transactions"]
        Blob["Azure Blob Storage<br/>Course Assets and Releases"]
        SharePoint["SharePoint / Teams<br/>Collaboration Documents"]
        KeyVault["Azure Key Vault"]
        Monitor["Azure Monitor / Application Insights"]
        PowerBI["Power BI / Fabric"]
    end

    User --> Main
    Main --> ProductPages
    ProductPages --> Entra

    Entra --> SSO
    SSO --> MFA
    MFA --> Tenant
    Tenant --> RBAC
    RBAC --> Entitlement

    Entitlement --> Portal
    Entitlement --> Publish
    Entitlement --> Labs
    Entitlement --> Badge
    Entitlement --> Security
    Entitlement --> IBM
    Entitlement --> Forms
    Entitlement --> Careers
    Entitlement --> Analytics
    Entitlement --> Community

    Modules --> API

    API --> Workflow
    API --> Search
    API --> Audit
    API --> Billing
    API --> FeatureFlags
    API --> Integration
    API --> AI

    API --> AzureSQL
    API --> Blob
    Integration --> SharePoint
    Shared --> KeyVault
    Audit --> Monitor
    AzureSQL --> PowerBI
    Monitor --> PowerBI
```

The existing Portal page is already positioned as the learner, instructor, and operations entry point, while the Labs module follows the shared theme, light/dark mode, navigation, canonical metadata, and Academy branding. fileciteturn2file9 fileciteturn2file11

---

## 2. Publishing module user workflow

```mermaid
flowchart TD
    Landing["Publishing Product Landing Page"]
    SignIn["Sign in with Microsoft"]
    Auth{"Authentication successful?"}
    Account{"Account and tenant recognised?"}
    Licence{"Publishing entitlement active?"}
    Trial["Start trial / Purchase subscription / Request access"]
    SelectTenant["Select organisation or customer tenant"]
    SelectTeam["Select or create publishing team"]
    TeamRole["Assign team roles"]
    CreateProject["Create publishing project"]
    Template["Select project template"]
    Workspace["Provision project workspace"]

    subgraph Roles["Typical Publishing Roles"]
        Owner["Workspace Owner"]
        PM["Project Manager"]
        ID["Instructional Designer"]
        SME["Subject-Matter Expert"]
        Author["Content Author"]
        Media["Media Producer"]
        Reviewer["Technical / Editorial Reviewer"]
        QA["Quality Assurance"]
        Publisher["Release Publisher"]
    end

    subgraph WorkspaceFunctions["Project Workspace"]
        Dashboard["Project Dashboard"]
        Tasks["Tasks, Stages and Milestones"]
        Time["Timesheets and Logged Hours"]
        Assets["Course Asset Repository"]
        Outline["Curriculum and Outline"]
        Content["Content Authoring"]
        Assessments["Assessments and Question Banks"]
        LabsBuild["Lab Development"]
        Review["Review and Approval"]
        Versioning["Versions and Change History"]
        Cost["Budget and Production Cost"]
    end

    subgraph Release["Release and Distribution"]
        Gate["Publication Readiness Gate"]
        Build["Build Publication Package"]
        Preview["Staging Preview"]
        Approval{"Final approval?"}
        PublishCourse["Publish Release"]
        CatalogueRelease["Course Catalogue"]
        LMSRelease["Academy Portal / LMS"]
        SCORM["SCORM / xAPI Package"]
        GitHubRelease["GitHub Release"]
        External["Partner or Customer Platform"]
        Measure["Analytics, Feedback and Maintenance"]
    end

    Landing --> SignIn
    SignIn --> Auth

    Auth -- No --> SignIn
    Auth -- Yes --> Account

    Account -- No --> SelectTenant
    Account -- Yes --> Licence

    SelectTenant --> Licence

    Licence -- No --> Trial
    Trial --> Licence
    Licence -- Yes --> SelectTeam

    SelectTeam --> TeamRole
    TeamRole --> Roles
    TeamRole --> CreateProject
    CreateProject --> Template
    Template --> Workspace

    Workspace --> Dashboard
    Dashboard --> Tasks
    Dashboard --> Time
    Dashboard --> Assets
    Dashboard --> Outline
    Dashboard --> Content
    Dashboard --> Assessments
    Dashboard --> LabsBuild
    Dashboard --> Review
    Dashboard --> Versioning
    Dashboard --> Cost

    Tasks --> Gate
    Outline --> Gate
    Content --> Gate
    Assessments --> Gate
    LabsBuild --> Gate
    Review --> Gate
    Cost --> Gate

    Gate --> Build
    Build --> Preview
    Preview --> Approval

    Approval -- Changes required --> Dashboard
    Approval -- Approved --> PublishCourse

    PublishCourse --> CatalogueRelease
    PublishCourse --> LMSRelease
    PublishCourse --> SCORM
    PublishCourse --> GitHubRelease
    PublishCourse --> External

    CatalogueRelease --> Measure
    LMSRelease --> Measure
    SCORM --> Measure
    GitHubRelease --> Measure
    External --> Measure

    Measure --> Dashboard
```

---

## 3. Course production stage model

```mermaid
stateDiagram-v2
    [*] --> Intake

    Intake --> Discovery: Brief accepted
    Discovery --> Planning: Requirements approved
    Planning --> Design: Project plan baselined
    Design --> Development: Outline approved
    Development --> InternalReview: Draft complete
    InternalReview --> Rework: Corrections required
    Rework --> InternalReview

    InternalReview --> SMEReview: Editorial review passed
    SMEReview --> Rework: Technical changes required
    SMEReview --> QualityAssurance: SME approval

    QualityAssurance --> Rework: QA failed
    QualityAssurance --> Pilot: QA passed

    Pilot --> Rework: Pilot feedback
    Pilot --> PublicationApproval: Pilot accepted

    PublicationApproval --> Scheduled: Approved
    PublicationApproval --> Rework: Approval rejected

    Scheduled --> Published: Release deployed
    Published --> Maintenance
    Maintenance --> Revision: Change requested
    Revision --> Development

    Maintenance --> Retired: End of lifecycle
    Retired --> [*]
```

### Recommended stage gates

Each stage should require explicit evidence before progression:

| Stage gate | Required evidence |
|---|---|
| Intake approved | Brief, customer, owner, budget, intended outcome |
| Design approved | Audience, objectives, outline, assessment strategy |
| Development complete | Courseware, slides, labs, facilitator assets |
| QA passed | Technical, editorial, accessibility and brand checks |
| Publication approved | Rights, licensing, security and commercial approval |
| Release published | Version number, release notes, deployment evidence |
| Maintenance review | Usage analytics, feedback and revision decision |

---

## 4. Multi-tenant identity and entitlement workflow

```mermaid
sequenceDiagram
    actor User
    participant App as Publishing App
    participant Entra as Microsoft Entra ID
    participant Tenant as Tenant Resolver
    participant Entitlement as Subscription Service
    participant API as Publishing API
    participant Data as Tenant Data Store

    User->>App: Open publishing.skunkworksacademy.com
    App->>Entra: Request authentication
    Entra-->>User: Sign-in and MFA
    Entra-->>App: ID token and access token

    App->>Tenant: Resolve tenant membership
    Tenant-->>App: Available organisations and teams

    User->>App: Select organisation
    App->>Entitlement: Check module subscription

    alt Subscription active
        Entitlement-->>App: Publishing enabled
        App->>API: Request workspace access
        API->>Data: Apply tenant and role filters
        Data-->>API: Authorised project data
        API-->>App: Workspace and projects
    else Trial available
        Entitlement-->>App: Trial eligible
        App-->>User: Activate trial
    else No entitlement
        Entitlement-->>App: Access denied
        App-->>User: Purchase or request access
    end
```

### Important tenant rule

A user identity, Azure subscription, customer tenant, billing account and application workspace are **not the same boundary**. Keep them separately modelled:

```mermaid
flowchart LR
    Identity["User Identity<br/>Entra Object ID"]
    Organisation["Customer Organisation<br/>Application Tenant"]
    Workspace["Publishing Workspace"]
    Subscription["Commercial Subscription"]
    AzureSub["Azure Subscription"]
    ResourceGroup["Azure Resource Group"]
    DataBoundary["Customer Data Boundary"]

    Identity --> Organisation
    Organisation --> Workspace
    Organisation --> Subscription

    Workspace --> DataBoundary
    AzureSub --> ResourceGroup
    ResourceGroup --> DataBoundary

    Subscription -. authorises .-> Workspace
    Identity -. receives role in .-> Workspace
```

Your Azure sponsorship or partner credits remain attached to the qualifying Azure billing arrangement. They should not be represented as credits transferred into a customer tenant. A safer SaaS model is:

- Skunkworks hosts the SaaS platform in its controlled Azure subscription.
- Customers receive logical tenant isolation inside the application.
- Skunkworks meters usage and charges the customer commercially.
- Customer-owned Azure resources are provisioned separately only where required.
- Azure Lighthouse can provide delegated management, but it does not transfer your sponsorship credits to the customer.

---

## 5. Recommended GitHub organisation and repository hierarchy

```mermaid
flowchart TB
    Org["github.com/skunkworks-academy"]

    Org --> CommunityRepo[".github<br/>Organisation profile, templates and shared policies"]
    Org --> WebRepo["academy-web<br/>Public website and unified navigation"]
    Org --> PortalRepo["academy-portal<br/>Authenticated portal shell"]
    Org --> PublishRepo["academy-publishing<br/>Publishing frontend"]
    Org --> APIRepo["academy-platform-api<br/>Shared backend APIs"]
    Org --> IdentityRepo["academy-identity<br/>Entra integration and RBAC"]
    Org --> InfraRepo["academy-infrastructure<br/>Bicep / Terraform / Azure deployment"]
    Org --> DesignRepo["academy-design-system<br/>Navigation, tokens and components"]
    Org --> WorkflowRepo["academy-workflows<br/>Notifications and automation"]
    Org --> AnalyticsRepo["academy-analytics<br/>Telemetry and reporting"]
    Org --> DocsRepo["academy-docs<br/>Architecture and operational documentation"]
    Org --> TemplatesRepo["course-project-templates<br/>Reusable course project templates"]
    Org --> CourseRepos["course-*<br/>Individual course source repositories"]

    PublishRepo --> PublishWeb["Publishing UI"]
    PublishRepo --> ProjectUI["Project and team screens"]
    PublishRepo --> TimeUI["Time tracking"]
    PublishRepo --> ReleaseUI["Release management"]

    APIRepo --> TenantAPI["Tenant API"]
    APIRepo --> ProjectAPI["Project API"]
    APIRepo --> TimeAPI["Timesheet API"]
    APIRepo --> AssetAPI["Asset API"]
    APIRepo --> ReleaseAPI["Release API"]
    APIRepo --> BillingAPI["Entitlement API"]

    IdentityRepo --> EntraConfig["App registrations"]
    IdentityRepo --> Claims["Roles and claims"]
    IdentityRepo --> Consent["Tenant consent"]
    IdentityRepo --> Policies["Conditional Access guidance"]

    InfraRepo --> Dev["Development"]
    InfraRepo --> Test["Test"]
    InfraRepo --> Stage["Staging"]
    InfraRepo --> Prod["Production"]
```

### Suggested monorepo alternative

Since you are currently the sole developer, a monorepo is likely easier during the first implementation:

```text
skunkworks-academy-platform/
├── apps/
│   ├── web/                    # skunkworksacademy.com
│   ├── portal/                 # portal.skunkworksacademy.com
│   ├── publishing/             # publish.skunkworksacademy.com
│   ├── labs/                   # labs.skunkworksacademy.com
│   └── jobs/                   # jobs.skunkworksacademy.com
│
├── services/
│   ├── api/
│   ├── identity/
│   ├── entitlements/
│   ├── notifications/
│   ├── analytics/
│   └── publishing-engine/
│
├── packages/
│   ├── ui/
│   ├── navigation/
│   ├── auth/
│   ├── database/
│   ├── validation/
│   ├── telemetry/
│   └── configuration/
│
├── infrastructure/
│   ├── bicep/
│   ├── environments/
│   │   ├── development/
│   │   ├── staging/
│   │   └── production/
│   └── policies/
│
├── docs/
│   ├── architecture/
│   ├── identity/
│   ├── tenancy/
│   ├── security/
│   ├── publishing/
│   └── operations/
│
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   └── dependabot.yml
│
└── README.md
```

This aligns with the existing repository-oriented model, which already uses GitHub-backed course content, assessment assets, deployment validation scripts, and module-specific web pages. fileciteturn2file3 fileciteturn2file13

---

## 6. Deployment and release workflow

```mermaid
flowchart LR
    Developer["Developer"]
    Branch["Feature Branch"]
    PR["Pull Request"]
    CI["CI Validation"]
    Security["Security Scanning"]
    Preview["Preview Deployment"]
    Review["Manual Review"]
    Main["Merge to Main"]
    Stage["Staging Deployment"]
    Tests["Integration and E2E Tests"]
    Approval["Production Approval"]
    Tag["Version Tag"]
    Release["GitHub Release"]
    Production["Azure Production"]
    Monitor["Application Insights"]
    Rollback["Rollback"]

    Developer --> Branch
    Branch --> PR
    PR --> CI
    CI --> Security
    Security --> Preview
    Preview --> Review

    Review -- Changes --> Branch
    Review -- Approved --> Main

    Main --> Stage
    Stage --> Tests

    Tests -- Failed --> Branch
    Tests -- Passed --> Approval

    Approval --> Tag
    Tag --> Release
    Release --> Production
    Production --> Monitor

    Monitor -- Healthy --> Production
    Monitor -- Critical failure --> Rollback
    Rollback --> Production
```

## Recommended first implementation boundary

Do **not** build every module simultaneously. The first vertical slice should be:

```mermaid
flowchart LR
    Landing["Publishing Landing Page"]
    Login["Entra Login"]
    Tenant["Tenant Selection"]
    Team["Team Selection"]
    Project["Create Project"]
    Board["Stage Board"]
    Time["Log Time"]
    Files["Upload Assets"]
    Release["Create Release Record"]

    Landing --> Login --> Tenant --> Team --> Project
    Project --> Board
    Project --> Time
    Project --> Files
    Board --> Release
    Files --> Release
```

That first slice proves the critical architecture:

1. Multi-tenant Entra authentication.
2. Subscription entitlement.
3. Team and role resolution.
4. Project isolation.
5. File and metadata storage.
6. Workflow state management.
7. Auditable release creation.

Everything else—AI assistance, SCORM generation, advanced analytics, marketplace billing and external LMS publishing—can be added after that foundation is stable.
