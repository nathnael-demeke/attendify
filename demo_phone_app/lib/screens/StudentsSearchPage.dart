import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:sphone/screens/StudentProfilePage.dart';
import 'package:sphone/widgets/StudentQRCodeScanner.dart';
import 'package:http/http.dart' as http;

class StudentsSearchPage extends StatefulWidget {
  const StudentsSearchPage({super.key});

  @override
  State<StudentsSearchPage> createState() => _StudentsSearchPageState();
}

class _StudentsSearchPageState extends State<StudentsSearchPage> {
  List students = [
    {
      "first_name": "nathnael",
      "father_name": "demeke",
      "id": 1,
      "father_phone_number": "0912345678",
      "mother_phone_number": "0912345678",
      "gender": "M",
      "photo": "",
      "grade": "12",
      "section": "A",
      "birth_date": "2000-01-01",
    }
  ];
  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }

  @override
  void initState() {
    // TODO: implement initState

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Container(
          padding: EdgeInsets.only(top: 3),
          height: 40,
          child: SearchBar(
            onChanged: (fullName) async {
              print(fullName);
              var request = await http.get(Uri.parse(
                  "http://192.168.1.3:5000/student/search?keyword=${fullName}"));
              setState(() {
                students = json.decode(request.body);
              });
            },
            shadowColor: WidgetStateColor.transparent,
            leading: Icon(Icons.search),
            shape: WidgetStateProperty.all(
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(6))),
          ),
        ),
        actions: [
          Container(
              padding: EdgeInsets.only(top: 3, right: 25),
              child: GestureDetector(
                  onTap: () {
                    showDialog(
                        context: context,
                        builder: (build) {
                          return AlertDialog(
                            title: Text("Qr Code Scanner"),
                            content: SizedBox(
                              width: 250,
                              height: 380,
                              child: Demo(),
                            ),
                          );
                        });
                  },
                  child: Icon(
                    Icons.qr_code_scanner_sharp,
                    color: Colors.blue,
                    size: 34,
                  ))),
        ],
      ),
      body: ListView.builder(
        itemBuilder: (context, index) {
          Map student = students[index];
          String firstName = student["first_name"];
          String fatherName = student["father_name"];

          return Container(
              margin: EdgeInsets.all(10),
              decoration: BoxDecoration(
                border: Border.all(width: 1, color: Colors.black),
              ),
              child: ListTile(
                  onTap: () {
                    Navigator.push(context, MaterialPageRoute(builder: (build) {
                      return StudentProfilePage(data: student);
                    }));
                  },
                  title: Text("$firstName $fatherName")));
        },
        itemCount: students.length,
      ),
    );
  }
}
