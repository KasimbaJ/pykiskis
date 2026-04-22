import type { Level } from '../../types'

export const phase3Levels: Level[] = [
  {
    id: 46,
    phase: 3,
    levelMode: 'code',
    title: 'Packing & Unpacking',
    concept: '*args, **kwargs',
    description:
      '*args collects positional arguments into a tuple. **kwargs collects keyword arguments into a dict. These make functions flexible enough to accept any number of arguments.',
    task: 'Write a function total(*args) that sums all arguments. Call total(1, 2, 3, 4, 5) and print the result.',
    starterCode: '# *args and **kwargs\n',
    expectedOutput: '15',
    validationMode: 'exact',
    hints: [
      'def total(*args): — args is a tuple of all positional arguments.',
      'Use sum(args) or a loop to add them.',
      'def total(*args):\n    return sum(args)\nprint(total(1, 2, 3, 4, 5))',
    ],
    solution: 'def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3, 4, 5))',
    explanation:
      '*args collects 1,2,3,4,5 into the tuple (1,2,3,4,5). sum() adds all items: 1+2+3+4+5=15. This allows calling total() with any number of arguments.',
  },
  {
    id: 47,
    phase: 3,
    levelMode: 'code',
    title: 'Dynamic Typing',
    concept: 'Duck typing, type() checks',
    description:
      "Python is dynamically typed — variables don't have fixed types. The same variable can hold different types at different times. type() checks the current type. Duck typing: if it behaves like a duck, it is a duck.",
    task: 'Assign x = 42, print its type. Then reassign x = "hello", print its type again.',
    starterCode: '# Dynamic typing demonstration\n',
    expectedOutput: "<class 'int'>\n<class 'str'>",
    validationMode: 'exact',
    hints: [
      'print(type(x)) after each assignment.',
      'Python allows reassigning to a different type.',
      'x = 42\nprint(type(x))\nx = "hello"\nprint(type(x))',
    ],
    solution: 'x = 42\nprint(type(x))\nx = "hello"\nprint(type(x))',
    explanation:
      'Unlike Java/C++, Python lets x hold an int then a string. type() reflects the current value\'s type. This flexibility is powerful but requires careful handling to avoid type errors.',
  },
  {
    id: 48,
    phase: 3,
    levelMode: 'code',
    title: 'Advanced Error Handling',
    concept: 'try / except / else / finally / raise',
    description:
      'The full try/except structure: try (risky code), except (error handler), else (runs if no error), finally (always runs). raise re-raises or creates new exceptions.',
    task: 'Write try/except/finally: in try print "Trying", then raise ValueError. In except print "Error caught". In finally print "Cleanup done".',
    starterCode: '# Full try/except/else/finally\n',
    expectedOutput: 'Trying\nError caught\nCleanup done',
    validationMode: 'exact',
    hints: [
      'raise ValueError() in the try block.',
      'except ValueError: handles it.',
      'try:\n    print("Trying")\n    raise ValueError("test")\nexcept ValueError:\n    print("Error caught")\nfinally:\n    print("Cleanup done")',
    ],
    solution: 'try:\n    print("Trying")\n    raise ValueError("test")\nexcept ValueError:\n    print("Error caught")\nfinally:\n    print("Cleanup done")',
    explanation:
      'try executes until raise ValueError stops it. except ValueError catches that specific error. finally always runs regardless of whether an error occurred — perfect for cleanup like closing files.',
  },
  {
    id: 49,
    phase: 3,
    levelMode: 'code',
    title: 'Custom Exceptions',
    concept: 'Creating exception classes',
    description:
      'You can create your own exception types by subclassing Exception. This gives errors meaningful names and allows catching them specifically without catching all exceptions.',
    task: 'Create a CustomError(Exception) class. Raise it with message "Invalid value" and catch it, printing "CustomError: Invalid value".',
    starterCode: '# Custom exception class\n',
    expectedOutput: 'CustomError: Invalid value',
    validationMode: 'exact',
    hints: [
      'class CustomError(Exception): pass',
      'raise CustomError("Invalid value")',
      'class CustomError(Exception):\n    pass\ntry:\n    raise CustomError("Invalid value")\nexcept CustomError as e:\n    print(f"CustomError: {e}")',
    ],
    solution: 'class CustomError(Exception):\n    pass\n\ntry:\n    raise CustomError("Invalid value")\nexcept CustomError as e:\n    print(f"CustomError: {e}")',
    explanation:
      'Inheriting from Exception makes CustomError a valid exception type. "as e" binds the exception to variable e. str(e) or f"{e}" gives the error message passed to the constructor.',
  },
  {
    id: 50,
    phase: 3,
    levelMode: 'code',
    title: 'Working with JSON',
    concept: 'json.dumps(), json.loads()',
    description:
      'JSON (JavaScript Object Notation) is the standard format for data exchange. Python\'s json module converts between Python dicts/lists and JSON strings. dumps() serialises to string, loads() parses back.',
    task: 'Convert {"name": "Alice", "age": 30} to a JSON string, then parse it back and print the "name" value.',
    starterCode: '# JSON serialisation\nimport json\n',
    expectedOutput: 'Alice',
    validationMode: 'exact',
    hints: [
      'json.dumps(dict) converts to a JSON string.',
      'json.loads(string) parses back to a dict.',
      'import json\ndata = {"name": "Alice", "age": 30}\njson_str = json.dumps(data)\nparsed = json.loads(json_str)\nprint(parsed["name"])',
    ],
    solution: 'import json\n\ndata = {"name": "Alice", "age": 30}\njson_str = json.dumps(data)\nparsed = json.loads(json_str)\nprint(parsed["name"])',
    explanation:
      'json.dumps() converts Python dict to JSON string: \'{"name": "Alice", "age": 30}\'. json.loads() parses it back to a Python dict. Then ["name"] accesses the value.',
  },
  {
    id: 51,
    phase: 3,
    levelMode: 'code',
    title: 'Local Persistence',
    concept: 'JSON file read/write',
    description:
      'Persisting data means saving it so it survives program restarts. JSON files are a simple way to store structured data locally. Write with json.dump(), read with json.load().',
    task: 'Save {"score": 42} to "save.json", then read it back and print the score value.',
    starterCode: '# Local data persistence with JSON\nimport json\n',
    expectedOutput: '42',
    validationMode: 'exact',
    hints: [
      'json.dump(data, file) writes to file. json.load(file) reads from file.',
      'Open with "w" to write, "r" to read.',
      'import json\nwith open("save.json","w") as f:\n    json.dump({"score":42},f)\nwith open("save.json") as f:\n    data=json.load(f)\nprint(data["score"])',
    ],
    solution: 'import json\n\nwith open("save.json", "w") as f:\n    json.dump({"score": 42}, f)\n\nwith open("save.json") as f:\n    data = json.load(f)\n\nprint(data["score"])',
    explanation:
      'json.dump() writes a Python object directly to a file (not a string). json.load() reads it back. This is the standard pattern for simple config files and save states.',
  },
  {
    id: 52,
    phase: 3,
    levelMode: 'code',
    title: 'Working with Dates',
    concept: 'datetime module, strftime()',
    description:
      'The datetime module handles dates and times. datetime(year, month, day) creates a date. strftime() formats it as a string using format codes like %Y (year), %m (month), %d (day).',
    task: 'Create datetime(2024, 1, 15) and print it formatted as "2024-01-15".',
    starterCode: '# Working with dates\nfrom datetime import datetime\n',
    expectedOutput: '2024-01-15',
    validationMode: 'exact',
    hints: [
      'datetime(2024, 1, 15) creates the date object.',
      'strftime("%Y-%m-%d") formats it.',
      'from datetime import datetime\ndt = datetime(2024, 1, 15)\nprint(dt.strftime("%Y-%m-%d"))',
    ],
    solution: 'from datetime import datetime\n\ndt = datetime(2024, 1, 15)\nprint(dt.strftime("%Y-%m-%d"))',
    explanation:
      'strftime stands for "string format time". %Y = 4-digit year, %m = 2-digit month, %d = 2-digit day. The separator - appears as-is. This ISO 8601 format is used widely in APIs and databases.',
  },
  {
    id: 53,
    phase: 3,
    levelMode: 'code',
    title: 'Time Calculations',
    concept: 'timedelta, date arithmetic',
    description:
      'timedelta represents a duration of time. Adding or subtracting timedelta from a datetime gives a new datetime. This enables calculations like "30 days from now" or "days until deadline".',
    task: 'Add 30 days to datetime(2024, 1, 15) and print the result formatted as "YYYY-MM-DD".',
    starterCode: '# Time calculations with timedelta\nfrom datetime import datetime, timedelta\n',
    expectedOutput: '2024-02-14',
    validationMode: 'exact',
    hints: [
      'timedelta(days=30) creates a 30-day duration.',
      'Add it to a datetime with +',
      'dt = datetime(2024,1,15)\nresult = dt + timedelta(days=30)\nprint(result.strftime("%Y-%m-%d"))',
    ],
    solution: 'from datetime import datetime, timedelta\n\ndt = datetime(2024, 1, 15)\nresult = dt + timedelta(days=30)\nprint(result.strftime("%Y-%m-%d"))',
    explanation:
      'timedelta(days=30) is a 30-day duration. Adding to January 15 gives February 14 (January has 31 days: 31-15=16 days remaining + 14 more = 30). Date arithmetic handles month boundaries automatically.',
  },
  {
    id: 54,
    phase: 3,
    levelMode: 'theory',
    title: 'Sending Email (Theory)',
    concept: 'SMTP, smtplib module',
    description:
      'Python can send emails using the smtplib module, which implements the SMTP protocol. You connect to an SMTP server (like Gmail\'s smtp.gmail.com on port 587), authenticate, and send messages. In production you must use environment variables for credentials — never hardcode passwords.',
    task: 'Write the Python import and SMTP connection setup code. Include: import smtplib, create an SMTP object for "smtp.gmail.com" port 587, and call starttls().',
    starterCode: '# SMTP email setup (theory — not executed)\n# Write the code to set up an SMTP connection\n',
    expectedOutput: 'smtplib.SMTP',
    validationMode: 'contains',
    hints: [
      'Start with: import smtplib',
      'Create connection: smtp = smtplib.SMTP("smtp.gmail.com", 587)',
      'import smtplib\nsmtp = smtplib.SMTP("smtp.gmail.com", 587)\nsmtp.starttls()',
    ],
    solution: 'import smtplib\n\nsmtp = smtplib.SMTP("smtp.gmail.com", 587)\nsmtp.starttls()\n# smtp.login("user@gmail.com", "password")\n# smtp.sendmail(from, to, message)',
    explanation:
      'smtplib.SMTP() creates a connection to the mail server. starttls() upgrades to a secure TLS connection. In real code you\'d then call login() with credentials and sendmail() to send. Never hardcode passwords — use environment variables or app passwords.',
  },
  {
    id: 55,
    phase: 3,
    levelMode: 'theory',
    title: 'API Concepts (Theory)',
    concept: 'REST APIs, HTTP methods',
    description:
      'An API (Application Programming Interface) allows programs to communicate. REST APIs use HTTP methods: GET (retrieve data), POST (create data), PUT/PATCH (update), DELETE (remove). Responses are typically JSON. Every API has a base URL and endpoints.',
    task: 'Print the HTTP method name used to RETRIEVE data from an API (all caps, one word).',
    starterCode: '# REST API concepts\n# Print the HTTP method for retrieving data\n',
    expectedOutput: 'GET',
    validationMode: 'exact',
    hints: [
      'Think about the HTTP verb used to "get" or fetch data.',
      'It\'s the first HTTP method you\'d use when reading data.',
      'print("GET")',
    ],
    solution: 'print("GET")',
    explanation:
      'GET is used to retrieve data. POST creates new resources. PUT/PATCH updates existing ones. DELETE removes them. This CRUD pattern (Create, Read, Update, Delete) maps to POST, GET, PUT/PATCH, DELETE.',
  },
  {
    id: 56,
    phase: 3,
    levelMode: 'theory',
    title: 'HTTP Requests (Theory)',
    concept: 'requests module, GET/POST',
    description:
      'The requests library is the most popular way to make HTTP requests in Python. requests.get(url) fetches data. The response has .status_code, .json(), and .text attributes. Always check the status code before using the response.',
    task: 'Write code to make a GET request to "https://api.example.com/data" using the requests module and store the result in a variable called response.',
    starterCode: '# HTTP requests with requests library\n# Write the GET request code\n',
    expectedOutput: 'requests.get',
    validationMode: 'contains',
    hints: [
      'Import the requests library first.',
      'requests.get(url) makes the GET request.',
      'import requests\nresponse = requests.get("https://api.example.com/data")',
    ],
    solution: 'import requests\nresponse = requests.get("https://api.example.com/data")\n# data = response.json()\n# print(response.status_code)',
    explanation:
      'requests.get(url) sends an HTTP GET request and returns a Response object. response.json() parses the JSON body. response.status_code gives 200 for success, 404 for not found, 500 for server error.',
  },
  {
    id: 57,
    phase: 3,
    levelMode: 'theory',
    title: 'API Authentication (Theory)',
    concept: 'API keys, Authorization headers',
    description:
      'Most APIs require authentication. Common methods: API key in headers, Bearer tokens, OAuth. The Authorization header is standard. Never commit API keys to version control — use environment variables.',
    task: 'Write code setting up a headers dictionary with an Authorization key containing "Bearer MY_API_KEY".',
    starterCode: '# API authentication\n# Write headers dict with Authorization\n',
    expectedOutput: 'Authorization',
    validationMode: 'contains',
    hints: [
      'Create a dict with an "Authorization" key.',
      'The value format is: "Bearer <your_token>"',
      'headers = {\n    "Authorization": "Bearer MY_API_KEY"\n}',
    ],
    solution: 'headers = {\n    "Authorization": "Bearer MY_API_KEY"\n}\n# import requests\n# response = requests.get(url, headers=headers)',
    explanation:
      'The Authorization header with "Bearer <token>" is the OAuth 2.0 standard. Pass headers=headers to requests.get() or requests.post(). API keys should come from os.environ["API_KEY"] not hardcoded strings.',
  },
  {
    id: 58,
    phase: 3,
    levelMode: 'theory',
    title: 'Web Scraping (Theory)',
    concept: 'BeautifulSoup, HTML parsing',
    description:
      'Web scraping extracts data from websites. BeautifulSoup parses HTML. requests fetches the page; BeautifulSoup navigates it. Use soup.find(), soup.find_all(), and CSS selectors to locate elements. Always check a site\'s robots.txt before scraping.',
    task: 'Write code that imports BeautifulSoup and creates a soup object by parsing the HTML string "<h1>Hello</h1>".',
    starterCode: '# Web scraping concepts\n# Import BeautifulSoup and parse HTML\n',
    expectedOutput: 'BeautifulSoup',
    validationMode: 'contains',
    hints: [
      'from bs4 import BeautifulSoup',
      'BeautifulSoup(html, "html.parser") parses HTML.',
      'from bs4 import BeautifulSoup\nhtml = "<h1>Hello</h1>"\nsoup = BeautifulSoup(html, "html.parser")',
    ],
    solution: 'from bs4 import BeautifulSoup\n\nhtml = "<h1>Hello</h1>"\nsoup = BeautifulSoup(html, "html.parser")\n# print(soup.find("h1").text)  # Would print "Hello"',
    explanation:
      'BeautifulSoup(html, "html.parser") creates a navigable tree. soup.find("h1") finds the first h1 tag. .text extracts the text content. You can also use soup.select("div.class") for CSS selectors.',
  },
  {
    id: 59,
    phase: 3,
    levelMode: 'theory',
    title: 'Selenium (Theory)',
    concept: 'Browser automation, WebDriver',
    description:
      'Selenium automates web browsers — clicking buttons, filling forms, navigating pages. It requires a WebDriver (ChromeDriver, GeckoDriver) matching your browser version. Useful for testing and scraping JavaScript-heavy sites.',
    task: 'Write Selenium code to create a Chrome driver and use find_element to locate an element by ID "search".',
    starterCode: '# Selenium browser automation\n# Write WebDriver setup and find_element code\n',
    expectedOutput: 'find_element',
    validationMode: 'contains',
    hints: [
      'from selenium import webdriver',
      'driver = webdriver.Chrome()',
      'from selenium import webdriver\nfrom selenium.webdriver.common.by import By\ndriver = webdriver.Chrome()\nelement = driver.find_element(By.ID, "search")',
    ],
    solution: 'from selenium import webdriver\nfrom selenium.webdriver.common.by import By\n\ndriver = webdriver.Chrome()\n# driver.get("https://example.com")\nelement = driver.find_element(By.ID, "search")\n# element.send_keys("Python")\n# driver.quit()',
    explanation:
      'webdriver.Chrome() launches Chrome. find_element(By.ID, "search") locates the element with id="search". send_keys() types text. driver.quit() closes the browser. Always quit() to free resources.',
  },
  {
    id: 60,
    phase: 3,
    levelMode: 'theory',
    title: 'Flask Web Dev (Theory)',
    concept: 'Flask routes, decorators',
    description:
      'Flask is a lightweight Python web framework. Routes map URLs to functions using the @app.route() decorator. The function returns the response content. Flask runs a development server with app.run().',
    task: 'Write a Flask app with a route "/" that returns "Hello, Flask!". Include the import and @app.route("/") decorator.',
    starterCode: '# Flask web framework\n# Write a basic Flask route\n',
    expectedOutput: '@app.route',
    validationMode: 'contains',
    hints: [
      'from flask import Flask',
      'app = Flask(__name__)',
      'from flask import Flask\napp = Flask(__name__)\n@app.route("/")\ndef home():\n    return "Hello, Flask!"',
    ],
    solution: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Hello, Flask!"\n\n# if __name__ == "__main__":\n#     app.run(debug=True)',
    explanation:
      '@app.route("/") registers the "/" URL to the home() function. When a browser visits /, Flask calls home() and returns its result as the HTTP response. __name__ == "__main__" ensures the server only starts when run directly.',
  },
  {
    id: 61,
    phase: 3,
    levelMode: 'code',
    title: 'Python Decorators',
    concept: 'Decorator syntax, function wrapping',
    description:
      'Decorators are functions that wrap other functions to add behaviour. Use @decorator_name above a function definition. They are the basis of Flask routes, Django views, and many frameworks.',
    task: 'Create a decorator log_call that prints "Function executed" after calling the decorated function. Decorate a function hello() that prints "Hello!".',
    starterCode: '# Python decorators\n',
    expectedOutput: 'Hello!\nFunction executed',
    validationMode: 'exact',
    hints: [
      'A decorator is a function that takes a function and returns a function.',
      'def log_call(func):\n    def wrapper():\n        func()\n        print("Function executed")\n    return wrapper',
      '@log_call\ndef hello():\n    print("Hello!")\nhello()',
    ],
    solution: 'def log_call(func):\n    def wrapper():\n        func()\n        print("Function executed")\n    return wrapper\n\n@log_call\ndef hello():\n    print("Hello!")\n\nhello()',
    explanation:
      'log_call takes hello as func. wrapper() calls func() then prints. @log_call is syntactic sugar for hello = log_call(hello). Calling hello() actually calls wrapper().',
  },
  {
    id: 62,
    phase: 3,
    levelMode: 'code',
    title: 'Closures',
    concept: 'Inner functions, captured state',
    description:
      'A closure is a function that remembers the variables from its enclosing scope even after that scope has finished. Inner functions capture (close over) variables from their outer function.',
    task: 'Create a make_counter() function that returns an inner function. Each call to the returned function increments and prints a count from 1.',
    starterCode: '# Closures\n',
    expectedOutput: '1\n2\n3',
    validationMode: 'exact',
    hints: [
      'Use a list [0] or nonlocal to create mutable captured state.',
      'def make_counter():\n    count = [0]\n    def counter():\n        count[0] += 1\n        print(count[0])\n    return counter',
      'counter = make_counter()\ncounter()\ncounter()\ncounter()',
    ],
    solution: 'def make_counter():\n    count = [0]\n    def counter():\n        count[0] += 1\n        print(count[0])\n    return counter\n\ncounter = make_counter()\ncounter()\ncounter()\ncounter()',
    explanation:
      'count = [0] uses a list because lists are mutable — inner functions can modify list contents. Each call to counter() increments count[0]. The counter function "closes over" the count list.',
  },
  {
    id: 63,
    phase: 3,
    levelMode: 'code',
    title: 'Generators',
    concept: 'yield keyword, lazy evaluation',
    description:
      'Generators produce values lazily — one at a time on demand. Use yield instead of return. They are memory-efficient for large sequences. next() gets the next value; for loops work automatically.',
    task: 'Write a fibonacci() generator that yields Fibonacci numbers. Print the first 5 values.',
    starterCode: '# Generators with yield\n',
    expectedOutput: '0\n1\n1\n2\n3',
    validationMode: 'exact',
    hints: [
      'Keep track of a and b; yield a, then update a, b = b, a+b.',
      'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b',
      'gen = fibonacci()\nfor _ in range(5):\n    print(next(gen))',
    ],
    solution: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ngen = fibonacci()\nfor _ in range(5):\n    print(next(gen))',
    explanation:
      'yield pauses execution and returns a value. Next time next() is called, execution resumes after yield. The infinite while True is fine because we only call next() 5 times. Fibonacci: 0,1,1,2,3,5,8...',
  },
  {
    id: 64,
    phase: 3,
    levelMode: 'theory',
    title: 'Tkinter GUI (Theory)',
    concept: 'Tkinter, desktop GUI apps',
    description:
      'Tkinter is Python\'s standard GUI library. Create windows, buttons, labels, and input fields. The event loop (mainloop()) keeps the window open and responds to user interactions. Cannot run in browser environments.',
    task: 'Write Tkinter code that creates a window with title "My App". Include Tk() initialisation and mainloop() call.',
    starterCode: '# Tkinter desktop GUI\n# Write window creation code\n',
    expectedOutput: 'Tk()',
    validationMode: 'contains',
    hints: [
      'import tkinter as tk',
      'root = tk.Tk() creates the main window.',
      'import tkinter as tk\nroot = tk.Tk()\nroot.title("My App")\nroot.mainloop()',
    ],
    solution: 'import tkinter as tk\n\nroot = tk.Tk()\nroot.title("My App")\n# tk.Label(root, text="Hello!").pack()\n# tk.Button(root, text="Click me").pack()\nroot.mainloop()',
    explanation:
      'tk.Tk() creates the root window. title() sets the window title. mainloop() starts the event loop — the program waits for user interactions. Widgets like Label and Button are added to root with .pack() to arrange them.',
  },
  {
    id: 65,
    phase: 3,
    levelMode: 'theory',
    title: 'Command Line Args (Theory)',
    concept: 'argparse, sys.argv',
    description:
      'Command line arguments allow users to configure your program when running it. sys.argv is a list of arguments. argparse provides structured argument parsing with help text, types, and defaults.',
    task: 'Write code using argparse to create a parser that accepts a "--name" argument with help text.',
    starterCode: '# Command line arguments\n# Write argparse setup code\n',
    expectedOutput: 'argparse',
    validationMode: 'contains',
    hints: [
      'import argparse',
      'parser = argparse.ArgumentParser()',
      'import argparse\nparser = argparse.ArgumentParser(description="My app")\nparser.add_argument("--name", help="Your name")',
    ],
    solution: 'import argparse\n\nparser = argparse.ArgumentParser(description="My app")\nparser.add_argument("--name", help="Your name", default="World")\n# args = parser.parse_args()\n# print(f"Hello, {args.name}!")',
    explanation:
      'argparse.ArgumentParser() creates the parser. add_argument("--name") registers an optional argument. help= provides the description shown with --help. parse_args() processes the command line and returns a Namespace object.',
  },
]
