import 'package:shared_preferences/shared_preferences.dart';

class SharedPref {
  // Keys
  static const String _KEY_MEETUP_CODE = "meetup_code";
  static const String _KEY_ACCESS_TOKEN = "access_token";
  static const String _KEY_REFRESH_TOKEN = "refresh_token";
  static const String _KEY_TOKEN_TYPE = "token_type";
  static const String _KEY_TOKEN_EXPIRY_TIME = "token_expiry_time";

  static Future<String> getMeetupCode() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_KEY_MEETUP_CODE) ?? "";
  }

  static void setMeetupCode(String code) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(_KEY_MEETUP_CODE, code);
  }

  static Future<String> getAccessToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_KEY_ACCESS_TOKEN) ?? "";
  }

  static void setAccessToken(String accessToken) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(_KEY_ACCESS_TOKEN, accessToken);
  }

  static Future<String> getRefreshToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_KEY_REFRESH_TOKEN) ?? "";
  }

  static void setRefreshToken(String refreshToken) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(_KEY_REFRESH_TOKEN, refreshToken);
  }

  static Future<String> getTokenType() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(_KEY_TOKEN_TYPE) ?? "";
  }

  static void setTokenType(String tokenType) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString(_KEY_TOKEN_TYPE, tokenType);
  }

  static Future<int> getTokenExpiryTime() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_KEY_TOKEN_EXPIRY_TIME) ?? 0;
  }

  static void setTokenExpiryTime(int expiryTime) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setInt(_KEY_TOKEN_EXPIRY_TIME, expiryTime);
  }
}
