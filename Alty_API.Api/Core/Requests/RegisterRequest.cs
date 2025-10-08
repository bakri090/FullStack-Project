using System.ComponentModel.DataAnnotations;

namespace Core.Requests;
public class RegisterRequest
{
	[Required,StringLength(100)]
	 public string FirstName {  get; set; } = string.Empty;
	[Required,StringLength(100)]
	 public string LastName {  get; set; } = string.Empty;
	[Required,StringLength(250),EmailAddress]
	public string Email {  get; set; } = string.Empty;
	[Required,StringLength(50)]
	public string UserName {  get; set; } = string.Empty;
	[Required,StringLength(50)]
	public string Password { get; set; } = string.Empty;
}
