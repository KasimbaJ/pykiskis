import type { Level } from '../../types'

export const phase4Levels: Level[] = [
  {
    id: 66,
    phase: 4,
    levelMode: 'code',
    title: 'DataFrames Deep Dive',
    concept: 'DataFrame creation, info, shape',
    description:
      'Pandas DataFrames are the core data structure for data analysis. shape gives (rows, cols). columns gives column names. dtypes shows data types. info() prints a summary.',
    task: 'Create a DataFrame with columns name, age, score for 4 people. Print shape then list(df.columns).',
    starterCode: '# Pandas DataFrame deep dive\nimport pandas as pd\n',
    expectedOutput: "(4, 3)\n['name', 'age', 'score']",
    validationMode: 'exact',
    hints: [
      'Create DF with 4 rows and 3 columns.',
      'Print df.shape then print(list(df.columns))',
      'df = pd.DataFrame({"name":["A","B","C","D"],"age":[20,25,30,35],"score":[80,85,90,95]})\nprint(df.shape)\nprint(list(df.columns))',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Alice", "Bob", "Carol", "Dave"],\n    "age": [20, 25, 30, 35],\n    "score": [80, 85, 90, 95]\n})\nprint(df.shape)\nprint(list(df.columns))',
    explanation:
      'df.shape returns (4, 3) — 4 rows, 3 columns. df.columns is an Index object; list() converts it to a plain Python list for cleaner output.',
  },
  {
    id: 67,
    phase: 4,
    levelMode: 'code',
    title: 'Data Cleaning',
    concept: 'dropna(), fillna(), handling missing values',
    description:
      'Real datasets have missing values (NaN). dropna() removes rows/columns with NaN. fillna(value) replaces NaN with a value. isna().sum() counts missing values per column.',
    task: 'Create a DataFrame with a NaN in it, drop rows with NaN, and print the number of remaining rows.',
    starterCode: '# Data cleaning\nimport pandas as pd\nimport numpy as np\n',
    expectedOutput: '3',
    validationMode: 'exact',
    hints: [
      'Use np.nan to create missing values.',
      'df.dropna() removes rows with any NaN.',
      'df = pd.DataFrame({"a":[1,2,np.nan,4],"b":[5,6,7,8]})\nclean = df.dropna()\nprint(len(clean))',
    ],
    solution: 'import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({"a": [1, 2, np.nan, 4], "b": [5, 6, 7, 8]})\nclean = df.dropna()\nprint(len(clean))',
    explanation:
      'Row 2 has NaN in column a. dropna() removes it, leaving 3 rows. len(df) counts rows. You can also use df.dropna(inplace=True) to modify in place.',
  },
  {
    id: 68,
    phase: 4,
    levelMode: 'code',
    title: 'Sorting DataFrames',
    concept: 'sort_values(), ascending/descending',
    description:
      'sort_values(by="column") sorts rows by a column. ascending=False sorts descending. You can sort by multiple columns. iloc[0] gets the first row after sorting.',
    task: 'Create a DataFrame of students with scores. Sort by score descending and print the name of the top scorer.',
    starterCode: '# Sorting DataFrames\nimport pandas as pd\n',
    expectedOutput: 'Alice',
    validationMode: 'exact',
    hints: [
      'df.sort_values("score", ascending=False)',
      'After sorting, iloc[0]["name"] gives the top name.',
      'df = pd.DataFrame({"name":["Bob","Alice","Carol"],"score":[85,95,75]})\nprint(df.sort_values("score",ascending=False).iloc[0]["name"])',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Bob", "Alice", "Carol"], "score": [85, 95, 75]})\nsorted_df = df.sort_values("score", ascending=False)\nprint(sorted_df.iloc[0]["name"])',
    explanation:
      'sort_values("score", ascending=False) puts highest score first. iloc[0] selects the first row (Alice with 95). ["name"] gets the name from that row.',
  },
  {
    id: 69,
    phase: 4,
    levelMode: 'code',
    title: 'Pandas Arithmetic',
    concept: 'Column operations, derived columns',
    description:
      'You can perform arithmetic on entire columns at once. Adding a new column is as simple as df["new_col"] = df["col1"] + df["col2"]. Use .mean(), .sum(), .max(), .min() for aggregations.',
    task: 'Create a DataFrame with price and quantity columns. Add a total column (price * quantity) and print its mean rounded to 1 decimal.',
    starterCode: '# Pandas column arithmetic\nimport pandas as pd\n',
    expectedOutput: '75.0',
    validationMode: 'exact',
    hints: [
      'df["total"] = df["price"] * df["quantity"]',
      'df["total"].mean() computes the average.',
      'df=pd.DataFrame({"price":[50,100,75],"quantity":[1,1,1]})\ndf["total"]=df["price"]*df["quantity"]\nprint(round(df["total"].mean(),1))',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({"price": [50, 100, 75], "quantity": [1, 1, 1]})\ndf["total"] = df["price"] * df["quantity"]\nprint(round(df["total"].mean(), 1))',
    explanation:
      'Totals: 50*1=50, 100*1=100, 75*1=75. Mean = (50+100+75)/3 = 225/3 = 75.0. round(75.0, 1) = 75.0. Column arithmetic applies the operation element-wise across the entire column.',
  },
  {
    id: 70,
    phase: 4,
    levelMode: 'code',
    title: 'Pivot Tables',
    concept: 'pivot_table(), aggregations',
    description:
      'Pivot tables summarise data by grouping rows and computing aggregations. Similar to Excel pivot tables. pivot_table(values, index, columns, aggfunc) reshapes and aggregates data.',
    task: 'Create sales data with region (North/South) and product (A/B) columns and a sales column. Print the shape of a pivot_table grouping by region.',
    starterCode: '# Pivot tables\nimport pandas as pd\n',
    expectedOutput: '(2, 2)',
    validationMode: 'exact',
    hints: [
      'pivot_table(values="sales", index="region", columns="product", aggfunc="sum")',
      'Two regions and two products means shape (2, 2).',
      'df=pd.DataFrame({"region":["N","N","S","S"],"product":["A","B","A","B"],"sales":[10,20,30,40]})\npt=df.pivot_table(values="sales",index="region",columns="product",aggfunc="sum")\nprint(pt.shape)',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "region": ["North", "North", "South", "South"],\n    "product": ["A", "B", "A", "B"],\n    "sales": [10, 20, 30, 40]\n})\npt = df.pivot_table(values="sales", index="region", columns="product", aggfunc="sum")\nprint(pt.shape)',
    explanation:
      'The pivot table has 2 unique regions as rows and 2 unique products as columns, so shape is (2, 2). aggfunc="sum" means overlapping entries are summed.',
  },
  {
    id: 71,
    phase: 4,
    levelMode: 'code',
    title: 'Method Chaining',
    concept: 'Chaining pandas operations',
    description:
      'Method chaining applies multiple operations in sequence on one line, making code more readable. Each method returns a DataFrame/Series, enabling the next method call.',
    task: 'Create a DataFrame of students with scores. Chain: filter scores > 80, sort by score descending, select the name column. Print the first name.',
    starterCode: '# Method chaining\nimport pandas as pd\n',
    expectedOutput: 'Alice',
    validationMode: 'exact',
    hints: [
      'df[df["score"] > 80].sort_values("score", ascending=False)["name"]',
      '.iloc[0] gets the first element.',
      'df=pd.DataFrame({"name":["Alice","Bob","Carol"],"score":[95,75,85]})\nresult=df[df["score"]>80].sort_values("score",ascending=False)["name"].iloc[0]\nprint(result)',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Alice", "Bob", "Carol"], "score": [95, 75, 85]})\nresult = (df[df["score"] > 80]\n          .sort_values("score", ascending=False)["name"]\n          .iloc[0])\nprint(result)',
    explanation:
      'Chain: filter keeps Alice(95) and Carol(85). Sort descending puts Alice first. ["name"] selects name column. iloc[0] gets Alice. Bob (75) is filtered out.',
  },
  {
    id: 72,
    phase: 4,
    levelMode: 'code',
    title: 'Matplotlib Line Chart',
    concept: 'plt.plot(), data preparation',
    description:
      'Matplotlib is Python\'s primary plotting library. plt.plot(x, y) creates line charts. In browser environments, we can\'t display plots, but we can generate the data coordinates and verify them.',
    task: 'Generate x = [1,2,3] and y = [2,4,6] (y = 2*x). Print the list of (x,y) coordinate pairs.',
    starterCode: '# Matplotlib data preparation\n',
    expectedOutput: '[(1, 2), (2, 4), (3, 6)]',
    validationMode: 'exact',
    hints: [
      'Use a list comprehension to pair x and y values.',
      'list(zip(x, y)) creates pairs.',
      'x = [1, 2, 3]\ny = [2, 4, 6]\nprint(list(zip(x, y)))',
    ],
    solution: 'x = [1, 2, 3]\ny = [2, 4, 6]\nprint(list(zip(x, y)))',
    explanation:
      'zip(x, y) pairs corresponding elements: (1,2), (2,4), (3,6). list() converts to a displayable list. In a real script you\'d add: import matplotlib.pyplot as plt; plt.plot(x, y); plt.show().',
  },
  {
    id: 73,
    phase: 4,
    levelMode: 'code',
    title: 'Scatter Plot Data',
    concept: 'scatter plot concepts, zip()',
    description:
      'Scatter plots show relationships between two variables. Each point is an (x, y) pair. In data science, we look for correlations — do the points trend upward (positive), downward (negative), or show no pattern?',
    task: 'Create 5 data points with x = [1,2,3,4,5] and y = [2,3,5,4,6]. Print the number of data points.',
    starterCode: '# Scatter plot data\n',
    expectedOutput: '5',
    validationMode: 'exact',
    hints: [
      'len(x) or len(y) gives the count.',
      'x = [1,2,3,4,5]; y = [2,3,5,4,6]',
      'x = [1, 2, 3, 4, 5]\ny = [2, 3, 5, 4, 6]\nprint(len(x))',
    ],
    solution: 'x = [1, 2, 3, 4, 5]\ny = [2, 3, 5, 4, 6]\nprint(len(x))',
    explanation:
      '5 data points. In a real script: plt.scatter(x, y); plt.show() would render the chart. Scatter plots reveal correlations — this data shows a general upward trend (positive correlation).',
  },
  {
    id: 74,
    phase: 4,
    levelMode: 'code',
    title: 'Bar Chart Data',
    concept: 'Counting categories, Counter',
    description:
      'Bar charts show counts or values for categories. The first step is computing category frequencies from raw data. collections.Counter is perfect for counting occurrences.',
    task: 'Count the frequency of each grade in ["A","B","A","C","A","B"] and print the result as a dict.',
    starterCode: '# Bar chart data prep\nfrom collections import Counter\n',
    expectedOutput: "{'A': 3, 'B': 2, 'C': 1}",
    validationMode: 'exact',
    hints: [
      'Counter(list) counts occurrences of each element.',
      'dict(Counter(...)) converts to a regular dict.',
      'from collections import Counter\ngrades = ["A","B","A","C","A","B"]\nprint(dict(Counter(grades)))',
    ],
    solution: 'from collections import Counter\n\ngrades = ["A", "B", "A", "C", "A", "B"]\nprint(dict(Counter(grades)))',
    explanation:
      'Counter is a dict subclass that counts hashable objects. A appears 3 times, B appears 2 times, C appears 1 time. dict() converts it to a plain dict for cleaner output.',
  },
  {
    id: 75,
    phase: 4,
    levelMode: 'code',
    title: 'NumPy Arrays',
    concept: 'np.array(), shape, dtype',
    description:
      'NumPy arrays are the foundation of scientific computing in Python. They are faster than lists for numerical operations because they store data in contiguous memory and support vectorised operations.',
    task: 'Create a 3x3 NumPy array of integers 1-9 and print its shape.',
    starterCode: '# NumPy arrays\nimport numpy as np\n',
    expectedOutput: '(3, 3)',
    validationMode: 'exact',
    hints: [
      'np.array([[1,2,3],[4,5,6],[7,8,9]]) creates a 2D array.',
      'arr.shape gives the dimensions.',
      'import numpy as np\narr = np.array([[1,2,3],[4,5,6],[7,8,9]])\nprint(arr.shape)',
    ],
    solution: 'import numpy as np\n\narr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(arr.shape)',
    explanation:
      'np.array() with a list of lists creates a 2D array. shape returns (rows, cols) — (3, 3) for a 3x3 matrix. NumPy also has np.zeros(), np.ones(), np.arange(), np.linspace() for array creation.',
  },
  {
    id: 76,
    phase: 4,
    levelMode: 'code',
    title: 'Array Slicing',
    concept: 'NumPy 2D indexing and slicing',
    description:
      'NumPy 2D arrays use [row, col] indexing. Slices work per dimension: arr[0:2, 1:3] selects rows 0-1 and columns 1-2. This is more powerful than Python list slicing.',
    task: 'Create a 3x3 array of 1-9. Print the sub-array of rows 0-1, columns 1-2 (showing [2,3] and [5,6]).',
    starterCode: '# NumPy array slicing\nimport numpy as np\n',
    expectedOutput: '[[2 3]\n [5 6]]',
    validationMode: 'exact',
    hints: [
      'arr[0:2, 1:3] selects rows 0,1 and columns 1,2.',
      '[[1,2,3],[4,5,6],[7,8,9]][rows 0:2][cols 1:3] → [[2,3],[5,6]]',
      'arr = np.array([[1,2,3],[4,5,6],[7,8,9]])\nprint(arr[0:2, 1:3])',
    ],
    solution: 'import numpy as np\n\narr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])\nprint(arr[0:2, 1:3])',
    explanation:
      'arr[0:2, 1:3] — rows 0 and 1 (not 2), columns 1 and 2 (not 3). Row 0 cols 1,2: [2,3]. Row 1 cols 1,2: [5,6]. NumPy prints without commas between elements.',
  },
  {
    id: 77,
    phase: 4,
    levelMode: 'code',
    title: 'Matrix Multiplication',
    concept: 'np.dot(), @ operator',
    description:
      'Matrix multiplication combines rows of the first matrix with columns of the second. A (m×n) matrix times a (n×p) matrix gives a (m×p) result. NumPy uses np.dot() or the @ operator.',
    task: 'Multiply a (2×3) matrix by a (3×2) matrix using the @ operator and print the result shape.',
    starterCode: '# Matrix multiplication\nimport numpy as np\n',
    expectedOutput: '(2, 2)',
    validationMode: 'exact',
    hints: [
      'np.ones((2,3)) creates a 2x3 matrix of ones.',
      '(2×3) @ (3×2) = (2×2)',
      'A = np.ones((2,3))\nB = np.ones((3,2))\nresult = A @ B\nprint(result.shape)',
    ],
    solution: 'import numpy as np\n\nA = np.ones((2, 3))\nB = np.ones((3, 2))\nresult = A @ B\nprint(result.shape)',
    explanation:
      '(2×3) @ (3×2) → (2×2). The inner dimensions (3 and 3) must match. The outer dimensions (2 and 2) give the result shape. np.ones() creates matrices filled with 1s.',
  },
  {
    id: 78,
    phase: 4,
    levelMode: 'code',
    title: 'Descriptive Statistics',
    concept: 'mean, median, std with NumPy',
    description:
      'Descriptive statistics summarise a dataset. Mean is the average, median is the middle value, standard deviation measures spread. NumPy provides np.mean(), np.median(), np.std().',
    task: 'Compute and print the mean, median, and std (rounded to 2 decimals) of [20, 35, 50, 65, 80].',
    starterCode: '# Descriptive statistics\nimport numpy as np\n',
    expectedOutput: '50.0\n50.0\n21.21',
    validationMode: 'exact',
    hints: [
      'np.mean(), np.median(), np.std()',
      'round(value, 2) rounds to 2 decimal places.',
      'data = [20,35,50,65,80]\nprint(np.mean(data))\nprint(np.median(data))\nprint(round(np.std(data),2))',
    ],
    solution: 'import numpy as np\n\ndata = [20, 35, 50, 65, 80]\nprint(np.mean(data))\nprint(np.median(data))\nprint(round(np.std(data), 2))',
    explanation:
      'Mean: (20+35+50+65+80)/5 = 250/5 = 50.0. Median: middle value of sorted list = 50.0. Std: measures spread around mean ≈ 21.21. These are the three most fundamental statistics.',
  },
  {
    id: 79,
    phase: 4,
    levelMode: 'code',
    title: 'Pandas Boolean Filtering',
    concept: '& | operators, boolean masks',
    description:
      'Filter DataFrames with multiple conditions using & (and) and | (or). Each condition produces a boolean Series. Combine them with & or | in parentheses — important because Python\'s "and" doesn\'t work on Series.',
    task: 'Create a DataFrame of students. Filter where age > 20 AND score > 80. Print the count of matching rows.',
    starterCode: '# Boolean filtering\nimport pandas as pd\n',
    expectedOutput: '2',
    validationMode: 'exact',
    hints: [
      'df[(df["age"] > 20) & (df["score"] > 80)]',
      'Parentheses around each condition are required.',
      'df=pd.DataFrame({"age":[18,25,30,22],"score":[90,85,70,88]})\nresult=df[(df["age"]>20)&(df["score"]>80)]\nprint(len(result))',
    ],
    solution: 'import pandas as pd\n\ndf = pd.DataFrame({"age": [18, 25, 30, 22], "score": [90, 85, 70, 88]})\nresult = df[(df["age"] > 20) & (df["score"] > 80)]\nprint(len(result))',
    explanation:
      'Row 0: age=18 (fails age>20). Row 1: age=25, score=85 ✓. Row 2: age=30, score=70 (fails score>80). Row 3: age=22, score=88 ✓. Two rows match both conditions.',
  },
  {
    id: 80,
    phase: 4,
    levelMode: 'code',
    title: 'SQLite Basics',
    concept: 'sqlite3, CREATE TABLE, INSERT, SELECT',
    description:
      'SQLite is a serverless database stored in a single file. Python\'s sqlite3 module is built in. Use conn = sqlite3.connect() to open, cursor.execute() to run SQL, and conn.commit() to save changes.',
    task: 'Create an in-memory SQLite database, create a users table, insert 3 users, and print the count.',
    starterCode: '# SQLite database\nimport sqlite3\n',
    expectedOutput: '3',
    validationMode: 'exact',
    hints: [
      'sqlite3.connect(":memory:") creates an in-memory DB.',
      'CREATE TABLE users (id INTEGER, name TEXT)',
      'conn=sqlite3.connect(":memory:")\nc=conn.cursor()\nc.execute("CREATE TABLE users(id INTEGER,name TEXT)")\nc.executemany("INSERT INTO users VALUES(?,?)",[(1,"A"),(2,"B"),(3,"C")])\nconn.commit()\nc.execute("SELECT COUNT(*) FROM users")\nprint(c.fetchone()[0])',
    ],
    solution: 'import sqlite3\n\nconn = sqlite3.connect(":memory:")\nc = conn.cursor()\nc.execute("CREATE TABLE users (id INTEGER, name TEXT)")\nc.executemany("INSERT INTO users VALUES (?, ?)", [(1, "Alice"), (2, "Bob"), (3, "Carol")])\nconn.commit()\nc.execute("SELECT COUNT(*) FROM users")\nprint(c.fetchone()[0])',
    explanation:
      '":memory:" creates a temporary in-memory database. executemany() inserts multiple rows efficiently. COUNT(*) counts all rows. fetchone()[0] gets the first value from the first result row: 3.',
  },
  {
    id: 81,
    phase: 4,
    levelMode: 'code',
    title: 'SQLite Queries',
    concept: 'SELECT with WHERE clause',
    description:
      'SQL SELECT retrieves data. WHERE filters rows. ORDER BY sorts results. LIMIT restricts the number of rows returned. fetchall() returns all matching rows; fetchone() returns just one.',
    task: 'Using the same users table, query for the user with id = 1 and print their name.',
    starterCode: '# SQLite queries\nimport sqlite3\n',
    expectedOutput: 'Alice',
    validationMode: 'exact',
    hints: [
      'SELECT name FROM users WHERE id = 1',
      'fetchone() returns the first (and only) row as a tuple.',
      'conn=sqlite3.connect(":memory:")\nc=conn.cursor()\nc.execute("CREATE TABLE users(id INTEGER,name TEXT)")\nc.executemany("INSERT INTO users VALUES(?,?)",[(1,"Alice"),(2,"Bob")])\nconn.commit()\nc.execute("SELECT name FROM users WHERE id=1")\nprint(c.fetchone()[0])',
    ],
    solution: 'import sqlite3\n\nconn = sqlite3.connect(":memory:")\nc = conn.cursor()\nc.execute("CREATE TABLE users (id INTEGER, name TEXT)")\nc.executemany("INSERT INTO users VALUES (?, ?)", [(1, "Alice"), (2, "Bob"), (3, "Carol")])\nconn.commit()\nc.execute("SELECT name FROM users WHERE id = 1")\nprint(c.fetchone()[0])',
    explanation:
      'WHERE id = 1 filters to just Alice\'s row. fetchone() returns ("Alice",) — a tuple. [0] extracts the first element: "Alice". Parameterised queries (?) prevent SQL injection.',
  },
  {
    id: 82,
    phase: 4,
    levelMode: 'code',
    title: 'Scikit-Learn Intro',
    concept: 'train_test_split, dataset preparation',
    description:
      'Machine learning requires splitting data into training and test sets. Training data fits the model; test data evaluates it on unseen examples. sklearn\'s train_test_split() handles this automatically.',
    task: 'Create a dataset of 100 samples. Split 80/20 train/test and print the sizes.',
    starterCode: '# Scikit-learn train/test split\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\n',
    expectedOutput: '80\n20',
    validationMode: 'exact',
    hints: [
      'np.arange(100) creates 100 samples.',
      'train_test_split(X, test_size=0.2)',
      'X = np.arange(100).reshape(-1, 1)\nX_train, X_test = train_test_split(X, test_size=0.2, random_state=42)\nprint(len(X_train))\nprint(len(X_test))',
    ],
    solution: 'import numpy as np\nfrom sklearn.model_selection import train_test_split\n\nX = np.arange(100).reshape(-1, 1)\nX_train, X_test = train_test_split(X, test_size=0.2, random_state=42)\nprint(len(X_train))\nprint(len(X_test))',
    explanation:
      'test_size=0.2 puts 20% in test (20 samples) and 80% in train (80 samples). random_state=42 makes the split reproducible. reshape(-1, 1) makes it a column vector.',
  },
  {
    id: 83,
    phase: 4,
    levelMode: 'code',
    title: 'Linear Regression',
    concept: 'LinearRegression, fit(), predict()',
    description:
      'Linear regression finds the best-fit line through data points. fit(X, y) trains the model. predict([[x]]) predicts y for a new x. It learns the slope and intercept of the line.',
    task: 'Train a LinearRegression on X=[1,2,3,4,5] and y=[2,4,6,8,10] (y=2x). Predict for X=[[6]] and print the result rounded to 1 decimal.',
    starterCode: '# Linear regression\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n',
    expectedOutput: '12.0',
    validationMode: 'exact',
    hints: [
      'X must be 2D: np.array([[1],[2],[3],[4],[5]])',
      'model.fit(X, y) then model.predict([[6]])',
      'X=np.array([[1],[2],[3],[4],[5]])\ny=[2,4,6,8,10]\nmodel=LinearRegression().fit(X,y)\nprint(round(model.predict([[6]])[0],1))',
    ],
    solution: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = [2, 4, 6, 8, 10]\nmodel = LinearRegression()\nmodel.fit(X, y)\nprediction = model.predict([[6]])[0]\nprint(round(prediction, 1))',
    explanation:
      'The model learns y = 2x perfectly. Prediction for x=6: 2*6=12.0. predict() returns an array; [0] gets the first value. Linear regression minimises the sum of squared residuals.',
  },
  {
    id: 84,
    phase: 4,
    levelMode: 'code',
    title: 'Multi-Variable Regression',
    concept: 'Multiple features, R-squared score',
    description:
      'Multiple regression uses several input features to predict an output. R-squared (R²) measures fit quality: 1.0 = perfect fit, 0 = no better than guessing the mean. model.score() returns R².',
    task: 'Fit a regression with 2 features (X1=study hours, X2=sleep hours) predicting exam score. Print R² score rounded to 2 decimal places.',
    starterCode: '# Multi-variable regression\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n',
    expectedOutput: '1.00',
    validationMode: 'exact',
    hints: [
      'X has 2 columns: [[study, sleep], ...]',
      'model.score(X, y) returns R²',
      'X=np.array([[2,8],[4,7],[6,6],[8,5]])\ny=[60,70,80,90]\nmodel=LinearRegression().fit(X,y)\nprint(round(model.score(X,y),2))',
    ],
    solution: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nX = np.array([[2, 8], [4, 7], [6, 6], [8, 5]])\ny = [60, 70, 80, 90]\nmodel = LinearRegression()\nmodel.fit(X, y)\nprint(f"{model.score(X, y):.2f}")',
    explanation:
      'R² of 1.00 means the model perfectly explains all variance in y. The data is perfectly linear (y = 10*study_hours + 40). In real data, R² is rarely 1.0 — values above 0.7 are generally considered good.',
  },
  {
    id: 85,
    phase: 4,
    levelMode: 'code',
    title: 'Statistical Tests',
    concept: 'scipy t-test, p-values',
    description:
      'Statistical tests determine if differences between groups are significant or due to chance. The t-test compares means of two groups. p-value < 0.05 means statistically significant (95% confidence).',
    task: 'Run a t-test between two similar groups (A=[50,52,48,51] and B=[51,49,50,52]). Print "Significant" if p < 0.05, else "Not significant".',
    starterCode: '# Statistical testing\nfrom scipy import stats\n',
    expectedOutput: 'Not significant',
    validationMode: 'exact',
    hints: [
      'stats.ttest_ind(A, B) runs the t-test.',
      'result.pvalue gives the p-value.',
      'from scipy import stats\nA=[50,52,48,51]\nB=[51,49,50,52]\nresult=stats.ttest_ind(A,B)\nprint("Significant" if result.pvalue < 0.05 else "Not significant")',
    ],
    solution: 'from scipy import stats\n\nA = [50, 52, 48, 51]\nB = [51, 49, 50, 52]\nresult = stats.ttest_ind(A, B)\nprint("Significant" if result.pvalue < 0.05 else "Not significant")',
    explanation:
      'The two groups have very similar means (50.25 vs 50.5). The t-test finds no statistically significant difference (p > 0.05). "Not significant" means we cannot reject the null hypothesis that the means are equal.',
  },
]
