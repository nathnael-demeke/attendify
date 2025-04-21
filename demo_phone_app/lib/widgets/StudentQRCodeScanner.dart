import 'dart:convert';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import "package:http/http.dart" as http;
import 'package:sphone/main.dart';
import 'package:sphone/screens/StudentProfilePage.dart';
import 'package:sphone/screens/attendance.dart';

class Demo extends StatefulWidget {
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> {
  late CameraController _cameraController;
  bool turnFlashLightOn = false;
  @override
  void initState() {
    super.initState();
    _cameraController = CameraController(cameras[0], ResolutionPreset.veryHigh);
    _cameraController.initialize().then((value) {
      if (!mounted) {
        return;
      }
      setState(() {
        print("succesful");
      });
    }).catchError((error) {
      print(error);
    });
  }

  @override
  Widget build(BuildContext context) {
    double windowWidth = MediaQuery.of(context).size.width;
    double windowHeight = MediaQuery.of(context).size.height;
    _cameraController.setFlashMode(FlashMode.off);
    _cameraController.lockCaptureOrientation(DeviceOrientation.landscapeRight);
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          Positioned(
              top: 0,
              child: SizedBox(
                  width: 300,
                  height: 380,
                  child: CameraPreview(_cameraController))),
          Positioned(
              right: 10,
              bottom: 50,
              child: FloatingActionButton(
                onPressed: () async {
                  XFile picture = await _cameraController.takePicture();
                  await _cameraController.setFlashMode(FlashMode.off);
                  File image = File(picture.path);
                  String fileBase64 = base64.encode(image.readAsBytesSync());

                  var request = await http.MultipartRequest(
                    "POST",
                    Uri.parse("http://192.168.1.3:5000/qrcode/attendStudent"),
                  );
                  request.files.add(
                      await http.MultipartFile.fromPath("image", picture.path));
                  var response = await request.send();
                  var studentData = await http.Response.fromStream(response);

                  Navigator.push(context, MaterialPageRoute(builder: (build) {
                    return StudentProfilePage(
                        data: json.decode(studentData.body));
                  }));
                },
                child: const Icon(Icons.camera),
              ))
        ],
      ),
    );
  }
}

Widget cameraPreview(CameraController cameraController,
    {required bool display}) {
  if (display) {
    return Positioned(
      top: 0,
      child: Container(
        width: double.maxFinite,
        height: 200,
        child: CameraPreview(cameraController),
      ),
    );
  } else {
    return Container();
  }
}
