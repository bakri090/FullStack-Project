using Core;
using Core.Entities;
using Core.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DataAccess;
public class BaseRepository<T> : IBaseRepository<T> where T : class
{
	private readonly AppDbContext _db;
	private readonly UserManager<ApplicationUser> _userManager;

	public BaseRepository(AppDbContext db, UserManager<ApplicationUser> userManager)
	{
		_db = db;
		_userManager = userManager;
	}

	public async Task<bool> Delete(string id)
	{
		if (await _userManager.FindByIdAsync(id) is not { } user)
			return false;

		_db.Users.Remove(user);
		return true;
	}

	public async Task<T?> Edit(string id, EditUser entity)
	{
		if (entity is null) return null;

		if (await _userManager.FindByIdAsync(id) is not { } user)
			return null;

		user.UserName = entity.UserName;
		user.PhoneNumber = entity.PhoneNumber;
		user.FirstName = entity.FirstName;
		user.LastName = entity.LastName;

		// Save changes to the user
		var result = await _userManager.UpdateAsync(user);
		if (!result.Succeeded)
			return null;

		// If T is ApplicationUser, return the updated user cast as T
		if (user is T tUser)
			return tUser;

		// Otherwise, return null as we cannot convert user to T
		return null;
	}

	public async Task<IEnumerable<T>> GetAll()
	{
		return await _db.Set<T>().ToListAsync();
	}

	public async Task<T?> GetById(string id)
	{
		return await _db.Set<T>().FindAsync(id);
	}
	
}
