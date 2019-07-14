import 'package:flutter/material.dart';
import 'package:raize/DetailWidget.dart';
import 'package:raize/models/EventModel.dart';

class EventDetailsWidget extends StatefulWidget {
  static String tag = 'eventList-screen';

  // Declare a field that holds the Todo.
  final EventModel eventModel;

  // In the constructor, require a Todo.
  EventDetailsWidget({@required  this.eventModel}) ;

  @override
  _EventState createState() => _EventState();
}

class _EventState extends State<EventDetailsWidget> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Events Detail"),
        ),
        body: new Container(
          padding: new EdgeInsets.all(8.0),
          child: new Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[new DetailWidget()],
          ),
        ));
  }
}