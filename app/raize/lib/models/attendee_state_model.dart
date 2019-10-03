class AttendeeStateModel {
  String value;
  String updatedOn;

  AttendeeStateModel({this.value, this.updatedOn});

  AttendeeStateModel.fromJson(Map<String, dynamic> json) {
    value = json['value'];
    updatedOn = json['updatedOn'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['value'] = this.value;
    data['updatedOn'] = this.updatedOn;
    return data;
  }
}