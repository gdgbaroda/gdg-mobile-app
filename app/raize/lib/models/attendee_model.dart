import 'package:raize/models/attendee_state_model.dart';

class AttendeeModel {
  String fullname;
  String email;
  List<AttendeeStateModel> state;

  AttendeeModel({this.fullname, this.email, this.state});

  AttendeeModel.fromJson(Map<String, dynamic> json) {
    fullname = json['fullname'];
    email = json['email'];
    if (json['state'] != null) {
      state = new List<AttendeeStateModel>();
      json['state'].forEach((v) {
        state.add(new AttendeeStateModel.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['fullname'] = this.fullname;
    data['email'] = this.email;
    if (this.state != null) {
      data['state'] = this.state.map((v) => v.toJson()).toList();
    }
    return data;
  }
}