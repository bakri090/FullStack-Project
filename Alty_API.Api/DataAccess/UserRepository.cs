using Core;
using Core.Entities;
using Core.Requests;
using Core.Responses;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DataAccess;
public class UserRepository : BaseRepository<ApplicationUser>,IUserRepository
{
	public UserRepository(AppDbContext appDb, UserManager<ApplicationUser> userManager,IWebHostEnvironment webHost) : base(appDb,userManager)
	{
		_userManager = userManager;
		_filePath = $"{webHost.WebRootPath}/uploads";
		_appDb = appDb;
	}
	private readonly AppDbContext? _appDb;
	private readonly UserManager<ApplicationUser> _userManager;
	private readonly IWebHostEnvironment _webHost;
	private readonly string _filePath;
	public async Task<UserProfileResponse?> GetProfile(string id)
	{
		if (id == null) return null;
		var user = await _userManager.FindByIdAsync(id);
		if (user == null) return null;

		var dto = new UserProfileResponse
		{
			Id = user.Id,
			FirstName = user.FirstName,
			LastName = user.LastName,
			Email = user.Email,
			ProfileImageUrl = user.ProfileImageUrl,
		};


		return dto;
	}
	public async Task<Guid?> UploadProfileImage(string userId, IFormFile file)
	{
		if (userId == null) return null;
		var user = await _userManager.FindByIdAsync(userId);
		if (user == null) return null;

		var upload = new UploadFile
		{
			FileName = file.FileName,
			ContentType = file.ContentType,
			FileExtension = Path.GetExtension(file.FileName)
		};
		var path = Path.Combine(_filePath, file.FileName);
		using var stream = File.Create(path);
		await file.CopyToAsync(stream);


		// Fixes for CS0029, CS8602, CS1026
		user.ProfileImageUrl = $"uploads/{upload.FileName}";
		var existingFile = _appDb?.UploadFiles.FirstOrDefault(f => f.FileName == upload.FileName && f.FileExtension == upload.FileExtension);
		if (existingFile == null)
		{
			await _appDb!.UploadFiles.AddAsync(upload);
		}
		return upload.Id;
	}
	public async Task<bool> UpdateProfile(string id, UserProfileRequest model)
	{
		var user = await _userManager.FindByIdAsync(id);
		if (user is null)
			return false;

		user.FirstName = model.FirstName ?? "first name is not";
		user.LastName = model.LastName ?? "last name is not";
		return true;
	}
}

