class HostModel {
  String fullname;
  String email;

  HostModel({this.fullname, this.email});

  HostModel.fromJson(Map<String, dynamic> json) {
    fullname = json['fullname'];
    email = json['email'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['fullname'] = this.fullname;
    data['email'] = this.email;
    return data;
  }
}