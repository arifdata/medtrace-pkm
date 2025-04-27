import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:pocketbase/pocketbase.dart';

void main() {
  runApp(const MyApp());
}

/// The route configuration.
final GoRouter _router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        return const HomeScreen();
      },
      routes: <RouteBase>[
        GoRoute(
          path: 'details',
          builder: (BuildContext context, GoRouterState state) {
            return const DetailsScreen();
          },
        ),
      ],
    ),
  ],
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      // home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

/// The home screen
class HomeScreen extends StatelessWidget {
  /// Constructs a [HomeScreen]
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home Screen')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => context.go('/details'),
          child: const Text('Go to the Details screen'),
        ),
      ),
    );
  }
}

/// The details screen
class DetailsScreen extends StatefulWidget {
  /// Constructs a [DetailsScreen]
  const DetailsScreen({super.key});

  @override
  State<DetailsScreen> createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  final _emailField = TextEditingController();
  final _passField = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    _emailField.dispose();
    _passField.dispose();
  }

  Future<void> _cobaPb() async {
    final pb = PocketBase('http://127.0.0.1:8090');
    try {
      final authData = await pb
          .collection("users")
          .authWithPassword(_emailField.text, _passField.text);
      // print(authData);

      final resultList = await pb
          .collection('sumber')
          .getList(page: 1, perPage: 50);

      print(resultList);
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Details Screen')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              ElevatedButton(
                onPressed: () => context.go('/'),
                child: const Text('Go back to the Home screen'),
              ),
              TextField(controller: _emailField),
              TextField(controller: _passField, obscureText: true),
              TextButton(
                onPressed: () {
                  print(_emailField.text);
                  print(_passField.text);
                  _cobaPb();
                },
                child: const Text("CobaPB"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
