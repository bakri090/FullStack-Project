namespace Core.Entities;
public class UploadFile
{
	public Guid Id { get; set; } = Guid.NewGuid();
	public string FileName { get; set; } = string.Empty;
	public string ContentType { get; set; } = string.Empty;
	public string FileExtension { get; set; } =string.Empty;
}
