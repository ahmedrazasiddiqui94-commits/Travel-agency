using Microsoft.AspNetCore.Mvc;
using MeridianTravel.Models;

namespace MeridianTravel.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var model = BuildHomeViewModel();
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SubmitFlightInquiry([Bind(Prefix = "FlightInquiry")] FlightInquiryModel inquiry)
    {
        var vm = BuildHomeViewModel();
        vm.FlightInquiry = inquiry;

        if (string.Equals(inquiry.Origin?.Trim(), inquiry.Destination?.Trim(), StringComparison.OrdinalIgnoreCase))
        {
            ModelState.AddModelError("FlightInquiry.Destination", "Origin and destination must be different.");
        }

        if (inquiry.TripType == "Round-Trip" && inquiry.ReturnDate.HasValue && inquiry.ReturnDate.Value < inquiry.DepartureDate)
        {
            ModelState.AddModelError("FlightInquiry.ReturnDate", "Return date must be on or after the departure date.");
        }

        if (!ModelState.IsValid)
        {
            return View("Index", vm);
        }

        _logger.LogInformation(
            "Flight desk inquiry received: {TripType} {Origin} -> {Destination} ({CabinClass}, {Passengers} pax)",
            inquiry.TripType, inquiry.Origin, inquiry.Destination, inquiry.CabinClass, inquiry.Passengers);

        vm.FlightStatusMessage =
            $"Flight desk request prepared for {inquiry.Origin} to {inquiry.Destination} ({inquiry.CabinClass}, {inquiry.Passengers} traveler(s)). No ticket has been charged—our aviation desk will respond with routing options.";

        return View("Index", vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SubmitTripInquiry([Bind(Prefix = "TripInquiry")] CustomTripInquiryModel inquiry)
    {
        var vm = BuildHomeViewModel();
        vm.TripInquiry = inquiry;

        if (!ModelState.IsValid)
        {
            return View("Index", vm);
        }

        _logger.LogInformation(
            "Custom trip inquiry received from {FullName} ({Email}) for {Destination}",
            inquiry.FullName, inquiry.Email, inquiry.Destination);

        vm.TripStatusMessage =
            $"Thank you, {inquiry.FullName}. Your itinerary brief for {inquiry.Destination} ({inquiry.TravelWindow}) has been logged. Our Zurich/London desk will reply to {inquiry.Email} within 24 hours.";

        return View("Index", vm);
    }

    private static HomeViewModel BuildHomeViewModel()
    {
        return new HomeViewModel
        {
            Destinations = new List<DestinationItem>
            {
                new()
                {
                    Id = "kyoto-ryokan",
                    Name = "Kyoto Sanctuary",
                    Country = "Japan",
                    Region = "East Asia",
                    Duration = "8 Nights",
                    StartingRate = "From $9,400",
                    Season = "Mar – May · Oct – Nov",
                    Summary = "Private architectural ryokans, after-hours temple gardens, and kaiseki dining curated with local historians.",
                    ImagePath = "/images/dest_kyoto_ryokan.jpg",
                    IsWideCard = true
                },
                new()
                {
                    Id = "patagonia-peaks",
                    Name = "Torres del Paine",
                    Country = "Chile",
                    Region = "South America",
                    Duration = "7 Nights",
                    StartingRate = "From $11,200",
                    Season = "Nov – Mar",
                    Summary = "Helicopter-assisted glacier traverses and minimalist timber lodges overlooking granite spires.",
                    ImagePath = "/images/dest_patagonia_peaks.jpg",
                    IsWideCard = false
                },
                new()
                {
                    Id = "iceland-black-sand",
                    Name = "Reynisfjara & Highlands",
                    Country = "Iceland",
                    Region = "North Atlantic",
                    Duration = "6 Nights",
                    StartingRate = "From $8,800",
                    Season = "Jun – Sep · Jan – Mar",
                    Summary = "Super-jeep highland expeditions, private geothermal lagoons, and volcanic basalt coastlines.",
                    ImagePath = "/images/dest_iceland_black_sand.jpg",
                    IsWideCard = false
                },
                new()
                {
                    Id = "marrakech-riad",
                    Name = "Marrakech & Atlas",
                    Country = "Morocco",
                    Region = "North Africa",
                    Duration = "5 Nights",
                    StartingRate = "From $6,900",
                    Season = "Mar – May · Sep – Nov",
                    Summary = "Exclusive-use travertine riads, private desert astronomy camps, and Atlas Mountain helicopter lunches.",
                    ImagePath = "/images/dest_marrakech_riad.jpg",
                    IsWideCard = true
                }
            },
            Services = new List<ServiceItem>
            {
                new()
                {
                    Number = "01.",
                    Title = "Private Aviation & Commercial Routing",
                    Description = "End-to-end flight architecture across commercial first-class cabins, empty-leg charters, and multi-continent private aviation.",
                    Deliverable = "Dedicated 24/7 flight desk & tarmac transfer coordination"
                },
                new()
                {
                    Number = "02.",
                    Title = "Architectural Stays & Private Estates",
                    Description = "Direct access to off-market villas, modernist sanctuaries, and design-led boutique hotels rarely listed on public platforms.",
                    Deliverable = "Pre-inspected properties with private household staff"
                },
                new()
                {
                    Number = "03.",
                    Title = "Expedition & Cultural Access",
                    Description = "After-hours museum openings, private marine charters, and field specialists who open doors beyond standard tourism.",
                    Deliverable = "Bespoke daily dossier with local fixer support"
                },
                new()
                {
                    Number = "04.",
                    Title = "Executive Retreats & Sabbaticals",
                    Description = "Long-horizon family sabbaticals and leadership offsites engineered with seamless logistics, security, and connectivity.",
                    Deliverable = "Single-point itinerary director from briefing to return"
                }
            }
        };
    }
}
