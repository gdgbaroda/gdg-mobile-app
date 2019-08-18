import 'package:flutter/material.dart';
import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';
import 'package:raize/event_list_screen.dart';
import 'package:raize/shared_pref.dart';
import 'package:raize/utility/urls.dart';

import 'api/api_manager.dart';

class SignInWidget extends StatefulWidget {
  static String tag = 'signin-screen';

  @override
  _SignInWidget createState() => _SignInWidget();
}

class _SignInWidget extends State<SignInWidget> {
  @override
  void initState() {
    super.initState();

    FlutterWebviewPlugin flutterWebviewPlugin = FlutterWebviewPlugin();

    flutterWebviewPlugin.onUrlChanged.listen((String url) {
      //print(url);getAccessToken

      if (url.startsWith(URLs.URL_CALLBACK)) {
        String code = new RegExp("code=(.*)").firstMatch(url)?.group(1);
        //print("code $code");

        SharedPref.setMeetupCode(code);

        APIManager.getAccessToken(code).then((isSuccess) {
          if (isSuccess) {
            flutterWebviewPlugin.close();
            Navigator.of(context).pushNamed(EventListWidget.tag);
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return WebviewScaffold(
      url: URLs.URL_AUTH,
    );
    /*return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.max,
          children: this.createBody(),
        ),
      ),
      backgroundColor: Colors.white,
    );*/
  }

  /// Creates the main body to show using the state variable values
  List<Widget> createBody() {
    var children = <Widget>[];

    /*if (true) {
      // todo: Check user here
      children.addAll(this.createLoginScreen());
    }*/

    return children;
  }

  List<Widget> createLoginScreen() {
    return <Widget>[
      Icon(
        Icons.bookmark_border,
        size: 80.0,
        color: Colors.white,
      ),
      Container(
        margin: const EdgeInsets.only(top: 10.0),
        child: Text('Raize',
            style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 25.0,
                color: Colors.white)),
      ),
      Container(
        margin: const EdgeInsets.only(top: 32.0),
        child: RaisedButton(
          color: Theme.of(context).accentColor,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(right: 4.0),
                child: Icon(
                  Icons.account_circle,
                  color: Colors.white,
                ),
              ),
              Text(
                'Sign-In with Meetup.com',
                style: TextStyle(color: Colors.white),
              ),
            ],
          ),
          //onPressed: _login,
        ),
      ),
    ];
  }

}
