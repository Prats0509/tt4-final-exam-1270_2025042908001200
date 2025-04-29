# ---------- base runtime ----------
    FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
    WORKDIR /app
    
    # make Kestrel bind to port 5086
    ENV ASPNETCORE_URLS=http://0.0.0.0:5086
    EXPOSE 5086
    
    # ---------- build stage ----------
    FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
    WORKDIR /src
    COPY . .
    RUN dotnet restore
    RUN dotnet publish -c Release -o /app/publish
    
    # ---------- final image ----------
    FROM base AS final
    WORKDIR /app
    COPY --from=build /app/publish .
    ENTRYPOINT ["dotnet","backend.dll"]
    