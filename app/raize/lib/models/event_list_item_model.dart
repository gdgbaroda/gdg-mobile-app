import 'event_model.dart';
import 'location.dart';

class EventListItemModel {
  int id;
  String title;
  String source;
  String location;
  List<EventModel> events;
  String thumbnail;

  EventListItemModel(
      {this.id,
        this.title,
        this.source,
        this.location,
        this.events,
        this.thumbnail});

  EventListItemModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    source = json['source'];
    location = json['location'];
    if (json['events'] != null) {
      events = new List<EventModel>();
      json['events'].forEach((v) {
        events.add(new EventModel.fromJson(v));
      });
    }
    thumbnail = json['thumbnail'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['title'] = this.title;
    data['source'] = this.source;
      data['location'] = this.location;

    if (this.events != null) {
      data['events'] = this.events.map((v) => v.toJson()).toList();
    }
    data['thumbnail'] = this.thumbnail;
    return data;
  }

}
