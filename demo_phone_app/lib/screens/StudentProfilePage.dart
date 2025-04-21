import "dart:convert";

import "package:flutter/material.dart";
import "package:loading_overlay/loading_overlay.dart";
import "package:syncfusion_flutter_charts/charts.dart";
import "package:url_launcher/url_launcher.dart";
import 'package:http/http.dart' as http;

class StudentProfilePage extends StatefulWidget {
  final Map data;
  const StudentProfilePage({super.key, required this.data});

  @override
  State<StudentProfilePage> createState() => _StudentProfilePageState();
}

class _StudentProfilePageState extends State<StudentProfilePage> {
  List<AttendanceData> chartStartingData = [];
  void fetchStartingData(int studentID) async {
    var request = await http.get(Uri.parse(
        "http://192.168.1.3:5000/student/attendance/thisWeek?studentID=$studentID"));
    Map response = json.decode(request.body);

    setState(() {
      for (var action in response["thisWeek"].keys) {
        try {
          print(response[action].runtimeType);
          chartStartingData
              .add(AttendanceData(action, response["thisWeek"][action]));
        } catch (error) {
          print("this is error $error");
        }
      }
    });
    await Future.delayed(Duration(seconds: 1));
    setState(() {});
  }

  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      fetchStartingData(1);
    });
    print("This is widget data ${widget.data}");
    // TODO: implement initState
    super.initState();
  }

  bool isLoading = false;
  @override
  Widget build(BuildContext context) {
    String firstName = widget.data["first_name"];
    String fatherName = widget.data["father_name"];
    String fatherPhoneNumber = widget.data["father_phone_number"];
    String motherPhoneNumber = widget.data["mother_phone_number"];
    // String gender = widget.data["gender"];
    // String profilePhoto = widget.data["photo"];
    String grade = widget.data["grade"].toString();
    String section = widget.data["section"];

    // String birthDate = widget.data["birth_date"];
    // String registrationDate = widget.data["registration_date"];
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back),
          ),
          actions: [],
        ),
        body: LoadingOverlay(
          isLoading: isLoading,
          child: Column(
            children: [
              Container(
                  width: 120,
                  height: 120,
                  child: Image.network(
                      "http://192.168.1.3:3000/images/profile-pic/default-avatar-icon.png")),
              Container(
                padding: EdgeInsets.only(left: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "$firstName $fatherName",
                      style: TextStyle(
                        fontSize: 30,
                      ),
                    )
                  ],
                ),
              ),
              Text(
                "Grade: $grade $section",
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              SizedBox(height: 30),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 150,
                        child: Text("Mother's Phone Number",
                            textAlign: TextAlign.start,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            )),
                      ),
                      Text(": $motherPhoneNumber",
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            fontSize: 18,
                          )),
                      SizedBox(width: 10),
                      GestureDetector(
                        onTap: () {
                          launchUrl(Uri.parse("tel:$motherPhoneNumber"));
                        },
                        child: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.greenAccent,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Icon(
                            Icons.call,
                            color: Colors.white,
                          ),
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 150,
                        child: Text("Father's Phone Number",
                            textAlign: TextAlign.start,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            )),
                      ),
                      Text(": $fatherPhoneNumber",
                          textAlign: TextAlign.start,
                          style: TextStyle(
                            fontSize: 18,
                          )),
                      SizedBox(width: 10),
                      GestureDetector(
                        onTap: () {
                          launchUrl(Uri.parse("tel:$fatherPhoneNumber"));
                        },
                        child: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.greenAccent,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Icon(
                            Icons.call,
                            color: Colors.white,
                          ),
                        ),
                      )
                    ],
                  ),
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 80,
                        height: 30,
                        child: ElevatedButton(
                          style: ButtonStyle(
                            textStyle: WidgetStatePropertyAll<TextStyle>(
                              TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            shape: WidgetStatePropertyAll<OutlinedBorder>(
                                RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(0),
                            )),
                            foregroundColor:
                                WidgetStatePropertyAll<Color>(Colors.white),
                            side: WidgetStatePropertyAll<BorderSide>(
                                BorderSide(color: Colors.grey, width: 1)),
                            backgroundColor: WidgetStatePropertyAll<Color>(
                                const Color.fromARGB(255, 191, 191, 191)),
                          ),
                          onPressed: () async {
                            isLoading = true;

                            setState(() {});
                            print(isLoading);
                            await Future.delayed(Duration(seconds: 1));
                            setState(
                              () {
                                chartStartingData = [
                                  AttendanceData("Monday", 0),
                                  AttendanceData("Tuesday", 0),
                                  AttendanceData("Wensday", 1),
                                  AttendanceData("Thursday", 1),
                                  AttendanceData("Friday", 0)
                                ];
                                isLoading = false;
                              },
                            );
                          },
                          child: Text("This Week"),
                        ),
                      ),
                      SizedBox(width: 5),
                      Container(
                        width: 80,
                        height: 30,
                        child: ElevatedButton(
                          style: ButtonStyle(
                            textStyle: WidgetStatePropertyAll<TextStyle>(
                              TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            shape: WidgetStatePropertyAll<OutlinedBorder>(
                                RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(0),
                            )),
                            foregroundColor:
                                WidgetStatePropertyAll<Color>(Colors.white),
                            side: WidgetStatePropertyAll<BorderSide>(
                                BorderSide(color: Colors.grey, width: 1)),
                            backgroundColor: WidgetStatePropertyAll<Color>(
                                const Color.fromARGB(255, 191, 191, 191)),
                          ),
                          onPressed: () async {
                            isLoading = true;

                            setState(() {});
                            print(isLoading);
                            await Future.delayed(Duration(seconds: 2));
                            setState(
                              () {
                                chartStartingData = [
                                  AttendanceData("Week1", 3),
                                  AttendanceData("Week2", 4),
                                  AttendanceData("Week3", 0),
                                  AttendanceData("Week4", 2)
                                ];
                                isLoading = false;
                              },
                            );
                          },
                          child: Text("This Monthr"),
                        ),
                      ),
                      SizedBox(width: 5),
                      Container(
                        width: 80,
                        height: 30,
                        child: ElevatedButton(
                          style: ButtonStyle(
                            textStyle: WidgetStatePropertyAll<TextStyle>(
                              TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            shape: WidgetStatePropertyAll<OutlinedBorder>(
                                RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(0),
                            )),
                            foregroundColor:
                                WidgetStatePropertyAll<Color>(Colors.white),
                            side: WidgetStatePropertyAll<BorderSide>(
                                BorderSide(color: Colors.grey, width: 1)),
                            backgroundColor: WidgetStatePropertyAll<Color>(
                                const Color.fromARGB(255, 191, 191, 191)),
                          ),
                          onPressed: () {},
                          child: Text("This Year"),
                        ),
                      ),
                      SizedBox(width: 5),
                      Container(
                        width: 100,
                        height: 30,
                        child: ElevatedButton(
                          style: ButtonStyle(
                            textStyle: WidgetStatePropertyAll<TextStyle>(
                              TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            shape: WidgetStatePropertyAll<OutlinedBorder>(
                                RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(0),
                            )),
                            foregroundColor:
                                WidgetStatePropertyAll<Color>(Colors.white),
                            side: WidgetStatePropertyAll<BorderSide>(
                                BorderSide(color: Colors.grey, width: 1)),
                            backgroundColor: WidgetStatePropertyAll<Color>(
                                const Color.fromARGB(255, 191, 191, 191)),
                          ),
                          onPressed: () {},
                          child: Text("LifeTime"),
                        ),
                      ),
                    ],
                  )
                ],
              ),
              SizedBox(height: 20),
              SfCartesianChart(
                primaryXAxis: CategoryAxis(),
                tooltipBehavior: TooltipBehavior(
                  enable: true,
                  format: "point.x : point.y",
                  header: "Data",
                ),
                series: <CartesianSeries<AttendanceData, String>>[
                  LineSeries(
                    animationDelay: 80,
                    color: Colors.black,
                    markerSettings: MarkerSettings(
                      isVisible: true,
                      color: Colors.blue,
                      shape: DataMarkerType.circle,
                    ),
                    dataSource: chartStartingData,
                    xValueMapper: (AttendanceData data, _) => data.date,
                    yValueMapper: (AttendanceData data, _) =>
                        data.attendanceCount,
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}

class AttendanceData {
  final String date;
  final int attendanceCount;

  AttendanceData(this.date, this.attendanceCount);
}
