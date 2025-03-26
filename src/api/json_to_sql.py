import pyodbc
import json
from dotenv import load_dotenv
import os

load_dotenv("../../.env.local")

# Database connection details
server = 'allafotbollscuper.database.windows.net'
database = 'cuper'
username = 'henrik'
password = os.environ.get("DATABASE_PASSWORD")
driver = '{ODBC Driver 18 for SQL Server}'
conn_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

def insert_cup_data(cursor, data):
    sql = "INSERT INTO cups (Name, Club, CategoriesSummary, Date,  Link, County, Year, Categories, Month    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(sql, (data["name"], data["club"], data["categoriesSummary"], data["date"], data["link"], data["county"], data["year"], ", ".join(data["categories"]), data["month"]))
    conn.commit()
    print(f"Inserted cup: {data['name']}")

try:
    # Connect to the database
    conn = pyodbc.connect(conn_string)
    cursor = conn.cursor()

    # Load JSON data
    with open('stockholm2025.json', 'r') as f:
        json_data = json.load(f)

    # Insert each cup record
    for record in json_data:
        insert_cup_data(cursor, record)

    print("All cups inserted successfully!")
except pyodbc.Error as ex:
    print(f"Error: {ex}")
finally:
    if conn:
        conn.close()