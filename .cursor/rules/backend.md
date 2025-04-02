# Backend Development Rules
description: Rules specific to NestJS backend development
files: ["apps/api/**/*.ts"]
references: ["@file:.cursor/rules/general.md"]

## NestJS Module Structure

Each module should follow this structure:

```
module-name/
├── dto/
│   ├── create-resource.dto.ts
│   └── update-resource.dto.ts
├── entities/
│   └── resource.entity.ts
├── resource.controller.ts    # API endpoints
├── resource.service.ts       # Business logic
└── resource.module.ts        # Module definition
```

## Controller Patterns

Controllers should follow these patterns:

```typescript
/**
 * ResourceController
 * Controller for resource-related endpoints
 */
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  /**
   * Create a new resource
   * @param {CreateResourceDto} createResourceDto - Resource creation data
   * @returns {Promise<Resource>} Created resource
   */
  @Post()
  @ApiOperation({ summary: 'Create resource' })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() createResourceDto: CreateResourceDto): Promise<Resource> {
    return this.resourceService.create(createResourceDto);
  }
}
```

## Service Patterns

Services should encapsulate all business logic:

```typescript
/**
 * ResourceService
 * Service for resource-related operations
 */
@Injectable()
export class ResourceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new resource
   * @param {CreateResourceDto} data - Resource creation data
   * @returns {Promise<Resource>} Created resource
   */
  async create(data: CreateResourceDto): Promise<Resource> {
    return this.prisma.resource.create({ data });
  }
}
```

## Exception Handling

- Use NestJS built-in exception filters (`NotFoundException`, etc.)
- Create custom exception filters for specific error cases
- Return consistent error responses using ApiResponse format
- Log all errors at appropriate levels
- Include contextual information in error messages

## Validation

- Use class-validator decorators for DTO validation
- Create custom validators for complex validation rules
- Leverage shared DTOs from the shared package
- Implement validation pipes globally
- Handle validation errors consistently

## Database Access

- Use Prisma as the primary data access layer
- Create reusable query fragments for complex queries
- Implement transactions for multi-step operations
- Validate data before sending to database
- Create database indexes for frequently queried fields 