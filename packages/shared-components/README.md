# Shared components

This package is the boundary for reusable, client-neutral components and data contracts shared by multiple Nexura Labs apps.

The current `data/business-data.example.json` file is the reusable demo-data model. Do not place client names, client contact details, client imagery, or app-specific styling here.

Avoid extracting a component from a single app prematurely. A shared component should have at least two real consumers and a stable, documented interface.
