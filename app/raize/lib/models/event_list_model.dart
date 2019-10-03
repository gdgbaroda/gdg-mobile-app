import 'event_list_item_model.dart';

class EventListModel {
  List<EventListItemModel> groups;
  EventListModel({
    this.groups
});
  EventListModel.fromJson(Map<String, dynamic> json) {
    if (json['groups'] != null) {
      groups = new List<EventListItemModel>();
      json['groups'].forEach((v) {
        groups.add(new EventListItemModel.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.groups != null) {
      data['groups'] = this.groups.map((v) => v.toJson()).toList();
    }
    return data;
  }
}