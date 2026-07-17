# Skunkworks Academy Publish — MVP Screen Map

## Purpose

This static MVP translates the publishing architecture into a navigable front-end prototype for `publish.skunkworksacademy.com`. It demonstrates information architecture, responsive layouts, application states and core course-production workflows.

## Application states

| State | Route | Purpose |
|---|---|---|
| Product landing | `#home` | Explains the module and routes authorised users to sign-in. |
| Authentication | `#signin` | Microsoft Entra ID sign-in interface, tenant and MFA messaging. |
| Dashboard | `#app/dashboard` | Portfolio metrics, project health and recent activity. |
| Projects | `#app/projects` | Course and documentation production workspaces. |
| Workflow board | `#app/workflow` | Stage-based production tasks and owners. |
| Content authoring | `#app/authoring` | Outline, editable lesson canvas and metadata inspector. |
| Asset library | `#app/assets` | Versioned source files, media and release assets. |
| Reviews and QA | `#app/reviews` | Technical, editorial, accessibility and publication review states. |
| Releases | `#app/releases` | Readiness gate, package build, staging, approval and distribution. |
| Analytics | `#app/analytics` | Throughput, cycle time, rework and release performance. |
| Settings | `#app/settings` | Workspace profile, tenant mode and identity defaults. |

## Authentication boundary

The static site intentionally does not simulate a real access token or claim set. The Microsoft button is a UI boundary only. Production implementation must use the Academy identity service for:

1. Microsoft Entra ID OpenID Connect authentication.
2. Multifactor authentication and Conditional Access enforcement.
3. Organisation and workspace resolution.
4. Role and entitlement checks.
5. Server-side session validation.
6. Tenant-scoped API and storage access.
7. Audit logging for privileged publishing actions.

## Recommended production roles

- Workspace Owner
- Project Manager
- Instructional Designer
- Subject-Matter Expert
- Content Author
- Media Producer
- Technical Reviewer
- Editorial Reviewer
- Quality Assurance
- Release Publisher

## Next implementation layer

The next engineering increment should replace static demonstration data with authenticated APIs for projects, tasks, assets, reviews, releases and analytics. The front end should then be migrated to the shared Academy application shell and design-system components while preserving the routes and interaction model demonstrated here.
