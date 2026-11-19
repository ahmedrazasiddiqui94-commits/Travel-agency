# Meridian Travel Architecture — Visual Studio 2022 Solution (.NET 8 ASP.NET Core MVC)

A production-quality experimental minimalist travel agency web application built specifically for **Microsoft Visual Studio 2022** using **ASP.NET Core MVC (.NET 8)**, **C#**, **Razor Views**, **Bootstrap 5**, **GSAP + ScrollTrigger**, **Three.js**, and **Lucide Icons**.

## Step-by-Step Instructions to Run in Visual Studio 2022

1. **Prerequisites**
   - Install **Microsoft Visual Studio 2022** (v17.8 or later) with the **ASP.NET and web development** workload.
   - Ensure the **.NET 8.0 SDK** is installed.

2. **Open the Solution**
   - Launch Visual Studio 2022.
   - Click **Open a project or solution**.
   - Navigate to `MeridianTravel.VS2022/MeridianTravel.sln` and open it.

3. **Restore & Build**
   - Visual Studio will automatically restore NuGet packages.
   - Press `Ctrl + Shift + B` to build the solution.

4. **Run the Application**
   - Press `F5` (with debugging) or `Ctrl + F5` (without debugging) to launch the site in your browser.
   - The app will open at `https://localhost:7xxx` or `http://localhost:5xxx`.

## Project Structure

- `Controllers/HomeController.cs` — Handles `GET /`, `POST /Home/SubmitFlightInquiry`, and `POST /Home/SubmitTripInquiry` with server-side `ModelState` validation and Anti-Forgery tokens.
- `Models/TravelModels.cs` — Strongly-typed C# models with `DataAnnotations` validation.
- `Views/Shared/_Layout.cshtml`, `_Navbar.cshtml`, `_Footer.cshtml` — Master layout and reusable partial views.
- `Views/Home/Index.cshtml` — Editorial Hero, Flight Desk Inquiry, Dark Bento Grid, Services, Proof Metrics, and Custom Trip Inquiry.
- `wwwroot/css/site.css` — Custom Warm Ivory (`#F5F2EA`), Deep Black (`#111111`), and Electric Lime (`#C7F000`) design system.
- `wwwroot/js/site.js` — Vanilla JS powering GSAP entrance/ScrollTrigger animations, magnetic buttons, destination selection, and the Three.js orbital element.
- `wwwroot/images/` — Local high-resolution architectural travel photography.
