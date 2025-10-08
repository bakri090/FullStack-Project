using Core;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace DataAccess;
public class UserRepository : BaseRepository<ApplicationUser>,IUserRepository
{
	private readonly AppDbContext _appDb;
	private readonly UserManager<ApplicationUser> _userManager;

	public UserRepository(AppDbContext appDb, UserManager<ApplicationUser> userManager) : base(appDb,userManager)
	{
		_userManager = userManager;
	}
}
