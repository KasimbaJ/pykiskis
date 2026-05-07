import type { Level } from '../../types'

export const phase5Levels: Level[] = [
  {
    id: 86,
    phase: 5,
    levelMode: 'code',
    title: 'Morse Code Converter',
    concept: 'Dict mapping, string iteration',
    description:
      'Morse code maps each letter to a sequence of dots and dashes. Build a dictionary lookup and iterate over characters to convert text to morse. Spaces between letters use spaces, words use slashes.',
    task: 'Convert "HELLO" to Morse code using a dictionary. Each letter separated by space. Print the result.',
    starterCode: '# Morse code converter\nMORSE = {\n    "H": "....", "E": ".", "L": ".-..", "O": "---"\n}\n',
    expectedOutput: '.... . .-.. .-.. ---',
    validationMode: 'exact',
    hints: [
      'Iterate over each character in "HELLO" and look it up in MORSE.',
      'Use " ".join() to separate letters with spaces.',
      'MORSE = {"H":"....","E":".","L":".-..","O":"---"}\nprint(" ".join(MORSE[c] for c in "HELLO"))',
    ],
    solution: 'MORSE = {"H": "....", "E": ".", "L": ".-..", "O": "---"}\nprint(" ".join(MORSE[c] for c in "HELLO"))',
    explanation:
      'A generator expression iterates "HELLO", looks up each letter in MORSE, and " ".join() places spaces between each code. H=...., E=., L=.-.., L=.-.., O=---.',
  },
  {
    id: 87,
    phase: 5,
    levelMode: 'code',
    title: 'Caesar Cipher',
    concept: 'chr(), ord(), modular arithmetic',
    description:
      'The Caesar cipher shifts each letter by a fixed amount. Use ord() to get ASCII value, add the shift, wrap with modulo 26 to stay within alphabet bounds, then chr() to convert back.',
    task: 'Encrypt "hello" with a shift of 3 using the Caesar cipher. Print the encrypted text.',
    starterCode: '# Caesar cipher encryption\n',
    expectedOutput: 'khoor',
    validationMode: 'exact',
    hints: [
      'ord("a") = 97. Shift each letter by 3.',
      'chr((ord(c) - ord("a") + shift) % 26 + ord("a"))',
      'shift=3\nresult="".join(chr((ord(c)-97+shift)%26+97) for c in "hello")\nprint(result)',
    ],
    solution: 'shift = 3\nresult = "".join(chr((ord(c) - 97 + shift) % 26 + 97) for c in "hello")\nprint(result)',
    explanation:
      'ord(c) - 97 maps a→0, b→1... z→25. Adding shift=3 and % 26 wraps around. + 97 maps back to ASCII. h→k, e→h, l→o, l→o, o→r → "khoor".',
  },
  {
    id: 88,
    phase: 5,
    levelMode: 'code',
    title: 'Tic Tac Toe Logic',
    concept: '2D list, win condition checking',
    description:
      'Game logic often involves checking win conditions across rows, columns, and diagonals. Model the board as a 2D list and write functions to check each direction.',
    task: 'Check if X wins on board [["X","O","O"],["O","X","O"],["O","O","X"]] (diagonal win). Print "X wins!".',
    starterCode: '# Tic Tac Toe win check\nboard = [["X","O","O"],["O","X","O"],["O","O","X"]]\n',
    expectedOutput: 'X wins!',
    validationMode: 'exact',
    hints: [
      'Check the main diagonal: board[0][0], board[1][1], board[2][2].',
      'If all three are "X", X wins.',
      'board=[["X","O","O"],["O","X","O"],["O","O","X"]]\nif board[0][0]==board[1][1]==board[2][2]=="X":\n    print("X wins!")',
    ],
    solution: 'board = [["X", "O", "O"], ["O", "X", "O"], ["O", "O", "X"]]\nif board[0][0] == board[1][1] == board[2][2] == "X":\n    print("X wins!")',
    explanation:
      'The main diagonal is (0,0), (1,1), (2,2). All are "X" so X wins. Python allows chained comparisons: a == b == c checks all at once.',
  },
  {
    id: 89,
    phase: 5,
    levelMode: 'code',
    title: 'Hangman Word Check',
    concept: 'Sets, string operations, game state',
    description:
      'Hangman tracks which letters have been guessed. Use a set for efficient lookup. Build the display by showing guessed letters and underscores for missing ones.',
    task: 'Word is "hello". Guessed letters are {"h", "l"}. Print each character showing the letter if guessed, else "_", with count of remaining letters in parentheses.',
    starterCode: '# Hangman word checker\nword = "hello"\nguessed = {"h", "l"}\n',
    expectedOutput: 'h_ll_ (2 remaining)',
    validationMode: 'exact',
    hints: [
      'Build display: letter if letter in guessed else "_".',
      'Count remaining = letters NOT yet guessed.',
      'word="hello"\nguessed={"h","l"}\ndisplay="".join(c if c in guessed else "_" for c in word)\nremaining=len(set(word)-guessed)\nprint(f"{display} ({remaining} remaining)")',
    ],
    solution: 'word = "hello"\nguessed = {"h", "l"}\ndisplay = "".join(c if c in guessed else "_" for c in word)\nremaining = len(set(word) - guessed)\nprint(f"{display} ({remaining} remaining)")',
    explanation:
      '"hello" has unique letters: h,e,l,o. Guessed: h,l. Remaining: e,o (2). Display: h→h, e→_, l→l, l→l, o→_ → "h_ll_". set(word) - guessed gives unguessed unique letters.',
  },
  {
    id: 90,
    phase: 5,
    levelMode: 'code',
    title: 'Password Generator',
    concept: 'random, string module, character sets',
    description:
      'Strong passwords mix uppercase letters, lowercase letters, and digits. Python\'s string module provides these character sets. random.choices() picks random characters. random.seed() makes results reproducible for testing.',
    task: 'Generate a 12-character password using seed(99). Print its length and whether it contains at least one digit.',
    starterCode: '# Password generator\nimport random\nimport string\n',
    expectedOutput: '12\nTrue',
    validationMode: 'exact',
    hints: [
      'chars = string.ascii_letters + string.digits + string.punctuation',
      'random.choices(chars, k=12) picks 12 random characters.',
      'random.seed(99)\nchars=string.ascii_letters+string.digits\npwd="".join(random.choices(chars,k=12))\nprint(len(pwd))\nprint(any(c.isdigit() for c in pwd))',
    ],
    solution: 'import random\nimport string\n\nrandom.seed(99)\nchars = string.ascii_letters + string.digits\npwd = "".join(random.choices(chars, k=12))\nprint(len(pwd))\nprint(any(c.isdigit() for c in pwd))',
    explanation:
      'string.ascii_letters = a-z + A-Z. string.digits = 0-9. random.choices() samples with replacement. any(c.isdigit() for c in pwd) checks if any character is a digit. With seed(99), the result is deterministic.',
  },
  {
    id: 91,
    phase: 5,
    levelMode: 'code',
    title: 'Number Guessing Game',
    concept: 'random, loops, game simulation',
    description:
      'A number guessing game picks a secret number and asks the player to guess. The game tracks attempts and gives hints. Simulate automated gameplay with a deterministic strategy.',
    task: 'Secret number is 2 (seed=42, randint(1,10)). Guess numbers 1,2,3... until found. Print "Found 2 in {attempts} guesses".',
    starterCode: '# Number guessing game simulation\nimport random\nrandom.seed(42)\nsecret = random.randint(1, 10)\n',
    expectedOutput: 'Found 2 in 2 guesses',
    validationMode: 'exact',
    hints: [
      'Loop from 1 upward, increment attempts each guess.',
      'Break when guess == secret.',
      'random.seed(42)\nsecret=random.randint(1,10)\nfor attempts,guess in enumerate(range(1,11),1):\n    if guess==secret:\n        print(f"Found {secret} in {attempts} guesses")\n        break',
    ],
    solution: 'import random\nrandom.seed(42)\nsecret = random.randint(1, 10)\n\nfor attempts, guess in enumerate(range(1, 11), 1):\n    if guess == secret:\n        print(f"Found {secret} in {attempts} guesses")\n        break',
    explanation:
      'seed(42) makes randint(1,10) return 2 deterministically. We guess 1,2,3... The 2nd guess is 2 which equals secret. enumerate(..., 1) starts counting at 1.',
  },
  {
    id: 92,
    phase: 5,
    levelMode: 'code',
    title: 'Contact Book',
    concept: 'Dict of dicts, CRUD operations',
    description:
      'A contact book stores names mapped to contact details. Implement CRUD: Create (add), Read (search), Update (modify), Delete (remove). Using nested dicts provides flexible structure.',
    task: 'Create contacts dict. Add Alice with email "alice@mail.com". Search for Alice and print her email.',
    starterCode: '# Contact book\ncontacts = {}\n',
    expectedOutput: 'alice@mail.com',
    validationMode: 'exact',
    hints: [
      'contacts["Alice"] = {"email": "alice@mail.com"}',
      'contacts["Alice"]["email"] accesses the email.',
      'contacts={}\ncontacts["Alice"]={"email":"alice@mail.com"}\nprint(contacts["Alice"]["email"])',
    ],
    solution: 'contacts = {}\ncontacts["Alice"] = {"email": "alice@mail.com"}\nprint(contacts["Alice"]["email"])',
    explanation:
      'contacts["Alice"] creates a key "Alice" mapping to a nested dict. ["email"] accesses the email field. This pattern scales to add phone, address, and other fields easily.',
  },
  {
    id: 93,
    phase: 5,
    levelMode: 'code',
    title: 'Student Grade Analyzer',
    concept: 'Pandas for educational data',
    description:
      'Analysing class performance is a common real-world task. Pandas makes it easy to compute statistics, find top performers, and identify students who need help.',
    task: 'Create a DataFrame of students (Alice:90, Bob:75, Carol:85). Print class average then top scorer\'s name.',
    starterCode: '# Student grade analysis\nimport pandas as pd\n',
    expectedOutput: '83.33333333333333\nAlice',
    validationMode: 'contains',
    hints: [
      'df["score"].mean() for average.',
      'df.loc[df["score"].idxmax(), "name"] for top scorer.',
      'df=pd.DataFrame({"name":["Alice","Bob","Carol"],"score":[90,75,85]})\nprint(df["score"].mean())\nprint(df.loc[df["score"].idxmax(),"name"])',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Alice", "Bob", "Carol"], "score": [90, 75, 85]})\nprint(df["score"].mean())\nprint(df.loc[df["score"].idxmax(), "name"])',
    explanation:
      'mean() = (90+75+85)/3 = 83.33. idxmax() returns the index of the maximum value. loc[index, "name"] gets the name at that index — Alice with 90.',
  },
  {
    id: 94,
    phase: 5,
    levelMode: 'code',
    title: 'Text Statistics Tool',
    concept: 'String methods, collections.Counter',
    description:
      'Text analysis counts words, sentences, and finds the most common words. split() tokenises text. Count sentences with punctuation. Counter finds word frequencies.',
    task: 'Analyse "the cat sat on the mat the cat". Print word count, then the most common word.',
    starterCode: '# Text statistics\nfrom collections import Counter\n',
    expectedOutput: '8\nthe',
    validationMode: 'exact',
    hints: [
      'text.split() gives word list. len() counts.',
      'Counter(words).most_common(1)[0][0] gives top word.',
      'text="the cat sat on the mat the cat"\nwords=text.split()\nprint(len(words))\nprint(Counter(words).most_common(1)[0][0])',
    ],
    solution: 'from collections import Counter\n\ntext = "the cat sat on the mat the cat"\nwords = text.split()\nprint(len(words))\nprint(Counter(words).most_common(1)[0][0])',
    explanation:
      '"the cat sat on the mat the cat" has 8 words. Counter counts: the(3), cat(2), sat(1), on(1), mat(1). most_common(1) returns [("the", 3)]. [0][0] extracts "the".',
  },
  {
    id: 95,
    phase: 5,
    levelMode: 'code',
    title: 'Matrix Operations',
    concept: 'NumPy determinant, linear algebra',
    description:
      'The determinant of a 2x2 matrix [[a,b],[c,d]] is ad - bc. Determinants are used in solving linear equations, checking if a matrix is invertible, and computing cross products.',
    task: 'Compute the determinant of [[1,2],[3,4]] manually (ad-bc formula) and print it as a float.',
    starterCode: '# Matrix determinant\n',
    expectedOutput: '-2.0',
    validationMode: 'exact',
    hints: [
      'det = a*d - b*c for [[a,b],[c,d]]',
      '[[1,2],[3,4]]: det = 1*4 - 2*3',
      'a,b,c,d = 1,2,3,4\ndet = a*d - b*c\nprint(float(det))',
    ],
    solution: 'a, b, c, d = 1, 2, 3, 4\ndet = a * d - b * c\nprint(float(det))',
    explanation:
      'det([[1,2],[3,4]]) = 1×4 - 2×3 = 4 - 6 = -2. float(-2) gives -2.0. A non-zero determinant means the matrix is invertible. numpy.linalg.det() would give the same result.',
  },
  {
    id: 96,
    phase: 5,
    levelMode: 'code',
    title: 'Sales Data Visualizer',
    concept: 'Data analysis, argmax',
    description:
      'Before visualising data, you need to understand it. Finding peaks, trends, and anomalies in data guides what chart type to use and what story to tell.',
    task: 'Given monthly sales data, find and print the month with highest sales.',
    starterCode: '# Sales data analysis\nsales = {"Jan": 120, "Feb": 95, "March": 180, "Apr": 150}\n',
    expectedOutput: 'March',
    validationMode: 'exact',
    hints: [
      'max(sales, key=sales.get) finds the key with the highest value.',
      'Or use max(sales.items(), key=lambda x: x[1])[0]',
      'sales={"Jan":120,"Feb":95,"March":180,"Apr":150}\nprint(max(sales,key=sales.get))',
    ],
    solution: 'sales = {"Jan": 120, "Feb": 95, "March": 180, "Apr": 150}\nprint(max(sales, key=sales.get))',
    explanation:
      'max(dict, key=dict.get) iterates over dict keys and returns the one with the highest value. March has 180 which is the highest. This pattern avoids needing pandas for simple dict operations.',
  },
  {
    id: 97,
    phase: 5,
    levelMode: 'code',
    title: 'Todo List Data Model',
    concept: 'OOP, list management, CRUD',
    description:
      'A todo list is a classic CRUD application. Model it with a class that wraps a list. Methods implement the operations: add, complete, list pending. This is the foundation of many real apps.',
    task: 'Build a TodoList class with add(task) and complete(task) methods. Add 3 tasks, complete 1, and print the count of pending tasks.',
    starterCode: '# Todo list data model\n',
    expectedOutput: '2',
    validationMode: 'exact',
    hints: [
      'Store tasks as {"task": name, "done": False}.',
      'complete() sets done=True.',
      'class TodoList:\n    def __init__(self):\n        self.tasks=[]\n    def add(self,t):\n        self.tasks.append({"task":t,"done":False})\n    def complete(self,t):\n        for item in self.tasks:\n            if item["task"]==t:\n                item["done"]=True\ntl=TodoList()\ntl.add("A")\ntl.add("B")\ntl.add("C")\ntl.complete("A")\nprint(sum(1 for t in tl.tasks if not t["done"]))',
    ],
    solution: 'class TodoList:\n    def __init__(self):\n        self.tasks = []\n\n    def add(self, task):\n        self.tasks.append({"task": task, "done": False})\n\n    def complete(self, task):\n        for item in self.tasks:\n            if item["task"] == task:\n                item["done"] = True\n\ntl = TodoList()\ntl.add("Buy groceries")\ntl.add("Read book")\ntl.add("Exercise")\ntl.complete("Buy groceries")\nprint(sum(1 for t in tl.tasks if not t["done"]))',
    explanation:
      '3 tasks added. 1 completed. 2 pending. sum(1 for t in tl.tasks if not t["done"]) counts tasks where done is False. This OOP pattern is cleaner than managing a plain list.',
  },
  {
    id: 98,
    phase: 5,
    levelMode: 'code',
    title: 'Mini Database',
    concept: 'SQLite full CRUD, UPDATE, SELECT',
    description:
      'A complete database application performs all CRUD operations: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). This covers the full lifecycle of data management.',
    task: 'Create a students table, insert Alice with score 90, update her score to 95, then query and print "Alice: 95".',
    starterCode: '# Full SQLite CRUD\nimport sqlite3\n',
    expectedOutput: 'Alice: 95',
    validationMode: 'exact',
    hints: [
      'UPDATE students SET score=95 WHERE name="Alice"',
      'fetchone() returns the row; format with f-string.',
      'conn=sqlite3.connect(":memory:")\nc=conn.cursor()\nc.execute("CREATE TABLE students(name TEXT,score INT)")\nc.execute("INSERT INTO students VALUES(?,?)",("Alice",90))\nc.execute("UPDATE students SET score=95 WHERE name=\'Alice\'")\nconn.commit()\nc.execute("SELECT name,score FROM students")\nr=c.fetchone()\nprint(f"{r[0]}: {r[1]}")',
    ],
    solution: 'import sqlite3\n\nconn = sqlite3.connect(":memory:")\nc = conn.cursor()\nc.execute("CREATE TABLE students (name TEXT, score INT)")\nc.execute("INSERT INTO students VALUES (?, ?)", ("Alice", 90))\nc.execute("UPDATE students SET score = 95 WHERE name = \'Alice\'")\nconn.commit()\nc.execute("SELECT name, score FROM students")\nrow = c.fetchone()\nprint(f"{row[0]}: {row[1]}")',
    explanation:
      'INSERT adds the row. UPDATE changes score from 90 to 95. commit() persists changes. SELECT retrieves the row. fetchone() gives ("Alice", 95). f-string formats the output.',
  },
  {
    id: 99,
    phase: 5,
    levelMode: 'code',
    title: 'Regression Analysis',
    concept: 'sklearn, RMSE, model evaluation',
    description:
      'RMSE (Root Mean Squared Error) measures prediction accuracy. Lower is better. Use it alongside R² to evaluate regression models. sklearn\'s mean_squared_error() computes MSE; take sqrt for RMSE.',
    task: 'Train a regression model on house sizes vs prices. Print RMSE rounded to 1 decimal place.',
    starterCode: '# Regression analysis\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n',
    expectedOutput: '0.0',
    validationMode: 'exact',
    hints: [
      'Use perfectly linear data so RMSE = 0.',
      'np.sqrt(mean_squared_error(y, predictions))',
      'X=np.array([[1],[2],[3],[4],[5]])\ny=[100,200,300,400,500]\nmodel=LinearRegression().fit(X,y)\npreds=model.predict(X)\nrmse=np.sqrt(mean_squared_error(y,preds))\nprint(round(rmse,1))',
    ],
    solution: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = [100, 200, 300, 400, 500]\nmodel = LinearRegression()\nmodel.fit(X, y)\npredictions = model.predict(X)\nrmse = np.sqrt(mean_squared_error(y, predictions))\nprint(round(rmse, 1))',
    explanation:
      'With perfectly linear data (y=100x), the model fits exactly. Predictions equal true values, so errors = 0, RMSE = 0.0. In real data, RMSE tells you the average prediction error in the same units as y.',
  },
  {
    id: 100,
    phase: 5,
    levelMode: 'code',
    title: 'Final Capstone',
    concept: 'Comprehensive Python — classes, data, stats',
    description:
      'Combine everything learned: classes, data structures, statistics, and formatted output. This capstone project creates a student management system that tracks grades and computes class statistics.',
    task: 'Create a Classroom class. Add students Alice(90), Bob(75), Carol(85). Print "Class average: 83.33" and "Top student: Alice".',
    starterCode: '# Final capstone project\n',
    expectedOutput: 'Class average: 83.33\nTop student: Alice',
    validationMode: 'exact',
    hints: [
      'Store students as a list of dicts or objects.',
      'Compute average with sum(scores)/len(scores).',
      'class Classroom:\n    def __init__(self):\n        self.students=[]\n    def add(self,name,score):\n        self.students.append({"name":name,"score":score})\n    def average(self):\n        return sum(s["score"] for s in self.students)/len(self.students)\n    def top(self):\n        return max(self.students,key=lambda s:s["score"])["name"]\ncl=Classroom()\ncl.add("Alice",90)\ncl.add("Bob",75)\ncl.add("Carol",85)\nprint(f"Class average: {cl.average():.2f}")\nprint(f"Top student: {cl.top()}")',
    ],
    solution: 'class Classroom:\n    def __init__(self):\n        self.students = []\n\n    def add(self, name, score):\n        self.students.append({"name": name, "score": score})\n\n    def average(self):\n        return sum(s["score"] for s in self.students) / len(self.students)\n\n    def top(self):\n        return max(self.students, key=lambda s: s["score"])["name"]\n\ncl = Classroom()\ncl.add("Alice", 90)\ncl.add("Bob", 75)\ncl.add("Carol", 85)\nprint(f"Class average: {cl.average():.2f}")\nprint(f"Top student: {cl.top()}")',
    explanation:
      'average() sums scores and divides by count: (90+75+85)/3=83.33. :.2f in the f-string formats to 2 decimal places. max() with key=lambda finds the student dict with highest score. Congratulations — you\'ve completed all 100 levels!',
  },
]
