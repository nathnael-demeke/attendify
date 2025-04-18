import "dart:convert";
import "dart:io";
import "package:camera/camera.dart";
import "package:flutter/material.dart";
import "package:flutter/services.dart";
import "package:sphone/screens/StudentsSearchPage.dart";
import "package:sphone/screens/attendance.dart";
import "package:http/http.dart" as http;

late List<CameraDescription> cameras;
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
  runApp(const MaterialApp(
    debugShowCheckedModeBanner: false,
    home: Scaffold(
      backgroundColor: Colors.black,
      drawer: SideBar(),
      body: Demo(),
    ),
  ));
}

class SideBar extends StatelessWidget {
  const SideBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text("Umer Sibhatu Branch"),
        GestureDetector(
          onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (build) {
              return const StudentsSearchPage();
            }));
          },
          child: const Icon(Icons.people),
        )
      ],
    );
  }
}

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
    // TODO: implement initState
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
    return Stack(
      children: [
        Positioned(
            top: 0,
            child: SizedBox(
                width: windowWidth,
                height: windowHeight - 100,
                child: CameraPreview(_cameraController))),
        Positioned(
            top: 50,
            right: 20,
            child: GestureDetector(
              onTap: () async {
                try {
                  var response = await http.get(Uri.parse(
                      "http://192.168.170.200/report/today?schoolID=1"));
                  Map attendanceData = json.decode(response.body);
                  print(attendanceData["9"]);
                  Navigator.push(context, MaterialPageRoute(builder: (build) {
                    return AttendancePage(attendanceData: attendanceData);
                  }));
                } catch (err) {
                  print(err);
                }
              },
              child: Container(
                width: 45,
                height: 45,
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12)),
                child: const Icon(Icons.contacts),
              ),
            )),
        Positioned(
            right: 10,
            bottom: 120,
            child: FloatingActionButton(
              onPressed: () async {
                XFile picture = await _cameraController.takePicture();
                await _cameraController.setFlashMode(FlashMode.off);
                File image = File(picture.path);
                String fileBase64 = base64.encode(image.readAsBytesSync());

                var request = await http.MultipartRequest(
                  "POST",
                  Uri.parse("http://192.168.170.200/qrcode/attendStudent"),
                );
                request.files.add(
                    await http.MultipartFile.fromPath("image", picture.path));
                var response = await request.send();
                print(response);
              },
              child: const Icon(Icons.camera),
            ))
      ],
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
