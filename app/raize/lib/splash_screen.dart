import 'dart:async';

import 'package:flutter/material.dart';
import 'package:raize/api/api_manager.dart';
import 'package:raize/sign_in.dart';
import 'package:raize/shared_pref.dart';
import 'package:raize/event_list_screen.dart';

class SplashWidget extends StatefulWidget {
  static String tag = 'splash-screen';

  @override
  _SplashWidget createState() => _SplashWidget();
}

class _SplashWidget extends State<SplashWidget> {
  @override
  initState() {
    super.initState();
    SharedPref.getAccessToken().then((token) {
      navigationDivider(token);
    });
  }

  /*
  Load data while showing splash
   */
  navigationDivider(token) {
    var countDownSplash = 0;
    Timer.periodic(Duration(seconds: 1), (timer) {
      countDownSplash++;
      if (token == null || token == "") {
        if (countDownSplash > 4) {
          Navigator.pushReplacement(
              context, MaterialPageRoute(builder: (context) => SignInWidget()));
          timer.cancel();
        }
      } else {
        if (countDownSplash > 4) {
          APIManager.getEvents().then((result) {
            Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) => EventListWidget(result: result)));
          });
          timer.cancel();
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Container(
            decoration: BoxDecoration(color: Colors.white),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Expanded(
                flex: 2,
                child: Container(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      CircleAvatar(
                          backgroundColor: Colors.white,
                          radius: 50.0,
                          child: Image.asset('images/icon.png')

                          // child: Icon(
                          //  Icons.apps,
                          // color: Colors.blueAccent,
                          //size: 50.0,
                          // ),
                          ),
                      Padding(
                        padding: EdgeInsets.only(top: 10.0),
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                flex: 1,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    CircularProgressIndicator(),
                    Padding(
                      padding: EdgeInsets.only(top: 20.0),
                    ),
                  ],
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
