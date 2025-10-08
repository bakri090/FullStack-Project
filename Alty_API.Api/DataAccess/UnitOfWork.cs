using Core;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess;
public class UnitOfWork : IUnitOfWork
{
	private readonly AppDbContext _dbContext;

	public IUserRepository Users { get; private set; }
	private readonly UserManager<ApplicationUser> _userManager;
	public UnitOfWork(AppDbContext dbContext, UserManager<ApplicationUser> userManager)
	{
		_dbContext = dbContext;
		_userManager = userManager;
		Users = new UserRepository(dbContext,userManager);
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
