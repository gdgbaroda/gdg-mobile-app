import 'package:flutter/material.dart';
import 'package:raize/sign_in.dart';
import 'package:raize/event_list_screen.dart';
import 'package:raize/splash_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  final routes = <String, WidgetBuilder>{
    SplashWidget.tag: (context) => SplashWidget(),
    SignInWidget.tag: (context) => SignInWidget(),
    EventListWidget.tag: (context) => EventListWidget()
   // EventListWidgetntDetailWidget.tag: (context) => EventDetailWidget(),
  };
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Raize',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: SplashWidget(),
      routes: routes,
    );
  }
}
