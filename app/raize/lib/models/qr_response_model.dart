import 'package:raize/models/attendee_state_model.dart';

class QRResponseModel {
  bool status;
  String message = "";

  QRResponseModel({this.status, this.message});



  QRResponseModel.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    if (json['message'] != null) {
      message = json['message'];

    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['status'] = this.status;
    if (data['message'] != null) {
      data['message'] = this.message;
    }
    return data;
  }
}