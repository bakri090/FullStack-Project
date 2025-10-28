using Core;
using Core.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;

namespace DataAccess;
public class UnitOfWork : IUnitOfWork
{
	private readonly AppDbContext _dbContext;
	private readonly UserManager<ApplicationUser> _userManager;
	private readonly IWebHostEnvironment _webHost;

	public IUserRepository Users { get; private set; }

	public UnitOfWork(AppDbContext dbContext, UserManager<ApplicationUser> userManager,IWebHostEnvironment webHost)
	{
		_dbContext = dbContext;
		_userManager = userManager;
		_webHost = webHost;
		Users = new UserRepository(dbContext,userManager,webHost);
	}
	public int Complete()
	{
		return _dbContext.SaveChanges();
	}

	public void Dispose()
	{
		_dbContext.Dispose();
	}
}
