using Domain.Entities;
using Domain.Entities.AboutUs;
using Domain.Entities.Achievemnets;
using Domain.Entities.Catalogues;
using Domain.Entities.ContactUs;
using Domain.Entities.Form;
using Domain.Entities.Gallery;
using Domain.Entities.ProductOrders;
using Domain.Entities.Sections;
using Domain.Entities.Services;
using Domain.Entities.Stats;
using Domain.Entities.Teams;
using Domain.Entities.TopProducts;
using Domain.Entities.VideoSection.VideoHeading;
using Domain.Entities.VideoSection.Videos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
    #region Tables

    DbSet<User> User { get; }
    
    DbSet<Hero> Hero { get; }
    DbSet<Location> Location { get; }
    DbSet<ContactUs> ContactUs { get; }
    DbSet<AboutUsImage> AboutUsImage { get; }
    DbSet<AboutUs> AboutUs { get; }
    DbSet<Service> Service { get; }
    DbSet<TopProducts> TopProducts { get; }
    DbSet<VideoHeading> VideoHeading { get; }
    DbSet<Videos> Videos { get; }
    DbSet<Stats> Stats { get; }
    DbSet<Gallery> Gallery { get; }
    DbSet<GalleryImages> GalleryImages { get; }
    DbSet<Team> Team { get; }
    DbSet<Achievements> Achievements { get; }
    DbSet<Form> Form { get; }
    DbSet<Product> Product { get; }
    DbSet<OrderItem> OrderItem { get; }
    DbSet<Customer> Customer { get; }
    DbSet<Catalogue> Catalogue { get; }


    
    
    #endregion


    #region Methods

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion


    DatabaseFacade Database { get; }
}