import 'package:flutter/material.dart';
import 'package:raize/detail_widget.dart';
import 'package:raize/models/event_model.dart';

class EventDetailsWidget extends StatefulWidget {
  static String tag = 'eventList-screen';

  final EventModel eventModel;
  final String groupName;

  EventDetailsWidget({@required  this.eventModel, this.groupName}) ;

  @override
  _EventState createState() => _EventState(eventModel,groupName);
}

class _EventState extends State<EventDetailsWidget> {
  EventModel eventModel;
  String groupName;
  _EventState(EventModel eventModel,String groupName){
    this.eventModel = eventModel;
    this.groupName = groupName;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(groupName),
        ),
        body: SingleChildScrollView(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Container(
                  padding: EdgeInsets.all(8.0),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        DetailWidget(eventModel: eventModel)
                      ]),
                )
              ]),
        ));

  }
}
