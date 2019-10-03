import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:raize/api/api_manager.dart';
import 'package:raize/models/event_model.dart';
import 'package:raize/event_details_widget.dart';

import 'models/event_list_item_model.dart';
import 'models/event_list_model.dart';

class EventListWidget extends StatefulWidget {
  final EventListModel result;
  static String tag = 'eventList-screen';

  EventListWidget({Key key, this.result}) : super(key: key);

  @override
  _EventListWidget createState() => new _EventListWidget();
}

class _EventListWidget extends State<EventListWidget> {
  EventListModel _items;
  bool _isLoading = true;

  //add an item to the list
  void _addItem(item) {
    if (item != null) {
      setState(() {
        _isLoading = false;
        _items = EventListModel.fromJson(item);
      });
    }
  }

  @override
  void initState() {
    super.initState();

    // use the api manager to fetch upcoming events
    if (this.widget.result == null) {
      APIManager.getEvents().then((result) {
        // add the events (group wise) to the list of items
        _addItem(result.toJson());
      });
    } else {
      _addItem(this.widget.result.toJson());
    }
  }

  //creates view for each item in listview
  Widget _createEventsParentItem(
      BuildContext context, EventListItemModel eventList) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
            padding: EdgeInsets.fromLTRB(8, 0, 0, 0),
            child: Text(
              eventList.title,
              style: TextStyle(
                fontSize: 14.0,
                color: Colors.grey,
              ),
              textAlign: TextAlign.left,
            )),
        ListView.builder(  //sublist for events of group
          padding: EdgeInsets.all(8.0),
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: eventList.events.length,
          itemBuilder: (BuildContext context, int index) {
            return _createEventItem(context, eventList.events[index],
                eventList.thumbnail, eventList.title);
          },
        ),

      ],
    );
  }

  //creates view for each item in listview
  Widget _createEventItem(BuildContext context, EventModel eventModel,
      String thumbnail, String groupName) {
    return GestureDetector(
      //listens for on tap
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => EventDetailsWidget(eventModel: eventModel, groupName: groupName),
            //builder: (context) => new EventDetailsWidget()
          ),
        );
      },
      child: Column(
        children: <Widget>[
          Card(
              child: Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Row(
                    children: <Widget>[
                      Image.network(thumbnail,
                          height: 80.0, width: 80.0, fit: BoxFit.fitHeight),
                      Expanded(
                          child: Container(
                        height: 80.0,
                        margin: EdgeInsets.symmetric(horizontal: 8.0),
                        child: _createEventItemDescriptionSection(
                            context, eventModel),
                      )),
                    ],
                  ))),

        ],
      ),
    );
  }

  Widget _createEventItemDescriptionSection(
      BuildContext context, EventModel eventModel) {
    return Column(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          eventModel.title,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16.0,
          ),
        ),
        SizedBox(height: 10.0),
        Text(eventModel.description,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 13.0,
            )),
      ],
    );
  }

  //ui is created here
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(600.0),
        child: Text(''),
      ),
      body: Container(
        padding: EdgeInsets.only(top: 16.0, left: 8.0, right: 8.0, bottom: 8.0),
        child: Column(
          children: <Widget>[
            Expanded(
                child: Card(
              child: _isLoading                   //if data is available list will be displayed or else loading will be showed
                  ? Container(
                      child: Center(child: CircularProgressIndicator()),
                      padding: EdgeInsets.all(16.0),
                    )
                  : ListView.builder(
                      padding: EdgeInsets.all(8.0),
                      shrinkWrap: true,
                      itemCount: _items.groups.length,
                      itemBuilder: (BuildContext context, int index) {
                        EventListItemModel eventListModel =
                            _items.groups[index];
                        return _createEventsParentItem(context, eventListModel); //calls this for each item in list
                      },
                    ),
            ))
          ],
        ),
      ),
    );
  }
}
