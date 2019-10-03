import 'package:raize/models/date_time_model.dart';

class EventDurationModel {
  DateTimeModel start,end;

  EventDurationModel({this.start, this.end});

  EventDurationModel.fromJson(Map<String, dynamic> json) {
    start = json['start'] != null ? new DateTimeModel.fromJson(json['start']) : null;
    end = json['end'] != null ? new DateTimeModel.fromJson(json['end']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.start != null) {
      data['start'] = this.start.toJson();
    }
    if (this.end != null) {
      data['end'] = this.end.toJson();
    }
    return data;
  }
}
