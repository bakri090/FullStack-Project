using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Requests;
public class UserProfileRequest
{
	[Required]
	public required string FirstName { get; set; }
	[Required]
	public required string LastName { get; set; }
}
