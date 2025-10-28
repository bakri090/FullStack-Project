namespace Core.Responses;
public class UserProfileResponse
{
	public string Id { get; set; } = string.Empty;
	public string? FirstName { get; set; }
	public string? LastName { get; set; }
	public string? Email { get; set; }
	public string? ProfileImageUrl { get; set; }
}