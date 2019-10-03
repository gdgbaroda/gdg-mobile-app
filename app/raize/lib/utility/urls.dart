class URLs {
  static const String BASE_URL_API = "https://raizeapi.azurewebsites.net/";
  static const String BASE_URL_MEETUP_API = BASE_URL_API + "meetup/";
  static const String URL_AUTH = BASE_URL_MEETUP_API + "auth";
  static const String URL_CALLBACK = BASE_URL_MEETUP_API + "callback";
  static const String URL_CALLBACK_TOKEN = BASE_URL_MEETUP_API + "callback/token";
  static const String URL_VERIFY_QR_CODE = BASE_URL_API + "tickets/status/";
  static const String URL_VERIFY_QR_CODE_FOR_SWAGS = BASE_URL_API + "tickets/t/status/";
  static const String URL_GET_EVENTS = BASE_URL_MEETUP_API + "events";

}