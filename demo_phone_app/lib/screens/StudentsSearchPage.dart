import 'package:flutter/material.dart';

class StudentsSearchPage extends StatefulWidget {
  const StudentsSearchPage({super.key});

  @override
  State<StudentsSearchPage> createState() => _StudentsSearchPageState();
}

class _StudentsSearchPageState extends State<StudentsSearchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          ElevatedButton(onPressed: () {}, child: const Icon(Icons.qr_code_2))
        ],
      ),
      body: const Column(),
    );
  }
}
