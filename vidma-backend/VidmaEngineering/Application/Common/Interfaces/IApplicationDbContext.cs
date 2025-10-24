using Domain.Entities;
using Domain.Entities.Sections;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
    #region Tables

    DbSet<User> User { get; }
    
    DbSet<Hero> Hero { get; }


    
    
    #endregion


    #region Methods

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion


    DatabaseFacade Database { get; }
}