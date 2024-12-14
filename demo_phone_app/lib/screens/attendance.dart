import "package:flutter/material.dart";
import 'package:sphone/screens/DropDownForAttendance.dart';

class AttendancePage extends StatefulWidget {
  Map attendanceData = {};
  AttendancePage({super.key, required this.attendanceData});

  @override
  State<AttendancePage> createState() => _AttendancePageState();
}

class _AttendancePageState extends State<AttendancePage> {
  @override
  Widget build(BuildContext context) {
    var grade9Data = widget.attendanceData["9"];
    var grade10Data = widget.attendanceData["10"];
    var grade11Data = widget.attendanceData["11"];
    var grade12Data = widget.attendanceData["12"];
    int totalAbsentStudents = (grade9Data.length +
        grade10Data.length +
        grade11Data.length +
        grade12Data.length);
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 0, 64, 116),
      appBar: AppBar(
        actions: [
          ElevatedButton(
              onPressed: () {}, child: const Icon(Icons.reduce_capacity_sharp))
        ],
      ),
      body: ListView(
        children: [
          Padding(
            padding: EdgeInsets.only(left: 20, top: 13),
            child: Text(
              "Total absent students: $totalAbsentStudents",
              style: const TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          const SizedBox(height: 20),
          DropDownForTemplates(
            grade: "9",
            children: grade9Data,
            title: "Grade 9",
            context: context,
            buttonColor: Colors.white,
            titleColor: Colors.black,
          ),
          DropDownForTemplates(
              grade: "10",
              children: grade10Data,
              title: "Grade 10",
              context: context,
              buttonColor: Colors.white,
              titleColor: Colors.black),
          DropDownForTemplates(
              grade: "11",
              children: grade11Data,
              title: "Grade 11",
              context: context,
              buttonColor: Colors.white,
              titleColor: Colors.black),
          DropDownForTemplates(
              grade: "12",
              children: grade12Data,
              title: "Grade 12",
              context: context,
              buttonColor: Colors.white,
              titleColor: Colors.black)
        ],
      ),
    );
  }
}
