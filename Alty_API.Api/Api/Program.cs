using Api;
using Api.Helpers;
using Api.Services;
using Core;
using Core.Entities;
using Core.Interfaces;
using Core.IServices;
using DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add DB
var db = builder.Configuration.GetConnectionString("DefCon");
builder.Services.AddDbContext<AppDbContext>(op => op.UseSqlServer(db, m => m.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));
// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
builder.Services.Configure<IdentityOptions>(options =>
{
  options.SignIn.RequireConfirmedEmail = true;


	options.Password.RequireDigit = false;
	options.Password.RequireLowercase = false;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireUppercase = false;
	options.Password.RequiredLength = 4;
	options.Password.RequiredUniqueChars = 0;
});


builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
builder.Services.AddAuthentication(op =>
{
  op.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  op.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(op =>
{
  op.RequireHttpsMetadata = false;
  op.SaveToken = false;
  op.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"] ?? "No Key")),
    ValidateIssuer = true,
    ValidIssuer = builder.Configuration["JWT:Issuer"],
    ValidateAudience = true,
    ValidAudience = builder.Configuration["JWT:Audience"],
    ValidateLifetime = true,
  };
});

builder.Services.AddScoped<IAuth, Auth>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IMailService, MailService>();

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection(nameof(MailSettings)));


builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngular",
			policy =>
			{
				policy.WithOrigins("http://localhost:4200")
								.AllowAnyHeader()
								.AllowAnyMethod();
			});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(
				Path.Combine(builder.Environment.WebRootPath, "uploads")),
	RequestPath = "/uploads"
});
app.MapControllers();

app.Run();