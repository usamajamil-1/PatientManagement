using Microsoft.EntityFrameworkCore;
using PatientManagement.API.Models;

namespace PatientManagement.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<User> Users { get; set; }
    }
}