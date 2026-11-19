using System.ComponentModel.DataAnnotations;

namespace MeridianTravel.Models;

public class DestinationItem
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string StartingRate { get; set; } = string.Empty;
    public string Season { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ImagePath { get; set; } = string.Empty;
    public bool IsWideCard { get; set; }
}

public class ServiceItem
{
    public string Number { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Deliverable { get; set; } = string.Empty;
}

public class FlightInquiryModel
{
    [Required(ErrorMessage = "Trip type is required.")]
    public string TripType { get; set; } = "Round-Trip";

    [Required(ErrorMessage = "Please enter an origin city or airport.")]
    [StringLength(100)]
    public string Origin { get; set; } = "LHR — London Heathrow";

    [Required(ErrorMessage = "Please enter a destination city or airport.")]
    [StringLength(100)]
    public string Destination { get; set; } = "HND — Tokyo Haneda";

    [Required(ErrorMessage = "Please select a departure date.")]
    [DataType(DataType.Date)]
    public DateTime DepartureDate { get; set; } = DateTime.Today.AddDays(30);

    [DataType(DataType.Date)]
    public DateTime? ReturnDate { get; set; } = DateTime.Today.AddDays(39);

    [Range(1, 16, ErrorMessage = "Passengers must be between 1 and 16.")]
    public int Passengers { get; set; } = 2;

    [Required]
    public string CabinClass { get; set; } = "Business";
}

public class CustomTripInquiryModel
{
    [Required(ErrorMessage = "Please enter your full name.")]
    [StringLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Please enter a valid email address.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    public string Email { get; set; } = string.Empty;

    [Phone]
    public string? Phone { get; set; }

    [Required(ErrorMessage = "Please specify a destination or region.")]
    [StringLength(150)]
    public string Destination { get; set; } = "Kyoto Sanctuary, Japan";

    [StringLength(80)]
    public string TravelWindow { get; set; } = "Spring 2027";

    [StringLength(80)]
    public string Budget { get; set; } = "$15,000 – $30,000";

    [StringLength(1500)]
    public string? Notes { get; set; }
}

public class HomeViewModel
{
    public List<DestinationItem> Destinations { get; set; } = new();
    public List<ServiceItem> Services { get; set; } = new();
    public FlightInquiryModel FlightInquiry { get; set; } = new();
    public CustomTripInquiryModel TripInquiry { get; set; } = new();
    public string? FlightStatusMessage { get; set; }
    public string? TripStatusMessage { get; set; }
}
