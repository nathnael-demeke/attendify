import 'package:flutter/material.dart';
import 'package:sphone/screens/Section.dart';

class DropDownForTemplates extends StatefulWidget {
  final List children;
  final String title;
  final BuildContext context;
  final Color buttonColor;
  final Color titleColor;
  final String grade;
  DropDownForTemplates({
    super.key,
    required this.children,
    required this.title,
    required this.context,
    required this.grade,
    required this.buttonColor,
    required this.titleColor,
  });

  @override
  State<DropDownForTemplates> createState() => _DropDownForTemplatesState();
}

class _DropDownForTemplatesState extends State<DropDownForTemplates> {
  bool showSections = false;
  bool showStudents = false;
  Section? currentlyDisplayedSection;
  Column getSections(bool showSections, List children, String title,
      BuildContext context, String grade) {
    if (showSections) {
      return Column(
          children: children.map((child) {
        Section section = Section(
            grade: grade,
            section: child["section"],
            students: child["students"],
            showStudents: false);
        return Container(
          child: GestureDetector(
            child: section,
          ),
        );
      }).toList());
    } else {
      return Column();
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: EdgeInsets.all(10),
          width: screenWidth - 10,
          child: Container(
            height: 65,
            decoration: BoxDecoration(
                color: widget.buttonColor,
                borderRadius: BorderRadius.circular(9),
                border: Border.all(color: Colors.black, width: 1.1)),
            child: ListTile(
              onTap: () {
                setState(() {
                  showSections = !showSections;
                });
              },
              title: Text(
                widget.title,
                style: TextStyle(color: widget.titleColor),
              ),
            ),
          ),
        ),
        getSections(
            showSections, widget.children, widget.title, context, widget.grade),
      ],
    );
  }
}
