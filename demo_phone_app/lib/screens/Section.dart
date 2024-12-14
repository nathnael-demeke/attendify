import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:sphone/screens/StudentProfilePage.dart';

class Section extends StatefulWidget {
  final String grade;
  final String section;
  bool showStudents;
  final List students;
  @override
  Section(
      {required this.grade,
      required this.section,
      required this.students,
      required this.showStudents}) {}
  @override
  State<StatefulWidget> createState() => _SectionState();
}

class _SectionState extends State<Section> {
  Widget displayStudents() {
    if (widget.showStudents) {
      return Container(
          child: Column(
              children: widget.students.map((student) {
        //Student Profile
        return Padding(
          padding: const EdgeInsets.only(bottom: 10, left: 30, right: 45),
          child: Container(
            decoration: const BoxDecoration(color: Colors.white),
            child: ListTile(
              onTap: () {
                print("mynameis");
              },
              title: Text("${student["first_name"]} ${student["father_name"]}"),
            ),
          ),
        );
      }).toList()));
    } else {
      return Container();
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          widget.showStudents = !widget.showStudents;
        });
      },
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 20, bottom: 10, right: 35),
            child: Container(
              decoration: BoxDecoration(
                  color: Colors.amber, borderRadius: BorderRadius.circular(10)),
              child: ListTile(
                title: Text("${widget.grade}${widget.section}"),
              ),
            ),
          ),
          const SizedBox(),
          displayStudents()
        ],
      ),
    );
  }
}
