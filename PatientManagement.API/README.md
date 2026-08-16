# Patient Management System — Backend API

A RESTful API for managing patient records, built with ASP.NET Core.
Implements the Repository Pattern for data access, uses Entity Framework
Core with SQLite for persistence, and secures endpoints with JWT
Bearer authentication.

## Tech Stack

- **ASP.NET Core Web API** (.NET 10)
- **Entity Framework Core** — ORM
- **SQLite** — file-based relational database
- **JWT Bearer Authentication**
- **BCrypt.Net** — password hashing
- **Repository Pattern** — separates controllers from data access logic

## Architecture

```
Controller → Repository (Interface + Implementation) → DbContext → SQLite
```

Controllers depend on repository **interfaces**, not concrete classes,
so data access logic stays isolated and swappable. Dependency Injection
(configured in `Program.cs`) resolves the concrete implementations at
runtime.

## Prerequisites

- .NET 10 SDK
- `dotnet-ef` global tool (`dotnet tool install --global dotnet-ef`)

## Getting Started

```bash
dotnet restore
dotnet ef database update
dotnet run
```

The API will start on `http://localhost:5283` (check your terminal
output for the exact port — it's also defined in
`Properties/launchSettings.json`).

`dotnet ef database update` creates `hospital.db` in the project root
from the existing migrations, with the required `Patients` and `Users`
tables.

### Default Account

On first run, if the `Users` table is empty, the app seeds one account
for testing:

```
Username: admin
Password: admin123
```

## Project Structure

```
Controllers/
├── AuthController.cs      # POST /api/auth/login
└── PatientsController.cs  # Patient CRUD endpoints ([Authorize] protected)

Models/
├── Patient.cs
└── User.cs

DTOs/
└── LoginDto.cs             # Shape of the login request body

Data/
└── AppDbContext.cs         # EF Core database context

Repositories/
├── IPatientRepository.cs   # Contract for patient data access
└── PatientRepository.cs    # EF Core implementation

Services/
└── TokenService.cs         # Generates signed JWT tokens

Migrations/                 # EF Core migration history
```

## API Endpoints

| Method | Endpoint              | Auth required | Description             |
|--------|------------------------|:--------------:|--------------------------|
| POST   | `/api/auth/login`      | No             | Authenticate, returns a JWT |
| GET    | `/api/patients`        | Yes            | List all patients        |
| GET    | `/api/patients/{id}`   | Yes            | Get a single patient      |
| POST   | `/api/patients`        | Yes            | Create a new patient      |
| PUT    | `/api/patients/{id}`   | Yes            | Update an existing patient |
| DELETE | `/api/patients/{id}`   | Yes            | Delete a patient          |

Protected endpoints require an `Authorization: Bearer <token>` header,
using the token returned from the login endpoint.

## Configuration

Connection string and JWT settings live in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=hospital.db"
  },
  "Jwt": {
    "Key": "...",
    "Issuer": "PatientManagementAPI",
    "Audience": "PatientManagementClient"
  }
}
```

> In a production project, the JWT signing key would be kept out of
> source control (e.g. via environment variables or a secrets manager)
> rather than committed in `appsettings.json`.

## CORS

The API allows requests from `http://localhost:5173` (the default Vite
dev server port used by the companion React frontend). Update the
allowed origin in `Program.cs` if the frontend runs elsewhere.

## Database Migrations

To add a new migration after changing a model:

```bash
dotnet ef migrations add <MigrationName>
dotnet ef database update
```
