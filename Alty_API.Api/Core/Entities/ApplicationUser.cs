﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;
public class ApplicationUser : IdentityUser
{
	[Required,StringLength(50)]
	public string FirstName { get; set; } = string.Empty;
	[Required,StringLength(50)]
	public string LastName { get; set; } = string.Empty;
	[StringLength(100)]
	public string? ProfileImageUrl { get; set; }

}
