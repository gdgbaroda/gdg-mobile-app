class EventVenueModel {
  int id;
  String name;
  double lat;
  double lon;
  bool repinned;
  String address1;
  String address2;
  String city;
  String country;
  String localizedCountryName;

  EventVenueModel(
      {this.id,
        this.name,
        this.lat,
        this.lon,
        this.repinned,
        this.address1,
        this.address2,
        this.city,
        this.country,
        this.localizedCountryName});

  EventVenueModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    lat = json['lat'];
    lon = json['lon'];
    repinned = json['repinned'];
    address1 = json['address_1'];
    address2 = json['address_2'];
    city = json['city'];
    country = json['country'];
    localizedCountryName = json['localized_country_name'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['name'] = this.name;
    data['lat'] = this.lat;
    data['lon'] = this.lon;
    data['repinned'] = this.repinned;
    data['address_1'] = this.address1;
    data['address_2'] = this.address2;
    data['city'] = this.city;
    data['country'] = this.country;
    data['localized_country_name'] = this.localizedCountryName;
    return data;
  }
}
